var ursa = require('ursa');
var getRawBody = require('raw-body');
var typer = require('media-typer');

function buildMiddleware (opts) {
	if (!opts.privateKey || typeof opts.privateKey != 'string') {
		throw new Error('express-decrypt requires privateKey option (private key pem string)');
	}

	var privateKey = ursa.createPrivateKey(opts.privateKey);
	var padding = opts.padding || ursa.RSA_PKCS1_PADDING;

	return function decryptRequestBody (req, res, next) {
		getRawBody(req, {
			length: req.headers['content-length'],
			encoding: typer.parse(req.headers['content-type']).parameters.charset
		}, function decryptBody (err, body) {
			if (err) {
				next(err);
			}

			var result = privateKey.decrypt(body, 'base64', 'utf8', padding);

			req.body = result;
			next();
		});
	}
}

module.exports = buildMiddleware;
