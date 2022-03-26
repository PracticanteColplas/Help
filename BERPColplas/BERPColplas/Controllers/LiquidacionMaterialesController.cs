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
    public class LiquidacionMaterialesController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public LiquidacionMaterialesController(AplicationDbContext context)
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
                var query = from cmpe in _context.ConsumoMPriExtrusion
                            join mpe in _context.MPriExtrusion on cmpe.Fk_MPri equals mpe.Pk_CodigoProducto
                            where cmpe.Fk_CorridaExtrusion == Int32.Parse(id)
                            select new
                            {
                                Pk_ConsumoMPriExtrusion = cmpe.Pk_ConsumoMPriExtrusion,
                                Fk_CorridaExtrusion = cmpe.Fk_CorridaExtrusion,
                                Fk_MPri = cmpe.Fk_MPri,
                                CantidadConsumida = cmpe.CantidadConsumida,
                                Descripcion = mpe.Descripcion,
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
                var query = from tpe in _context.TiempoParoExtrusion

                            where tpe.Fk_CorridaExtrusion == Int32.Parse(id)
                            select new
                            {
                                Pk_TiempoParoExtrusion = tpe.Pk_TiempoParoExtrusion,
                                Fk_CorridaExtrusion = tpe.Fk_CorridaExtrusion,
                                FechaInicio = tpe.FechaInicio,
                                FechaFinal = tpe.FechaFinal,
                                CausaDescripcion = tpe.CausaDescripcion,
                            };

                var listMaterialSalidaA = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[1] = new[] { listMaterialSalidaA };

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


            return Ok(myIntArray);

        }


    }
}
