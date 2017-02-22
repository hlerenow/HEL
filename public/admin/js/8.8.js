/*!
 * **********Created By HL ;*********
 * 
 */
webpackJsonp([8],{

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(79)

	/* script */
	__vue_exports__ = __webpack_require__(81)

	/* template */
	var __vue_template__ = __webpack_require__(82)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "F:\\font-end-project\\HEL\\public\\admin\\src\\components\\file-show.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-416bd80a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-416bd80a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] file-show.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(80);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(35)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-416bd80a!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./file-show.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-416bd80a!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./file-show.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(34)();
	// imports


	// module
	exports.push([module.id, "\n.fileShow{\n\t\tmin-width: 600px;\n}\n.fileShow .fileShowEditor{\n\t\tfloat: right;\n\t\twidth: 300px;\n\t\tmargin:0;\n\t\tborder-left: 1px solid #d8d6d6;\n\t\tpadding:10px 15px;\n\t\theight: 100%;\n}\n.fileShow .showImgCon{\n\t\tdisplay: block;\n\t\toverflow: hidden;\n}\n.fileShow .showImgCon img{\n\t\tmax-width: 100%;\n\t\tmax-height: 450px;\n}\n.fileShow .el-dialog{\n\t\toverflow: hidden;\n}\n.fileName{\n    \tfont-weight: 400;\n}\n.fileShow .details{\n\t\tfont-size: 12px;\n    \tcolor: #666;\n    \tborder-bottom:1px solid #d8d6d6;\n    \tpadding-bottom: 10px;\n}\n.fileShow .details div{\n\t\tmargin-bottom: 5px;\n}\n.fileShow .settings{\n\t\tpadding:10px 0;\n}\n.fileShow .btnS{\n\t    border-radius: 2px;\n\t    background: #f7f7f7;\n\t    margin: 5px 5px;\n\t    font-size: 25px;\n\t    color: #b3b3b3;\n\t    float: right;\n\t    padding: 5px;\n}\n.fileShow .btnS:hover{\n\t\tcolor: white;\n\t\tbackground-color: #4a5f80;\n}\n.fileShow .actions{\n\t\toverflow: hidden;\n\t\tpadding-top: 10px;\n}\n.fileShow .actions .deleteBtn{\n\t\tfloat: left;\n}\n.showImgCon video{\n\t\tmax-width: 100%;\n\t\tmax-height: 100%;\n}\n", ""]);

	// exports


/***/ },

/***/ 81:
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		data: function data() {
			return {};
		},

		props: {
			imgObj: [Object],
			showAction: {
				defualt: true
			}
		},
		computed: {
			filterData: function filterData() {
				var dateObj = new Date(this.imgObj.created * 1000);

				return dateObj.getFullYear() + " 年 " + (dateObj.getMonth() + 1) + " 月 " + dateObj.getDate() + "日";
			},
			filterSize: function filterSize() {
				return this.imgObj.size / 1000 + " KB";
			}
		},
		methods: {
			nextEvent: function nextEvent() {
				this.$bus.$emit("fileShowNext", this.imgObj.fid);
			},
			preEvent: function preEvent() {
				this.$bus.$emit("fileShowPre", this.imgObj.fid);
			},
			deleteFileEvent: function deleteFileEvent() {
				this.$bus.$emit("showFileDelete", this.imgObj.fid);
			}
		},
		mounted: function mounted() {}
	};

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "fileShow"
	  }, [_c('div', {
	    staticClass: "fileShowEditor"
	  }, [_c('div', {
	    staticClass: "details"
	  }, [_c('div', {
	    staticClass: "filename"
	  }, [_c('strong', [_vm._v("文件名：")]), _vm._v(_vm._s(_vm.imgObj.name))]), _vm._v(" "), _c('div', {
	    staticClass: "filename"
	  }, [_c('strong', [_vm._v("文件类型：")]), _vm._v(" " + _vm._s(_vm.imgObj.type))]), _vm._v(" "), _c('div', {
	    staticClass: "uploaded"
	  }, [_c('strong', [_vm._v("上传于：")]), _vm._v(" " + _vm._s(_vm.filterData))]), _vm._v(" "), _c('div', {
	    staticClass: "file-size"
	  }, [_c('strong', [_vm._v("文件大小：")]), _vm._v(" " + _vm._s(_vm.filterSize) + " ")]), _vm._v(" "), _c('div', {
	    staticClass: "dimensions"
	  }, [_c('strong', [_vm._v("分辨率：")]), _vm._v(" " + _vm._s(_vm.imgObj.width) + " × " + _vm._s(_vm.imgObj.height))]), _vm._v(" "), _c('div', {
	    staticClass: "filename"
	  }, [_c('strong', [_vm._v("Url:")]), _vm._v(" " + _vm._s(_vm.imgObj.url) + " ")])]), _vm._v(" "), (_vm.showAction) ? _c('div', {
	    staticClass: "actions"
	  }, [_c('div', {
	    staticClass: "btnS deleteBtn",
	    on: {
	      "click": _vm.deleteFileEvent
	    }
	  }, [_c('i', {
	    staticClass: "el-icon-delete2"
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "btnS nextBtn",
	    on: {
	      "click": _vm.nextEvent
	    }
	  }, [_c('i', {
	    staticClass: "el-icon-arrow-right"
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "btnS preBtn",
	    on: {
	      "click": _vm.preEvent
	    }
	  }, [_c('i', {
	    staticClass: "el-icon-arrow-left"
	  })])]) : _vm._e()]), _vm._v(" "), _c('div', {
	    staticClass: "showImgCon"
	  }, [(_vm.imgObj.type.indexOf('image') >= 0) ? _c('img', {
	    staticClass: "fileShowImg",
	    attrs: {
	      "src": _vm.imgObj.url,
	      "alt": _vm.imgObj.name
	    }
	  }) : (_vm.imgObj.type.indexOf('video') >= 0) ? _c('video', {
	    staticClass: "fileShowImg",
	    attrs: {
	      "src": _vm.imgObj.url,
	      "controls": "controls"
	    }
	  }, [_vm._v("\n\t\t\t您的浏览器不支持 video 标签。\n\t\t\t")]) : (_vm.imgObj.type.indexOf('audio') >= 0) ? _c('audio', {
	    staticClass: "fileShowImg",
	    attrs: {
	      "src": _vm.imgObj.url,
	      "controls": "controls"
	    }
	  }, [_vm._v("\n\t\t\t您的浏览器不支持 video 标签。\n\t\t\t")]) : _c('img', {
	    staticClass: "fileShowImg",
	    attrs: {
	      "src": _vm.imgObj.thumbnail,
	      "alt": _vm.imgObj.name
	    }
	  })])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-416bd80a", module.exports)
	  }
	}

/***/ },

/***/ 92:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(93)

	/* script */
	__vue_exports__ = __webpack_require__(95)

	/* template */
	var __vue_template__ = __webpack_require__(96)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "F:\\font-end-project\\HEL\\public\\admin\\src\\components\\media-add.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-02723994", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-02723994", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] media-add.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(94);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(35)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-02723994!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./media-add.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-02723994!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./media-add.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(34)();
	// imports


	// module
	exports.push([module.id, "\n#mediaAdd .el-upload{\n\tpadding-right: 28px;\n\tpadding-top: 20px;\n}\n#mediaAdd .el-upload,\n#mediaAdd .el-upload__inner.el-dragger{\n\twidth: 100%;\n}\n.el-dragger{\n\tborder-radius: 2px;\n\tborder-style: dashed;\n}\n", ""]);

	// exports


/***/ },

/***/ 95:
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		data: function data() {
			return {
				fileList: []
			};
		},

		props: {
			pFileListShow: {
				default: true
			}
		},
		methods: {
			fileUpSucess: function fileUpSucess(res, file, files) {
				var self = this;
				if (res.state != 200) {
					self.$notify({
						title: '失败',
						message: file.name + " 文件上传失败",
						type: 'error',
						duration: 2000

					});

					for (var i = 0; i < files.length; i++) {
						if (files[i].name = file.name) {
							files = files.splice(i, 1);
							return;
						}
					}
				} else {
					self.$notify({
						title: '成功',
						message: file.name + " 文件上传成功",
						type: 'success',
						duration: 2000

					});
					self.$bus.$emit("fileUploadSuccess", res.opRes);
				}
			},
			fileUpError: function fileUpError(err, res, file) {
				self.$notify({
					title: '失败',
					message: file.name + " 文件上传失败",
					type: 'error',
					duration: 2000
				});
			}
		},
		mounted: function mounted() {}
	};

