using System.Collections.Generic;

namespace Delivery_app.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public float TotalPrice { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}
