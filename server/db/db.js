const mongoose=require("mongoose")

const Connection = async(USERNAME,PASSWORD)=>{
    const mongoURL=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hncayal.mongodb.net/`

     try{
          await mongoose.connect(mongoURL);
          console.log("Database connected successfully");
     }catch(error){
        console.log('Error', error.message);
     }
}

module.exports= Connection

