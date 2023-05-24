using Microsoft.EntityFrameworkCore;
using Delivery_app.Repo.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Delivery_app.Repo.Implement
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        DbContext _context;
        DbSet<TEntity> _dbSet;

        public GenericRepository(DbContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _dbSet.AsNoTracking().ToList();
        }
        //public TEntity FindById(int id)
        //{
        //    return _dbSet.Find(id);
        //}
    }    
}
