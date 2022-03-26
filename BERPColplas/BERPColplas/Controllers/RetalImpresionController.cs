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
    public class RetalImpresionController : ControllerBase
    {
        private readonly AplicationDbContext _context;
         
        public RetalImpresionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listRetalImpresion = await _context.RetalImpresion.ToListAsync().ConfigureAwait(false);
                return Ok(listRetalImpresion);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        
    }
}
