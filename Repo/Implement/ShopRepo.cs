using Delivery_app.Entities;
using Delivery_app.Repo.Implement;

namespace Delivery_app.Repo.Interfaces
{
    public class ShopRepo : GenericRepository<Shop>, IShopRepo
    {
        public ShopRepo(ApplicationDbContext context) : base(context)
        {

        }
    }
}

