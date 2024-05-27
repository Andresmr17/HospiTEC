using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Rol
{
    public int Idrol { get; set; }

    public string? Personalcedula { get; set; }

    public string? Descripcion { get; set; }

    public virtual Personal? PersonalcedulaNavigation { get; set; }
}
