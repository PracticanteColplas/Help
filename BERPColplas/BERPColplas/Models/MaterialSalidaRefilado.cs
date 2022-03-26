using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class MaterialSalidaRefilado
    {
        [Key]
        public string PK_NoLoteSalidaRefilado { get; set; }
        [Required]
        public decimal Cantidad { get; set; }
        [Required]
        public string UbicacionTipo { get; set; }
        [Required]
        public string UbicacionNumero { get; set; }




        //Relacion con EntradaSalidaRefilado
        public ICollection<EntradaSalidaRefilado> EntradaSalidaRefilados { get; }

    }
}
