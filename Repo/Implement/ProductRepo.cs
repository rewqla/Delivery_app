using Delivery_app.Entities;
using Delivery_app.Repo.Implement;

namespace Delivery_app.Repo.Interfaces
{
    public class ProductRepo : GenericRepository<Product>, IProductRepo
    {
        public ProductRepo(ApplicationDbContext context) : base(context)
        {

        }
    }
}

