using Delivery_app.Entities;
using Delivery_app.Repo.Implement;

namespace Delivery_app.Repo.Interfaces
{
    public class OrderRepo : GenericRepository<Order>, IOrderRepo
    {
        public OrderRepo(ApplicationDbContext context) : base(context)
        {

        }
    }
}

