using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CyberShop.Data.DBContext
{
    class ApplicationDbContextProvider
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var connectionString = "Server=DESKTOP-DQNERQQ\\SQLEXPRESS;Database=CyberShop;Trusted_Connection=True;";
            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            builder.UseSqlServer(connectionString);

            return new ApplicationDbContext(builder.Options);
        }
    }
}
