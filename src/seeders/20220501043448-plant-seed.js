'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('plants', [
            {
                id: uuidv4(),
                name: 'Sawi',
                min_ph: 10,
                max_ph: 12,
                min_tds: 10,
                max_tds: 12,
                min_ec: 10,
                max_ec: 12,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Bayam',
                min_ph: 10,
                max_ph: 12,
                min_tds: 10,
                max_tds: 12,
                min_ec: 10,
                max_ec: 12,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('plants', null, {});
    },
};
