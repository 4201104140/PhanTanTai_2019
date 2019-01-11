using Microsoft.AspNetCore.Mvc.Rendering;
using System;

namespace LC.Framework
{
	public static class ViewHelper
	{
		public static string GetLayout<T>(this IHtmlHelper<T> helper, string popupLayoutUrl = "", string pageLayout = "~/Views/Layout/Layout.cshtml")
		{
			if (string.IsNullOrWhiteSpace(helper.ViewBag.ParentId))
			{
				return pageLayout;
			}
			else return popupLayoutUrl;
		}
	}
}
