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
    public class ReprocesoController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public ReprocesoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ReprocesoController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listReprocesos = await _context.Reproceso.ToListAsync().ConfigureAwait(false);
                return Ok(listReprocesos);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {

            Array[] myIntArray = new Array[1];

            if (id.All(char.IsDigit))
            {
                try
                {
                    var query = from u in _context.Reproceso
                                where u.Fk_CorridaExtrusion == Int64.Parse(id)
                                select new
                                {
                                    Pk_Reproceso = u.Pk_Reproceso,
                                    Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
                                    PesoNetoRollo = u.PesoNetoRollo,
                                    NoLote = u.NoLote,
                                    //UbicacionTipo = u.UbicacionTipo,
                                    UbicacionNumero = u.UbicacionNumero
                                };

                    var listMaterialSalidaD = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[0] = listMaterialSalidaD.ToArray();


                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
            else
            {
                try
                {
                    var query = from u in _context.Reproceso
                                join ur in _context.CorridaExtrusion on u.Fk_CorridaExtrusion equals ur.Pk_CorridaExtrusion
                                //join ul in _context.ProcesoOrdenProduccion on ur.Fk_ProcesoOrdenProduccion equals ul.Pk_ProcesoOrdenProduccion
                                where ur.Fk_OrdenProduccion == id
                                orderby u.Pk_Reproceso
                                select new
                                {
                                    Pk_Reproceso = u.Pk_Reproceso,
                                    NoLote = u.NoLote
                                };

                    var listMaterialSalidaA = await query.LastOrDefaultAsync().ConfigureAwait(false);
                    myIntArray[0] = new[] { listMaterialSalidaA };


                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }

            return Ok(myIntArray);

        }

        // POST api/<ReprocesoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Reproceso reproceso)
        {
            try
            {
                _context.Add(reproceso);
                await _context.SaveChangesAsync();
                return Ok(reproceso);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ReprocesoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Reproceso reproceso)
        {
            try
            {
                if (id != reproceso.Pk_Reproceso)
                {
                    return NotFound();
                }

                _context.Update(reproceso);
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
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var reproceso = await _context.Reproceso.FindAsync(id);

                if (reproceso == null)
                {
                    return NotFound();
                }

                _context.Reproceso.Remove(reproceso);
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
