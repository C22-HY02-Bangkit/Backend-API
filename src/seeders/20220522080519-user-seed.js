'use strict';
const { genSaltSync, hashSync } = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                id: uuidv4(),
                fullname: 'user_a',
                email: 'user_a@mail.com',
                password: hashSync('123123', genSaltSync(10)),
                verify_user: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                fullname: 'user_b',
                email: 'user_b@mail.com',
                password: hashSync('123123', genSaltSync(10)),
                verify_user: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    },
};
