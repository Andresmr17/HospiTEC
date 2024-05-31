using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Paciente
{
    public string Cedula { get; set; } = null!;

    public string? Direccion { get; set; }

    public DateOnly? Fechanacimiento { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido1 { get; set; }

    public string? Apellido2 { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Historial> Historials { get; set; } = new List<Historial>();

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<PacienteTelefono> PacienteTelefonos { get; set; } = new List<PacienteTelefono>();

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}

public partial class PacienteLogin
{
    public string Cedula { get; set; } = null!;

    public string? Nombre { get; set; }

}