import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ADMIN, DEFAULT } from '../../../../constants/roles';
import { parse, isValid, differenceInYears } from 'date-fns';
import { FindUserByEmailService } from '../../../services/User/FindUserByEmailService';

const rulesStoreUserRequest = [
    body('first_name').isString().notEmpty(),
    body('last_name').isString().notEmpty(),
    body('birth_day')  .isISO8601({ strict: true, strictSeparator: true }) // This checks the format YYYY-MM-DD
    .withMessage('Date of birth must be a valid date in the format YYYY-MM-DD')
    .custom((value) => {
      // Parse date
      const date = parse(value, 'yyyy-MM-dd', new Date());
      // Check if date is valid
      if (!isValid(date)) {
        throw new Error('Invalid date');
      }
      // Check if user is at least 18 years old
      const age = differenceInYears(new Date(), date);
      if (age < 18) {
        throw new Error('User must be at least 18 years old');
      }
      return true;
    }),
    body('role_id').isInt().custom((value, { req }) => {
        const userRoles = [ADMIN, DEFAULT];
        const { role_id } = req.body;

        return userRoles.includes(role_id);
      }),
  
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty().isLength({ min: 8}),
    body('password_confirmation').custom((value, { req }) => {
        return value === req.body.password;
      }),
];

class StoreUserRequest {
    async handle(req: Request, res: Response, nextFunction: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }       
        nextFunction();
    }
}

export { rulesStoreUserRequest, StoreUserRequest };