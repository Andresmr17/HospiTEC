using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Procedimiento
{
    public int Idproced { get; set; }

    public string? Nombrepatologia { get; set; }

    public string? Procednombre { get; set; }

    public string? Descripcion { get; set; }

    public int? Duraciondias { get; set; }

    public virtual ICollection<Historial> Historials { get; set; } = new List<Historial>();

    public virtual Patologium? NombrepatologiaNavigation { get; set; }

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
