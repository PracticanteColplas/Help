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
    public class ConsumoMPriExtrusionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public ConsumoMPriExtrusionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {

            try
            {
                var listConsumoMPriExtrusion = await _context.ConsumoMPriExtrusion.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listConsumoMPriExtrusion });
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


            try
            {
                var query = from cm in _context.ConsumoMPriExtrusion
                            join mp in _context.MPriExtrusion on cm.Fk_MPri equals mp.Pk_CodigoProducto
                            where cm.Fk_CorridaExtrusion == id
                            select new
                            {
                                Pk_ConsumoMPriExtrusion = cm.Pk_ConsumoMPriExtrusion,
                                Fk_CorridaExtrusion = cm.Fk_CorridaExtrusion,
                                Fk_MPri = cm.Fk_MPri,
                                CantidadConsumida = cm.CantidadConsumida,
                                Descripcion = mp.Descripcion,
                                
                            };

                var listMaterialSalidaA = await query.ToListAsync().ConfigureAwait(false);

                return Ok(listMaterialSalidaA);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
            
            
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ConsumoMPriExtrusion consumoMPriExtrusion)
        {
            try
            {
                _context.Add(consumoMPriExtrusion);
                await _context.SaveChangesAsync();
                return Ok(consumoMPriExtrusion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ConsumoMPriExtrusion consumoMPriExtrusion)
        {
            try
            {
                if (id != consumoMPriExtrusion.Pk_ConsumoMPriExtrusion)
                {
                    return NotFound();
                }

                _context.Update(consumoMPriExtrusion);
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
                var consumoMPriExtrusion = await _context.ConsumoMPriExtrusion.FindAsync(id);

                if (consumoMPriExtrusion == null)
                {
                    return NotFound();
                }

                _context.ConsumoMPriExtrusion.Remove(consumoMPriExtrusion);
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
