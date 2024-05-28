using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Tratamiento
{
    public int Idtratamiento { get; set; }

    public string? Nombrepatologia { get; set; }

    public string? Nombretratamiento { get; set; }

    public string? Descripcion { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Historial> Historials { get; set; } = new List<Historial>();
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Patologium? NombrepatologiaNavigation { get; set; }
}
