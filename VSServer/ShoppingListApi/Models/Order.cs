namespace TargilVSServer.Models
{
  public class Order
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public List<OrderProduct> Products { get; set; }
  }
  //public class OrderItem
  //{
  //    public string ProductName { get; set; }
  //    public int Quantity { get; set; }
  //}
  public class OrderProduct
  {
    public Product Product { get; set; }
    public int Quantity { get; set; }
  }

  public class OrderDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Family { get; set; }
    public string Address { get; set; }
    public string Mail { get; set; }
    public DateTime OrderDate { get; set; }
  }

  public class OrderProductDto
  {
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
  }

}
