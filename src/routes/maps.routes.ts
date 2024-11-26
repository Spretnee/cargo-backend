import { Router } from 'express';
import axios from 'axios';
import { ensureAuthenticated } from '../middleware/auth.middleware';

const router = Router();

router.get('/nearby-search', ensureAuthenticated, async (req, res) => {
    const { location, radius, type, key } = req.query;
    try {
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
            {
                params: { location, radius, type, key },
            },
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send(
            `Error fetching data from Google Maps API: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
});

router.get('/photo', ensureAuthenticated, async (req, res) => {
    try {
        const { maxWidth, photoReference, key } = req.query;

        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${key}`;

        const response = await axios.get(url, { responseType: 'stream' });

        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Length', response.headers['content-length']);
        res.setHeader('Cache-Control', response.headers['cache-control']);

        response.data.pipe(res);
    } catch (error) {
        res.status(500).send(
            `Error fetching picture: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
});

export default router;
