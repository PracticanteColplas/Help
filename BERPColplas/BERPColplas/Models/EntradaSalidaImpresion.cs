using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class EntradaSalidaImpresion
    {
        [Key]
        public int Pk_EntradaSalidaImpresio { get; set; }

        [Required]
        public string Fk_NoLoteRolloMadre { get; set; }
        public MaterialEntradaImpresion materialEntradaImpresion;

        [Required]
        public string Fk_NoLoteSalida { get; set; }
        public MaterialSalidaImpresion materialSalidaImpresion;
    }
}
