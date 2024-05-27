using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Reserva
{
    public int Idreservacion { get; set; }

    public string? Pacientecedula { get; set; }

    public int? Idcama { get; set; }

    public int? Idproced { get; set; }

    public DateOnly? Fechaingreso { get; set; }

    public DateOnly? Fechasalida { get; set; }

    public virtual Cama? IdcamaNavigation { get; set; }

    public virtual Procedimiento? IdprocedNavigation { get; set; }

    public virtual Paciente? PacientecedulaNavigation { get; set; }
}
