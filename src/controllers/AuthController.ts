import express, { Request, Response, NextFunction } from "express";
import statusCode from "../modules/statusCode"
import message from "../modules/responseMessage";
import util from "../modules/util";
import { AuthService } from "../services";
import config from "../config";
import User from "../models/User";
import UserService from "../services/UserService";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_AUTH_REDIRECT_URL = "http://localhost:8000/auth/google/callback";

const getGoogleToken = async(req: Request, res: Response, next: NextFunction) => {
    return res.redirect(`${GOOGLE_AUTH_URL}?client_id=${config.googleClientID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.email`)
}

const googleLogin = async(req: Request, res: Response, next: NextFunction) => {
    const {code} = req.query;
    try{   
        const data = await AuthService.getGoogleInfo(code as string);
        if(!data) res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE_TOKEN));
        
 

        res.status(statusCode.OK).send()

    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.success(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
    return res.redirect('http://localhost:8000');
}

export default {
    googleLogin,
    getGoogleToken,
}