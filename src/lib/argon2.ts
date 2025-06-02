import {hash, verify, type Options} from "@node-rs/argon2"
const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
}

export async function hashPassword(password: string): Promise<string> {
  const hashed = await hash(password, opts);
  return hashed;
}

export async function verifyPassword(data: {password: string, hash: string}) {
  const {hash, password} = data;
  const isValid = await verify(hash, password, opts);
  return isValid;
}