'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.sequelize
            .query(`CREATE TRIGGER updated_realtime_trigger AFTER INSERT ON sensor_data
                  FOR EACH ROW EXECUTE PROCEDURE notify_realtime();
            `);
    },

    async down(queryInterface, Sequelize) {
        queryInterface.sequelize.query('DROP TRIGGER updated_realtime_trigger');
    },
};
