using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HospiTECAPI.Models;

public partial class Cama
{
    public int? Idcama { get; set; }

    public string? Nombresalon { get; set; }

    public bool? Estadouci { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Equipo> Equipos { get; set; } = new List<Equipo>();
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Horarioscama> Horarioscamas { get; set; } = new List<Horarioscama>();
    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual Salon? NombresalonNavigation { get; set; }

    [JsonIgnore] //Funciona para que se ignore y no aparezca en el request del POST
    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
