import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

const rulesStoreSessionRequest = [
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty().isLength({ min: 8})
];

class StoreSessionRequest {
    async handle(req: Request, res: Response, nextFunction: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }       
        nextFunction();
    }
}

export { rulesStoreSessionRequest, StoreSessionRequest };