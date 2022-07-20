using LeaveManagment.Entity;
using LeaveManagment.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MailKit.Security;
using System.IO;
using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
namespace LeaveManagment.Controllers
{
    [ApiController]
    [Route("email")]
    public class EmailController : ControllerBase
    {
        private readonly MailSettings _mailSettings;
        public EmailController(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }
        [HttpPost]
        public async Task sendEmail(MailRequest request)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(request.ToEmail));
            email.Subject = request.Subject;
            var builder = new BodyBuilder();
            if (request.Attachments != null)
            {
                byte[] fileBytes;
                foreach (var file in request.Attachments)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileBytes = ms.ToArray();
                        }
                        builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                    }
                }
            }
            builder.HtmlBody = request.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

    }
}