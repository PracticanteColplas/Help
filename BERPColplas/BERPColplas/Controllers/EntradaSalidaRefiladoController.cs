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
    public class EntradaSalidaRefiladoController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public EntradaSalidaRefiladoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listEntradaSalidaRefilado = await _context.EntradaSalidaRefilado.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listEntradaSalidaRefilado });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EntradaSalidaRefilado entradaSalidaRefilado)
        {
            try
            {
                _context.Add(entradaSalidaRefilado);
                await _context.SaveChangesAsync();
                return Ok(entradaSalidaRefilado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EntradaSalidaRefilado entradaSalidaRefilado)
        {
            try
            {
                if (id != entradaSalidaRefilado.Pk_EntradaSalidaRefilado)
                {
                    return NotFound();
                }

                _context.Update(entradaSalidaRefilado);
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
                var entradaSalidaRefilado = await _context.EntradaSalidaRefilado.FindAsync(id);

                if (entradaSalidaRefilado == null)
                {
                    return NotFound();
                }

                _context.EntradaSalidaRefilado.Remove(entradaSalidaRefilado);
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
