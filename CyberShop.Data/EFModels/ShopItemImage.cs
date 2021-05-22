using System;
using Microsoft.AspNetCore.Http;

namespace CyberShop.Data.EFModels
{
    public class ShopItemImage
    {
        
        public long ImageId { get; set; }
        public string ImagePath { get; set; }

        public long ShopItemId { get; set; }
        public ShopItem ShopItem { get; set; }
    }
}