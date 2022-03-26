using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class Reproceso
    {
        [Key]
        public int Pk_Reproceso { get; set; }
        [Required]
        public int Fk_CorridaExtrusion { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaExtrusion corridaExtrusion;
        [Required]
        public decimal PesoNetoRollo { get; set; }
        [Required]
        public string NoLote { get; set; }
        //[Required]
        //public string UbicacionTipo { get; set; }
        [Required]
        public string UbicacionNumero { get; set; }

    }
}
