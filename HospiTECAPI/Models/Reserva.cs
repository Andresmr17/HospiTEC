using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Reserva
{
    public int? Idreservacion { get; set; }

    public string? Pacientecedula { get; set; }

    public int? Idcama { get; set; }

    public int? Idproced { get; set; }

    public DateOnly? Fechaingreso { get; set; }

    public DateOnly? Fechasalida { get; set; }
    
    
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Cama? IdcamaNavigation { get; set; }
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Procedimiento? IdprocedNavigation { get; set; }
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Paciente? PacientecedulaNavigation { get; set; }
}
