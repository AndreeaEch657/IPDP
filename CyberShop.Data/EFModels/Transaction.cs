using System;

namespace CyberShop.Data.EFModels
{
    public class Transaction
    {
        public long TransactionId { get; set; }
        public double Total { get; set; }
        public long CartId { get; set; }
        public DateTime Date { get; set; }
        public Cart Cart { get; set; }

    }
}