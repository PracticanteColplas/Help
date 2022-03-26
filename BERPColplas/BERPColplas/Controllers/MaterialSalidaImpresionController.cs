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
    public class MaterialSalidaImpresionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public MaterialSalidaImpresionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listMaterialSalidaImpresion = await _context.MaterialSalidaImpresion.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listMaterialSalidaImpresion });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MaterialSalidaImpresion materialSalidaImpresion)
        {
            try
            {
                _context.Add(materialSalidaImpresion);
                await _context.SaveChangesAsync();
                return Ok(materialSalidaImpresion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] MaterialSalidaImpresion materialSalidaImpresion)
        {
            try
            {
                if (id != materialSalidaImpresion.PK_NoLoteSalidaImpresion)
                {
                    return NotFound();
                }

                _context.Update(materialSalidaImpresion);
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
                var materialSalidaImpresion = await _context.MaterialSalidaImpresion.FindAsync(id);

                if (materialSalidaImpresion == null)
                {
                    return NotFound();
                }

                _context.MaterialSalidaImpresion.Remove(materialSalidaImpresion);
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
