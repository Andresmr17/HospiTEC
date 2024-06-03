using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonalTelefonoController : ControllerBase
{
    private readonly HospitecContext _context;

    public PersonalTelefonoController(HospitecContext context)
    {
        _context = context;
    }

    // GET: api/PersonalTelefono
[HttpGet]
public async Task<IActionResult> GetAllPersonalTelefonos()
{
    var telefonos = await _context.PersonalTelefonos
        .Select(t => new {
            item = t.Item,
            personalCedula = t.Personalcedula,
            telefono = t.Telefono
        })
        .ToListAsync();

    if (telefonos == null || !telefonos.Any())
        return NotFound();

    return Ok(telefonos);
}

// GET: api/PersonalTelefono/{item}
[HttpGet("{item}")]
public async Task<IActionResult> GetPersonalTelefono(int item)
{
    var telefono = await _context.PersonalTelefonos.FindAsync(item);

    if (telefono == null)
        return NotFound($"No se encontró un teléfono de personal con el ítem {item}.");

    return Ok(telefono);
}

// POST: api/PersonalTelefono
[HttpPost]
public async Task<IActionResult> PostPersonalTelefono([FromBody] PersonalTelefono dto)
{
    var nuevoTelefono = new PersonalTelefono
    {
        Personalcedula = dto.Personalcedula,
        Telefono = dto.Telefono
    };
    _context.PersonalTelefonos.Add(nuevoTelefono);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetAllPersonalTelefonos", new { item = nuevoTelefono.Item }, nuevoTelefono);
}

// PUT: api/personaltelefono/personal/{personalcedula}
[HttpPut("personal/{personalcedula}")]
public async Task<IActionResult> Updatepersonaltelefono(string personalcedula, [FromBody] PersonalTelefono personaltelefonoUpdated)
{
    // Buscar el rol por la clave foránea Personalcedula
    var personaltelefono = await _context.PersonalTelefonos.FirstOrDefaultAsync(r => r.Personalcedula == personalcedula);

    if (personaltelefono == null)
    {
        return NotFound($"No se encontró un rol con el personal cedula {personalcedula}.");
    }

    // Actualizar el rol con los datos proporcionados en rolUpdated
    if (personaltelefonoUpdated.Personalcedula!= null) personaltelefonoUpdated.Personalcedula = personaltelefonoUpdated.Personalcedula;
    if (personaltelefonoUpdated.Telefono != null) personaltelefonoUpdated.Telefono  = personaltelefonoUpdated.Telefono;

    // Marcar el rol como modificado y guardar los cambios en la base de datos
    _context.PersonalTelefonos.Update(personaltelefono);
    await _context.SaveChangesAsync();

    return NoContent();
}


// PUT: api/PersonalTelefono/{item}
[HttpPut("{item}")]
public async Task<IActionResult> UpdatePersonalTelefono(int item, [FromBody] PersonalTelefono telefonoUpdated)
{
    var telefono = await _context.PersonalTelefonos.FindAsync(item);
    if (telefono == null)
    {
        return NotFound($"No se encontró un teléfono de personal con el ítem {item}.");
    }
    if (telefonoUpdated.Personalcedula != null) telefono.Personalcedula = telefonoUpdated.Personalcedula;
    if (telefonoUpdated.Telefono != null) telefono.Telefono = telefonoUpdated.Telefono;
    _context.PersonalTelefonos.Update(telefono);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/PersonalTelefono/{item}
[HttpDelete("{item}")]
public async Task<IActionResult> DeletePersonalTelefono(int item)
{
    var telefono = await _context.PersonalTelefonos.FindAsync(item);
    if (telefono == null)
    {
        return NotFound($"No se encontró un teléfono de personal con el ítem {item}.");
    }

    _context.PersonalTelefonos.Remove(telefono);
    await _context.SaveChangesAsync();
    return NoContent();
}

}
