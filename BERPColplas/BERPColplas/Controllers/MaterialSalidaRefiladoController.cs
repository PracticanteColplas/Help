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
    public class MaterialSalidaRefiladoController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public MaterialSalidaRefiladoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listMaterialSalidaRefilado = await _context.MaterialSalidaRefilado.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listMaterialSalidaRefilado });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MaterialSalidaRefilado materialSalidaRefilado)
        {
            try
            {
                _context.Add(materialSalidaRefilado);
                await _context.SaveChangesAsync();
                return Ok(materialSalidaRefilado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] MaterialSalidaRefilado materialSalidaRefilado)
        {
            try
            {
                if (id != materialSalidaRefilado.PK_NoLoteSalidaRefilado)
                {
                    return NotFound();
                }

                _context.Update(materialSalidaRefilado);
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
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var materialSalidaRefilado = await _context.MaterialSalidaRefilado.FindAsync(id);

                if (materialSalidaRefilado == null)
                {
                    return NotFound();
                }

                _context.MaterialSalidaRefilado.Remove(materialSalidaRefilado);
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
