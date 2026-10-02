import fs from 'fs';
import { log } from './logger';

function writeFile(filepath: string, data: string) {
    try {
        fs.writeFileSync(filepath, data);
        log('info', `Writing a file ${filepath}`);
    }
    catch (error) {
        log('error', `Error in writing a file ${filepath}: ${error}`);
    }
}

function readFile(filepath: string): any {
    if (!fs.existsSync(filepath)) {
        throw new Error(`File does not exists in filepath ${filepath}`);
    }
    log('info', `Reading file ${filepath}`);
    const data = fs.readFileSync(filepath, "utf-8");
    return data;
}

export { writeFile, readFile }