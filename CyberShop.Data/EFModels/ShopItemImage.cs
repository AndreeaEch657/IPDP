using System;

namespace CyberShop.Data.EFModels
{
    public class ShopItemImage
    {
        
        public Guid ImageId { get; set; }
        public byte[] Image { get; set; }

        public Guid ShopItemId { get; set; }
        public ShopItem ShopItem { get; set; }
    }
}