const express = require('express');
const fs = require('fs');
const analyzeEntropy = require('./entropy'); 

const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 


const rawData = fs.readFileSync('./data/leaked.txt', 'utf-8');
const leakedSet = new Set(rawData.split('\n').map(word => word.trim().toLowerCase()));


app.get('/', (req, res) => {
    res.render('index', { result: null, password: '' });
});


app.post('/analyze', (req, res) => {
    const userPassword = req.body.passwordInput;
    
    
    const mathResult = analyzeEntropy(userPassword);
    
    
    const isCompromised = leakedSet.has(userPassword.toLowerCase());

    
    const finalResult = {
        bits: mathResult.bits,
        poolSize: mathResult.poolSize,
        crackTime: mathResult.crackTime,
        status: isCompromised ? 'Compromised' : mathResult.status,
        compromised: isCompromised
    };

    res.render('index', { 
        result: finalResult, 
        password: userPassword 
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});