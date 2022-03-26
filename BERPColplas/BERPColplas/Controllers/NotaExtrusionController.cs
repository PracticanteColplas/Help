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
    public class NotaExtrusionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public NotaExtrusionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listNotaExtrusion = await _context.NotaExtrusion.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listNotaExtrusion });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {

            Array[] myIntArray = new Array[1];

            try
            {
                var query = from u in _context.NotaExtrusion
                            where u.Fk_CorridaExtrusion == id
                            select new
                            {
                                Pk_NotaExtrusion = u.Pk_NotaExtrusion,
                                Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
                                Descripcion = u.Descripcion,
                            };

                var listMaterialSalidaD = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[0] = listMaterialSalidaD.ToArray();

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            return Ok(myIntArray);

        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NotaExtrusion notaExtrusion)
        {
            try
            {
                _context.Add(notaExtrusion);
                await _context.SaveChangesAsync();
                return Ok(notaExtrusion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] NotaExtrusion notaExtrusion)
        {
            try
            {
                if (id != notaExtrusion.Pk_NotaExtrusion)
                {
                    return NotFound();
                }

                _context.Update(notaExtrusion);
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
                var notaExtrusion = await _context.NotaExtrusion.FindAsync(id);

                if (notaExtrusion == null)
                {
                    return NotFound();
                }

                _context.NotaExtrusion.Remove(notaExtrusion);
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
