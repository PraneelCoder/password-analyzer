import express from 'express';
import fs from 'fs';
import { calculateEntropy } from './utils/entropy.js';

const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Allows us to read form data


const rawData = fs.readFileSync('./data/rockyou.txt', 'utf-8');
const leakedSet = new Set(rawData.split('\n').map(word => word.trim().toLowerCase()));


app.get('/', (req, res) => {
    res.render('index', { result: null, password: '' });
});


app.post('/analyze', (req, res) => {
    const userPassword = req.body.passwordInput;

    
    if (leakedSet.has(userPassword.toLowerCase())) {
        return res.render('index', { 
            password: userPassword,
            result: { compromised: true, bits: 0, poolSize: 0, status: 'Compromised' } 
        });
    }

    
    const evaluation = calculateEntropy(userPassword);
    
    
    res.render('index', { 
        password: userPassword,
        result: { compromised: false, ...evaluation } 
    });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});