namespace Delivery_app.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Image { get; set; }
        public int ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}
