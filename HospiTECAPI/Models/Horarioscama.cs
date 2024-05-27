using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Horarioscama
{
    public int Idhorario { get; set; }

    public int? Idcama { get; set; }

    public DateOnly? Dialinicio { get; set; }

    public DateOnly? Diafinal { get; set; }

    public string? Dni { get; set; }

    public virtual Cama? IdcamaNavigation { get; set; }
}
