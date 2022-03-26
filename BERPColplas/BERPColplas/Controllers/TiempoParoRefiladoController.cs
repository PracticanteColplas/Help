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
    public class TiempoParoRefiladoController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public TiempoParoRefiladoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<TiempoParoExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listTiempoParoRefilado = await _context.TiempoParoRefilado.ToListAsync().ConfigureAwait(false);
                return Ok(listTiempoParoRefilado);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<TiempoParoExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TiempoParoRefilado tiempoParoRefilado)
        {
            try
            {
                _context.Add(tiempoParoRefilado);
                await _context.SaveChangesAsync();
                return Ok(tiempoParoRefilado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<TiempoParoExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TiempoParoRefilado tiempoParoRefilado)
        {
            try
            {
                if (id != tiempoParoRefilado.Pk_TiempoParoRefilado)
                {
                    return NotFound();
                }

                _context.Update(tiempoParoRefilado);
                await _context.SaveChangesAsync();
                return Ok(new { message = "El campo fue actualizada con exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<TiempoParoExtrusionController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var tiempoParoRefilado = await _context.TiempoParoRefilado.FindAsync(id);

                if (tiempoParoRefilado == null)
                {
                    return NotFound();
                }

                _context.TiempoParoRefilado.Remove(tiempoParoRefilado);
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
