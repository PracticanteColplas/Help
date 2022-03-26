using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class OperarioCorridaImpresion
    {
        [Key]
        public int Pk_OperarioCorridaImpresion { get; set; }

        [Required]
        public int Fk_CorridaImpresion { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaImpresion corridaImpresion;


        [Required]
        public int Fk_Operario { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public Operario operario;

        [Required]
        public DateTime FechaHora { get; set; }
    }
}
