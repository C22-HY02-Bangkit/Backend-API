'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('products', [
            {
                id: uuidv4(),
                title: 'Grp-01 Pro',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                title: 'Grp-01 Pro Max',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('products', null, {});
    },
};
