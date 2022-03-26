using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class TiempoParoRefilado
    {
        [Key]
        public int Pk_TiempoParoRefilado { get; set; }
        [Required]
        public int Fk_CorridaRefilado { get; set; }
        public CorridaRefilado corridaRefilado;
        [Required]
        public DateTime FechaInicio { get; set; }
        [Required]
        public DateTime FechaFinal { get; set; }
        [Required]
        public string CausaDescripcion { get; set; }
    }
}
