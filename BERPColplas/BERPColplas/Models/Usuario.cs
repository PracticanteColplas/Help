using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class Usuario
    {
        [Key]
        public int Pk_Usuario { get; set; }

        //Relacion con Rol
        [Required]
        public int Fk_Rol { get; set; }
        public Rol rol;

        [Required]
        public string Contrasena { get; set; }

    }
}
