using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class PersonalTelefono
{
    public int Item { get; set; }

    public string? Personalcedula { get; set; }

    public string? Telefono { get; set; }

    public virtual Personal? PersonalcedulaNavigation { get; set; }
}
