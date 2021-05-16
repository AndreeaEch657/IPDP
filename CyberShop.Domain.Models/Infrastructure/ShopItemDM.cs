using System;
using System.Collections.Generic;
using System.Text;

namespace CyberShop.Domain.Models.Infrastructure
{
    public class ShopItemDM
    {
        public long ShopItemId { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }


    }
}
