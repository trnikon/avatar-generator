"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const chai_1 = __importStar(require("chai"));
require("mocha");
chai_1.default.use(chai_as_promised_1.default);
describe('Avatar generation', () => {
    it('should construct generator', () => {
        const generator = new index_1.default();
        chai_1.expect(generator).to.be.ok;
    });
    it('should get variants', () => {
        const generator = new index_1.default();
        chai_1.expect(generator.variants.sort()).to.deep.equal(['female', 'male']);
    });
    it('should fail if no set present', () => __awaiter(this, void 0, void 0, function* () {
        const generator = new index_1.default();
        chai_1.expect(generator.generate('test', 'monster')).eventually.rejected;
    }));
    it('should generate images for each sets', () => __awaiter(this, void 0, void 0, function* () {
        const generator = new index_1.default();
        const image1 = yield generator.generate('test', 'female');
        const image2 = yield generator.generate('test', 'male');
        chai_1.expect(image1).to.be.ok;
        chai_1.expect(image2).to.be.ok;
    }));
    it('should generate equal images for equal input', () => __awaiter(this, void 0, void 0, function* () {
        const generator = new index_1.default();
        const image1 = yield (yield generator.generate('test', 'male'))
            .raw()
            .toBuffer();
        const image2 = yield (yield generator.generate('test', 'male'))
            .raw()
            .toBuffer();
        return chai_1.expect(image1.equals(image2)).to.be.true;
    }));
    it('should generate different images for different input', () => __awaiter(this, void 0, void 0, function* () {
        const generator = new index_1.default();
        const image1 = yield (yield generator.generate('test1', 'male'))
            .raw()
            .toBuffer();
        const image2 = yield (yield generator.generate('test2', 'male'))
            .raw()
            .toBuffer();
        return chai_1.expect(image1.equals(image2)).to.be.false;
    }));
});
//# sourceMappingURL=index.spec.js.map