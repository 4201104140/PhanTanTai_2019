using LC.Infra.Common.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopManager.Models
{
	public class SignInAction : CommandBase
	{
		public string ReturnUrl { get; set; }

		protected override Result ExecuteCore(ObjectContext context)
		{
			context.ViewBag.ReturnUrl = this.ReturnUrl;
			if (String.IsNullOrWhiteSpace(this.ReturnUrl))
			{
				this.ReturnUrl = "/";
			}
			return Success();
		}
	}
}
