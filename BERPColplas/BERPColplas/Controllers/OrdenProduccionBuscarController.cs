using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
    public class OrdenProduccionBuscarController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public OrdenProduccionBuscarController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            Array[] myIntArray = new Array[1];

            ////The OrdenProduccion
            //try
            //{

            //    var query = from op in _context.OrdenProduccion
            //                where op.Pk_OrdenProduccion == id
            //                where 
            //                select new
            //                {
            //                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
            //                    CodigoProductoERP = op.CodigoProductoERP,
            //                    Cliente = op.Cliente,
            //                    CantidadProgramada = op.CantidadProgramada,
            //                    Descripcion = op.Descripcion,
            //                    Proceso = op.Proceso,
            //                    UnidadMedida = op.UnidadMedida,
            //                    Maquina = op.Maquina,
            //                };
            //    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
            //    myIntArray[0] = new[] { listOrdenProduccion };

            //}
            //catch (Exception ex)
            //{

            //    return BadRequest(ex.Message);
            //}



            //The OrdenProduccion
            try
            {

                var query = from op in _context.OrdenProduccion
                            where op.Pk_OrdenProduccion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                CodigoProductoERP = op.CodigoProductoERP,
                                Cliente = op.Cliente,
                                CantidadProgramada = op.CantidadProgramada,
                                Descripcion = op.Descripcion,
                                Proceso = op.Proceso,
                                UnidadMedida = op.UnidadMedida,
                                Maquina = op.Maquina,
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
