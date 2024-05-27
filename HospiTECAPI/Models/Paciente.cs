using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Paciente
{
    public string Cedula { get; set; } = null!;

    public string? Direccion { get; set; }

    public DateOnly? Fechanacimiento { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido1 { get; set; }

    public string? Apellido2 { get; set; }

    public virtual ICollection<Historial> Historials { get; set; } = new List<Historial>();

    public virtual ICollection<PacienteTelefono> PacienteTelefonos { get; set; } = new List<PacienteTelefono>();

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
