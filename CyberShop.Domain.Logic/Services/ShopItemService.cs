using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CyberShop.Data.DBContext;
using CyberShop.Data.EFModels;
using CyberShop.Domain.Models.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace CyberShop.Domain.Logic.Services
{
    public class ShopItemService
    {
        private readonly ApplicationDbContext _ctx;

        public ShopItemService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IEnumerable<ShopItemDM>> GetAllShopItems()
        {
            return await _ctx.ShopItems.Select(s => new ShopItemDM
            {
                Category = s.Category,
                Description = s.Description,
                Price = s.Price,
                ShopItemId = s.ShopItemId,
                Title = s.Title
            }).ToListAsync();
        }

        public async Task<IEnumerable<ShopItemImageDM>> GetImagesForItem(Guid shopItemId)
        {
            return await _ctx.ShopItemImages
                .Where(s => s.ShopItemId == shopItemId)
                .Select(s => new ShopItemImageDM
                {
                    Image = s.Image,
                    ImageId = s.ImageId,
                    ShopItemId = s.ShopItemId
                }).ToListAsync();
        }

        public async Task<Guid> AddShopItem(ShopItemDM model)
        {
            _ctx.ShopItems.Add(new ShopItem
            {
                Category = model.Category,
                Description = model.Description,
                Price = model.Price,
                ShopItemId = model.ShopItemId,
                Title = model.Title,
            });
            await _ctx.SaveChangesAsync();
            return model.ShopItemId;
        }

        public async Task<Guid> AddShopItemImage(ShopItemImageDM model)
        {
            _ctx.ShopItemImages.Add(new ShopItemImage
            {
                Image = model.Image,
                ImageId = Guid.NewGuid(),
                ShopItemId = model.ShopItemId
            });
            await _ctx.SaveChangesAsync();
            return model.ShopItemId;
        }
    }
}