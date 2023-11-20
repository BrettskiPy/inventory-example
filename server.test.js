const request = require('supertest');
const app = require('./server');

describe('CRUD Operations', () => {
    let createdItemId;

    it('should create a new item', async () => {
        const res = await request(app)
            .post('/items')
            .send({ name: 'Test Item' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test Item');
        createdItemId = res.body.id;
    });

    it('should retrieve all items', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should retrieve a single item', async () => {
        const res = await request(app).get(`/items/${createdItemId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', createdItemId);
    });

    it('should update an item', async () => {
        const res = await request(app)
            .put(`/items/${createdItemId}`)
            .send({ name: 'Updated Item' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Updated Item');
    });

    it('should delete an item', async () => {
        const res = await request(app).delete(`/items/${createdItemId}`);
        expect(res.statusCode).toEqual(204);
    });
});