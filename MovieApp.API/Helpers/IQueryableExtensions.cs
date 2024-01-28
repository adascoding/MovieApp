using System.Linq.Expressions;
using System.Reflection;

namespace MovieApp.API.Helpers;

public static class IQueryableExtensions
{
    public static IQueryable<T> OrderByCustom<T>(this IQueryable<T> source, string orderByProperty, string direction)
    {
        var type = typeof(T);
        var property = type.GetProperty(orderByProperty, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
        if (property == null)
        {
            throw new ArgumentException("Property not found", nameof(orderByProperty));
        }

        var parameter = Expression.Parameter(type, "p");
        var propertyAccess = Expression.MakeMemberAccess(parameter, property);
        var orderByExpression = Expression.Lambda(propertyAccess, parameter);

        string methodName = direction.Equals("ascending", StringComparison.OrdinalIgnoreCase) ? "OrderBy" : "OrderByDescending";
        var resultExpression = Expression.Call(typeof(Queryable), methodName, new Type[] { type, property.PropertyType },
            source.Expression, Expression.Quote(orderByExpression));

        return source.Provider.CreateQuery<T>(resultExpression);
    }
}
