const express =require(`express`);
const cors =require(`cors`);
const mongoose = require(`mongoose`);

require(`dotenv`).config();

const app = express();
const port = process.env.PORT || 3001;

//*** Middlewares ***//
app.use(cors());
app.use(express.json());

//*** MongoDB Server Instance ***//
const devUrl = 'mongodb://localhost/Blog';
mongoose.connect(devUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  
  const db = mongoose.connection;
  db.on(`error`, (err) => {
      console.error(`Connetion Error: ${err}`);
  });
  db.once(`open`, _ => {
      console.log(`Connected to ${devUrl}`);
  });


//*** Start API Server ***//
app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
})