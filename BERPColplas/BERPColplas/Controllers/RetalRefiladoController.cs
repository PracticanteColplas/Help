using BERPColplas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BERPColplas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetalRefiladoController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public RetalRefiladoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listRetalRefilado = await _context.RetalRefilado.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listRetalRefilado });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

    }
}
