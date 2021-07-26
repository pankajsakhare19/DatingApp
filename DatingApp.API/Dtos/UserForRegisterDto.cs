using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage ="Password should be between 4 and 8 characters")]
        public string password { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}