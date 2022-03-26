using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class RetalExtrusion
    {
        [Key]
        public int Pk_RetalExtrusion { get; set; }
        [Required]
        public string Codigo { get; set; }
        [Required]
        public string Descripcion { get; set; }


        //Relacion con RetalExtrusionCantidad
        public ICollection<RetalExtrusionCantidad> RetalExtrusionCantidads { get; }
    }
}
