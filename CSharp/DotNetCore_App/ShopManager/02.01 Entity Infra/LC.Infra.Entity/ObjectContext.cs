using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System;
using System.Collections.Generic;
using System.Text;

namespace LC.Infra.Common.Infrastructure
{
	public class ObjectContext
	{
		public readonly Guid RequestId = Guid.NewGuid();
		public bool IsAdmin { get; private set; }

		public static ObjectContext CreateContext(Controller controller, bool isAdmin = false)
		{
			return new ObjectContext(controller)
			{
				IsAdmin = isAdmin
			};
		}

		private Controller _controller;
		private ObjectContext(Controller controller)
		{
			_controller = controller;
		}

		public int GetPageSize(string table = null)
		{
			return 20;
		}

		public Controller Controller
		{
			get { return _controller; }
		}

		public dynamic ViewBag
		{
			get { return _controller.ViewBag; }
		}

		public ViewDataDictionary ViewData
		{
			get { return _controller.ViewData; }
		}
	}
}
