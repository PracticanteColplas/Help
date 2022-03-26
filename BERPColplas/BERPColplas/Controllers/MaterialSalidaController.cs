using BERPColplas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BERPColplas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialSalidaController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public MaterialSalidaController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listMaterialSalida = await _context.MaterialSalida.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listMaterialSalida });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        //// GET api/<ValuesController>/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get(int id)
        //{

        //    try
        //    {
        //        var query = from u in _context.MaterialSalida
        //                    where u.Fk_CorridaExtrusion == id
        //                    select new
        //                    {
        //                        Pk_MaterialSalida = u.Pk_MaterialSalida,
        //                        Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
        //                        PesoNetoRollo = u.PesoNetoRollo,
        //                        NoLote = u.NoLote,
        //                        UbicacionTipo = u.UbicacionTipo,
        //                        UbicacionNumero = u.UbicacionNumero
        //                    };

        //        var query2 = from u in _context.MaterialSalida
        //                     join ur in _context.CorridaExtrusion on u.Fk_CorridaExtrusion equals ur.Pk_CorridaExtrusion
        //                     join ul in _context.OrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_OrdenProduccion
        //                     where ul.Pk_OrdenProduccion == id.ToString()
        //                     select new
        //                     {
        //                        NoLote = u.NoLote
        //                     };
        //        Array[] myIntArray = new Array[2];
        //        int[] array = new int[1];
        //        var listMaterialSalida = await query2.CountAsync().ConfigureAwait(false);
        //        var listMaterialSalidaD = await query.ToListAsync().ConfigureAwait(false);
        //        var listMaterialSalidaA = await query.OrderByDescending(b => b.Pk_MaterialSalida).FirstOrDefault().ToListAsync().ConfigureAwait(false);
        //        myIntArray[0] = listMaterialSalidaD.ToArray();
        //        array[0] = listMaterialSalida;
        //        myIntArray[1] = array;
        //        return Ok(myIntArray);                

        //    }
        //    catch (Exception ex)
        //    {

        //        return BadRequest(ex.Message);
        //    }

        //}


        //// GET api/<ValuesController>/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get(string id, int dos)
        //{

        //    try
        //    {

        //        var query2 = from u in _context.MaterialSalida
        //                     join ur in _context.CorridaExtrusion on u.Fk_CorridaExtrusion equals ur.Pk_CorridaExtrusion
        //                     join ul in _context.OrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_OrdenProduccion
        //                     where ul.Pk_OrdenProduccion == id.ToString()
        //                     orderby u.Pk_MaterialSalida
        //                     select new
        //                     {
        //                         Pk_MaterialSalida = u.Pk_MaterialSalida,
        //                         NoLote = u.NoLote
        //                     };


        //        Array[] myIntArray = new Array[2];
        //        var listMaterialSalidaA = await query2.LastOrDefaultAsync().ConfigureAwait(false);
        //        //myIntArray[0] = listMaterialSalidaA.ToArray();
        //        return Ok(listMaterialSalidaA);

        //    }
        //    catch (Exception ex)
        //    {

        //        return BadRequest(ex.Message);
        //    }

        //}

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {

            Array[] myIntArray = new Array[1];

            if (id.All(char.IsDigit))
            {

                try
                {
                    var query = from u in _context.MaterialSalida
                                where u.Fk_CorridaExtrusion == Int32.Parse(id)
                                select new
                                {
                                    Pk_MaterialSalida = u.Pk_MaterialSalida,    
                                    Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
                                    PesoNetoRollo = u.PesoNetoRollo,
                                    NoLote = u.NoLote,
                                    //UbicacionTipo = u.UbicacionTipo,
                                    UbicacionNumero = u.UbicacionNumero,
                                    FechaIngreso = u.FechaIngreso
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
                    var query = from u in _context.MaterialSalida
                                join ur in _context.CorridaExtrusion on u.Fk_CorridaExtrusion equals ur.Pk_CorridaExtrusion
                                //join ul in _context.ProcesoOrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_ProcesoOrdenProduccion
                                where ur.Fk_OrdenProduccion == id
                                orderby u.Pk_MaterialSalida
                                select new
                                {
                                    Pk_MaterialSalida = u.Pk_MaterialSalida,
                                    NoLote = u.NoLote
                                };

                    var listMaterialSalidaA = await query.LastOrDefaultAsync().ConfigureAwait(false);
                    myIntArray[0] = new[] { listMaterialSalidaA };


                    //var valor = "ejem2";
                    //myIntArray[0] = valor.ToArray();

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }

            return Ok(myIntArray);
            //try
            //{
            //    //var query = from u in _context.MaterialSalida
            //    //            where u.Fk_CorridaExtrusion == id
            //    //            select new
            //    //            {
            //    //                Pk_MaterialSalida = u.Pk_MaterialSalida,
            //    //                Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
            //    //                PesoNetoRollo = u.PesoNetoRollo,
            //    //                NoLote = u.NoLote,
            //    //                UbicacionTipo = u.UbicacionTipo,
            //    //                UbicacionNumero = u.UbicacionNumero
            //    //            };

            //    //var query2 = from u in _context.MaterialSalida
            //    //             join ur in _context.CorridaExtrusion on u.Fk_CorridaExtrusion equals ur.Pk_CorridaExtrusion
            //    //             join ul in _context.OrdenProduccion on ur.Fk_OrdenProduccion equals ul.Pk_OrdenProduccion
            //    //             where ul.Pk_OrdenProduccion == id
            //    //             orderby u.Pk_MaterialSalida
            //    //             select new
            //    //             {
            //    //                 Pk_MaterialSalida = u.Pk_MaterialSalida,
            //    //                 NoLote = u.NoLote
            //    //             };


            //    //Array[] myIntArray = new Array[2];
            //    //var listMaterialSalidaA = await query2.LastOrDefaultAsync().ConfigureAwait(false);
            //    //myIntArray[0] =  new[] { listMaterialSalidaA };
            //    //var listMaterialSalidaD = await query.ToListAsync().ConfigureAwait(false);
            //    //myIntArray[1] = listMaterialSalidaD.ToArray();
            //    //return Ok(myIntArray);

            //}
            //catch (Exception ex)
            //{

            //    return BadRequest(ex.Message);
            //}

        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MaterialSalida materialSalida)
        {
            try
            {
                _context.Add(materialSalida);
                await _context.SaveChangesAsync();
                return Ok(materialSalida);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] MaterialSalida materialSalida)
        {
            try
            {
                if (id != materialSalida.Pk_MaterialSalida)
                {
                    return NotFound();
                }

                _context.Update(materialSalida);
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
                var materialSalida = await _context.MaterialSalida.FindAsync(id);

                if (materialSalida == null)
                {
                    return NotFound();
                }

                _context.MaterialSalida.Remove(materialSalida);
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
