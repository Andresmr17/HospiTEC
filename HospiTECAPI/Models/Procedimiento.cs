using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Procedimiento
{
    public int? Idproced { get; set; }

    public string? Nombrepatologia { get; set; }

    public string? Procednombre { get; set; }

    public string? Descripcion { get; set; }

    public int? Duraciondias { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Historial> Historials { get; set; } = new List<Historial>();

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Patologium? NombrepatologiaNavigation { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
