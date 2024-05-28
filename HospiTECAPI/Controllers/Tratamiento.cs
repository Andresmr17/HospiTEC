using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TratamientoController : ControllerBase
{
    private readonly HospitecContext _context;

    public TratamientoController(HospitecContext context)
    {
        _context = context;
    }

    // GET: api/Tratamiento
    [HttpGet]
    public async Task<IActionResult> GetAllTratamientos()
    {
        var tratamientos = await _context.Tratamientos
            .Select(t => new {
                idTratamiento = t.Idtratamiento,
                nombrePatologia = t.Nombrepatologia,
                nombreTratamiento = t.Nombretratamiento,
                descripcion = t.Descripcion
            })
            .ToListAsync();

        if (tratamientos == null || !tratamientos.Any())
            return NotFound();

        return Ok(tratamientos);
    }

// GET: api/Tratamiento/{idTratamiento}
    [HttpGet("{idTratamiento}")]
    public async Task<IActionResult> GetTratamiento(int idTratamiento)
    {
        var tratamiento = await _context.Tratamientos.FindAsync(idTratamiento);

        if (tratamiento == null)
            return NotFound($"No se encontró un tratamiento con el id {idTratamiento}.");

        return Ok(tratamiento);
    }

// POST: api/Tratamiento
    [HttpPost]
    public async Task<IActionResult> PostTratamiento([FromBody] Tratamiento dto)
    {
        var nuevoTratamiento = new Tratamiento
        {
            Nombrepatologia = dto.Nombrepatologia,
            Nombretratamiento = dto.Nombretratamiento,
            Descripcion = dto.Descripcion
        };
        _context.Tratamientos.Add(nuevoTratamiento);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetAllTratamientos", new { idTratamiento = nuevoTratamiento.Idtratamiento }, nuevoTratamiento);
    }

// PUT: api/Tratamiento/{idTratamiento}
    [HttpPut("{idTratamiento}")]
    public async Task<IActionResult> UpdateTratamiento(int idTratamiento, [FromBody] Tratamiento tratamientoUpdated)
    {
        var tratamiento = await _context.Tratamientos.FindAsync(idTratamiento);
        if (tratamiento == null)
        {
            return NotFound($"No se encontró un tratamiento con el id {idTratamiento}.");
        }
        if (tratamientoUpdated.Nombrepatologia != null) tratamiento.Nombrepatologia = tratamientoUpdated.Nombrepatologia;
        if (tratamientoUpdated.Nombretratamiento != null) tratamiento.Nombretratamiento = tratamientoUpdated.Nombretratamiento;
        if (tratamientoUpdated.Descripcion != null) tratamiento.Descripcion = tratamientoUpdated.Descripcion;
        _context.Tratamientos.Update(tratamiento);
        await _context.SaveChangesAsync();
        return NoContent();
    }

// DELETE: api/Tratamiento/{idTratamiento}
    [HttpDelete("{idTratamiento}")]
    public async Task<IActionResult> DeleteTratamiento(int idTratamiento)
    {
        var tratamiento = await _context.Tratamientos.FindAsync(idTratamiento);
        if (tratamiento == null)
        {
            return NotFound($"No se encontró un tratamiento con el id {idTratamiento}.");
        }

        _context.Tratamientos.Remove(tratamiento);
        await _context.SaveChangesAsync();
        return NoContent();
    }

}
