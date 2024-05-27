using System;
using System.Collections.Generic;

namespace HospiTECAPI.Models;

public partial class Personal
{
    public string Cedula { get; set; } = null!;

    public DateOnly? Fechanacimiento { get; set; }

    public string? Direccion { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido1 { get; set; }

    public string? Apellido2 { get; set; }

    public DateOnly? Fechaingreso { get; set; }

    public virtual ICollection<PersonalTelefono> PersonalTelefonos { get; set; } = new List<PersonalTelefono>();

    public virtual ICollection<Rol> Rols { get; set; } = new List<Rol>();
}
