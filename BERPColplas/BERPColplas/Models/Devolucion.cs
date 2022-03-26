using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class Devolucion
    {
        [Key]
        public int Pk_Devolucion { get; set; }
        [Required]
        public string Fk_OrdenProduccion { get; set; }
        public OrdenProduccion ordenProduccion;
        [Required]
        public string Fk_MPri { get; set; }
        public MPriExtrusion mPriExtrusion;
        [Required]
        public decimal Cantidad { get; set; }
    }
}
