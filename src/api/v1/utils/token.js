const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, "\n");
const publicKey = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, "\n");

function generateToken(payload, expiresIn = "7d") {
    return new Promise((resolve, reject) => {
        let options = {
            algorithm: "RS256",
            expiresIn
        };
        jwt.sign(payload, privateKey, options, (error, token) => {
            error ? reject(error) : resolve(token);
        });
    });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        let options = { algorithm: "RS256" };
        jwt.verify(token, publicKey, options, (error, decoded) => {
            error ? reject(error) : resolve(decoded);
        });
    });
}

module.exports = {
    generateToken,
    verifyToken
};
