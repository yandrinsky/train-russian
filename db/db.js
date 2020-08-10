const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });
let database, col;

const db = {
    connection: async function(){
        await mongoClient.connect(async (err, client) => {
            if(err){
                throw err;
            }
            // взаимодействие с базой данных
            console.log("Подключение к базе удалось");
            database = await client.db("trainRussia");
            col = await database.collection("words");
            return col
        }); 
        console.log(col);

        
    },
}



module.exports = db;

/*




mongoClient.connect(async (err, client) => {
 
    if(err){
        return console.log(err);
    }
    // взаимодействие с базой данных
    console.log("Подключение к базе удалось");
    const db = client.db("charly");
    const collection = db.collection("eat");


   collection.insertMany(eat, (err, result)=>{
        if(err){
            throw err;
        } else {
            console.log(result.ops);
        }
    })
    app.listen(3000);
    collection.deleteMany({timesWeek: 1});
    const data = await collection.find().toArray();
    //const el = await collection.find({timesWeek: 1}).toArray();
    console.log(data);
    //console.log(el);


    //client.close();
});*/


