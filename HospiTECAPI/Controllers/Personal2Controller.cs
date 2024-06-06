using HospiTECAPI.Models;


using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace HospiTECAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Personal2Controller : ControllerBase
    {
        private readonly PersonalService _personalService;

        public Personal2Controller(PersonalService personalService)
        {
            _personalService = personalService;
        }
    
        //http get request para consumir el stored procedure de obtener información del personal y sus relacionados
        [HttpGet("{cedula}")]
        public async Task<IActionResult> GetPersonalAndRole(string cedula)
        {
            var personal = await _personalService.GetPersonalAndRoleAsync(cedula);

            if (personal == null)
            {
                return NotFound();
            }

            var result = new
            {
                Personal = personal,
                Telefonos = personal.PersonalTelefonos.Select(t => t.Telefono),
                Roles = personal.Rols.Select(r => r.Descripcion)
            };

            return Ok(result);
        }
        
    }
    
}
