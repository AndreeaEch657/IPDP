using System;
using System.Collections.Generic;
using System.Text;
using CyberShop.Data.EFModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CyberShop.Data.Configuration
{
    
    class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.
                Property(e => e.FirstName)
                .HasMaxLength(50);
            builder.
                Property(e => e.LastName)
                .HasMaxLength(50);
        }
    }
    
}
