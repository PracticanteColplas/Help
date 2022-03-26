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
    public class NotaRefiladoController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public NotaRefiladoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listNotaRefilado = await _context.NotaRefilado.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listNotaRefilado });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NotaRefilado notaRefilado)
        {
            try
            {
                _context.Add(notaRefilado);
                await _context.SaveChangesAsync();
                return Ok(notaRefilado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] NotaRefilado notaRefilado)
        {
            try
            {
                if (id != notaRefilado.Pk_NotaRefilado)
                {
                    return NotFound();
                }

                _context.Update(notaRefilado);
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
                var NotaRefilado = await _context.NotaRefilado.FindAsync(id);

                if (NotaRefilado == null)
                {
                    return NotFound();
                }

                _context.NotaRefilado.Remove(NotaRefilado);
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
