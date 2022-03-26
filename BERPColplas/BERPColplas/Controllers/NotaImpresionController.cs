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
    public class NotaImpresionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public NotaImpresionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listNotaImpresion = await _context.NotaImpresion.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listNotaImpresion });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NotaImpresion notaImpresion)
        {
            try
            {
                _context.Add(notaImpresion);
                await _context.SaveChangesAsync();
                return Ok(notaImpresion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] NotaImpresion notaImpresion)
        {
            try
            {
                if (id != notaImpresion.Pk_NotaImpresion)
                {
                    return NotFound();
                }

                _context.Update(notaImpresion);
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
                var notaImpresion = await _context.NotaImpresion.FindAsync(id);

                if (notaImpresion == null)
                {
                    return NotFound();
                }

                _context.NotaImpresion.Remove(notaImpresion);
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
