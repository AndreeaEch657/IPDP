using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EYHF.Web.Controllers.Api
{
    public abstract class BaseApiController : Controller
    {
 

        public string  CurrentUserID { 
            //TODO: get it form current context based on identity 
            get {
                return "";
            } 
        }
    }
}
