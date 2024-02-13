import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { userModel } from "../models/userModel";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get('/admin', async (req, res) => {
  try {
    if (req.user?.role) {
      const sessionStore = req.sessionStore as Express.SessionStore;
      // @ts-ignore
      sessionStore.all((err, sessions) => {
        if (err) {
          console.error('Error fetching sessions:', err);
          return res.status(500).send('Error fetching sessions');
        }

        const sessionsArray: Array<{ sid: string; userId?: string }> = [];
        // @ts-ignore
        const sessionIds = Object.keys(sessions);
        //console.log(sessionIds);
        //console.log("-----")
        for (const sessionId of sessionIds) {
          // @ts-ignore
          const sessionData = sessions[sessionId] as any;
          const userId = sessionData.passport?.user;

          sessionsArray.push({ sid: sessionId, userId: userId });
        }
        const user = userModel.findById(1);
        const username = user.name;

        res.render('admin', { sessions: sessionsArray, username: username });
      });
    } else {
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error('Error in admin route:', error);
    res.status(500).send('An error occurred');
  }
});

router.post('/admin/revoke/:sid', (req, res) => {
  const sessionIdToRevoke = req.params.sid;
  req.sessionStore.destroy(sessionIdToRevoke, (err) => {
    if (err) {
      res.redirect('/dashboard')
    }
    res.redirect('/admin');
  });
});

export default router;
