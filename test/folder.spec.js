import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import app from '../src/index';
dotenv.config();

describe('POST /folder', () => {
    it('폴더 생성 성공', done => {
      request(app)
        .post('/folder')
        .set('Content-Type', 'application/json')
        .set('Authorization', process.env.USER_TOKEN)
        .send({
          "title":  '폴더1',
          "isAloned": true,
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
      request(app)
        .post('/folder')
        .set('Content-Type', 'application/json')
        .set('Authorization', process.env.USER_TOKEN)
        .send({
            "title":  '폴더1',
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

describe('GET /folder', () => {
    it('폴더 조회 성공', (done) => {
      request(app)
        .get('/folder')
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

  describe('GET /folder/alone', () => {
    it('폴더 조회 성공', (done) => {
      request(app)
        .get('/folder/alone')
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


describe('GET /folder/together', () => {
    it('폴더 조회 성공', (done) => {
      request(app)
        .get('/folder/together')
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


describe('PATCH /folder', () => {
        it('폴더 수정 성공', (done) => {
          request(app)
            .patch('/folder')
            .set('Content-Type', 'application/json')
            .set('Authorization', process.env.USER_TOKEN)
            .send({
                "_id": "62d9842924ff58dcf71797cf",
                "title": "폴더"
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
          request(app)
            .patch('/folder')
            .set('Content-Type', 'application/json')
            .set('Authorization', process.env.USER_TOKEN)
            .send({
                'title':  '폴더1',
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

describe('DELETE /folder/:folderId', () => {
        it('폴더 삭제 성공', (done) => {
          request(app)
            .patch('/folder/:folderId')
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
