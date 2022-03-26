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
    public class CorridaExtrusionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public CorridaExtrusionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listCorridaExtrusion = await _context.CorridaExtrusion.ToListAsync();
                return Ok(listCorridaExtrusion);
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
            Array[] myIntArray = new Array[7];
            //Array[] myIntArray2 = new Array[1];

            if (id.All(char.IsDigit))
            {

                try
                {
                    var listCorridaExtrusion = await _context.CorridaExtrusion.FindAsync(id);

                    var query = from u in _context.MaterialSalida
                                where u.Fk_CorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_MaterialSalida = u.Pk_MaterialSalida,
                                    Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
                                    PesoNetoRollo = u.PesoNetoRollo,
                                    NoLote = u.NoLote,
                                    //UbicacionTipo = u.UbicacionTipo,
                                    UbicacionNumero = u.UbicacionNumero
                                };

                    var listMaterialSalidaD = await query.ToListAsync().ConfigureAwait(false);
                    //var valor = "ejem";
                    ////Console.WriteLine(valor.GetType().FullName);
                    //var n = valor.GetType();
                    //return Ok( valor );

                    myIntArray[0] = listMaterialSalidaD.ToArray();



                    //var valor = "ejem";
                    //myIntArray[0] = valor.ToArray();


                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
            else
            {

                //var valor = "ejem2";
                //myIntArray[0] = valor.ToArray();






                try
                {
                    var query = from ce in _context.CorridaExtrusion
                                join oce in _context.OperarioCorridaExtrusion on ce.Pk_CorridaExtrusion equals oce.Fk_CorridaExtrusion
                                join o in _context.Operario on oce.Fk_Operario equals o.Pk_Operario
                                //join ms in _context.MaterialSalida on ce.Pk_CorridaExtrusion equals ms.Fk_CorridaExtrusion
                                //join rec in _context.RetalExtrusionCantidad on ce.Pk_CorridaExtrusion equals rec.Fk_CorridaExtrusion
                                //join re in _context.RetalExtrusion on rec.Fk_RetalExtrusion equals re.Pk_RetalExtrusion

                                //join tpe in _context.TiempoParoExtrusion on ce.Pk_CorridaExtrusion equals tpe.Fk_CorridaExtrusion
                                //join ul in _context.ProcesoOrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_ProcesoOrdenProduccion
                                where ce.Fk_OrdenProduccion == id
                                //orderby ce.Fk_OrdenProduccion
                                select new
                                {
                                    Pk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    TiempoAjuste = ce.TiempoAjuste,
                                    Nombre = o.Nombre,
                                    FechaHora = oce.FechaHora,
                                    //PesoNetoRollo = ms.PesoNetoRollo,
                                    //Codigo = re.Codigo,
                                    //Cantidad = rec.Cantidad,

                                    //NoLote = u.NoLote
                                };

                    //var listMaterialSalidaA = await query.LastOrDefaultAsync().ConfigureAwait(false);
                    var listMaterialSalidaA = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[0] = new[] { listMaterialSalidaA };


                    //var valor = "ejem2";
                    //myIntArray[0] = valor.ToArray();

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                try
                {
                    var query = from ce in _context.CorridaExtrusion
                                join tpe in _context.TiempoParoExtrusion on ce.Pk_CorridaExtrusion equals tpe.Fk_CorridaExtrusion
                                //join ul in _context.ProcesoOrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_ProcesoOrdenProduccion
                                where ce.Fk_OrdenProduccion == id
                                //orderby ce.Fk_OrdenProduccion
                                select new
                                {
                                    Pk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    FechaInicio = tpe.FechaInicio,
                                    FechaFinal = tpe.FechaFinal,
                                    //NoLote = u.NoLote
                                };

                    //var listMaterialSalidaA = await query.LastOrDefaultAsync().ConfigureAwait(false);
                    var listMaterialSalidaB = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[1] = new[] { listMaterialSalidaB };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }




                try
                {
                    var query = from ce in _context.CorridaExtrusion
                                join ms in _context.MaterialSalida on ce.Pk_CorridaExtrusion equals ms.Fk_CorridaExtrusion
                                //join ul in _context.ProcesoOrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_ProcesoOrdenProduccion
                                where ce.Fk_OrdenProduccion == id
                                //orderby ce.Fk_OrdenProduccion
                                select new
                                {
                                    Pk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    PesoNetoRollo = ms.PesoNetoRollo,
                                    NoLote = ms.NoLote,
                                    //FechaFinal = ms.FechaFinal,
                                    //NoLote = u.NoLote
                                };

                    //var listMaterialSalidaA = await query.LastOrDefaultAsync().ConfigureAwait(false);
                    var listMaterialSalidaB = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[2] = new[] { listMaterialSalidaB };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                try
                {
                    var query = from ce in _context.CorridaExtrusion
                                join rec in _context.RetalExtrusionCantidad on ce.Pk_CorridaExtrusion equals rec.Fk_CorridaExtrusion
                                join re in _context.RetalExtrusion on rec.Fk_RetalExtrusion equals re.Pk_RetalExtrusion
                                //join ul in _context.ProcesoOrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_ProcesoOrdenProduccion
                                where ce.Fk_OrdenProduccion == id
                                //orderby ce.Fk_OrdenProduccion
                                select new
                                {
                                    Pk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    Cantidad = rec.Cantidad,
                                    Codigo = re.Codigo,
                                    //FechaFinal = ms.FechaFinal,
                                    //NoLote = u.NoLote
                                };

                    //var listMaterialSalidaA = await query.LastOrDefaultAsync().ConfigureAwait(false);
                    var listMaterialSalidaB = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[3] = new[] { listMaterialSalidaB };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                try
                {
                    var query = from ce in _context.CorridaExtrusion
                                join ne in _context.NotaExtrusion on ce.Pk_CorridaExtrusion equals ne.Fk_CorridaExtrusion
                                //join re in _context.RetalExtrusion on rec.Fk_RetalExtrusion equals re.Pk_RetalExtrusion
                                //join ul in _context.ProcesoOrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_ProcesoOrdenProduccion
                                where ce.Fk_OrdenProduccion == id
                                //orderby ce.Fk_OrdenProduccion
                                select new
                                {
                                    Pk_CorridaExtrusion = ce.Pk_CorridaExtrusion,
                                    Descripcion = ne.Descripcion,
                                    //Codigo = re.Codigo,
                                    //FechaFinal = ms.FechaFinal,
                                    //NoLote = u.NoLote
                                };

                    //var listMaterialSalidaA = await query.LastOrDefaultAsync().ConfigureAwait(false);
                    var listMaterialSalidaB = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[4] = new[] { listMaterialSalidaB };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                try
                {
                    var query = from ce in _context.CorridaExtrusion
                                join cmpe in _context.ConsumoMPriExtrusion on ce.Pk_CorridaExtrusion equals cmpe.Fk_CorridaExtrusion
                                join mpe in _context.MPriExtrusion on cmpe.Fk_MPri equals mpe.Pk_CodigoProducto
                                where ce.Fk_OrdenProduccion == id
                                select new
                                {
                                    Fk_MPri = cmpe.Fk_MPri,
                                    CantidadConsumida = cmpe.CantidadConsumida,
                                    Descripcion = mpe.Descripcion,
                                };


                    var listMaterialSalidaB = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[5] = new[] { listMaterialSalidaB };
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }


                //try
                //{
                //    var query = from ce in _context.CorridaExtrusion
                //                join op in _context.OrdenProduccion on ce.Fk_OrdenProduccion equals op.Pk_OrdenProduccion
                //                join d in _context.Devolucion on op.Pk_OrdenProduccion equals d.Fk_OrdenProduccion
                //                where ce.Fk_OrdenProduccion == id
                //                orderby d.Pk_Devolucion, d.Cantidad
                //                select new
                //                {
                //                    Cantidad = d.Cantidad,
                //                    Pk_Devolucion = d.Pk_Devolucion,
                //                };


                //    var listMaterialSalidaB = await query.ToListAsync().ConfigureAwait(false);
                //    myIntArray[6] = new[] { listMaterialSalidaB };
                //}
                //catch (Exception ex)
                //{

                //    return BadRequest(ex.Message);
                //}


                try
                {
                    var query = from d in _context.Devolucion
                                join mpe in _context.MPriExtrusion on d.Fk_MPri equals mpe.Pk_CodigoProducto
                                where d.Fk_OrdenProduccion == id
                                select new
                                {
                                    Cantidad = d.Cantidad,
                                    Pk_Devolucion = d.Pk_Devolucion,
                                    Fk_MPri = d.Fk_MPri,
                                    Descripcion = mpe.Descripcion,
                                };


                    var listMaterialSalidaB = await query.ToListAsync().ConfigureAwait(false);
                    myIntArray[6] = new[] { listMaterialSalidaB };
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
        public async Task<IActionResult> Post([FromBody] CorridaExtrusion corridaExtrusion)
        {
            try
            {
                _context.Add(corridaExtrusion);
                await _context.SaveChangesAsync();
                return Ok(corridaExtrusion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CorridaExtrusion corridaExtrusion)
        {
            try
            {
                if (id != corridaExtrusion.Pk_CorridaExtrusion)
                {
                    return NotFound();
                }

                _context.Update(corridaExtrusion);
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
                var corridaExtrusion = await _context.CorridaExtrusion.FindAsync(id);

                if (corridaExtrusion == null)
                {
                    return NotFound();
                }

                _context.CorridaExtrusion.Remove(corridaExtrusion);
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
