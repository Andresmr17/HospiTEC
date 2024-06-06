using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Testcontextweas.Models;

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
    
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Patologiaspresente> Patologiaspresentes { get; set; } = new List<Patologiaspresente>();
}

public partial class PacienteLogin
{
    public string Cedula { get; set; } = null!;

    public string? Nombre { get; set; }

}

//modelo para recibir el formato y realizar una consulta consumiendo un stored procedure
public class InformacionPaciente
{
    public string Cedula { get; set; }
    public string Direccion { get; set; }
    public DateTime FechaNacimiento { get; set; }
    public string Nombre { get; set; }
    public string Apellido1 { get; set; }
    public string Apellido2 { get; set; }
    public string[] Telefonos { get; set; }
    public string[]? Patologias_Patentes { get; set; }
    public string[] descripciones { get; set; }
}




