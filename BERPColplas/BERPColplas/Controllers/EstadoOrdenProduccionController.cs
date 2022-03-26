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
    public class EstadoOrdenProduccionController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public EstadoOrdenProduccionController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<MaterialSalidaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listEstadoOrdenProduccion = await _context.EstadoOrdenProduccion.ToListAsync().ConfigureAwait(false);
                return Ok(new { message = listEstadoOrdenProduccion });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<MaterialSalidaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EstadoOrdenProduccion estadoOrdenProduccion)
        {
            try
            {
                _context.Add(estadoOrdenProduccion);
                await _context.SaveChangesAsync();
                return Ok(estadoOrdenProduccion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<MaterialSalidaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EstadoOrdenProduccion estadoOrdenProduccion)
        {
            try
            {
                if (id != estadoOrdenProduccion.Pk_EstadoOrdenProduccion)
                {
                    return NotFound();
                }

                _context.Update(estadoOrdenProduccion);
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
                var estadoOrdenProduccion = await _context.EstadoOrdenProduccion.FindAsync(id);

                if (estadoOrdenProduccion == null)
                {
                    return NotFound();
                }

                _context.EstadoOrdenProduccion.Remove(estadoOrdenProduccion);
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
