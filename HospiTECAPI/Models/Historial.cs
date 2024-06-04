using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Historial
{
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public int? Idhistorial { get; set; }

    public int? Idproced { get; set; }

    public int? Idtratamiento { get; set; }

    public string? Pacientecedula { get; set; }

    public DateOnly? Fechaprocedimiento { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Procedimiento? IdprocedNavigation { get; set; }
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Tratamiento? IdtratamientoNavigation { get; set; }
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Paciente? PacientecedulaNavigation { get; set; }
}

public class HistorialView
{
    public int IdHistorial { get; set; }
    public string NombrePatologia { get; set; }
    public string ProcedNombre { get; set; }
    public string NombreTratamiento { get; set; }
    public DateTime FechaProcedimiento { get; set; }
}

