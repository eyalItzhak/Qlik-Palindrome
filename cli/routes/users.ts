import { Command } from "commander";
import axios from 'axios';
import { loadCookies, saveCookies } from "../cookie";
import { baseUser } from "../const/demmyData";
import { BASE_URL } from "../const/Urls";

export const usersCommandConfig = (program: Command) => {
    program
        .command('users')
        .description('Prints a hello message')
        .action(() => {
            for (let i = 0; i < baseUser.length; i++) {
                console.log(`User ${i + 1}: ${baseUser[i].name}, Password: ${baseUser[i].password}`);
            }
        });

    program.command('login')
        .description('Login to the system')
        .option('-u, --username <username>', 'Your username')
        .option('-p, --password <password>', 'Your password')
        .action(async (options) => {
            if (!options.username || !options.password) {
                console.error('Error: Username and password are required.');
                process.exit(1);
            }

            console.log(`Logging in with username: ${options.username}`);
            console.log(`Password: ${options.password}`);
            try {
                const response = await axios.post(`${BASE_URL}/api/users/signin`, {
                    email: options.username,
                    password: options.password,
                }, {
                    withCredentials: true,
                });


                const cookie = response.headers['set-cookie']?.[0];
                if (cookie) {
                    saveCookies(cookie);
                    console.log('Login successful! Cookie saved.');
                } else {
                    console.log('Login successful, but no cookie received.');
                }

            } catch (error: any) {
                console.error('Login failed:', error.response?.data || error.message);
            }

        })
    program.command('cookie')
        .description('Get the saved cookie')
        .action(() => {
            const cookie = loadCookies();
            if (cookie) {
                console.log('Saved Cookie:', cookie);
            } else {
                console.log('No cookie saved.');
            }
        });

    program.command('howami')
        .description('Check the user status')
        .action(async () => {
            const cookie = loadCookies();
            const howAmI = await axios.get(`${BASE_URL}/api/users/currentuser`, {
                headers: {
                    'Cookie': cookie
                },
                withCredentials: true,
            })
            console.log('Users command configured.', howAmI.data);
        })


}
