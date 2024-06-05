using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HospiTECAPI.Models;

public class Evaluaciones
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string nombreServicio { get; set; }
    public int aseo { get; set; }
    public int trato { get; set; }
    public int puntualidad { get; set; }
}