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
    public class OperarioCorridaExtrusionInicioFinalController : ControllerBase
    {

        private readonly AplicationDbContext _context;

        public OperarioCorridaExtrusionInicioFinalController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {

            Array[] myIntArray = new Array[1];

            //The OperarioCorridaExtrusion
            try
            {
                var query = from oce in _context.OperarioCorridaExtrusion
                            join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                            join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                            join o in _context.Operario on oce.Fk_Operario equals o.Pk_Operario
                            where ce.Pk_CorridaExtrusion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                Fk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                Pk_Operario = o.Pk_Operario,
                                Nombre = o.Nombre,
                                FechaHora = oce.FechaHora,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[0] = new[] { listOrdenProduccion };
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


            return Ok(myIntArray);

        }
    }
}
