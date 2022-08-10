/* eslint-disable */
import req from 'supertest';
const dotenv = require('dotenv');

import app from '../index';
dotenv.config();

describe('POST /packingList/together', () => {
  it('함께 패킹리스트 생성 성공', (done) => {
    req(app)
      .post('/packingList/together')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        departureDate: '2022-07-11',
        folderId: '62d9844f07a7c2aa188b1982',
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

  it('함께 패킹리스트 생성 - 필요한 값 없음', (done) => {
    req(app)
      .post('/packingList/together')
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

describe('POST /packingList/together/category', () => {
  it('함께 패킹리스트 카테고리 생성 성공', (done) => {
    req(app)
      .post('/packingList/together/category')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        name: '필수',
        listId: '62d984fb07a7c2aa188b1989',
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

  it('함께 패킹리스트 카테고리 생성 - 필요한 값 없음', (done) => {
    req(app)
      .post('/packingList/together/category')
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

describe('PATCH /packingList/together/category', () => {
  it('함께 패킹리스트 카테고리 수정 성공', (done) => {
    req(app)
      .patch('/packingList/together/category')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d9878424ff58dcf7179888',
        name: '필수',
        listId: '62d984fb07a7c2aa188b1989',
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

  it('함께 패킹리스트 카테고리 수정 - 필요한 값 없음', (done) => {
    req(app)
      .patch('/packingList/together/category')
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

describe('DELETE /packingList/together/category/:listId/:categoryId', () => {
  it('함께 패킹 리스트 카테고리 삭제', (done) => {
    req(app)
      .delete('packingList/together/category/62d9854c24ff58dcf71797e2/62d987a207a7c2aa188b19e8')
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

describe('POST /packingList/together/pack ', () => {
  it('함께 패킹리스트 짐 생성 성공', (done) => {
    req(app)
      .post('/packingList/together/pack')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        name: '필수',
        categoryId: '62d9878424ff58dcf7179888',
        listId: '62d984fb07a7c2aa188b1989',
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

  it('함께 패킹리스트 짐 생성 - 필요한 값 없음', (done) => {
    req(app)
      .post('/packingList/together/pack')
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

describe('PATCH /packingList/together/pack', () => {
  it('함께 패킹리스트 짐 수정 성공', (done) => {
    req(app)
      .patch('/packingList/together/pack')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.USER_TOKEN)
      .send({
        _id: '62d9878424ff58dcf7179888',
        name: '보조배터리',
        isChecked: true,
        listId: '62d984fb07a7c2aa188b1989',
        categoryId: '62d9878424ff58dcf7179888',
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

  it('함께 패킹리스트 짐 수정 - 필요한 값 없음', (done) => {
    req(app)
      .patch('/packingList/together/pack')
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

describe('DELETE /packingList/together/pack/:listId/:categoryId/:packId', () => {
  it('함께 패킹 리스트 짐 삭제', (done) => {
    req(app)
      .delete(
        '/packingList/together/pack/62d9854c24ff58dcf71797e2/62d987a207a7c2aa188b19e8/62d997fd5bbce90a6e069590',
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

describe('GET /folder/packingList/together/62d9842924ff58dcf71797cf', () => {
  it('폴더 안 함께 패킹 리스트들 조회', (done) => {
    req(app)
      .get('/folder/packingList/together/')
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

describe('GET /packingList/together/:listId', () => {
  it('함께 패킹리스트 상세조회 성공', (done) => {
    req(app)
      .get('/packingList/together/62d984fb07a7c2aa188b1989')
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

describe('DELETE /packingList/together/:folderId/:listId', () => {
  it('함께 패킹리스트 삭제', (done) => {
    req(app)
      .DELETE('/packingList/together/62d9844f07a7c2aa188b1982/62d99a53698e83fb0b94a197')
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
