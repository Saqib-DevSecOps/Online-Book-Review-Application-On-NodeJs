import jwt from "jsonwebtoken";


export function decodeToken(token) {
    return jwt.verify(token, "1234567898765431abcABC123");
}


export function createToken(user_id, username) {
    return jwt.sign({ user_id, username }, "1234567898765431abcABC123");
}