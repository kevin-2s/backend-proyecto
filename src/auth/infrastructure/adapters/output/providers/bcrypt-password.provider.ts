import { PasswordHashPort } from '../../../../domain/ports/output/auth.repository.port';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptPasswordProvider implements PasswordHashPort {
    async compare(plain: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plain, hashed);
    }
}
