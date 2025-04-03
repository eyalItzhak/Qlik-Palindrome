import * as fs from 'fs';
const COOKIE_FILE = './cookie/cookies.json';
export function loadCookies( ):string | undefined {
    if (fs.existsSync(COOKIE_FILE)) {
        return JSON.parse(fs.readFileSync(COOKIE_FILE, 'utf-8'));
    }
    return undefined;
}


export function saveCookies(cookies:string) {
    fs.writeFileSync(COOKIE_FILE, JSON.stringify(cookies, null, 2), 'utf-8');
}