'use strict';
const User = require('../models').user;
const Plant = require('../models').plant;
const Product = require('../models').product;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = await User.findAll();
        const plants = await Plant.findAll();
        const products = await Product.findAll();
        return queryInterface.bulkInsert('devices', [
            {
                id: uuidv4(),
                user_id: users[0].id,
                plant_id: plants[0].id,
                product_id: products[0].id,
                description: 'Device di belakang rumah',
                min_ph: plants[0].min_ph,
                max_ph: plants[0].max_ph,
                min_tds: plants[0].min_tds,
                max_tds: plants[0].max_tds,
                min_ec: plants[0].min_ec,
                max_ec: plants[0].max_ec,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('devices', null, {});
    },
};
