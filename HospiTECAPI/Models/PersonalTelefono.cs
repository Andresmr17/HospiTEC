﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class PersonalTelefono
{
    public int? Item { get; set; }

    public string? Personalcedula { get; set; }

    public string? Telefono { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Personal? PersonalcedulaNavigation { get; set; }
}