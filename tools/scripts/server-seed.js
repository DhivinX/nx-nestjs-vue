#!/usr/bin node

const shell = require('shelljs');

const users = [
    {
        email: 'admin@admin.com',
        password: '123456',
        role: 'admin',
        firstName: 'John',
        lastName: 'Doe',
    },
];

shell.exec(`npx nx run server:build-cli`);

for (const user of users) {
    console.log(`Create user: ${user.email}`);
    shell.exec(`node dist/apps/server-cli/main.js newuser ${user.email} ${user.password} ${user.role} ${user.firstName} ${user.lastName}`);
}
