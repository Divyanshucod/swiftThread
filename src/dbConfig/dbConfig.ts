import mongoose from 'mongoose'

async function Connection() {
    try {
          mongoose.connect(process.env.MONGO_URL!)

          const connection = mongoose.connection;

          connection.on('connected',()=>{
            console.log('database connected');
          })

          connection.on('error',(err)=>{
            console.log('MongoDB connection error:',err);
            process.exit()
          })

    } catch (error) {
       console.log("Error:",error);
       
    }
}

export default Connection;