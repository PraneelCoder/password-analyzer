export function calculateEntropy(password) {
    if (!password) return { bits: 0, poolSize: 0, status: 'Empty', crackTime: '--' };

    let poolSize = 0;
    
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

    if (poolSize === 0) return { bits: 0, poolSize: 0, status: 'Weak', crackTime: 'Instant' };

    const bits = Math.floor(password.length * Math.log2(poolSize));

    
    const combinations = Math.pow(2, bits);
    
    
    const guessesPerSecond = 100000000000; 
    const secondsToCrack = combinations / guessesPerSecond;

    
    let crackTime = '';
    if (secondsToCrack < 60) crackTime = 'Seconds';
    else if (secondsToCrack < 3600) crackTime = 'Minutes';
    else if (secondsToCrack < 86400) crackTime = 'Hours';
    else if (secondsToCrack < 31536000) crackTime = 'Days';
    else if (secondsToCrack < 3153600000) crackTime = 'Years';
    else crackTime = 'Centuries+';

    let status = '';
    if (bits < 40) status = 'Weak';
    else if (bits < 72) status = 'Moderate';
    else if (bits < 128) status = 'Strong';
    else status = 'Military Grade';

    return { bits, poolSize, status, crackTime };
}