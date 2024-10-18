import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const verifyIfIsAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if(authorization) {
        try {
            const [, token] = authorization.split(' ');
            
            verify(
                token,
                process.env.JWT_SECRET
            );
            
        }catch(err) {
            return res.status(401).end();
        }

        return next();
    }

    return res.status(401).end();
}

export { verifyIfIsAuthenticated };