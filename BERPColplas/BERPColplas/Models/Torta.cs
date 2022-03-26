using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas.Models
{
    public class Torta
    {
        [Key]
        public string Pk_Torta { get; set; }
        [Required]
        public string Descripcion { get; set; }


        //Relacion con TortaExtrusion 
        public ICollection<TortaExtrusion> TortaExtrusions { get; }
    }
}
