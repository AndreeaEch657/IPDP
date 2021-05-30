using System;

namespace CyberShop.Domain.Models.Infrastructure
{
    public class UserOrderDM
    {
        public string UserId { get; set; }
        public long OrderId { get; set; }
        public DateTime Date { get; set; }
        public String Status { get; set; }
        public double Total { get; set; }
    }
}