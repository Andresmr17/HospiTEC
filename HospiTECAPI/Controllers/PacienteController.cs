using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PacienteController : ControllerBase
{
    private readonly HospitecContext _context;

    public PacienteController(HospitecContext context)
    {
        _context = context;
    }
    
    // GET: api/Paciente
[HttpGet]
public async Task<IActionResult> GetAllPacientes()
{
    var pacientes = await _context.Pacientes
        .Select(p => new {
            cedula = p.Cedula,
            direccion = p.Direccion,
            fechaNacimiento = p.Fechanacimiento,
            nombre = p.Nombre,
            apellido1 = p.Apellido1,
            apellido2 = p.Apellido2
        })
        .ToListAsync();

    if (pacientes == null || !pacientes.Any())
        return NotFound();

    return Ok(pacientes);
}

// GET: api/Paciente/{cedula}
[HttpGet("{cedula}")]
public async Task<IActionResult> GetPaciente(string cedula)
{
    var paciente = await _context.Pacientes.FindAsync(cedula);

    if (paciente == null)
        return NotFound($"No se encontró un paciente con la cédula {cedula}.");

    return Ok(paciente);
}

// POST: api/Paciente
[HttpPost]
public async Task<IActionResult> PostPaciente([FromBody] Paciente dto)
{
    var nuevoPaciente = new Paciente
    {
        Cedula = dto.Cedula,
        Direccion = dto.Direccion,
        Fechanacimiento = dto.Fechanacimiento,
        Nombre = dto.Nombre,
        Apellido1 = dto.Apellido1,
        Apellido2 = dto.Apellido2
    };
    _context.Pacientes.Add(nuevoPaciente);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetAllPacientes", new { cedula = nuevoPaciente.Cedula }, nuevoPaciente);
}

// PUT: api/Paciente/{cedula}
[HttpPut("{cedula}")]
public async Task<IActionResult> UpdatePaciente(string cedula, [FromBody] Paciente pacienteUpdated)
{
    var paciente = await _context.Pacientes.FindAsync(cedula);
    if (paciente == null)
    {
        return NotFound($"No se encontró un paciente con la cédula {cedula}.");
    }
    if (pacienteUpdated.Direccion != null) paciente.Direccion = pacienteUpdated.Direccion;
    if (pacienteUpdated.Fechanacimiento != null) paciente.Fechanacimiento = pacienteUpdated.Fechanacimiento;
    if (pacienteUpdated.Nombre != null) paciente.Nombre = pacienteUpdated.Nombre;
    if (pacienteUpdated.Apellido1 != null) paciente.Apellido1 = pacienteUpdated.Apellido1;
    if (pacienteUpdated.Apellido2 != null) paciente.Apellido2 = pacienteUpdated.Apellido2;
    _context.Pacientes.Update(paciente);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/Paciente/{cedula}
[HttpDelete("{cedula}")]
public async Task<IActionResult> DeletePaciente(string cedula)
{
    var paciente = await _context.Pacientes.FindAsync(cedula);
    if (paciente == null)
    {
        return NotFound($"No se encontró un paciente con la cédula {cedula}.");
    }

    _context.Pacientes.Remove(paciente);
    await _context.SaveChangesAsync();
    return NoContent();
}

    
}