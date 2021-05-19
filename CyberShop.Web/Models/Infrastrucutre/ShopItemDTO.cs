using System.ComponentModel.DataAnnotations;

namespace CyberShop.Web.Models.Infrastrucutre
{
    public class ShopItemDTO
    {
        [Required]
        public string Title { get; set; }
        public string Category { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public double Price { get; set; }
    }
}