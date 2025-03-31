const fs = require('fs').promises;

async function cleanFile(filename) {
    try {
        // Read the file
        const content = await fs.readFile(filename, 'utf8');
        
        // Remove extra spaces
        const cleanedContent = content.replace(/\s+/g, ' ').trim();
        
        // Write back to the same file
        await fs.writeFile(filename, cleanedContent);
        
        console.log(`File '${filename}' has been cleaned.`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Usage
const filename = '/Users/shukruthj/Downloads/assignments-main/week-2/week-2-async-js/medium/a.txt';
cleanFile(filename);