/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "mediaAdd"
	    }
	  }, [(_vm.pFileListShow) ? _c('h2', {
	    staticClass: "pageTitle"
	  }, [_vm._v("添加媒体")]) : _vm._e(), _vm._v(" "), _c('el-upload', {
	    attrs: {
	      "action": "./api/file/upload ",
	      "type": "drag",
	      "multiple": true,
	      "on-success": _vm.fileUpSucess,
	      "on-error": _vm.fileUpError,
	      "default-file-list": _vm.fileList,
	      "show-upload-list": _vm.pFileListShow
	    }
	  }, [_c('i', {
	    staticClass: "el-icon-upload"
	  }), _vm._v(" "), _c('div', {
	    staticClass: "el-dragger__text"
	  }, [_vm._v("将文件拖到此处，或"), _c('em', [_vm._v("点击上传")])]), _vm._v(" "), _c('div', {
	    staticClass: "el-upload__tip",
	    slot: "tip"
	  }, [_vm._v("文件不能超过128M")])])], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-02723994", module.exports)
	  }
	}

/***/ },

/***/ 97:
/***/ function(module, exports) {

	module.exports = window.$;

/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(121)

	/* template */
	var __vue_template__ = __webpack_require__(127)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "F:\\font-end-project\\HEL\\public\\admin\\src\\views\\admin\\media.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1ea66cf7", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1ea66cf7", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] media.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _fileList = __webpack_require__(122);

	var _fileList2 = _interopRequireDefault(_fileList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		data: function data() {
			return {};
		},

		components: { fileList: _fileList2.default }
	};

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(123)

	/* script */
	__vue_exports__ = __webpack_require__(125)

	/* template */
	var __vue_template__ = __webpack_require__(126)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "F:\\font-end-project\\HEL\\public\\admin\\src\\components\\file-list.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b45a15aa", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-b45a15aa", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] file-list.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(124);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(35)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-b45a15aa!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./file-list.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-b45a15aa!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./file-list.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(34)();
	// imports


	// module
	exports.push([module.id, "\n.funcBtnBar{\n\t\tpadding: 5px 10px;\n\t\tmargin:5px 10px;\n\t\tbox-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);\n}\n.fileCard{\n\t\tpadding-left: 10px;\n}\n.funcBtnBar .el-button{\n\t\tborder-radius: 1px;\n}\n.fileCard  .el-card{\n\t\twidth: 30%;\n\t\tmax-width: 200px;\n\t\theight: 180px;\n\t\tfloat: left;\n\t\tborder-radius: 2px;\n\t\tmargin-right: 10px;\n\t\tmargin-top: 10px;\n\t\tposition: relative;\n}\n.fileListCon img{\n\t\tmax-width: 100%;\n}\n.fileListCon .imgCon{\n\t\twidth: 100%;\n\t\theight: 150px;\n\t\toverflow: hidden;\n\t\tposition: relative;\n    \tbackground-color: #e5eaf1;\n}\n.fileListCon .el-checkbox{\n\t    position: absolute;\n\t    top: 5px;\n\t    right: 5px;\n}\n.fileListCon .fileName {\n\t\tcolor: gray;\n\t\tpadding:5px 20px 5px 10px;\n\t\tposition: relative;  \t\n\t\tborder-top: 1px solid  #f3f2f2;\n}\n.fileListCon .fileName a{\n    \tfont-size: 12px;\t\t\t\t\n\t\tbox-sizing:border-box;\n\t\twidth: 100%;\n\t\tdisplay: block;\n\t\ttext-overflow: ellipsis;\n    \toverflow: hidden;\n\t\twhite-space:nowrap;\n}\n.fileListCon .el-icon-delete{\n\t\tposition: absolute;\n\t\ttop: 5px;\n\t\tright: 5px;\n\t\tcursor: pointer;\n}\n.fileListCon .el-icon-delete:hover{\n\t\tcolor:red;\n}\n.fileListCon .fileCard{\n\t\tcursor: pointer;\n\t\toverflow: auto;\n}\n.delStyle{\n\t\topacity: 0.7;\n}\n\t/*分页*/\n#fileListPagination{\n\t\tmin-width: 300px;\t\n    \toverflow: hidden;\n}\n#fileListPagination .el-pagination{\n\t\tfloat: right;\n\t\tmargin-top: 20px;\t\n\t\tmargin-right: 20px;\n}\n.imgCon img{\n\t    position: absolute;\n\t    top: 50%;\n\t    width: 100%;\n\t    transform: translate(0,-50%);\n}\n.fileUpload{\n\t\tpadding-right: 10px;\n    \tpadding-left: 10px;\n}\n.nofiles{\n\t\tfont-size: 30px;\n\t\tcolor: #bbb7b7;\n\t\ttext-align: center;\n\t\tpadding: 50px;\n}\n", ""]);

	// exports


/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _fileShow = __webpack_require__(78);

	var _fileShow2 = _interopRequireDefault(_fileShow);

	var _mediaAdd = __webpack_require__(92);

	var _mediaAdd2 = _interopRequireDefault(_mediaAdd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = __webpack_require__(97);

	exports.default = {
		data: function data() {
			return {
				delShow: false,
				page: 1,
				pageSize: 10,
				totalFilesCount: 0,
				fileDetailDialog: false,
				files: [],
				nowFile: {},
				checkArry: [],
				uploadState: false
			};
		},

		propos: {
			type: {
				default: 'normal'
			}
		},
		components: { fileShow: _fileShow2.default, mediaAdd: _mediaAdd2.default },
		methods: {
			showMultiBtn: function showMultiBtn() {
				if (this.files.length > 0) {
					this.delShow = !this.delShow;
				}
			},
			createCheckArry: function createCheckArry() {
				var resArry = [];
				for (var i = 0; i < this.files.length; i++) {
					resArry.push({
						fid: this.files[i].fid,
						state: false
					});
				}
				this.checkArry = resArry;
			},
			cardClick: function cardClick(index) {
				if (this.delShow) {
					this.checkArry[index].state = !this.checkArry[index].state;
				} else {
					this.nowFile = this.files[index];
					this.fileDetailDialog = true;
				}
			},
			getFiles: function getFiles() {
				var self = this;
				self.$http.post("file/getList", {
					page: self.page,
					size: self.pageSize
				}).then(function (res) {
					if (res.data.state != 200) {
						self.$message.error("文件列表获取失败");
						return;
					}
					self.files = res.data.opRes[0];
					self.totalFilesCount = res.data.opRes[1][0].total;
					self.createCheckArry();

					self.formatImgUrl();
				});
			},
			delFiles: function delFiles(fidArry) {
				console.log(fidArry);
				var self = this;
				self.$http.post("file/delete", {
					fids: JSON.stringify(fidArry)
				}).then(function (res) {
					if (res.data.state === 200) {
						self.getFiles();
					} else {
						self.$message.error("文件删除失败");
					}
				});
			},
			getFilesIndexByFid: function getFilesIndexByFid(fid) {
				var res = -1;
				for (var i = 0; i < this.files.length; i++) {
					if (this.files[i].fid === fid) {
						res = i;
						break;
					}
				}

				return res;
			},
			delMultiFiles: function delMultiFiles() {
				var fidArry = [];
				this.checkArry.forEach(function (item) {
					if (item.state) {
						fidArry.push(item.fid);
					}
				});

				this.delFiles(fidArry);
			},
			pageChange: function pageChange(currentPage) {
				this.page = currentPage;
				this.getFiles();
			},
			uploadFile: function uploadFile() {
				this.uploadState = !this.uploadState;
			},
			formatImgUrl: function formatImgUrl() {
				for (var i = 0; i < this.files.length; i++) {
					var ite = this.files[i];
					if (ite.type.indexOf("video") >= 0) {
						ite.thumbnail = "./img/video.png";
					} else if (ite.type.indexOf("audio") >= 0) {
						ite.thumbnail = "./img/music.png";
					} else if (ite.type.indexOf("image") >= 0) {
						ite.thumbnail = ite.url;
					} else {
						ite.thumbnail = "./img/file.png";
					}
				}
			},
			fileDialogClose: function fileDialogClose() {
				console.log("关闭");
				$("#showFileDetail video,#showFileDetail audio").each(function () {
					this.pause();
				});
			}
		},
		computed: {
			hasFiles: function hasFiles() {
				if (this.files.length > 0) {
					return true;
				} else {
					return false;
				}
			}
		},
		mounted: function mounted() {
			var self = this;
			this.getFiles();

			this.$bus.$on("fileUploadSuccess", function () {
				self.getFiles();
			});

			this.$bus.$on("showFileDelete", function (fid) {
				self.delFiles([fid]);
				self.fileDetailDialog = false;
			});

			this.$bus.$on("fileShowNext", function (fid) {
				var nextIndex = self.getFilesIndexByFid(fid);
				nextIndex = (nextIndex + 1) % self.files.length;

				self.nowFile = self.files[nextIndex];
			});

			this.$bus.$on("fileShowPre", function (fid) {

				var preIndex = self.getFilesIndexByFid(fid);
				preIndex = (preIndex - 1 + self.files.length) % self.files.length;
				self.nowFile = self.files[preIndex];
			});
		}
	};

/***/ },

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "filesList"
	  }, [_c('h2', {
	    staticClass: "pageTitle"
	  }, [_vm._v("媒体库")]), _vm._v(" "), _c('div', {
	    staticClass: "funcBtnBar"
	  }, [_c('el-button', {
	    on: {
	      "click": _vm.showMultiBtn
	    }
	  }, [_vm._v("批量选择")]), _vm._v(" "), _c('el-button', {
	    on: {
	      "click": _vm.uploadFile
	    }
	  }, [_vm._v("添加")]), _vm._v(" "), (_vm.type == 'select') ? _vm._m(0) : _vm._e(), _vm._v(" "), _c('el-button', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.delShow),
	      expression: "delShow"
	    }],
	    attrs: {
	      "type": "danger"
	    },
	    on: {
	      "click": _vm.delMultiFiles
	    }
	  }, [_vm._v("批量删除")])], 1), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.uploadState),
	      expression: "uploadState"
	    }],
	    staticClass: "fileUpload"
	  }, [_c('media-add', {
	    attrs: {
	      "pFileListShow": false
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "fileListCon"
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.hasFiles),
	      expression: "!hasFiles"
	    }],
	    staticClass: "nofiles"
	  }, [_vm._v("暂无文件")]), _vm._v(" "), _c('div', {
	    staticClass: "fileCard ShowCon"
	  }, _vm._l((_vm.files), function(ite, index) {
	    return _c('el-card', {
	      class: {
	        delStyle: _vm.delShow
	      },
	      attrs: {
	        "body-style": {
	          padding: '0px'
	        }
	      }
	    }, [_c('el-checkbox', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.delShow),
	        expression: "delShow"
	      }, {
	        name: "model",
	        rawName: "v-model",
	        value: (_vm.checkArry[index].state),
	        expression: "checkArry[index].state"
	      }],
	      domProps: {
	        "value": (_vm.checkArry[index].state)
	      },
	      on: {
	        "input": function($event) {
	          _vm.checkArry[index].state = $event
	        }
	      }
	    }), _vm._v(" "), _c('div', {
	      staticClass: "imgCon",
	      on: {
	        "click": function($event) {
	          _vm.cardClick(index)
	        }
	      }
	    }, [_c('img', {
	      staticClass: "image",
	      attrs: {
	        "src": ite.thumbnail
	      }
	    })]), _vm._v(" "), _c('div', {
	      staticClass: "fileName"
	    }, [_c('a', {
	      attrs: {
	        "title": ite.name
	      }
	    }, [_vm._v(_vm._s(ite.name))]), _vm._v(" "), _c('i', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (!_vm.delShow),
	        expression: "!delShow"
	      }],
	      staticClass: "el-icon-delete",
	      on: {
	        "click": function($event) {
	          _vm.delFiles([ite.fid])
	        }
	      }
	    })])], 1)
	  }))]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.hasFiles),
	      expression: "hasFiles"
	    }],
	    attrs: {
	      "id": "fileListPagination"
	    }
	  }, [_c('el-pagination', {
	    attrs: {
	      "current-page": _vm.page,
	      "page-size": _vm.pageSize,
	      "layout": "total, prev, pager, next,jumper",
	      "total": _vm.totalFilesCount
	    },
	    on: {
	      "current-change": _vm.pageChange
	    }
	  })], 1), _vm._v(" "), _c('el-dialog', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.fileDetailDialog),
	      expression: "fileDetailDialog"
	    }],
	    attrs: {
	      "id": "showFileDetail",
	      "size": "full",
	      "title": "文件详情"
	    },
	    domProps: {
	      "value": (_vm.fileDetailDialog)
	    },
	    on: {
	      "close": _vm.fileDialogClose,
	      "input": function($event) {
	        _vm.fileDetailDialog = $event
	      }
	    }
	  }, [_c('file-show', {
	    attrs: {
	      "imgObj": _vm.nowFile,
	      "showAction": true
	    }
	  })], 1)], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('el-button', {
	    on: {
	      "click": _vm.uploadFile
	    }
	  }, [_vm._v("插入")])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b45a15aa", module.exports)
	  }
	}

/***/ },

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "mediaPage"
	  }, [_c('file-list', {
	    attrs: {
	      "pFileListShow": true
	    }
	  })], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1ea66cf7", module.exports)
	  }
	}

/***/ }

});