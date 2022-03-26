using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class RetalImpresionCantidad
    {
        [Key]
        public int Pk_RetalImpresionCantidad { get; set; }
        [Required]
        public int Fk_RetalImpresion { get; set; }
        public RetalImpresion retalImpresion;
        [Required]
        public int Fk_CorridaImpresion { get; set; }
        public CorridaImpresion corridaImpresion;
        [Required]
        public decimal Cantidad { get; set; }
    }
}
