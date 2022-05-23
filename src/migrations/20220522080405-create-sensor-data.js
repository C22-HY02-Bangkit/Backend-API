'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sensor_data', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: v4(),
            },
            device_id: {
                type: Sequelize.STRING,
            },
            ph: {
                type: Sequelize.INTEGER,
            },
            tds: {
                type: Sequelize.INTEGER,
            },
            ec: {
                type: Sequelize.INTEGER,
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
