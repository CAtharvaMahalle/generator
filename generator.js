"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAndSendTransactions = void 0;
// generator.ts
var axios_1 = require("axios");
var path = require("path");
var fs = require("fs-extra");
require('dotenv').config();
var CONFIG = require('./config.json');
var testRoot = __dirname;
var owners = CONFIG.owners;
function sendTransaction(apiUrl, transaction, customerId) {
    var customHeaders = {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY, // Include any necessary authorization headers
        'clientSecret': Buffer.from(customerId).toString('base64'),
    };
    var axiosConfig = {
        method: 'post',
        url: apiUrl,
        headers: customHeaders,
        data: transaction,
    };
    return (0, axios_1.default)(axiosConfig)
        .then(function (response) {
        console.log('Request successful:', response.data);
    })
        .catch(function (error) {
        console.error('Error making POST request:', error.message);
    });
}
function fetchData() {
    // Fetch real data from your parser instead of reading a static XML file
    // You might use an existing parser library or implement your own parser
    // For now, let's keep it simple and use a placeholder function
    var result = fs.readFileSync(path.join(testRoot, 'data', 'generated.json'), 'utf8');
    // return xml2JS.xml2js(result, { compact: true, textKey: 'value', alwaysChildren: true });
    return JSON.parse(result);
}
function generateAndSendTransactions(apiUrl, owners) {
    return __awaiter(this, void 0, void 0, function () {
        function sendTransactions() {
            return __awaiter(this, void 0, void 0, function () {
                var transactions, _i, transactions_1, transaction, _a, owners_1, owner, _b, _c, store, i;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, fetchData()];
                        case 1:
                            transactions = _d.sent();
                            _i = 0, transactions_1 = transactions;
                            _d.label = 2;
                        case 2:
                            if (!(_i < transactions_1.length)) return [3 /*break*/, 11];
                            transaction = transactions_1[_i];
                            _a = 0, owners_1 = owners;
                            _d.label = 3;
                        case 3:
                            if (!(_a < owners_1.length)) return [3 /*break*/, 10];
                            owner = owners_1[_a];
                            _b = 0, _c = owner === null || owner === void 0 ? void 0 : owner.stores;
                            _d.label = 4;
                        case 4:
                            if (!(_b < _c.length)) return [3 /*break*/, 9];
                            store = _c[_b];
                            transaction.storeId = store;
                            i = 1;
                            _d.label = 5;
                        case 5:
                            if (!(i <= 2)) return [3 /*break*/, 8];
                            transaction.registerId = i;
                            return [4 /*yield*/, sendTransaction(apiUrl, transaction, owner.customerId)];
                        case 6:
                            _d.sent();
                            _d.label = 7;
                        case 7:
                            i++;
                            return [3 /*break*/, 5];
                        case 8:
                            _b++;
                            return [3 /*break*/, 4];
                        case 9:
                            _a++;
                            return [3 /*break*/, 3];
                        case 10:
                            _i++;
                            return [3 /*break*/, 2];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        }
        var interval;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    interval = CONFIG.DURATION;
                    // Execute the function immediately and then at intervals
                    return [4 /*yield*/, sendTransactions()];
                case 1:
                    // Execute the function immediately and then at intervals
                    _a.sent();
                    setInterval(sendTransactions, interval);
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateAndSendTransactions = generateAndSendTransactions;
//Initializing the generator
generateAndSendTransactions(CONFIG.API_URL, owners);
