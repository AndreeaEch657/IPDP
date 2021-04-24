using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using CyberShop.Data.DBContext;
using CyberShop.Data.EFModels;
using CyberShop.Domain.Models.Infrastructure;
using Microsoft.AspNetCore.Identity;

namespace CyberShop.Domain.Logic.Services
{
    public class ShopItemService
    {
        private readonly ApplicationDbContext _ctx;

        public ShopItemService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public IEnumerable<ShopItemDM> GetAllShopItems()
        {
            return _ctx.ShopItems.Select(s => new ShopItemDM
            {
                Category = s.Category,
                Description = s.Category,
                Price = s.Price,
                ShopItemId = s.ShopItemId,
                Title = s.Title
            });
        }

        public IEnumerable<ShopItemImageDM> GetImagesForItem(Guid shopItemId)
        {
            return _ctx.ShopItemImages
                .Where(s => s.ShopItemId == shopItemId)
                .Select(s => new ShopItemImageDM
                {
                    Image = s.Image,
                    ImageId = s.ImageId,
                    ShopItemId = s.ShopItemId
                });
        }

        public Guid AddShopItem(ShopItemDM model)
        {
            _ctx.ShopItems.Add(new ShopItem
            {
                Category = model.Category,
                Description = model.Description,
                Price = model.Price,
                ShopItemId = model.ShopItemId,
                Title = model.Title,
            });
            _ctx.SaveChanges();
            return model.ShopItemId;
        }

        public Guid AddShopItemImage(ShopItemImageDM model)
        {
            _ctx.ShopItemImages.Add(new ShopItemImage
            {
                Image = model.Image,
                ImageId = model.ImageId,
                ShopItemId = model.ShopItemId
            });
            _ctx.SaveChanges();
            return model.ShopItemId;
        }
    }
}