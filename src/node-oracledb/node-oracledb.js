const oracledb = require('oracledb');
oracledb.autoCommit = true;

async function run() {
	let connection;

	try {
		connection = await oracledb.getConnection({
			user: 'hr',
			password: 'hr',
			connectString: '192.168.234.130:1522/ORCL'
		});

		// Create a new (or open an existing) document collection
		const soda = connection.getSodaDatabase();
		const collectionName = 'nodb_soda_collection';
		const myCollection = await soda.createCollection(collectionName);

		// Insert a new document
		const myContent = { name: 'Sally', address: { city: 'Melbourne' } };
		await myCollection.insertOne(myContent);

		// Print names of people living in Melbourne
		const filterSpec = { 'address.city': 'Melbourne' };
		const myDocuments = await myCollection.find().filter(filterSpec).getDocuments();
		myDocuments.forEach(function(element) {
			const content = element.getContent();
			console.log(content.name + ' lives in Melbourne.');
		});
	} catch (err) {
		console.log('Error in processing:\n', err);
	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch (err) {
				console.log('Error in closing connection:\n', err);
			}
		}
	}
}

run();
