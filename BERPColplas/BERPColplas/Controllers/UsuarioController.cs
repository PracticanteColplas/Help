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
    public class UsuarioController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public UsuarioController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CorridaExtrusionController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listUsuario = await _context.Usuario.ToListAsync().ConfigureAwait(false);
                return Ok(listUsuario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, string dos)
        {

            Array[] myIntArray = new Array[1];

            try
            {
                var query = from u in _context.Usuario
                            where u.Fk_Rol == id && u.Contrasena == dos
                            select new
                            {
                                Pk_Usuario = u.Pk_Usuario,
                                Fk_Rol = u.Fk_Rol,
                                Contrasena = u.Contrasena,
                            };

                var listMaterialSalidaD = await query.ToListAsync().ConfigureAwait(false);
                myIntArray[0] = listMaterialSalidaD.ToArray();



            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

            return Ok(myIntArray);

        }


        // POST api/<CorridaExtrusionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            try
            {
                _context.Add(usuario);
                await _context.SaveChangesAsync();
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CorridaExtrusionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Usuario usuario)
        {
            try
            {
                if (id != usuario.Pk_Usuario)
                {
                    return NotFound();
                }

                _context.Update(usuario);
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
                var usuario = await _context.Usuario.FindAsync(id);

                if (usuario == null)
                {
                    return NotFound();
                }

                _context.Usuario.Remove(usuario);
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
