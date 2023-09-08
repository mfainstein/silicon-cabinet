import * as fs from 'fs';
import * as path from 'path';

export function load(domain, key){
    const CREDENTIALS_PATH = path.join(process.cwd(), './credentials.json');
    const credentialsJson = fs.readFileSync(CREDENTIALS_PATH);
    const credentials = JSON.parse(credentialsJson);
    return credentials?.[domain]?.[key];
}
