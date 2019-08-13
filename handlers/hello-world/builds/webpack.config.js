"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackBaseConfig = _interopRequireDefault(require("../../webpack.base.config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = { ...(0, _webpackBaseConfig.default)(__dirname),
  externals: {
    'async_iter/pipeline': 'commonjs async_iter/pipeline',
    'aws-sdk': 'commonjs aws-sdk',
    bufferutil: 'commonjs bufferutil',
    'utf-8-validate': 'commonjs utf-8-validate',
    'any-observable': 'commonjs any-observable'
  }
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2suY29uZmlnLmpzIl0sIm5hbWVzIjpbIl9fZGlybmFtZSIsImV4dGVybmFscyIsImJ1ZmZlcnV0aWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztlQUVlLEVBQ2IsR0FBRyxnQ0FBV0EsU0FBWCxDQURVO0FBRWJDLEVBQUFBLFNBQVMsRUFBRTtBQUNULDJCQUF1Qiw4QkFEZDtBQUVULGVBQVcsa0JBRkY7QUFHVEMsSUFBQUEsVUFBVSxFQUFFLHFCQUhIO0FBSVQsc0JBQWtCLHlCQUpUO0FBS1Qsc0JBQWtCO0FBTFQ7QUFGRSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VDb25maWcgZnJvbSAnLi4vLi4vd2VicGFjay5iYXNlLmNvbmZpZy5qcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi5iYXNlQ29uZmlnKF9fZGlybmFtZSksXG4gIGV4dGVybmFsczoge1xuICAgICdhc3luY19pdGVyL3BpcGVsaW5lJzogJ2NvbW1vbmpzIGFzeW5jX2l0ZXIvcGlwZWxpbmUnLFxuICAgICdhd3Mtc2RrJzogJ2NvbW1vbmpzIGF3cy1zZGsnLFxuICAgIGJ1ZmZlcnV0aWw6ICdjb21tb25qcyBidWZmZXJ1dGlsJyxcbiAgICAndXRmLTgtdmFsaWRhdGUnOiAnY29tbW9uanMgdXRmLTgtdmFsaWRhdGUnLFxuICAgICdhbnktb2JzZXJ2YWJsZSc6ICdjb21tb25qcyBhbnktb2JzZXJ2YWJsZSdcbiAgfVxufVxuIl19
//# sourceMappingURL=webpack.config.js.map