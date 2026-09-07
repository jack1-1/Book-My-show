const express=require("express");
const dbConfig=require("./dbConfig");
const dotEnv=require('dotenv');
const cors=require('cors')
const cookieParser=require("cookie-parser");
dotEnv.config();

const app=express();
dbConfig.connectDb();

const router=require('./routes/user.route.js');
const movieRoutes=require('./routes/movie.route.js')
app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL || 'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());
app.use('/api/auth', router);
app.use('/api/movie', movieRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT,()=>{
console.log("Server is running on port 8001");
})
