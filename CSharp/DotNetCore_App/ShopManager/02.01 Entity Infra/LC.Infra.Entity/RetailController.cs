using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;

namespace LC.Infra.Common.Infrastructure
{
	public class RetailController : Controller
	{
		public ObjectContext CurrentObjectContext { get; internal set; }
		protected string CommonPageUrl { get { return "~/Views/Shared/_CommonPage.cshtml"; } }
		
		public override void OnActionExecuting(ActionExecutingContext ctx)
		{
			this.CreateObjectContext();
			base.OnActionExecuting(ctx);
		}

		protected virtual void CreateObjectContext()
		{
			CurrentObjectContext = ObjectContext.CreateContext(this);
		}

		protected ActionResult JsonExpando(object obj)
		{
			var json = JsonConvert.SerializeObject(obj);
			return Content(json, "application/json");
		}
	}
}
