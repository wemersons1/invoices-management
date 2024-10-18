import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';
import { router } from './routes/api';

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.json(500).json({
        error: `Internal server error - ${err}`
    });
});

app.listen(port);