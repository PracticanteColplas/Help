using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class CorridaExtrusion
    {

        [Key]
        public int Pk_CorridaExtrusion { get; set; }

        ////Relacion con ProcesoOrdenProduccion
        //[Required]
        //public int Fk_ProcesoOrdenProduccion { get; set; }
        //public ProcesoOrdenProduccion procesoOrdenProduccion;

        //Relacion con OrdenProduccion
        [Required]
        public string Fk_OrdenProduccion { get; set; }
        public OrdenProduccion ordenProduccion;

        [Required]
        public decimal TiempoAjuste { get; set; }
        [Required]
        public string Maquina { get; set; }
        [Required]
        public Boolean Estado { get; set; }




        //Relacion con MaterialSalida
        public ICollection<MaterialSalida> MaterialSalidas { get; }
        //Relacion con Reproceso
        public ICollection<Reproceso> Reprocesos { get; }
        //Relacion con TiempoParoExtrusion
        public ICollection<TiempoParoExtrusion> TiempoParoExtrusions { get; }
        //Relacion con NotaExtrusion 
        public ICollection<NotaExtrusion> NotaExtrusions { get; }
        //Relacion con TortaExtrusion 
        public ICollection<TortaExtrusion> TortaExtrusions { get; }
        //Relacion con RetalExtrusionCantidad
        public ICollection<RetalExtrusionCantidad> RetalExtrusionCantidads { get; }
        //Relacion con ConsumoMPriExtrusion
        public ICollection<ConsumoMPriExtrusion> ConsumoMPriExtrusions { get; }
        //Relacion con OperarioCorridaExtrusion
        public ICollection<OperarioCorridaExtrusion> OperarioCorridaExtrusions { get; }


    }
}
