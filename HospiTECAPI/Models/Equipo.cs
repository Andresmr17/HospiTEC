using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Equipo
{
    public int Idequipo { get; set; }

    public int? Idcama { get; set; }

    public string? Proveedor { get; set; }

    public string? Nombre { get; set; }

    public int? Cantidad { get; set; }

    public virtual Cama? IdcamaNavigation { get; set; }
}
