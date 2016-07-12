const req = require('supertest');
const koa = require('koa');
const param = require('.');

const app = koa();
app
  .use(param('/users/:id', function* (id, next) {
    this.id = id;
    yield* next;
  }))
  .use(function* () {
    this.body = this.id || 'foo';
  });
const server = app.listen();

describe('koa-param', function () {
  it('should handle', function (done) {
    req(server)
      .get('/users/123')
      .expect(200, '123', done);
  });
  it('should handle', function (done) {
    req(server)
      .get('/users/123/action/foo')
      .expect(200, '123', done);
  });
  it('should skip', function (done) {
    req(server)
      .get('/foobar/123')
      .expect(200, 'foo', done);
  });
});
