using System.Collections.Generic;

namespace Delivery_app.Models
{
    public class OrderViewModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public float TotalPrice { get; set; }
        public List<OrderItemViewModel> OrderItems { get; set; }
    }
    public class OrderItemViewModel
    {
        public int Quantity { get; set; }
        public float Price { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
    }

    public class OrderSearchViewModel
    {
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
