using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Mime;
using System.Security.Policy;
using System.Threading.Tasks;
using CyberShop.Data.DBContext;
using CyberShop.Data.EFModels;
using CyberShop.Domain.Logic.Services;
using CyberShop.Domain.Models.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace EYHF.Web.Controllers.Api
{
    [Authorize(Roles = "Admin")]
    public class UserAdminController : Controller
    {
        private readonly UserService _userService;
        private readonly ILogger<UserAdminController> _logger;
        private readonly UserManager<AppUser> _userManager;


        public UserAdminController(UserService userService,
           ILogger<UserAdminController> logger, 
           UserManager<AppUser> userManager)
        {
            _userService = userService;
            _logger = logger;
            _userManager = userManager;
        }

        public IEnumerable<AppUserDM> GetUsers()
        {
            return _userService.GetUsers();

        }
        [HttpDelete]
        public async Task<IActionResult> DeleteUsers([FromBody] String[] emails)
        {

            foreach (var email in emails)
            {
                var result = await _userService.DeleteUser(email);
                if (result == false)
                    return BadRequest("Something happened with deleting the users");
            }
            return Ok("All users deleted");

        }
    }
}