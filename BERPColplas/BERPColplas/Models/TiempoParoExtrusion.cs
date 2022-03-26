using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class TiempoParoExtrusion
    {
        [Key]
        public int Pk_TiempoParoExtrusion { get; set; }
        [Required]
        public int Fk_CorridaExtrusion { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaExtrusion corridaExtrusion;
        [Required]
        public DateTime FechaInicio { get; set; }
        [Required]
        public DateTime FechaFinal { get; set; }
        [Required]
        public string CausaDescripcion { get; set; }
    }
}
