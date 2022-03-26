using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class OperarioCorridaRefilado
    {
        [Key]
        public int Pk_OperarioCorridaRefilado { get; set; }

        [Required]
        public int Fk_CorridaRefilado { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaRefilado corridaRefilado;


        [Required]
        public int Fk_Operario { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public Operario operario;

        [Required]
        public DateTime FechaHora { get; set; }
    }
}
