using System;
using System.Collections.Generic;
using System.Text;
using CyberShop.Data.Configuration;
using CyberShop.Data.EFModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CyberShop.Data.DBContext
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {

       
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ShopItem> ShopItems { get; set; }
        public DbSet<ShopItemImage> ShopItemImages { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new AppUserConfiguration());
            builder.ApplyConfiguration(new ShopItemConfiguration());
            builder.ApplyConfiguration(new ShopItemImageConfiguration());
        }
    }
}
