using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CyberShop.Data.EFModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CyberShop.Domain.Logic.Services;
using CyberShop.Domain.Models.Core;
using CyberShop.Web.Models.AccountModels;

namespace CyberShop.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ILogger<AccountController> _logger;
        private readonly IHttpClientFactory _clientFactory;
        private readonly UserService _userService;

        public AccountController(SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager,
            ILogger<AccountController> logger,
            IHttpClientFactory clientFactory,
            UserService userService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _clientFactory = clientFactory;
            _userService = userService;

        }


        [AllowAnonymous]
        [HttpGet]
        public IActionResult Login(string returnUrl = "/")
        {
            if (User.Identity.IsAuthenticated)
            {
                return View("~/Views/Home/Index.cshtml");

            }

            return View();
        }
        [AllowAnonymous]
        [HttpGet]
        public IActionResult Register(string returnUrl = "/")
        {
            if (User.Identity.IsAuthenticated)
            {
                return View("~/Views/Home/Index.cshtml");

            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {



            if (ModelState.IsValid)
            {

                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

                if (result.Succeeded)
                {
                    return Ok();
                }

                else
                {
                    return Unauthorized("Wrong email or password");
                }

            }
            else
            {
                return Unauthorized("Something went wrong");
            }

        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterModelDTO model)
        {

            if (ModelState.IsValid)
            {
                var newUser = new AppUserDM { Id = Guid.NewGuid().ToString(), Email = model.Email, FirstName = model.FirstName, LastName = model.LastName, Password = model.Password};
                var newRegisteredUserId = await _userService.AddUser(newUser);
                if (newRegisteredUserId != null)
                {

                    return Ok();

                }

                return BadRequest("Something bad happened, please try again");
            }
            return BadRequest("Something bad happened, please try again");


        }

        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<AppUserDM> GetUsers()
        {
            return _userService.GetUsers();
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Redirect("/");
        }
    }
}
