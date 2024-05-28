using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PacienteTelefonoController : ControllerBase
{
    private readonly HospitecContext _context;

    public PacienteTelefonoController(HospitecContext context)
    {
        _context = context;
    }

    // GET: api/PacienteTelefono
[HttpGet]
public async Task<IActionResult> GetAllPacienteTelefonos()
{
    var telefonos = await _context.PacienteTelefonos
        .Select(t => new {
            item = t.Item,
            pacienteCedula = t.Pacientecedula,
            telefono = t.Telefono
        })
        .ToListAsync();

    if (telefonos == null || !telefonos.Any())
        return NotFound();

    return Ok(telefonos);
}

// GET: api/PacienteTelefono/{item}
[HttpGet("{item}")]
public async Task<IActionResult> GetPacienteTelefono(int item)
{
    var telefono = await _context.PacienteTelefonos.FindAsync(item);

    if (telefono == null)
        return NotFound($"No se encontró un teléfono de paciente con el ítem {item}.");

    return Ok(telefono);
}

// POST: api/PacienteTelefono
[HttpPost]
public async Task<IActionResult> PostPacienteTelefono([FromBody] PacienteTelefono dto)
{
    var nuevoTelefono = new PacienteTelefono
    {
        Pacientecedula = dto.Pacientecedula,
        Telefono = dto.Telefono
    };
    _context.PacienteTelefonos.Add(nuevoTelefono);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetAllPacienteTelefonos", new { item = nuevoTelefono.Item }, nuevoTelefono);
}

// PUT: api/PacienteTelefono/{item}
[HttpPut("{item}")]
public async Task<IActionResult> UpdatePacienteTelefono(int item, [FromBody] PacienteTelefono telefonoUpdated)
{
    var telefono = await _context.PacienteTelefonos.FindAsync(item);
    if (telefono == null)
    {
        return NotFound($"No se encontró un teléfono de paciente con el ítem {item}.");
    }
    if (telefonoUpdated.Pacientecedula != null) telefono.Pacientecedula = telefonoUpdated.Pacientecedula;
    if (telefonoUpdated.Telefono != null) telefono.Telefono = telefonoUpdated.Telefono;
    _context.PacienteTelefonos.Update(telefono);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/PacienteTelefono/{item}
[HttpDelete("{item}")]
public async Task<IActionResult> DeletePacienteTelefono(int item)
{
    var telefono = await _context.PacienteTelefonos.FindAsync(item);
    if (telefono == null)
    {
        return NotFound($"No se encontró un teléfono de paciente con el ítem {item}.");
    }

    _context.PacienteTelefonos.Remove(telefono);
    await _context.SaveChangesAsync();
    return NoContent();
}

}
