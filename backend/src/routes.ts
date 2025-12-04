import {Router, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken, AuthRequest } from './middleware/auth';
import path from 'path';
import fs from 'fs';

const router = Router();
const secret = process.env.JWT_SECRET || 'defaultsecret';

// Login API Route 
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

// Protected API Route
router.get('/protected', authenticateToken, (req: AuthRequest, res: Response) => {
    res.json({ message: 'This is protected data.', user: req.user });
});


// Simulating Books from DB in JSON format
const getBooksFromDB = () => {
    const filepath = path.join(__dirname, 'data', 'books.json');
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
}

// Get Books API Route (Public, No authentication Required)
router.get('/books', (req: AuthRequest, res: Response) => {
    try{
        const books = getBooksFromDB();
    res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error reading Database'});
    }
});


export default router;