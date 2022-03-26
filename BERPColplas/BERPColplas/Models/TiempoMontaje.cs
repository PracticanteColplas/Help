using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class TiempoMontaje
    {
        [Key]
        public int Pk_TiempoMontaje { get; set; }
        [Required]
        public decimal MetrosCuadre { get; set; }
        [Required]
        public decimal Velocidad { get; set; }



        //Relacion con CorridaImpresion
        public ICollection<CorridaImpresion> CorridaImpresions { get; }
        //Relacion con OperarioMontaje
        public ICollection<OperarioMontaje> OperarioMontajes { get; }
    }
}
