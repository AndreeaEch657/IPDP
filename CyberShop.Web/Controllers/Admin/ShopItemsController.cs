using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CyberShop.Data.EFModels;
using CyberShop.Domain.Logic.Services;
using CyberShop.Domain.Models.Infrastructure;
using CyberShop.Web.Models.Infrastrucutre;
using System.Net.Http;
using CyberShop.Web.DTO;
using Microsoft.AspNetCore.Hosting;

namespace CyberShop.Web.Controllers.Admin
{
    //[Route("api/ShopItems")]
    
    public class ShopItemsController : Controller
    {
        private ShopItemService _shopItemService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ShopItemsController(ShopItemService shopItemService, IWebHostEnvironment hostEnvironment)
        {
            _shopItemService = shopItemService;
            _hostEnvironment = hostEnvironment;
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
                    Title = model.Title
                });

                return Ok();
            }
            return BadRequest();
        }

        private async Task<string> SaveImage(IFormFile imgFile, long shopItemId)
        {
            string subPath = "./wwwroot/Images/" + shopItemId;
            bool exists = System.IO.Directory.Exists(subPath);

            if (!exists)
                System.IO.Directory.CreateDirectory(subPath);
            string imageName = imgFile.FileName + DateTime.Now.ToString("yymmssfff");
            var imagePath = subPath + "/" + imgFile.FileName;
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imgFile.CopyToAsync(fileStream);
            }

            return imagePath;
        }
        [HttpPost]
        public async Task<IActionResult> AddShopItemImage([FromForm] ShopItemImageDTO model)
        {

            string imagePath = await SaveImage(model.Image, model.ShopItemId);
            imagePath = imagePath.Replace("wwwroot/", "");
            imagePath = imagePath.Remove(0, 1);

            if (ModelState.IsValid)
            {
                ShopItemImageDM data = new ShopItemImageDM
                {
                    ShopItemId = model.ShopItemId,
                    ImagePath = imagePath
                };
                await _shopItemService.AddShopItemImage(data);
                return Ok();
            }

            return BadRequest();
        }
        [HttpGet]
        public async Task<IEnumerable<CompleteShopItem>> GetCompleteShopItems()
        {
            return await _shopItemService.GetCompleteShopItems();
        }

    }
}
