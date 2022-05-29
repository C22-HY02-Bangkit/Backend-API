'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.sequelize
            .query(`CREATE OR REPLACE function notify_realtime() RETURNS trigger
                  LANGUAGE plpgsql
                  AS $$
                  BEGIN
                  PERFORM pg_notify(
                        'new_data',
                        '{"new":' || row_to_json(NEW)::text  || '}'      
                    );
                  RETURN NULL;
                  END;
                $$;
            `);
    },

    async down(queryInterface, Sequelize) {
        queryInterface.sequelize.query('DROP function notify_realtime');
    },
};
