using System;
using System.Collections.Generic;
using System.Text;

namespace System_Test
{
	
	public static class StringLibrary
	{
		public static int SubstringStartAt(String fullString, String substr)
		{
			return fullString.IndexOf(substr, StringComparison.CurrentCulture);
		}
	}
	public class _AppContext
	{
		public void Run()
		{
			String value = "The archaeologist";
			String substring = "archae";
			int position = StringLibrary.SubstringStartAt(value, substring);

		}
	}


}
