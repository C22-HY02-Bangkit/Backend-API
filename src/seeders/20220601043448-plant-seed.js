'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('plants', [
            {
                id: uuidv4(),
                name: 'Sawi',
                ph: 12,
                tds: 3,
                ec: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Bayam',
                ph: 32,
                tds: 31,
                ec: 34,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('plants', null, {});
    },
};
