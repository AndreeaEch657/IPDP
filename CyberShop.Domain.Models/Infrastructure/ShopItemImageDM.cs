using System;
using Microsoft.AspNetCore.Http;

namespace CyberShop.Domain.Models.Infrastructure
{
    public class ShopItemImageDM
    {
        
        public long ImageId { get; set; }
        public string ImagePath { get; set; }
        public long ShopItemId { get; set; }
      
    }
}