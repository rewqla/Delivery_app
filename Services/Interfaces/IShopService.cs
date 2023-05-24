using Delivery_app.Entities;
using Delivery_app.Models;

namespace Delivery_app.Services.Interfaces
{
    public interface IShopService
    {
        ShopViewModel GetShopViewModel(string shopName);
        ProductModel[] ConvertProducts(Product[] products);
    }
}
