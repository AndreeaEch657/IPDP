using CyberShop.Data.EFModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CyberShop.Data.Configuration
{
    public class ShopItemConfiguration : IEntityTypeConfiguration<ShopItem>
    {
        public void Configure(EntityTypeBuilder<ShopItem> builder)
        {
            builder.ToTable("ShopItems");
            builder.HasKey(s => s.ShopItemId);
            builder.Property(s => s.ShopItemId).HasColumnName("shop_item_id");
            builder.Property(s => s.Title).HasColumnName("title");
            builder.Property(s => s.Category).HasColumnName("category");
            builder.Property(s => s.Description).HasColumnName("description");
            builder.Property(s => s.Price).HasColumnName("price");

        }
    }
}