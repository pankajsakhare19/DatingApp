using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ValuesController : Controller
    {
        public readonly DataContext Context;
        public ValuesController(DataContext context)
        {
            this.Context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetValues()
        {
            var values = Context.Values.ToList();
            return Ok(values);
        }

        
    }
}