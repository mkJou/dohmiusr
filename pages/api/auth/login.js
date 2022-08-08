import jwt from 'jsonwebtoken';
import { serialize } from 'cookie'

const loginHandler = (req, res) => {

    const { username, password } = req.body;

    if (username === "admindohmi" && password === "dohmiadmin-123") {

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            username: "admindohmi",

        }, 'secretkey');

        const serialized = serialize('authUserToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 + 60 * 60 * 24 * 7,
            path: '/'
        });

        res.setHeader('Set-Cookie', serialized);

        return res.status(200).json({ 'message': 'Login success' });
    }

    return res.status(200).json({ 'neesage': username })
    //const { username, password } = req.body;

    //return res.status(200).json({ 'message': username })

    // // chequear si el usuario es correo y la cyarnontraseña

    // // chequear si el username existe

    // // chequear si la contraseña es correcta

    // if (username === "admindohmi" && password === "dohmiadmin-123") {

    //    

    //     

    //     

    //     

    //     // return res.status(200).json({ 'message': 'Login with admin' });
    // }

    // return res.status(401).json({ 'message': 'Login failed' });
    //   const { email, password } = req.body;
    //   const user = {
    //     email,
    //     password,
    //   };
    //   const token = jwt.sign(user, process.env.JWT_SECRET);
    //   res.json({ token });
}

export default loginHandler