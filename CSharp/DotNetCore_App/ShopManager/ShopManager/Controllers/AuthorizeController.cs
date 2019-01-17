using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LC.Infra.Common.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using ShopManager.Models;

namespace ShopManager.Controllers
{
    public class AuthorizeController : RetailController
    {
		[HttpGet]

		public ActionResult SignIn(SignInAction cmd)
		{
			cmd.Execute(this.CurrentObjectContext);
			return View();
		}
    }
}