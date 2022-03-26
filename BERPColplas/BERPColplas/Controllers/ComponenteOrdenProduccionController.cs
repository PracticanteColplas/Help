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
    public class ComponenteOrdenProduccionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public ComponenteOrdenProduccionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ComponenteOrdenProduccionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listComponenteOrdenProduccion = await _context.ComponenteOrdenProduccion.ToListAsync().ConfigureAwait(false);
                return Ok(listComponenteOrdenProduccion);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

    }
}
