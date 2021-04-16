using System;

namespace CyberShop.Domain.Models.Core
{
    public class AppUserDM
    {
        public string FullName { get { return String.Concat(FirstName, " ", LastName); } }

        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        //TODO: add the rest of the properties form thr app user EF model
    }
}