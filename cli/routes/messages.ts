
import { Command } from "commander";
import { loadCookies } from "../cookie";
import axios from "axios";
import { BASE_URL } from "../const/Urls";

export const messagesConfig = (program: Command) => {

    program
        .command('publishmessage')
        .description('publish new nessage')
        .option('-c, --content <content>', 'Your  msg content')
        .action(async (options) => {
            const cookie = loadCookies();
            if (!cookie || !options.content) {
                console.error('Error: No cookie found. Please login first.');
                process.exit(1);
            }
            const result = await axios.post(`${BASE_URL}/api/messages/postMessage`, { messageContent: options.content }, {
                headers: {
                    'Cookie': cookie
                },
                withCredentials: true,
            })

            console.log('result', result.data)
        });

    program.command('getmessages')
        .description('Get all my messages')
        .action(async () => {
            const cookie = loadCookies();
            if (!cookie) {
                console.error('Error: No cookie found. Please login first.');
                process.exit(1);
            }
            const result = await axios.get(`${BASE_URL}/api/messages/getMyMessage`, {
                headers: {
                    'Cookie': cookie
                },
                withCredentials: true,
            })
            console.log('result', result.data.data)
        });

    program.command('modifymessage')
        .description('Modify my message')
        .option('-m, --messageId <messageId>', 'Your message id')
        .option('-c, --content <content>', 'Your new msg content')
        .action(async (options) => {
            const cookie = loadCookies();
            if (!cookie || !options.messageId || !options.content) {
                console.error('Error: No cookie found. Please login first.');
                process.exit(1);
            }
            const result = await axios.patch(`${BASE_URL}/api/messages/updateMessage`, { id: options.messageId, content: options.content }, {
                headers: {
                    'Cookie': cookie
                },
                withCredentials: true,
            })
            console.log('result', result.data.modifiedCount > 0 ? 'message change' : 'fail to change message')
        })

    program.command('deletemessage')
        .description('Delete my message')
        .option('-id, --id <id>', 'Your message id')
        .action(async (options) => {
            const cookie = loadCookies();
            if (!cookie || !options.id) {
                console.error('no cookie found. Please login first or messageId is required');
                process.exit(1);
            }
            const result = await axios.delete(`${BASE_URL}/api/messages/deleteMessage`, { data: { id: options.id }, headers: { 'Cookie': cookie }, withCredentials: true })
            console.log('result', result.data.deletedCount > 0 ? 'message deleted' : 'fail to delete message')
        })

}