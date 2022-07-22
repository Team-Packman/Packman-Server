/* eslint-disable */
import req from 'supertest';
const dotenv = require('dotenv');

import app from '../index';
dotenv.config();

describe('POST /packingList/alone', () => {
  it('혼자 패킹리스트 생성 성공', (done) => {
    req(app)
      .post('/packingList/alone')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        departureDate: '2022.07.11',
        folderId: '5e4d276f95e376b7976b2003',
        title: '홍콩 한달 살이',
        templatedId: '5e4d276f95e376b7976b2003',
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

  it('혼자 패킹리스트 생성 - 필요한 값 없음', (done) => {
    req(app)
      .post('/packingList/alone')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        departureDate: '',
        folderId: '',
        title: '',
        templatedId: '',
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

describe('POST /packingList/alone/category', () => {
  it('혼자 패킹리스트 카테고리 생성 성공', (done) => {
    req(app)
      .post('/packingList/alone/category')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        name: '필수',
        listId: '62d9854c24ff58dcf71797e2',
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

  it('혼자 패킹리스트 카테고리 생성 - 필요한 값 없음', (done) => {
    req(app)
      .post('/packingList/alone/category')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        name: '',
        listId: '',
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

describe('PATCH /packingList/alone/category', () => {
  it('혼자 패킹리스트 카테고리 수정 성공', (done) => {
    req(app)
      .patch('/packingList/alone/category')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d987a207a7c2aa188b19e8',
        name: '필수',
        listId: '62d9854c24ff58dcf71797e2',
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

  it('혼자 패킹리스트 카테고리 수정 - 필요한 값 없음', (done) => {
    req(app)
      .patch('/packingList/alone/category')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '',
        name: '',
        listId: '',
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

describe('DELETE /packingList/alone/category/:listId/:categoryId', () => {
  it('혼자 패킹 리스트 카테고리 삭제', (done) => {
    req(app)
      .delete('packingList/alone/category/62d9854c24ff58dcf71797e2/62d987a207a7c2aa188b19e8')
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

describe('POST /packingList/alone/pack ', () => {
  it('혼자 패킹리스트 짐 생성 성공', (done) => {
    req(app)
      .post('/packingList/alone/pack')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        name: '필수',
        categoryId: '62d987a207a7c2aa188b19e8',
        listId: '62d9854c24ff58dcf71797e2',
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

  it('혼자 패킹리스트 짐 생성 - 필요한 값 없음', (done) => {
    req(app)
      .post('/packingList/alone/pack')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        name: '',
        categoryId: '',
        listId: '',
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

describe('PATCH /packingList/alone/pack', () => {
  it('혼자 패킹리스트 짐 수정 성공', (done) => {
    req(app)
      .patch('/packingList/alone/pack')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62bbb80d9d5dc1aa4c3d2839',
        name: '보조배터리',
        isChecked: true,
        listId: '62bbb80d9d5dc1aa4c3d2839',
        categoryId: '62bbb80d9d5dc1aa4c3d2839',
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

  it('혼자 패킹리스트 짐 수정 - 필요한 값 없음', (done) => {
    req(app)
      .patch('/packingList/alone/pack')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '',
        name: '',
        listId: '',
        categoryId: '',
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

describe('DELETE /packingList/alone/pack/:listId/:categoryId/:packId', () => {
  it('혼자 패킹 리스트 짐 삭제', (done) => {
    req(app)
      .delete(
        '/packingList/alone/pack/62d9854c24ff58dcf71797e2/62d987a207a7c2aa188b19e8/62d997fd5bbce90a6e069590',
      )
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

describe('GET /folder/packingList/alone/62d9842924ff58dcf71797cf', () => {
  it('폴더 안 혼자 패킹 리스트들 조회', (done) => {
    req(app)
      .get('/folder/packingList/alone/')
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

describe('GET /packingList/alone/:listId', () => {
  it('혼자 패킹리스트 상세조회 성공', (done) => {
    req(app)
      .get('/packingList/alone/62d9854c24ff58dcf71797e2')
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

describe('DELETE /packingList/alone/:folderId/:listId', () => {
  it('혼자 패킹리스트 삭제', (done) => {
    req(app)
      .delete('/packingList/alone/62d987a207a7c2aa188b19e8/62d9854c24ff58dcf71797e2')
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
