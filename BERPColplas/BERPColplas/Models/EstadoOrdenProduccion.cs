using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class EstadoOrdenProduccion
    {
        [Key]
        public int Pk_EstadoOrdenProduccion { get; set; }

        //Relacion con OrdenProduccion
        [Required]
        public string Fk_OrdenProduccion { get; set; }
        public OrdenProduccion ordenProduccion;
        //public CorridaImpresion corridaImpresion;
        //public CorridaExtrusion corridaExtrusion;
        //public CorridaRefilado corridaRefilado;

        [Required]
        public Boolean Estado { get; set; }
    }
}
