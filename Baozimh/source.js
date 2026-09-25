(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeColor = void 0;
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["BLUE"] = "default";
    BadgeColor["GREEN"] = "success";
    BadgeColor["GREY"] = "info";
    BadgeColor["YELLOW"] = "warning";
    BadgeColor["RED"] = "danger";
})(BadgeColor = exports.BadgeColor || (exports.BadgeColor = {}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],5:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
/**
* @deprecated Use {@link PaperbackExtensionBase}
*/
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = exports.SourceIntents = void 0;
var SourceIntents;
(function (SourceIntents) {
    SourceIntents[SourceIntents["MANGA_CHAPTERS"] = 1] = "MANGA_CHAPTERS";
    SourceIntents[SourceIntents["MANGA_TRACKING"] = 2] = "MANGA_TRACKING";
    SourceIntents[SourceIntents["HOMEPAGE_SECTIONS"] = 4] = "HOMEPAGE_SECTIONS";
    SourceIntents[SourceIntents["COLLECTION_MANAGEMENT"] = 8] = "COLLECTION_MANAGEMENT";
    SourceIntents[SourceIntents["CLOUDFLARE_BYPASS_REQUIRED"] = 16] = "CLOUDFLARE_BYPASS_REQUIRED";
    SourceIntents[SourceIntents["SETTINGS_UI"] = 32] = "SETTINGS_UI";
})(SourceIntents = exports.SourceIntents || (exports.SourceIntents = {}));
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],7:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./ByteArray"), exports);
__exportStar(require("./Badge"), exports);
__exportStar(require("./interfaces"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./HomeSectionType"), exports);
__exportStar(require("./PaperbackExtensionBase"), exports);

},{"./Badge":1,"./ByteArray":2,"./HomeSectionType":3,"./PaperbackExtensionBase":4,"./Source":5,"./SourceInfo":6,"./interfaces":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],15:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./ChapterProviding"), exports);
__exportStar(require("./CloudflareBypassRequestProviding"), exports);
__exportStar(require("./HomePageSectionsProviding"), exports);
__exportStar(require("./MangaProgressProviding"), exports);
__exportStar(require("./MangaProviding"), exports);
__exportStar(require("./RequestManagerProviding"), exports);
__exportStar(require("./SearchResultsProviding"), exports);

},{"./ChapterProviding":8,"./CloudflareBypassRequestProviding":9,"./HomePageSectionsProviding":10,"./MangaProgressProviding":11,"./MangaProviding":12,"./RequestManagerProviding":13,"./SearchResultsProviding":14}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],60:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./DynamicUI/Exports/DUIBinding"), exports);
__exportStar(require("./DynamicUI/Exports/DUIForm"), exports);
__exportStar(require("./DynamicUI/Exports/DUIFormRow"), exports);
__exportStar(require("./DynamicUI/Exports/DUISection"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIHeader"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILink"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIMultilineLabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUINavigationButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIOAuthButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISecureInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISelect"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIStepper"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISwitch"), exports);
__exportStar(require("./Exports/ChapterDetails"), exports);
__exportStar(require("./Exports/Chapter"), exports);
__exportStar(require("./Exports/Cookie"), exports);
__exportStar(require("./Exports/HomeSection"), exports);
__exportStar(require("./Exports/IconText"), exports);
__exportStar(require("./Exports/MangaInfo"), exports);
__exportStar(require("./Exports/MangaProgress"), exports);
__exportStar(require("./Exports/PartialSourceManga"), exports);
__exportStar(require("./Exports/MangaUpdates"), exports);
__exportStar(require("./Exports/PBCanvas"), exports);
__exportStar(require("./Exports/PBImage"), exports);
__exportStar(require("./Exports/PagedResults"), exports);
__exportStar(require("./Exports/RawData"), exports);
__exportStar(require("./Exports/Request"), exports);
__exportStar(require("./Exports/SourceInterceptor"), exports);
__exportStar(require("./Exports/RequestManager"), exports);
__exportStar(require("./Exports/Response"), exports);
__exportStar(require("./Exports/SearchField"), exports);
__exportStar(require("./Exports/SearchRequest"), exports);
__exportStar(require("./Exports/SourceCookieStore"), exports);
__exportStar(require("./Exports/SourceManga"), exports);
__exportStar(require("./Exports/SecureStateManager"), exports);
__exportStar(require("./Exports/SourceStateManager"), exports);
__exportStar(require("./Exports/Tag"), exports);
__exportStar(require("./Exports/TagSection"), exports);
__exportStar(require("./Exports/TrackedMangaChapterReadAction"), exports);
__exportStar(require("./Exports/TrackerActionQueue"), exports);

},{"./DynamicUI/Exports/DUIBinding":17,"./DynamicUI/Exports/DUIForm":18,"./DynamicUI/Exports/DUIFormRow":19,"./DynamicUI/Exports/DUISection":20,"./DynamicUI/Rows/Exports/DUIButton":21,"./DynamicUI/Rows/Exports/DUIHeader":22,"./DynamicUI/Rows/Exports/DUIInputField":23,"./DynamicUI/Rows/Exports/DUILabel":24,"./DynamicUI/Rows/Exports/DUILink":25,"./DynamicUI/Rows/Exports/DUIMultilineLabel":26,"./DynamicUI/Rows/Exports/DUINavigationButton":27,"./DynamicUI/Rows/Exports/DUIOAuthButton":28,"./DynamicUI/Rows/Exports/DUISecureInputField":29,"./DynamicUI/Rows/Exports/DUISelect":30,"./DynamicUI/Rows/Exports/DUIStepper":31,"./DynamicUI/Rows/Exports/DUISwitch":32,"./Exports/Chapter":33,"./Exports/ChapterDetails":34,"./Exports/Cookie":35,"./Exports/HomeSection":36,"./Exports/IconText":37,"./Exports/MangaInfo":38,"./Exports/MangaProgress":39,"./Exports/MangaUpdates":40,"./Exports/PBCanvas":41,"./Exports/PBImage":42,"./Exports/PagedResults":43,"./Exports/PartialSourceManga":44,"./Exports/RawData":45,"./Exports/Request":46,"./Exports/RequestManager":47,"./Exports/Response":48,"./Exports/SearchField":49,"./Exports/SearchRequest":50,"./Exports/SecureStateManager":51,"./Exports/SourceCookieStore":52,"./Exports/SourceInterceptor":53,"./Exports/SourceManga":54,"./Exports/SourceStateManager":55,"./Exports/Tag":56,"./Exports/TagSection":57,"./Exports/TrackedMangaChapterReadAction":58,"./Exports/TrackerActionQueue":59}],61:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./generated/_exports"), exports);
__exportStar(require("./base/index"), exports);
__exportStar(require("./compat/DyamicUI"), exports);

},{"./base/index":7,"./compat/DyamicUI":16,"./generated/_exports":60}],62:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Baozimh = exports.BaozimhInfo = void 0;
const types_1 = require("@paperback/types");
const BaozimhParser_1 = require("./BaozimhParser");
exports.BaozimhInfo = {
    version: '1.0.0',
    name: 'Baozimh',
    icon: 'icon.png',
    author: 'Henry Khaw',
    authorWebsite: 'https://github.com/',
    description: 'Unofficial source for Baozimh (包子漫畫).',
    contentRating: types_1.ContentRating.MATURE,
    websiteBaseURL: BaozimhParser_1.DOMAIN,
    sourceTags: [{ text: 'Chinese', type: types_1.BadgeColor.GREY }],
    intents: types_1.SourceIntents.MANGA_CHAPTERS | types_1.SourceIntents.HOMEPAGE_SECTIONS,
};
const classify = (region, page) => `${BaozimhParser_1.DOMAIN}/classify?type=all&region=${region}&state=all&filter=*&page=${page}`;
// containsMore = whether the list URL supports ?page=N (unverified for /list/new)
const SECTIONS = [
    { id: 'new', title: '最新上架', url: () => `${BaozimhParser_1.DOMAIN}/list/new`, containsMore: false },
    { id: 'jp', title: '日本', url: (p) => classify('jp', p), containsMore: true },
    { id: 'kr', title: '韓國', url: (p) => classify('kr', p), containsMore: true },
    { id: 'cn', title: '國漫', url: (p) => classify('cn', p), containsMore: true },
];
class Baozimh {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(cheerio) {
        this.cheerio = cheerio;
        this.requestManager = App.createRequestManager({
            requestsPerSecond: 4,
            requestTimeout: 20000,
            interceptor: {
                interceptRequest: (request) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    request.headers = Object.assign(Object.assign({}, ((_a = request.headers) !== null && _a !== void 0 ? _a : {})), { referer: `${BaozimhParser_1.DOMAIN}/`, 'user-agent': yield this.requestManager.getDefaultUserAgent() });
                    return request;
                }),
                interceptResponse: (response) => __awaiter(this, void 0, void 0, function* () { return response; }),
            },
        });
    }
    fetchPage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.requestManager.schedule(App.createRequest({ url, method: 'GET' }), 1);
            if (response.status >= 400) {
                throw new Error(`Baozimh returned HTTP ${response.status} for ${url}`);
            }
            return this.cheerio.load(response.data);
        });
    }
    toPartial(items) {
        return items.map((i) => App.createPartialSourceManga({ mangaId: i.id, image: i.image, title: i.title, subtitle: undefined }));
    }
    getMangaShareUrl(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            return `${BaozimhParser_1.DOMAIN}/comic/${mangaId}`;
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.fetchPage(`${BaozimhParser_1.DOMAIN}/comic/${mangaId}`);
            const d = (0, BaozimhParser_1.parseMangaDetails)($, mangaId);
            return App.createSourceManga({
                id: mangaId,
                mangaInfo: App.createMangaInfo({
                    titles: [d.title],
                    image: d.image,
                    status: d.completed ? 'Completed' : 'Ongoing',
                    author: d.author,
                    artist: d.author,
                    tags: [
                        App.createTagSection({
                            id: 'genres',
                            label: 'Genres',
                            tags: d.genres.map((g) => App.createTag({ id: g, label: g })),
                        }),
                    ],
                    desc: d.desc,
                    hentai: false,
                }),
            });
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.fetchPage(`${BaozimhParser_1.DOMAIN}/comic/${mangaId}`);
            return (0, BaozimhParser_1.parseChapters)($).map((c) => App.createChapter({
                id: c.id,
                name: c.name,
                langCode: '🇹🇼',
                chapNum: c.chapNum,
                volume: 0,
                sortingIndex: c.slot,
            }));
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.fetchPage(`${BaozimhParser_1.DOMAIN}/comic/chapter/${mangaId}/${chapterId}.html`);
            const pages = (0, BaozimhParser_1.parsePages)($);
            if (!pages.length) {
                throw new Error(`No pages found for ${mangaId} / ${chapterId}`);
            }
            return App.createChapterDetails({ id: chapterId, mangaId, pages });
        });
    }
    getSearchResults(query, _metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const title = ((_a = query.title) !== null && _a !== void 0 ? _a : '').trim();
            if (!title)
                return App.createPagedResults({ results: [], metadata: undefined });
            const $ = yield this.fetchPage(`${BaozimhParser_1.DOMAIN}/search?q=${encodeURIComponent(title)}`);
            return App.createPagedResults({ results: this.toPartial((0, BaozimhParser_1.parseComicList)($)), metadata: undefined });
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(SECTIONS.map((s) => __awaiter(this, void 0, void 0, function* () {
                const section = App.createHomeSection({
                    id: s.id,
                    title: s.title,
                    containsMoreItems: s.containsMore,
                    type: types_1.HomeSectionType.singleRowNormal,
                });
                sectionCallback(section);
                const $ = yield this.fetchPage(s.url(1));
                section.items = this.toPartial((0, BaozimhParser_1.parseComicList)($));
                sectionCallback(section);
            })));
        });
    }
    getViewMoreItems(homepageSectionId, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const section = SECTIONS.find((s) => s.id === homepageSectionId);
            if (!section)
                return App.createPagedResults({ results: [], metadata: undefined });
            const page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 2;
            const $ = yield this.fetchPage(section.url(page));
            const items = (0, BaozimhParser_1.parseComicList)($);
            return App.createPagedResults({
                results: this.toPartial(items),
                metadata: items.length ? { page: page + 1 } : undefined,
            });
        });
    }
}
exports.Baozimh = Baozimh;

},{"./BaozimhParser":63,"@paperback/types":61}],63:[function(require,module,exports){
"use strict";
// All site-specific selectors live in this file. If Baozimh changes its markup,
// this is the only file that should need edits.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePages = exports.parseChapters = exports.parseMangaDetails = exports.parseComicList = exports.normalizeUrl = exports.coverFor = exports.DOMAIN = void 0;
exports.DOMAIN = 'https://www.baozimh.com';
const COVER_HOST = 'https://static-tw.baozimh.com';
const COMIC_HREF = /^(?:https?:\/\/[^/]+)?\/comic\/([^/?#]+)\/?$/;
const CHAPTER_HREF_A = /comic_id=([^&]+)&section_slot=(\d+)&chapter_slot=(\d+)/;
const CHAPTER_HREF_B = /\/comic\/chapter\/[^/]+\/(\d+)_(\d+)\.html/;
const coverFor = (id) => `${COVER_HOST}/cover/${id}.jpg?w=285&h=375&q=100`;
exports.coverFor = coverFor;
const normalizeUrl = (src) => {
    const s = src.trim();
    if (s.startsWith('//'))
        return `https:${s}`;
    if (s.startsWith('/'))
        return `${exports.DOMAIN}${s}`;
    return s;
};
exports.normalizeUrl = normalizeUrl;
/** Search / classify / list pages: collect every /comic/<slug> link, merged by slug. */
function parseComicList($) {
    const found = new Map();
    $('a[href*="/comic/"]').each((_, el) => {
        var _a, _b, _c, _d, _e;
        const a = $(el);
        const m = COMIC_HREF.exec((_a = a.attr('href')) !== null && _a !== void 0 ? _a : '');
        if (!m || m[1] === 'sitemap')
            return;
        const id = m[1];
        const item = (_b = found.get(id)) !== null && _b !== void 0 ? _b : { id, title: '', image: '' };
        const title = ((_c = a.attr('title')) !== null && _c !== void 0 ? _c : a.find('h3').first().text()).trim();
        if (title && !item.title)
            item.title = title;
        const img = a.find('amp-img, img').first();
        const src = (_e = (_d = img.attr('src')) !== null && _d !== void 0 ? _d : img.attr('data-src')) !== null && _e !== void 0 ? _e : '';
        if (src && !item.image)
            item.image = (0, exports.normalizeUrl)(src);
        found.set(id, item);
    });
    return Array.from(found.values())
        .filter((i) => i.title)
        .map((i) => (Object.assign(Object.assign({}, i), { image: i.image || (0, exports.coverFor)(i.id) })));
}
exports.parseComicList = parseComicList;
/** Detail page: prefers the OpenGraph "novel" meta tags, which are stable across redesigns. */
function parseMangaDetails($, mangaId) {
    const meta = (name) => {
        var _a, _b;
        return ((_b = (_a = $(`meta[property="${name}"]`).attr('content')) !== null && _a !== void 0 ? _a : $(`meta[name="${name}"]`).attr('content')) !== null && _b !== void 0 ? _b : '').trim();
    };
    const title = meta('og:novel:book_name') || $('h1').first().text().trim() || mangaId;
    const status = meta('og:novel:status');
    const genres = meta('og:novel:category')
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t && !t.startsWith('types.'));
    let desc = $('.comics-detail__desc').first().text().trim();
    if (!desc) {
        // og:description looks like "《X》,《X》全集,<synopsis>"
        desc = meta('og:description').replace(/^《[^》]*》,《[^》]*》全集,?/, '').trim();
    }
    return {
        title,
        author: meta('og:novel:author'),
        image: meta('og:image').split('?')[0] || (0, exports.coverFor)(mangaId),
        completed: status.includes('完結') || status.includes('完结'),
        genres,
        desc,
    };
}
exports.parseMangaDetails = parseMangaDetails;
/** Chapter list: links use ?comic_id=..&section_slot=..&chapter_slot=.. or /comic/chapter/<id>/<s>_<c>.html */
function parseChapters($) {
    const seen = new Set();
    const out = [];
    $('a[href*="page_direct"], a[href*="/comic/chapter/"]').each((_, el) => {
        var _a, _b;
        const a = $(el);
        const href = (_a = a.attr('href')) !== null && _a !== void 0 ? _a : '';
        let section;
        let slot;
        const a1 = CHAPTER_HREF_A.exec(href);
        const b1 = CHAPTER_HREF_B.exec(href);
        if (a1)
            [, , section, slot] = a1;
        else if (b1)
            [, section, slot] = b1;
        if (section === undefined || slot === undefined)
            return;
        const id = `${section}_${slot}`;
        if (seen.has(id))
            return;
        seen.add(id);
        const name = ((_b = a.attr('title')) !== null && _b !== void 0 ? _b : a.text()).trim();
        const num = /第\s*(\d+(?:\.\d+)?)\s*[話话章回]/.exec(name);
        out.push({
            id,
            name,
            slot: Number(slot),
            chapNum: num ? Number(num[1]) : Number(slot) + 1,
        });
    });
    return out;
}
exports.parseChapters = parseChapters;
/** Chapter reader page: returns page image URLs in reading order. */
function parsePages($) {
    const selectors = ['.comic-contain amp-img', '.comic-contain img', 'amp-img', '.chapter-img img'];
    for (const sel of selectors) {
        const urls = [];
        $(sel).each((_, el) => {
            var _a, _b;
            const e = $(el);
            const src = (_b = (_a = e.attr('src')) !== null && _a !== void 0 ? _a : e.attr('data-src')) !== null && _b !== void 0 ? _b : '';
            if (src && !src.includes('/static/bzmh/'))
                urls.push((0, exports.normalizeUrl)(src));
        });
        if (urls.length)
            return urls;
    }
    return [];
}
exports.parsePages = parsePages;

},{}]},{},[62])(62)
});
