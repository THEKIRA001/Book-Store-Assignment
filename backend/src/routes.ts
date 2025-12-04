import {Router, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken, AuthRequest } from './middleware/auth';

const router = Router();
const secret = process.env.JWT_SECRET || 'defaultsecret';

// Login
router.post('/login', (req: Request, res: Response) => {
   const { username, password } = req.body;
   if(username === 'admin' && password === 'admin') {
    const user = { username: 'admin', role: 'editor'};
    const token = jwt.sign(user, secret, { expiresIn: '1h' });
    res.json({ token, user });
   } else {
    res.status(401).json({ message: 'Invalid credentials' });
   }
});

// Protected
router.get('/protected', authenticateToken, (req: AuthRequest, res: Response) => {
    res.json({ message: 'This is protected data.', user: req.user });
});




export default router;