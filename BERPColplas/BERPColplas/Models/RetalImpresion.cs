using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class RetalImpresion
    {
        [Key]
        public int Pk_RetalImpresion { get; set; }
        [Required]
        public int Fk_CorridaImpresion { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaImpresion corridaImpresion;
        [Required]
        public string Codigo { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        public decimal Cantidad { get; set; }




        //Relacion con RetalExtrusionCantidad
        public ICollection<RetalImpresionCantidad> RetalImpresionCantidads { get; }

    }
}
