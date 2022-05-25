'use strict';
const User = require('../models').user;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = await User.findAll();

        return queryInterface.bulkInsert('devices', [
            {
                id: uuidv4(),
                user_id: users[0].id,
                name: 'Device A',
                code: 'GRP-01',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('devices', null, {});
    },
};
