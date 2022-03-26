using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class ProcesoOrdenProduccion
    {

        [Key]
        public int Pk_ProcesoOrdenProduccion { get; set; }

        //Relacion con OrdenProduccion
        [Required]
        public string Fk_OrdenProduccion { get; set; }
        public OrdenProduccion ordenProduccion;

        [Required]
        public string Proceso { get; set; }
        [Required]
        public string UnidadMedida { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        public string Maquina { get; set; }




        ////Relacion con CorridaExtrusion
        //public ICollection<CorridaExtrusion> CorridaExtrusions { get; }
        ////Relacion con CorridaRefilado
        //public ICollection<CorridaRefilado> CorridaRefilados { get; }
        ////Relacion con CorridaImpresion
        //public ICollection<CorridaImpresion> CorridaImpresions { get; }
    }
}
