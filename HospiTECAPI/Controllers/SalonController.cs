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
    
    
    
    
}