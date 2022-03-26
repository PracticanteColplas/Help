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
    public class RetalRefiladoCantidadController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public RetalRefiladoCantidadController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listRetalRefiladoCantidad = await _context.RetalRefiladoCantidad.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listRetalRefiladoCantidad });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RetalRefiladoCantidad retalRefiladoCantidad)
        {
            try
            {
                _context.Add(retalRefiladoCantidad);
                await _context.SaveChangesAsync();
                return Ok(retalRefiladoCantidad);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] RetalRefiladoCantidad retalRefiladoCantidad)
        {
            try
            {
                if (id != retalRefiladoCantidad.Pk_RetalRefiladoCantidad)
                {
                    return NotFound();
                }

                _context.Update(retalRefiladoCantidad);
                await _context.SaveChangesAsync();
                return Ok(new { message = "El campo fue actualizada con exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<MaterialSalidaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var retalRefiladoCantidad = await _context.RetalRefiladoCantidad.FindAsync(id);

                if (retalRefiladoCantidad == null)
                {
                    return NotFound();
                }

                _context.RetalRefiladoCantidad.Remove(retalRefiladoCantidad);
                //return Ok(new { message = _context.CorridaExtrusion });
                await _context.SaveChangesAsync();
                return Ok(new { message = "El campo ha sido eliminada con exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
