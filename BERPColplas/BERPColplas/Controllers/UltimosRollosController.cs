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
    public class UltimosRollosController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public UltimosRollosController(AplicationDbContext context)
        {
            _context = context;
        }

     

       

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {

            Array[] myIntArray = new Array[1];


            try
            {
                var query = from u in _context.MaterialSalida
                            where u.FechaIngreso >= DateTime.Parse(id)
                            select new
                            {
                                Pk_MaterialSalida = u.Pk_MaterialSalida,
                                Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
                                PesoNetoRollo = u.PesoNetoRollo,
                                NoLote = u.NoLote,
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
         

            return Ok(myIntArray);
            

        }


    }
}
