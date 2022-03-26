using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class ConsumoMPriExtrusion
    {
        [Key]
        public int Pk_ConsumoMPriExtrusion { get; set; }
        [Required]
        public int Fk_CorridaExtrusion { get; set; }
        public CorridaExtrusion corridaExtrusion;
        [Required]
        public string Fk_MPri { get; set; }
        public MPriExtrusion mPriExtrusion;
        [Required]
        public decimal CantidadConsumida { get; set; }
    }
}
