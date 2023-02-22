import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('google', ['profile', 'email']));

router.get('/login', (req, res) => {
  if (req.method === 'GET') {
    if (req.user) {
      req.login(req.user, (err) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: err,
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Log In successfully!',
            data: { user: req.user },
          });
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found!',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
});

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/auth/google/failed',
  })
);

router.get('/logout', (req, res) => {
  if (req.method === 'GET') {
    req.logout((err) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: err,
        });
      } else {
        res.redirect(`${process.env.CLIENT_URL}/login`);
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
});

export default router;
