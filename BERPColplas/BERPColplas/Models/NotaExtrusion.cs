using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class NotaExtrusion
    {
        [Key]
        public int Pk_NotaExtrusion { get; set; }
        [Required]
        public int Fk_CorridaExtrusion { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaExtrusion corridaExtrusion;
        [Required]
        public string Descripcion { get; set; }
    }
}
