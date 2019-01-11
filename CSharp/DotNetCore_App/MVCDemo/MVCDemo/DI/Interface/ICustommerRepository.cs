using MVCDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVCDemo.DI.Interface
{
	public interface ICustommerRepository
	{
		void Add(Customer customer);
		List<Customer> GetAll();
	}
}
