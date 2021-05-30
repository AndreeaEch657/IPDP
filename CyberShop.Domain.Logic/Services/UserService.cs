using CyberShop.Data.EFModels;
using CyberShop.Domain.Models.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CyberShop.Data.DBContext;
using Microsoft.EntityFrameworkCore;

namespace CyberShop.Domain.Logic.Services
{
    public class UserService 
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<UserService> _logger;
        private static Random random = new Random();
        private readonly ApplicationDbContext _dbContext;

        public UserService(UserManager<AppUser> userManager, ILogger<UserService> logger, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _logger = logger;
            _dbContext = dbContext;
        }

        public IEnumerable<AppUserDM> GetUsers()
        {

            return _userManager.Users.Select(u => new AppUserDM()
            {
                Id = u.Id,
                Email = u.Email,
                LastName = u.LastName,
                FirstName = u.FirstName,
                Status = u.Status
            });
        }


        private AppUserDM MapToDm(AppUser efModel)
        {
            if (efModel == null)
            {
                return null;
            }
            var newModel = new AppUserDM();
            newModel.Id = efModel.Id;
            newModel.FirstName = efModel.FirstName;
            newModel.LastName = efModel.LastName;
            newModel.Email = efModel.Email;

            return newModel;

        }

        private AppUser MapToEf(AppUserDM dmModel)
        {
            if (dmModel == null)
            {
                return null;
            }

            var newModel = new AppUser();
            newModel.UserName = dmModel.Email;
            newModel.NormalizedEmail = dmModel.Email.ToUpper();
            newModel.NormalizedUserName = dmModel.Email.ToUpper();
            newModel.Id = dmModel.Id;
            newModel.FirstName = dmModel.FirstName;
            newModel.LastName = dmModel.LastName;
            newModel.Email = dmModel.Email;
            newModel.Status = dmModel.Status;

            return newModel;

        }

        public async Task<string> AddUser(AppUserDM model)
        {
            var newAppUser = MapToEf(model);

            var result = await _userManager.CreateAsync(newAppUser, model.Password);

            if (result.Succeeded)
            {
                return newAppUser.Id;
            }
            return null;

        }

        public async Task<bool> DeleteUser(String email)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(acc => acc.Email == email);
            if (user != null)
            {
                user.Status = "Inactive";
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;

        }
    }
}
