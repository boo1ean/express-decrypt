## express-decrypt

Express middleware for decryption of base64-encoded RSA-encrypted request bodies

## Installations

```
npm install express-decrypt
```

## Usage

```js
var fs = require('fs');
var app = require('express')();
var expressDecrypt = require('express-decrypt');

app.use(expressDecrypt({
	privateKey: fs.readFileSync('private_key.pem').toString()
}));

app.all('*', function (req, res) {
	var jsonData = JSON.parse(req.body);
	res.json(jsonData);
});

app.listen(3000);
```

## Options

`privateKey` - private key pem string
`padding` - see [ursa](https://github.com/quartzjer/ursa#constants)

## License

MIT
