'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('planted', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            plant_id: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('planted');
    },
};
