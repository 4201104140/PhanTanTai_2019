using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstWeb.Library;
using Microsoft.AspNetCore.Mvc;

namespace FirstWeb.Controllers
{
    public class TestController : RetailController
    {
        public ActionResult Test()
		{
			return View(CommonPageUrl);
		}
    }
}