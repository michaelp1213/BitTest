using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace TargilVSServer.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    // Define DbSet for CategoryProductDto
    public DbSet<CategoryProductDto> CategoryProducts { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<CategoryProductDto>()
          .HasNoKey(); // Indicates that this entity has no primary key

      // Optionally configure property mappings if the names differ
      modelBuilder.Entity<CategoryProductDto>().Property(p => p.CategoryId).HasColumnName("CategoryId");
      modelBuilder.Entity<CategoryProductDto>().Property(p => p.CategoryName).HasColumnName("CategoryName");
      modelBuilder.Entity<CategoryProductDto>().Property(p => p.ProductId).HasColumnName("ProductId");
      modelBuilder.Entity<CategoryProductDto>().Property(p => p.ProductName).HasColumnName("ProductName");
    }

  }
}
