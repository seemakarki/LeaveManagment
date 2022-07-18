using System;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace LeaveManagment.Models
{
    public static class PasswordHelper
    {
        private static class Salt
        {
            public static string Create(string userName)
            {
                byte[] randomBytes = Encoding.UTF8.GetBytes(userName);
                return Convert.ToBase64String(randomBytes);
            }
        }

        public static string CreateHash(string password, string userName)
        {
            var salt = Salt.Create(userName);
            var valueBytes = KeyDerivation.Pbkdf2(
                password,
                salt: Encoding.UTF8.GetBytes(salt),
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8);

            var hash = Convert.ToBase64String(valueBytes);
            return hash;
        }

        public static bool Validate(string user, string password, string hash)
        {
            var hashedPw = CreateHash(password, user);
            return hashedPw == hash;
        }
    }
}