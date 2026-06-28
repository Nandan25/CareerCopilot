import app from "./app.js";
import  connectDatabase  from "./config/database.js";
import { env } from "./config/env.js";


connectDatabase().then(()=>{
    app.listen(env.PORT, ()=>{
        console.log("App running on server", env.PORT)
    })
}).catch((error)=>{
    console.log("MongoDb connection error", error)
})