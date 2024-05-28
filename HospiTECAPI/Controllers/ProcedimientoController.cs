using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProcedimientoController : ControllerBase
{
    private readonly HospitecContext _context;

    public ProcedimientoController(HospitecContext context)
    {
        _context = context;
    }

    // GET: api/Procedimiento
[HttpGet]
public async Task<IActionResult> GetAllProcedimientos()
{
    var procedimientos = await _context.Procedimientos
        .Select(p => new {
            idProcedimiento = p.Idproced,
            nombrePatologia = p.Nombrepatologia,
            procedimientoNombre = p.Procednombre,
            descripcion = p.Descripcion,
            duracionDias = p.Duraciondias
        })
        .ToListAsync();

    if (procedimientos == null || !procedimientos.Any())
        return NotFound();

    return Ok(procedimientos);
}

// GET: api/Procedimiento/{idProcedimiento}
[HttpGet("{idProcedimiento}")]
public async Task<IActionResult> GetProcedimiento(int idProcedimiento)
{
    var procedimiento = await _context.Procedimientos.FindAsync(idProcedimiento);

    if (procedimiento == null)
        return NotFound($"No se encontró un procedimiento con el id {idProcedimiento}.");

    return Ok(procedimiento);
}

// POST: api/Procedimiento
[HttpPost]
public async Task<IActionResult> PostProcedimiento([FromBody] Procedimiento dto)
{
    var nuevoProcedimiento = new Procedimiento
    {
        Nombrepatologia = dto.Nombrepatologia,
        Procednombre = dto.Procednombre,
        Descripcion = dto.Descripcion,
        Duraciondias = dto.Duraciondias
    };
    _context.Procedimientos.Add(nuevoProcedimiento);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetAllProcedimientos", new { idProcedimiento = nuevoProcedimiento.Idproced }, nuevoProcedimiento);
}

// PUT: api/Procedimiento/{idProcedimiento}
[HttpPut("{idProcedimiento}")]
public async Task<IActionResult> UpdateProcedimiento(int idProcedimiento, [FromBody] Procedimiento procedimientoUpdated)
{
    var procedimiento = await _context.Procedimientos.FindAsync(idProcedimiento);
    if (procedimiento == null)
    {
        return NotFound($"No se encontró un procedimiento con el id {idProcedimiento}.");
    }
    if (procedimientoUpdated.Nombrepatologia != null) procedimiento.Nombrepatologia = procedimientoUpdated.Nombrepatologia;
    if (procedimientoUpdated.Procednombre != null) procedimiento.Procednombre = procedimientoUpdated.Procednombre;
    if (procedimientoUpdated.Descripcion != null) procedimiento.Descripcion = procedimientoUpdated.Descripcion;
    if (procedimientoUpdated.Duraciondias != null) procedimiento.Duraciondias = procedimientoUpdated.Duraciondias;
    _context.Procedimientos.Update(procedimiento);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/Procedimiento/{idProcedimiento}
[HttpDelete("{idProcedimiento}")]
public async Task<IActionResult> DeleteProcedimiento(int idProcedimiento)
{
    var procedimiento = await _context.Procedimientos.FindAsync(idProcedimiento);
    if (procedimiento == null)
    {
        return NotFound($"No se encontró un procedimiento con el id {idProcedimiento}.");
    }

    _context.Procedimientos.Remove(procedimiento);
    await _context.SaveChangesAsync();
    return NoContent();
}

}
