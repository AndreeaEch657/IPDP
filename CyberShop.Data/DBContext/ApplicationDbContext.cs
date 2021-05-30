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
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Transaction> Transactions { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new AppUserConfiguration());
            builder.ApplyConfiguration(new ShopItemConfiguration());
            builder.ApplyConfiguration(new ShopItemImageConfiguration());
            builder.ApplyConfiguration(new CartConfiguration());
            builder.ApplyConfiguration(new CartItemConfiguration());
            builder.ApplyConfiguration(new OrderConfiguration());
            builder.ApplyConfiguration(new TransactionConfiguration());
        }
    }
}
