namespace CyberShop.Data.EFModels
{
    public class CartItem
    {
        public long CartItemId { get; set; } 
        public long CartId { get; set; }
        public long ShopItemId { get; set; }
        public long NumberOfItems { get; set; }

        public Cart Cart { get; set; }
        public ShopItem ShopItem { get; set; }

    }
}