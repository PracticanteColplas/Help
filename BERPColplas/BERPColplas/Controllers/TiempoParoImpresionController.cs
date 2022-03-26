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
    public class TiempoParoImpresionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public TiempoParoImpresionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listTiempoParoImpresion = await _context.TiempoParoImpresion.ToListAsync().ConfigureAwait(false);
                return Ok(listTiempoParoImpresion);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TiempoParoImpresion tiempoParoImpresion)
        {
            try
            {
                _context.Add(tiempoParoImpresion);
                await _context.SaveChangesAsync();
                return Ok(tiempoParoImpresion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TiempoParoImpresion tiempoParoImpresion)
        {
            try
            {
                if (id != tiempoParoImpresion.Pk_TiempoParoImpresion)
                {
                    return NotFound();
                }

                _context.Update(tiempoParoImpresion);
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
                var tiempoParoImpresion = await _context.TiempoParoImpresion.FindAsync(id);

                if (tiempoParoImpresion == null)
                {
                    return NotFound();
                }

                _context.TiempoParoImpresion.Remove(tiempoParoImpresion);
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
