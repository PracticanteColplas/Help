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
    public class ResumenCorridaController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public ResumenCorridaController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            Array[] myIntArray = new Array[7];

            try
            {
                var query = from r in _context.Reproceso

                            where r.Fk_CorridaExtrusion == Int32.Parse(id)
                            select new
                            {
                                Pk_Reproceso = r.Pk_Reproceso,
                                Fk_CorridaExtrusion = r.Fk_CorridaExtrusion,
                                PesoNetoRollo = r.PesoNetoRollo,
                                NoLote = r.NoLote,
                                UbicacionNumero = r.UbicacionNumero,
                            };

                var listMaterialSalidaA = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[0] = new[] { listMaterialSalidaA };

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            try
            {
                var query = from ms in _context.MaterialSalida

                            where ms.Fk_CorridaExtrusion == Int32.Parse(id)
                            select new
                            {
                                Pk_MaterialSalida = ms.Pk_MaterialSalida,
                                Fk_CorridaExtrusion = ms.Fk_CorridaExtrusion,
                                PesoNetoRollo = ms.PesoNetoRollo,
                                NoLote = ms.NoLote,
                                UbicacionNumero = ms.UbicacionNumero,
                            };

                var listMaterialSalidaA = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[1] = new[] { listMaterialSalidaA };

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


            try
            {
                var query = from rec in _context.RetalExtrusionCantidad

                            where rec.Fk_CorridaExtrusion == Int32.Parse(id)
                            select new
                            {
                                Pk_RetalExtrusionCantidad = rec.Pk_RetalExtrusionCantidad,
                                Fk_RetalExtrusion = rec.Fk_RetalExtrusion,
                                Fk_CorridaExtrusion = rec.Fk_CorridaExtrusion,
                                Cantidad = rec.Cantidad,
                            };

                var listMaterialSalidaA = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[2] = new[] { listMaterialSalidaA };

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            return Ok(myIntArray);

        }

       
    }
}