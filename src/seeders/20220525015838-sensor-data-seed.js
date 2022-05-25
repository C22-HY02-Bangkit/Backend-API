'use strict';
const Device = require('../models').device;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        const devices = await Device.findAll();

        return queryInterface.bulkInsert('sensor_data', [
            {
                id: uuidv4(),
                device_id: devices[0].id,
                ph: 1,
                tds: 1,
                ec: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('sensor_data', null, {});
    },
};
