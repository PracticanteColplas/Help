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
    public class TiempoMontajeController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public TiempoMontajeController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listTiempoMontaje = await _context.TiempoMontaje.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listTiempoMontaje });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TiempoMontaje tiempoMontaje)
        {
            try
            {
                _context.Add(tiempoMontaje);
                await _context.SaveChangesAsync();
                return Ok(tiempoMontaje);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TiempoMontaje tiempoMontaje)
        {
            try
            {
                if (id != tiempoMontaje.Pk_TiempoMontaje)
                {
                    return NotFound();
                }

                _context.Update(tiempoMontaje);
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
                var tiempoMontaje = await _context.TiempoMontaje.FindAsync(id);

                if (tiempoMontaje == null)
                {
                    return NotFound();
                }

                _context.TiempoMontaje.Remove(tiempoMontaje);
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
