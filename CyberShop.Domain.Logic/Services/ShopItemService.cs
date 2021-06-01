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

        public async Task<String> GetImagePathForItem(long shopItemId)
        {
            var list =  await _ctx.ShopItemImages
                .Where(s => s.ShopItemId == shopItemId)
                .Select(s => new ShopItemImageDM
                {
                    ImagePath = s.ImagePath,
                    ImageId = s.ImageId,
                    ShopItemId = s.ShopItemId
                }).ToListAsync();

            return list.Count > 0 ? list[0].ImagePath : "";
            
        }

        public async Task<long> AddShopItem(ShopItemDM model)
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

        public async Task <long> AddShopItemImage(ShopItemImageDM model)
        {
           

            await _ctx.ShopItemImages.AddAsync(new ShopItemImage
            {
                ImagePath = model.ImagePath,
                ShopItemId = model.ShopItemId,
                
            });
            await _ctx.SaveChangesAsync();
            return model.ShopItemId;
        }

        public async Task<IEnumerable<CompleteShopItem>> GetCompleteShopItems()
        {
            var shopItems = await GetAllShopItems();
            List<CompleteShopItem> shopItemsList = new List<CompleteShopItem>();
            foreach (var shopItem in shopItems)
            {

                var imagePath = (await GetImagePathForItem(shopItem.ShopItemId));

                shopItemsList.Add(new CompleteShopItem
                {
                    ShopItemId = shopItem.ShopItemId,
                    Category =  shopItem.Category,
                    Description =  shopItem.Description,
                    Price = shopItem.Price,
                    Title = shopItem.Title,
                    ImagePath = imagePath 
                });
            }

            return shopItemsList;

        } 


    }
}