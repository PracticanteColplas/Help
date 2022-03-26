using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class OrdenProduccion
    {
        [Key]
        public string Pk_OrdenProduccion  { get; set; }

        [Required]
        public string CodigoProductoERP { get; set; }
        [Required]
        public string Cliente { get; set; }
        [Required]
        public decimal CantidadProgramada { get; set; }
        [Required]
        public string Proceso { get; set; }
        [Required]
        public string UnidadMedida { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        public string Maquina { get; set; }


        //Relacion con CorridaExtrusion
        public ICollection<CorridaExtrusion> CorridaExtrusions { get; }
        //Relacion con CorridaRefilado
        public ICollection<CorridaRefilado> CorridaRefilados { get; }
        //Relacion con CorridaImpresion
        public ICollection<CorridaImpresion> CorridaImpresions { get; }


        //Relacion con ComponeneteOrdenProduccion
        public ICollection<ComponenteOrdenProduccion> ComponenteOrdenProduccions { get; }
        //Relacion con EstadoOrdenProduccion
        public ICollection<EstadoOrdenProduccion> EstadoOrdenProduccions { get; }
        //Relacion con ProcesoOrdenProduccion
        public ICollection<ProcesoOrdenProduccion> ProcesoOrdenProduccions{ get; }
        //Relacion con ProcesoOrdenProduccion
        public ICollection<Devolucion> Devolucions { get; }
        //Relacion con Transferido
        public ICollection<Transferencia> Transferencias { get; }
    }
}
