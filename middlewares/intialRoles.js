const db = require('../models');

const Role = db.role;

const roleInitial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'hr_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "hr_mod" to roles collection');
            });

            new Role({
                name: 'edm_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "edm_mod" to roles collection');
            });

            new Role({
                name: 'tools_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "tools_mod" to roles collection');
            });

            new Role({
                name: 'object_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "object_mod" to roles collection');
            });

            new Role({
                name: 'assembly_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "assembly_mod" to roles collection');
            });

            new Role({
                name: 'billing_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "billing_mod" to roles collection');
            });

            new Role({
                name: 'contracts_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "contracts_mod" to roles collection');
            });

            new Role({
                name: 'support_lite_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "support_lite_mod" to roles collection');
            });

            new Role({
                name: 'support_pro_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "support_pro_mod" to roles collection');
            });

            new Role({
                name: 'support_repair_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "support_repair_mod" to roles collection');
            });

            new Role({
                name: 'user_assembly_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "user_assembly_mod" to roles collection');
            });

            new Role({
                name: 'user_items_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "user_items_mod" to roles collection');
            });

            new Role({
                name: 'cto_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "cto_mod" to roles collection');
            });

            new Role({
                name: 'items_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "items_mod" to roles collection');
            });

            new Role({
                name: 'e-bank_mod'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }

                console.log('added "e-bank_mod" to roles collection');
            });
        }
    });
}

const initial = {
    roleInitial
};
module.exports = initial;