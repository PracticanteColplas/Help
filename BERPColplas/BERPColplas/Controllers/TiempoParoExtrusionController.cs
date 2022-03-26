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
    public class TiempoParoExtrusionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public TiempoParoExtrusionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<TiempoParoExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listTiempoParoExtrusion = await _context.TiempoParoExtrusion.ToListAsync().ConfigureAwait(false);
                return Ok(listTiempoParoExtrusion);
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
                var query = from u in _context.TiempoParoExtrusion
                            where u.Fk_CorridaExtrusion == id
                            select new
                            {
                                Pk_TiempoParoExtrusion = u.Pk_TiempoParoExtrusion,
                                Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
                                FechaInicio = u.FechaInicio,
                                FechaFinal = u.FechaFinal,
                                CausaDescripcion = u.CausaDescripcion,
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


        // POST api/<TiempoParoExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TiempoParoExtrusion tiempoParoExtrusion)
        {
            try
            {
                _context.Add(tiempoParoExtrusion);
                await _context.SaveChangesAsync();
                return Ok(tiempoParoExtrusion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<TiempoParoExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TiempoParoExtrusion tiempoParoExtrusion)
        {
            try
            {
                if (id != tiempoParoExtrusion.Pk_TiempoParoExtrusion)
                {
                    return NotFound();
                }

                _context.Update(tiempoParoExtrusion);
                await _context.SaveChangesAsync();
                return Ok(new { message = "El campo fue actualizada con exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<TiempoParoExtrusionController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var tiempoParoExtrusion = await _context.TiempoParoExtrusion.FindAsync(id);

                if (tiempoParoExtrusion == null)
                {
                    return NotFound();
                }

                _context.TiempoParoExtrusion.Remove(tiempoParoExtrusion);
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
