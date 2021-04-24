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

        public DbSet<ShopItem> ShopItems;
        public DbSet<ShopItemImage> ShopItemImages;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new AppUserConfiguration());
            builder.ApplyConfiguration(new ShopItemConfiguration());
            builder.ApplyConfiguration(new ShopItemImageConfiguration());
        }
    }
}
