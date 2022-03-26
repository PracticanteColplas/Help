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
    public class OperarioCorridaExtrusionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public OperarioCorridaExtrusionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listOperarioCorridaExtrusion = await _context.OperarioCorridaExtrusion.ToListAsync().ConfigureAwait(false);
                return Ok(listOperarioCorridaExtrusion);
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

            Array[] myIntArray = new Array[12];

            if (id.All(char.IsDigit))
            {
                //The OrdenProduccion
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
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
                    myIntArray[1] = new[] { listOrdenProduccion };

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }

                //The CorridaExtrusion
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Pk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    Fk_OrdenProduccion = ce.Fk_OrdenProduccion,
                                    TiempoAjuste = ce.TiempoAjuste,
                                    Maquina = ce.Maquina,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[2] = new[] { listOrdenProduccion };
                    //return Ok(listOrdenProduccion);

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                //The OperarioCorridaExtrusion
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                join o in _context.Operario on oce.Fk_Operario equals o.Pk_Operario
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Fk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    Pk_Operario = o.Pk_Operario,
                                    Nombre = o.Nombre,
                                    FechaHora = oce.FechaHora,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[3] = new[] { listOrdenProduccion };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                //The MaterialSalida
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                join ms in _context.MaterialSalida on ce.Pk_CorridaExtrusion equals ms.Fk_CorridaExtrusion
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Fk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    PesoNetoRollo = ms.PesoNetoRollo,
                                    NoLote = ms.NoLote,
                                    UbicacionNumero = ms.UbicacionNumero,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[4] = new[] { listOrdenProduccion };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                //The Reproceso
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                join r in _context.Reproceso on ce.Pk_CorridaExtrusion equals r.Fk_CorridaExtrusion
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Fk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    PesoNetoRollo = r.PesoNetoRollo,
                                    NoLote = r.NoLote,
                                    UbicacionNumero = r.UbicacionNumero,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[5] = new[] { listOrdenProduccion };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                //The Retal
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                join rec in _context.RetalExtrusionCantidad on ce.Pk_CorridaExtrusion equals rec.Fk_CorridaExtrusion
                                join re in _context.RetalExtrusion on rec.Fk_RetalExtrusion equals re.Pk_RetalExtrusion
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Fk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    Pk_RetalExtrusionCantidad = rec.Pk_RetalExtrusionCantidad,
                                    Codigo = re.Codigo,
                                    Descripcion = re.Descripcion,
                                    Cantidad = rec.Cantidad,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[6] = new[] { listOrdenProduccion };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                //The Torta
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                join te in _context.TortaExtrusion on ce.Pk_CorridaExtrusion equals te.Fk_CorridaExtrusion
                                join t in _context.Torta on te.Fk_Torta equals t.Pk_Torta
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Fk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    Fk_Torta = te.Fk_Torta,
                                    Descripcion = t.Descripcion,
                                    Cantidad = te.Cantidad,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[7] = new[] { listOrdenProduccion };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }

                //The Devolucion
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                join d in _context.Devolucion on op.Pk_OrdenProduccion equals d.Fk_OrdenProduccion
                                join mpe in _context.MPriExtrusion on d.Fk_MPri equals mpe.Pk_CodigoProducto
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Pk_CodigoProducto = mpe.Pk_CodigoProducto,
                                    Descripcion = mpe.Descripcion,
                                    Cantidad = d.Cantidad,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[8] = new[] { listOrdenProduccion };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }

                //The TiemposParo
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                join tpe in _context.TiempoParoExtrusion on ce.Pk_CorridaExtrusion equals tpe.Fk_CorridaExtrusion
                                //join t in _context.Torta on te.Fk_Torta equals t.Pk_Torta
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Fk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    FechaInicio = tpe.FechaInicio,
                                    FechaFinal = tpe.FechaFinal,
                                    CausaDescripcion = tpe.CausaDescripcion,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[9] = new[] { listOrdenProduccion };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }

                //The Observaciones
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                join ne in _context.NotaExtrusion on ce.Pk_CorridaExtrusion equals ne.Fk_CorridaExtrusion
                                //join t in _context.Torta on te.Fk_Torta equals t.Pk_Torta
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Fk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    FechaInicio = ne.Descripcion,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[10] = new[] { listOrdenProduccion };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }

                //The ConsumoMPriExtrusion
                try
                {
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                                join cmpe in _context.ConsumoMPriExtrusion on ce.Pk_CorridaExtrusion equals cmpe.Fk_CorridaExtrusion
                                join mpe in _context.MPriExtrusion on cmpe.Fk_MPri equals mpe.Pk_CodigoProducto
                                //join t in _context.Torta on te.Fk_Torta equals t.Pk_Torta
                                where oce.Pk_OperarioCorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_OrdenProduccion = op.Pk_OrdenProduccion,
                                    Fk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    CantidadConsumida = cmpe.CantidadConsumida,
                                    Descripcion = mpe.Descripcion,
                                };
                    var listOrdenProduccion = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[11] = new[] { listOrdenProduccion };
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
                    var query = from oce in _context.OperarioCorridaExtrusion
                                join ce in _context.CorridaExtrusion on oce.Fk_CorridaExtrusion equals ce.Pk_CorridaExtrusion
                                orderby oce.Pk_OperarioCorridaExtrusion descending
                                where ce.Fk_OrdenProduccion == id
                                select new
                                {
                                    Pk_OperarioCorridaExtrusion = oce.Pk_OperarioCorridaExtrusion,
                                    Fk_CorridaExtrusion = oce.Fk_CorridaExtrusion,
                                    Fk_Operario = oce.Fk_Operario,
                                    FechaHora = oce.FechaHora,
                                };

                    var listMaterialSalidaD = await query.ToListAsync().ConfigureAwait(false);

                    myIntArray[0] = new[] { listMaterialSalidaD };


                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }

            return Ok(myIntArray);

        }

        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OperarioCorridaExtrusion operarioCorridaExtrusion)
        {
            try
            {
                _context.Add(operarioCorridaExtrusion);
                await _context.SaveChangesAsync();
                return Ok(operarioCorridaExtrusion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] OperarioCorridaExtrusion operarioCorridaExtrusion)
        {
            try
            {
                if (id != operarioCorridaExtrusion.Pk_OperarioCorridaExtrusion)
                {
                    return NotFound();
                }

                _context.Update(operarioCorridaExtrusion);
                await _context.SaveChangesAsync();
                return Ok(new { message = "El campo fue actualizada con exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<CorridaExtrusionController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var operarioCorridaExtrusion = await _context.OperarioCorridaExtrusion.FindAsync(id);

                if (operarioCorridaExtrusion == null)
                {
                    return NotFound();
                }

                _context.OperarioCorridaExtrusion.Remove(operarioCorridaExtrusion);
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
