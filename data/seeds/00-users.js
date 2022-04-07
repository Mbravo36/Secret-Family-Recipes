
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, username: 'Mari', password: "$2a$08$yapu7N7uRtP/Q7xnFT/eHuo.zQkOqz0l6zZwj/RoUCD.js7WsRuRS"},
        {user_id: 2, username: 'Jerry', password: "$2a$08$58p83FYNfYJgPFGR.GkyneambiKZ6hSmyK2.BOCx.yqUpj1c90U5a"},
        {user_id: 3, username: 'Benji', password: "$2a$08$ht7C0q8R3URsfZVZOsAOsunh9YzVjWvjJRu1WsD9BfuD1Y6lsHhqW"}
      ]);
    });
};
