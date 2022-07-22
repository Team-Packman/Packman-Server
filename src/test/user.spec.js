/* eslint-disable */
import req from 'supertest';
const dotenv = require('dotenv');

import app from '../index';
dotenv.config();
describe('POST /user/prfile', () => {
  it('유저 생성 성공', (done) => {
    req(app)
      .post('/user/profile')
      .set('Content-Type', 'application/json')
      .send({
        email: 'kkkl@gmail.com',
        name: '박현지',
        profileImageId: '1',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  it('필요한 값이 없습니다', (done) => {
    req(app)
      .post('/user/profile')
      .set('Content-Type', 'application/json')
      .send({
        email: 'kkkl@gmail.com',
        profileImageId: '1',
      })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
});

describe('PATCH /user/prfile', () => {
  it('유저 수정 성공', (done) => {
    req(app)
      .patch('/user/profile')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d6acbdc10dc1e16b2a636a',
        email: 'kkkl@gmail.com',
        name: '박현지',
        profileImageId: '1',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  it('필요한 값이 없습니다', (done) => {
    req(app)
      .patch('/user/profile')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        email: 'kkkl@gmail.com',
        profileImageId: '1',
      })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
});

describe('GET /user', () => {
  it('유저 조회 성공', (done) => {
    req(app)
      .get('/user')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  it('토큰이 유효하지 않습니다', (done) => {
    req(app)
      .get('/user')
      .set('Content-Type', 'application/json')
      .set('Authorization', '')
      .expect(400)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
});
