using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class RetalExtrusionCantidad
    {
        [Key]
        public int Pk_RetalExtrusionCantidad { get; set; }
        [Required]
        public int Fk_RetalExtrusion { get; set; }
        public RetalExtrusion retalExtrusion;
        [Required]
        public int Fk_CorridaExtrusion { get; set; }
        public CorridaExtrusion corridaExtrusion;
        [Required]
        public decimal Cantidad { get; set; }
    }
}
