using System;
using System.Collections.Generic;
using System.Text;

namespace CyberShop.Data.EFModels
{
    public class ShopItem
    {
        public Guid ShopItemId { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public List<ShopItemImage> Images { get; set; }

    }
}
