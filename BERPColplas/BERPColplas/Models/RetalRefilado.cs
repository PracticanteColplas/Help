using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class RetalRefilado
    {
        [Key]
        public int Pk_RetalRefilado { get; set; }
        [Required]
        public int Fk_CorridaRefilado { get; set; }
        public CorridaRefilado corridaRefilado;
        [Required]
        public string Codigo { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        public decimal Cantidad { get; set; }



        //Relacion con RetalRefiladoCantidad
        public ICollection<RetalRefiladoCantidad> RetalRefiladoCantidads { get; }
    }
}
