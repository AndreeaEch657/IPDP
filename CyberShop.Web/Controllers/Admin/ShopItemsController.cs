using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CyberShop.Data.EFModels;
using CyberShop.Domain.Logic.Services;
using CyberShop.Domain.Models.Infrastructure;
using CyberShop.Web.Models.Infrastrucutre;

namespace CyberShop.Web.Controllers.Admin
{
    //[Route("api/ShopItems")]
    
    public class ShopItemsController : Controller
    {
        private ShopItemService _shopItemService;

        public ShopItemsController(ShopItemService shopItemService)
        {
            _shopItemService = shopItemService;
        }

        [HttpGet]
        public async Task<IEnumerable<ShopItemDM>> GetShopItems()
        {
            return await _shopItemService.GetAllShopItems();
        }
        [HttpPost]
        public async Task<IActionResult> AddShopItem([FromBody] ShopItemDTO model)
        {
            if (ModelState.IsValid)
            {
                await _shopItemService.AddShopItem(new ShopItemDM
                {
                    Category = model.Category,
                    Description = model.Description,
                    Price = model.Price,
                    ShopItemId = Guid.NewGuid(),
                    Title = model.Title
                });

                return Ok();
            }
            return BadRequest();
        }
        [HttpPost]
        public async Task<IActionResult> AddShopItemImage([FromBody] ShopItemImageDM model)
        {
            if (ModelState.IsValid)
            {
                await _shopItemService.AddShopItemImage(model);
                return Ok();
            }

            return BadRequest();
        }

        public async Task<IEnumerable<ShopItemImageDM>> GetShopItemImages([FromBody] Guid model)
        {
            if (ModelState.IsValid)
            {
                return await _shopItemService.GetImagesForItem(model);

            }

            return null;
        }
    }
}
