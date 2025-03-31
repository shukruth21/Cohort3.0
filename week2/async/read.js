const fs = require('fs');

const filePath = '/Users/shukruthj/Downloads/assignments-main/week-2/week-2-async-js/easy/a.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);

    // Perform the expensive operation after file read completes
});

function expensiveOperation() {
    let sum = 0;
    for (let i = 0; i < 1e8; i++) { // Simulating a very expensive operation
        sum += i;
    }
    console.log('Expensive operation result:', sum);
}

expensiveOperation();