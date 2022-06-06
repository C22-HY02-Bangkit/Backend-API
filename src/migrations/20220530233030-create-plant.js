'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('plants', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                type: Sequelize.STRING,
            },
            min_ph: {
                type: Sequelize.INTEGER,
            },
            max_ph: {
                type: Sequelize.INTEGER,
            },
            min_tds: {
                type: Sequelize.INTEGER,
            },
            max_tds: {
                type: Sequelize.INTEGER,
            },
            min_ec: {
                type: Sequelize.INTEGER,
            },
            max_ec: {
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
