using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using First_Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace First_Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TripsController : ControllerBase
	{
		public TripsController(Repository repository)
		{
			_repository = repository;
		}

		private Repository _repository;
		// GET api/trips
		[HttpGet]
		public ActionResult<IEnumerable<Trip>> Get()
		{
			return _repository.Get();
		}

		// GET api/trips/5
		[HttpGet("{id}")]
		public ActionResult<Trip> Get(int id)
		{
			return _repository.Get(id);
		}

		// POST api/trips
		[HttpPost]
		public void Post([FromBody] Trip value)
		{
			_repository.Add(value);
		}

		// PUT api/trips/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] Trip value)
		{
			_repository.Update(value);
		}

		// DELETE api/trips/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_repository.Remove(id);
		}
	}
}
