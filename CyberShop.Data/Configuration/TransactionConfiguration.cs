using CyberShop.Data.EFModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CyberShop.Data.Configuration
{
    public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.ToTable("Transactions");

            builder.Property(s => s.TransactionId).HasColumnName("transaction_id");
            builder.Property(s => s.CartId).HasColumnName("cart_id");
            builder.Property(s => s.Total).HasColumnName("total");


        }
    }
}