import express from 'express';

const routes = express.Router();

routes.post('/login', (req, res) => {
    return res.json({ msg: 'ok' })
});

export default routes;