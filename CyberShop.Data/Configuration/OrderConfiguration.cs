using CyberShop.Data.EFModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CyberShop.Data.Configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Orders");

            builder.Property(s => s.OrderId).HasColumnName("order_id");
            builder.Property(s => s.UserId).HasColumnName("user_id");
            builder.Property(s => s.TransactionId).HasColumnName("transaction_id");
            builder.Property(s => s.Status).HasColumnName("status");
            builder.Property(s => s.Address).HasColumnName("address");
            builder.HasOne<AppUser>(s => s.User)
                .WithMany(s => s.Orders)
                .HasForeignKey(s => s.UserId);
        }
    }
}