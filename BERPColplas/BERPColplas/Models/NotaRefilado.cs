using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class NotaRefilado
    {
        [Key]
        public int Pk_NotaRefilado { get; set; }
        [Required]
        public int Fk_CorridaRefilado { get; set; }
        public CorridaRefilado corridaRefilado;
        [Required]
        public string Descripcion { get; set; }
    }
}
