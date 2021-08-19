const fs = require('fs');
const path = require( 'path' );
const pinataSDK = require('@pinata/sdk');

const API_KEY = fs.readFileSync("./.IPFS_API_KEY").toString().trim();
const API_SECRET = fs.readFileSync("./.IPFS_API_SECRET").toString().trim();

const sources = 'path/to/source/folder':

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
	for ( const source of sources ) {
		try {
			const pinata = pinataSDK(API_KEY, API_SECRET);
			const files = await fs.promises.readdir( source );

			for ( const file of files ) {
				const filepath = path.join( source, file );
				const readableStreamForFile = fs.createReadStream( filepath );

				// Stat the file to see if we have a file or dir
				const stat = await fs.promises.stat( filepath );

				if( stat.isFile() ) {
					pinata.pinFileToIPFS( readableStreamForFile ).then(result => {
						result['name'] = file;
						console.log( result );
						let log = {
							'hash': result['IpfsHash'],
							'name': file
						}
						let jsonContent = JSON.stringify( log );

						fs.appendFileSync( 'path/to/output.json', jsonContent, 'utf8', err => {
							if ( err ) {
								console.log( 'An error occured while writing JSON Object to File.' );
								return console.log( err );
							}
						});
					}).catch(err => {
						console.log( err );
						err['filename'] = file;
						fs.appendFileSync( 'path/to/error.json', JSON.stringify( err ), 'utf8', error => {
							if ( error ) {
								console.log( 'An error occured while writing JSON Object to File.' );
								return console.log( error );
							}
						});
					});
					console.log("Waiting after pin...");
					await sleep(2000);
				}
				else if( stat.isDirectory() ) {
					console.log( "'%s' is a directory.", filepath );
				}
			}
		}
		catch ( err ) {
			return console.log(err);
		}
	}
})();
