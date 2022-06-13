'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_profiles', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            user_id: {
                type: Sequelize.UUID,
            },
            location_privacy: {
                type: Sequelize.BOOLEAN,
            },
            planted_privacy: {
                type: Sequelize.BOOLEAN,
            },
            location: {
                type: Sequelize.JSON,
            },
            phone_number: {
                type: Sequelize.STRING,
            },
            province: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            instagram_url: {
                type: Sequelize.STRING,
            },
            twitter_url: {
                type: Sequelize.STRING,
            },
            facebook_url: {
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
        await queryInterface.dropTable('user_profiles');
    },
};
