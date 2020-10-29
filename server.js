const express =require(`express`);
const cors =require(`cors`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();

const app = express();
const port = process.env.PORT || 3001;

//*** Middlewares ***//
app.use(cors());
app.use(bodyParser.json());

//*** MongoDB Server Instance ***//
const uri = process.env.DEV_URI
mongoose.connect(uri, {
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
      console.log(`Connected to ${uri}`);
  });

  //*** Routers ***//
  const postsRouter = require(`./routes/posts`);
  const usersRouter = require(`./routes/users`);

  app.use(`/posts`, postsRouter);
  app.use(`/users`, usersRouter);

//*** Start API Server ***//
app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
})
