using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class TortaExtrusion
    {
        [Key]
        public int Pk_TortaExtrusion { get; set; }

        //Relacion con OrdenProduccion
        [Required]
        public int Fk_CorridaExtrusion { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaExtrusion corridaExtrusion;

        //Relacion con ComponenteOrdenProduccion
        [Required]
        public string Fk_Torta { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public Torta torta;

        [Required]
        public decimal Cantidad { get; set; }

    }
}
