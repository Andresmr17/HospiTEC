using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace HospiTECAPI.Models
{
    public class PersonalService
    {
        private readonly HospitecContext _context;

        public PersonalService(HospitecContext context)
        {
            _context = context;
        }

        
        //mnetodo para consumir stored procedure
        public async Task<Personal> GetPersonalAndRoleAsync(string cedula)
        {
            return await _context.Personals
                .Include(p => p.Rols)
                .Include(p => p.PersonalTelefonos)
                .FirstOrDefaultAsync(p => p.Cedula == cedula);
        }

    }
}

