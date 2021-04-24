using System;

namespace CyberShop.Domain.Models.Infrastructure
{
    public class ShopItemImageDM
    {
        
        public Guid ImageId { get; set; }
        public byte[] Image { get; set; }

        public Guid ShopItemId { get; set; }
      
    }
}