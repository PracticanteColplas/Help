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
    public class MPriExtrusionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public MPriExtrusionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listMPriExtrusion = await _context.MPriExtrusion.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listMPriExtrusion });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

    }
}
