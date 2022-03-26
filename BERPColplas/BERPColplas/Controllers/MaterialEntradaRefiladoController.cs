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
    public class MaterialEntradaRefiladoController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public MaterialEntradaRefiladoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ReprocesoController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listMaterialEntradaRefilado = await _context.MaterialEntradaRefilado.ToListAsync().ConfigureAwait(false);
                return Ok(listMaterialEntradaRefilado);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // POST api/<ReprocesoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MaterialEntradaRefilado materialEntradaRefilado)
        {
            try
            {
                _context.Add(materialEntradaRefilado);
                await _context.SaveChangesAsync();
                return Ok(materialEntradaRefilado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ReprocesoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] MaterialEntradaRefilado materialEntradaRefilado)
        {
            try
            {
                if (id != materialEntradaRefilado.Pk_NoLoteRolloMadreRefilado)
                {
                    return NotFound();
                }

                _context.Update(materialEntradaRefilado);
                await _context.SaveChangesAsync();
                return Ok(new { message = "El campo fue actualizada con exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<ReprocesoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var materialEntradaRefilado = await _context.MaterialEntradaRefilado.FindAsync(id);

                if (materialEntradaRefilado == null)
                {
                    return NotFound();
                }

                _context.MaterialEntradaRefilado.Remove(materialEntradaRefilado);
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
