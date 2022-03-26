using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class MaterialSalidaImpresion
    {
        [Key]
        public string PK_NoLoteSalidaImpresion { get; set; }

        [Required]
        public decimal KgEntregados { get; set; }
        [Required]
        public decimal MetroLineal { get; set; }
        [Required]
        public string UbicacionTipo { get; set; }
        [Required]
        public string UbicacionNumero { get; set; }



        //Relacion con EntradaSalidaImpresion
        public ICollection<EntradaSalidaImpresion> EntradaSalidaImpresions { get; }
    }
}
