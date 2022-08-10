/* eslint-disable */
import req from 'supertest';
const dotenv = require('dotenv');

import app from '../index';
dotenv.config();

describe('GET /template/alone', () => {
  it('혼자 패킹 템플릿 리스트 조회 성공', (done) => {
    req(app)
      .patch('/template/alone')
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
});

describe('GET /template/together', () => {
  it('함께 패킹 템플릿 리스트 조회 성공', (done) => {
    req(app)
      .patch('/template/together')
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
});

describe('GET /template/:templateId/:type', () => {
  it('템플릿 상세조회 성공', (done) => {
    req(app)
      .patch('/template/:templateId/:type')
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
});
