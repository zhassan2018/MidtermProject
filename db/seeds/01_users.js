exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, email: 't@gmail.com', password: '123'}),
        knex('users').insert({id: 2, email: 'm@gmail.com', password: '456'}),
        knex('users').insert({id: 3, email: 'z@gmail.com', password: '789'})
      ]);
    });
};
