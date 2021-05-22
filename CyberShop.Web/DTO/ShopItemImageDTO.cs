using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace CyberShop.Web.DTO
{
    public class ShopItemImageDTO
    {
        public long ImageId { get; set; }
        public IFormFile Image { get; set; }
        public long ShopItemId { get; set; }
    }
}
