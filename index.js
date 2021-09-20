const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const helmet = require("helmet");
const morgan = require("morgan");
dotenv.config();

// Importing Routers
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth')
const app = express();

const port = process.env.PORT || 5000;
const url = process.env.MONGODB_URL;

// DB Connetion
mongoose.connect(url,{ useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
})

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan("common"))
app.use(express.static('./public'));
// app.use(bodyParser({ extended: true }))


//routes
app.get('/', (req, res) => {
    res.send('welcome to NFT-api');
  });
  
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})




