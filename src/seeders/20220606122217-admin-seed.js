'use strict';
const { genSaltSync, hashSync } = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('admins', [
            {
                id: uuidv4(),
                username: 'admin',
                password: hashSync('123123', genSaltSync(10)),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                username: 'admin2',
                password: hashSync('123123', genSaltSync(10)),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('admins', null, {});
    },
};
