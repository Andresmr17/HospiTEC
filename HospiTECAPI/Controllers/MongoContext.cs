
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace HospiTECAPI.Controllers;

public class MongoContext
{
    private IMongoDatabase db;
    public MongoClient client;

    public IMongoDatabase getDb()
    {
        return this.db;
    }

    public MongoContext()
    { 
        client = new MongoClient("");
        db = client.GetDatabase("proyectoBases");
    }

   
}