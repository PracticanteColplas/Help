using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class MPriExtrusion
    {
        [Key]
        public string Pk_CodigoProducto { get; set; }
        [Required]
        public string Descripcion { get; set; }

        //Relacion con Devolucion
        public ICollection<Devolucion> Devolucions { get; }
        //Relacion con ConsumoMPriExtrusion
        public ICollection<ConsumoMPriExtrusion> ConsumoMPriExtrusions { get; }
    }
}
