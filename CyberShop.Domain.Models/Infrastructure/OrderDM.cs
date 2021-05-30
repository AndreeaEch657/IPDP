namespace CyberShop.Domain.Models.Infrastructure
{
    public class OrderDM
    {
        public long OrderId { get; set; }
        public string UserId { get; set; }

        public string Status { get; set; }
        public long TransactionId { get; set; }
        public string Address { get; set; }

    }
}