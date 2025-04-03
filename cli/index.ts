#!/usr/bin/env node

import { Command } from 'commander';
import { usersCommandConfig } from './routes/users';
import { messagesConfig } from './routes/messages';
import { devConfig } from './routes/dev';

const program = new Command();
usersCommandConfig(program);
messagesConfig(program);
devConfig(program);

async function main() {
    console.log('Starting CLI...');
    await program.parseAsync(process.argv);
}

main();




