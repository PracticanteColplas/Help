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
    public class OperarioCorridaRefiladoController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public OperarioCorridaRefiladoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listOperarioCorridaRefilado = await _context.OperarioCorridaRefilado.ToListAsync().ConfigureAwait(false);
                return Ok(listOperarioCorridaRefilado);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OperarioCorridaRefilado operarioCorridaRefilado)
        {
            try
            {
                _context.Add(operarioCorridaRefilado);
                await _context.SaveChangesAsync();
                return Ok(operarioCorridaRefilado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] OperarioCorridaRefilado operarioCorridaRefilado)
        {
            try
            {
                if (id != operarioCorridaRefilado.Pk_OperarioCorridaRefilado)
                {
                    return NotFound();
                }

                _context.Update(operarioCorridaRefilado);
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
                var operarioCorridaRefilado = await _context.OperarioCorridaRefilado.FindAsync(id);

                if (operarioCorridaRefilado == null)
                {
                    return NotFound();
                }

                _context.OperarioCorridaRefilado.Remove(operarioCorridaRefilado);
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
