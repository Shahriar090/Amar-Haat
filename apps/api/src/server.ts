import dotenv from 'dotenv';
import mongoose from 'mongoose';
import type { Server } from 'node:http';
import app from './app.js';
dotenv.config();
const PORT = process.env.PORT || 3000;

// biome-ignore lint/correctness/noUnusedVariables: <the variable 'server' will be used later>
let server: Server;
async function main() {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log('🚀 Database Connected Successfully');

		server = app.listen(PORT, () => {
			console.log(`🚀 Amar-Haat Server Is Listening On Port => http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('❌ Failed To Connected With Database', err);
		process.exit(1);
	}
}

main();
