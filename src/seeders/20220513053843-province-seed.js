'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('provinces', [
            {
                name: 'ACEH',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'SUMATERA UTARA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'SUMATERA BARAT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'RIAU',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'JAMBI',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'SUMATERA SELATAN',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'BENGKULU',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'LAMPUNG',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'KEPULAUAN BANGKA BELITUNG',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'KEPULAUAN RIAU',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'DKI JAKARTA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'JAWA BARAT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'JAWA TENGAH',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'DAERAH ISTIMEWA YOGYAKARTA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'JAWA TIMUR',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'BANTEN',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'BALI',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'NUSA TENGGARA BARAT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'NUSA TENGGARA TIMUR',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'KALIMANTAN BARAT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'KALIMANTAN TENGAH',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'KALIMANTAN SELATAN',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'KALIMANTAN TIMUR',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'KALIMANTAN UTARA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'SULAWESI UTARA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'SULAWESI TENGAH',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'SULAWESI SELATAN',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'SULAWESI TENGGARA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'GORONTALO',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'SULAWESI BARAT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'MALUKU',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'MALUKU UTARA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'P A P U A',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'PAPUA BARAT',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('provinces', null, {});
    },
};
