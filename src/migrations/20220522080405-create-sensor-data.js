'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sensor_data', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            device_id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            ph: {
                type: Sequelize.FLOAT,
            },
            tds: {
                type: Sequelize.FLOAT,
            },
            ec: {
                type: Sequelize.FLOAT,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('sensor_data');
    },
};
