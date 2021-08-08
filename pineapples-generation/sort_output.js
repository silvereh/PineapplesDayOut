const fs = require('fs');

let json = fs.readFileSync('./_output/output.json');

json.sort((a, b) => {
	return a.name < b.name
});

try {
	fs.writeFileSync('./_output/sorted.json', json)
}
catch (err) {
	console.log('An error occured: ', err);
}
