using Delivery_app.Entities;
using Delivery_app.Models;
using Delivery_app.Repo.Implement;
using Delivery_app.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Delivery_app.Services.Implement
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IProductRepo _productRepo;
        private readonly IOrderItemRepo _orderItemRepo;

        public OrderService(IOrderRepo orderRepo, IOrderItemRepo orderItemRepo, IProductRepo productRepo)
        {
            _orderRepo = orderRepo;
            _orderItemRepo = orderItemRepo;
            _productRepo = productRepo;
        }

        public void CreateOrderItems(List<OrderItemViewModel> orderItems, int orderId)
        {
            foreach (var item in orderItems)
            {
                OrderItem orderItem = new OrderItem
                {
                    Quantity = item.Quantity,
                    Price = item.Price,
                    ProductId = _productRepo.GetAll().FirstOrDefault(x => x.Name == item.ProductName).Id,
                    OrderId = orderId
                };

                _orderItemRepo.Add(orderItem);
            }
        }

        public void CreateOrder(OrderViewModel model)
        {
            Order order = new Order
            {
                UserName = model.UserName,
                Phone = model.Phone,
                Email = model.Email,
                Address = model.Address,
                TotalPrice = model.TotalPrice,
            };
            _orderRepo.Add(order);

            int Id = order.Id;
            CreateOrderItems(model.OrderItems, Id);
        }

        public List<OrderViewModel> FindOrders(OrderSearchViewModel model)
        {
            if (model.Phone.StartsWith("+38"))
                model.Phone = model.Phone.Substring(3);
            else if (model.Phone.StartsWith("38"))
                model.Phone = model.Phone.Substring(2);

            var orders = _orderRepo.GetAll().Where(x => x.Email == model.Email
            && (x.Phone == model.Phone || x.Phone == "38" + model.Phone || x.Phone == "+38" + model.Phone));

            if (orders.Any())
            {
                List<OrderViewModel> list = new List<OrderViewModel>();

                foreach (var order in orders)
                {
                    OrderViewModel orderViewModel = new OrderViewModel
                    {
                        Address = order.Address,
                        TotalPrice= order.TotalPrice,
                        OrderItems = new List<OrderItemViewModel>()
                    };

                    var orderItems = _orderItemRepo.GetAll().Where(item => item.OrderId == order.Id);
                    foreach (var item in orderItems)
                    {
                        var product = _productRepo.GetAll().FirstOrDefault(x => x.Id == item.ProductId);

                        orderViewModel.OrderItems.Add(new OrderItemViewModel
                        {
                            Price = item.Price,
                            Quantity = item.Quantity,
                            ProductName = product.Name,
                            ProductImage = product.Image,
                        });
                    }
                    list.Add(orderViewModel);
                }
                return list;
            }

            return null;
        }
    }
}
