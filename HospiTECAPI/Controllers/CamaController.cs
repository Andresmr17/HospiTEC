using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CamaController : ControllerBase
{
    private readonly HospitecContext _context;

    public CamaController(HospitecContext context)
    {
        _context = context;
    }
    

    // GET: api/Cama
    [HttpGet]
    public async Task<IActionResult> GetAllCamas()
    {
        var camas = await _context.Camas
            .Select(c => new {
                idCama = c.Idcama,
                nombreSalon = c.Nombresalon,
                estadoUCI = c.Estadouci
            })
            .ToListAsync();

        if (camas == null || !camas.Any())
            return NotFound();

        return Ok(camas);
    }

// GET: api/Cama/{idCama}
    [HttpGet("{idCama}")]
    public async Task<IActionResult> GetCama(int idCama)
    {
        var cama = await _context.Camas.FindAsync(idCama);

        if (cama == null)
            return NotFound($"No se encontró una cama con el id {idCama}.");

        return Ok(cama);
    }

// POST: api/Cama
    [HttpPost]
    public async Task<IActionResult> PostCama([FromBody] Cama dto)
    {
        var nuevaCama = new Cama
        {
            Nombresalon = dto.Nombresalon,
            Estadouci = dto.Estadouci
        };
        _context.Camas.Add(nuevaCama);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetAllCamas", new { idCama = nuevaCama.Idcama }, nuevaCama);
    }

// PUT: api/Cama/{idCama}
    [HttpPut("{idCama}")]
    public async Task<IActionResult> UpdateCama(int idCama, [FromBody] Cama camaUpdated)
    {
        var cama = await _context.Camas.FindAsync(idCama);
        if (cama == null)
        {
            return NotFound($"No se encontró una cama con el id {idCama}.");
        }
        if (camaUpdated.Nombresalon != null) cama.Nombresalon = camaUpdated.Nombresalon;
        if (camaUpdated.Estadouci != null) cama.Estadouci = camaUpdated.Estadouci;
        _context.Camas.Update(cama);
        await _context.SaveChangesAsync();
        return NoContent();
    }

// DELETE: api/Cama/{idCama}
    [HttpDelete("{idCama}")]
    public async Task<IActionResult> DeleteCama(int idCama)
    {
        var cama = await _context.Camas.FindAsync(idCama);
        if (cama == null)
        {
            return NotFound($"No se encontró una cama con el id {idCama}.");
        }

        _context.Camas.Remove(cama);
        await _context.SaveChangesAsync();
        return NoContent();
    }
   //sp de obtener la cama con los equipos asociados 
   [HttpGet("sp")]
   public async Task<IActionResult> GetCamaYEquipos()
   {
       var result = await _context.GetCamaYEquiposAsync();

       if (result == null || !result.Any())
       {
           return NotFound();
       }

       return Ok(result);
   }


}
