using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class MaterialEntradaImpresion
    {
        [Key]
        public string Pk_NoLoteRolloMadreImpresion { get; set; }

        //Relacion con ComponenteOrdenProduccion
        [Required]
        public int Fk_CorridaImpresion { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaImpresion corridaImpresion;

        [Required]
        public decimal CantidadRolloMadre { get; set; }
        [Required]
        public decimal CantidadConsumidaRolloMadre { get; set; }




        //Relacion con EntradaSalidaImpresion
        public ICollection<EntradaSalidaImpresion> EntradaSalidaImpresions { get; }
    }
}
