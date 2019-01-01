using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWeb.Library
{
	public class ControllerBase : Controller
	{
		public override void OnActionExecuting(ActionExecutingContext ctx)
		{
			base.OnActionExecuting(ctx);
		}
	}
}
