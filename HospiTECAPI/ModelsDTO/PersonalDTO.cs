namespace HospiTECAPI.ModelsDTO;

public class PersonalDTO
{
    public string Cedula { get; set; } = null!;

    public string? Fechanacimiento { get; set; }

    public string? Direccion { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido1 { get; set; }

    public string? Apellido2 { get; set; }

    public string? Fechaingreso { get; set; }
}