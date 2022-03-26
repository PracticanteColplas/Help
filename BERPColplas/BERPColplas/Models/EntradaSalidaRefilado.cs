using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class EntradaSalidaRefilado
    {
        [Key]
        public int Pk_EntradaSalidaRefilado { get; set; }

        [Required]
        public string Fk_NoLoteRolloMadreRefilado { get; set; }
        public MaterialEntradaRefilado materialEntradaRefilado;

        [Required]
        public string Fk_NoLoteSalida { get; set; }
        public MaterialSalidaRefilado materialSalidaRefilado;


    }
}
