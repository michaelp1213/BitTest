using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using TargilVSServer.Models;

namespace TargilVSServer.Controllers
{
 
  [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
      _context = context; // Inject the context
    }

    [HttpPost("create")]
    
    public async Task<IActionResult> CreateOrder([FromBody] Order order)
    {
      if (order == null || order.Products == null || order.Products.Count == 0)
      {
        return BadRequest("Order or products are null");
      }

      try
      {
        int orderId = 0; //  await CompleteOrder(order);
        // Create a DataTable to pass to the stored procedure
        var productTable = new DataTable();
        productTable.Columns.Add("ProductId", typeof(int));
        productTable.Columns.Add("ProductName", typeof(string));
        productTable.Columns.Add("Quantity", typeof(int));

        foreach (var product in order.Products) // products)
        {
          productTable.Rows.Add(product.Product.Id, product.Product.Name, product.Quantity);
        }

        var nameParam = new SqlParameter("@Name", order.FirstName);
        var familyParam = new SqlParameter("@Family", order.LastName);
        var addressParam = new SqlParameter("@Address", order.Address);
        var mailParam = new SqlParameter("@Mail", order.Email);
    
        var productsParam = new SqlParameter("@Products", productTable)
        {
          TypeName = "dbo.OrderProductTableType" // Ensure this matches the schema and type name
        };
        await _context.Database.ExecuteSqlRawAsync("EXEC CompleteOrder @Name, @Family, @Address, @Mail, @Products", nameParam, familyParam, addressParam, mailParam, productsParam); // Assuming you want to return the ID of the last inserted order

    
        return CreatedAtAction(nameof(CreateOrder), new { id = orderId }, order);
      }
      catch (Exception ex)
      {
        // Handle exceptions (e.g., log them)
        return StatusCode(500, $"Internal server error: {ex.Message}");
      }
    }

    [HttpGet("categories")]
    public async Task<ActionResult<List<CategoryProductDto>>> GetCategories()
    {
      try
      {
        var categoriesWithProducts = await _context.Set<CategoryProductDto>()
            .FromSqlRaw("EXEC GetCategoriesWithProducts")
            .ToListAsync();

        return Ok(categoriesWithProducts);
      }
      catch (Exception ex)
      {
        // Log the exception (you can use any logging framework)
        Console.WriteLine(ex.Message); // Replace with proper logging
        return StatusCode(500, "Internal server error");
      }
    }




    [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(1); // Return a simple response
        }
    }
}
