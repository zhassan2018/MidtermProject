exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('todo').insert({id: 1, user_id: 1, category: 'watch', dontent: 'Iphone'}),
        knex('todo').insert({id: 2, user_id: 2, category: 'read', dontent: 'Barbie'}),
        knex('todo').insert({id: 3, user_id: 2, category: 'buy', dontent: 'Hello'})
      ]);
    });
};
