using System.Collections.Generic;

namespace Delivery_app.Repo.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        //TEntity FindById(int id);
        void Add(TEntity item);
        IEnumerable<TEntity> GetAll();
    }
}
