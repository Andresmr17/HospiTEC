using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Horarioscama
{
    public int? Idhorario { get; set; }

    public int? Idcama { get; set; }

    public DateOnly? Dialinicio { get; set; }

    public DateOnly? Diafinal { get; set; }

    public string? Dni { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Cama? IdcamaNavigation { get; set; }
}
