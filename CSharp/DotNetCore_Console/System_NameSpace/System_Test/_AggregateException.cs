using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace System_Test
{
	public class _AggregateException
	{
		public async Task Run()
		{
			//string path = Directory.GetParent(
			//	Environment.GetFolderPath(
			//		Environment.SpecialFolder.UserProfile)).FullName;

			string path = @"C:\Users\phant\OneDrive\Desktop\PhanTanTai_2019\CSharp\DotNetCore_Console\FolderTest";

			Task<string[]> task1 = Task<string[]>.Factory.StartNew(()=>GetAllFiles(path));
			try
			{
				await task1;
			}
			catch(AggregateException ae)
			{
				ae.Handle((x) =>
				{
					if(x is UnauthorizedAccessException)
					{
						Console.WriteLine("You do not have permission to access all folders in this path.");
						Console.WriteLine("See your network administrator or try another path.");
						return true;
					}
					return false;
				});
			}
			Console.WriteLine("task1 Status: {0}{1}",task1.IsCompleted ? "Completed,":"",task1.Status);
		}

		public string[] GetAllFiles(string str)
		{
			return System.IO.Directory.GetFiles(str, "*.txt", System.IO.SearchOption.AllDirectories);
		}
	}
}
