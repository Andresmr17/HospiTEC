using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Equipo
{
    public int? Idequipo { get; set; }

    public int? Idcama { get; set; }

    public string? Proveedor { get; set; }

    public string? Nombre { get; set; }

    public int? Cantidad { get; set; }
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Cama? IdcamaNavigation { get; set; }
}
