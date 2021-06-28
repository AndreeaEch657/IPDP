using System.ComponentModel.DataAnnotations;

namespace CyberShop.Web.Models.AccountModels
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}