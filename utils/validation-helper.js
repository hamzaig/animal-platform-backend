/* eslint-disable prefer-regex-literals */
module.exports = {
	base64ImageRegex: new RegExp(/^data:image\/([a-zA-Z]*);base64,([^"]*)$/),
	mongoIdRegex: new RegExp(/^[a-f\d]{24}$/i),
};

module.exports.base64ImgPattern = new RegExp();
