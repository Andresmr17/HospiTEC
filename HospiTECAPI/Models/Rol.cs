using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Rol
{
    public int Idrol { get; set; }

    public string? Personalcedula { get; set; }

    public string? Descripcion { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Personal? PersonalcedulaNavigation { get; set; }
}
