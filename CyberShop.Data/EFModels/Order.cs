namespace CyberShop.Data.EFModels
{
    public class Order
    {
        public long OrderId { get; set; }
        public string UserId { get; set; }
  
        public string Status { get; set; }
        public long TransactionId { get; set; }

        public string Address { get; set; }

        public AppUser User { get; set; }
        public Transaction Transaction { get; set; }
    }
}