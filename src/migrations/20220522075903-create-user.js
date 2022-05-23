'use strict';

const { v4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: v4(),
            },
            fullname: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            verify_user: {
                type: Sequelize.BOOLEAN,
            },
            email_verify_token: {
                type: Sequelize.STRING,
            },
            email_verify_expires: {
                type: Sequelize.DATE,
            },
            password_change_at: {
                type: Sequelize.DATE,
            },
            password_reset_token: {
                type: Sequelize.STRING,
            },
            password_reset_expires: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('users');
    },
};
