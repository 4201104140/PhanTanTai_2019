using System;
using System.Collections.Generic;
using System.Text;

namespace LC.Infra.Common.Infrastructure
{
	public interface ICommand : IDisposable
	{
		string ParentId { get; set; }
		Result Execute(ObjectContext context);
	}
	
	public interface ICommand<T> : IDisposable
	{
		string ParentId { get; set; }
		Result<T> Execute(ObjectContext context);
	}

	public abstract class CommandBase : ICommand
	{
		public string ParentId { get; set; }
		protected virtual void ValidateCore(ObjectContext context)
		{
		}
		protected virtual void OnExecutingCore(ObjectContext context)
		{
		}
		protected virtual void OnExecutedCore(ObjectContext context, Result result)
		{
		}
		protected abstract Result ExecuteCore(ObjectContext context);
	
		public Result Execute(ObjectContext context)
		{
			try
			{
				ValidateCore(context);
				OnExecutingCore(context);
				var result = ExecuteCore(context);
				OnExecutedCore(context, result);
				return result;
			}
			catch(Exception ex)
			{
				return new Result
				{
					IsSuccess = false,
					Message = ex.Message
				};
			}
			finally
			{
				if(context != null)
				{
					context.ViewBag.ParentId = this.ParentId;
				}
			}
		}
		public virtual void Dispose()
		{
		}

		protected Result Success(string message = null)
		{
			return new Result
			{
				IsSuccess = true,
				Message = message ?? "success"
			};
		}
	}

	public abstract class CommandBase<T> : ICommand<T>
	{
		public string ParentId { get; set; }
		
		protected virtual void ValidateCore(ObjectContext context)
		{
		}
		protected virtual void OnExecutingCore(ObjectContext context)
		{
		}
		protected virtual void OnExecutedCore(ObjectContext context, Result<T> result)
		{
		}
		protected abstract Result<T> ExecuteCore(ObjectContext context);
		public Result<T> Execute(ObjectContext context)
		{
			try
			{
				ValidateCore(context);
				OnExecutingCore(context);
				var result = ExecuteCore(context);
				OnExecutedCore(context, result);
				if (context != null)
				{
					context.ViewBag.ParentId = this.ParentId;
				}
				return result;
			}
			catch(Exception ex)
			{
				return new Result<T>
				{
					IsSuccess = false,
					Message = ex.Message
				};
			}
		}
		public virtual void Dispose()
		{
		}
		protected Result<T> Success(T data, string message = null)
		{
			return new Result<T>
			{
				Data = data,
				IsSuccess = true,
				Message = message ?? "success"
			};
		}
	}

	public interface IResult
	{
		bool IsSuccess { get; set; }
		string Message { get; set; }
		object Description { get; set; }
	}

	public interface IResult<T> : IResult
	{
		T Data { get; set; }
	}

	public class Result : IResult
	{
		public bool IsSuccess { get; set; }
		public string Message { get; set; }
		public object Description { get; set; }
	}

	public class Result<T>: Result, IResult<T>
	{
		public T Data { get; set; }
	}
	public class CommandResult
	{
		public static Result Success(string msg = null)
		{
			return new Result
			{
				IsSuccess = true,
				Message = msg
			};
		}
		public static Result<T> Success<T>(T data, string msg = null)
		{
			return new Result<T>
			{
				IsSuccess = true,
				Message = msg,
				Data = data
			};
		}
	}
}
