namespace Delivery_app.Models
{
    public class ShopViewModel
    {
        public string[] ShopNames { get; set; }
        public ProductModel[] Products { get; set; }
    }
    public class ProductModel
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public string Image { get; set; }
    }
}
