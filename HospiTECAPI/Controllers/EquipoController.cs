using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EquipoController : ControllerBase
{
    private readonly HospitecContext _context;

    public EquipoController(HospitecContext context)
    {
        _context = context;
    }

    // GET: api/Equipo
[HttpGet]
public async Task<IActionResult> GetAllEquipos()
{
    var equipos = await _context.Equipos
        .Select(e => new {
            idEquipo = e.Idequipo,
            idCama = e.Idcama,
            proveedor = e.Proveedor,
            nombre = e.Nombre,
            cantidad = e.Cantidad
        })
        .ToListAsync();

    if (equipos == null || !equipos.Any())
        return NotFound();

    return Ok(equipos);
}

// GET: api/Equipo/{idEquipo}
[HttpGet("{idEquipo}")]
public async Task<IActionResult> GetEquipo(int idEquipo)
{
    var equipo = await _context.Equipos.FindAsync(idEquipo);

    if (equipo == null)
        return NotFound($"No se encontró un equipo con el id {idEquipo}.");

    return Ok(equipo);
}

// POST: api/Equipo
[HttpPost]
public async Task<IActionResult> PostEquipo([FromBody] Equipo dto)
{
    var nuevoEquipo = new Equipo
    {
        Idcama = dto.Idcama,
        Proveedor = dto.Proveedor,
        Nombre = dto.Nombre,
        Cantidad = dto.Cantidad
    };
    _context.Equipos.Add(nuevoEquipo);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetAllEquipos", new { idEquipo = nuevoEquipo.Idequipo }, nuevoEquipo);
}

// PUT: api/Equipo/{idEquipo}
[HttpPut("{idEquipo}")]
public async Task<IActionResult> UpdateEquipo(int idEquipo, [FromBody] Equipo equipoUpdated)
{
    var equipo = await _context.Equipos.FindAsync(idEquipo);
    if (equipo == null)
    {
        return NotFound($"No se encontró un equipo con el id {idEquipo}.");
    }
    if (equipoUpdated.Idcama != null) equipo.Idcama = equipoUpdated.Idcama;
    if (equipoUpdated.Proveedor != null) equipo.Proveedor = equipoUpdated.Proveedor;
    if (equipoUpdated.Nombre != null) equipo.Nombre = equipoUpdated.Nombre;
    if (equipoUpdated.Cantidad != null) equipo.Cantidad = equipoUpdated.Cantidad;
    _context.Equipos.Update(equipo);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/Equipo/{idEquipo}
[HttpDelete("{idEquipo}")]
public async Task<IActionResult> DeleteEquipo(int idEquipo)
{
    var equipo = await _context.Equipos.FindAsync(idEquipo);
    if (equipo == null)
    {
        return NotFound($"No se encontró un equipo con el id {idEquipo}.");
    }

    _context.Equipos.Remove(equipo);
    await _context.SaveChangesAsync();
    return NoContent();
}

}
