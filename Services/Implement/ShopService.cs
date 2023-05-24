using Delivery_app.Entities;
using Delivery_app.Models;
using Delivery_app.Repo.Implement;
using Delivery_app.Services.Interfaces;
using System.Linq;

namespace Delivery_app.Services.Implement
{
    public class ShopService : IShopService
    {
        private readonly IProductRepo _productRepo;
        private readonly IShopRepo _shopRepo;

        public ShopService(IProductRepo productRepo, IShopRepo shopRepo)
        {
            _productRepo = productRepo;
            _shopRepo = shopRepo;
        }

        public ShopViewModel GetShopViewModel(string shopName)
        {
            ShopViewModel shopViewModel = new ShopViewModel();

            shopViewModel.ShopNames = _shopRepo.GetAll().Select(x => x.Name).ToArray();
            shopViewModel.Products = ConvertProducts(_productRepo.GetAll().Where(x => x.ShopId == _shopRepo.GetAll().FirstOrDefault(x => x.Name == shopName).Id).ToArray());
            return shopViewModel;
        }
        public ProductModel[] ConvertProducts(Product[] products)
        {
            return products.Select(p => new ProductModel
            {
                Name = p.Name,
                Price = p.Price,
                Image = p.Image
            }).ToArray();
        }
    }
}
