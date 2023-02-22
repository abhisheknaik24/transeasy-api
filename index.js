import express from 'express';
import './config.js';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import './middlewares/passport.js';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan(process.env.MORGAN));

app.use(express.static('public'));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: process.env.CLIENT_METHODS,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: process.env.COOKIE_SECURE },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.authenticate('session'));

app.use('/auth/google', authRoutes);

(async () => {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    app.listen(port);
  } catch (error) {
    process.exit(1);
  }
})();
