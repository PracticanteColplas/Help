using BERPColplas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BERPColplas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenProduccionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public OrdenProduccionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<OrdenProduccionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var ordenProduccion = await _context.OrdenProduccion.ToListAsync().ConfigureAwait(false);
                return Ok(ordenProduccion);
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
            Array[] myIntArray = new Array[10];

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
                //return Ok(listOrdenProduccion);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            //The CorridaExtrusion
            try
            {
                var query = from ce in _context.CorridaExtrusion
                            where ce.Fk_OrdenProduccion == id
                            select new
                            {
                                Pk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                Fk_OrdenProduccion = ce.Fk_OrdenProduccion,
                                TiempoAjuste = ce.TiempoAjuste,
                                Maquina = ce.Maquina,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[1] = new[] { listOrdenProduccion };
                //return Ok(listOrdenProduccion);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            //The OperarioCorridaExtrusion
            try
            {
                var query = from op in _context.OrdenProduccion
                            join ce in _context.CorridaExtrusion on op.Pk_OrdenProduccion equals ce.Fk_OrdenProduccion
                            join oce in _context.OperarioCorridaExtrusion on ce.Pk_CorridaExtrusion equals oce.Fk_CorridaExtrusion
                            join o in _context.Operario on oce.Fk_Operario equals o.Pk_Operario
                            where op.Pk_OrdenProduccion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                corridaExtrusion = ce.Pk_CorridaExtrusion,
                                Nombre = o.Nombre,
                                FechaHora = oce.FechaHora,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[2] = new[] { listOrdenProduccion };
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


            //The MaterialSalida
            try
            {
                var query = from op in _context.OrdenProduccion
                            join ce in _context.CorridaExtrusion on op.Pk_OrdenProduccion equals ce.Fk_OrdenProduccion
                            join ms in _context.MaterialSalida on ce.Pk_CorridaExtrusion equals ms.Fk_CorridaExtrusion
                            where op.Pk_OrdenProduccion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                corridaExtrusion = ce.Pk_CorridaExtrusion,
                                PesoNetoRollo = ms.PesoNetoRollo,
                                NoLote = ms.NoLote,
                                UbicacionNumero = ms.UbicacionNumero,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[3] = new[] { listOrdenProduccion };
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


            //The Reproceso
            try
            {
                var query = from op in _context.OrdenProduccion
                            join ce in _context.CorridaExtrusion on op.Pk_OrdenProduccion equals ce.Fk_OrdenProduccion
                            join r in _context.Reproceso on ce.Pk_CorridaExtrusion equals r.Fk_CorridaExtrusion
                            where op.Pk_OrdenProduccion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                corridaExtrusion = ce.Pk_CorridaExtrusion,
                                PesoNetoRollo = r.PesoNetoRollo,
                                NoLote = r.NoLote,
                                UbicacionNumero = r.UbicacionNumero,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[4] = new[] { listOrdenProduccion };
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


            //The Retal
            try
            {
                var query = from op in _context.OrdenProduccion
                            join ce in _context.CorridaExtrusion on op.Pk_OrdenProduccion equals ce.Fk_OrdenProduccion
                            join rec in _context.RetalExtrusionCantidad on ce.Pk_CorridaExtrusion equals rec.Fk_CorridaExtrusion
                            join re in _context.RetalExtrusion on rec.Fk_RetalExtrusion equals re.Pk_RetalExtrusion
                            where op.Pk_OrdenProduccion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                corridaExtrusion = ce.Pk_CorridaExtrusion,
                                Pk_RetalExtrusionCantidad = rec.Pk_RetalExtrusionCantidad,
                                Codigo = re.Codigo,
                                Descripcion = re.Descripcion,
                                Cantidad = rec.Cantidad,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[5] = new[] { listOrdenProduccion };
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


            //The Torta
            try
            {
                var query = from op in _context.OrdenProduccion
                            join ce in _context.CorridaExtrusion on op.Pk_OrdenProduccion equals ce.Fk_OrdenProduccion
                            join te in _context.TortaExtrusion on ce.Pk_CorridaExtrusion equals te.Fk_CorridaExtrusion
                            join t in _context.Torta on te.Fk_Torta equals t.Pk_Torta
                            where op.Pk_OrdenProduccion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                corridaExtrusion = ce.Pk_CorridaExtrusion,
                                Fk_Torta = te.Fk_Torta,
                                Descripcion = t.Descripcion,
                                Cantidad = te.Cantidad,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[6] = new[] { listOrdenProduccion };
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            //The Devolucion
            try
            {
                var query = from op in _context.OrdenProduccion
                            join d in _context.Devolucion on op.Pk_OrdenProduccion equals d.Fk_OrdenProduccion
                            join mpe in _context.MPriExtrusion on d.Fk_MPri equals mpe.Pk_CodigoProducto
                            where op.Pk_OrdenProduccion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                Pk_CodigoProducto = mpe.Pk_CodigoProducto,
                                Descripcion = mpe.Descripcion,
                                Cantidad = d.Cantidad,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[7] = new[] { listOrdenProduccion };
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            //The TiemposParo
            try
            {
                var query = from op in _context.OrdenProduccion
                            join ce in _context.CorridaExtrusion on op.Pk_OrdenProduccion equals ce.Fk_OrdenProduccion
                            join tpe in _context.TiempoParoExtrusion on ce.Pk_CorridaExtrusion equals tpe.Fk_CorridaExtrusion
                            //join t in _context.Torta on te.Fk_Torta equals t.Pk_Torta
                            where op.Pk_OrdenProduccion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                corridaExtrusion = ce.Pk_CorridaExtrusion,
                                FechaInicio = tpe.FechaInicio,
                                FechaFinal = tpe.FechaFinal,
                                CausaDescripcion = tpe.CausaDescripcion,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[8] = new[] { listOrdenProduccion };
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            //The Observaciones
            try
            {
                var query = from op in _context.OrdenProduccion
                            join ce in _context.CorridaExtrusion on op.Pk_OrdenProduccion equals ce.Fk_OrdenProduccion
                            join ne in _context.NotaExtrusion on ce.Pk_CorridaExtrusion equals ne.Fk_CorridaExtrusion
                            //join t in _context.Torta on te.Fk_Torta equals t.Pk_Torta
                            where op.Pk_OrdenProduccion == id
                            select new
                            {
                                Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                corridaExtrusion = ce.Pk_CorridaExtrusion,
                                FechaInicio = ne.Descripcion,
                            };
                var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[9] = new[] { listOrdenProduccion };
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }



            return Ok(myIntArray);
        }
        
    }

}
