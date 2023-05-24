using System.Collections.Generic;

namespace Delivery_app.Repo.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        //TEntity FindById(int id);
        IEnumerable<TEntity> GetAll();
    }
}
