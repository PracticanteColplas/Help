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
    public class DevolucionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public DevolucionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listDevolucion = await _context.Devolucion.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listDevolucion });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        //// GET api/<ValuesController>/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get(string id)
        //{

        //    Array[] myIntArray = new Array[1];

        //    try
        //    {
        //        var query = from u in _context.Devolucion
        //                    join ul in _context.OrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_OrdenProduccion
        //                    join ur in _context.CorridaExtrusion on u.Fk_CorridaExtrusion equals ur.Pk_CorridaExtrusion
        //                    where u.Fk_OrdenProduccion == id
        //                    select new
        //                    {
        //                        Pk_MaterialSalida = u.Pk_MaterialSalida,
        //                        NoLote = u.NoLote
        //                    };

        //        var listMaterialSalidaA = await query.LastOrDefaultAsync().ConfigureAwait(false);
        //        myIntArray[0] = new[] { listMaterialSalidaA };


        //    }
        //    catch (Exception ex)
        //    {

        //        return BadRequest(ex.Message);
        //    }

        //    return Ok(myIntArray);

        //}



        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {


            try
            {
                var query = from d in _context.Devolucion
                            join mp in _context.MPriExtrusion on d.Fk_MPri equals mp.Pk_CodigoProducto
                            where d.Fk_OrdenProduccion == id
                            select new
                            {
                                Pk_ConsumoMPriExtrusion = d.Pk_Devolucion,
                                Fk_CorridaExtrusion = d.Fk_OrdenProduccion,
                                Fk_MPri = d.Fk_MPri,
                                CantidadConsumida = d.Cantidad,
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
        public async Task<IActionResult> Post([FromBody] Devolucion devolucion)
        {
            try
            {
                _context.Add(devolucion);
                await _context.SaveChangesAsync();
                return Ok(devolucion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Devolucion devolucion)
        {
            try
            {
                if (id != devolucion.Pk_Devolucion)
                {
                    return NotFound();
                }

                _context.Update(devolucion);
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
                var devolucion = await _context.Devolucion.FindAsync(id);

                if (devolucion == null)
                {
                    return NotFound();
                }

                _context.Devolucion.Remove(devolucion);
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
