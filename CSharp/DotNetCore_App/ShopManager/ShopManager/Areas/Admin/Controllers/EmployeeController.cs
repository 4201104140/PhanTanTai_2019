using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LC.Infra.Common.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace ShopManager.Areas.Admin.Controllers
{
    public class EmployeeController : RetailController
    {
		[Area("Admin")]
        public ActionResult EmployeeList()
        {
            return View(this.CommonPageUrl);
        }
    }
}