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
    public class RetalImpresionCantidadController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public RetalImpresionCantidadController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listRetalImpresionCantidad = await _context.RetalImpresionCantidad.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listRetalImpresionCantidad });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RetalImpresionCantidad retalImpresionCantidad)
        {
            try
            {
                _context.Add(retalImpresionCantidad);
                await _context.SaveChangesAsync();
                return Ok(retalImpresionCantidad);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] RetalImpresionCantidad retalImpresionCantidad)
        {
            try
            {
                if (id != retalImpresionCantidad.Pk_RetalImpresionCantidad)
                {
                    return NotFound();
                }

                _context.Update(retalImpresionCantidad);
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
                var retalImpresionCantidad = await _context.RetalImpresionCantidad.FindAsync(id);

                if (retalImpresionCantidad == null)
                {
                    return NotFound();
                }

                _context.RetalImpresionCantidad.Remove(retalImpresionCantidad);
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
