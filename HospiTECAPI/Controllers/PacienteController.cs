using System.Globalization;
using HospiTECAPI.Models;
using HospiTECAPI.ModelsDTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using OfficeOpenXml;


namespace HospiTECAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PacienteController : ControllerBase
{
    private readonly HospitecContext _context;

    public PacienteController(HospitecContext context)
    {
        _context = context;
    }
    
    // GET: api/Paciente
[HttpGet]
public async Task<IActionResult> GetAllPacientes()
{
    var pacientes = await _context.Pacientes
        .Select(p => new {
            cedula = p.Cedula,
            direccion = p.Direccion,
            fechaNacimiento = p.Fechanacimiento,
            nombre = p.Nombre,
            apellido1 = p.Apellido1,
            apellido2 = p.Apellido2
        })
        .ToListAsync();

    if (pacientes == null || !pacientes.Any())
        return NotFound();

    return Ok(pacientes);
}

// GET: api/Paciente/{cedula}
[HttpGet("{cedula}")]
public async Task<IActionResult> GetPaciente(string cedula)
{
    var paciente = await _context.Pacientes.FindAsync(cedula);

    if (paciente == null)
        return NotFound($"No se encontró un paciente con la cédula {cedula}.");

    return Ok(paciente);
}


// POST: api/Paciente/login
[HttpPost("login")]
public async Task<IActionResult> PostPacienteLogin([FromBody] PacienteLogin dto)
{
    var paciente = await _context.Pacientes.FirstOrDefaultAsync(p => p.Cedula == dto.Cedula);
                         

    if (paciente == null)
    {
        return Unauthorized("Cédula o contraseña incorrecta.");
    }

    // Aquí debes verificar la contraseña. Este ejemplo asume que la contraseña está guardada en texto plano,
    // lo cual no es recomendable. Deberías almacenar contraseñas de forma segura utilizando un hash.
    if (paciente.Nombre != dto.Nombre)
    {
        return Unauthorized("Cédula o contraseña incorrecta.");
    }

    return Ok();
}
// POST: api/Paciente
[HttpPost]
public async Task<IActionResult> PostPaciente([FromBody] PacienteDTO dto)
{
    if (!DateTime.TryParse(dto.Fechanacimiento, out var fechaNacimientoParsed))
    {
        return BadRequest("Fecha inválida.");
    }
    

    var nuevoPaciente = new Paciente
    {
        Cedula = dto.Cedula,
        Direccion = dto.Direccion,
        Fechanacimiento = DateOnly.FromDateTime(fechaNacimientoParsed),
        Nombre = dto.Nombre,
        Apellido1 = dto.Apellido1,
        Apellido2 = dto.Apellido2
    };
    _context.Pacientes.Add(nuevoPaciente);
    await _context.SaveChangesAsync();
    return CreatedAtAction("GetALLPacientes", new { id = nuevoPaciente.Cedula }, nuevoPaciente);
}

// PUT: api/Paciente/{cedula}
[HttpPut("{cedula}")]
public async Task<IActionResult> UpdatePaciente(string cedula, [FromBody] Paciente pacienteUpdated)
{
    var paciente = await _context.Pacientes.FindAsync(cedula);
    if (paciente == null)
    {
        return NotFound($"No se encontró un paciente con la cédula {cedula}.");
    }
    if (pacienteUpdated.Direccion != null) paciente.Direccion = pacienteUpdated.Direccion;
    if (pacienteUpdated.Fechanacimiento != null) paciente.Fechanacimiento = pacienteUpdated.Fechanacimiento;
    if (pacienteUpdated.Nombre != null) paciente.Nombre = pacienteUpdated.Nombre;
    if (pacienteUpdated.Apellido1 != null) paciente.Apellido1 = pacienteUpdated.Apellido1;
    if (pacienteUpdated.Apellido2 != null) paciente.Apellido2 = pacienteUpdated.Apellido2;
    _context.Pacientes.Update(paciente);
    await _context.SaveChangesAsync();
    return NoContent();
}

// DELETE: api/Paciente/{cedula}
[HttpDelete("{cedula}")]
public async Task<IActionResult> DeletePaciente(string cedula)
{
    var paciente = await _context.Pacientes.FindAsync(cedula);
    if (paciente == null)
    {
        return NotFound($"No se encontró un paciente con la cédula {cedula}.");
    }

    _context.Pacientes.Remove(paciente);
    await _context.SaveChangesAsync();
    return NoContent();
}


