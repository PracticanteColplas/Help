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
    public class OperarioCorridaImpresionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public OperarioCorridaImpresionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listOperarioCorridaImpresion = await _context.OperarioCorridaImpresion.ToListAsync().ConfigureAwait(false);
                return Ok(listOperarioCorridaImpresion);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OperarioCorridaImpresion operarioCorridaImpresion)
        {
            try
            {
                _context.Add(operarioCorridaImpresion);
                await _context.SaveChangesAsync();
                return Ok(operarioCorridaImpresion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] OperarioCorridaImpresion operarioCorridaImpresion)
        {
            try
            {
                if (id != operarioCorridaImpresion.Pk_OperarioCorridaImpresion)
                {
                    return NotFound();
                }

                _context.Update(operarioCorridaImpresion);
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
                var operarioCorridaImpresion = await _context.OperarioCorridaImpresion.FindAsync(id);

                if (operarioCorridaImpresion == null)
                {
                    return NotFound();
                }

                _context.OperarioCorridaImpresion.Remove(operarioCorridaImpresion);
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
