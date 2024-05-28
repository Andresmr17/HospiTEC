namespace HospiTECAPI.ModelsDTO;

public class PacienteDTO
{
    public string Cedula { get; set; } = null!;

    public string? Direccion { get; set; }

    public string? Fechanacimiento { get; set; }

    public string? Nombre { get; set;}

    public string? Apellido1 { get; set; }

    public string? Apellido2 { get; set; }
}