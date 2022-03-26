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
    public class OperarioController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public OperarioController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listOperario = await _context.Operario.ToListAsync().ConfigureAwait(false);
                return Ok(listOperario);
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
                var listOperario = await _context.Operario.Where(x => x.Pk_Operario == id).ToListAsync().ConfigureAwait(false);
                return Ok(listOperario);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            //try
            //{
            //    var query = from u in _context.OrdenProduccion
            //                join ur in _context.ComponenteOrdenProduccion on u.Pk_OrdenProduccion equals ur.Fk_OrdenProduccion
            //                where u.Pk_OrdenProduccion == id
            //                select new
            //                {
            //                    Pk_OrdenProduccion = u.Pk_OrdenProduccion,
            //                    CodigoProductoERP = u.CodigoProductoERP,
            //                    Cliente = u.Cliente,
            //                    CantidadProgramada = u.CantidadProgramada,
            //                    Estado = u.Estado,
            //                    Pk_ComponenteOrdenProduccion = ur.Pk_ComponenteOrdenProduccion,
            //                    Componente = ur.Componente,
            //                    Descripcion = ur.Descripcion,
            //                    Proceso = ur.Proceso,
            //                    DestinoComponente = ur.DestinoComponente,
            //                };
            //    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
            //    return Ok(listOrdenProduccion);

            //}
            //catch (Exception ex)
            //{

            //    return BadRequest(ex.Message);
            //}

        }

    }
}
