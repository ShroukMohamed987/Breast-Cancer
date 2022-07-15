require('dotenv').config()
const express=require('express')
 const app=express();
const path= require('path')
const cors=require('cors');
const bodyParser=require('body-parser');
const multer=require('multer');
 const notFoundMiddleware=require('./middleware/not-found')
 const errorMiddleware=require('./middleware/error-handler')
   


 
 app.use(express.json())

//connect db
const connectDB = require('./db/connect')


//////product routes
const patientRouter = require('./routes/patient')
const raysRouter = require('./routes/rays')


 //routes

  app.get('/',(req,res)=>{
      res.send('<h1>Breast Cancer</h1><a href="/api/v1/patient"> product routes EveryThings OK!!</a>')
  })

 app.use('/api/v1/patient',require('./routes/patient'))
  app.use('/api/v1/rays',require('./routes/rays'))
  app.use('/api/v1/doctor',require('./routes/doctorRoutes'))
  app.use('/api/v1/admin',require('./routes/adminRoutes'))
  app.use('/api/v1/drugs',require('./routes/drugs'))
 app.use('/api/v1/contact',require('./routes/contactUs'))
 app.use('/api/v1/help',require('./routes/helpRoute'))
/*  */

 app .use(notFoundMiddleware)
 app.use(errorMiddleware)

 const port=process.env.PORT ||3000



 const start =async()=>{
     try{
         //conect to db

        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening port ${port}...`))


     }catch(error){
         console.log(error)

     }
 }
 start();

