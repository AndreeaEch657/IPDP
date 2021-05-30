using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CyberShop.Data.DBContext;

namespace EYHF.Web.Controllers.Api
{
    public abstract class BaseApiController : Controller
    {
        private readonly ApplicationDbContext _ctx;

        protected BaseApiController(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }


        public string  CurrentUserID { 
            //TODO: get it form current context based on identity 
            get {
                return _ctx.Users.Where(s => s.UserName == User.Identity.Name).FirstOrDefault().Id;
            } 
        }
    }
}
