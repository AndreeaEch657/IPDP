using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CyberShop.Data.DBContext;
using CyberShop.Domain.Logic.Services;
using CyberShop.Domain.Models.Infrastructure;
using CyberShop.Web.DTO;
using EYHF.Web.Controllers.Api;
using Microsoft.AspNetCore.Authorization;

namespace CyberShop.Web.Controllers.Dashboard
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class TransactionController : BaseApiController
    {
        private readonly TransactionService _transactionService;
        
        public TransactionController(TransactionService transactionService, ApplicationDbContext ctx): base(ctx)
        {

            _transactionService = transactionService;
      
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] TransactionDTO model)
        {
            if (ModelState.IsValid)
            {
                var orderId = await _transactionService.AddNewOrder(CurrentUserID, model.CartItems, model.ShippingAddress);
                return Ok(orderId);
            }

            return BadRequest();
        }
        [HttpGet]
        public async Task<IEnumerable<UserOrderDM>> GetUserOrders()
        {
            if (User.IsInRole("Admin"))
            {
                return await _transactionService.GetAdminDetailedOrders();
            }
            return await _transactionService.GetUserDetailedOrders(CurrentUserID);
        }

        [HttpGet("{id}")]
        public async Task<IEnumerable<OrderItemTransferObject>> GetOrderItems(long id)
        {
            return await _transactionService.GetOrderItems(id);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<UserOrderDM>> GetAdminOrders()
        {
            return await _transactionService.GetAdminDetailedOrders();

        }
    }
}
