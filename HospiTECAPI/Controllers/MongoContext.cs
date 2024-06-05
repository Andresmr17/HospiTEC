using MongoDB.Driver;
using System;

namespace HospiTECAPI.Controllers
{
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
            var connectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("The MongoDB connection string is not set in the environment variables.");
            }
            client = new MongoClient(connectionString);
            db = client.GetDatabase("proyectoBases");
        }
    }
}
