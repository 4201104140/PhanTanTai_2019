using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MVCDemo.DI.Implementation;

namespace MVCDemo.Controllers
{
    public class CustomerController : Controller
    {
		CustomerRepository _customerRepository;

		public CustomerController(CustomerRepository customerRepository)
		{
			_customerRepository = customerRepository;
		}
        public IActionResult Index()
        {
			var customer = _customerRepository.GetAll();
            return View(customer);
        }
    }
}