namespace TargilVSServer.Models
{
  public class CategoryProductDto
  {
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public int? ProductId { get; set; } // Nullable in case a category has no products
    public string ProductName { get; set; }
  }

}
