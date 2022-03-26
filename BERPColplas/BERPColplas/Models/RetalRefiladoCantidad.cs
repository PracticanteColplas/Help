using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class RetalRefiladoCantidad
    {
        [Key]
        public int Pk_RetalRefiladoCantidad { get; set; }
        [Required]
        public int Fk_RetalRefilado { get; set; }
        public RetalRefilado retalRefilado;
        [Required]
        public int Fk_CorridaRefilado { get; set; }
        public CorridaRefilado corridaRefilado;
        [Required]
        public decimal Cantidad { get; set; }
    }
}
