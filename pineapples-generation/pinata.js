const fs = require('fs');
const path = require( 'path' );
const pinataSDK = require('@pinata/sdk');

const API_KEY = fs.readFileSync("./.IPFS_API_KEY").toString().trim();
const API_SECRET = fs.readFileSync("./.IPFS_API_SECRET").toString().trim();

const sources = [
	'./_output/images/0000-0999/000-099/00-19/',
	'./_output/images/0000-0999/000-099/20-39/',
	'./_output/images/0000-0999/000-099/40-59/',
	'./_output/images/0000-0999/000-099/60-79/',
	'./_output/images/0000-0999/000-099/80-99/',
	'./_output/images/0000-0999/100-199/00-19/',
	'./_output/images/0000-0999/100-199/20-39/',
	'./_output/images/0000-0999/100-199/40-59/',
	'./_output/images/0000-0999/100-199/60-79/',
	'./_output/images/0000-0999/100-199/80-99/',
	'./_output/images/0000-0999/200-299/00-19/',
	'./_output/images/0000-0999/200-299/20-39/',
	'./_output/images/0000-0999/200-299/40-59/',
	'./_output/images/0000-0999/200-299/60-79/',
	'./_output/images/0000-0999/200-299/80-99/',
	'./_output/images/0000-0999/300-399/00-19/',
	'./_output/images/0000-0999/300-399/20-39/',
	'./_output/images/0000-0999/300-399/40-59/',
	'./_output/images/0000-0999/300-399/60-79/',
	'./_output/images/0000-0999/300-399/80-99/',
	'./_output/images/0000-0999/400-499/00-19/',
	'./_output/images/0000-0999/400-499/20-39/',
	'./_output/images/0000-0999/400-499/40-59/',
	'./_output/images/0000-0999/400-499/60-79/',
	'./_output/images/0000-0999/400-499/80-99/',
	'./_output/images/0000-0999/500-599/00-19/',
	'./_output/images/0000-0999/500-599/20-39/',
	'./_output/images/0000-0999/500-599/40-59/',
	'./_output/images/0000-0999/500-599/60-79/',
	'./_output/images/0000-0999/500-599/80-99/',
	'./_output/images/0000-0999/600-699/00-19/',
	'./_output/images/0000-0999/600-699/20-39/',
	'./_output/images/0000-0999/600-699/40-59/',
	'./_output/images/0000-0999/600-699/60-79/',
	'./_output/images/0000-0999/600-699/80-99/',
	'./_output/images/0000-0999/700-799/00-19/',
	'./_output/images/0000-0999/700-799/20-39/',
	'./_output/images/0000-0999/700-799/40-59/',
	'./_output/images/0000-0999/700-799/60-79/',
	'./_output/images/0000-0999/700-799/80-99/',
	'./_output/images/0000-0999/800-899/00-19/',
	'./_output/images/0000-0999/800-899/20-39/',
	'./_output/images/0000-0999/800-899/40-59/',
	'./_output/images/0000-0999/800-899/60-79/',
	'./_output/images/0000-0999/800-899/80-99/',
	'./_output/images/0000-0999/900-999/00-19/',
	'./_output/images/0000-0999/900-999/20-39/',
	'./_output/images/0000-0999/900-999/40-59/',
	'./_output/images/0000-0999/900-999/60-79/',
	'./_output/images/0000-0999/900-999/80-99/',
	'./_output/images/1000-1999/000-099/00-19/',
	'./_output/images/1000-1999/000-099/20-39/',
	'./_output/images/1000-1999/000-099/40-59/',
	'./_output/images/1000-1999/000-099/60-79/',
	'./_output/images/1000-1999/000-099/80-99/',
	'./_output/images/1000-1999/100-199/00-19/',
	'./_output/images/1000-1999/100-199/20-39/',
	'./_output/images/1000-1999/100-199/40-59/',
	'./_output/images/1000-1999/100-199/60-79/',
	'./_output/images/1000-1999/100-199/80-99/',
	'./_output/images/1000-1999/200-299/00-19/',
	'./_output/images/1000-1999/200-299/20-39/',
	'./_output/images/1000-1999/200-299/40-59/',
	'./_output/images/1000-1999/200-299/60-79/',
	'./_output/images/1000-1999/200-299/80-99/',
	'./_output/images/1000-1999/300-399/00-19/',
	'./_output/images/1000-1999/300-399/20-39/',
	'./_output/images/1000-1999/300-399/40-59/',
	'./_output/images/1000-1999/300-399/60-79/',
	'./_output/images/1000-1999/300-399/80-99/',
	'./_output/images/1000-1999/400-499/00-19/',
	'./_output/images/1000-1999/400-499/20-39/',
	'./_output/images/1000-1999/400-499/40-59/',
	'./_output/images/1000-1999/400-499/60-79/',
	'./_output/images/1000-1999/400-499/80-99/',
	'./_output/images/1000-1999/500-599/00-19/',
	'./_output/images/1000-1999/500-599/20-39/',
	'./_output/images/1000-1999/500-599/40-59/',
	'./_output/images/1000-1999/500-599/60-79/',
	'./_output/images/1000-1999/500-599/80-99/',
	'./_output/images/1000-1999/600-699/00-19/',
	'./_output/images/1000-1999/600-699/20-39/',
	'./_output/images/1000-1999/600-699/40-59/',
	'./_output/images/1000-1999/600-699/60-79/',
	'./_output/images/1000-1999/600-699/80-99/',
	'./_output/images/1000-1999/700-799/00-19/',
	'./_output/images/1000-1999/700-799/20-39/',
	'./_output/images/1000-1999/700-799/40-59/',
	'./_output/images/1000-1999/700-799/60-79/',
	'./_output/images/1000-1999/700-799/80-99/',
	'./_output/images/1000-1999/800-899/00-19/',
	'./_output/images/1000-1999/800-899/20-39/',
	'./_output/images/1000-1999/800-899/40-59/',
	'./_output/images/1000-1999/800-899/60-79/',
	'./_output/images/1000-1999/800-899/80-99/',
	'./_output/images/1000-1999/900-999/00-19/',
	'./_output/images/1000-1999/900-999/20-39/',
	'./_output/images/1000-1999/900-999/40-59/',
	'./_output/images/1000-1999/900-999/60-79/',
	'./_output/images/1000-1999/900-999/80-99/',
	'./_output/images/2000-2999/000-099/00-19/',
	'./_output/images/2000-2999/000-099/20-39/',
	'./_output/images/2000-2999/000-099/40-59/',
	'./_output/images/2000-2999/000-099/60-79/',
	'./_output/images/2000-2999/000-099/80-99/',
	'./_output/images/2000-2999/100-199/00-19/',
	'./_output/images/2000-2999/100-199/20-39/',
	'./_output/images/2000-2999/100-199/40-59/',
	'./_output/images/2000-2999/100-199/60-79/',
	'./_output/images/2000-2999/100-199/80-99/',
	'./_output/images/2000-2999/200-299/00-19/',
	'./_output/images/2000-2999/200-299/20-39/',
	'./_output/images/2000-2999/200-299/40-59/',
	'./_output/images/2000-2999/200-299/60-79/',
	'./_output/images/2000-2999/200-299/80-99/',
	'./_output/images/2000-2999/300-399/00-19/',
	'./_output/images/2000-2999/300-399/20-39/',
	'./_output/images/2000-2999/300-399/40-59/',
	'./_output/images/2000-2999/300-399/60-79/',
	'./_output/images/2000-2999/300-399/80-99/',
	'./_output/images/2000-2999/400-499/00-19/',
	'./_output/images/2000-2999/400-499/20-39/',
	'./_output/images/2000-2999/400-499/40-59/',
	'./_output/images/2000-2999/400-499/60-79/',
	'./_output/images/2000-2999/400-499/80-99/',
	'./_output/images/2000-2999/500-599/00-19/',
	'./_output/images/2000-2999/500-599/20-39/',
	'./_output/images/2000-2999/500-599/40-59/',
	'./_output/images/2000-2999/500-599/60-79/',
	'./_output/images/2000-2999/500-599/80-99/',
	'./_output/images/2000-2999/600-699/00-19/',
	'./_output/images/2000-2999/600-699/20-39/',
	'./_output/images/2000-2999/600-699/40-59/',
	'./_output/images/2000-2999/600-699/60-79/',
	'./_output/images/2000-2999/600-699/80-99/',
	'./_output/images/2000-2999/700-799/00-19/',
	'./_output/images/2000-2999/700-799/20-39/',
	'./_output/images/2000-2999/700-799/40-59/',
	'./_output/images/2000-2999/700-799/60-79/',
	'./_output/images/2000-2999/700-799/80-99/',
	'./_output/images/2000-2999/800-899/00-19/',
	'./_output/images/2000-2999/800-899/20-39/',
	'./_output/images/2000-2999/800-899/40-59/',
	'./_output/images/2000-2999/800-899/60-79/',
	'./_output/images/2000-2999/800-899/80-99/',
	'./_output/images/2000-2999/900-999/00-19/',
	'./_output/images/2000-2999/900-999/20-39/',
	'./_output/images/2000-2999/900-999/40-59/',
	'./_output/images/2000-2999/900-999/60-79/',
	'./_output/images/2000-2999/900-999/80-99/',
	'./_output/images/3000-3999/000-099/00-19/',
	'./_output/images/3000-3999/000-099/20-39/',
	'./_output/images/3000-3999/000-099/40-59/',
	'./_output/images/3000-3999/000-099/60-79/',
	'./_output/images/3000-3999/000-099/80-99/',
	'./_output/images/3000-3999/100-199/00-19/',
	'./_output/images/3000-3999/100-199/20-39/',
	'./_output/images/3000-3999/100-199/40-59/',
	'./_output/images/3000-3999/100-199/60-79/',
	'./_output/images/3000-3999/100-199/80-99/',
	'./_output/images/3000-3999/200-299/00-19/',
	'./_output/images/3000-3999/200-299/20-39/',
	'./_output/images/3000-3999/200-299/40-59/',
	'./_output/images/3000-3999/200-299/60-79/',
	'./_output/images/3000-3999/200-299/80-99/',
	'./_output/images/3000-3999/300-399/00-19/',
	'./_output/images/3000-3999/300-399/20-39/',
	'./_output/images/3000-3999/300-399/40-59/',
	'./_output/images/3000-3999/300-399/60-79/',
	'./_output/images/3000-3999/300-399/80-99/',
	'./_output/images/3000-3999/400-499/00-19/',
	'./_output/images/3000-3999/400-499/20-39/',
	'./_output/images/3000-3999/400-499/40-59/',
	'./_output/images/3000-3999/400-499/60-79/',
	'./_output/images/3000-3999/400-499/80-99/',
	'./_output/images/3000-3999/500-599/00-19/',
	'./_output/images/3000-3999/500-599/20-39/',
	'./_output/images/3000-3999/500-599/40-59/',
	'./_output/images/3000-3999/500-599/60-79/',
	'./_output/images/3000-3999/500-599/80-99/',
	'./_output/images/3000-3999/600-699/00-19/',
	'./_output/images/3000-3999/600-699/20-39/',
	'./_output/images/3000-3999/600-699/40-59/',
	'./_output/images/3000-3999/600-699/60-79/',
	'./_output/images/3000-3999/600-699/80-99/',
	'./_output/images/3000-3999/700-799/00-19/',
	'./_output/images/3000-3999/700-799/20-39/',
	'./_output/images/3000-3999/700-799/40-59/',
	'./_output/images/3000-3999/700-799/60-79/',
	'./_output/images/3000-3999/700-799/80-99/',
	'./_output/images/3000-3999/800-899/00-19/',
	'./_output/images/3000-3999/800-899/20-39/',
	'./_output/images/3000-3999/800-899/40-59/',
	'./_output/images/3000-3999/800-899/60-79/',
	'./_output/images/3000-3999/800-899/80-99/',
	'./_output/images/3000-3999/900-999/00-19/',
	'./_output/images/3000-3999/900-999/20-39/',
	'./_output/images/3000-3999/900-999/40-59/',
	'./_output/images/3000-3999/900-999/60-79/',
	'./_output/images/3000-3999/900-999/80-99/',
	'./_output/images/4000-4999/000-099/00-19/',
	'./_output/images/4000-4999/000-099/20-39/',
	'./_output/images/4000-4999/000-099/40-59/',
	'./_output/images/4000-4999/000-099/60-79/',
	'./_output/images/4000-4999/000-099/80-99/',
	'./_output/images/4000-4999/100-199/00-19/',
	'./_output/images/4000-4999/100-199/20-39/',
	'./_output/images/4000-4999/100-199/40-59/',
	'./_output/images/4000-4999/100-199/60-79/',
	'./_output/images/4000-4999/100-199/80-99/',
	'./_output/images/4000-4999/200-299/00-19/',
	'./_output/images/4000-4999/200-299/20-39/',
	'./_output/images/4000-4999/200-299/40-59/',
	'./_output/images/4000-4999/200-299/60-79/',
	'./_output/images/4000-4999/200-299/80-99/',
	'./_output/images/4000-4999/300-399/00-19/',
	'./_output/images/4000-4999/300-399/20-39/',
	'./_output/images/4000-4999/300-399/40-59/',
	'./_output/images/4000-4999/300-399/60-79/',
	'./_output/images/4000-4999/300-399/80-99/',
	'./_output/images/4000-4999/400-499/00-19/',
	'./_output/images/4000-4999/400-499/20-39/',
	'./_output/images/4000-4999/400-499/40-59/',
	'./_output/images/4000-4999/400-499/60-79/',
	'./_output/images/4000-4999/400-499/80-99/',
	'./_output/images/4000-4999/500-599/00-19/',
	'./_output/images/4000-4999/500-599/20-39/',
	'./_output/images/4000-4999/500-599/40-59/',
	'./_output/images/4000-4999/500-599/60-79/',
	'./_output/images/4000-4999/500-599/80-99/',
	'./_output/images/4000-4999/600-699/00-19/',
	'./_output/images/4000-4999/600-699/20-39/',
	'./_output/images/4000-4999/600-699/40-59/',
	'./_output/images/4000-4999/600-699/60-79/',
	'./_output/images/4000-4999/600-699/80-99/',
	'./_output/images/4000-4999/700-799/00-19/',
	'./_output/images/4000-4999/700-799/20-39/',
	'./_output/images/4000-4999/700-799/40-59/',
	'./_output/images/4000-4999/700-799/60-79/',
	'./_output/images/4000-4999/700-799/80-99/',
	'./_output/images/4000-4999/800-899/00-19/',
	'./_output/images/4000-4999/800-899/20-39/',
	'./_output/images/4000-4999/800-899/40-59/',
	'./_output/images/4000-4999/800-899/60-79/',
	'./_output/images/4000-4999/800-899/80-99/',
	'./_output/images/4000-4999/900-999/00-19/',
	'./_output/images/4000-4999/900-999/20-39/',
	'./_output/images/4000-4999/900-999/40-59/',
	'./_output/images/4000-4999/900-999/60-79/',
	'./_output/images/4000-4999/900-999/80-99/',
]

let jsonFinal = '';

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

						fs.appendFileSync( '_output/output.json', jsonContent, 'utf8', err => {
							if ( err ) {
								console.log( 'An error occured while writing JSON Object to File.' );
								return console.log( err );
							}
						});
					}).catch(err => {
						console.log( err );
						err['filename'] = file;
						fs.appendFileSync( '_output/error.json', JSON.stringify( err ), 'utf8', error => {
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
