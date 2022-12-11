let cors = require('cors'),
  helmet = require('helmet'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  express = require('express'),
  app = express(),
  expressSession = require('express-session'),
  path = require('path'),
  fs = require('fs'),
  https = require('https'),
  compression = require('compression'),
  mongoose = require('mongoose'),
  swaggerUI = require('swagger-ui-express'),
  swaggerDoc = require('./swagger.json'),
  DividendeRoutes = require('./src/routes/Dividende'),
  BuyRoutes = require('./src/routes/Buy');

const dbURI =
  'mongodb://127.0.0.1:27017/KronosFinancial?readPreference=primary';

mongoose.connect(
  dbURI,
  {
    useUnifiedTopology: true,
    loggerLevel: 'error',
    appname: 'KronosFinancial',
    connectTimeoutMS: 5000,
  },
  (err) => {
    if (err) {
      console.log(`[Database] (error) - ${err}`);
    } else {
      console.log(`[Database] (connected) - ${dbURI}`);
    }
  },
);

mongoose.set('strictQuery', !0);
Promise = global.Promise;

const uuidv4 = () => {
  var res = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  console.log(`[New Client] (uuid) - ${res}`);
  return res;
};

// Configuration Express Server
app.use(
  cors({
    origin: 'http://kronos.dev:4343/',
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(
  expressSession({
    genid: () => uuidv4(),
    secret: 'KronosDevPro',
    name: 'SessionID',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      domain: 'kronos.dev',
      maxAge: 3600000,
    },
  }),
);
app.use(morgan('combined'));
app.use(
  express.json({
    limit: '50mb',
  }),
);

app.use('/api', DividendeRoutes);
app.use('/api', BuyRoutes);

var credentials = {
  key: fs.readFileSync('secure/kronos.dev-key.pem', 'utf8'),
  cert: fs.readFileSync('secure/kronos.dev.pem', 'utf8'),
};

https.createServer(credentials, app).listen(3443, 'kronos.dev');
console.log('Server is running on port 3443');
