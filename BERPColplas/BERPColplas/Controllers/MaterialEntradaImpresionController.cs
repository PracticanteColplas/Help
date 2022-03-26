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
    public class MaterialEntradaImpresionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public MaterialEntradaImpresionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listMaterialEntradaImpresion = await _context.MaterialEntradaImpresion.ToListAsync().ConfigureAwait(false);
                return Ok(listMaterialEntradaImpresion);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MaterialEntradaImpresion materialEntradaImpresion)
        {
            try
            {
                _context.Add(materialEntradaImpresion);
                await _context.SaveChangesAsync();
                return Ok(materialEntradaImpresion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] MaterialEntradaImpresion materialEntradaImpresion)
        {
            try
            {
                if (id != materialEntradaImpresion.Pk_NoLoteRolloMadreImpresion)
                {
                    return NotFound();
                }

                _context.Update(materialEntradaImpresion);
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
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var materialEntradaImpresion = await _context.MaterialEntradaImpresion.FindAsync(id);

                if (materialEntradaImpresion == null)
                {
                    return NotFound();
                }

                _context.MaterialEntradaImpresion.Remove(materialEntradaImpresion);
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
