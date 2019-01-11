using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVCDemo.Models
{
	public class ApplicationDbContext : DbContext
	{
		public DbSet<Customer> Customers { get; set; }
	}
}
