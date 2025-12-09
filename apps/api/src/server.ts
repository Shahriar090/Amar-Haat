import app from '@api/src/app.js';
import config from '@api/src/app/config/index.js';
import mongoose from 'mongoose';
import type { Server } from 'node:http';
const PORT = config.port || 3000;
// biome-ignore lint/correctness/noUnusedVariables: <the variable 'server' will be used later>
let server: Server;
async function main() {
	try {
		await mongoose.connect(config.db_uri);
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
