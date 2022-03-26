using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class Rol
    {
        [Key]
        public int Pk_Rol { get; set; }
     
        [Required]
        public string descripcion { get; set; }



        //Relacion con Usuario
        public ICollection<Usuario> usuarios { get; }
    }
}
