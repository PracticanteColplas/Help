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
    public class TortaExtrusionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public TortaExtrusionController(AplicationDbContext context)
        {
            _context = context;
        }



        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {

            try
            {
                var query = from u in _context.TortaExtrusion
                            join ur in _context.Torta on u.Fk_Torta equals ur.Pk_Torta
                            where u.Fk_CorridaExtrusion == id
                            select new
                            {
                                Pk_TortaExtrusion = u.Pk_TortaExtrusion,
                                Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
                                Fk_Torta = u.Fk_Torta,
                                Cantidad = u.Cantidad,
                                Descripcion = ur.Descripcion
                            };
                Array[] myIntArray = new Array[1];
                var listMaterialSalidaD = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[0] = listMaterialSalidaD.ToArray();
                return Ok(myIntArray);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }



        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listTortaExtrusion = await _context.TortaExtrusion.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listTortaExtrusion });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TortaExtrusion tortaExtrusion)
        {
            try
            {
                _context.Add(tortaExtrusion);
                await _context.SaveChangesAsync();
                return Ok(tortaExtrusion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TortaExtrusion tortaExtrusion)
        {
            try
            {
                if (id != tortaExtrusion.Pk_TortaExtrusion)
                {
                    return NotFound();
                }

                _context.Update(tortaExtrusion);
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
                var tortaExtrusion = await _context.TortaExtrusion.FindAsync(id);

                if (tortaExtrusion == null)
                {
                    return NotFound();
                }

                _context.TortaExtrusion.Remove(tortaExtrusion);
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
