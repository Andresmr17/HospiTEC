using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using HospiTECAPI.Models;

namespace Testcontextweas.Models;

public partial class Patologiaspresente
{
    public int? Idpatpresente { get; set; }

    public string? Pacientecedula { get; set; }

    public string? Nombrepatologia { get; set; }

    public string? Descripciontratamiento { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Patologium? NombrepatologiaNavigation { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Paciente? PacientecedulaNavigation { get; set; }
}
