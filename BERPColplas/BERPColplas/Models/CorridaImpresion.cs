using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class CorridaImpresion
    {
        [Key]
        public int Pk_CorridaImpresion { get; set; }

        ////Relacion con ProcesoOrdenProduccion
        //[Required]
        //public int Fk_ProcesoOrdenProduccion { get; set; }
        //public ProcesoOrdenProduccion procesoOrdenProduccion;

        //Relacion con OrdenProduccion
        [Required]
        public string Fk_OrdenProduccion { get; set; }
        public OrdenProduccion ordenProduccion;


        //Relacion con TiempoMontaje
        [Required]
        public int Fk_TiempoMontaje { get; set; }
        public TiempoMontaje tiempoMontaje;

        [Required]
        public string Maquina { get; set; }
        [Required]
        public Boolean Estado { get; set; }



        //Relacion con OperarioCorridaImpresion
        public ICollection<OperarioCorridaImpresion> OperarioCorridaImpresions { get; }
        //Relacion con NotaImpresion
        public ICollection<NotaImpresion> NotaImpresions { get; }
        //Relacion con TiempoParoImpresion
        public ICollection<TiempoParoImpresion> TiempoParoImpresions { get; }
        //Relacion con RetalImpresionCantidad
        public ICollection<RetalImpresionCantidad> RetalImpresionCantidads { get; }
        //Relacion con MaterialEntradaImpresion
        public ICollection<MaterialEntradaImpresion> MaterialEntradaImpresions { get; }

    }
}
