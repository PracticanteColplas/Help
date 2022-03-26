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
    public class ProcesoOrdenProduccionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public ProcesoOrdenProduccionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listProcesoOrdenProduccion = await _context.ProcesoOrdenProduccion.ToListAsync();
                return Ok(listProcesoOrdenProduccion);
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
        //        var listProcesoOrdenProduccion = await _context.ProcesoOrdenProduccion.FindAsync(id);
        //        return Ok(listProcesoOrdenProduccion);

        //    }
        //    catch (Exception ex)
        //    {

        //        return BadRequest(ex.Message);
        //    }

        //}

        //// POST api/<CorridaExtrusionController>
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] ProcesoOrdenProduccion procesoOrdenProduccion)
        //{
        //    try
        //    {
        //        _context.Add(procesoOrdenProduccion);
        //        await _context.SaveChangesAsync();
        //        return Ok(procesoOrdenProduccion);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //// PUT api/<CorridaExtrusionController>/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(int id, [FromBody] ProcesoOrdenProduccion procesoOrdenProduccion)
        //{
        //    try
        //    {
        //        if (id != procesoOrdenProduccion.Pk_ProcesoOrdenProduccion)
        //        {
        //            return NotFound();
        //        }

        //        _context.Update(procesoOrdenProduccion);
        //        await _context.SaveChangesAsync();
        //        return Ok(new { message = "El campo fue actualizada con exito" });
        //    }
        //    catch (Exception ex)
        //    {

        //        return BadRequest(ex.Message);
        //    }
        //}

        //// DELETE api/<CorridaExtrusionController>/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    try
        //    {
        //        var procesoOrdenProduccion = await _context.ProcesoOrdenProduccion.FindAsync(id);

        //        if (procesoOrdenProduccion == null)
        //        {
        //            return NotFound();
        //        }

        //        _context.ProcesoOrdenProduccion.Remove(procesoOrdenProduccion);
        //        //return Ok(new { message = _context.CorridaExtrusion });
        //        await _context.SaveChangesAsync();
        //        return Ok(new { message = "El campo ha sido eliminada con exito" });
        //    }
        //    catch (Exception ex)
        //    {

        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
