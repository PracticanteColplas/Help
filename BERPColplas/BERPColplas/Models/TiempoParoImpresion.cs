using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class TiempoParoImpresion
    {
        [Key]
        public int Pk_TiempoParoImpresion { get; set; }

        //Relacion con CorridaImpresion
        [Required]
        public int Fk_CorridaImpresion { get; set; }
        public CorridaImpresion corridaImpresion;

        [Required]
        public DateTime FechaInicio { get; set; }
        [Required]
        public DateTime FechaFinal { get; set; }
        [Required]
        public string CausaDescripcion { get; set; }
    }
}
