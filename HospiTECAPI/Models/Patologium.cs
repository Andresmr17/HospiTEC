using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Testcontextweas.Models;

namespace HospiTECAPI.Models;

public partial class Patologium
{
    public string Nombrepatologia { get; set; } = null!;

    public string? Descripcion { get; set; }
    
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Patologiaspresente> Patologiaspresentes { get; set; } = new List<Patologiaspresente>();
    
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Procedimiento> Procedimientos { get; set; } = new List<Procedimiento>();

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Tratamiento> Tratamientos { get; set; } = new List<Tratamiento>();
}
