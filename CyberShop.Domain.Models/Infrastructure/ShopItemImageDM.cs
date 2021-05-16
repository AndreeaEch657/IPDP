using System;

namespace CyberShop.Domain.Models.Infrastructure
{
    public class ShopItemImageDM
    {
        
        public long ImageId { get; set; }
        public byte[] Image { get; set; }

        public long ShopItemId { get; set; }
      
    }
}