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
    public class RetalExtrusionCantidadController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public RetalExtrusionCantidadController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {

            try
            {
                var query = from u in _context.RetalExtrusionCantidad
                            join ur in _context.RetalExtrusion on u.Fk_RetalExtrusion equals ur.Pk_RetalExtrusion
                            where u.Fk_CorridaExtrusion == id
                            select new
                            {
                                Pk_RetalExtrusionCantidad = u.Pk_RetalExtrusionCantidad,
                                Fk_RetalExtrusion = u.Fk_RetalExtrusion,
                                Fk_CorridaExtrusion = u.Fk_CorridaExtrusion,
                                Cantidad = u.Cantidad,
                                Codigo = ur.Codigo,
                                Descripcion = ur.Descripcion
                            };
                Array[] myIntArray = new Array[1];
                var listMaterialSalidaD = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[0] = listMaterialSalidaD.ToArray();
                return Ok(myIntArray);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {

            try
            {
                var listRetalExtrusionCantidad = await _context.RetalExtrusionCantidad.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listRetalExtrusionCantidad });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RetalExtrusionCantidad retalExtrusionCantidad)
        {
            try
            {
                _context.Add(retalExtrusionCantidad);
                await _context.SaveChangesAsync();
                return Ok(retalExtrusionCantidad);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] RetalExtrusionCantidad retalExtrusionCantidad)
        {
            try
            {
                if (id != retalExtrusionCantidad.Pk_RetalExtrusionCantidad)
                {
                    return NotFound();
                }

                _context.Update(retalExtrusionCantidad);
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
                var retalExtrusionCantidad = await _context.RetalExtrusionCantidad.FindAsync(id);

                if (retalExtrusionCantidad == null)
                {
                    return NotFound();
                }

                _context.RetalExtrusionCantidad.Remove(retalExtrusionCantidad);
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
