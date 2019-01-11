using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace First_Web.Models
{
	public class Repository
	{
		private List<Trip> MyTrips = new List<Trip>
		{
			new Trip
			{
				Id = 1,
				Name = "MVP Summit",
				StartDate = new DateTime(2019,01,01),
				EndDate = new DateTime(2019,01,08)
			},
			new Trip
			{
				Id = 2,
				Name = "Phan Tan Tai",
				StartDate = new DateTime(2019,01,01),
				EndDate = new DateTime(2019,01,08)
			},
			new Trip
			{
				Id = 3,
				Name = "HuHuHa",
				StartDate = new DateTime(2019,01,01),
				EndDate = new DateTime(2019,01,08)
			},
			new Trip
			{
				Id = 4,
				Name = "HiHaHi",
				StartDate = new DateTime(2019,01,01),
				EndDate = new DateTime(2019,01,08)
			}
		};

		public List<Trip> Get()
		{
			return MyTrips;
		}
		public Trip Get(int id)
		{
			return MyTrips.First(t=>t.Id==id);
		}

		public void Add(Trip newTrip)
		{
			MyTrips.Add(newTrip);
		}

		public void Update(Trip tripToUpdate)
		{
			MyTrips.Remove(MyTrips.First(t => t.Id == tripToUpdate.Id));
			Add(tripToUpdate);
		}
		public void Remove(int id)
		{
			MyTrips.Remove(MyTrips.First(t => t.Id == id));
		}
	}
}
