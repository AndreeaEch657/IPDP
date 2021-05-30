using System;

namespace CyberShop.Domain.Models.Infrastructure
{
    public class OrderItemTransferObject
    {
        public string TiTle { get; set; }
        public string ImagePath { get; set; }
        public long Amount { get; set; }
    }
}