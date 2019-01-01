using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;

namespace System_Test
{
	public class _Activator
	{
		public void Run()
		{
			Object o = Activator.CreateInstance(typeof(StringBuilder));
			Object a = Activator.CreateInstance(typeof(StringBuilder), false);
			
			StringBuilder sb = (StringBuilder)o;
			StringBuilder sba = (StringBuilder)a;
			sb.Append("Hello, there.");
			sba.Append("Hello, there.");
			
			Console.WriteLine(sb);
			
		}
	}
}
