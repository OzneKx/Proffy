import {Request, Response} from 'express';
import db from '../database/connection';

export default class ConnectionsController {
    async getToken(request: Request, response: Response){
        const { email, password } = request.body;

        const tokenResponse = await db('accounts').select('token').where('email', '=', email).where('password', '=', password);

        return response.json(tokenResponse[0]);
    }

    async getCredentials(request: Request, response: Response){
        const { token } = request.body;

        const accountResponse = await db('accounts').select(['email', 'username']).where('token', '=', token);

        return response.json(accountResponse[0]);
    }

    async createAccount(request: Request, response: Response){
        const { token, email, password, username, avatar, whatsapp, bio } = request.body;

        await db('accounts').insert({
            token,
            username,
            email,
            password,
            avatar,
            whatsapp,
            bio
        })

        return response.status(201).send();
    }
}