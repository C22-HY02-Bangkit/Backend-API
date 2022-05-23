'use strict'
const { genSaltSync, hashSync } = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                fullname: 'naruto',
                email: 'naruto@main.com',
                password:  hashSync('123123', genSaltSync(10)),
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
