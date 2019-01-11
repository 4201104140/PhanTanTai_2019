using MVCDemo.DI.Interface;
using MVCDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVCDemo.DI.Implementation
{
	public class CustomerRepository : ICustommerRepository
	{
		ApplicationDbContext _context;
		public CustomerRepository(ApplicationDbContext context)
		{
			_context = new ApplicationDbContext();
		}
		public void Add(Customer customer)
		{
			_context.Add(customer);
		}

		public List<Customer> GetAll()
		{
			return _context.Customers.ToList();
		}
	}
}
