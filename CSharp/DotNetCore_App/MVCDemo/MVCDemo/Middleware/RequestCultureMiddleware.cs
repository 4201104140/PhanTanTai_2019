using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace MVCDemo.Middleware
{
	public class RequestCultureMiddleware
	{
		private readonly RequestDelegate _next;

		public RequestCultureMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public Task Invoke(HttpContext context)
		{
			var cultureQuery = context.Request.Query["culture"];
			if (string.IsNullOrWhiteSpace(cultureQuery))
			{
				var culture = new CultureInfo(cultureQuery);

				CultureInfo.CurrentCulture = culture;
				CultureInfo.CurrentUICulture = culture;
			}
			return this._next(context);
		}
	}

	public static class RequestCultureMiddlewareExtensions
	{
		public static IApplicationBuilder UseRequestCulture(
			this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<RequestCultureMiddleware>();
		}
	}
}
