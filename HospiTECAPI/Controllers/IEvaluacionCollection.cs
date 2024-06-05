using HospiTECAPI.Models;

namespace HospiTECAPI.Controllers;

public interface IEvaluacionCollection
{
    Task insertEvaluacion(Evaluaciones evaluaciones);
    Task updateEvaluacion(Evaluaciones evaluaciones);
    Task deleteEvaluacion(string id);
    Task<List<Evaluaciones>> getallEvaluaciones();
    //Task<Evaluaciones> getallbyID(string id);
}