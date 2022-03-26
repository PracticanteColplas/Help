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
    public class TransferenciaController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public TransferenciaController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {

            try
            {
                var listTransferencia = await _context.Transferencia.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listTransferencia });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {


            try
            {
                var query = from t in _context.Transferencia
                            where t.Fk_OrdenProduccion == id
                            select new
                            {
                                Pk_Transferido = t.Pk_Transferencia,
                                Fk_OrdenProduccion = t.Fk_OrdenProduccion,
                                No_Transferido = t.No_Transferencia,
                                CodigoProducto = t.CodigoProducto,
                                Descripcion = t.Descripcion,
                                CantidadConsumida = t.CantidadConsumida,

                            };

                var listTransferido = await query.ToListAsync().ConfigureAwait(false);

                return Ok(listTransferido);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


        }
    }
}
