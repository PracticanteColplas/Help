using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class CorridaRefilado
    {
        [Key]
        public int Pk_CorridaRefilado { get; set; }

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




        //Relacion con NotaExtrusion 
        public ICollection<NotaRefilado> NotaRefilados { get; }
        //Relacion con NotaExtrusion 
        public ICollection<TiempoParoRefilado> TiempoParoRefilados { get; }
        //Relacion con MaterialEntradaRefilado 
        public ICollection<MaterialEntradaRefilado> MaterialEntradaRefilados { get; }
        //Relacion con CorridaImpresion
        public ICollection<OperarioCorridaRefilado> OperarioCorridaRefilados { get; }
        //Relacion con RetalRefiladoCantidad
        public ICollection<RetalRefiladoCantidad> RetalRefiladoCantidads { get; }
    }
}
