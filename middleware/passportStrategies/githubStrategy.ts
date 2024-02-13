import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import passport from 'passport';
import { VerifyCallback } from 'passport-oauth2';
import dotenv from 'dotenv';
import { getUserById } from '../../controllers/userController';
import { userModel } from "../../models/userModel";
dotenv.config({ path: __dirname + '/.env' });

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
        //scope:['user:email'],
    },
    
    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        let user = userModel.findOrCreate(profile);
        console.log("the user is ", user)
        return done(null, user);
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
