using System;
using CyberShop.Data.DBContext;
using CyberShop.Data.EFModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AddAdminConsollApp
{
    class Program
    {
        private static string _connectionString = "Server=DESKTOP-DQNERQQ\\SQLEXPRESS;Database=CyberShop;Trusted_Connection=True;";


        static async System.Threading.Tasks.Task Main(string[] args)
        {


            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer(_connectionString)
                .Options;

            // With the options generated above, we can then just construct a new DbContext class
            using (var ctx = new ApplicationDbContext(options))
            {

                string adminMail = "p.razvan_99@yahoo.ro";

                //var newUser = ctx.Users.Add(new AppUser
                //{
                //    UserName = adminMail,
                //    Email = adminMail,
                //    NormalizedEmail = adminMail.ToUpper(),
                //    Id = Guid.NewGuid().ToString()
                //});


                //ctx.SaveChanges();


                var user = await ctx.Users.FirstOrDefaultAsync(acc => acc.Email == adminMail);
                ctx.Roles.Add(new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "Admin",

                });
                ctx.SaveChanges();

                var role = await ctx.Roles.FirstOrDefaultAsync(role => role.Name == "Admin");

                ctx.UserRoles.Add(new IdentityUserRole<string>()
                {
                    UserId = user.Id,
                    RoleId = role.Id
                });

                ctx.SaveChanges();

            }

        }
    }
}