    [HttpPost]
        [Route("cargar")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CargarPacientes(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No se ha enviado ningún archivo.");
            }

            // Verificar si el archivo no está vacío
            if (file.Length == 0)
            {
                return BadRequest("El archivo está vacío.");
            }

            // mensaje de registro para verificar el archivo recibido
            Console.WriteLine($"Archivo recibido: {file.FileName}, Tamaño: {file.Length} bytes");
            try
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    stream.Position = 0;

                    using (var package = new ExcelPackage(stream))
                    {
                        if (package.Workbook.Worksheets.Count == 0)
                        {
                            return BadRequest("El archivo no contiene hojas.");
                        }

                        var worksheet = package.Workbook.Worksheets.FirstOrDefault();
                        if (worksheet == null)
                        {
                            return BadRequest("No se pudo obtener la primera hoja del archivo.");
                        }

                        int rowCount = worksheet.Dimension?.Rows ?? 0;
                        if (rowCount == 0)
                        {
                            return BadRequest("La hoja no contiene datos.");
                        }

                        var headers = new List<string> {
                            worksheet.Cells[1, 1].Text,
                            worksheet.Cells[1, 2].Text,
                            worksheet.Cells[1, 3].Text,
                            worksheet.Cells[1, 4].Text,
                            worksheet.Cells[1, 5].Text,
                            worksheet.Cells[1, 6].Text,
                            worksheet.Cells[1, 7].Text,
                            worksheet.Cells[1, 8].Text,
                            worksheet.Cells[1, 9].Text
                        };

                        if (!headers.SequenceEqual(new List<string> { "Nombre", "Apellido", "Cedula", "FechaNacimiento", "Direccion", "Telefono1", "Telefono2", "Correo", "Usuario", "PWD" }))
                        {
                            return BadRequest("Los encabezados del archivo no son correctos.");
                        }

                        for (int row = 2; row <= rowCount; row++)
                        {
                            var paciente = new Paciente
                            {
                                Nombre = worksheet.Cells[row, 1].Text,
                                Apellido1 = worksheet.Cells[row, 2].Text.Split(' ')[0],
                                Apellido2 = worksheet.Cells[row, 2].Text.Split(' ').Length > 1 ? worksheet.Cells[row, 2].Text.Split(' ')[1] : "",
                                Cedula = worksheet.Cells[row, 3].Text,
                                Direccion = worksheet.Cells[row, 5].Text,
                                Fechanacimiento = DateOnly.FromDateTime(DateTime.Parse(worksheet.Cells[row, 4].Text))
                            };

                            var telefono1 = new PacienteTelefono
                            {
                                Pacientecedula = paciente.Cedula,
                                Telefono = worksheet.Cells[row, 6].Text.Replace(" ", "").Replace("-", "")
                            };

                            var telefono2 = new PacienteTelefono
                            {
                                Pacientecedula = paciente.Cedula,
                                Telefono = worksheet.Cells[row, 7].Text.Replace(" ", "").Replace("-", "")
                            };

                            _context.Pacientes.Add(paciente);
                            _context.PacienteTelefonos.AddRange(new[] { telefono1, telefono2 });
                        }

                        await _context.SaveChangesAsync();
                    }
                }

                return Ok("Datos cargados exitosamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al procesar el archivo: {ex.Message}");
            }
        }
        
    


    }