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
    public class CorridaRefiladoController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public CorridaRefiladoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listCorridaRefilado = await _context.CorridaRefilado.ToListAsync().ConfigureAwait(false);
                return Ok(listCorridaRefilado);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CorridaRefilado corridaRefilado)
        {
            try
            {
                _context.Add(corridaRefilado);
                await _context.SaveChangesAsync();
                return Ok(corridaRefilado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CorridaRefilado corridaRefilado)
        {
            try
            {
                if (id != corridaRefilado.Pk_CorridaRefilado)
                {
                    return NotFound();
                }

                _context.Update(corridaRefilado);
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
                var corridaRefilado = await _context.CorridaRefilado.FindAsync(id);

                if (corridaRefilado == null)
                {
                    return NotFound();
                }

                _context.CorridaRefilado.Remove(corridaRefilado);
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
