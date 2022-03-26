using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class OperarioMontaje
    {
        [Key]
        public int Pk_OperarioMontaje { get; set; }
        [Required]
        public int Fk_TiempoMontaje { get; set; }
        public TiempoMontaje tiempoMontaje;
        [Required]
        public int Fk_Operario { get; set; }
        public Operario operario;
        public DateTime FechaHora { get; set; }



    }
}

