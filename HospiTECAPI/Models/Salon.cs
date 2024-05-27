using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Salon
{
    public string Nombresalon { get; set; } = null!;

    public int? Capacidadcamas { get; set; }

    public string? Tipodesalon { get; set; }

    public int? Numerodepiso { get; set; }

    public virtual ICollection<Cama> Camas { get; set; } = new List<Cama>();
}
