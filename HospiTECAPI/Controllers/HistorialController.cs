using HospiTECAPI.Models;
using HospiTECAPI.ModelsDTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HistorialController : ControllerBase
{
    private readonly HospitecContext _context;

    public HistorialController(HospitecContext context)
    {
        _context = context;
    }
    
    // GET: api/Historial
[HttpGet]
public async Task<IActionResult> GetAllHistoriales()
{
    var historiales = await _context.Historials
        .Select(h => new {
            idHistorial = h.Idhistorial,
            idProced = h.Idproced,
            idTratamiento = h.Idtratamiento,
            pacienteCedula = h.Pacientecedula,
            fechaProcedimiento = h.Fechaprocedimiento
        })
        .ToListAsync();

    if (historiales == null || !historiales.Any())
        return NotFound();

    return Ok(historiales);
}

// GET: api/Historial/{idHistorial}
[HttpGet("{idHistorial}")]
public async Task<IActionResult> GetHistorial(int idHistorial)
{
    var historial = await _context.Historials.FindAsync(idHistorial);

    if (historial == null)
        return NotFound($"No se encontró un historial con el id {idHistorial}.");

    return Ok(historial);
}

// POST: api/Historial
[HttpPost]
public async Task<IActionResult> PostPaciente([FromBody] HistorialDTO dto)
{
    if (!DateTime.TryParse(dto.Fechaprocedimiento, out var fechaProcedimientoParsed))
    {
        return BadRequest("Fecha inválida.");
    }
    

    var nuevoHistorial = new Historial
    {
        Idproced = dto.Idproced,
        Idtratamiento = dto.Idtratamiento,
        Pacientecedula = dto.Pacientecedula,
        Fechaprocedimiento = DateOnly.FromDateTime(fechaProcedimientoParsed)
    };
    _context.Historials.Add(nuevoHistorial);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetALLHistoriales", new { id = nuevoHistorial.Idhistorial }, nuevoHistorial);
}

// PUT: api/Historial/{idHistorial}
[HttpPut("{idHistorial}")]
public async Task<IActionResult> UpdateHistorial(int idHistorial, [FromBody] Historial historialUpdated)
{
    var historial = await _context.Historials.FindAsync(idHistorial);
    if (historial == null)
    {
        return NotFound($"No se encontró un historial con el id {idHistorial}.");
    }
    if (historialUpdated.Idproced != null) historial.Idproced = historialUpdated.Idproced;
    if (historialUpdated.Idtratamiento != null) historial.Idtratamiento = historialUpdated.Idtratamiento;
    if (historialUpdated.Pacientecedula != null) historial.Pacientecedula = historialUpdated.Pacientecedula;
    if (historialUpdated.Fechaprocedimiento != null) historial.Fechaprocedimiento = historialUpdated.Fechaprocedimiento;
    _context.Historials.Update(historial);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/Historial/{idHistorial}
[HttpDelete("{idHistorial}")]
public async Task<IActionResult> DeleteHistorial(int idHistorial)
{
    var historial = await _context.Historials.FindAsync(idHistorial);
    if (historial == null)
    {
        return NotFound($"No se encontró un historial con el id {idHistorial}.");
    }

    _context.Historials.Remove(historial);
    await _context.SaveChangesAsync();
    return NoContent();
}

[HttpGet("sp/{pacienteCedula}")]
public async Task<IActionResult> GetHistorialByPacienteCedula(string pacienteCedula)
{
    var results = await _context.GetHistorialByPacienteCedulaAsync(pacienteCedula);

    if (results == null || results.Count == 0)
    {
        return NotFound($"No se encontró historial para el paciente con cédula {pacienteCedula}.");
    }

    return Ok(results);
}

    
}