using System.Collections.Generic;
using CyberShop.Domain.Models.Infrastructure;

namespace CyberShop.Web.DTO
{
    public class TransactionDTO
    {
        public List<CheckoutTransferObject> CartItems { get; set; }
        public string ShippingAddress { get; set; }
    }
}