using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PatologiumController : ControllerBase
{
    private readonly HospitecContext _context;

    public PatologiumController(HospitecContext context)
    {
        _context = context;
    }

    // GET: api/Patologium
[HttpGet]
public async Task<IActionResult> GetAllPatologias()
{
    var patologias = await _context.Patologia
        .Select(p => new {
            nombrePatologia = p.Nombrepatologia,
            descripcion = p.Descripcion
        })
        .ToListAsync();

    if (patologias == null || !patologias.Any())
        return NotFound();

    return Ok(patologias);
}

// GET: api/Patologium/{nombrePatologia}
[HttpGet("{nombrePatologia}")]
public async Task<IActionResult> GetPatologia(string nombrePatologia)
{
    var patologia = await _context.Patologia.FindAsync(nombrePatologia);

    if (patologia == null)
        return NotFound($"No se encontró una patología con el nombre {nombrePatologia}.");

    return Ok(patologia);
}

// POST: api/Patologium
[HttpPost]
public async Task<IActionResult> PostPatologia([FromBody] Patologium dto)
{
    var nuevaPatologia = new Patologium
    {
        Nombrepatologia = dto.Nombrepatologia,
        Descripcion = dto.Descripcion
    };
    _context.Patologia.Add(nuevaPatologia);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetAllPatologias", new { nombrePatologia = nuevaPatologia.Nombrepatologia }, nuevaPatologia);
}

// PUT: api/Patologium/{nombrePatologia}
[HttpPut("{nombrePatologia}")]
public async Task<IActionResult> UpdatePatologia(string nombrePatologia, [FromBody] Patologium patologiaUpdated)
{
    var patologia = await _context.Patologia.FindAsync(nombrePatologia);
    if (patologia == null)
    {
        return NotFound($"No se encontró una patología con el nombre {nombrePatologia}.");
    }
    if (patologiaUpdated.Descripcion != null) patologia.Descripcion = patologiaUpdated.Descripcion;
    _context.Patologia.Update(patologia);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/Patologium/{nombrePatologia}
[HttpDelete("{nombrePatologia}")]
public async Task<IActionResult> DeletePatologia(string nombrePatologia)
{
    var patologia = await _context.Patologia.FindAsync(nombrePatologia);
    if (patologia == null)
    {
        return NotFound($"No se encontró una patología con el nombre {nombrePatologia}.");
    }

    _context.Patologia.Remove(patologia);
    await _context.SaveChangesAsync();
    return NoContent();
}

}
