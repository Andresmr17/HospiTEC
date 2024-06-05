using HospiTECAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace HospiTECAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class EvaluacionesController:Controller
{
    private IEvaluacionCollection db = new EvaluacionesCollections();

    [HttpGet]
    public async Task<IActionResult> getallEvaluaciones()
    {
        return Ok(await db.getallEvaluaciones());
    }

    [HttpPost]
    public async Task<IActionResult> createEvaluacion([FromBody] Evaluaciones evaluaciones)
    {
        if (evaluaciones == null)
        {
            return BadRequest();
        }

        if (evaluaciones.nombreServicio == String.Empty)
        {
            ModelState.AddModelError("Name","no tiene un metodo asociado");
        }

        await db.insertEvaluacion(evaluaciones);
        return Created("created",true);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> updateEvaluacion([FromBody] Evaluaciones evaluaciones, string id)
    {
        if (evaluaciones == null)
        {
            return BadRequest();
        }

        if (evaluaciones.nombreServicio == String.Empty)
        {
            ModelState.AddModelError("Name","no tiene un metodo asociado");
        }

        evaluaciones.Id =new ObjectId(id);
        await db.updateEvaluacion(evaluaciones);
        return Created("created",true);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> deleteEvaluacion([FromBody] string id)
    {
        await db.deleteEvaluacion(id);
        return NoContent();//satisfactoria el delete
    }
    
}