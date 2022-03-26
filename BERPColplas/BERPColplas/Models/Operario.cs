using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class Operario
    {
        [Key]
        public int Pk_Operario { get; set; }

        [Required]
        public string Nombre { get; set; }



        //Relacion con OperarioCorridaExtrusion
        public ICollection<OperarioCorridaExtrusion> OperarioCorridaExtrusions { get; }
        //Relacion con OperarioCorridaExtrusion
        public ICollection<OperarioCorridaImpresion> OperarioCorridaImpresions { get; }
        //Relacion con OperarioCorridaExtrusion
        public ICollection<OperarioCorridaRefilado> OperarioCorridaRefilados { get; }
        //Relacion con OperarioCorridaExtrusion
        public ICollection<OperarioMontaje> OperarioMontajes { get; }
    }
}
