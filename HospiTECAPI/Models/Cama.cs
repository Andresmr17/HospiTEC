using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Cama
{
    public int Idcama { get; set; }

    public string? Nombresalon { get; set; }

    public bool? Estadouci { get; set; }

    public virtual ICollection<Equipo> Equipos { get; set; } = new List<Equipo>();

    public virtual ICollection<Horarioscama> Horarioscamas { get; set; } = new List<Horarioscama>();

    public virtual Salon? NombresalonNavigation { get; set; }

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
