namespace CyberShop.Domain.Models.Infrastructure
{
    public class CartItemDM
    {
        public long CartItemId { get; set; }
        public long CartId { get; set; }
        public long ShopItemId { get; set; }
        public long NumberOfItems { get; set; }
    }
}