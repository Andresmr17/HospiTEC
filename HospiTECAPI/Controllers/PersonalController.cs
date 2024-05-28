using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonalController : ControllerBase
{
    private readonly HospitecContext _context;

    public PersonalController(HospitecContext context)
    {
        _context = context;
    }
    // GET: api/Personal
[HttpGet]
public async Task<IActionResult> GetAllPersonal()
{
    var personal = await _context.Personals
        .Select(p => new {
            cedula = p.Cedula,
            fechaNacimiento = p.Fechanacimiento,
            direccion = p.Direccion,
            nombre = p.Nombre,
            apellido1 = p.Apellido1,
            apellido2 = p.Apellido2,
            fechaIngreso = p.Fechaingreso
        })
        .ToListAsync();

    if (personal == null || !personal.Any())
        return NotFound();

    return Ok(personal);
}

// GET: api/Personal/{cedula}
[HttpGet("{cedula}")]
public async Task<IActionResult> GetPersonal(string cedula)
{
    var personal = await _context.Personals.FindAsync(cedula);

    if (personal == null)
        return NotFound($"No se encontró un personal con la cédula {cedula}.");

    return Ok(personal);
}

// POST: api/Personal
[HttpPost]
public async Task<IActionResult> PostPersonal([FromBody] Personal dto)
{
    var nuevoPersonal = new Personal
    {
        Cedula = dto.Cedula,
        Fechanacimiento = dto.Fechanacimiento,
        Direccion = dto.Direccion,
        Nombre = dto.Nombre,
        Apellido1 = dto.Apellido1,
        Apellido2 = dto.Apellido2,
        Fechaingreso = dto.Fechaingreso
    };
    _context.Personals.Add(nuevoPersonal);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetAllPersonal", new { cedula = nuevoPersonal.Cedula }, nuevoPersonal);
}

// PUT: api/Personal/{cedula}
[HttpPut("{cedula}")]
public async Task<IActionResult> UpdatePersonal(string cedula, [FromBody] Personal personalUpdated)
{
    var personal = await _context.Personals.FindAsync(cedula);
    if (personal == null)
    {
        return NotFound($"No se encontró un personal con la cédula {cedula}.");
    }
    if (personalUpdated.Fechanacimiento != null) personal.Fechanacimiento = personalUpdated.Fechanacimiento;
    if (personalUpdated.Direccion != null) personal.Direccion = personalUpdated.Direccion;
    if (personalUpdated.Nombre != null) personal.Nombre = personalUpdated.Nombre;
    if (personalUpdated.Apellido1 != null) personal.Apellido1 = personalUpdated.Apellido1;
    if (personalUpdated.Apellido2 != null) personal.Apellido2 = personalUpdated.Apellido2;
    if (personalUpdated.Fechaingreso != null) personal.Fechaingreso = personalUpdated.Fechaingreso;
    _context.Personals.Update(personal);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/Personal/{cedula}
[HttpDelete("{cedula}")]
public async Task<IActionResult> DeletePersonal(string cedula)
{
    var personal = await _context.Personals.FindAsync(cedula);
    if (personal == null)
    {
        return NotFound($"No se encontró un personal con la cédula {cedula}.");
    }

    _context.Personals.Remove(personal);
    await _context.SaveChangesAsync();
    return NoContent();
}

    
}