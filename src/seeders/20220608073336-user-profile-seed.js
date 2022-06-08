'use strict';
const User = require('../models').user;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = await User.findAll();
        const data = users.map((user) => {
            return {
                id: uuidv4(),
                user_id: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });
        return queryInterface.bulkInsert('user_profiles', data);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('user_profiles', null, {});
    },
};
