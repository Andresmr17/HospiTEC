using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Patologium
{
    public string Nombrepatologia { get; set; } = null!;

    public string? Descripcion { get; set; }

    public virtual ICollection<Procedimiento> Procedimientos { get; set; } = new List<Procedimiento>();

    public virtual ICollection<Tratamiento> Tratamientos { get; set; } = new List<Tratamiento>();
}
