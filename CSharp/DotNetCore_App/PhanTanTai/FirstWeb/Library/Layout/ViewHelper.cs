using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace LC.Framework
{
	public static class ViewHelper
	{
		public static string GetLayout<T>(this IHtmlHelper<T> helper, string popupLayoutUrl = "~/Views/Layout/PopupLayout.cshtml", string pageLayout = "~/Views/Layout/Layout.cshtml")
		{
			if (string.IsNullOrWhiteSpace(helper.ViewBag.ParentId))
			{
				return pageLayout;
			}
			else
			{
				return popupLayoutUrl;
			}
		}
	}
}
