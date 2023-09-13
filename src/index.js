require('dotenv').config();
const app = require('./app');
const host = process.env.HOST;

const main = async () => {
	await app.listen(app.get('port'), () => {
		console.log(`Server executing in http://${host}:${app.get('port')}`);
	});
};

main();
