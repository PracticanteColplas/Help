using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class OperarioCorridaExtrusion
    {
        [Key]
        public int Pk_OperarioCorridaExtrusion { get; set; }

        [Required]
        public int Fk_CorridaExtrusion { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaExtrusion corridaExtrusion;
        //[ForeignKey("Fk_CorridaExtrusion")]

        [Required]
        public int Fk_Operario { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public Operario operario;

        [Required]
        public DateTime FechaHora { get; set; }

    }
}
