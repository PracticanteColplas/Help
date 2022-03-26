using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class Transferencia
    {
        [Key]
        public int Pk_Transferencia { get; set; }

        //Relacion con OrdenProduccion
        [Required]
        public string Fk_OrdenProduccion { get; set; }
        public OrdenProduccion ordenProduccion;

        [Required]
        public string No_Transferencia { get; set; }

        [Required]
        public string CodigoProducto { get; set; }

        [Required]
        public string Descripcion { get; set; }

        [Required]
        public decimal CantidadConsumida { get; set; }
    }
}
