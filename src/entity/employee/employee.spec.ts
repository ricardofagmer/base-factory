import { doesNotMatch } from "assert";
import { json } from "stream/consumers";

const supertest = require('supertest');
const host = 'http://localhost:4000';
const request = supertest(host);

let token = '';

beforeAll(() => {
  test('should return token', async ()=> {
      const response = await request.post('/login')
      .send({
          email: 'ricardo.fagmer@biosistemico.com.br',
          senha: '12345'
      })
      .end((err: any, response: { body: { token: string; }; }) => {
          if(err) throw err;
          token = response.body.token;
          //done();
      })
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('application/json');
  })
});


describe('Get All Employees', () => {
    it('should get all employes', async () => {
        const response = await request.get('/employee');
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body).toEqual(expect.arrayContaining(response.body));
    });
});

describe('Get All Employees', () => {
    it('should get all employes', async () => {
        const response = await request.get('/employee')
        .set('x-auth-token', token)
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body).toEqual(expect.arrayContaining(response.body));
    });
});
