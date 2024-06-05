using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Testcontextweas.Models;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PalotogiasPresenteController: ControllerBase
{
    private readonly HospitecContext _context;

    public PalotogiasPresenteController(HospitecContext context)
    {
        _context = context;
    }
    // GET: api/Cama
    [HttpGet]
    public async Task<IActionResult> GetAllPatologiasPresentes()
    {
        var patologiaspresentes = await _context.Patologiaspresentes
            .Select(c => new {
                Idpatpresente=c.Idpatpresente,
                Pacientecedula=c.Pacientecedula,
                Nombrepatologia=c.Nombrepatologia,
                Descripciontratamiento=c.Descripciontratamiento
            })
            .ToListAsync();

        if (patologiaspresentes == null || !patologiaspresentes.Any())
            return NotFound();

        return Ok(patologiaspresentes);
    }
    
    // POST: api/Cama
    [HttpPost]
    public async Task<IActionResult> PostPatologiaPresente([FromBody] Patologiaspresente dto)
    {
        var nuevaPatologiaPresente = new Patologiaspresente()
        {
            Pacientecedula=dto.Pacientecedula,
            Nombrepatologia=dto.Nombrepatologia,
            Descripciontratamiento=dto.Descripciontratamiento
        };
        _context.Patologiaspresentes.Add(nuevaPatologiaPresente);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetAllPatologiasPresentes", new { Idpatpresente = nuevaPatologiaPresente.Idpatpresente }, nuevaPatologiaPresente);
    }
    }