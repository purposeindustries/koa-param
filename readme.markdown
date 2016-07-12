# koa-param

> resolve url params

## install

```sh
$ npm install koa-param
```

## usage

```js
import koa from 'koa';
import param from 'koa-param';

const app = koa();

app
  .use(param('/users/:id', resolve))
  .use(show);

function* resolve(id, next) {
  this.id = id;
  yield* next;
}

function* show() {
  this.body = this.id;
}

// > GET /users/123
// < 123
```

## license

MIT
