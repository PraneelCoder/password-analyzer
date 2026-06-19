import fs from 'fs';

console.log("Connecting to SecLists GitHub repository...");


const url = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt";

try {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Server returned a ${response.status} error.`);
    }
    
    const data = await response.text();
    
    
    fs.writeFileSync('./data/leaked.txt', data);
    
    const lines = data.split('\n').length;
    console.log(`Success! Downloaded ${lines.toLocaleString()} compromised passwords into data/leaked.txt.`);
    console.log("You can now delete this script and run: node server.js");
} catch (error) {
    console.error("Download failed:", error.message);
}