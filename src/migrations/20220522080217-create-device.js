'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('devices', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            user_id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            plant_id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                type: Sequelize.STRING,
            },
            code: {
                type: Sequelize.STRING,
                unique: true,
            },
            min_ph: {
                type: Sequelize.FLOAT,
            },
            max_ph: {
                type: Sequelize.FLOAT,
            },
            min_tds: {
                type: Sequelize.FLOAT,
            },
            max_tds: {
                type: Sequelize.FLOAT,
            },
            min_ec: {
                type: Sequelize.FLOAT,
            },
            max_ec: {
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
        await queryInterface.dropTable('devices');
    },
};
