using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class NotaImpresion
    {
        [Key]
        public int Pk_NotaImpresion { get; set; }
        [Required]
        public int Fk_CorridaImpresion { get; set; }
        public CorridaImpresion corridaImpresion;
        [Required]
        public string Descripcion { get; set; }
    }
}
