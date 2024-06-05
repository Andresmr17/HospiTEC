using HospiTECAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace HospiTECAPI.Controllers;

public class EvaluacionesCollections : IEvaluacionCollection
{
    internal MongoContext _database = new MongoContext();
    private IMongoCollection<Evaluaciones> Collection;

    public EvaluacionesCollections()
    {
        Collection = _database.getDb().GetCollection<Evaluaciones>("Evaluaciones");
    }
    public async Task insertEvaluacion(Evaluaciones evaluaciones)
    {
        await Collection.InsertOneAsync(evaluaciones);
    }

    public async Task updateEvaluacion(Evaluaciones evaluaciones)
    {
        var filter = Builders<Evaluaciones>.Filter.Eq(s => s.Id, evaluaciones.Id);
        await Collection.ReplaceOneAsync(filter, evaluaciones);//remplaza segun mi filtro mi nueva estructura.
    }

    public async Task deleteEvaluacion(string id)
    {
        //filtro que iguala el id que recibimos por parametor con el parameto en la bd
        var filter = Builders<Evaluaciones>.Filter.Eq(s => s.Id, new ObjectId(id));
        await Collection.DeleteOneAsync(filter); //condicion para eliminar el elemento de la base de datos
    }

    public async Task<List<Evaluaciones>> getallEvaluaciones()
    {
        return await Collection.FindAsync(new BsonDocument()).Result.ToListAsync();
    }
/*
    public async Task<Evaluaciones> getallbyID(string id)
    {
        //aca me dice un error ambiguo per no veo el error , revisar si no funciona
        return await Collection.FindAsync(new BsonDocument({{"_id", new ObjectId(id) }}).Result.FirstAsync();

    }*/
}