using System.Collections.Generic;

namespace CyberShop.Data.EFModels
{
    public class Cart
    {
        public long CartId { get; set; }

        public List<CartItem> CartItems { get; set; }
    }
}