
import { Command } from "commander";
import { loadCookies } from "../cookie";
import axios from "axios";
import { BASE_URL } from "../const/Urls";

export const devConfig = (program: Command) => {
    program
        .command('dbrest')
        .description('rest db with users and messages')
        .option('-m, --messages', 'rest db with messages', false) 
        .action(async (options) => {
            try {
                if (options.messages) {
                    const result = await axios.post(`${BASE_URL}/api/dev/restDBWithUsersAndMessages`)
                    console.log('result', result.data)
                } else {
                    const result = await axios.post(`${BASE_URL}/api/dev/restDBWithUsers`)
                    console.log('result', result.data)
                }
            } catch (e) {
                {
                    console.error('Error: No cookie found. Please login first.');
                    process.exit(1);
                }
            }
        });
}