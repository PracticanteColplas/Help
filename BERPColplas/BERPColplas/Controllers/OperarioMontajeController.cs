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
    public class OperarioMontajeController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public OperarioMontajeController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listOperarioMontaje = await _context.OperarioMontaje.ToListAsync().ConfigureAwait(false);
                return Ok(listOperarioMontaje);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OperarioMontaje operarioMontaje)
        {
            try
            {
                _context.Add(operarioMontaje);
                await _context.SaveChangesAsync();
                return Ok(operarioMontaje);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] OperarioMontaje operarioMontaje)
        {
            try
            {
                if (id != operarioMontaje.Pk_OperarioMontaje)
                {
                    return NotFound();
                }

                _context.Update(operarioMontaje);
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
                var OperarioMontaje = await _context.OperarioMontaje.FindAsync(id);

                if (OperarioMontaje == null)
                {
                    return NotFound();
                }

                _context.OperarioMontaje.Remove(OperarioMontaje);
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
