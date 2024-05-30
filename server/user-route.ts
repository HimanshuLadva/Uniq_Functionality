import { DUTIESANDTAXESACC, USERS } from "./db-data";
import { Request, Response } from "express";

export function getUsers(req: Request, res: Response) {
    res.status(200).send({payload: Object.values(USERS)});
}

export function getAccounts(req: Request, res: Response) {
    res.status(200).send(DUTIESANDTAXESACC);
}