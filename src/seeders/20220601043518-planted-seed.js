'use strict';
const Device = require('../models').device;
const Plant = require('../models').plant;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        const plants = await Plant.findAll();
        const devices = await Device.findAll();

        return queryInterface.bulkInsert('planteds', [
            {
                id: uuidv4(),
                plant_id: plants[0].id,
                device_id: devices[0].id,
                ph: 12,
                tds: 12,
                ec: 12,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('planteds', null, {});
    },
};
