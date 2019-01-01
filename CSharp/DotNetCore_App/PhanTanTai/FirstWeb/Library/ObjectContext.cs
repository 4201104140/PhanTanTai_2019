using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWeb.Library
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

		public int GetPageSize(string table = null)
		{
			return 20;
		}

		private ObjectContext(Controller controller)
		{
			_controller = controller;
		}

		public Controller controller
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
