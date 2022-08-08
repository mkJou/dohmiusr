import { verify } from 'jsonwebtoken';
import { serialize } from 'cookie'

const logoutHandler = (req, res) => {

    const { authUserToken } = req.cookies;

    if (!authUserToken) {
        return res.status(401).json({ 'error': 'no token' });
    }

    try {
        verify(authUserToken, 'secretkey')
        const serialized = serialize('authUserToken', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        });

        res.setHeader('Set-Cookie', serialized);
        res.status(200).json({ 'message': 'Logout success' });

    } catch (error) {
        return res.status(401).json({ 'message': 'Logout failed' });
    }

}

export default logoutHandler;