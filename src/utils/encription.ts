import * as crypto from 'crypto';

export function encript(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
    // return crypto.pbkdf2Sync(password, '', 1000, 16, 'sha256').toString()
}