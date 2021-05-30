using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Schema;
using CyberShop.Data.DBContext;
using CyberShop.Data.EFModels;
using CyberShop.Domain.Models.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace CyberShop.Domain.Logic.Services
{
    public class TransactionService
    {
        private readonly ApplicationDbContext _ctx;

        public TransactionService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IEnumerable<OrderDM>> GetAdminOrders()
        {
            return await _ctx.Orders.Select(s => new OrderDM
            {
                OrderId = s.OrderId,
                UserId = s.UserId,
                Status = s.Status,
                TransactionId = s.TransactionId
            }).ToListAsync();

        }

        private async Task<IEnumerable<OrderDM>> GetOrdersForUser(string userId)
        {
            return await _ctx.Orders
                .Where(s => s.UserId == userId)
                .Select(s => new OrderDM
                {
                    OrderId = s.OrderId,
                    UserId = s.UserId,
                    Status = s.Status,
                    TransactionId = s.TransactionId
                }).ToListAsync();
        }

        public async Task<IEnumerable<UserOrderDM>> GetUserDetailedOrders(string userId)
        {
            var orders = await GetOrdersForUser(userId);
            List<UserOrderDM> ordersList = new List<UserOrderDM>();

            foreach (var order in orders)
            {
                var total = (await _ctx.Transactions.Where(s => s.TransactionId == order.TransactionId).FirstOrDefaultAsync()).Total;
                var date = (await _ctx.Transactions.Where(s => s.TransactionId == order.TransactionId).FirstOrDefaultAsync()).Date;
                ordersList.Add(new UserOrderDM
                {
                    UserId = order.UserId,
                    OrderId = order.OrderId,
                    Date = date,
                    Status = order.Status,
                    Total = total
                });
            }

            ;


            return ordersList.AsEnumerable();
        }

        public async Task<IEnumerable<UserOrderDM>> GetAdminDetailedOrders()
        {
            var orders = await GetAdminOrders();
            List<UserOrderDM> ordersList = new List<UserOrderDM>();

            foreach (var order in orders)
            {
                var total = (await _ctx.Transactions.Where(s => s.TransactionId == order.TransactionId).FirstOrDefaultAsync()).Total;
                var date = (await _ctx.Transactions.Where(s => s.TransactionId == order.TransactionId).FirstOrDefaultAsync()).Date;
                ordersList.Add(new UserOrderDM
                {
                    UserId = order.UserId,
                    OrderId = order.OrderId,
                    Date = date,
                    Status = order.Status,
                    Total = total
                });
            }

            ;


            return ordersList.AsEnumerable();
        }


        public async Task<long> CreateCart()
        {
            Cart newCart = new Cart
            {
            };
            await _ctx.Carts.AddAsync(newCart);
            await _ctx.SaveChangesAsync();
            return newCart.CartId;

        }

        public async Task<long> AddNewCart(List<CheckoutTransferObject> selectedItems)
        {
            var cartId = await CreateCart();
            foreach (var item in selectedItems)
            {
                await _ctx.CartItems.AddAsync(new CartItem
                {
                    CartId = cartId,
                    ShopItemId = item.ShopItemId,
                    NumberOfItems = item.Amount
                });
            }

            await _ctx.SaveChangesAsync();

            return cartId;


        }

        public async Task<long> AddNewTransaction(List<CheckoutTransferObject> selectedItems)
        {
            var cartId = await AddNewCart(selectedItems);
            double total = 0;
            foreach (var item in selectedItems)
            {
                var shopItem = await _ctx.ShopItems.Where(s => s.ShopItemId == item.ShopItemId).FirstOrDefaultAsync();
                total += shopItem.Price * item.Amount;
            }

            Transaction newTransaction = new Transaction
            {
                CartId = cartId,
                Total = total,
                Date = DateTime.UtcNow
            };
            await _ctx.Transactions.AddAsync(newTransaction);
            await _ctx.SaveChangesAsync();
            return newTransaction.TransactionId;

        }

        public async Task<long> AddNewOrder(string userId, List<CheckoutTransferObject> selectedItems, string address)
        {
            var transactionId = await AddNewTransaction(selectedItems);
            var newOrder = new Order
            {
                UserId = userId,
                Status = "In progress",
                TransactionId = transactionId,
                Address = address
            };
            await _ctx.Orders.AddAsync(newOrder);
            await _ctx.SaveChangesAsync();
            return newOrder.OrderId;
        }

        public async Task<IEnumerable<OrderItemTransferObject>> GetOrderItems(long orderId)
        {
            var transaction = _ctx.Transactions.FirstOrDefault((s =>
                              s.TransactionId == _ctx.Orders.FirstOrDefault(s => s.OrderId == orderId).TransactionId));
            List<OrderItemTransferObject> items = new List<OrderItemTransferObject>();
            if (transaction != null)
            {
                var cartItems = await GetCartItems(transaction.CartId);
                

                foreach (var item in cartItems)
                {
                    var shopItem = _ctx.ShopItems.FirstOrDefault(s => s.ShopItemId == item.ShopItemId);
                    if (shopItem != null)
                    {
                        string imagePath = _ctx.ShopItemImages.FirstOrDefault(s => s.ShopItemId == shopItem.ShopItemId).ImagePath;
                        items.Add(new OrderItemTransferObject
                        {
                            Amount = item.NumberOfItems,
                            ImagePath = imagePath,
                            TiTle = shopItem.Title

                        });
                    }
                   

                }
            }

            return items.AsEnumerable();


        }

        private async Task<IEnumerable<CartItemDM>> GetCartItems(long cartId)
        {
            return await _ctx.CartItems.Where(s => s.CartId == cartId).Select(s => new CartItemDM
            {
                CartId = s.CartId,
                CartItemId = s.CartItemId,
                NumberOfItems = s.NumberOfItems,
                ShopItemId = s.ShopItemId
            }).ToListAsync();
        }

    }
}