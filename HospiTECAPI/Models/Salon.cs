using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Salon
{
    public string Nombresalon { get; set; } = null!;

    public int? Capacidadcamas { get; set; }

    public string? Tipodesalon { get; set; }

    public int? Numerodepiso { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Cama> Camas { get; set; } = new List<Cama>();
}
