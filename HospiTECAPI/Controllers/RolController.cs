using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RolController : ControllerBase
{
    private readonly HospitecContext _context;

    public RolController(HospitecContext context)
    {
        _context = context;
    }

    // GET: api/Rol
    [HttpGet]
    public async Task<IActionResult> GetAllRoles()
    {
        var roles = await _context.Rols
            .Select(r => new {
                idRol = r.Idrol,
                personalCedula = r.Personalcedula,
                descripcion = r.Descripcion
            })
            .ToListAsync();

        if (roles == null || !roles.Any())
            return NotFound();

        return Ok(roles);
    }

// GET: api/Rol/{idRol}
    [HttpGet("{idRol}")]
    public async Task<IActionResult> GetRol(int idRol)
    {
        var rol = await _context.Rols.FindAsync(idRol);

        if (rol == null)
            return NotFound($"No se encontró un rol con el id {idRol}.");

        return Ok(rol);
    }

// POST: api/Rol
    [HttpPost]
    public async Task<IActionResult> PostRol([FromBody] Rol dto)
    {
        var nuevoRol = new Rol
        {
            Personalcedula = dto.Personalcedula,
            Descripcion = dto.Descripcion
        };
        _context.Rols.Add(nuevoRol);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetAllRoles", new { idRol = nuevoRol.Idrol }, nuevoRol);
    }

// PUT: api/Rol/{idRol}
    [HttpPut("{idRol}")]
    public async Task<IActionResult> UpdateRol(int idRol, [FromBody] Rol rolUpdated)
    {
        var rol = await _context.Rols.FindAsync(idRol);
        if (rol == null)
        {
            return NotFound($"No se encontró un rol con el id {idRol}.");
        }
        if (rolUpdated.Personalcedula != null) rol.Personalcedula = rolUpdated.Personalcedula;
        if (rolUpdated.Descripcion != null) rol.Descripcion = rolUpdated.Descripcion;
        _context.Rols.Update(rol);
        await _context.SaveChangesAsync();
        return NoContent();
    }

// DELETE: api/Rol/{idRol}
    [HttpDelete("{idRol}")]
    public async Task<IActionResult> DeleteRol(int idRol)
    {
        var rol = await _context.Rols.FindAsync(idRol);
        if (rol == null)
        {
            return NotFound($"No se encontró un rol con el id {idRol}.");
        }

        _context.Rols.Remove(rol);
        await _context.SaveChangesAsync();
        return NoContent();
    }

}
