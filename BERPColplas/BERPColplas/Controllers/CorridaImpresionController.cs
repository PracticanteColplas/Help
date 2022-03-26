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
    public class CorridaImpresionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public CorridaImpresionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listCorridaImpresion = await _context.CorridaImpresion.ToListAsync().ConfigureAwait(false);
                return Ok(listCorridaImpresion);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CorridaImpresion corridaImpresion)
        {
            try
            {
                _context.Add(corridaImpresion);
                await _context.SaveChangesAsync();
                return Ok(corridaImpresion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CorridaImpresion corridaImpresion)
        {
            try
            {
                if (id != corridaImpresion.Pk_CorridaImpresion)
                {
                    return NotFound();
                }

                _context.Update(corridaImpresion);
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
                var corridaImpresion = await _context.CorridaImpresion.FindAsync(id);

                if (corridaImpresion == null)
                {
                    return NotFound();
                }

                _context.CorridaImpresion.Remove(corridaImpresion);
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
