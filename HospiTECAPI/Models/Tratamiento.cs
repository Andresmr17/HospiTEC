using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Tratamiento
{
    public int Idtratamiento { get; set; }

    public string? Nombrepatologia { get; set; }

    public string? Nombretratamiento { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Historial> Historials { get; set; } = new List<Historial>();

    public virtual Patologium? NombrepatologiaNavigation { get; set; }
}
