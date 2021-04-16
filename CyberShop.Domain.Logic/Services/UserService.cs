using CyberShop.Data.EFModels;
using CyberShop.Domain.Models.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberShop.Domain.Logic.Services
{
    public class UserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<UserService> _logger;
        private static Random random = new Random();

        public UserService(UserManager<AppUser> userManager, ILogger<UserService> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        public IEnumerable<AppUserDM> GetUsers()
        {

            return _userManager.Users.Select(u => new AppUserDM()
            {
                Id = u.Id,
                Email = u.Email,
                LastName = u.LastName,
                FirstName = u.FirstName,
            });
        }


        public IEnumerable<AppUserDM> GetPointEligibleUsers()
        {

            return _userManager
                .Users
                //TODO: add eligible condition here
                .Where(u => true)
                .Select(u => new AppUserDM()
                {
                    Id = u.Id,
                    Email = u.Email,
                    LastName = u.LastName,
                    FirstName = u.FirstName,
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

            return newModel;

        }

        public async Task<string> AddUser(AppUserDM model)
        {
            var newAppUser = MapToEf(model);
            var newPassword = RandomPassword(10);



            var result = await _userManager.CreateAsync(newAppUser, newPassword);

            if (result.Succeeded)
            {
                return newAppUser.Id;
            }
            return null;

        }

        //public async Task<bool> DeleteUser(String email)
        //{
        //    var user = await _userManager.FindByEmailAsync(email);
        //    if (user != null)
        //    {
        //        user.Status = "Inactive";
        //        return true;
        //    }
        //    return false;

        //}
        private static string RandomPassword(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray()) + "a99";
        }
    }
}
