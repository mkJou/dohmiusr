import { verify } from 'jsonwebtoken';

const profileHandler = (req, res) => {

    const { authUserToken } = req.cookies;

    if (!authUserToken) {
        return res.status(401).json({ 'error': 'no token' });
    }

    try {
        const user = verify(authUserToken, 'secretkey')
        console.log(user)
        return res.json({ username: user.username })
    } catch (error) {
        return res.status(401).json({ 'message': 'get profile failed' });
    }
}

export default profileHandler