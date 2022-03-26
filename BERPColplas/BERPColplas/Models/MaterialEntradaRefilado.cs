using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class MaterialEntradaRefilado
    {
        [Key]
        public string Pk_NoLoteRolloMadreRefilado { get; set; }
        [Required]
        public decimal CantidadRolloMadre { get; set; }

        [Required]
        public int Fk_CorridaRefilado { get; set; }
        //public CorridaExtrusion corridaExtrusion { get; set; }
        public CorridaRefilado corridaRefilado;

        [Required]
        public decimal CantidadConsumidaRolloMadre { get; set; }



        //Relacion con EntradaSalidaRefilado
        public ICollection<EntradaSalidaRefilado> EntradaSalidaRefilados { get; }

    }
}
