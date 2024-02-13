import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";
import session from "express-session";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  const message = req.session.messages?.pop();
  res.render("login", {messages: message});
})

router.post(
  "/login", 
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails */
    failureMessage: true
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

//router.get('/github', passport.authenticate('github', {scope:['user:email']}));
router.get('/github', passport.authenticate('github', { prompt: 'consent' }));

router.get('/github/callback', 
    passport.authenticate('github', 
    { failureRedirect: '/login', 
      failureFlash: true,
      successRedirect: '/dashboard' })
    );

export default router;
