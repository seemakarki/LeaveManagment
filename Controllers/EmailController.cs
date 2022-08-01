using LeaveManagment.Entity;
using LeaveManagment.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MailKit.Security;
using System.IO;
using MimeKit;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Text;
using System;
using Microsoft.AspNetCore.Authorization;

namespace LeaveManagment.Controllers
{
    [Authorize]
    [ApiController]
    [Route("email")]
    public class EmailController : ControllerBase
    {
      
        [HttpPost]
        public async Task sendEmail(MailRequest request)
        {
            string from = "seema.carkeey@gmail.com"; //From address    
            MailMessage message = new MailMessage(from, request.ToEmail);
            message.Subject = request.Subject;
            message.Body = request.Body;
            message.BodyEncoding = Encoding.UTF8;
            message.IsBodyHtml = true;
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587); //Gmail smtp    
            System.Net.NetworkCredential basicCredential1 = new
            System.Net.NetworkCredential("seema.carkeey@gmail.com", "hkzqomfrrkvmxmuh");
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = basicCredential1;
            try
            {
                client.Send(message);
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}