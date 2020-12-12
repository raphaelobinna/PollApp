const dotenv = require('dotenv');
const connectDB = require('./models/index')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const handle = require('./handlers');

const app = express();

//load config
dotenv.config({path: './config/config.env' })
connectDB()
const PORT = process.env.PORT || 4000
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);

// app.use((req, res, next) => {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
app.use(handle.error);

console.log(process.env.NODE_ENV);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder   
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
  
    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
  }


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
