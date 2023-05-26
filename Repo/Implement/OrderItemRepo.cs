using Delivery_app.Entities;
using Delivery_app.Repo.Implement;

namespace Delivery_app.Repo.Interfaces
{
    public class OrderItemRepo : GenericRepository<OrderItem>, IOrderItemRepo
    {
        public OrderItemRepo(ApplicationDbContext context) : base(context)
        {

        }
    }
}

