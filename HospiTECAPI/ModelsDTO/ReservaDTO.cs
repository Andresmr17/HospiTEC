namespace HospiTECAPI.ModelsDTO;

public class ReservaDTO
{
    public int? Idreservacion { get; set; }

    public string? Pacientecedula { get; set; }

    public int? Idcama { get; set; }

    public int? Idproced { get; set; }

    public string? Fechaingreso { get; set; }

    public string? Fechasalida { get; set; }
}