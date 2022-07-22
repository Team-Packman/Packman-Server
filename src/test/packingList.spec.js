/* eslint-disable */
import req from 'supertest';
const dotenv = require('dotenv');

import app from '../index';
dotenv.config();

describe('POST /packingList/title', () => {
  it('패킹리스트 제목 수정 성공', (done) => {
    req(app)
      .patch('/packingList/title')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d984fb07a7c2aa188b198a',
        title: '제목',
        isAloned: true,
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
      .post('/packingList/title')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d984fb07a7c2aa188b198a',
        title: '제목',
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

describe('PATCH /packingList/departureDate', () => {
  it('패킹리스트 출발날짜 수정 성공', (done) => {
    req(app)
      .patch('/packingList/departureDate')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d984fb07a7c2aa188b198a',
        departureDate: '2022.07.15',
        isAlone: true,
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
      .patch('/packingList/title')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d984fb07a7c2aa188b198a',
        isAlone: true,
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

describe('PATCH /packingList/myTemplate', () => {
  it('패킹리스트 나만의 템플릿 여부 수정 성공', (done) => {
    req(app)
      .patch('/packingList/myTemplate')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d984fb07a7c2aa188b198a',
        isSaved: true,
        isAlone: true,
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
      .patch('/packingList/myTemplate')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        title: '폴더1',
        isAlone: true,
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

describe('GET /packingList/invite/:inviteCode', () => {
  it('함께 패킹리스트 초대 성공', (done) => {
    req(app)
      .patch('/packingList/invite/:inviteCode')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d9842924ff58dcf71797cf',
        title: '폴더',
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
});
