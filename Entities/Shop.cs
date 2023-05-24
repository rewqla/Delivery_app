using System.Collections.Generic;

namespace Delivery_app.Entities
{
    public class Shop
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Product> Products { get; set; }
    }
}
