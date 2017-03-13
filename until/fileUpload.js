/**
 * 文件上传设置
 * @type {[type]}
 */
var path = require('path'),
	constVar = require(path.join(constVarPath)),
	debug = require("debug")("fileUpload"),
	multiparty = require('multiparty'),
	sizeOfImg = require('image-size'),
	stateCode = require(path.join(constVar.configPath, 'stateCode'));

function fileUpload(req,options, func) {

	var form = new multiparty.Form(options);

	form.parse(req, function(err, fields, files) {

		if (err) {
			debug(err);
			func(stateCode.fileUploadFail());
			return;
		}
		let filesObj = {};
		debug(files);
		Object.keys(files).forEach(function(name) {

			if (files[name][0] != 'undefined') {
				let nowFile = files[name][0];
				let fileType = nowFile.headers['content-type'].indexOf('image');

				//获取图片的宽高信息，如果是图片
				let imageSize = {};

				if (fileType >= 0) {
					imageSize = sizeOfImg(nowFile.path);
					debug(imageSize);
				}

				filesObj[name] = {
					fieldName: name,
					originalFilename: nowFile.originalFilename,
					type: nowFile.headers['content-type'],
					size: nowFile.size,
					path: nowFile.path,
					width: imageSize.width || 0,
					height: imageSize.height || 0
				};
			}
		});

		debug(fields);
		debug(filesObj);

		func(stateCode.success({
			files: filesObj,
			fields: fields,
			moreInfo: "文件保存到磁盘成功"
		}));
	});
}

/**
 * 
 * name:asd;filed:111
filw1 [ { fieldName: 'filw1',
    originalFilename: '20160424002836_yuZK4.thumb.700_0.jpeg',
    path: 'F:\\font-end-project\\HEL\\public\\uploadTemp\\u4npi0ymALC71BK89rtoXqTd.jpeg',
    headers:
     { 'content-disposition': 'form-data; name="filw1"; filename="20160424002836_yuZK4.thumb.700_0.jpeg"',
       'content-type': 'image/jpeg' },
    size: 30718 } ]
 */

module.exports = exports = fileUpload;