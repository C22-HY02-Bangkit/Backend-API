'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('plants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
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
        await queryInterface.dropTable('plants');
    },
};
