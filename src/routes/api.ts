import { Router } from 'express';
import { SessionController } from '../controller/SessionController';
import { StoreSessionRequest, rulesStoreSessionRequest } from '../validators/requests/session/SessionStoreRequest';
import { verifyIfIsAuthenticated } from '../middlewares/VerifyIfIsAuthenticate';
import { StoreUserRequest, rulesStoreUserRequest } from '../validators/requests/user/UserStoreRequest';
import { UserController } from '../controller/UserController';
import { rulesUpdateUserRequest, UserUpdateRequest } from '../validators/requests/user/UserUpdateRequest';
import multer from 'multer';
import uploadConfig from '../config/multer';

const router = Router();
const upload = multer(uploadConfig.upload("uploads"));

router.post('/login', rulesStoreSessionRequest, new StoreSessionRequest().handle, new SessionController().store);
router.post('/users', verifyIfIsAuthenticated, rulesStoreUserRequest, new StoreUserRequest().handle, new UserController().store);
router.put('/users/image/:id', verifyIfIsAuthenticated, upload.single('image'), new UserController().updateImage);
router.put('/users/:id', verifyIfIsAuthenticated, rulesUpdateUserRequest, new UserUpdateRequest().handle, new UserController().update);
router.get('/users/:id', verifyIfIsAuthenticated, new UserController().show);
router.delete('/users/:id', verifyIfIsAuthenticated, new UserController().destroy);
router.get('/users', verifyIfIsAuthenticated, new UserController().index);

export { router }