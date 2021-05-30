using CyberShop.Data.EFModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CyberShop.Data.Configuration
{
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.ToTable("CartItems");
            builder.HasKey(s => s.CartItemId);

     
            builder.Property(s => s.CartItemId).HasColumnName("cart_item_id");
            builder.Property(s => s.CartId).HasColumnName("cart_id");
            builder.Property(s => s.ShopItemId).HasColumnName("shop_item_id");
            builder.Property(s => s.NumberOfItems).HasColumnName("number_of_items");

           
        }
    }
}