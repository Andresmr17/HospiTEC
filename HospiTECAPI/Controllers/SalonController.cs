using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SalonController : ControllerBase
{
    private readonly HospitecContext _context;

    public SalonController(HospitecContext context)
    {

        _context = context;
    }
    // GET: api/Salon
    [HttpGet]
    public async Task<IActionResult> GetAllSalones()
    {
        var salones = await _context.Salons
            .Select(a => new {
                nombreSalon= a.Nombresalon,
                capacidadCamas= a.Capacidadcamas,
                tipoDeSalon= a.Tipodesalon,
                numeroDePiso= a.Numerodepiso
            })
            .ToListAsync();

        if (salones== null || !salones.Any())
            return NotFound();

        return Ok(salones);
    }
    // GET: api/Salon/{nombreSalon}
    [HttpGet("{nombreSalon}")]
    public async Task<IActionResult> GetActivoBynombreSalon(string nombreSalon)
    {
        var activo = await _context.Salons
            .Where(a => a.Nombresalon == nombreSalon)
            .Select(a => new {
                nombreSalon= a.Nombresalon,
                capacidadCamas= a.Capacidadcamas,
                tipoDeSalon= a.Tipodesalon,
                numeroDePiso= a.Numerodepiso
            })
            .FirstOrDefaultAsync();

        if (activo == null)
            return NotFound($"No se encontró un activo con la placa {nombreSalon}.");

        return Ok(activo);
    }
    // POST: api/Salon
    [HttpPost]
    public async Task<IActionResult> PostSalon([FromBody] Salon dto)
    {
        var nuevoSalon = new Salon
        {
            Nombresalon = dto.Nombresalon,
            Capacidadcamas = dto.Capacidadcamas,
            Tipodesalon = dto.Tipodesalon,
            Numerodepiso = dto.Numerodepiso
        };
        _context.Salons.Add(nuevoSalon);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetAllSalones", new { salon = nuevoSalon.Nombresalon }, nuevoSalon);

    }
    // PUT: api/Salon/{nombreSalon}
    [HttpPut("{nombreSalon}")]
    public async Task<IActionResult> UpdateActivo(string nombreSalon, [FromBody] Salon salonUpdated)
    {
        var salon = await _context.Salons.FindAsync(nombreSalon);
        if (salon == null)
        {
            return NotFound($"No se encontró un activo con la placa {nombreSalon}.");
        }
        if (salonUpdated.Nombresalon != null) salon.Nombresalon= salonUpdated.Nombresalon;
        if (salonUpdated.Capacidadcamas != null) salon.Capacidadcamas= salonUpdated.Capacidadcamas;
        if (salonUpdated.Tipodesalon != null) salon.Tipodesalon= salonUpdated.Tipodesalon;
        if (salonUpdated.Numerodepiso != null) salon.Numerodepiso= salonUpdated.Numerodepiso;
        _context.Salons.Update(salon);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    // DELETE: api/Salon/{nombreSalon}
    [HttpDelete("{nombreSalon}")]
    public async Task<IActionResult> DeleteSalon(string nombreSalon)
    {
        var salon = await _context.Salons.FindAsync(nombreSalon);
        if (salon == null)
        {
            return NotFound($"No se encontró un administrador con el correo {nombreSalon}.");
        }

        _context.Salons.Remove(salon);
        await _context.SaveChangesAsync();
        return NoContent();
    }






}