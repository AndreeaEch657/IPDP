using CyberShop.Data.EFModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CyberShop.Data.Configuration
{
    public class ShopItemImageConfiguration: IEntityTypeConfiguration<ShopItemImage>
    {
        public void Configure(EntityTypeBuilder<ShopItemImage> builder)
        {
            builder.ToTable("ShopItemsImages");
            builder.HasKey(s => s.ImageId);

            builder.Property(s => s.ImageId).HasColumnName("image_id");
            builder.Property(s => s.ShopItemId).HasColumnName("shop_item_id");
            builder.Property(s => s.ImagePath).HasColumnName("image_path");

            builder.HasOne<ShopItem>(s => s.ShopItem)
                .WithMany(s => s.Images)
                .HasForeignKey(s => s.ShopItemId);


        }
    }
}