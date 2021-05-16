using System;

namespace CyberShop.Data.EFModels
{
    public class ShopItemImage
    {
        
        public long ImageId { get; set; }
        public byte[] Image { get; set; }

        public long ShopItemId { get; set; }
        public ShopItem ShopItem { get; set; }
    }
}