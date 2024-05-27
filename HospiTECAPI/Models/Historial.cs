using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Historial
{
    public int Idhistorial { get; set; }

    public int? Idproced { get; set; }

    public int? Idtratamiento { get; set; }

    public string? Pacientecedula { get; set; }

    public DateOnly? Fechaprocedimiento { get; set; }

    public virtual Procedimiento? IdprocedNavigation { get; set; }

    public virtual Tratamiento? IdtratamientoNavigation { get; set; }

    public virtual Paciente? PacientecedulaNavigation { get; set; }
}
