using System.Globalization;
using HospiTECAPI.Models;
using HospiTECAPI.ModelsDTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonalController : ControllerBase
{
    private readonly HospitecContext _context;

    public PersonalController(HospitecContext context)
    {
        _context = context;
    }
    // GET: api/Personal
[HttpGet]
public async Task<IActionResult> GetAllPersonal()
{
    var personal = await _context.Personals
        .Select(p => new {
            cedula = p.Cedula,
            fechaNacimiento = p.Fechanacimiento,
            direccion = p.Direccion,
            nombre = p.Nombre,
            apellido1 = p.Apellido1,
            apellido2 = p.Apellido2,
            fechaIngreso = p.Fechaingreso
        })
        .ToListAsync();

    if (personal == null || !personal.Any())
        return NotFound();

    return Ok(personal);
}

// GET: api/Personal/{cedula}
[HttpGet("{cedula}")]
public async Task<IActionResult> GetPersonal(string cedula)
{
    var personal = await _context.Personals.FindAsync(cedula);

    if (personal == null)
        return NotFound($"No se encontró un personal con la cédula {cedula}.");

    return Ok(personal);
}

// POST: api/Personal
[HttpPost]
public async Task<IActionResult> PostPersonal([FromBody] PersonalDTO dto)
{
    if (!DateTime.TryParse(dto.Fechanacimiento, out var fechanacimientoParsed))
    {
        return BadRequest("Fecha inválida.");
    }
    if (!DateTime.TryParse(dto.Fechaingreso, out var fechaingresoParsed))
    {
        return BadRequest("Fecha inválida.");
    }
    

    var nuevoPersonal = new Personal
    {
       Cedula = dto.Cedula,
       Fechanacimiento = DateOnly.FromDateTime(fechanacimientoParsed),
       Direccion = dto.Direccion,
       Nombre = dto.Nombre,
       Apellido1 = dto.Apellido1,
       Apellido2 = dto.Apellido2,
       Fechaingreso = DateOnly.FromDateTime(fechaingresoParsed)
       
    };
    _context.Personals.Add(nuevoPersonal);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetAllPersonal", new { id = nuevoPersonal.Cedula}, nuevoPersonal);
}

// PUT: api/Personal/{cedula}
[HttpPut("{cedula}")]
public async Task<IActionResult> UpdatePersonal(string cedula, [FromBody] PersonalDTO personalUpdated)
{
    var personal = await _context.Personals.FindAsync(cedula);
    if (personal == null)
    {
        return NotFound($"No se encontró un personal con la cédula {cedula}.");
    }
    
    if (personalUpdated.Direccion != null) personal.Direccion = personalUpdated.Direccion;
    if (personalUpdated.Nombre != null) personal.Nombre = personalUpdated.Nombre;
    if (personalUpdated.Apellido1 != null) personal.Apellido1 = personalUpdated.Apellido1;
    if (personalUpdated.Apellido2 != null) personal.Apellido2 = personalUpdated.Apellido2;
    _context.Personals.Update(personal);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/Personal/{cedula}
[HttpDelete("{cedula}")]
public async Task<IActionResult> DeletePersonal(string cedula)
{
    var personal = await _context.Personals.FindAsync(cedula);
    if (personal == null)
    {
        return NotFound($"No se encontró un personal con la cédula {cedula}.");
    }

    _context.Personals.Remove(personal);
    await _context.SaveChangesAsync();
    return NoContent();
}

[HttpPost("sp")]
public async Task<ActionResult> PostPersonal(PersonalRequest dto)
{
    DateTime fechaNacimiento;
    if (!DateTime.TryParseExact(dto.FechaNacimiento, "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out fechaNacimiento))
    {
        return BadRequest("FechaProcedimiento debe estar en el formato 'año-mes-dia'.");
    }
    
    DateTime fechaIngreso;
    if (!DateTime.TryParseExact(dto.FechaIngreso, "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out fechaIngreso))
    {
        return BadRequest("FechaProcedimiento debe estar en el formato 'año-mes-dia'.");
    }

    var cedulaParam = new NpgsqlParameter("cedula_personal", NpgsqlTypes.NpgsqlDbType.Varchar)
    {
        Value = dto.Cedula
    };
    var fechaNacimientoParam = new NpgsqlParameter("fechanacimiento_personal", NpgsqlTypes.NpgsqlDbType.Timestamp)
    {
        Value = fechaNacimiento
    };
    var direccionParam = new NpgsqlParameter("direccion_personal", NpgsqlTypes.NpgsqlDbType.Varchar)
    {
        Value = dto.Direccion
    };
    var nombreParam = new NpgsqlParameter("nombre_personal", NpgsqlTypes.NpgsqlDbType.Varchar)
    {
        Value = dto.Nombre
    };
    var apellido1Param = new NpgsqlParameter("apellido1_personal", NpgsqlTypes.NpgsqlDbType.Varchar)
    {
        Value = dto.Apellido1
    };
    var apellido2Param = new NpgsqlParameter("apellido2_personal", NpgsqlTypes.NpgsqlDbType.Varchar)
    {
        Value = dto.Apellido2
    };
    var fechaIngresoParam = new NpgsqlParameter("fechaingreso_personal", NpgsqlTypes.NpgsqlDbType.Timestamp)
    {
        Value = fechaIngreso
    };
    var telefono1Param = new NpgsqlParameter("telefono1", NpgsqlTypes.NpgsqlDbType.Varchar)
    {
        Value = dto.Telefono1
    };
    var telefono2Param = new NpgsqlParameter("telefono2", NpgsqlTypes.NpgsqlDbType.Varchar)
    {
        Value = dto.Telefono2 
    };
    var rolParam = new NpgsqlParameter("rol_descripcion", NpgsqlTypes.NpgsqlDbType.Varchar)
    {
        Value = dto.Rol
    };

    await _context.Database.ExecuteSqlRawAsync(
        "CALL insertar_paciente(@cedula_personal, @nombre_personal, @apellido1_personal, @apellido2_personal, @fechanacimiento_personal, @direccion_personal, @fechaingreso_personal, @telefono1, @telefono2, @rol_descripcion)",
        cedulaParam, nombreParam, apellido1Param, apellido2Param, fechaNacimientoParam, direccionParam, fechaIngresoParam, telefono1Param, telefono2Param, rolParam
    );

    return Ok();
}

[HttpPut("sp/{cedula}")]
public async Task<IActionResult> PutPersonal(string cedula, [FromBody] PersonalUpdateRequest dto)
{
    var query = @"
        CALL actualizar_paciente(
            @cedula_personal,
            @nombre_personal,
            @apellido1_personal,
            @apellido2_personal,
            @fecha_nacimiento,
            @direccion_personal,
            @fecha_ingreso,
            @telefono1,
            @telefono2,
            @rol_descripcion
        )";

    var parameters = new List<NpgsqlParameter>
    {
        new NpgsqlParameter("@cedula_personal", cedula),
        new NpgsqlParameter("@nombre_personal", dto.Nombre ?? (object)DBNull.Value),
        new NpgsqlParameter("@apellido1_personal", dto.Apellido1 ?? (object)DBNull.Value),
        new NpgsqlParameter("@apellido2_personal", dto.Apellido2 ?? (object)DBNull.Value),
        new NpgsqlParameter("@fecha_nacimiento", string.IsNullOrEmpty(dto.FechaNacimiento) ? (object)DBNull.Value : DateTime.Parse(dto.FechaNacimiento)),
        new NpgsqlParameter("@direccion_personal", dto.Direccion ?? (object)DBNull.Value),
        new NpgsqlParameter("@fecha_ingreso", string.IsNullOrEmpty(dto.FechaIngreso) ? (object)DBNull.Value : DateTime.Parse(dto.FechaIngreso)),
        new NpgsqlParameter("@telefono1", dto.Telefono1 ?? (object)DBNull.Value),
        new NpgsqlParameter("@telefono2", dto.Telefono2 ?? (object)DBNull.Value),
        new NpgsqlParameter("@rol_descripcion", dto.Rol ?? (object)DBNull.Value)
    };

    await _context.Database.ExecuteSqlRawAsync(query, parameters.ToArray());

    return NoContent();
}











    
}