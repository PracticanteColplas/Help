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
    public class EntradaSalidaImpresionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public EntradaSalidaImpresionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listEntradaSalidaImpresion = await _context.EntradaSalidaImpresion.ToListAsync().ConfigureAwait(false);
                return Ok(listEntradaSalidaImpresion);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EntradaSalidaImpresion entradaSalidaImpresion)
        {
            try
            {
                _context.Add(entradaSalidaImpresion);
                await _context.SaveChangesAsync();
                return Ok(entradaSalidaImpresion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EntradaSalidaImpresion entradaSalidaImpresion)
        {
            try
            {
                if (id != entradaSalidaImpresion.Pk_EntradaSalidaImpresio)
                {
                    return NotFound();
                }

                _context.Update(entradaSalidaImpresion);
                await _context.SaveChangesAsync();
                return Ok(new { message = "El campo fue actualizada con exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<CorridaExtrusionController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entradaSalidaImpresion = await _context.EntradaSalidaImpresion.FindAsync(id);

                if (entradaSalidaImpresion == null)
                {
                    return NotFound();
                }

                _context.EntradaSalidaImpresion.Remove(entradaSalidaImpresion);
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
