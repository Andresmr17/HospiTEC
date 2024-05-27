using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class PacienteTelefono
{
    public int Item { get; set; }

    public string? Pacientecedula { get; set; }

    public string? Telefono { get; set; }

    public virtual Paciente? PacientecedulaNavigation { get; set; }
}
