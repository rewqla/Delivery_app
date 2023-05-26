using Delivery_app.Entities;
using Delivery_app.Models;
using System.Collections.Generic;

namespace Delivery_app.Services.Interfaces
{
    public interface IOrderService
    {
        void CreateOrder(OrderViewModel model);
        void CreateOrderItems(List<OrderItemViewModel> orderItems, int orderId);
        OrderViewModel[] FindOrders(string email, string phone);
    }
}
