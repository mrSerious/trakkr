import { generatePasswordHash } from '../../utils/password';

export default {
  up: (queryInterface/* , Sequelize */) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      userName: 'demoUser1',
      password: generatePasswordHash('applicationUser1'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface/* , Sequelize */) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
