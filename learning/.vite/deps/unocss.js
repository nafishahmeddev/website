import { n as __exportAll$2, t as __commonJSMin } from "./chunk-DOseaPKx.js";
import * as bindings from "@oxc-parser/binding-wasm32-wasi";
//#region node_modules/@unocss/core/dist/index.mjs
var LAYER_DEFAULT = "default";
var LAYER_PREFLIGHTS = "preflights";
var LAYER_SHORTCUTS = "shortcuts";
var LAYER_IMPORTS = "imports";
var DEFAULT_LAYERS = {
	[LAYER_IMPORTS]: -200,
	[LAYER_PREFLIGHTS]: -100,
	[LAYER_SHORTCUTS]: -10,
	[LAYER_DEFAULT]: 0
};
var defaultSplitRE = /[\\:]?[\s'"`;{}]+/g;
var splitWithVariantGroupRE = /([\\:]?[\s"'`;<>]|:\(|\)"|\)\s)/g;
function splitCode(code) {
	return code.split(defaultSplitRE);
}
var extractorSplit = {
	name: "@unocss/core/extractor-split",
	order: 0,
	extract({ code }) {
		return splitCode(code);
	}
};
function toArray(value = []) {
	return Array.isArray(value) ? value : [value];
}
function uniq(value) {
	return Array.from(new Set(value));
}
function uniqueBy(array, equalFn) {
	return array.reduce((acc, cur) => {
		if (acc.findIndex((item) => equalFn(cur, item)) === -1) acc.push(cur);
		return acc;
	}, []);
}
function isString(s) {
	return typeof s === "string";
}
var CountableSet = class extends Set {
	constructor(values) {
		super();
		this._map = /* @__PURE__ */ new Map();
		if (values) for (const key of values) this.add(key);
	}
	add(key) {
		this._map.set(key, (this._map.get(key) ?? 0) + 1);
		return super.add(key);
	}
	delete(key) {
		if (!this._map.has(key)) return false;
		this._map.delete(key);
		return super.delete(key);
	}
	clear() {
		this._map.clear();
		super.clear();
	}
	getCount(key) {
		return this._map.get(key) ?? 0;
	}
	setCount(key, count) {
		this._map.set(key, count);
		return super.add(key);
	}
};
function isCountableSet(value) {
	return value instanceof CountableSet;
}
function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/**
* CSS Selector Escape
*/
function escapeSelector(str) {
	const length = str.length;
	let index = -1;
	let codeUnit;
	let result = "";
	const firstCodeUnit = str.charCodeAt(0);
	while (++index < length) {
		codeUnit = str.charCodeAt(index);
		if (codeUnit === 0) {
			result += "�";
			continue;
		}
		if (codeUnit === 37) {
			result += "\\%";
			continue;
		}
		if (codeUnit === 44) {
			result += "\\,";
			continue;
		}
		if (codeUnit >= 1 && codeUnit <= 31 || codeUnit === 127 || index === 0 && codeUnit >= 48 && codeUnit <= 57 || index === 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit === 45) {
			result += `\\${codeUnit.toString(16)} `;
			continue;
		}
		if (index === 0 && length === 1 && codeUnit === 45) {
			result += `\\${str.charAt(index)}`;
			continue;
		}
		if (codeUnit >= 128 || codeUnit === 45 || codeUnit === 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
			result += str.charAt(index);
			continue;
		}
		result += `\\${str.charAt(index)}`;
	}
	return result;
}
var e = escapeSelector;
/**
* Create event emitter.
*
* ```js
* import { createNanoEvents } from 'nanoevents'
*
* class Ticker {
*   constructor() {
*     this.emitter = createNanoEvents()
*   }
*   on(...args) {
*     return this.emitter.on(...args)
*   }
*   tick() {
*     this.emitter.emit('tick')
*   }
* }
* ```
*/
function createNanoEvents() {
	return {
		events: {},
		emit(event, ...args) {
			(this.events[event] || []).forEach((i) => i(...args));
		},
		on(event, cb) {
			(this.events[event] = this.events[event] || []).push(cb);
			return () => this.events[event] = (this.events[event] || []).filter((i) => i !== cb);
		}
	};
}
var attributifyRE = /^\[(.+?)~?="(.*)"\]$/;
var cssIdRE = /\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/;
var validateFilterRE = /[\w\u00A0-\uFFFF%-?]/;
function isAttributifySelector(selector) {
	return selector.match(attributifyRE);
}
function isValidSelector(selector = "") {
	return validateFilterRE.test(selector);
}
function normalizeVariant(variant) {
	return typeof variant === "function" ? { match: variant } : variant;
}
function isRawUtil(util) {
	return util.length === 3;
}
function notNull(value) {
	return value != null;
}
function noop() {}
function withLayer(layer, rules) {
	rules.forEach((r) => {
		if (!r[2]) r[2] = { layer };
		else r[2].layer = layer;
	});
	return rules;
}
var TwoKeyMap = class {
	constructor() {
		this._map = /* @__PURE__ */ new Map();
	}
	get(key1, key2) {
		const m2 = this._map.get(key1);
		if (m2) return m2.get(key2);
	}
	getFallback(key1, key2, fallback) {
		let m2 = this._map.get(key1);
		if (!m2) {
			m2 = /* @__PURE__ */ new Map();
			this._map.set(key1, m2);
		}
		if (!m2.has(key2)) m2.set(key2, fallback);
		return m2.get(key2);
	}
	set(key1, key2, value) {
		let m2 = this._map.get(key1);
		if (!m2) {
			m2 = /* @__PURE__ */ new Map();
			this._map.set(key1, m2);
		}
		m2.set(key2, value);
		return this;
	}
	has(key1, key2) {
		return this._map.get(key1)?.has(key2);
	}
	delete(key1, key2) {
		return this._map.get(key1)?.delete(key2) || false;
	}
	deleteTop(key1) {
		return this._map.delete(key1);
	}
	map(fn) {
		return Array.from(this._map.entries()).flatMap(([k1, m2]) => Array.from(m2.entries()).map(([k2, v]) => {
			return fn(v, k1, k2);
		}));
	}
};
var BetterMap = class extends Map {
	getFallback(key, fallback) {
		const v = this.get(key);
		if (v === void 0) {
			this.set(key, fallback);
			return fallback;
		}
		return v;
	}
	map(mapFn) {
		const result = [];
		this.forEach((v, k) => {
			result.push(mapFn(v, k));
		});
		return result;
	}
	flatMap(mapFn) {
		const result = [];
		this.forEach((v, k) => {
			result.push(...mapFn(v, k));
		});
		return result;
	}
};
function normalizeCSSEntries(obj) {
	if (isString(obj)) return obj;
	return (!Array.isArray(obj) ? Object.entries(obj) : obj).filter((i) => i[1] != null);
}
function normalizeCSSValues(obj) {
	if (Array.isArray(obj)) if (obj.find((i) => !Array.isArray(i) || Array.isArray(i[0]))) return obj.map((i) => normalizeCSSEntries(i));
	else return [obj];
	else return [normalizeCSSEntries(obj)];
}
function clearIdenticalEntries(entry) {
	return entry.filter(([k, v], idx) => {
		if (k.startsWith("$$")) return false;
		for (let i = idx - 1; i >= 0; i--) if (entry[i][0] === k && entry[i][1] === v) return false;
		return true;
	});
}
var VirtualKey = "__virtual_key__";
function entriesToCss(arr) {
	if (arr == null) return "";
	return clearIdenticalEntries(arr).map(([key, value]) => value != null && typeof value !== "function" ? key !== "__virtual_key__" ? `${key}:${value};` : value : void 0).filter(Boolean).join("");
}
function isObject(item) {
	return item && typeof item === "object" && !Array.isArray(item);
}
/**
* Deep merge two objects
*/
function mergeDeep(original, patch, mergeArray = false) {
	const o = original;
	const p = patch;
	if (Array.isArray(p)) if (mergeArray && Array.isArray(p)) return [...o, ...p];
	else return [...p];
	const output = { ...o };
	if (isObject(o) && isObject(p)) Object.keys(p).forEach((key) => {
		if (isObject(o[key]) && isObject(p[key]) || Array.isArray(o[key]) && Array.isArray(p[key])) output[key] = mergeDeep(o[key], p[key], mergeArray);
		else Object.assign(output, { [key]: p[key] });
	});
	return output;
}
function clone(val) {
	let k, out, tmp;
	if (Array.isArray(val)) {
		out = Array.from({ length: k = val.length });
		while (k--) out[k] = (tmp = val[k]) && typeof tmp === "object" ? clone(tmp) : tmp;
		return out;
	}
	if (Object.prototype.toString.call(val) === "[object Object]") {
		out = {};
		for (k in val) if (k === "__proto__") Object.defineProperty(out, k, {
			value: clone(val[k]),
			configurable: true,
			enumerable: true,
			writable: true
		});
		else out[k] = (tmp = val[k]) && typeof tmp === "object" ? clone(tmp) : tmp;
		return out;
	}
	return val;
}
function isStaticRule(rule) {
	return isString(rule[0]);
}
function isStaticShortcut(sc) {
	return isString(sc[0]);
}
var regexCache = {};
function makeRegexClassGroup(separators = ["-", ":"]) {
	const key = separators.join("|");
	if (!regexCache[key]) regexCache[key] = new RegExp(`((?:[!@*<~\\w+:_-]|\\[&?>?:?\\S*\\])+?)(${key})\\(((?:[~!<>\\w\\s:/\\\\,%#.$?-]|\\[[^\\]]*?\\])+?)\\)(?!\\s*?=>)`, "gm");
	regexCache[key].lastIndex = 0;
	return regexCache[key];
}
function parseVariantGroup(str, separators = ["-", ":"], depth = 5) {
	const regexClassGroup = makeRegexClassGroup(separators);
	let hasChanged;
	let content = str.toString();
	const prefixes = /* @__PURE__ */ new Set();
	const groupsByOffset = /* @__PURE__ */ new Map();
	do {
		hasChanged = false;
		content = content.replace(regexClassGroup, (from, pre, sep, body, groupOffset) => {
			if (!separators.includes(sep)) return from;
			hasChanged = true;
			prefixes.add(pre + sep);
			const bodyOffset = groupOffset + pre.length + sep.length + 1;
			const group = {
				length: from.length,
				items: []
			};
			groupsByOffset.set(groupOffset, group);
			for (const itemMatch of [...body.matchAll(/\S+/g)]) {
				const itemOffset = bodyOffset + itemMatch.index;
				let innerItems = groupsByOffset.get(itemOffset)?.items;
				if (innerItems) groupsByOffset.delete(itemOffset);
				else innerItems = [{
					offset: itemOffset,
					length: itemMatch[0].length,
					className: itemMatch[0]
				}];
				for (const item of innerItems) {
					item.className = item.className === "~" ? sep === ":" ? `${pre}${sep}~` : pre : item.className.replace(/^(!?)(.*)/, `$1${pre}${sep}$2`);
					group.items.push(item);
				}
			}
			return "$".repeat(from.length);
		});
		depth -= 1;
	} while (hasChanged && depth);
	let expanded;
	if (typeof str === "string") {
		expanded = "";
		let prevOffset = 0;
		for (const [offset, group] of groupsByOffset) {
			expanded += str.slice(prevOffset, offset);
			expanded += group.items.map((item) => item.className).join(" ");
			prevOffset = offset + group.length;
		}
		expanded += str.slice(prevOffset);
	} else {
		expanded = str;
		for (const [offset, group] of groupsByOffset) expanded.overwrite(offset, offset + group.length, group.items.map((item) => item.className).join(" "));
	}
	return {
		prefixes: Array.from(prefixes),
		hasChanged,
		groupsByOffset,
		get expanded() {
			return expanded.toString();
		}
	};
}
function collapseVariantGroup(str, prefixes) {
	const collection = /* @__PURE__ */ new Map();
	const sortedPrefix = prefixes.sort((a, b) => b.length - a.length);
	return str.split(/\s+/g).map((part) => {
		const prefix = sortedPrefix.find((prefix$1) => part.startsWith(prefix$1));
		if (!prefix) return part;
		const body = part.slice(prefix.length);
		if (collection.has(prefix)) {
			collection.get(prefix).push(body);
			return null;
		} else {
			const items = [body];
			collection.set(prefix, items);
			return {
				prefix,
				items
			};
		}
	}).filter(notNull).map((i) => {
		if (typeof i === "string") return i;
		return `${i.prefix}(${i.items.join(" ")})`;
	}).join(" ");
}
function expandVariantGroup(str, separators = ["-", ":"], depth = 5) {
	const res = parseVariantGroup(str, separators, depth);
	return typeof str === "string" ? res.expanded : str;
}
var warned$1 = /* @__PURE__ */ new Set();
function warnOnce(msg) {
	if (warned$1.has(msg)) return;
	console.warn("[unocss]", msg);
	warned$1.add(msg);
}
function resolveShortcuts(shortcuts) {
	return toArray(shortcuts).flatMap((s) => {
		if (Array.isArray(s)) return [s];
		return Object.entries(s);
	});
}
var __RESOLVED = "_uno_resolved";
/**
* Resolve a single preset, nested presets are ignored
*/
async function resolvePreset(presetInput) {
	let preset = typeof presetInput === "function" ? await presetInput() : await presetInput;
	if (__RESOLVED in preset) return preset;
	preset = { ...preset };
	Object.defineProperty(preset, __RESOLVED, {
		value: true,
		enumerable: false
	});
	const shortcuts = preset.shortcuts ? resolveShortcuts(preset.shortcuts) : void 0;
	preset.shortcuts = shortcuts;
	if (preset.prefix || preset.layer) {
		const apply = (i) => {
			if (!i[2]) i[2] = {};
			const meta = i[2];
			if (meta.prefix == null && preset.prefix) meta.prefix = toArray(preset.prefix);
			if (meta.layer == null && preset.layer) meta.layer = preset.layer;
		};
		shortcuts?.forEach(apply);
		preset.rules?.forEach(apply);
	}
	return preset;
}
/**
* Resolve presets with nested presets
*/
async function resolvePresets(preset) {
	const root = await resolvePreset(preset);
	if (!root.presets) return [root];
	return [root, ...(await Promise.all((root.presets || []).flatMap(toArray).flatMap(resolvePresets))).flat()];
}
function mergeContentOptions(optionsArray) {
	if (optionsArray.length === 0) return {};
	const pipelineIncludes = [];
	const pipelineExcludes = [];
	let pipelineDisabled = false;
	const filesystem = [];
	const inline = [];
	for (const options of optionsArray) {
		if (options.pipeline === false) {
			pipelineDisabled = true;
			break;
		} else {
			if (options.pipeline?.include) pipelineIncludes.push(options.pipeline.include);
			if (options.pipeline?.exclude) pipelineExcludes.push(options.pipeline.exclude);
		}
		if (options.filesystem) filesystem.push(options.filesystem);
		if (options.inline) inline.push(options.inline);
	}
	const mergedContent = { pipeline: pipelineDisabled ? false : {
		include: uniq(mergeFilterPatterns(...pipelineIncludes)),
		exclude: uniq(mergeFilterPatterns(...pipelineExcludes))
	} };
	if (filesystem.length) mergedContent.filesystem = uniq(filesystem.flat());
	if (inline.length) mergedContent.inline = uniq(inline.flat());
	return mergedContent;
}
async function resolveConfig(userConfig = {}, defaults = {}) {
	const config = Object.assign({}, defaults, userConfig);
	const rawPresets = uniqueBy((await Promise.all((config.presets || []).flatMap(toArray).flatMap(resolvePresets))).flat(), (a, b) => a.name === b.name);
	const sortedPresets = [
		...rawPresets.filter((p) => p.enforce === "pre"),
		...rawPresets.filter((p) => !p.enforce),
		...rawPresets.filter((p) => p.enforce === "post")
	];
	const sources = [...sortedPresets, config];
	const sourcesReversed = [...sources].reverse();
	const layers = Object.assign({}, DEFAULT_LAYERS, ...sources.map((i) => i.layers));
	function getMerged(key) {
		return uniq(sources.flatMap((p) => toArray(p[key] || [])));
	}
	const extractors = getMerged("extractors");
	let extractorDefault = sourcesReversed.find((i) => i.extractorDefault !== void 0)?.extractorDefault;
	if (extractorDefault === void 0) extractorDefault = extractorSplit;
	if (extractorDefault && !extractors.includes(extractorDefault)) extractors.unshift(extractorDefault);
	extractors.sort((a, b) => (a.order || 0) - (b.order || 0));
	const rules = getMerged("rules");
	const rulesSize = rules.length;
	const rulesStaticMap = {};
	const rulesDynamic = [];
	for (const [index, rule] of rules.entries()) {
		const meta = rule[2] ?? (rule[2] = {});
		meta.__index = index;
		if (isStaticRule(rule)) toArray(meta.prefix ?? "").forEach((prefix) => {
			rulesStaticMap[prefix + rule[0]] = rule;
		});
		else rulesDynamic.unshift(rule);
	}
	const autocomplete = {
		templates: uniq(sources.flatMap((p) => toArray(p.autocomplete?.templates))),
		extractors: sources.flatMap((p) => toArray(p.autocomplete?.extractors)).sort((a, b) => (a.order || 0) - (b.order || 0)),
		shorthands: mergeAutocompleteShorthands(sources.map((p) => p.autocomplete?.shorthands || {}))
	};
	let separators = getMerged("separators");
	if (!separators.length) separators = [":", "-"];
	const content = mergeContentOptions(getMerged("content"));
	const resolved = {
		mergeSelectors: true,
		warn: true,
		sortLayers: (layers$1) => layers$1,
		...config,
		blocklist: getMerged("blocklist"),
		presets: sortedPresets,
		envMode: config.envMode || "build",
		shortcutsLayer: config.shortcutsLayer || "shortcuts",
		layers,
		theme: mergeThemes(sources.map((p) => p.theme)),
		rules,
		rulesSize,
		rulesDynamic,
		rulesStaticMap,
		preprocess: getMerged("preprocess"),
		postprocess: getMerged("postprocess"),
		preflights: getMerged("preflights"),
		autocomplete,
		variants: getMerged("variants").map(normalizeVariant).sort((a, b) => (a.order || 0) - (b.order || 0)),
		shortcuts: resolveShortcuts(getMerged("shortcuts")).reverse(),
		extractors,
		safelist: getMerged("safelist"),
		separators,
		details: config.details ?? config.envMode === "dev",
		content,
		transformers: uniqueBy(getMerged("transformers"), (a, b) => a.name === b.name)
	};
	const extendThemes = getMerged("extendTheme");
	for (const extendTheme of extendThemes) resolved.theme = extendTheme(resolved.theme, resolved) || resolved.theme;
	for (const p of sources) p?.configResolved?.(resolved);
	return resolved;
}
/**
* Merge multiple configs into one, later ones have higher priority
*/
function mergeConfigs(configs) {
	const maybeArrays = [
		"shortcuts",
		"preprocess",
		"postprocess"
	];
	return configs.map((config) => Object.entries(config).reduce((acc, [key, value]) => ({
		...acc,
		[key]: maybeArrays.includes(key) ? toArray(value) : value
	}), {})).reduce(({ theme: themeA, content: contentA, ...a }, { theme: themeB, content: contentB, ...b }) => {
		const c = mergeDeep(a, b, true);
		if (themeA || themeB) c.theme = mergeThemes([themeA, themeB]);
		if (contentA || contentB) c.content = mergeContentOptions([contentA || {}, contentB || {}]);
		return c;
	}, {});
}
function mergeThemes(themes) {
	return themes.map((theme) => theme ? clone(theme) : {}).reduce((a, b) => mergeDeep(a, b), {});
}
function mergeAutocompleteShorthands(shorthands) {
	return shorthands.reduce((a, b) => {
		const rs = {};
		for (const key in b) {
			const value = b[key];
			if (Array.isArray(value)) rs[key] = `(${value.join("|")})`;
			else rs[key] = value;
		}
		return {
			...a,
			...rs
		};
	}, {});
}
function mergeFilterPatterns(...filterPatterns) {
	return filterPatterns.flatMap(flatternFilterPattern);
}
function flatternFilterPattern(pattern) {
	return Array.isArray(pattern) ? pattern : pattern ? [pattern] : [];
}
function definePreset(preset) {
	return preset;
}
var version = "66.6.6";
var symbols = {
	shortcutsNoMerge: "$$symbol-shortcut-no-merge",
	noMerge: "$$symbol-no-merge",
	noScope: "$$symbol-no-scope",
	variants: "$$symbol-variants",
	parent: "$$symbol-parent",
	selector: "$$symbol-selector",
	layer: "$$symbol-layer",
	sort: "$$symbol-sort",
	body: "$$symbol-body"
};
var UnoGeneratorInternal = class UnoGeneratorInternal {
	constructor(userConfig = {}, defaults = {}) {
		this.userConfig = userConfig;
		this.defaults = defaults;
		this.version = version;
		this.events = createNanoEvents();
		this.config = void 0;
		this.cache = /* @__PURE__ */ new Map();
		this.blocked = /* @__PURE__ */ new Set();
		this.parentOrders = /* @__PURE__ */ new Map();
		this.activatedRules = /* @__PURE__ */ new Set();
		this.resolveCSSResult = (raw, result, rule, context) => {
			const entries = normalizeCSSValues(result).filter((i) => i.length);
			if (entries.length) {
				if (this.config.details) context.rules.push(rule);
				context.generator.activatedRules.add(rule);
				const meta = rule[2];
				return entries.map((css) => {
					if (isString(css)) return [
						meta.__index,
						css,
						meta
					];
					let variants = context.variantHandlers;
					let entryMeta = meta;
					const setVariant = (variant) => {
						variants = [variant, ...variants];
					};
					const setMeta = (partial) => {
						entryMeta = {
							...entryMeta,
							...partial
						};
					};
					for (const entry of css) switch (entry[0]) {
						case symbols.variants:
							if (typeof entry[1] === "function") variants = entry[1](variants) || variants;
							else variants = [...toArray(entry[1]), ...variants];
							break;
						case symbols.parent:
							setVariant({ parent: entry[1] });
							break;
						case symbols.selector:
							setVariant({ selector: entry[1] });
							break;
						case symbols.layer:
							setVariant({ layer: entry[1] });
							break;
						case symbols.sort:
							setMeta({ sort: entry[1] });
							break;
						case symbols.noMerge:
							setMeta({ noMerge: entry[1] });
							break;
						case symbols.noScope:
							setMeta({ noScope: entry[1] });
							break;
						case symbols.body:
							entry[0] = VirtualKey;
							break;
					}
					return [
						meta.__index,
						raw,
						css,
						entryMeta,
						variants
					];
				});
			}
		};
	}
	static async create(userConfig = {}, defaults = {}) {
		const uno = new UnoGeneratorInternal(userConfig, defaults);
		uno.config = await resolveConfig(uno.userConfig, uno.defaults);
		uno.events.emit("config", uno.config);
		return uno;
	}
	async setConfig(userConfig, defaults) {
		if (!userConfig) return;
		if (defaults) this.defaults = defaults;
		this.userConfig = userConfig;
		this.blocked.clear();
		this.parentOrders.clear();
		this.activatedRules.clear();
		this.cache.clear();
		this.config = await resolveConfig(userConfig, this.defaults);
		this.events.emit("config", this.config);
	}
	async applyExtractors(code, id, extracted = /* @__PURE__ */ new Set()) {
		const context = {
			original: code,
			code,
			id,
			extracted,
			envMode: this.config.envMode
		};
		for (const extractor of this.config.extractors) {
			const result = await extractor.extract?.(context);
			if (!result) continue;
			if (isCountableSet(result) && isCountableSet(extracted)) for (const token of result) extracted.setCount(token, extracted.getCount(token) + result.getCount(token));
			else for (const token of result) extracted.add(token);
		}
		return extracted;
	}
	makeContext(raw, applied) {
		const context = {
			rawSelector: raw,
			currentSelector: applied[1],
			theme: this.config.theme,
			generator: this,
			symbols,
			variantHandlers: applied[2],
			constructCSS: (...args) => this.constructCustomCSS(context, ...args),
			variantMatch: applied
		};
		return context;
	}
	async parseToken(raw, alias) {
		if (this.blocked.has(raw)) return;
		const cacheKey = `${raw}${alias ? ` ${alias}` : ""}`;
		if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);
		const current = this.config.preprocess.reduce((acc, p) => p(acc) ?? acc, raw);
		if (this.isBlocked(current)) {
			this.blocked.add(raw);
			this.cache.set(cacheKey, null);
			return;
		}
		const variantResults = await this.matchVariants(raw, current);
		if (variantResults.every((i) => !i || this.isBlocked(i[1]))) {
			this.blocked.add(raw);
			this.cache.set(cacheKey, null);
			return;
		}
		const handleVariantResult = async (matched) => {
			const context = this.makeContext(raw, [
				alias || matched[0],
				matched[1],
				matched[2],
				matched[3]
			]);
			if (this.config.details) context.variants = [...matched[3]];
			const expanded = await this.expandShortcut(context.currentSelector, context);
			return expanded ? await this.stringifyShortcuts(context.variantMatch, context, expanded[0], expanded[1]) : (await this.parseUtil(context.variantMatch, context))?.flatMap((i) => this.stringifyUtil(i, context)).filter(notNull);
		};
		const result = (await Promise.all(variantResults.map((i) => handleVariantResult(i)))).flat().filter((x) => !!x);
		if (result?.length) {
			this.cache.set(cacheKey, result);
			return result;
		}
		this.cache.set(cacheKey, null);
	}
	async generate(input, options = {}) {
		const { id, scope, preflights = true, safelist = true, minify = false, extendedInfo = false } = options;
		const tokens = isString(input) ? await this.applyExtractors(input, id, extendedInfo ? new CountableSet() : /* @__PURE__ */ new Set()) : Array.isArray(input) ? new Set(input) : input;
		if (safelist) {
			const safelistContext = {
				generator: this,
				theme: this.config.theme
			};
			this.config.safelist.flatMap((s) => typeof s === "function" ? s(safelistContext) : s).forEach((s) => {
				const trimmedS = s.trim();
				if (trimmedS && !tokens.has(trimmedS)) tokens.add(trimmedS);
			});
		}
		const nl = minify ? "" : "\n";
		const layerSet = new Set([LAYER_DEFAULT]);
		const matched = extendedInfo ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set();
		const sheet = /* @__PURE__ */ new Map();
		let preflightsMap = {};
		const tokenPromises = Array.from(tokens).map(async (raw) => {
			if (matched.has(raw)) return;
			const payload = await this.parseToken(raw);
			if (payload == null) return;
			if (matched instanceof Map) matched.set(raw, {
				data: payload,
				count: isCountableSet(tokens) ? tokens.getCount(raw) : -1
			});
			else matched.add(raw);
			for (const item of payload) {
				const parent = item[3] || "";
				const layer = item[4]?.layer;
				if (!sheet.has(parent)) sheet.set(parent, []);
				sheet.get(parent).push(item);
				if (layer) layerSet.add(layer);
			}
		});
		await Promise.all(tokenPromises);
		await (async () => {
			if (!preflights) return;
			const preflightContext = {
				generator: this,
				theme: this.config.theme
			};
			const preflightLayerSet = /* @__PURE__ */ new Set([]);
			this.config.preflights.forEach(({ layer = LAYER_PREFLIGHTS }) => {
				layerSet.add(layer);
				preflightLayerSet.add(layer);
			});
			preflightsMap = Object.fromEntries(await Promise.all(Array.from(preflightLayerSet).map(async (layer) => {
				return [layer, (await Promise.all(this.config.preflights.filter((i) => (i.layer || "preflights") === layer).map(async (i) => await i.getCSS(preflightContext)))).filter(Boolean).join(nl)];
			})));
		})();
		const sortLayers = (layers$1) => this.config.sortLayers(layers$1.sort((a, b) => (this.config.layers[a] ?? 0) - (this.config.layers[b] ?? 0) || a.localeCompare(b)));
		const layers = sortLayers(Array.from(layerSet));
		const layerCache = {};
		const outputCssLayers = this.config.outputToCssLayers;
		const getLayerAlias = (layer) => {
			let alias = layer;
			if (typeof outputCssLayers === "object") alias = outputCssLayers.cssLayerName?.(layer);
			return alias === null ? null : alias ?? layer;
		};
		const getLayer = (layer = LAYER_DEFAULT) => {
			if (layerCache[layer]) return layerCache[layer];
			let css = Array.from(sheet).sort((a, b) => (this.parentOrders.get(a[0]) ?? 0) - (this.parentOrders.get(b[0]) ?? 0) || a[0]?.localeCompare(b[0] || "") || 0).map(([parent, items]) => {
				const size = items.length;
				const sorted = items.filter((i) => (i[4]?.layer || "default") === layer).sort((a, b) => {
					return a[0] - b[0] || (a[4]?.sort || 0) - (b[4]?.sort || 0) || a[5]?.currentSelector?.localeCompare(b[5]?.currentSelector ?? "") || a[1]?.localeCompare(b[1] || "") || a[2]?.localeCompare(b[2] || "") || 0;
				}).map(([, selector, body, , meta, , variantNoMerge]) => {
					return [
						[[(selector && !meta?.noScope ? applyScope(selector, scope) : selector) ?? "", meta?.sort ?? 0]],
						body,
						!!(variantNoMerge ?? meta?.noMerge)
					];
				});
				if (!sorted.length) return void 0;
				const ruleLines = sorted.reverse().map(([selectorSortPair, body, noMerge], idx) => {
					if (!noMerge && this.config.mergeSelectors) for (let i = idx + 1; i < size; i++) {
						const current = sorted[i];
						if (current && !current[2] && (selectorSortPair && current[0] || selectorSortPair == null && current[0] == null) && current[1] === body) {
							if (selectorSortPair && current[0]) current[0].push(...selectorSortPair);
							return null;
						}
					}
					const selectors = selectorSortPair ? uniq(selectorSortPair.sort((a, b) => a[1] - b[1] || a[0]?.localeCompare(b[0] || "") || 0).map((pair) => pair[0]).filter(Boolean)) : [];
					return selectors.length ? `${selectors.join(`,${nl}`)}{${body}}` : body;
				}).filter(Boolean);
				const rules = Array.from(new Set(ruleLines)).reverse().join(nl);
				if (!parent) return rules;
				const parents = parent.split(" $$ ");
				return `${parents.join("{")}{${nl}${rules}${nl}${"}".repeat(parents.length)}`;
			}).filter(Boolean).join(nl);
			if (preflights) css = [preflightsMap[layer], css].filter(Boolean).join(nl);
			let alias;
			if (outputCssLayers && css) {
				alias = getLayerAlias(layer);
				if (alias !== null) css = `@layer ${alias}{${nl}${css}${nl}}`;
			}
			const layerMark = minify ? "" : `/* layer: ${layer}${alias && alias !== layer ? `, alias: ${alias}` : ""} */${nl}`;
			return layerCache[layer] = css ? layerMark + css : "";
		};
		const getLayers = (includes = layers, excludes) => {
			const layers$1 = includes.filter((i) => !excludes?.includes(i));
			const css = layers$1.map(getLayer).filter(Boolean);
			if (outputCssLayers) {
				let layerNames = layers$1;
				if (typeof outputCssLayers === "object" && outputCssLayers.allLayers) layerNames = sortLayers(Object.keys(this.config.layers));
				if (layerNames.length > 0) css.unshift(`@layer ${layerNames.map(getLayerAlias).filter(notNull).join(", ")};`);
			}
			return css.join(nl);
		};
		const setLayer = async (layer, callback) => {
			const content = await callback(getLayer(layer));
			layerCache[layer] = content;
			return content;
		};
		return {
			get css() {
				return getLayers();
			},
			layers,
			matched,
			getLayers,
			getLayer,
			setLayer
		};
	}
	async matchVariants(raw, current) {
		const context = {
			rawSelector: raw,
			theme: this.config.theme,
			generator: this
		};
		const match = async (result) => {
			let applied = true;
			const [, , handlers, variants] = result;
			while (applied) {
				applied = false;
				const processed = result[1];
				for (const v of this.config.variants) {
					if (!v.multiPass && variants.has(v)) continue;
					let handler = await v.match(processed, context);
					if (!handler) continue;
					if (isString(handler)) {
						if (handler === processed) continue;
						handler = { matcher: handler };
					}
					if (Array.isArray(handler)) {
						if (!handler.length) continue;
						if (handler.length === 1) handler = handler[0];
						else {
							if (v.multiPass) throw new Error("multiPass can not be used together with array return variants");
							const clones = handler.map((h) => {
								const _processed = h.matcher ?? processed;
								const _handlers = [h, ...handlers];
								const _variants = new Set(variants);
								_variants.add(v);
								return [
									result[0],
									_processed,
									_handlers,
									_variants
								];
							});
							return (await Promise.all(clones.map((c) => match(c)))).flat();
						}
					}
					result[1] = handler.matcher ?? processed;
					handlers.unshift(handler);
					variants.add(v);
					applied = true;
					break;
				}
				if (!applied) break;
				if (handlers.length > 500) throw new Error(`Too many variants applied to "${raw}"`);
			}
			return [result];
		};
		return await match([
			raw,
			current || raw,
			[],
			/* @__PURE__ */ new Set()
		]);
	}
	applyVariants(parsed, variantHandlers = parsed[4], raw = parsed[1]) {
		const variantContextResult = variantHandlers.slice().sort((a, b) => (a.order || 0) - (b.order || 0)).reduceRight((previous, v) => (input) => {
			const entries = v.body?.(input.entries) || input.entries;
			const parents = Array.isArray(v.parent) ? v.parent : [v.parent, void 0];
			const selector = v.selector?.(input.selector, entries);
			return (v.handle ?? defaultVariantHandler)({
				...input,
				entries,
				selector: selector || input.selector,
				parent: parents[0] || input.parent,
				parentOrder: parents[1] || input.parentOrder,
				layer: v.layer || input.layer,
				sort: v.sort || input.sort
			}, previous);
		}, (input) => input)({
			prefix: "",
			selector: toEscapedSelector(raw),
			pseudo: "",
			entries: parsed[2]
		});
		const { parent, parentOrder } = variantContextResult;
		if (parent != null && parentOrder != null) this.parentOrders.set(parent, parentOrder);
		const obj = {
			selector: [
				variantContextResult.prefix,
				variantContextResult.selector,
				variantContextResult.pseudo
			].join(""),
			entries: variantContextResult.entries,
			parent,
			layer: variantContextResult.layer,
			sort: variantContextResult.sort,
			noMerge: variantContextResult.noMerge
		};
		return this.config.postprocess.reduce((utilities, p) => {
			const result = [];
			for (const util of utilities) {
				const processed = p(util);
				if (Array.isArray(processed)) result.push(...processed.filter(notNull));
				else result.push(processed || util);
			}
			return result;
		}, [obj]);
	}
	constructCustomCSS(context, body, overrideSelector) {
		const normalizedBody = normalizeCSSEntries(body);
		if (isString(normalizedBody)) return normalizedBody;
		return this.applyVariants([
			0,
			overrideSelector || context.rawSelector,
			normalizedBody,
			void 0,
			context.variantHandlers
		]).map(({ selector, entries, parent }) => {
			const cssBody = `${selector}{${entriesToCss(entries)}}`;
			if (parent) return `${parent}{${cssBody}}`;
			return cssBody;
		}).join("");
	}
	async parseUtil(input, context, internal = false, shortcutPrefix) {
		const variantResults = isString(input) ? await this.matchVariants(input) : [input];
		const parse = async ([raw, processed, variantHandlers]) => {
			if (this.config.details) context.rules = context.rules ?? [];
			const scopeContext = {
				...context,
				variantHandlers
			};
			const staticMatch = this.config.rulesStaticMap[processed];
			if (staticMatch) {
				if (staticMatch[1] && (internal || !staticMatch[2]?.internal)) return this.resolveCSSResult(raw, staticMatch[1], staticMatch, scopeContext);
			}
			for (const rule of this.config.rulesDynamic) {
				const [matcher, handler, meta] = rule;
				if (meta?.internal && !internal) continue;
				let unprefixed = processed;
				if (meta?.prefix) {
					const prefixes = toArray(meta.prefix);
					if (shortcutPrefix) {
						const shortcutPrefixes = toArray(shortcutPrefix);
						if (!prefixes.some((i) => shortcutPrefixes.includes(i))) continue;
					} else {
						const prefix = prefixes.find((i) => processed.startsWith(i));
						if (prefix == null) continue;
						unprefixed = processed.slice(prefix.length);
					}
				}
				const match = unprefixed.match(matcher);
				if (!match) continue;
				let result = await handler(match, scopeContext);
				if (!result) continue;
				if (typeof result !== "string") {
					if (Symbol.asyncIterator in result) {
						const entries = [];
						for await (const r of result) if (r) entries.push(r);
						result = entries;
					} else if (Symbol.iterator in result && !Array.isArray(result)) result = Array.from(result).filter(notNull);
				}
				const resolvedResult = this.resolveCSSResult(raw, result, rule, scopeContext);
				if (resolvedResult) return resolvedResult;
			}
		};
		const parsed = (await Promise.all(variantResults.map((i) => parse(i)))).flat().filter((x) => !!x);
		if (!parsed.length) return void 0;
		return parsed;
	}
	stringifyUtil(parsed, context) {
		if (!parsed) return;
		if (isRawUtil(parsed)) return [[
			parsed[0],
			void 0,
			parsed[1],
			void 0,
			parsed[2],
			this.config.details ? context : void 0,
			void 0
		]];
		const utilities = this.applyVariants(parsed);
		const result = [];
		for (const util of utilities) {
			const { selector, entries, parent, layer: variantLayer, sort: variantSort, noMerge } = util;
			const body = entriesToCss(entries);
			if (!body) continue;
			const { layer: metaLayer, sort: metaSort, ...meta } = parsed[3] ?? {};
			const ruleMeta = {
				...meta,
				layer: variantLayer ?? metaLayer,
				sort: variantSort ?? metaSort
			};
			result.push([
				parsed[0],
				selector,
				body,
				parent,
				ruleMeta,
				this.config.details ? context : void 0,
				noMerge
			]);
		}
		return result;
	}
	async expandShortcut(input, context, depth = 5) {
		if (depth === 0) return;
		const recordShortcut = this.config.details ? (s) => {
			context.shortcuts = context.shortcuts ?? [];
			context.shortcuts.push(s);
		} : noop;
		let meta;
		let result;
		let stringResult;
		let inlineResult;
		for (const s of this.config.shortcuts) {
			let unprefixed = input;
			if (s[2]?.prefix) {
				const prefix = toArray(s[2].prefix).find((i) => input.startsWith(i));
				if (prefix == null) continue;
				unprefixed = input.slice(prefix.length);
			}
			if (isStaticShortcut(s)) {
				if (s[0] === unprefixed) {
					meta = meta || s[2];
					result = s[1];
					recordShortcut(s);
					break;
				}
			} else {
				const match = unprefixed.match(s[0]);
				if (match) result = s[1](match, context);
				if (result) {
					meta = meta || s[2];
					recordShortcut(s);
					break;
				}
			}
		}
		if (result) {
			stringResult = uniq(toArray(result).filter(isString).map((s) => expandVariantGroup(s.trim()).split(/\s+/g)).flat());
			inlineResult = toArray(result).filter((i) => !isString(i)).map((i) => ({
				handles: [],
				value: i
			}));
		}
		if (!result) {
			const matched = isString(input) ? await this.matchVariants(input) : [input];
			for (const match of matched) {
				const [raw, inputWithoutVariant, handles] = match;
				if (raw !== inputWithoutVariant) {
					const expanded = await this.expandShortcut(inputWithoutVariant, context, depth - 1);
					if (expanded) {
						stringResult = expanded[0].filter(isString).map((item) => raw.replace(inputWithoutVariant, item));
						inlineResult = expanded[0].filter((i) => !isString(i)).map((item) => {
							return {
								handles: [...item.handles, ...handles],
								value: item.value
							};
						});
					}
				}
			}
		}
		if (!stringResult?.length && !inlineResult?.length) return;
		return [[await Promise.all(toArray(stringResult).map(async (s) => (await this.expandShortcut(s, context, depth - 1))?.[0] || [s])), inlineResult].flat(2).filter((x) => !!x), meta];
	}
	async stringifyShortcuts(parent, context, expanded, meta = { layer: this.config.shortcutsLayer }) {
		const layerMap = new BetterMap();
		const parsed = (await Promise.all(uniq(expanded).map(async (i) => {
			const result = isString(i) ? await this.parseUtil(i, context, true, meta.prefix) : [[
				Number.POSITIVE_INFINITY,
				"{inline}",
				normalizeCSSEntries(i.value),
				void 0,
				i.handles
			]];
			if (!result && this.config.warn) warnOnce(`unmatched utility "${i}" in shortcut "${parent[1]}"`);
			return result || [];
		}))).flat(1).filter(Boolean).sort((a, b) => a[0] - b[0]);
		const [raw, , parentVariants] = parent;
		const rawStringifiedUtil = [];
		for (const item of parsed) {
			if (isRawUtil(item)) {
				rawStringifiedUtil.push([
					item[0],
					void 0,
					item[1],
					void 0,
					item[2],
					context,
					void 0
				]);
				continue;
			}
			const isNoMerge = Object.fromEntries(item[2])[symbols.shortcutsNoMerge];
			const variants = [...item[4], ...!isNoMerge ? parentVariants : []];
			for (const { selector, entries, parent: parent$1, sort, noMerge, layer } of this.applyVariants(item, variants, raw)) layerMap.getFallback(layer ?? meta.layer, new TwoKeyMap()).getFallback(selector, parent$1, [[], item[0]])[0].push([
				entries,
				!!(noMerge ?? item[3]?.noMerge),
				sort ?? 0
			]);
		}
		return rawStringifiedUtil.concat(layerMap.flatMap((selectorMap, layer) => selectorMap.map(([e$1, index], selector, joinedParents) => {
			const stringify = (flatten, noMerge, entrySortPair) => {
				const maxSort = Math.max(...entrySortPair.map((e$2) => e$2[1]));
				const entriesList = entrySortPair.map((e$2) => e$2[0]);
				return (flatten ? [entriesList.flat(1)] : entriesList).map((entries) => {
					const body = entriesToCss(entries);
					if (body) return [
						index,
						selector,
						body,
						joinedParents,
						{
							...meta,
							noMerge,
							sort: maxSort,
							layer
						},
						context,
						void 0
					];
				});
			};
			return [[e$1.filter(([, noMerge]) => noMerge).map(([entries, , sort]) => [entries, sort]), true], [e$1.filter(([, noMerge]) => !noMerge).map(([entries, , sort]) => [entries, sort]), false]].map(([e$2, noMerge]) => [...stringify(false, noMerge, e$2.filter(([entries]) => entries.some((entry) => entry[0] === symbols.shortcutsNoMerge))), ...stringify(true, noMerge, e$2.filter(([entries]) => entries.every((entry) => entry[0] !== symbols.shortcutsNoMerge)))]);
		}).flat(2).filter(Boolean)));
	}
	isBlocked(raw) {
		return !raw || this.config.blocklist.map((e$1) => Array.isArray(e$1) ? e$1[0] : e$1).some((e$1) => typeof e$1 === "function" ? e$1(raw) : isString(e$1) ? e$1 === raw : e$1.test(raw));
	}
	getBlocked(raw) {
		const rule = this.config.blocklist.find((e$1) => {
			const v = Array.isArray(e$1) ? e$1[0] : e$1;
			return typeof v === "function" ? v(raw) : isString(v) ? v === raw : v.test(raw);
		});
		return rule ? Array.isArray(rule) ? rule : [rule, void 0] : void 0;
	}
};
var UnoGenerator = class extends UnoGeneratorInternal {
	/**
	* @deprecated `new UnoGenerator` is deprecated, please use `createGenerator()` instead
	*/
	constructor(userConfig = {}, defaults = {}) {
		super(userConfig, defaults);
		console.warn("`new UnoGenerator()` is deprecated, please use `createGenerator()` instead");
	}
};
async function createGenerator(config, defaults) {
	return await UnoGeneratorInternal.create(config, defaults);
}
var regexScopePlaceholder = /\s\$\$\s+/g;
function hasScopePlaceholder(css) {
	return regexScopePlaceholder.test(css);
}
function applyScope(css, scope) {
	if (hasScopePlaceholder(css)) return css.replace(regexScopePlaceholder, scope ? ` ${scope} ` : " ");
	else return scope ? `${scope} ${css}` : css;
}
var attributifyRe = /^\[(.+?)(~?=)"(.*)"\]$/;
function toEscapedSelector(raw) {
	if (attributifyRe.test(raw)) return raw.replace(attributifyRe, (_, n, s, i) => `[${e(n)}${s}"${e(i)}"]`);
	return `.${e(raw)}`;
}
function defaultVariantHandler(input, next) {
	return next(input);
}
//#endregion
//#region node_modules/@unocss/preset-attributify/dist/index.mjs
var variantsRE = /^(?!.*\[[^:]+:.+\]$)((?:.+:)?!?)(.*)$/;
function variantAttributify(options = {}) {
	const prefix = options.prefix ?? "un-";
	const prefixedOnly = options.prefixedOnly ?? false;
	const trueToNonValued = options.trueToNonValued ?? false;
	let variantsValueRE;
	return {
		name: "attributify",
		match(input, { generator }) {
			const match = isAttributifySelector(input);
			if (!match) return;
			let name = match[1];
			if (name.startsWith(prefix)) name = name.slice(prefix.length);
			else if (prefixedOnly) return;
			const content = match[2];
			const [, variants = "", body = content] = content.match(variantsRE) || [];
			if (body === "~" || trueToNonValued && body === "true" || !body) return `${variants}${name}`;
			if (variantsValueRE == null) {
				const separators = generator?.config?.separators?.join("|");
				if (separators) variantsValueRE = /* @__PURE__ */ new RegExp(`^(.*\\](?:${separators}))(\\[[^\\]]+?\\])$`);
				else variantsValueRE = false;
			}
			if (variantsValueRE) {
				const [, bodyVariant, bracketValue] = content.match(variantsValueRE) || [];
				if (bracketValue) return `${bodyVariant}${variants}${name}-${bracketValue}`;
			}
			if (variants && body.match(/^[\d.]+$/)) {
				const variantParts = variants.split(/([^:]*:)/g).filter(Boolean);
				const _body = variantParts.pop() + body;
				const _variants = variantParts.join("");
				return [{ matcher: `${variants}${name}-${body}` }, { matcher: `${_variants}${name}-${_body}` }];
			}
			return `${variants}${name}-${body}`;
		}
	};
}
var elementRE$1 = /(<\w[\w:.$-]*\s)((?:'[^>']*'|"[^>"]*"|`[^>`]*`|\{[^>}]*\}|[^>]*?)*)/g;
var valuedAttributeRE$1 = /(\?|(?!\d|-{2}|-\d)[\w\u00A0-\uFFFF-:%]+)(?:=("[^"]*|'[^']*))?/g;
var splitterRE$1 = /[\s'"`;>]+/;
function autocompleteExtractorAttributify(options) {
	return {
		name: "attributify",
		extract: ({ content, cursor }) => {
			const matchedElements = content.matchAll(elementRE$1);
			let attrs;
			let elPos = 0;
			for (const match of matchedElements) {
				const [, prefix, content$1] = match;
				const currentPos$1 = match.index + prefix.length;
				if (cursor > currentPos$1 && cursor <= currentPos$1 + content$1.length) {
					elPos = currentPos$1;
					attrs = content$1;
					break;
				}
			}
			if (!attrs) return null;
			const matchedAttributes = attrs.matchAll(valuedAttributeRE$1);
			let attrsPos = 0;
			let attrName;
			let attrValues;
			for (const match of matchedAttributes) {
				const [matched, name, rawValues] = match;
				const currentPos$1 = elPos + match.index;
				if (cursor > currentPos$1 && cursor <= currentPos$1 + matched.length) {
					attrsPos = currentPos$1;
					attrName = name;
					attrValues = rawValues?.slice(1);
					break;
				}
			}
			if (!attrName) return null;
			if (attrName === "class" || attrName === "className" || attrName === ":class") return null;
			const hasPrefix = !!options?.prefix && attrName.startsWith(options.prefix);
			if (options?.prefixedOnly && !hasPrefix) return null;
			const attrNameWithoutPrefix = hasPrefix ? attrName.slice(options.prefix.length) : attrName;
			if (attrValues === void 0) return {
				extracted: attrNameWithoutPrefix,
				resolveReplacement(suggestion) {
					const startOffset = hasPrefix ? options.prefix.length : 0;
					return {
						start: attrsPos + startOffset,
						end: attrsPos + attrName.length,
						replacement: suggestion
					};
				}
			};
			const attrValuePos = attrsPos + attrName.length + 2;
			let matchSplit = splitterRE$1.exec(attrValues);
			let currentPos = 0;
			let value;
			while (matchSplit) {
				const [matched] = matchSplit;
				if (cursor > attrValuePos + currentPos && cursor <= attrValuePos + currentPos + matchSplit.index) {
					value = attrValues.slice(currentPos, currentPos + matchSplit.index);
					break;
				}
				currentPos += matchSplit.index + matched.length;
				matchSplit = splitterRE$1.exec(attrValues.slice(currentPos));
			}
			if (value === void 0) value = attrValues.slice(currentPos);
			const [, variants = "", body] = value.match(variantsRE) || [];
			return {
				extracted: `${variants}${attrNameWithoutPrefix}-${body}`,
				transformSuggestions(suggestions) {
					return suggestions.filter((v) => v.startsWith(`${variants}${attrNameWithoutPrefix}-`)).map((v) => variants + v.slice(variants.length + attrNameWithoutPrefix.length + 1));
				},
				resolveReplacement(suggestion) {
					return {
						start: currentPos + attrValuePos,
						end: currentPos + attrValuePos + value.length,
						replacement: variants + suggestion.slice(variants.length + attrNameWithoutPrefix.length + 1)
					};
				}
			};
		}
	};
}
var strippedPrefixes = ["v-bind:", ":"];
var splitterRE = /[\s'"`;]+/g;
var elementRE$2 = /<[^>\s]*\s((?:'[^']*'|"[^"]*"|`[^`]*`|\{[^}]*\}|=>|[^>]*?)*)/g;
var valuedAttributeRE$2 = /(\?|(?!\d|-{2}|-\d)[\w\u00A0-\uFFFF:!%.~<-]+)=?(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})?/g;
var defaultIgnoreAttributes = [
	"placeholder",
	"fill",
	"opacity",
	"stroke-opacity"
];
function extractorAttributify(options) {
	const ignoreAttributes = options?.ignoreAttributes ?? defaultIgnoreAttributes;
	const nonValuedAttribute = options?.nonValuedAttribute ?? true;
	const trueToNonValued = options?.trueToNonValued ?? false;
	return {
		name: "@unocss/preset-attributify/extractor",
		extract({ code }) {
			return Array.from(code.matchAll(elementRE$2)).flatMap((match) => Array.from((match[1] || "").matchAll(valuedAttributeRE$2))).flatMap(([, name, ...contents]) => {
				const content = contents.filter(Boolean).join("");
				if (ignoreAttributes.includes(name)) return [];
				for (const prefix of strippedPrefixes) if (name.startsWith(prefix)) {
					name = name.slice(prefix.length);
					break;
				}
				if (!content) {
					if (isValidSelector(name) && nonValuedAttribute !== false) {
						const result = [`[${name}=""]`];
						if (trueToNonValued) result.push(`[${name}="true"]`);
						return result;
					}
					return [];
				}
				if (["class", "className"].includes(name)) return content.split(splitterRE).filter(isValidSelector);
				else if (elementRE$2.test(content)) {
					elementRE$2.lastIndex = 0;
					return this.extract({ code: content });
				} else {
					if (options?.prefixedOnly && options.prefix && !name.startsWith(options.prefix)) return [];
					return content.split(splitterRE).filter((v) => Boolean(v) && v !== ":").map((v) => `[${name}~="${v}"]`);
				}
			});
		}
	};
}
var src_default = definePreset((options = {}) => {
	options.strict = options.strict ?? false;
	options.prefix = options.prefix ?? "un-";
	options.prefixedOnly = options.prefixedOnly ?? false;
	options.nonValuedAttribute = options.nonValuedAttribute ?? true;
	options.ignoreAttributes = options.ignoreAttributes ?? defaultIgnoreAttributes;
	return {
		name: "@unocss/preset-attributify",
		enforce: "post",
		variants: [variantAttributify(options)],
		extractors: [extractorAttributify(options)],
		options,
		autocomplete: { extractors: [autocompleteExtractorAttributify(options)] },
		extractorDefault: options.strict ? false : void 0
	};
});
//#endregion
//#region node_modules/@iconify/utils/lib/svg/trim.js
/**
* Remove whitespace
*/
function trimSVG(str) {
	return str.replace(/(['"])\s*\n\s*([^>\\/\s])/g, "$1 $2").replace(/(["';{}><])\s*\n\s*/g, "$1").replace(/\s*\n\s*/g, " ").replace(/\s+"/g, "\"").replace(/="\s+/g, "=\"").replace(/(\s)+\/>/g, "/>").trim();
}
//#endregion
//#region node_modules/@iconify/utils/lib/svg/size.js
/**
* Regular expressions for calculating dimensions
*/
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
	if (ratio === 1) return size;
	precision = precision || 100;
	if (typeof size === "number") return Math.ceil(size * ratio * precision) / precision;
	if (typeof size !== "string") return size;
	const oldParts = size.split(unitsSplit);
	if (oldParts === null || !oldParts.length) return size;
	const newParts = [];
	let code = oldParts.shift();
	let isNumber = unitsTest.test(code);
	while (true) {
		if (isNumber) {
			const num = parseFloat(code);
			if (isNaN(num)) newParts.push(code);
			else newParts.push(Math.ceil(num * ratio * precision) / precision);
		} else newParts.push(code);
		code = oldParts.shift();
		if (code === void 0) return newParts.join("");
		isNumber = !isNumber;
	}
}
//#endregion
//#region node_modules/@iconify/utils/lib/icon/defaults.js
/** Default values for dimensions */
var defaultIconDimensions = Object.freeze({
	left: 0,
	top: 0,
	width: 16,
	height: 16
});
/** Default values for transformations */
var defaultIconTransformations = Object.freeze({
	rotate: 0,
	vFlip: false,
	hFlip: false
});
/** Default values for all optional IconifyIcon properties */
var defaultIconProps = Object.freeze({
	...defaultIconDimensions,
	...defaultIconTransformations
});
/** Default values for all properties used in ExtendedIconifyIcon */
var defaultExtendedIconProps = Object.freeze({
	...defaultIconProps,
	body: "",
	hidden: false
});
//#endregion
//#region node_modules/@iconify/utils/lib/customisations/defaults.js
/**
* Default icon customisations values
*/
var defaultIconSizeCustomisations = Object.freeze({
	width: null,
	height: null
});
var defaultIconCustomisations = Object.freeze({
	...defaultIconSizeCustomisations,
	...defaultIconTransformations
});
//#endregion
//#region node_modules/@iconify/utils/lib/svg/defs.js
function splitSVGDefs(content, tag = "defs") {
	let defs = "";
	const index = content.indexOf("<" + tag);
	while (index >= 0) {
		const start = content.indexOf(">", index);
		const end = content.indexOf("</" + tag);
		if (start === -1 || end === -1) break;
		const endEnd = content.indexOf(">", end);
		if (endEnd === -1) break;
		defs += content.slice(start + 1, end).trim();
		content = content.slice(0, index).trim() + content.slice(endEnd + 1);
	}
	return {
		defs,
		content
	};
}
/**
* Merge defs and content
*/
function mergeDefsAndContent(defs, content) {
	return defs ? "<defs>" + defs + "</defs>" + content : content;
}
/**
* Wrap SVG content, without wrapping definitions
*/
function wrapSVGContent(body, start, end) {
	const split = splitSVGDefs(body);
	return mergeDefsAndContent(split.defs, start + split.content + end);
}
//#endregion
//#region node_modules/@iconify/utils/lib/svg/build.js
/**
* Check if value should be unset. Allows multiple keywords
*/
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
/**
* Get SVG attributes and content from icon + customisations
*
* Does not generate style to make it compatible with frameworks that use objects for style, such as React.
* Instead, it generates 'inline' value. If true, rendering engine should add verticalAlign: -0.125em to icon.
*
* Customisations should be normalised by platform specific parser.
* Result should be converted to <svg> by platform specific parser.
* Use replaceIDs to generate unique IDs for body.
*/
function iconToSVG(icon, customisations) {
	const fullIcon = {
		...defaultIconProps,
		...icon
	};
	const fullCustomisations = {
		...defaultIconCustomisations,
		...customisations
	};
	const box = {
		left: fullIcon.left,
		top: fullIcon.top,
		width: fullIcon.width,
		height: fullIcon.height
	};
	let body = fullIcon.body;
	[fullIcon, fullCustomisations].forEach((props) => {
		const transformations = [];
		const hFlip = props.hFlip;
		const vFlip = props.vFlip;
		let rotation = props.rotate;
		if (hFlip) if (vFlip) rotation += 2;
		else {
			transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
			transformations.push("scale(-1 1)");
			box.top = box.left = 0;
		}
		else if (vFlip) {
			transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
			transformations.push("scale(1 -1)");
			box.top = box.left = 0;
		}
		let tempValue;
		if (rotation < 0) rotation -= Math.floor(rotation / 4) * 4;
		rotation = rotation % 4;
		switch (rotation) {
			case 1:
				tempValue = box.height / 2 + box.top;
				transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
				break;
			case 2:
				transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
				break;
			case 3:
				tempValue = box.width / 2 + box.left;
				transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
				break;
		}
		if (rotation % 2 === 1) {
			if (box.left !== box.top) {
				tempValue = box.left;
				box.left = box.top;
				box.top = tempValue;
			}
			if (box.width !== box.height) {
				tempValue = box.width;
				box.width = box.height;
				box.height = tempValue;
			}
		}
		if (transformations.length) body = wrapSVGContent(body, "<g transform=\"" + transformations.join(" ") + "\">", "</g>");
	});
	const customisationsWidth = fullCustomisations.width;
	const customisationsHeight = fullCustomisations.height;
	const boxWidth = box.width;
	const boxHeight = box.height;
	let width;
	let height;
	if (customisationsWidth === null) {
		height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
		width = calculateSize(height, boxWidth / boxHeight);
	} else {
		width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
		height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
	}
	const attributes = {};
	const setAttr = (prop, value) => {
		if (!isUnsetKeyword(value)) attributes[prop] = value.toString();
	};
	setAttr("width", width);
	setAttr("height", height);
	const viewBox = [
		box.left,
		box.top,
		boxWidth,
		boxHeight
	];
	attributes.viewBox = viewBox.join(" ");
	return {
		attributes,
		viewBox,
		body
	};
}
//#endregion
//#region node_modules/@iconify/utils/lib/loader/utils.js
var svgWidthRegex = /\swidth\s*=\s*["']([\w.]+)["']/;
var svgHeightRegex = /\sheight\s*=\s*["']([\w.]+)["']/;
var svgTagRegex = /<svg\s+/;
function configureSvgSize(svg, props, scale) {
	const svgNode = svg.slice(0, svg.indexOf(">"));
	const check = (prop, regex) => {
		const result = regex.exec(svgNode);
		const isSet = result != null;
		const propValue = props[prop];
		if (!propValue && !isUnsetKeyword(propValue)) {
			if (typeof scale === "number") {
				if (scale > 0) props[prop] = calculateSize(result?.[1] ?? "1em", scale);
			} else if (result) props[prop] = result[1];
		}
		return isSet;
	};
	return [check("width", svgWidthRegex), check("height", svgHeightRegex)];
}
async function mergeIconProps(svg, collection, icon, options, propsProvider, afterCustomizations) {
	const { scale, addXmlNs = false } = options ?? {};
	const { additionalProps = {}, iconCustomizer } = options?.customizations ?? {};
	const props = await propsProvider?.() ?? {};
	await iconCustomizer?.(collection, icon, props);
	Object.keys(additionalProps).forEach((p) => {
		const v = additionalProps[p];
		if (v !== void 0 && v !== null) props[p] = v;
	});
	afterCustomizations?.(props);
	const [widthOnSvg, heightOnSvg] = configureSvgSize(svg, props, scale);
	if (addXmlNs) {
		if (!svg.includes("xmlns=") && !props["xmlns"]) props["xmlns"] = "http://www.w3.org/2000/svg";
		if (!svg.includes("xmlns:xlink=") && svg.includes("xlink:") && !props["xmlns:xlink"]) props["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
	}
	const propsToAdd = Object.keys(props).map((p) => p === "width" && widthOnSvg || p === "height" && heightOnSvg ? null : `${p}="${props[p]}"`).filter((p) => p != null);
	if (propsToAdd.length) svg = svg.replace(svgTagRegex, `<svg ${propsToAdd.join(" ")} `);
	if (options) {
		const { defaultStyle, defaultClass } = options;
		if (defaultClass && !svg.includes("class=")) svg = svg.replace(svgTagRegex, `<svg class="${defaultClass}" `);
		if (defaultStyle && !svg.includes("style=")) svg = svg.replace(svgTagRegex, `<svg style="${defaultStyle}" `);
	}
	const usedProps = options?.usedProps;
	if (usedProps) {
		Object.keys(additionalProps).forEach((p) => {
			const v = props[p];
			if (v !== void 0 && v !== null) usedProps[p] = v;
		});
		if (typeof props.width !== "undefined" && props.width !== null) usedProps.width = props.width;
		if (typeof props.height !== "undefined" && props.height !== null) usedProps.height = props.height;
	}
	return svg;
}
//#endregion
//#region node_modules/@iconify/utils/lib/loader/custom.js
/**
* Get custom icon from inline collection or using loader
*/
async function getCustomIcon(custom, collection, icon, options) {
	let result;
	try {
		if (typeof custom === "function") result = await custom(icon);
		else {
			const inline = custom[icon];
			result = typeof inline === "function" ? await inline() : inline;
		}
	} catch (err) {
		console.warn(`Failed to load custom icon "${icon}" in "${collection}":`, err);
		return;
	}
	if (result) {
		const cleanupIdx = result.indexOf("<svg");
		if (cleanupIdx > 0) result = result.slice(cleanupIdx);
		const { transform } = options?.customizations ?? {};
		result = typeof transform === "function" ? await transform(result, collection, icon) : result;
		if (!result.startsWith("<svg")) {
			console.warn(`Custom icon "${icon}" in "${collection}" is not a valid SVG`);
			return result;
		}
		return await mergeIconProps(options?.customizations?.trimCustomSvg === true ? trimSVG(result) : result, collection, icon, options, void 0);
	}
}
//#endregion
//#region node_modules/@iconify/utils/lib/icon/transformations.js
/**
* Merge transformations
*/
function mergeIconTransformations(obj1, obj2) {
	const result = {};
	if (!obj1.hFlip !== !obj2.hFlip) result.hFlip = true;
	if (!obj1.vFlip !== !obj2.vFlip) result.vFlip = true;
	const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
	if (rotate) result.rotate = rotate;
	return result;
}
//#endregion
//#region node_modules/@iconify/utils/lib/icon/merge.js
/**
* Merge icon and alias
*
* Can also be used to merge default values and icon
*/
function mergeIconData(parent, child) {
	const result = mergeIconTransformations(parent, child);
	for (const key in defaultExtendedIconProps) if (key in defaultIconTransformations) {
		if (key in parent && !(key in result)) result[key] = defaultIconTransformations[key];
	} else if (key in child) result[key] = child[key];
	else if (key in parent) result[key] = parent[key];
	return result;
}
//#endregion
//#region node_modules/@iconify/utils/lib/icon-set/tree.js
/**
* Resolve icon set icons
*
* Returns parent icon for each icon
*/
function getIconsTree(data, names) {
	const icons = data.icons;
	const aliases = data.aliases || Object.create(null);
	const resolved = Object.create(null);
	function resolve(name) {
		if (icons[name]) return resolved[name] = [];
		if (!(name in resolved)) {
			resolved[name] = null;
			const parent = aliases[name] && aliases[name].parent;
			const value = parent && resolve(parent);
			if (value) resolved[name] = [parent].concat(value);
		}
		return resolved[name];
	}
	(names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
	return resolved;
}
//#endregion
//#region node_modules/@iconify/utils/lib/icon-set/get-icon.js
/**
* Get icon data, using prepared aliases tree
*/
function internalGetIconData(data, name, tree) {
	const icons = data.icons;
	const aliases = data.aliases || Object.create(null);
	let currentProps = {};
	function parse(name$1) {
		currentProps = mergeIconData(icons[name$1] || aliases[name$1], currentProps);
	}
	parse(name);
	tree.forEach(parse);
	return mergeIconData(data, currentProps);
}
/**
* Get data for icon
*/
function getIconData(data, name) {
	if (data.icons[name]) return internalGetIconData(data, name, []);
	const tree = getIconsTree(data, [name])[name];
	return tree ? internalGetIconData(data, name, tree) : null;
}
//#endregion
//#region node_modules/@iconify/utils/lib/loader/modern.js
async function searchForIcon(iconSet, collection, ids, options) {
	let iconData;
	const { customize } = options?.customizations ?? {};
	for (const id of ids) {
		iconData = getIconData(iconSet, id);
		if (iconData) {
			let defaultCustomizations = { ...defaultIconCustomisations };
			if (typeof customize === "function") {
				iconData = Object.assign({}, iconData);
				defaultCustomizations = customize(defaultCustomizations, iconData, `${collection}:${id}`) ?? defaultCustomizations;
			}
			const { attributes: { width, height, ...restAttributes }, body } = iconToSVG(iconData, defaultCustomizations);
			const scale = options?.scale;
			return await mergeIconProps(`<svg >${body}</svg>`, collection, id, options, () => {
				return { ...restAttributes };
			}, (props) => {
				const check = (prop, defaultValue) => {
					const propValue = props[prop];
					let value;
					if (!isUnsetKeyword(propValue)) {
						if (propValue) return;
						if (typeof scale === "number") {
							if (scale) value = calculateSize(defaultValue ?? "1em", scale);
						} else value = defaultValue;
					}
					if (!value) delete props[prop];
					else props[prop] = value;
				};
				check("width", width);
				check("height", height);
			});
		}
	}
}
//#endregion
//#region node_modules/@iconify/utils/lib/loader/loader.js
var loadIcon = async (collection, icon, options) => {
	const custom = options?.customCollections?.[collection];
	if (custom) if (typeof custom === "function") {
		let result;
		try {
			result = await custom(icon);
		} catch (err) {
			console.warn(`Failed to load custom icon "${icon}" in "${collection}":`, err);
			return;
		}
		if (result) {
			if (typeof result === "string") return await getCustomIcon(() => result, collection, icon, options);
			if ("icons" in result) {
				const ids = [
					icon,
					icon.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
					icon.replace(/([a-z])(\d+)/g, "$1-$2")
				];
				return await searchForIcon(result, collection, ids, options);
			}
		}
	} else return await getCustomIcon(custom, collection, icon, options);
};
//#endregion
//#region node_modules/@iconify/utils/lib/svg/url.js
/**
* Encode SVG for use in url()
*
* Short alternative to encodeURIComponent() that encodes only stuff used in SVG, generating
* smaller code.
*/
function encodeSVGforURL(svg) {
	return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
//#endregion
//#region node_modules/@iconify/utils/lib/svg/encode-svg-for-css.js
/**
* Encode the `SVG` to be used on `CSS`: https://bl.ocks.org/jennyknuth/222825e315d45a738ed9d6e04c7a88d0.
*
* @param svg The `SVG` source.
*/
function encodeSvgForCss(svg) {
	let useSvg = svg.startsWith("<svg>") ? svg.replace("<svg>", "<svg >") : svg;
	if (!useSvg.includes(" xmlns:xlink=") && useSvg.includes(" xlink:")) useSvg = useSvg.replace("<svg ", "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" ");
	if (!useSvg.includes(" xmlns=")) useSvg = useSvg.replace("<svg ", "<svg xmlns=\"http://www.w3.org/2000/svg\" ");
	return encodeSVGforURL(useSvg);
}
//#endregion
//#region node_modules/@unocss/preset-icons/dist/core-DbR55bSN.mjs
function getEnvFlags$1() {
	const isNode = typeof process !== "undefined" && process.stdout;
	return {
		isNode,
		isVSCode: isNode && !!process.env.VSCODE_CWD,
		isESLint: isNode && !!process.env.ESLINT
	};
}
var collections_default = [
	"academicons",
	"akar-icons",
	"ant-design",
	"arcticons",
	"basil",
	"bi",
	"bitcoin-icons",
	"boxicons",
	"bpmn",
	"brandico",
	"bubbles",
	"bx",
	"bxl",
	"bxs",
	"bytesize",
	"carbon",
	"catppuccin",
	"cbi",
	"charm",
	"ci",
	"cib",
	"cif",
	"cil",
	"circle-flags",
	"circum",
	"clarity",
	"codex",
	"codicon",
	"covid",
	"cryptocurrency-color",
	"cryptocurrency",
	"cuida",
	"dashicons",
	"devicon-line",
	"devicon-original",
	"devicon-plain",
	"devicon",
	"dinkie-icons",
	"duo-icons",
	"ei",
	"el",
	"emblemicons",
	"emojione-monotone",
	"emojione-v1",
	"emojione",
	"entypo-social",
	"entypo",
	"eos-icons",
	"ep",
	"et",
	"eva",
	"f7",
	"fa-brands",
	"fa-regular",
	"fa-solid",
	"fa",
	"fa6-brands",
	"fa6-regular",
	"fa6-solid",
	"fa7-brands",
	"fa7-regular",
	"fa7-solid",
	"fad",
	"famicons",
	"fe",
	"feather",
	"file-icons",
	"flag",
	"flagpack",
	"flat-color-icons",
	"flat-ui",
	"flowbite",
	"fluent-color",
	"fluent-emoji-flat",
	"fluent-emoji-high-contrast",
	"fluent-emoji",
	"fluent-mdl2",
	"fluent",
	"fontelico",
	"fontisto",
	"formkit",
	"foundation",
	"fxemoji",
	"gala",
	"game-icons",
	"garden",
	"geo",
	"gg",
	"gis",
	"glyphs-poly",
	"glyphs",
	"gravity-ui",
	"gridicons",
	"grommet-icons",
	"guidance",
	"healthicons",
	"heroicons-outline",
	"heroicons-solid",
	"heroicons",
	"hugeicons",
	"humbleicons",
	"ic",
	"icomoon-free",
	"icon-park-outline",
	"icon-park-solid",
	"icon-park-twotone",
	"icon-park",
	"iconamoon",
	"iconoir",
	"icons8",
	"il",
	"ion",
	"iwwa",
	"ix",
	"jam",
	"la",
	"lets-icons",
	"line-md",
	"lineicons",
	"logos",
	"ls",
	"lsicon",
	"lucide-lab",
	"lucide",
	"mage",
	"majesticons",
	"maki",
	"map",
	"marketeq",
	"material-icon-theme",
	"material-symbols-light",
	"material-symbols",
	"mdi-light",
	"mdi",
	"medical-icon",
	"memory",
	"meteocons",
	"meteor-icons",
	"mi",
	"mingcute",
	"mono-icons",
	"mynaui",
	"nimbus",
	"nonicons",
	"noto-v1",
	"noto",
	"nrk",
	"octicon",
	"oi",
	"ooui",
	"openmoji",
	"oui",
	"pajamas",
	"pepicons-pencil",
	"pepicons-pop",
	"pepicons-print",
	"pepicons",
	"ph",
	"picon",
	"pixel",
	"pixelarticons",
	"prime",
	"proicons",
	"ps",
	"qlementine-icons",
	"quill",
	"radix-icons",
	"raphael",
	"ri",
	"rivet-icons",
	"roentgen",
	"si-glyph",
	"si",
	"sidekickicons",
	"simple-icons",
	"simple-line-icons",
	"skill-icons",
	"solar",
	"stash",
	"streamline-block",
	"streamline-color",
	"streamline-cyber-color",
	"streamline-cyber",
	"streamline-emojis",
	"streamline-flex-color",
	"streamline-flex",
	"streamline-freehand-color",
	"streamline-freehand",
	"streamline-guidance",
	"streamline-kameleon-color",
	"streamline-logos",
	"streamline-pixel",
	"streamline-plump-color",
	"streamline-plump",
	"streamline-sharp-color",
	"streamline-sharp",
	"streamline-stickies-color",
	"streamline-ultimate-color",
	"streamline-ultimate",
	"streamline",
	"subway",
	"svg-spinners",
	"system-uicons",
	"tabler",
	"tdesign",
	"teenyicons",
	"temaki",
	"token-branded",
	"token",
	"topcoat",
	"twemoji",
	"typcn",
	"uil",
	"uim",
	"uis",
	"uit",
	"uiw",
	"unjs",
	"vaadin",
	"vs",
	"vscode-icons",
	"websymbol",
	"weui",
	"whh",
	"wi",
	"wordpress",
	"wpf",
	"zmdi",
	"zondicons"
];
var COLLECTION_NAME_PARTS_MAX = 3;
function createPresetIcons(lookupIconLoader) {
	return definePreset((options = {}) => {
		const { scale = 1, mode = "auto", prefix = "i-", warn = false, iconifyCollectionsNames, collections: customCollections, extraProperties = {}, customizations = {}, autoInstall = false, collectionsNodeResolvePath, layer = "icons", unit, processor } = options;
		const flags = getEnvFlags$1();
		const loaderOptions = {
			addXmlNs: true,
			scale,
			customCollections,
			autoInstall,
			cwd: collectionsNodeResolvePath,
			warn: void 0,
			customizations: {
				...customizations,
				additionalProps: { ...extraProperties },
				trimCustomSvg: true,
				async iconCustomizer(collection, icon, props) {
					await customizations.iconCustomizer?.(collection, icon, props);
					if (unit) {
						if (!props.width) props.width = `${scale}${unit}`;
						if (!props.height) props.height = `${scale}${unit}`;
					}
				}
			}
		};
		let iconLoader;
		return {
			name: "@unocss/preset-icons",
			enforce: "pre",
			options,
			layers: { icons: -30 },
			api: {
				encodeSvgForCss,
				parseIconWithLoader
			},
			rules: [[
				/^([\w:-]+)(?:\?(mask|bg|auto))?$/,
				async (matcher) => {
					let [full, body, _mode = mode] = matcher;
					iconLoader = iconLoader || await lookupIconLoader(options);
					const usedProps = {};
					const parsed = await parseIconWithLoader(body, iconLoader, {
						...loaderOptions,
						usedProps
					}, iconifyCollectionsNames);
					if (!parsed) {
						if (warn && !flags.isESLint) warnOnce(`failed to load icon "${full}"`);
						return;
					}
					let cssObject;
					const url = `url("data:image/svg+xml;utf8,${encodeSvgForCss(parsed.svg)}")`;
					if (_mode === "auto") _mode = parsed.svg.includes("currentColor") ? "mask" : "bg";
					if (_mode === "mask") cssObject = {
						"--un-icon": url,
						"-webkit-mask": "var(--un-icon) no-repeat",
						"mask": "var(--un-icon) no-repeat",
						"-webkit-mask-size": "100% 100%",
						"mask-size": "100% 100%",
						"background-color": "currentColor",
						"color": "inherit",
						...usedProps
					};
					else cssObject = {
						"background": `${url} no-repeat`,
						"background-size": "100% 100%",
						"background-color": "transparent",
						...usedProps
					};
					processor?.(cssObject, {
						...parsed,
						icon: parsed.name,
						mode: _mode
					});
					return cssObject;
				},
				{
					layer,
					prefix
				}
			]]
		};
	});
}
function createCDNFetchLoader(fetcher, cdnBase, cacheMap = /* @__PURE__ */ new Map()) {
	function fetchCollection(name) {
		if (!collections_default.includes(name)) return void 0;
		if (!cacheMap.has(name)) cacheMap.set(name, fetcher(`${cdnBase}@iconify-json/${name}/icons.json`));
		return cacheMap.get(name);
	}
	return async (collection, icon, options) => {
		let result = await loadIcon(collection, icon, options);
		if (result) return result;
		const iconSet = await fetchCollection(collection);
		if (iconSet) result = await searchForIcon(iconSet, collection, [
			icon,
			icon.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
			icon.replace(/([a-z])(\d+)/g, "$1-$2")
		], options);
		return result;
	};
}
async function parseIconWithLoader(body, loader, options = {}, safeCollectionsNames = []) {
	let collection = "";
	let name = "";
	let svg;
	const allCollections = new Set([
		...collections_default,
		...safeCollectionsNames,
		...Object.keys(options.customCollections || {})
	]);
	if (body.includes(":")) {
		[collection, name] = body.split(":");
		if (!allCollections.has(collection)) return;
		svg = await loader(collection, name, options);
	} else {
		const parts = body.split(/-/g);
		for (let i = COLLECTION_NAME_PARTS_MAX; i >= 1; i--) {
			collection = parts.slice(0, i).join("-");
			if (!allCollections.has(collection)) continue;
			name = parts.slice(i).join("-");
			svg = await loader(collection, name, options);
			if (svg) break;
		}
	}
	if (!svg) return;
	return {
		collection,
		name,
		svg
	};
}
//#endregion
//#region node_modules/@unocss/preset-icons/dist/cdn-CH1oTUdH.mjs
async function createCDNLoader(cdnBase) {
	const { $fetch } = await import("./dist-BoIO7K9F.js");
	return createCDNFetchLoader($fetch, cdnBase);
}
var browser_default = createPresetIcons(async (options) => {
	const fetcher = options?.customFetch;
	const cdn = options?.cdn;
	if (fetcher && cdn) return createCDNFetchLoader(fetcher, cdn);
	if (cdn) return await createCDNLoader(cdn);
	return loadIcon;
});
//#endregion
//#region node_modules/@unocss/preset-mini/dist/chunk-gol_9zmq.mjs
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll$1 = (all, symbols) => {
	let target = {};
	for (var name in all) __defProp$1(target, name, {
		get: all[name],
		enumerable: true
	});
	if (symbols) __defProp$1(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp$1(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
//#endregion
//#region node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
	const c = chars.charCodeAt(i);
	intToChar[i] = c;
	charToInt[c] = i;
}
function encodeInteger(builder, num, relative) {
	let delta = num - relative;
	delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
	do {
		let clamped = delta & 31;
		delta >>>= 5;
		if (delta > 0) clamped |= 32;
		builder.write(intToChar[clamped]);
	} while (delta > 0);
	return num;
}
var bufLength = 1024 * 16;
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? { decode(buf) {
	return Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString();
} } : { decode(buf) {
	let out = "";
	for (let i = 0; i < buf.length; i++) out += String.fromCharCode(buf[i]);
	return out;
} };
var StringWriter = class {
	constructor() {
		this.pos = 0;
		this.out = "";
		this.buffer = new Uint8Array(bufLength);
	}
	write(v) {
		const { buffer } = this;
		buffer[this.pos++] = v;
		if (this.pos === bufLength) {
			this.out += td.decode(buffer);
			this.pos = 0;
		}
	}
	flush() {
		const { buffer, out, pos } = this;
		return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
	}
};
function encode$2(decoded) {
	const writer = new StringWriter();
	let sourcesIndex = 0;
	let sourceLine = 0;
	let sourceColumn = 0;
	let namesIndex = 0;
	for (let i = 0; i < decoded.length; i++) {
		const line = decoded[i];
		if (i > 0) writer.write(semicolon);
		if (line.length === 0) continue;
		let genColumn = 0;
		for (let j = 0; j < line.length; j++) {
			const segment = line[j];
			if (j > 0) writer.write(comma);
			genColumn = encodeInteger(writer, segment[0], genColumn);
			if (segment.length === 1) continue;
			sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
			sourceLine = encodeInteger(writer, segment[2], sourceLine);
			sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
			if (segment.length === 4) continue;
			namesIndex = encodeInteger(writer, segment[4], namesIndex);
		}
	}
	return writer.flush();
}
//#endregion
//#region node_modules/magic-string/dist/magic-string.es.mjs
var BitSet = class BitSet {
	constructor(arg) {
		this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
	}
	add(n) {
		this.bits[n >> 5] |= 1 << (n & 31);
	}
	has(n) {
		return !!(this.bits[n >> 5] & 1 << (n & 31));
	}
};
var Chunk = class Chunk {
	constructor(start, end, content) {
		this.start = start;
		this.end = end;
		this.original = content;
		this.intro = "";
		this.outro = "";
		this.content = content;
		this.storeName = false;
		this.edited = false;
		this.previous = null;
		this.next = null;
	}
	appendLeft(content) {
		this.outro += content;
	}
	appendRight(content) {
		this.intro = this.intro + content;
	}
	clone() {
		const chunk = new Chunk(this.start, this.end, this.original);
		chunk.intro = this.intro;
		chunk.outro = this.outro;
		chunk.content = this.content;
		chunk.storeName = this.storeName;
		chunk.edited = this.edited;
		return chunk;
	}
	contains(index) {
		return this.start < index && index < this.end;
	}
	eachNext(fn) {
		let chunk = this;
		while (chunk) {
			fn(chunk);
			chunk = chunk.next;
		}
	}
	eachPrevious(fn) {
		let chunk = this;
		while (chunk) {
			fn(chunk);
			chunk = chunk.previous;
		}
	}
	edit(content, storeName, contentOnly) {
		this.content = content;
		if (!contentOnly) {
			this.intro = "";
			this.outro = "";
		}
		this.storeName = storeName;
		this.edited = true;
		return this;
	}
	prependLeft(content) {
		this.outro = content + this.outro;
	}
	prependRight(content) {
		this.intro = content + this.intro;
	}
	reset() {
		this.intro = "";
		this.outro = "";
		if (this.edited) {
			this.content = this.original;
			this.storeName = false;
			this.edited = false;
		}
	}
	split(index) {
		const sliceIndex = index - this.start;
		const originalBefore = this.original.slice(0, sliceIndex);
		const originalAfter = this.original.slice(sliceIndex);
		this.original = originalBefore;
		const newChunk = new Chunk(index, this.end, originalAfter);
		newChunk.outro = this.outro;
		this.outro = "";
		this.end = index;
		if (this.edited) {
			newChunk.edit("", false);
			this.content = "";
		} else this.content = originalBefore;
		newChunk.next = this.next;
		if (newChunk.next) newChunk.next.previous = newChunk;
		newChunk.previous = this;
		this.next = newChunk;
		return newChunk;
	}
	toString() {
		return this.intro + this.content + this.outro;
	}
	trimEnd(rx) {
		this.outro = this.outro.replace(rx, "");
		if (this.outro.length) return true;
		const trimmed = this.content.replace(rx, "");
		if (trimmed.length) {
			if (trimmed !== this.content) {
				this.split(this.start + trimmed.length).edit("", void 0, true);
				if (this.edited) this.edit(trimmed, this.storeName, true);
			}
			return true;
		} else {
			this.edit("", void 0, true);
			this.intro = this.intro.replace(rx, "");
			if (this.intro.length) return true;
		}
	}
	trimStart(rx) {
		this.intro = this.intro.replace(rx, "");
		if (this.intro.length) return true;
		const trimmed = this.content.replace(rx, "");
		if (trimmed.length) {
			if (trimmed !== this.content) {
				const newChunk = this.split(this.end - trimmed.length);
				if (this.edited) newChunk.edit(trimmed, this.storeName, true);
				this.edit("", void 0, true);
			}
			return true;
		} else {
			this.edit("", void 0, true);
			this.outro = this.outro.replace(rx, "");
			if (this.outro.length) return true;
		}
	}
};
function getBtoa() {
	if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
	else if (typeof Buffer === "function") return (str) => Buffer.from(str, "utf-8").toString("base64");
	else return () => {
		throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
	};
}
var btoa = /* @__PURE__ */ getBtoa();
var SourceMap = class {
	constructor(properties) {
		this.version = 3;
		this.file = properties.file;
		this.sources = properties.sources;
		this.sourcesContent = properties.sourcesContent;
		this.names = properties.names;
		this.mappings = encode$2(properties.mappings);
		if (typeof properties.x_google_ignoreList !== "undefined") this.x_google_ignoreList = properties.x_google_ignoreList;
		if (typeof properties.debugId !== "undefined") this.debugId = properties.debugId;
	}
	toString() {
		return JSON.stringify(this);
	}
	toUrl() {
		return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
	}
};
function guessIndent(code) {
	const lines = code.split("\n");
	const tabbed = lines.filter((line) => /^\t+/.test(line));
	const spaced = lines.filter((line) => /^ {2,}/.test(line));
	if (tabbed.length === 0 && spaced.length === 0) return null;
	if (tabbed.length >= spaced.length) return "	";
	const min = spaced.reduce((previous, current) => {
		const numSpaces = /^ +/.exec(current)[0].length;
		return Math.min(numSpaces, previous);
	}, Infinity);
	return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
	const fromParts = from.split(/[/\\]/);
	const toParts = to.split(/[/\\]/);
	fromParts.pop();
	while (fromParts[0] === toParts[0]) {
		fromParts.shift();
		toParts.shift();
	}
	if (fromParts.length) {
		let i = fromParts.length;
		while (i--) fromParts[i] = "..";
	}
	return fromParts.concat(toParts).join("/");
}
var toString = Object.prototype.toString;
function isObject$1(thing) {
	return toString.call(thing) === "[object Object]";
}
function getLocator(source) {
	const originalLines = source.split("\n");
	const lineOffsets = [];
	for (let i = 0, pos = 0; i < originalLines.length; i++) {
		lineOffsets.push(pos);
		pos += originalLines[i].length + 1;
	}
	return function locate(index) {
		let i = 0;
		let j = lineOffsets.length;
		while (i < j) {
			const m = i + j >> 1;
			if (index < lineOffsets[m]) j = m;
			else i = m + 1;
		}
		const line = i - 1;
		return {
			line,
			column: index - lineOffsets[line]
		};
	};
}
var wordRegex = /\w/;
var Mappings = class {
	constructor(hires) {
		this.hires = hires;
		this.generatedCodeLine = 0;
		this.generatedCodeColumn = 0;
		this.raw = [];
		this.rawSegments = this.raw[this.generatedCodeLine] = [];
		this.pending = null;
	}
	addEdit(sourceIndex, content, loc, nameIndex) {
		if (content.length) {
			const contentLengthMinusOne = content.length - 1;
			let contentLineEnd = content.indexOf("\n", 0);
			let previousContentLineEnd = -1;
			while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
				const segment = [
					this.generatedCodeColumn,
					sourceIndex,
					loc.line,
					loc.column
				];
				if (nameIndex >= 0) segment.push(nameIndex);
				this.rawSegments.push(segment);
				this.generatedCodeLine += 1;
				this.raw[this.generatedCodeLine] = this.rawSegments = [];
				this.generatedCodeColumn = 0;
				previousContentLineEnd = contentLineEnd;
				contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
			}
			const segment = [
				this.generatedCodeColumn,
				sourceIndex,
				loc.line,
				loc.column
			];
			if (nameIndex >= 0) segment.push(nameIndex);
			this.rawSegments.push(segment);
			this.advance(content.slice(previousContentLineEnd + 1));
		} else if (this.pending) {
			this.rawSegments.push(this.pending);
			this.advance(content);
		}
		this.pending = null;
	}
	addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
		let originalCharIndex = chunk.start;
		let first = true;
		let charInHiresBoundary = false;
		while (originalCharIndex < chunk.end) {
			if (original[originalCharIndex] === "\n") {
				loc.line += 1;
				loc.column = 0;
				this.generatedCodeLine += 1;
				this.raw[this.generatedCodeLine] = this.rawSegments = [];
				this.generatedCodeColumn = 0;
				first = true;
				charInHiresBoundary = false;
			} else {
				if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
					const segment = [
						this.generatedCodeColumn,
						sourceIndex,
						loc.line,
						loc.column
					];
					if (this.hires === "boundary") if (wordRegex.test(original[originalCharIndex])) {
						if (!charInHiresBoundary) {
							this.rawSegments.push(segment);
							charInHiresBoundary = true;
						}
					} else {
						this.rawSegments.push(segment);
						charInHiresBoundary = false;
					}
					else this.rawSegments.push(segment);
				}
				loc.column += 1;
				this.generatedCodeColumn += 1;
				first = false;
			}
			originalCharIndex += 1;
		}
		this.pending = null;
	}
	advance(str) {
		if (!str) return;
		const lines = str.split("\n");
		if (lines.length > 1) {
			for (let i = 0; i < lines.length - 1; i++) {
				this.generatedCodeLine++;
				this.raw[this.generatedCodeLine] = this.rawSegments = [];
			}
			this.generatedCodeColumn = 0;
		}
		this.generatedCodeColumn += lines[lines.length - 1].length;
	}
};
var n = "\n";
var warned = {
	insertLeft: false,
	insertRight: false,
	storeName: false
};
var MagicString = class MagicString {
	constructor(string, options = {}) {
		const chunk = new Chunk(0, string.length, string);
		Object.defineProperties(this, {
			original: {
				writable: true,
				value: string
			},
			outro: {
				writable: true,
				value: ""
			},
			intro: {
				writable: true,
				value: ""
			},
			firstChunk: {
				writable: true,
				value: chunk
			},
			lastChunk: {
				writable: true,
				value: chunk
			},
			lastSearchedChunk: {
				writable: true,
				value: chunk
			},
			byStart: {
				writable: true,
				value: {}
			},
			byEnd: {
				writable: true,
				value: {}
			},
			filename: {
				writable: true,
				value: options.filename
			},
			indentExclusionRanges: {
				writable: true,
				value: options.indentExclusionRanges
			},
			sourcemapLocations: {
				writable: true,
				value: new BitSet()
			},
			storedNames: {
				writable: true,
				value: {}
			},
			indentStr: {
				writable: true,
				value: void 0
			},
			ignoreList: {
				writable: true,
				value: options.ignoreList
			},
			offset: {
				writable: true,
				value: options.offset || 0
			}
		});
		this.byStart[0] = chunk;
		this.byEnd[string.length] = chunk;
	}
	addSourcemapLocation(char) {
		this.sourcemapLocations.add(char);
	}
	append(content) {
		if (typeof content !== "string") throw new TypeError("outro content must be a string");
		this.outro += content;
		return this;
	}
	appendLeft(index, content) {
		index = index + this.offset;
		if (typeof content !== "string") throw new TypeError("inserted content must be a string");
		this._split(index);
		const chunk = this.byEnd[index];
		if (chunk) chunk.appendLeft(content);
		else this.intro += content;
		return this;
	}
	appendRight(index, content) {
		index = index + this.offset;
		if (typeof content !== "string") throw new TypeError("inserted content must be a string");
		this._split(index);
		const chunk = this.byStart[index];
		if (chunk) chunk.appendRight(content);
		else this.outro += content;
		return this;
	}
	clone() {
		const cloned = new MagicString(this.original, {
			filename: this.filename,
			offset: this.offset
		});
		let originalChunk = this.firstChunk;
		let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
		while (originalChunk) {
			cloned.byStart[clonedChunk.start] = clonedChunk;
			cloned.byEnd[clonedChunk.end] = clonedChunk;
			const nextOriginalChunk = originalChunk.next;
			const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
			if (nextClonedChunk) {
				clonedChunk.next = nextClonedChunk;
				nextClonedChunk.previous = clonedChunk;
				clonedChunk = nextClonedChunk;
			}
			originalChunk = nextOriginalChunk;
		}
		cloned.lastChunk = clonedChunk;
		if (this.indentExclusionRanges) cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
		cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
		cloned.intro = this.intro;
		cloned.outro = this.outro;
		return cloned;
	}
	generateDecodedMap(options) {
		options = options || {};
		const sourceIndex = 0;
		const names = Object.keys(this.storedNames);
		const mappings = new Mappings(options.hires);
		const locate = getLocator(this.original);
		if (this.intro) mappings.advance(this.intro);
		this.firstChunk.eachNext((chunk) => {
			const loc = locate(chunk.start);
			if (chunk.intro.length) mappings.advance(chunk.intro);
			if (chunk.edited) mappings.addEdit(sourceIndex, chunk.content, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
			else mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
			if (chunk.outro.length) mappings.advance(chunk.outro);
		});
		if (this.outro) mappings.advance(this.outro);
		return {
			file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
			sources: [options.source ? getRelativePath(options.file || "", options.source) : options.file || ""],
			sourcesContent: options.includeContent ? [this.original] : void 0,
			names,
			mappings: mappings.raw,
			x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
		};
	}
	generateMap(options) {
		return new SourceMap(this.generateDecodedMap(options));
	}
	_ensureindentStr() {
		if (this.indentStr === void 0) this.indentStr = guessIndent(this.original);
	}
	_getRawIndentString() {
		this._ensureindentStr();
		return this.indentStr;
	}
	getIndentString() {
		this._ensureindentStr();
		return this.indentStr === null ? "	" : this.indentStr;
	}
	indent(indentStr, options) {
		const pattern = /^[^\r\n]/gm;
		if (isObject$1(indentStr)) {
			options = indentStr;
			indentStr = void 0;
		}
		if (indentStr === void 0) {
			this._ensureindentStr();
			indentStr = this.indentStr || "	";
		}
		if (indentStr === "") return this;
		options = options || {};
		const isExcluded = {};
		if (options.exclude) (typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude).forEach((exclusion) => {
			for (let i = exclusion[0]; i < exclusion[1]; i += 1) isExcluded[i] = true;
		});
		let shouldIndentNextCharacter = options.indentStart !== false;
		const replacer = (match) => {
			if (shouldIndentNextCharacter) return `${indentStr}${match}`;
			shouldIndentNextCharacter = true;
			return match;
		};
		this.intro = this.intro.replace(pattern, replacer);
		let charIndex = 0;
		let chunk = this.firstChunk;
		while (chunk) {
			const end = chunk.end;
			if (chunk.edited) {
				if (!isExcluded[charIndex]) {
					chunk.content = chunk.content.replace(pattern, replacer);
					if (chunk.content.length) shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
				}
			} else {
				charIndex = chunk.start;
				while (charIndex < end) {
					if (!isExcluded[charIndex]) {
						const char = this.original[charIndex];
						if (char === "\n") shouldIndentNextCharacter = true;
						else if (char !== "\r" && shouldIndentNextCharacter) {
							shouldIndentNextCharacter = false;
							if (charIndex === chunk.start) chunk.prependRight(indentStr);
							else {
								this._splitChunk(chunk, charIndex);
								chunk = chunk.next;
								chunk.prependRight(indentStr);
							}
						}
					}
					charIndex += 1;
				}
			}
			charIndex = chunk.end;
			chunk = chunk.next;
		}
		this.outro = this.outro.replace(pattern, replacer);
		return this;
	}
	insert() {
		throw new Error("magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)");
	}
	insertLeft(index, content) {
		if (!warned.insertLeft) {
			console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead");
			warned.insertLeft = true;
		}
		return this.appendLeft(index, content);
	}
	insertRight(index, content) {
		if (!warned.insertRight) {
			console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead");
			warned.insertRight = true;
		}
		return this.prependRight(index, content);
	}
	move(start, end, index) {
		start = start + this.offset;
		end = end + this.offset;
		index = index + this.offset;
		if (index >= start && index <= end) throw new Error("Cannot move a selection inside itself");
		this._split(start);
		this._split(end);
		this._split(index);
		const first = this.byStart[start];
		const last = this.byEnd[end];
		const oldLeft = first.previous;
		const oldRight = last.next;
		const newRight = this.byStart[index];
		if (!newRight && last === this.lastChunk) return this;
		const newLeft = newRight ? newRight.previous : this.lastChunk;
		if (oldLeft) oldLeft.next = oldRight;
		if (oldRight) oldRight.previous = oldLeft;
		if (newLeft) newLeft.next = first;
		if (newRight) newRight.previous = last;
		if (!first.previous) this.firstChunk = last.next;
		if (!last.next) {
			this.lastChunk = first.previous;
			this.lastChunk.next = null;
		}
		first.previous = newLeft;
		last.next = newRight || null;
		if (!newLeft) this.firstChunk = first;
		if (!newRight) this.lastChunk = last;
		return this;
	}
	overwrite(start, end, content, options) {
		options = options || {};
		return this.update(start, end, content, {
			...options,
			overwrite: !options.contentOnly
		});
	}
	update(start, end, content, options) {
		start = start + this.offset;
		end = end + this.offset;
		if (typeof content !== "string") throw new TypeError("replacement content must be a string");
		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}
		if (end > this.original.length) throw new Error("end is out of bounds");
		if (start === end) throw new Error("Cannot overwrite a zero-length range – use appendLeft or prependRight instead");
		this._split(start);
		this._split(end);
		if (options === true) {
			if (!warned.storeName) {
				console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string");
				warned.storeName = true;
			}
			options = { storeName: true };
		}
		const storeName = options !== void 0 ? options.storeName : false;
		const overwrite = options !== void 0 ? options.overwrite : false;
		if (storeName) {
			const original = this.original.slice(start, end);
			Object.defineProperty(this.storedNames, original, {
				writable: true,
				value: true,
				enumerable: true
			});
		}
		const first = this.byStart[start];
		const last = this.byEnd[end];
		if (first) {
			let chunk = first;
			while (chunk !== last) {
				if (chunk.next !== this.byStart[chunk.end]) throw new Error("Cannot overwrite across a split point");
				chunk = chunk.next;
				chunk.edit("", false);
			}
			first.edit(content, storeName, !overwrite);
		} else {
			const newChunk = new Chunk(start, end, "").edit(content, storeName);
			last.next = newChunk;
			newChunk.previous = last;
		}
		return this;
	}
	prepend(content) {
		if (typeof content !== "string") throw new TypeError("outro content must be a string");
		this.intro = content + this.intro;
		return this;
	}
	prependLeft(index, content) {
		index = index + this.offset;
		if (typeof content !== "string") throw new TypeError("inserted content must be a string");
		this._split(index);
		const chunk = this.byEnd[index];
		if (chunk) chunk.prependLeft(content);
		else this.intro = content + this.intro;
		return this;
	}
	prependRight(index, content) {
		index = index + this.offset;
		if (typeof content !== "string") throw new TypeError("inserted content must be a string");
		this._split(index);
		const chunk = this.byStart[index];
		if (chunk) chunk.prependRight(content);
		else this.outro = content + this.outro;
		return this;
	}
	remove(start, end) {
		start = start + this.offset;
		end = end + this.offset;
		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}
		if (start === end) return this;
		if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
		if (start > end) throw new Error("end must be greater than start");
		this._split(start);
		this._split(end);
		let chunk = this.byStart[start];
		while (chunk) {
			chunk.intro = "";
			chunk.outro = "";
			chunk.edit("");
			chunk = end > chunk.end ? this.byStart[chunk.end] : null;
		}
		return this;
	}
	reset(start, end) {
		start = start + this.offset;
		end = end + this.offset;
		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}
		if (start === end) return this;
		if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
		if (start > end) throw new Error("end must be greater than start");
		this._split(start);
		this._split(end);
		let chunk = this.byStart[start];
		while (chunk) {
			chunk.reset();
			chunk = end > chunk.end ? this.byStart[chunk.end] : null;
		}
		return this;
	}
	lastChar() {
		if (this.outro.length) return this.outro[this.outro.length - 1];
		let chunk = this.lastChunk;
		do {
			if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
			if (chunk.content.length) return chunk.content[chunk.content.length - 1];
			if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
		} while (chunk = chunk.previous);
		if (this.intro.length) return this.intro[this.intro.length - 1];
		return "";
	}
	lastLine() {
		let lineIndex = this.outro.lastIndexOf(n);
		if (lineIndex !== -1) return this.outro.substr(lineIndex + 1);
		let lineStr = this.outro;
		let chunk = this.lastChunk;
		do {
			if (chunk.outro.length > 0) {
				lineIndex = chunk.outro.lastIndexOf(n);
				if (lineIndex !== -1) return chunk.outro.substr(lineIndex + 1) + lineStr;
				lineStr = chunk.outro + lineStr;
			}
			if (chunk.content.length > 0) {
				lineIndex = chunk.content.lastIndexOf(n);
				if (lineIndex !== -1) return chunk.content.substr(lineIndex + 1) + lineStr;
				lineStr = chunk.content + lineStr;
			}
			if (chunk.intro.length > 0) {
				lineIndex = chunk.intro.lastIndexOf(n);
				if (lineIndex !== -1) return chunk.intro.substr(lineIndex + 1) + lineStr;
				lineStr = chunk.intro + lineStr;
			}
		} while (chunk = chunk.previous);
		lineIndex = this.intro.lastIndexOf(n);
		if (lineIndex !== -1) return this.intro.substr(lineIndex + 1) + lineStr;
		return this.intro + lineStr;
	}
	slice(start = 0, end = this.original.length - this.offset) {
		start = start + this.offset;
		end = end + this.offset;
		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}
		let result = "";
		let chunk = this.firstChunk;
		while (chunk && (chunk.start > start || chunk.end <= start)) {
			if (chunk.start < end && chunk.end >= end) return result;
			chunk = chunk.next;
		}
		if (chunk && chunk.edited && chunk.start !== start) throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
		const startChunk = chunk;
		while (chunk) {
			if (chunk.intro && (startChunk !== chunk || chunk.start === start)) result += chunk.intro;
			const containsEnd = chunk.start < end && chunk.end >= end;
			if (containsEnd && chunk.edited && chunk.end !== end) throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
			const sliceStart = startChunk === chunk ? start - chunk.start : 0;
			const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
			result += chunk.content.slice(sliceStart, sliceEnd);
			if (chunk.outro && (!containsEnd || chunk.end === end)) result += chunk.outro;
			if (containsEnd) break;
			chunk = chunk.next;
		}
		return result;
	}
	snip(start, end) {
		const clone = this.clone();
		clone.remove(0, start);
		clone.remove(end, clone.original.length);
		return clone;
	}
	_split(index) {
		if (this.byStart[index] || this.byEnd[index]) return;
		let chunk = this.lastSearchedChunk;
		let previousChunk = chunk;
		const searchForward = index > chunk.end;
		while (chunk) {
			if (chunk.contains(index)) return this._splitChunk(chunk, index);
			chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
			if (chunk === previousChunk) return;
			previousChunk = chunk;
		}
	}
	_splitChunk(chunk, index) {
		if (chunk.edited && chunk.content.length) {
			const loc = getLocator(this.original)(index);
			throw new Error(`Cannot split a chunk that has already been edited (${loc.line}:${loc.column} – "${chunk.original}")`);
		}
		const newChunk = chunk.split(index);
		this.byEnd[index] = chunk;
		this.byStart[index] = newChunk;
		this.byEnd[newChunk.end] = newChunk;
		if (chunk === this.lastChunk) this.lastChunk = newChunk;
		this.lastSearchedChunk = chunk;
		return true;
	}
	toString() {
		let str = this.intro;
		let chunk = this.firstChunk;
		while (chunk) {
			str += chunk.toString();
			chunk = chunk.next;
		}
		return str + this.outro;
	}
	isEmpty() {
		let chunk = this.firstChunk;
		do
			if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim()) return false;
		while (chunk = chunk.next);
		return true;
	}
	length() {
		let chunk = this.firstChunk;
		let length = 0;
		do
			length += chunk.intro.length + chunk.content.length + chunk.outro.length;
		while (chunk = chunk.next);
		return length;
	}
	trimLines() {
		return this.trim("[\\r\\n]");
	}
	trim(charType) {
		return this.trimStart(charType).trimEnd(charType);
	}
	trimEndAborted(charType) {
		const rx = new RegExp((charType || "\\s") + "+$");
		this.outro = this.outro.replace(rx, "");
		if (this.outro.length) return true;
		let chunk = this.lastChunk;
		do {
			const end = chunk.end;
			const aborted = chunk.trimEnd(rx);
			if (chunk.end !== end) {
				if (this.lastChunk === chunk) this.lastChunk = chunk.next;
				this.byEnd[chunk.end] = chunk;
				this.byStart[chunk.next.start] = chunk.next;
				this.byEnd[chunk.next.end] = chunk.next;
			}
			if (aborted) return true;
			chunk = chunk.previous;
		} while (chunk);
		return false;
	}
	trimEnd(charType) {
		this.trimEndAborted(charType);
		return this;
	}
	trimStartAborted(charType) {
		const rx = new RegExp("^" + (charType || "\\s") + "+");
		this.intro = this.intro.replace(rx, "");
		if (this.intro.length) return true;
		let chunk = this.firstChunk;
		do {
			const end = chunk.end;
			const aborted = chunk.trimStart(rx);
			if (chunk.end !== end) {
				if (chunk === this.lastChunk) this.lastChunk = chunk.next;
				this.byEnd[chunk.end] = chunk;
				this.byStart[chunk.next.start] = chunk.next;
				this.byEnd[chunk.next.end] = chunk.next;
			}
			if (aborted) return true;
			chunk = chunk.next;
		} while (chunk);
		return false;
	}
	trimStart(charType) {
		this.trimStartAborted(charType);
		return this;
	}
	hasChanged() {
		return this.original !== this.toString();
	}
	_replaceRegexp(searchValue, replacement) {
		function getReplacement(match, str) {
			if (typeof replacement === "string") return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
				if (i === "$") return "$";
				if (i === "&") return match[0];
				if (+i < match.length) return match[+i];
				return `$${i}`;
			});
			else return replacement(...match, match.index, str, match.groups);
		}
		function matchAll(re, str) {
			let match;
			const matches = [];
			while (match = re.exec(str)) matches.push(match);
			return matches;
		}
		if (searchValue.global) matchAll(searchValue, this.original).forEach((match) => {
			if (match.index != null) {
				const replacement = getReplacement(match, this.original);
				if (replacement !== match[0]) this.overwrite(match.index, match.index + match[0].length, replacement);
			}
		});
		else {
			const match = this.original.match(searchValue);
			if (match && match.index != null) {
				const replacement = getReplacement(match, this.original);
				if (replacement !== match[0]) this.overwrite(match.index, match.index + match[0].length, replacement);
			}
		}
		return this;
	}
	_replaceString(string, replacement) {
		const { original } = this;
		const index = original.indexOf(string);
		if (index !== -1) {
			if (typeof replacement === "function") replacement = replacement(string, index, original);
			if (string !== replacement) this.overwrite(index, index + string.length, replacement);
		}
		return this;
	}
	replace(searchValue, replacement) {
		if (typeof searchValue === "string") return this._replaceString(searchValue, replacement);
		return this._replaceRegexp(searchValue, replacement);
	}
	_replaceAllString(string, replacement) {
		const { original } = this;
		const stringLength = string.length;
		for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
			const previous = original.slice(index, index + stringLength);
			let _replacement = replacement;
			if (typeof replacement === "function") _replacement = replacement(previous, index, original);
			if (previous !== _replacement) this.overwrite(index, index + stringLength, _replacement);
		}
		return this;
	}
	replaceAll(searchValue, replacement) {
		if (typeof searchValue === "string") return this._replaceAllString(searchValue, replacement);
		if (!searchValue.global) throw new TypeError("MagicString.prototype.replaceAll called with a non-global RegExp argument");
		return this._replaceRegexp(searchValue, replacement);
	}
};
//#endregion
//#region node_modules/@unocss/rule-utils/dist/index.mjs
var dist_exports = /* @__PURE__ */ __exportAll$2({
	PseudoClassFunctions: () => PseudoClassFunctions,
	PseudoClassFunctionsStr: () => PseudoClassFunctionsStr,
	PseudoClasses: () => PseudoClasses,
	PseudoClassesAndElementsColonStr: () => PseudoClassesAndElementsColonStr,
	PseudoClassesAndElementsStr: () => PseudoClassesAndElementsStr,
	PseudoClassesColon: () => PseudoClassesColon,
	PseudoClassesColonKeys: () => PseudoClassesColonKeys,
	PseudoClassesColonStr: () => PseudoClassesColonStr,
	PseudoClassesKeys: () => PseudoClassesKeys,
	PseudoClassesMulti: () => PseudoClassesMulti,
	PseudoClassesMultiStr: () => PseudoClassesMultiStr,
	PseudoClassesStr: () => PseudoClassesStr,
	alphaPlaceholders: () => alphaPlaceholders,
	alphaPlaceholdersRE: () => alphaPlaceholdersRE,
	calcMaxWidthBySize: () => calcMaxWidthBySize,
	colorOpacityToString: () => colorOpacityToString,
	colorToString: () => colorToString,
	createPartClasses: () => createPartClasses,
	createPseudoClassFunctions: () => createPseudoClassFunctions,
	createPseudoClassesAndElements: () => createPseudoClassesAndElements,
	createTaggedPseudoClassMatcher: () => createTaggedPseudoClassMatcher,
	createTaggedPseudoClasses: () => createTaggedPseudoClasses,
	createValueHandler: () => createValueHandler,
	cssColorFunctions: () => cssColorFunctions,
	excludedPseudo: () => excludedPseudo,
	getBracket: () => getBracket,
	getStringComponent: () => getStringComponent,
	getStringComponents: () => getStringComponents,
	hasIconFn: () => hasIconFn,
	hasThemeFn: () => hasThemeFn,
	hex2rgba: () => hex2rgba,
	hueInterpolationMethods: () => hueInterpolationMethods,
	iconFnRE: () => iconFnRE,
	isInterpolatedMethod: () => isInterpolatedMethod,
	parseCssColor: () => parseCssColor,
	polarColorSpace: () => polarColorSpace,
	rectangularColorSpace: () => rectangularColorSpace,
	themeFnRE: () => themeFnRE,
	transformThemeFn: () => transformThemeFn,
	transformThemeString: () => transformThemeString,
	variantGetBracket: () => variantGetBracket,
	variantGetParameter: () => variantGetParameter,
	variantMatcher: () => variantMatcher,
	variantParentMatcher: () => variantParentMatcher
});
function getBracket(str, open, close) {
	if (str === "") return;
	const l = str.length;
	let parenthesis = 0;
	let opened = false;
	let openAt = 0;
	for (let i = 0; i < l; i++) switch (str[i]) {
		case open:
			if (!opened) {
				opened = true;
				openAt = i;
			}
			parenthesis++;
			break;
		case close:
			--parenthesis;
			if (parenthesis < 0) return;
			if (parenthesis === 0) return [
				str.slice(openAt, i + 1),
				str.slice(i + 1),
				str.slice(0, openAt)
			];
			break;
	}
}
function getStringComponent(str, open, close, separators) {
	if (str === "") return;
	if (isString(separators)) separators = [separators];
	if (separators.length === 0) return;
	const l = str.length;
	let parenthesis = 0;
	for (let i = 0; i < l; i++) switch (str[i]) {
		case open:
			parenthesis++;
			break;
		case close:
			if (--parenthesis < 0) return;
			break;
		default: for (const separator of separators) {
			const separatorLength = separator.length;
			if (separatorLength && separator === str.slice(i, i + separatorLength) && parenthesis === 0) {
				if (i === 0 || i === l - separatorLength) return;
				return [str.slice(0, i), str.slice(i + separatorLength)];
			}
		}
	}
	return [str, ""];
}
function getStringComponents(str, separators, limit, open = "(", close = ")") {
	limit = limit ?? 10;
	const components = [];
	let i = 0;
	while (str !== "") {
		if (++i > limit) return;
		const componentPair = getStringComponent(str, open, close, separators);
		if (!componentPair) return;
		const [component, rest] = componentPair;
		components.push(component);
		str = rest;
	}
	if (components.length > 0) return components;
}
var cssColorFunctions = [
	"hsl",
	"hsla",
	"hwb",
	"lab",
	"lch",
	"oklab",
	"oklch",
	"rgb",
	"rgba"
];
var rectangularColorSpace = [
	"srgb",
	"srgb-linear",
	"display-p3",
	"a98-rgb",
	"prophoto-rgb",
	"rec2020",
	"lab",
	"oklab",
	"xyz",
	"xyz-d50",
	"xyz-d65"
];
var polarColorSpace = [
	"hsl",
	"hwb",
	"lch",
	"oklch"
];
var hueInterpolationMethods = [
	"shorter",
	"longer",
	"increasing",
	"decreasing"
];
var alphaPlaceholders = ["%alpha", "<alpha-value>"];
var alphaPlaceholdersRE = new RegExp(alphaPlaceholders.map((v) => escapeRegExp(v)).join("|"), "g");
function isInterpolatedMethod(type) {
	if (!type) return false;
	return rectangularColorSpace.some((space) => type.includes(space)) || polarColorSpace.some((space) => type.includes(space)) || hueInterpolationMethods.some((method) => type.includes(method));
}
function hex2rgba(hex = "") {
	const color = parseHexColor(hex);
	if (color != null) {
		const { components, alpha } = color;
		if (alpha == null) return components;
		return [...components, alpha];
	}
}
function parseCssColor(str = "") {
	const color = parseColor$2(str);
	if (color == null || color === false) return;
	const { type: casedType, components, alpha } = color;
	const type = casedType.toLowerCase();
	if (components.length === 0) return;
	if (cssColorFunctions.includes(type) && ![1, 3].includes(components.length)) return;
	return {
		type,
		components: components.map((c) => typeof c === "string" ? c.trim() : c),
		alpha: typeof alpha === "string" ? alpha.trim() : alpha
	};
}
function colorOpacityToString(color) {
	const alpha = color.alpha ?? 1;
	return typeof alpha === "string" && alphaPlaceholders.includes(alpha) ? 1 : alpha;
}
function colorToString(color, alphaOverride) {
	if (typeof color === "string") return color.replace(alphaPlaceholdersRE, `${alphaOverride ?? 1}`);
	const { components } = color;
	let { alpha, type } = color;
	alpha = alphaOverride ?? alpha;
	type = type.toLowerCase();
	if (["hsla", "rgba"].includes(type)) return `${type}(${components.join(", ")}${alpha == null ? "" : `, ${alpha}`})`;
	alpha = alpha == null ? "" : ` / ${alpha}`;
	if (cssColorFunctions.includes(type)) return `${type}(${components.join(" ")}${alpha})`;
	return `color(${type} ${components.join(" ")}${alpha})`;
}
function parseColor$2(str) {
	if (!str) return;
	let color = parseHexColor(str);
	if (color != null) return color;
	color = cssColorKeyword(str);
	if (color != null) return color;
	color = parseCssCommaColorFunction(str);
	if (color != null) return color;
	color = parseCssSpaceColorFunction(str);
	if (color != null) return color;
	color = parseCssColorFunction(str);
	if (color != null) return color;
}
function parseHexColor(str) {
	const [, body] = str.match(/^#([\da-f]+)$/i) || [];
	if (!body) return;
	switch (body.length) {
		case 3:
		case 4: {
			const digits = Array.from(body, (s) => Number.parseInt(s, 16)).map((n) => n << 4 | n);
			return {
				type: "rgb",
				components: digits.slice(0, 3),
				alpha: body.length === 3 ? void 0 : Math.round(digits[3] / 255 * 100) / 100
			};
		}
		case 6:
		case 8: {
			const value = Number.parseInt(body, 16);
			return {
				type: "rgb",
				components: body.length === 6 ? [
					value >> 16 & 255,
					value >> 8 & 255,
					value & 255
				] : [
					value >> 24 & 255,
					value >> 16 & 255,
					value >> 8 & 255
				],
				alpha: body.length === 6 ? void 0 : Math.round((value & 255) / 255 * 100) / 100
			};
		}
	}
}
function cssColorKeyword(str) {
	const color = { rebeccapurple: [
		102,
		51,
		153,
		1
	] }[str];
	if (color != null) return {
		type: "rgb",
		components: color.slice(0, 3),
		alpha: color[3]
	};
}
function parseCssCommaColorFunction(color) {
	const match = color.match(/^(rgb|rgba|hsl|hsla)\((.+)\)$/i);
	if (!match) return;
	const [, type, componentString] = match;
	const components = getStringComponents(componentString, ",", 5);
	if (components) {
		if ([3, 4].includes(components.length)) return {
			type,
			components: components.slice(0, 3),
			alpha: components[3]
		};
		else if (components.length !== 1) return false;
	}
}
var cssColorFunctionsRe = new RegExp(`^(${cssColorFunctions.join("|")})\\((.+)\\)$`, "i");
function parseCssSpaceColorFunction(color) {
	const match = color.match(cssColorFunctionsRe);
	if (!match) return;
	const [, fn, componentString] = match;
	const parsed = parseCssSpaceColorValues(`${fn} ${componentString}`);
	if (parsed) {
		const { alpha, components: [type, ...components] } = parsed;
		return {
			type,
			components,
			alpha
		};
	}
}
function parseCssColorFunction(color) {
	const match = color.match(/^color\((.+)\)$/);
	if (!match) return;
	const parsed = parseCssSpaceColorValues(match[1]);
	if (parsed) {
		const { alpha, components: [type, ...components] } = parsed;
		return {
			type,
			components,
			alpha
		};
	}
}
function parseCssSpaceColorValues(componentString) {
	const components = getStringComponents(componentString, " ");
	if (!components) return;
	let totalComponents = components.length;
	if (components[totalComponents - 2] === "/") return {
		components: components.slice(0, totalComponents - 2),
		alpha: components[totalComponents - 1]
	};
	if (components[totalComponents - 2] != null && (components[totalComponents - 2].endsWith("/") || components[totalComponents - 1].startsWith("/"))) {
		const removed = components.splice(totalComponents - 2);
		components.push(removed.join(" "));
		--totalComponents;
	}
	const withAlpha = getStringComponents(components[totalComponents - 1], "/", 2);
	if (!withAlpha) return;
	if (withAlpha.length === 1 || withAlpha[withAlpha.length - 1] === "") return { components };
	const alpha = withAlpha.pop();
	components[totalComponents - 1] = withAlpha.join("/");
	return {
		components,
		alpha
	};
}
var themeFnRE = /theme\(\s*(['"])?(.*?)\1?\s*\)/g;
function hasThemeFn(str) {
	return str.includes("theme(") && str.includes(")");
}
function transformThemeFn(code, theme, throwOnMissing = true) {
	const matches = Array.from(code.toString().matchAll(themeFnRE));
	if (!matches.length) return code;
	const s = new MagicString(code);
	for (const match of matches) {
		const rawArg = match[2];
		if (!rawArg) throw new Error("theme() expect exact one argument, but got 0");
		const value = transformThemeString(rawArg, theme, throwOnMissing);
		if (value) s.overwrite(match.index, match.index + match[0].length, value);
	}
	return s.toString();
}
function transformThemeString(code, theme, throwOnMissing = true) {
	const [rawKey, alpha] = code.split("/");
	let value = rawKey.trim().split(".").reduce((t, k) => t === null || t === void 0 ? void 0 : t[k], theme);
	if (typeof value === "object") value = value.DEFAULT;
	if (typeof value === "string") {
		if (alpha) {
			const color = parseCssColor(value);
			if (color) value = colorToString(color, alpha);
		}
		return value;
	} else if (throwOnMissing) throw new Error(`theme of "${code}" did not found`);
}
function calcMaxWidthBySize(size) {
	var _size$match;
	const value = ((_size$match = size.match(/^-?\d+\.?\d*/)) === null || _size$match === void 0 ? void 0 : _size$match[0]) || "";
	const unit = size.slice(value.length);
	if (unit === "px") {
		const maxWidth = Number.parseFloat(value) - .1;
		return Number.isNaN(maxWidth) ? size : `${maxWidth}${unit}`;
	}
	return `calc(${size} - 0.1px)`;
}
function createValueHandler(handlers) {
	const handler = function(str, theme) {
		var _this$__options;
		const s = ((_this$__options = this.__options) === null || _this$__options === void 0 ? void 0 : _this$__options.sequence) || [];
		this.__options.sequence = [];
		for (const n of s) {
			const res = handlers[n](str, theme);
			if (res != null) return res;
		}
	};
	function addProcessor(that, name) {
		if (!that.__options) that.__options = { sequence: [] };
		that.__options.sequence.push(name);
		return that;
	}
	for (const name of Object.keys(handlers)) Object.defineProperty(handler, name, {
		enumerable: true,
		configurable: true,
		get() {
			return addProcessor(this, name);
		}
	});
	return handler;
}
var iconFnRE = /icon\(\s*(['"])?(.*?)\1?\s*\)/g;
function hasIconFn(str) {
	return str.includes("icon(") && str.includes(")");
}
var PseudoPlaceholder = "__pseudo_placeholder__";
/**
* Note: the order of following pseudo classes will affect the order of generated css.
*
* Reference: https://github.com/tailwindlabs/tailwindcss/blob/main/src/corePlugins.js#L83
*/
var PseudoClasses = Object.fromEntries([
	["first-letter", "::first-letter"],
	["first-line", "::first-line"],
	"any-link",
	"link",
	"visited",
	"target",
	["open", "[open]"],
	"default",
	"checked",
	"indeterminate",
	"placeholder-shown",
	"autofill",
	"optional",
	"required",
	"valid",
	"invalid",
	"user-valid",
	"user-invalid",
	"in-range",
	"out-of-range",
	"read-only",
	"read-write",
	"empty",
	"focus-within",
	"hover",
	"focus",
	"focus-visible",
	"active",
	"enabled",
	"disabled",
	"popover-open",
	"root",
	"empty",
	["even-of-type", ":nth-of-type(even)"],
	["even", ":nth-child(even)"],
	["odd-of-type", ":nth-of-type(odd)"],
	["odd", ":nth-child(odd)"],
	["nth", `:nth-child(${PseudoPlaceholder})`],
	["nth-last", `:nth-last-child(${PseudoPlaceholder})`],
	["nth-last-of-type", `:nth-last-of-type(${PseudoPlaceholder})`],
	["nth-of-type", `:nth-of-type(${PseudoPlaceholder})`],
	"first-of-type",
	["first", ":first-child"],
	"last-of-type",
	["last", ":last-child"],
	"only-child",
	"only-of-type",
	["backdrop-element", "::backdrop"],
	["placeholder", "::placeholder"],
	["before", "::before"],
	["after", "::after"],
	["file", "::file-selector-button"]
].map((key) => Array.isArray(key) ? key : [key, `:${key}`]));
var PseudoClassesKeys = Object.keys(PseudoClasses);
var PseudoClassesColon = Object.fromEntries([["backdrop", "::backdrop"]].map((key) => Array.isArray(key) ? key : [key, `:${key}`]));
var PseudoClassesColonKeys = Object.keys(PseudoClassesColon);
var PseudoClassFunctions = [
	"not",
	"is",
	"where",
	"has"
];
var PseudoClassesMulti = Object.fromEntries([["selection", ["::selection", " *::selection"]], ["marker", ["::marker", " *::marker"]]]);
var PseudoClassesStr = Object.entries(PseudoClasses).filter(([, pseudo]) => !pseudo.startsWith("::")).map(([key]) => key).sort((a, b) => b.length - a.length).join("|");
var PseudoClassesColonStr = Object.entries(PseudoClassesColon).filter(([, pseudo]) => !pseudo.startsWith("::")).map(([key]) => key).sort((a, b) => b.length - a.length).join("|");
var PseudoClassFunctionsStr = PseudoClassFunctions.join("|");
var PseudoClassesMultiStr = Object.keys(PseudoClassesMulti).sort((a, b) => b.length - a.length).join("|");
var excludedPseudo = [
	"::-webkit-resizer",
	"::-webkit-scrollbar",
	"::-webkit-scrollbar-button",
	"::-webkit-scrollbar-corner",
	"::-webkit-scrollbar-thumb",
	"::-webkit-scrollbar-track",
	"::-webkit-scrollbar-track-piece",
	"::file-selector-button"
];
var PseudoClassesAndElementsStr = Object.entries(PseudoClasses).map(([key]) => key).sort((a, b) => b.length - a.length).join("|");
var PseudoClassesAndElementsColonStr = Object.entries(PseudoClassesColon).map(([key]) => key).sort((a, b) => b.length - a.length).join("|");
function createTaggedPseudoClassMatcher(tag, parent, combinator, utils) {
	const { h, variantGetBracket: variantGetBracket$1 } = utils;
	const rawRE = /* @__PURE__ */ new RegExp(`^(${escapeRegExp(parent)}:)(\\S+)${escapeRegExp(combinator)}\\1`);
	let splitRE;
	let pseudoRE;
	let pseudoColonRE;
	let pseudoVarRE;
	const matchBracket = (input) => {
		var _rest$split;
		const body = variantGetBracket$1(`${tag}-`, input, []);
		if (!body) return;
		const [match, rest] = body;
		const bracketValue = h.bracket(match);
		if (bracketValue == null) return;
		const label = ((_rest$split = rest.split(splitRE, 1)) === null || _rest$split === void 0 ? void 0 : _rest$split[0]) ?? "";
		const prefix = `${parent}${escapeSelector(label)}`;
		return [
			label,
			input.slice(input.length - (rest.length - label.length - 1)),
			bracketValue.includes("&") ? bracketValue.replace(/&/g, prefix) : `${prefix}${bracketValue}`
		];
	};
	const matchPseudo = (input) => {
		const match = input.match(pseudoRE) || input.match(pseudoColonRE);
		if (!match) return;
		const [original, fn, pseudoKey] = match;
		const label = match[3] ?? "";
		let pseudo = PseudoClasses[pseudoKey] || PseudoClassesColon[pseudoKey] || `:${pseudoKey}`;
		if (fn) pseudo = `:${fn}(${pseudo})`;
		return [
			label,
			input.slice(original.length),
			`${parent}${escapeSelector(label)}${pseudo}`,
			pseudoKey
		];
	};
	const matchPseudoVar = (input) => {
		const match = input.match(pseudoVarRE);
		if (!match) return;
		const [original, fn, pseudoValue] = match;
		const label = match[3] ?? "";
		const pseudo = `:${fn}(${pseudoValue})`;
		return [
			label,
			input.slice(original.length),
			`${parent}${escapeSelector(label)}${pseudo}`
		];
	};
	return {
		name: `pseudo:${tag}`,
		match(input, ctx) {
			if (!(splitRE && pseudoRE && pseudoColonRE)) {
				splitRE = /* @__PURE__ */ new RegExp(`(?:${ctx.generator.config.separators.join("|")})`);
				pseudoRE = /* @__PURE__ */ new RegExp(`^${tag}-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesStr}))(?:(/[\\w-]+))?(?:${ctx.generator.config.separators.join("|")})`);
				pseudoColonRE = /* @__PURE__ */ new RegExp(`^${tag}-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesColonStr}))(?:(/[\\w-]+))?(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
				pseudoVarRE = /* @__PURE__ */ new RegExp(`^${tag}-(?:(${PseudoClassFunctionsStr})-)?\\[(.+)\\](?:(/[\\w-]+))?(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
			}
			if (!input.startsWith(tag)) return;
			const result = matchBracket(input) || matchPseudo(input) || matchPseudoVar(input);
			if (!result) return;
			const [_label, matcher, prefix, pseudoName = ""] = result;
			return {
				matcher,
				handle: (input$1, next) => next({
					...input$1,
					prefix: `${prefix}${combinator}${input$1.prefix}`.replace(rawRE, "$1$2:"),
					sort: PseudoClassesKeys.indexOf(pseudoName) ?? PseudoClassesColonKeys.indexOf(pseudoName)
				})
			};
		},
		multiPass: true
	};
}
function createPseudoClassesAndElements(utils) {
	const { h } = utils;
	let PseudoClassesAndElementsRE;
	let PseudoClassesAndElementsColonRE;
	let PseudoClassesMultiRE;
	return [{
		name: "pseudo",
		match(input, ctx) {
			if (!(PseudoClassesAndElementsRE && PseudoClassesAndElementsColonRE)) {
				PseudoClassesAndElementsRE = /* @__PURE__ */ new RegExp(`^(${PseudoClassesAndElementsStr})(?:-(\\d+|\\[(\\w|[+-.])+\\]))?(?:${ctx.generator.config.separators.join("|")})`);
				PseudoClassesAndElementsColonRE = /* @__PURE__ */ new RegExp(`^(${PseudoClassesAndElementsColonStr})(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
			}
			const match = input.match(PseudoClassesAndElementsRE) || input.match(PseudoClassesAndElementsColonRE);
			if (match) {
				let pseudo = PseudoClasses[match[1]] || PseudoClassesColon[match[1]] || `:${match[1]}`;
				if (match[2]) {
					let anPlusB;
					if (match[2].startsWith("[") && match[2].endsWith("]")) anPlusB = h.bracket(match[2]);
					else anPlusB = match[2];
					if (anPlusB) pseudo = pseudo.replace(PseudoPlaceholder, anPlusB);
				}
				let index = PseudoClassesKeys.indexOf(match[1]);
				if (index === -1) index = PseudoClassesColonKeys.indexOf(match[1]);
				if (index === -1) index = void 0;
				return {
					matcher: input.slice(match[0].length),
					handle: (input$1, next) => {
						const selectors = pseudo.includes("::") && !excludedPseudo.includes(pseudo) ? { pseudo: `${input$1.pseudo}${pseudo}` } : { selector: `${input$1.selector}${pseudo}` };
						return next({
							...input$1,
							...selectors,
							sort: index,
							noMerge: true
						});
					}
				};
			}
		},
		multiPass: true,
		autocomplete: `(${PseudoClassesAndElementsStr}|${PseudoClassesAndElementsColonStr}):`
	}, {
		name: "pseudo:multi",
		match(input, ctx) {
			if (!PseudoClassesMultiRE) PseudoClassesMultiRE = /* @__PURE__ */ new RegExp(`^(${PseudoClassesMultiStr})(?:${ctx.generator.config.separators.join("|")})`);
			const match = input.match(PseudoClassesMultiRE);
			if (match) return PseudoClassesMulti[match[1]].map((pseudo) => {
				return {
					matcher: input.slice(match[0].length),
					handle: (input$1, next) => next({
						...input$1,
						pseudo: `${input$1.pseudo}${pseudo}`
					})
				};
			});
		},
		multiPass: false,
		autocomplete: `(${PseudoClassesMultiStr}):`
	}];
}
function createPseudoClassFunctions(utils) {
	const { getBracket: getBracket$1, h } = utils;
	let PseudoClassFunctionsRE;
	let PseudoClassColonFunctionsRE;
	let PseudoClassVarFunctionRE;
	return {
		match(input, ctx) {
			if (!(PseudoClassFunctionsRE && PseudoClassColonFunctionsRE)) {
				PseudoClassFunctionsRE = /* @__PURE__ */ new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesStr})(?:${ctx.generator.config.separators.join("|")})`);
				PseudoClassColonFunctionsRE = /* @__PURE__ */ new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesColonStr})(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
				PseudoClassVarFunctionRE = /* @__PURE__ */ new RegExp(`^(${PseudoClassFunctionsStr})-(\\[.+\\])(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
			}
			const match = input.match(PseudoClassFunctionsRE) || input.match(PseudoClassColonFunctionsRE) || input.match(PseudoClassVarFunctionRE);
			if (match) {
				const fn = match[1];
				const pseudo = getBracket$1(match[2], "[", "]") ? h.bracket(match[2]) : PseudoClasses[match[2]] || PseudoClassesColon[match[2]] || `:${match[2]}`;
				return {
					matcher: input.slice(match[0].length),
					selector: (s) => `${s}:${fn}(${pseudo})`
				};
			}
		},
		multiPass: true,
		autocomplete: `(${PseudoClassFunctionsStr})-(${PseudoClassesStr}|${PseudoClassesColonStr}):`
	};
}
function createTaggedPseudoClasses(options, utils) {
	const attributify = !!(options === null || options === void 0 ? void 0 : options.attributifyPseudo);
	let firstPrefix = (options === null || options === void 0 ? void 0 : options.prefix) ?? "";
	firstPrefix = escapeSelector((Array.isArray(firstPrefix) ? firstPrefix : [firstPrefix]).filter(Boolean)[0] ?? "");
	const tagWithPrefix = (tag, combinator) => createTaggedPseudoClassMatcher(tag, attributify ? `[${firstPrefix}${tag}=""]` : `.${firstPrefix}${tag}`, combinator, utils);
	return [
		tagWithPrefix("group", " "),
		tagWithPrefix("peer", "~"),
		tagWithPrefix("parent", ">"),
		tagWithPrefix("previous", "+")
	];
}
var PartClassesRE = /(part-\[(.+)\]:)(.+)/;
function createPartClasses() {
	return {
		match(input) {
			const match = input.match(PartClassesRE);
			if (match) {
				const part = `part(${match[2]})`;
				return {
					matcher: input.slice(match[1].length),
					selector: (s) => `${s}::${part}`
				};
			}
		},
		multiPass: true
	};
}
function variantMatcher(name, handler, options = {}) {
	let re;
	return {
		name,
		match(input, ctx) {
			if (!re) re = /* @__PURE__ */ new RegExp(`^${escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`);
			const match = input.match(re);
			if (match) {
				const matcher = input.slice(match[0].length);
				const handlers = toArray(handler).map((handler$1) => ({
					matcher,
					handle: (input$1, next) => next({
						...input$1,
						...handler$1(input$1)
					}),
					...options
				}));
				return handlers.length === 1 ? handlers[0] : handlers;
			}
		},
		autocomplete: `${name}:`
	};
}
function variantParentMatcher(name, parent) {
	let re;
	return {
		name,
		match(input, ctx) {
			if (!re) re = /* @__PURE__ */ new RegExp(`^${escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`);
			const match = input.match(re);
			if (match) return {
				matcher: input.slice(match[0].length),
				handle: (input$1, next) => next({
					...input$1,
					parent: `${input$1.parent ? `${input$1.parent} $$ ` : ""}${parent}`
				})
			};
		},
		autocomplete: `${name}:`
	};
}
function variantGetBracket(prefix, matcher, separators) {
	if (matcher.startsWith(`${prefix}[`)) {
		const [match, rest] = getBracket(matcher.slice(prefix.length), "[", "]") ?? [];
		if (match && rest) {
			for (const separator of separators) if (rest.startsWith(separator)) return [
				match,
				rest.slice(separator.length),
				separator
			];
			return [
				match,
				rest,
				""
			];
		}
	}
}
function variantGetParameter(prefix, matcher, separators) {
	for (const p of toArray(prefix)) if (matcher.startsWith(p)) {
		const body = variantGetBracket(p, matcher, separators);
		if (body) {
			const [label = "", rest = body[1]] = variantGetParameter("/", body[1], separators) ?? [];
			return [
				body[0],
				rest,
				label
			];
		}
		for (const separator of separators.filter((x) => x !== "/")) {
			const pos = matcher.indexOf(separator, p.length);
			if (pos !== -1) {
				const labelPos = matcher.indexOf("/", p.length);
				const unlabelled = labelPos === -1 || pos <= labelPos;
				return [
					matcher.slice(p.length, unlabelled ? pos : labelPos),
					matcher.slice(pos + separator.length),
					unlabelled ? "" : matcher.slice(labelPos + 1, pos)
				];
			}
		}
	}
}
//#endregion
//#region node_modules/@unocss/preset-mini/dist/utils-BiEVyyOJ.mjs
var directionMap$1 = {
	"l": ["-left"],
	"r": ["-right"],
	"t": ["-top"],
	"b": ["-bottom"],
	"s": ["-inline-start"],
	"e": ["-inline-end"],
	"x": ["-left", "-right"],
	"y": ["-top", "-bottom"],
	"": [""],
	"bs": ["-block-start"],
	"be": ["-block-end"],
	"is": ["-inline-start"],
	"ie": ["-inline-end"],
	"block": ["-block-start", "-block-end"],
	"inline": ["-inline-start", "-inline-end"]
};
var insetMap$1 = {
	...directionMap$1,
	s: ["-inset-inline-start"],
	start: ["-inset-inline-start"],
	e: ["-inset-inline-end"],
	end: ["-inset-inline-end"],
	bs: ["-inset-block-start"],
	be: ["-inset-block-end"],
	is: ["-inset-inline-start"],
	ie: ["-inset-inline-end"],
	block: ["-inset-block-start", "-inset-block-end"],
	inline: ["-inset-inline-start", "-inset-inline-end"]
};
var cornerMap$1 = {
	"l": ["-top-left", "-bottom-left"],
	"r": ["-top-right", "-bottom-right"],
	"t": ["-top-left", "-top-right"],
	"b": ["-bottom-left", "-bottom-right"],
	"tl": ["-top-left"],
	"lt": ["-top-left"],
	"tr": ["-top-right"],
	"rt": ["-top-right"],
	"bl": ["-bottom-left"],
	"lb": ["-bottom-left"],
	"br": ["-bottom-right"],
	"rb": ["-bottom-right"],
	"": [""],
	"bs": ["-start-start", "-start-end"],
	"be": ["-end-start", "-end-end"],
	"s": ["-end-start", "-start-start"],
	"is": ["-end-start", "-start-start"],
	"e": ["-start-end", "-end-end"],
	"ie": ["-start-end", "-end-end"],
	"ss": ["-start-start"],
	"bs-is": ["-start-start"],
	"is-bs": ["-start-start"],
	"se": ["-start-end"],
	"bs-ie": ["-start-end"],
	"ie-bs": ["-start-end"],
	"es": ["-end-start"],
	"be-is": ["-end-start"],
	"is-be": ["-end-start"],
	"ee": ["-end-end"],
	"be-ie": ["-end-end"],
	"ie-be": ["-end-end"]
};
var xyzMap$1 = {
	"x": ["-x"],
	"y": ["-y"],
	"z": ["-z"],
	"": ["-x", "-y"]
};
var xyzArray$1 = [
	"x",
	"y",
	"z"
];
var basePositionMap$1 = [
	"top",
	"top center",
	"top left",
	"top right",
	"bottom",
	"bottom center",
	"bottom left",
	"bottom right",
	"left",
	"left center",
	"left top",
	"left bottom",
	"right",
	"right center",
	"right top",
	"right bottom",
	"center",
	"center top",
	"center bottom",
	"center left",
	"center right",
	"center center"
];
var positionMap$1 = Object.assign({}, ...basePositionMap$1.map((p) => ({ [p.replace(/ /, "-")]: p })), ...basePositionMap$1.map((p) => ({ [p.replace(/\b(\w)\w+/g, "$1").replace(/ /, "")]: p })));
var globalKeywords$1 = [
	"inherit",
	"initial",
	"revert",
	"revert-layer",
	"unset"
];
var cssMathFnRE$1 = /^(calc|clamp|min|max)\s*\((.+)\)(.*)/;
var cssVarFnRE$1 = /^(var)\s*\((.+)\)(.*)/;
var numberWithUnitRE$1 = /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i;
var numberRE$3 = /^(-?\d*(?:\.\d+)?)$/;
var unitOnlyRE$1 = /^(px|[sld]?v[wh])$/i;
var unitOnlyMap$1 = {
	px: 1,
	vw: 100,
	vh: 100,
	svw: 100,
	svh: 100,
	dvw: 100,
	dvh: 100,
	lvh: 100,
	lvw: 100
};
var bracketTypeRe$1 = /^\[(color|image|length|size|position|quoted|string):/i;
var splitComma$1 = /,(?![^()]*\))/g;
var handlers_exports$1 = /* @__PURE__ */ __exportAll$1({
	auto: () => auto$1,
	bracket: () => bracket$2,
	bracketOfColor: () => bracketOfColor$1,
	bracketOfLength: () => bracketOfLength$1,
	bracketOfPosition: () => bracketOfPosition$1,
	cssvar: () => cssvar$1,
	degree: () => degree$1,
	fraction: () => fraction$1,
	global: () => global$1,
	number: () => number$2,
	numberWithUnit: () => numberWithUnit$1,
	percent: () => percent$1,
	position: () => position$1,
	properties: () => properties$3,
	px: () => px$1,
	rem: () => rem$2,
	time: () => time$2
});
var cssProps$1 = [
	"color",
	"border-color",
	"background-color",
	"outline-color",
	"text-decoration-color",
	"flex-grow",
	"flex",
	"flex-shrink",
	"grid",
	"grid-template-columns",
	"grid-template-rows",
	"caret-color",
	"font",
	"gap",
	"opacity",
	"visibility",
	"z-index",
	"font-weight",
	"zoom",
	"text-shadow",
	"transform",
	"box-shadow",
	"border",
	"background-position",
	"left",
	"right",
	"top",
	"bottom",
	"object-position",
	"max-height",
	"min-height",
	"max-width",
	"min-width",
	"height",
	"width",
	"border-width",
	"margin",
	"padding",
	"outline-width",
	"outline-offset",
	"font-size",
	"line-height",
	"text-indent",
	"vertical-align",
	"border-spacing",
	"letter-spacing",
	"word-spacing",
	"stroke",
	"filter",
	"backdrop-filter",
	"fill",
	"mask",
	"mask-size",
	"mask-border",
	"clip-path",
	"clip",
	"border-radius"
];
function round$2(n) {
	return +n.toFixed(10);
}
function numberWithUnit$1(str) {
	const match = str.match(numberWithUnitRE$1);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (unit && !Number.isNaN(num)) return `${round$2(num)}${unit}`;
}
function auto$1(str) {
	if (str === "auto" || str === "a") return "auto";
}
function rem$2(str) {
	if (!str) return;
	if (unitOnlyRE$1.test(str)) return `${unitOnlyMap$1[str]}${str}`;
	const match = str.match(numberWithUnitRE$1);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (!Number.isNaN(num)) {
		if (num === 0) return "0";
		return unit ? `${round$2(num)}${unit}` : `${round$2(num / 4)}rem`;
	}
}
function px$1(str) {
	if (unitOnlyRE$1.test(str)) return `${unitOnlyMap$1[str]}${str}`;
	const match = str.match(numberWithUnitRE$1);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (!Number.isNaN(num)) return unit ? `${round$2(num)}${unit}` : `${round$2(num)}px`;
}
function number$2(str) {
	if (!numberRE$3.test(str)) return;
	const num = Number.parseFloat(str);
	if (!Number.isNaN(num)) return round$2(num);
}
function percent$1(str) {
	if (str.endsWith("%")) str = str.slice(0, -1);
	if (!numberRE$3.test(str)) return;
	const num = Number.parseFloat(str);
	if (!Number.isNaN(num)) return `${round$2(num / 100)}`;
}
function fraction$1(str) {
	if (!str) return;
	if (str === "full") return "100%";
	const [left, right] = str.split("/");
	const num = Number.parseFloat(left) / Number.parseFloat(right);
	if (!Number.isNaN(num)) {
		if (num === 0) return "0";
		return `${round$2(num * 100)}%`;
	}
}
function bracketWithType$1(str, requiredType) {
	if (str && str.startsWith("[") && str.endsWith("]")) {
		let base;
		let hintedType;
		const match = str.match(bracketTypeRe$1);
		if (!match) base = str.slice(1, -1);
		else {
			if (!requiredType) hintedType = match[1];
			base = str.slice(match[0].length, -1);
		}
		if (!base) return;
		if (base === "=\"\"") return;
		if (base.startsWith("--")) base = `var(${base})`;
		let curly = 0;
		for (const i of base) if (i === "[") curly += 1;
		else if (i === "]") {
			curly -= 1;
			if (curly < 0) return;
		}
		if (curly) return;
		switch (hintedType) {
			case "string": return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_");
			case "quoted": return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(["\\])/g, "\\$1").replace(/^(.+)$/, "\"$1\"");
		}
		return base.replace(/(url\(.*?\))/g, (v) => v.replace(/_/g, "\\_")).replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(?:calc|clamp|max|min)\((.*)/g, (match$1) => {
			const vars = [];
			return match$1.replace(/var\((--.+?)[,)]/g, (match$2, g1) => {
				vars.push(g1);
				return match$2.replace(g1, "--un-calc");
			}).replace(/(-?\d*\.?\d(?!-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ").replace(/--un-calc/g, () => vars.shift());
		});
	}
}
function bracket$2(str) {
	return bracketWithType$1(str);
}
function bracketOfColor$1(str) {
	return bracketWithType$1(str, "color");
}
function bracketOfLength$1(str) {
	return bracketWithType$1(str, "length");
}
function bracketOfPosition$1(str) {
	return bracketWithType$1(str, "position");
}
function cssvar$1(str) {
	if (/^\$[^\s'"`;{}]/.test(str)) {
		const [name, defaultValue] = str.slice(1).split(",");
		return `var(--${escapeSelector(name)}${defaultValue ? `, ${defaultValue}` : ""})`;
	}
}
function time$2(str) {
	const match = str.match(/^(-?[0-9.]+)(s|ms)?$/i);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (!Number.isNaN(num)) {
		if (num === 0 && !unit) return "0s";
		return unit ? `${round$2(num)}${unit}` : `${round$2(num)}ms`;
	}
}
function degree$1(str) {
	const match = str.match(/^(-?[0-9.]+)(deg|rad|grad|turn)?$/i);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (!Number.isNaN(num)) {
		if (num === 0) return "0deg";
		return unit ? `${round$2(num)}${unit}` : `${round$2(num)}deg`;
	}
}
function global$1(str) {
	if (globalKeywords$1.includes(str)) return str;
}
function properties$3(str) {
	if (str.split(",").every((prop) => cssProps$1.includes(prop))) return str;
}
function position$1(str) {
	if ([
		"top",
		"left",
		"right",
		"bottom",
		"center"
	].includes(str)) return str;
}
var handler$1 = createValueHandler(handlers_exports$1);
var h$1 = handler$1;
var CONTROL_MINI_NO_NEGATIVE = "$$mini-no-negative";
/**
* Provide {@link DynamicMatcher} function returning spacing definition. See spacing rules.
*
* @param propertyPrefix - Property for the css value to be created. Postfix will be appended according to direction matched.
* @see {@link directionMap}
*/
function directionSize$1(propertyPrefix) {
	return ([_, direction, size], { theme }) => {
		const v = theme.spacing?.[size || "DEFAULT"] ?? h$1.bracket.cssvar.global.auto.fraction.rem(size);
		if (v != null) return directionMap$1[direction].map((i) => [`${propertyPrefix}${i}`, v]);
		else if (size?.startsWith("-")) {
			const v$1 = theme.spacing?.[size.slice(1)];
			if (v$1 != null) return directionMap$1[direction].map((i) => [`${propertyPrefix}${i}`, `calc(${v$1} * -1)`]);
		}
	};
}
function getThemeColorForKey(theme, colors, key = "colors") {
	const obj = theme[key];
	function deepGet(current, path) {
		if (path.length === 0) return current;
		if (!current || typeof current !== "object") return void 0;
		for (let i = path.length; i > 0; i--) {
			const flatKey = path.slice(0, i).join("-");
			const value = current[flatKey.replace(/(-[a-z])/g, (n) => n.slice(1).toUpperCase())] ?? current[flatKey];
			if (value != null) {
				if (i === path.length) return value;
				return deepGet(value, path.slice(i));
			}
		}
	}
	return deepGet(obj, colors);
}
/**
* Obtain color from theme by camel-casing colors.
*/
function getThemeColor(theme, colors, key) {
	return getThemeColorForKey(theme, colors, key) || getThemeColorForKey(theme, colors, "colors");
}
/**
* Split utility shorthand delimited by / or :
*/
function splitShorthand$1(body, type) {
	const [front, rest] = getStringComponent(body, "[", "]", ["/", ":"]) ?? [];
	if (front != null) {
		const match = (front.match(bracketTypeRe$1) ?? [])[1];
		if (match == null || match === type) return [front, rest];
	}
}
/**
* Parse color string into {@link ParsedColorValue} (if possible). Color value will first be matched to theme object before parsing.
* See also color.tests.ts for more examples.
*
* @example Parseable strings:
* 'red' // From theme, if 'red' is available
* 'red-100' // From theme, plus scale
* 'red-100/20' // From theme, plus scale/opacity
* '[rgb(100 2 3)]/[var(--op)]' // Bracket with rgb color and bracket with opacity
*
* @param body - Color string to be parsed.
* @param theme - {@link Theme} object.
* @return object if string is parseable.
*/
function parseColor$1(body, theme, key) {
	const split = splitShorthand$1(body, "color");
	if (!split) return;
	const [main, opacity] = split;
	const colors = main.replace(/([a-z])(\d)/g, "$1-$2").split(/-/g);
	const [name] = colors;
	if (!name) return;
	let color;
	const bracket$1 = h$1.bracketOfColor(main);
	const bracketOrMain = bracket$1 || main;
	if (h$1.numberWithUnit(bracketOrMain)) return;
	if (/^#[\da-f]+$/i.test(bracketOrMain)) color = bracketOrMain;
	else if (/^hex-[\da-fA-F]+$/.test(bracketOrMain)) color = `#${bracketOrMain.slice(4)}`;
	else if (main.startsWith("$")) color = h$1.cssvar(main);
	color = color || bracket$1;
	if (!color) {
		const colorData = getThemeColor(theme, [main], key);
		if (typeof colorData === "string") color = colorData;
	}
	let no = "DEFAULT";
	if (!color) {
		let keys = colors;
		let _no;
		const [scale] = colors.slice(-1);
		if (/^\d+$/.test(scale)) {
			no = _no = scale;
			keys = colors.slice(0, -1);
		}
		const colorData = getThemeColor(theme, keys, key);
		if (typeof colorData === "object") color = colorData[_no ?? no];
		else if (typeof colorData === "string" && !_no) color = colorData;
	}
	return {
		opacity,
		name,
		no,
		color,
		cssColor: parseCssColor(color),
		alpha: h$1.bracket.cssvar.percent(opacity ?? "")
	};
}
/**
* Provide {@link DynamicMatcher} function to produce color value matched from rule.
*
* @see {@link parseColor}
*
* @example Resolving 'red' from theme:
* colorResolver('background-color', 'background')('', 'red')
* return { 'background-color': '#f12' }
*
* @example Resolving 'red-100' from theme:
* colorResolver('background-color', 'background')('', 'red-100')
* return { '--un-background-opacity': '1', 'background-color': 'rgb(254 226 226 / var(--un-background-opacity))' }
*
* @example Resolving 'red-100/20' from theme:
* colorResolver('background-color', 'background')('', 'red-100/20')
* return { 'background-color': 'rgb(204 251 241 / 0.22)' }
*
* @example Resolving 'hex-124':
* colorResolver('color', 'text')('', 'hex-124')
* return { '--un-text-opacity': '1', 'color': 'rgb(17 34 68 / var(--un-text-opacity))' }
*
* @param property - Property for the css value to be created.
* @param varName - Base name for the opacity variable.
* @param [key] - Theme key to select the color from.
* @param [shouldPass] - Function to decide whether to pass the css.
* @return object.
*/
function colorResolver$1(property, varName, key, shouldPass) {
	return ([, body], { theme, generator }) => {
		const data = parseColor$1(body ?? "", theme, key);
		if (!data) return;
		const { alpha, color, cssColor } = data;
		const rawColorComment = generator.config.envMode === "dev" && color ? ` /* ${color} */` : "";
		const css = {};
		if (cssColor) if (alpha != null) css[property] = colorToString(cssColor, alpha) + rawColorComment;
		else {
			const opacityVar = `--un-${varName}-opacity`;
			const result = colorToString(cssColor, `var(${opacityVar})`);
			if (result.includes(opacityVar)) css[opacityVar] = colorOpacityToString(cssColor);
			css[property] = result + rawColorComment;
		}
		else if (color) if (alpha != null) css[property] = colorToString(color, alpha) + rawColorComment;
		else {
			const opacityVar = `--un-${varName}-opacity`;
			const result = colorToString(color, `var(${opacityVar})`);
			if (result.includes(opacityVar)) css[opacityVar] = 1;
			css[property] = result + rawColorComment;
		}
		if (shouldPass?.(css) !== false) return css;
	};
}
function colorableShadows$1(shadows, colorVar) {
	const colored = [];
	shadows = toArray(shadows);
	for (let i = 0; i < shadows.length; i++) {
		const components = getStringComponents(shadows[i], " ", 6);
		if (!components || components.length < 3) return shadows;
		let isInset = false;
		const pos = components.indexOf("inset");
		if (pos !== -1) {
			components.splice(pos, 1);
			isInset = true;
		}
		let colorVarValue = "";
		const lastComp = components.at(-1);
		if (parseCssColor(components.at(0))) {
			const color = parseCssColor(components.shift());
			if (color) colorVarValue = `, ${colorToString(color)}`;
		} else if (parseCssColor(lastComp)) {
			const color = parseCssColor(components.pop());
			if (color) colorVarValue = `, ${colorToString(color)}`;
		} else if (lastComp && lastComp.startsWith("var(")) colorVarValue = `, ${components.pop()}`;
		colored.push(`${isInset ? "inset " : ""}${components.join(" ")} var(${colorVar}${colorVarValue})`);
	}
	return colored;
}
function hasParseableColor$1(color, theme, key) {
	return color != null && !!parseColor$1(color, theme, key)?.color;
}
var reLetters$1 = /[a-z]+/gi;
var resolvedBreakpoints$1 = /* @__PURE__ */ new WeakMap();
function resolveBreakpoints$1({ theme, generator }, key = "breakpoints") {
	const breakpoints = (generator?.userConfig?.theme)?.[key] || theme[key];
	if (!breakpoints) return void 0;
	if (resolvedBreakpoints$1.has(theme)) return resolvedBreakpoints$1.get(theme);
	const resolved = Object.entries(breakpoints).sort((a, b) => Number.parseInt(a[1].replace(reLetters$1, "")) - Number.parseInt(b[1].replace(reLetters$1, ""))).map(([point, size]) => ({
		point,
		size
	}));
	resolvedBreakpoints$1.set(theme, resolved);
	return resolved;
}
function resolveVerticalBreakpoints(context) {
	return resolveBreakpoints$1(context, "verticalBreakpoints");
}
function makeGlobalStaticRules$1(prefix, property) {
	return globalKeywords$1.map((keyword) => [`${prefix}-${keyword}`, { [property ?? prefix]: keyword }]);
}
function isCSSMathFn$1(value) {
	return value != null && cssMathFnRE$1.test(value);
}
function isSize$1(str) {
	if (str[0] === "[" && str.slice(-1) === "]") str = str.slice(1, -1);
	return cssMathFnRE$1.test(str) || numberWithUnitRE$1.test(str);
}
function transformXYZ$1(d, v, name) {
	const values = v.split(splitComma$1);
	if (d || !d && values.length === 1) return xyzMap$1[d].map((i) => [`--un-${name}${i}`, v]);
	return values.map((v$1, i) => [`--un-${name}-${xyzArray$1[i]}`, v$1]);
}
var _utils_exports = /* @__PURE__ */ __exportAll$1({
	CONTROL_MINI_NO_NEGATIVE: () => CONTROL_MINI_NO_NEGATIVE,
	colorResolver: () => colorResolver$1,
	colorableShadows: () => colorableShadows$1,
	cornerMap: () => cornerMap$1,
	cssMathFnRE: () => cssMathFnRE$1,
	cssVarFnRE: () => cssVarFnRE$1,
	directionMap: () => directionMap$1,
	directionSize: () => directionSize$1,
	globalKeywords: () => globalKeywords$1,
	h: () => h$1,
	handler: () => handler$1,
	hasParseableColor: () => hasParseableColor$1,
	insetMap: () => insetMap$1,
	isCSSMathFn: () => isCSSMathFn$1,
	isSize: () => isSize$1,
	makeGlobalStaticRules: () => makeGlobalStaticRules$1,
	parseColor: () => parseColor$1,
	positionMap: () => positionMap$1,
	resolveBreakpoints: () => resolveBreakpoints$1,
	resolveVerticalBreakpoints: () => resolveVerticalBreakpoints,
	splitShorthand: () => splitShorthand$1,
	transformXYZ: () => transformXYZ$1,
	valueHandlers: () => handlers_exports$1,
	xyzArray: () => xyzArray$1,
	xyzMap: () => xyzMap$1
});
__reExport(_utils_exports, dist_exports);
var utils_exports = /* @__PURE__ */ __exportAll$1({
	CONTROL_MINI_NO_NEGATIVE: () => CONTROL_MINI_NO_NEGATIVE,
	colorResolver: () => colorResolver$1,
	colorableShadows: () => colorableShadows$1,
	cornerMap: () => cornerMap$1,
	cssMathFnRE: () => cssMathFnRE$1,
	cssVarFnRE: () => cssVarFnRE$1,
	directionMap: () => directionMap$1,
	directionSize: () => directionSize$1,
	globalKeywords: () => globalKeywords$1,
	h: () => h$1,
	handler: () => handler$1,
	hasParseableColor: () => hasParseableColor$1,
	insetMap: () => insetMap$1,
	isCSSMathFn: () => isCSSMathFn$1,
	isSize: () => isSize$1,
	makeGlobalStaticRules: () => makeGlobalStaticRules$1,
	parseColor: () => parseColor$1,
	positionMap: () => positionMap$1,
	resolveBreakpoints: () => resolveBreakpoints$1,
	resolveVerticalBreakpoints: () => resolveVerticalBreakpoints,
	splitShorthand: () => splitShorthand$1,
	transformXYZ: () => transformXYZ$1,
	valueHandlers: () => handlers_exports$1,
	xyzArray: () => xyzArray$1,
	xyzMap: () => xyzMap$1
});
__reExport(utils_exports, _utils_exports);
//#endregion
//#region node_modules/@unocss/preset-mini/dist/rules-DIZf3KzB.mjs
var verticalAlignAlias$1 = {
	"mid": "middle",
	"base": "baseline",
	"btm": "bottom",
	"baseline": "baseline",
	"top": "top",
	"start": "top",
	"middle": "middle",
	"bottom": "bottom",
	"end": "bottom",
	"text-top": "text-top",
	"text-bottom": "text-bottom",
	"sub": "sub",
	"super": "super",
	...Object.fromEntries(globalKeywords$1.map((x) => [x, x]))
};
var verticalAligns$1 = [[
	/^(?:vertical|align|v)-(.+)$/,
	([, v]) => ({ "vertical-align": verticalAlignAlias$1[v] ?? h$1.bracket.cssvar.numberWithUnit(v) }),
	{ autocomplete: [`(vertical|align|v)-(${Object.keys(verticalAlignAlias$1).join("|")})`, "(vertical|align|v)-<percentage>"] }
]];
var textAlignValues$1 = [
	"center",
	"left",
	"right",
	"justify",
	"start",
	"end"
];
var textAligns$1 = [...textAlignValues$1.map((v) => [`text-${v}`, { "text-align": v }]), ...[...globalKeywords$1, ...textAlignValues$1].map((v) => [`text-align-${v}`, { "text-align": v }])];
var outline$1 = [
	[
		/^outline-(?:width-|size-)?(.+)$/,
		handleWidth$3,
		{ autocomplete: "outline-(width|size)-<num>" }
	],
	[
		/^outline-(?:color-)?(.+)$/,
		handleColorOrWidth$3,
		{ autocomplete: "outline-$colors" }
	],
	[
		/^outline-offset-(.+)$/,
		([, d], { theme }) => ({ "outline-offset": theme.lineWidth?.[d] ?? h$1.bracket.cssvar.global.px(d) }),
		{ autocomplete: "outline-(offset)-<num>" }
	],
	["outline", { "outline-style": "solid" }],
	...[
		"auto",
		"dashed",
		"dotted",
		"double",
		"hidden",
		"solid",
		"groove",
		"ridge",
		"inset",
		"outset",
		...globalKeywords$1
	].map((v) => [`outline-${v}`, { "outline-style": v }]),
	["outline-none", {
		"outline": "2px solid transparent",
		"outline-offset": "2px"
	}]
];
function handleWidth$3([, b], { theme }) {
	return { "outline-width": theme.lineWidth?.[b] ?? h$1.bracket.cssvar.global.px(b) };
}
function handleColorOrWidth$3(match, ctx) {
	if (isCSSMathFn$1(h$1.bracket(match[1]))) return handleWidth$3(match, ctx);
	return colorResolver$1("outline-color", "outline-color", "borderColor")(match, ctx);
}
var appearance$1 = [["appearance-auto", {
	"-webkit-appearance": "auto",
	"appearance": "auto"
}], ["appearance-none", {
	"-webkit-appearance": "none",
	"appearance": "none"
}]];
function willChangeProperty$1(prop) {
	return h$1.properties.auto.global(prop) ?? {
		contents: "contents",
		scroll: "scroll-position"
	}[prop];
}
var willChange$1 = [[/^will-change-(.+)/, ([, p]) => ({ "will-change": willChangeProperty$1(p) })]];
var borderStyles$1 = [
	"solid",
	"dashed",
	"dotted",
	"double",
	"hidden",
	"none",
	"groove",
	"ridge",
	"inset",
	"outset",
	...globalKeywords$1
];
var borders$1 = [
	[
		/^(?:border|b)()(?:-(.+))?$/,
		handlerBorderSize$1,
		{ autocomplete: "(border|b)-<directions>" }
	],
	[/^(?:border|b)-([xy])(?:-(.+))?$/, handlerBorderSize$1],
	[/^(?:border|b)-([rltbse])(?:-(.+))?$/, handlerBorderSize$1],
	[/^(?:border|b)-(block|inline)(?:-(.+))?$/, handlerBorderSize$1],
	[/^(?:border|b)-([bi][se])(?:-(.+))?$/, handlerBorderSize$1],
	[
		/^(?:border|b)-()(?:width|size)-(.+)$/,
		handlerBorderSize$1,
		{ autocomplete: ["(border|b)-<num>", "(border|b)-<directions>-<num>"] }
	],
	[/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, handlerBorderSize$1],
	[/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, handlerBorderSize$1],
	[/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, handlerBorderSize$1],
	[/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, handlerBorderSize$1],
	[
		/^(?:border|b)-()(?:color-)?(.+)$/,
		handlerBorderColorOrSize$1,
		{ autocomplete: ["(border|b)-$colors", "(border|b)-<directions>-$colors"] }
	],
	[/^(?:border|b)-([xy])-(?:color-)?(.+)$/, handlerBorderColorOrSize$1],
	[/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, handlerBorderColorOrSize$1],
	[/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, handlerBorderColorOrSize$1],
	[/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, handlerBorderColorOrSize$1],
	[
		/^(?:border|b)-()op(?:acity)?-?(.+)$/,
		handlerBorderOpacity$1,
		{ autocomplete: "(border|b)-(op|opacity)-<percent>" }
	],
	[/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/, handlerBorderOpacity$1],
	[/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/, handlerBorderOpacity$1],
	[/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/, handlerBorderOpacity$1],
	[/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/, handlerBorderOpacity$1],
	[
		/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/,
		handlerRounded$1,
		{ autocomplete: [
			"(border|b)-(rounded|rd)",
			"(border|b)-(rounded|rd)-$borderRadius",
			"(rounded|rd)",
			"(rounded|rd)-$borderRadius"
		] }
	],
	[/^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/, handlerRounded$1],
	[/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, handlerRounded$1],
	[/^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/, handlerRounded$1],
	[/^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/, handlerRounded$1],
	[
		/^(?:border|b)-(?:style-)?()(.+)$/,
		handlerBorderStyle$1,
		{ autocomplete: [
			"(border|b)-style",
			`(border|b)-(${borderStyles$1.join("|")})`,
			"(border|b)-<directions>-style",
			`(border|b)-<directions>-(${borderStyles$1.join("|")})`,
			`(border|b)-<directions>-style-(${borderStyles$1.join("|")})`,
			`(border|b)-style-(${borderStyles$1.join("|")})`
		] }
	],
	[/^(?:border|b)-([xy])-(?:style-)?(.+)$/, handlerBorderStyle$1],
	[/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/, handlerBorderStyle$1],
	[/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/, handlerBorderStyle$1],
	[/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/, handlerBorderStyle$1]
];
function transformBorderColor(color, alpha, direction) {
	if (alpha != null) return { [`border${direction}-color`]: colorToString(color, alpha) };
	if (direction === "") {
		const object = {};
		const opacityVar = `--un-border-opacity`;
		const result = colorToString(color, `var(${opacityVar})`);
		if (result.includes(opacityVar)) object[opacityVar] = typeof color === "string" ? 1 : colorOpacityToString(color);
		object["border-color"] = result;
		return object;
	} else {
		const object = {};
		const opacityVar = "--un-border-opacity";
		const opacityDirectionVar = `--un-border${direction}-opacity`;
		const result = colorToString(color, `var(${opacityDirectionVar})`);
		if (result.includes(opacityDirectionVar)) {
			object[opacityVar] = typeof color === "string" ? 1 : colorOpacityToString(color);
			object[opacityDirectionVar] = `var(${opacityVar})`;
		}
		object[`border${direction}-color`] = result;
		return object;
	}
}
function borderColorResolver$1(direction) {
	return ([, body], theme) => {
		const data = parseColor$1(body, theme, "borderColor");
		if (!data) return;
		const { alpha, color, cssColor } = data;
		if (cssColor) return transformBorderColor(cssColor, alpha, direction);
		else if (color) return transformBorderColor(color, alpha, direction);
	};
}
function handlerBorderSize$1([, a = "", b], { theme }) {
	const v = theme.lineWidth?.[b || "DEFAULT"] ?? h$1.bracket.cssvar.global.px(b || "1");
	if (a in directionMap$1 && v != null) return directionMap$1[a].map((i) => [`border${i}-width`, v]);
}
function handlerBorderColorOrSize$1([, a = "", b], ctx) {
	if (a in directionMap$1) {
		if (isCSSMathFn$1(h$1.bracket(b))) return handlerBorderSize$1([
			"",
			a,
			b
		], ctx);
		if (hasParseableColor$1(b, ctx.theme, "borderColor")) return Object.assign({}, ...directionMap$1[a].map((i) => borderColorResolver$1(i)(["", b], ctx.theme)));
	}
}
function handlerBorderOpacity$1([, a = "", opacity$1]) {
	const v = h$1.bracket.percent.cssvar(opacity$1);
	if (a in directionMap$1 && v != null) return directionMap$1[a].map((i) => [`--un-border${i}-opacity`, v]);
}
function handlerRounded$1([, a = "", s], { theme }) {
	const v = theme.borderRadius?.[s || "DEFAULT"] || h$1.bracket.cssvar.global.fraction.rem(s || "1");
	if (a in cornerMap$1 && v != null) return cornerMap$1[a].map((i) => [`border${i}-radius`, v]);
}
function handlerBorderStyle$1([, a = "", s]) {
	if (borderStyles$1.includes(s) && a in directionMap$1) return directionMap$1[a].map((i) => [`border${i}-style`, s]);
}
/**
* @example op10 op-30 opacity-100
*/
var opacity$2 = [[/^op(?:acity)?-?(.+)$/, ([, d]) => ({ opacity: h$1.bracket.percent.cssvar(d) })]];
var bgUrlRE$1 = /^\[url\(.+\)\]$/;
var bgLengthRE$1 = /^\[(?:length|size):.+\]$/;
var bgPositionRE$1 = /^\[position:.+\]$/;
var bgGradientRE$1 = /^\[(?:linear|conic|radial)-gradient\(.+\)\]$/;
var bgImageRE$1 = /^\[image:.+\]$/;
var bgColors$1 = [[
	/^bg-(.+)$/,
	(...args) => {
		const d = args[0][1];
		if (bgUrlRE$1.test(d)) return {
			"--un-url": h$1.bracket(d),
			"background-image": "var(--un-url)"
		};
		if (bgLengthRE$1.test(d) && h$1.bracketOfLength(d) != null) return { "background-size": h$1.bracketOfLength(d).split(" ").map((e) => h$1.fraction.auto.px.cssvar(e) ?? e).join(" ") };
		if ((isSize$1(d) || bgPositionRE$1.test(d)) && h$1.bracketOfPosition(d) != null) return { "background-position": h$1.bracketOfPosition(d).split(" ").map((e) => h$1.position.fraction.auto.px.cssvar(e) ?? e).join(" ") };
		if (bgGradientRE$1.test(d) || bgImageRE$1.test(d)) {
			const s = h$1.bracket(d);
			if (s) {
				const url = s.startsWith("http") ? `url(${s})` : h$1.cssvar(s);
				return { "background-image": url ?? s };
			}
		}
		return colorResolver$1("background-color", "bg", "backgroundColor")(...args);
	},
	{ autocomplete: "bg-$colors" }
], [
	/^bg-op(?:acity)?-?(.+)$/,
	([, opacity$1]) => ({ "--un-bg-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
	{ autocomplete: "bg-(op|opacity)-<percent>" }
]];
var colorScheme$1 = [[/^color-scheme-(\w+)$/, ([, v]) => ({ "color-scheme": v })]];
var containerParent$1 = [[/^@container(?:\/(\w+))?(?:-(normal|inline-size|size))?$/, ([, l, v]) => {
	return {
		"container-type": v ?? "inline-size",
		"container-name": l
	};
}]];
var decorationStyles$1 = [
	"solid",
	"double",
	"dotted",
	"dashed",
	"wavy",
	...globalKeywords$1
];
var textDecorations$1 = [
	[
		/^(?:decoration-)?(underline|overline|line-through)$/,
		([, s]) => ({ "text-decoration-line": s }),
		{ autocomplete: "decoration-(underline|overline|line-through)" }
	],
	[
		/^(?:underline|decoration)-(?:size-)?(.+)$/,
		handleWidth$2$1,
		{ autocomplete: "(underline|decoration)-<num>" }
	],
	[
		/^(?:underline|decoration)-(auto|from-font)$/,
		([, s]) => ({ "text-decoration-thickness": s }),
		{ autocomplete: "(underline|decoration)-(auto|from-font)" }
	],
	[
		/^(?:underline|decoration)-(.+)$/,
		handleColorOrWidth$2$1,
		{ autocomplete: "(underline|decoration)-$colors" }
	],
	[
		/^(?:underline|decoration)-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-line-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "(underline|decoration)-(op|opacity)-<percent>" }
	],
	[
		/^(?:underline|decoration)-offset-(.+)$/,
		([, s], { theme }) => ({ "text-underline-offset": theme.lineWidth?.[s] ?? h$1.auto.bracket.cssvar.global.px(s) }),
		{ autocomplete: "(underline|decoration)-(offset)-<num>" }
	],
	...decorationStyles$1.map((v) => [`underline-${v}`, { "text-decoration-style": v }]),
	...decorationStyles$1.map((v) => [`decoration-${v}`, { "text-decoration-style": v }]),
	["no-underline", { "text-decoration": "none" }],
	["decoration-none", { "text-decoration": "none" }]
];
function handleWidth$2$1([, b], { theme }) {
	return { "text-decoration-thickness": theme.lineWidth?.[b] ?? h$1.bracket.cssvar.global.px(b) };
}
function handleColorOrWidth$2$1(match, ctx) {
	if (isCSSMathFn$1(h$1.bracket(match[1]))) return handleWidth$2$1(match, ctx);
	const result = colorResolver$1("text-decoration-color", "line", "borderColor")(match, ctx);
	if (result) return {
		"-webkit-text-decoration-color": result["text-decoration-color"],
		...result
	};
}
var flex$2 = [
	["flex", { display: "flex" }],
	["inline-flex", { display: "inline-flex" }],
	["flex-inline", { display: "inline-flex" }],
	[/^flex-(.*)$/, ([, d]) => ({ flex: h$1.bracket(d) != null ? h$1.bracket(d).split(" ").map((e) => h$1.cssvar.fraction(e) ?? e).join(" ") : h$1.cssvar.fraction(d) })],
	["flex-1", { flex: "1 1 0%" }],
	["flex-auto", { flex: "1 1 auto" }],
	["flex-initial", { flex: "0 1 auto" }],
	["flex-none", { flex: "none" }],
	[
		/^(?:flex-)?shrink(?:-(.*))?$/,
		([, d = ""]) => ({ "flex-shrink": h$1.bracket.cssvar.number(d) ?? 1 }),
		{ autocomplete: ["flex-shrink-<num>", "shrink-<num>"] }
	],
	[
		/^(?:flex-)?grow(?:-(.*))?$/,
		([, d = ""]) => ({ "flex-grow": h$1.bracket.cssvar.number(d) ?? 1 }),
		{ autocomplete: ["flex-grow-<num>", "grow-<num>"] }
	],
	[
		/^(?:flex-)?basis-(.+)$/,
		([, d], { theme }) => ({ "flex-basis": theme.spacing?.[d] ?? h$1.bracket.cssvar.auto.fraction.rem(d) }),
		{ autocomplete: ["flex-basis-$spacing", "basis-$spacing"] }
	],
	["flex-row", { "flex-direction": "row" }],
	["flex-row-reverse", { "flex-direction": "row-reverse" }],
	["flex-col", { "flex-direction": "column" }],
	["flex-col-reverse", { "flex-direction": "column-reverse" }],
	["flex-wrap", { "flex-wrap": "wrap" }],
	["flex-wrap-reverse", { "flex-wrap": "wrap-reverse" }],
	["flex-nowrap", { "flex-wrap": "nowrap" }]
];
var directions$1 = {
	"": "",
	"x": "column-",
	"y": "row-",
	"col": "column-",
	"row": "row-"
};
function handleGap([, d = "", s], { theme }) {
	const v = theme.spacing?.[s] ?? h$1.bracket.cssvar.global.rem(s);
	if (v != null) return { [`${directions$1[d]}gap`]: v };
}
var gaps$1 = [
	[
		/^(?:flex-|grid-)?gap-?()(.+)$/,
		handleGap,
		{ autocomplete: ["gap-$spacing", "gap-<num>"] }
	],
	[
		/^(?:flex-|grid-)?gap-([xy])-?(.+)$/,
		handleGap,
		{ autocomplete: ["gap-(x|y)-$spacing", "gap-(x|y)-<num>"] }
	],
	[
		/^(?:flex-|grid-)?gap-(col|row)-?(.+)$/,
		handleGap,
		{ autocomplete: ["gap-(col|row)-$spacing", "gap-(col|row)-<num>"] }
	]
];
function rowCol$1(s) {
	return s.replace("col", "column");
}
function rowColTheme(s) {
	return s[0] === "r" ? "Row" : "Column";
}
function autoDirection$1(c, theme, prop) {
	const v = theme[`gridAuto${rowColTheme(c)}`]?.[prop];
	if (v != null) return v;
	switch (prop) {
		case "min": return "min-content";
		case "max": return "max-content";
		case "fr": return "minmax(0,1fr)";
	}
	return h$1.bracket.cssvar.auto.rem(prop);
}
var grids$1 = [
	["grid", { display: "grid" }],
	["inline-grid", { display: "inline-grid" }],
	[/^(?:grid-)?(row|col)-(.+)$/, ([, c, v], { theme }) => ({ [`grid-${rowCol$1(c)}`]: theme[`grid${rowColTheme(c)}`]?.[v] ?? h$1.bracket.cssvar.auto(v) })],
	[
		/^(?:grid-)?(row|col)-span-(.+)$/,
		([, c, s]) => {
			if (s === "full") return { [`grid-${rowCol$1(c)}`]: "1/-1" };
			const v = h$1.bracket.number(s);
			if (v != null) return { [`grid-${rowCol$1(c)}`]: `span ${v}/span ${v}` };
		},
		{ autocomplete: "(grid-row|grid-col|row|col)-span-<num>" }
	],
	[/^(?:grid-)?(row|col)-start-(.+)$/, ([, c, v]) => ({ [`grid-${rowCol$1(c)}-start`]: h$1.bracket.cssvar(v) ?? v })],
	[
		/^(?:grid-)?(row|col)-end-(.+)$/,
		([, c, v]) => ({ [`grid-${rowCol$1(c)}-end`]: h$1.bracket.cssvar(v) ?? v }),
		{ autocomplete: "(grid-row|grid-col|row|col)-(start|end)-<num>" }
	],
	[
		/^(?:grid-)?auto-(rows|cols)-(.+)$/,
		([, c, v], { theme }) => ({ [`grid-auto-${rowCol$1(c)}`]: autoDirection$1(c, theme, v) }),
		{ autocomplete: "(grid-auto|auto)-(rows|cols)-<num>" }
	],
	[/^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/, ([, v]) => ({ "grid-auto-flow": h$1.bracket.cssvar(v) })],
	[
		/^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/,
		([, v]) => ({ "grid-auto-flow": rowCol$1(v).replace("-", " ") }),
		{ autocomplete: ["(grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)"] }
	],
	[/^(?:grid-)?(rows|cols)-(.+)$/, ([, c, v], { theme }) => ({ [`grid-template-${rowCol$1(c)}`]: theme[`gridTemplate${rowColTheme(c)}`]?.[v] ?? h$1.bracket.cssvar(v) })],
	[/^(?:grid-)?(rows|cols)-minmax-([\w.-]+)$/, ([, c, d]) => ({ [`grid-template-${rowCol$1(c)}`]: `repeat(auto-fill,minmax(${d},1fr))` })],
	[
		/^(?:grid-)?(rows|cols)-(\d+)$/,
		([, c, d]) => ({ [`grid-template-${rowCol$1(c)}`]: `repeat(${d},minmax(0,1fr))` }),
		{ autocomplete: "(grid-rows|grid-cols|rows|cols)-<num>" }
	],
	[/^grid-area(s)?-(.+)$/, ([, s, v]) => {
		if (s != null) return { "grid-template-areas": h$1.cssvar(v) ?? v.split("-").map((s$1) => `"${h$1.bracket(s$1)}"`).join(" ") };
		return { "grid-area": h$1.bracket.cssvar(v) };
	}],
	["grid-rows-none", { "grid-template-rows": "none" }],
	["grid-cols-none", { "grid-template-columns": "none" }],
	["grid-rows-subgrid", { "grid-template-rows": "subgrid" }],
	["grid-cols-subgrid", { "grid-template-columns": "subgrid" }]
];
var overflowValues$1 = [
	"auto",
	"hidden",
	"clip",
	"visible",
	"scroll",
	"overlay",
	...globalKeywords$1
];
var overflows$1 = [[
	/^(?:overflow|of)-(.+)$/,
	([, v]) => overflowValues$1.includes(v) ? { overflow: v } : void 0,
	{ autocomplete: [`(overflow|of)-(${overflowValues$1.join("|")})`, `(overflow|of)-(x|y)-(${overflowValues$1.join("|")})`] }
], [/^(?:overflow|of)-([xy])-(.+)$/, ([, d, v]) => overflowValues$1.includes(v) ? { [`overflow-${d}`]: v } : void 0]];
var positions$1 = [
	[
		/^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/,
		([, v]) => ({ position: v }),
		{ autocomplete: [
			"(position|pos)-<position>",
			"(position|pos)-<globalKeyword>",
			"<position>"
		] }
	],
	[/^(?:position-|pos-)([-\w]+)$/, ([, v]) => globalKeywords$1.includes(v) ? { position: v } : void 0],
	[/^(?:position-|pos-)?(static)$/, ([, v]) => ({ position: v })]
];
var justifies$1 = [
	["justify-start", { "justify-content": "flex-start" }],
	["justify-end", { "justify-content": "flex-end" }],
	["justify-center", { "justify-content": "center" }],
	["justify-between", { "justify-content": "space-between" }],
	["justify-around", { "justify-content": "space-around" }],
	["justify-evenly", { "justify-content": "space-evenly" }],
	["justify-stretch", { "justify-content": "stretch" }],
	["justify-left", { "justify-content": "left" }],
	["justify-right", { "justify-content": "right" }],
	["justify-center-safe", { "justify-content": "safe center" }],
	["justify-end-safe", { "justify-content": "safe flex-end" }],
	["justify-normal", { "justify-content": "normal" }],
	...makeGlobalStaticRules$1("justify", "justify-content"),
	["justify-items-start", { "justify-items": "start" }],
	["justify-items-end", { "justify-items": "end" }],
	["justify-items-center", { "justify-items": "center" }],
	["justify-items-stretch", { "justify-items": "stretch" }],
	["justify-items-center-safe", { "justify-items": "safe center" }],
	["justify-items-end-safe", { "justify-items": "safe flex-end" }],
	...makeGlobalStaticRules$1("justify-items"),
	["justify-self-auto", { "justify-self": "auto" }],
	["justify-self-start", { "justify-self": "start" }],
	["justify-self-end", { "justify-self": "end" }],
	["justify-self-center", { "justify-self": "center" }],
	["justify-self-stretch", { "justify-self": "stretch" }],
	["justify-self-baseline", { "justify-self": "baseline" }],
	["justify-self-center-safe", { "justify-self": "safe center" }],
	["justify-self-end-safe", { "justify-self": "safe flex-end" }],
	...makeGlobalStaticRules$1("justify-self")
];
var orders$1 = [
	[/^order-(.+)$/, ([, v]) => ({ order: h$1.bracket.cssvar.number(v) })],
	["order-first", { order: "-9999" }],
	["order-last", { order: "9999" }],
	["order-none", { order: "0" }]
];
var alignments$1 = [
	["content-center", { "align-content": "center" }],
	["content-start", { "align-content": "flex-start" }],
	["content-end", { "align-content": "flex-end" }],
	["content-between", { "align-content": "space-between" }],
	["content-around", { "align-content": "space-around" }],
	["content-evenly", { "align-content": "space-evenly" }],
	["content-baseline", { "align-content": "baseline" }],
	["content-center-safe", { "align-content": "safe center" }],
	["content-end-safe", { "align-content": "safe flex-end" }],
	["content-stretch", { "align-content": "stretch" }],
	["content-normal", { "align-content": "normal" }],
	...makeGlobalStaticRules$1("content", "align-content"),
	["items-start", { "align-items": "flex-start" }],
	["items-end", { "align-items": "flex-end" }],
	["items-center", { "align-items": "center" }],
	["items-baseline", { "align-items": "baseline" }],
	["items-stretch", { "align-items": "stretch" }],
	["items-baseline-last", { "align-items": "last baseline" }],
	["items-center-safe", { "align-items": "safe center" }],
	["items-end-safe", { "align-items": "safe flex-end" }],
	...makeGlobalStaticRules$1("items", "align-items"),
	["self-auto", { "align-self": "auto" }],
	["self-start", { "align-self": "flex-start" }],
	["self-end", { "align-self": "flex-end" }],
	["self-center", { "align-self": "center" }],
	["self-stretch", { "align-self": "stretch" }],
	["self-baseline", { "align-self": "baseline" }],
	["self-baseline-last", { "align-self": "last baseline" }],
	["self-center-safe", { "align-self": "safe center" }],
	["self-end-safe", { "align-self": "safe flex-end" }],
	...makeGlobalStaticRules$1("self", "align-self")
];
var placements$1 = [
	["place-content-center", { "place-content": "center" }],
	["place-content-start", { "place-content": "start" }],
	["place-content-end", { "place-content": "end" }],
	["place-content-between", { "place-content": "space-between" }],
	["place-content-around", { "place-content": "space-around" }],
	["place-content-evenly", { "place-content": "space-evenly" }],
	["place-content-stretch", { "place-content": "stretch" }],
	["place-content-baseline", { "place-content": "baseline" }],
	["place-content-center-safe", { "place-content": "safe center" }],
	["place-content-end-safe", { "place-content": "safe flex-end" }],
	...makeGlobalStaticRules$1("place-content"),
	["place-items-start", { "place-items": "start" }],
	["place-items-end", { "place-items": "end" }],
	["place-items-center", { "place-items": "center" }],
	["place-items-stretch", { "place-items": "stretch" }],
	["place-items-baseline", { "place-items": "baseline" }],
	["place-items-center-safe", { "place-items": "safe center" }],
	["place-items-end-safe", { "place-items": "safe flex-end" }],
	...makeGlobalStaticRules$1("place-items"),
	["place-self-auto", { "place-self": "auto" }],
	["place-self-start", { "place-self": "start" }],
	["place-self-end", { "place-self": "end" }],
	["place-self-center", { "place-self": "center" }],
	["place-self-stretch", { "place-self": "stretch" }],
	["place-self-center-safe", { "place-self": "safe center" }],
	["place-self-end-safe", { "place-self": "safe flex-end" }],
	...makeGlobalStaticRules$1("place-self")
];
/**
* This is to add `flex-` and `grid-` prefix to the alignment rules,
* supporting `flex="~ items-center"` in attributify mode.
*/
var flexGridJustifiesAlignments$1 = [
	...justifies$1,
	...alignments$1,
	...placements$1
].flatMap(([k, v]) => [[`flex-${k}`, v], [`grid-${k}`, v]]);
function handleInsetValue$1(v, { theme }) {
	return theme.spacing?.[v] ?? h$1.bracket.cssvar.global.auto.fraction.rem(v);
}
function handleInsetValues$1([, d, v], ctx) {
	const r = handleInsetValue$1(v, ctx);
	if (r != null && d in insetMap$1) return insetMap$1[d].map((i) => [i.slice(1), r]);
}
var insets$1 = [
	[
		/^(?:position-|pos-)?inset-(.+)$/,
		([, v], ctx) => ({ inset: handleInsetValue$1(v, ctx) }),
		{ autocomplete: [
			"(position|pos)-inset-<directions>-$spacing",
			"(position|pos)-inset-(block|inline)-$spacing",
			"(position|pos)-inset-(bs|be|is|ie)-$spacing",
			"(position|pos)-(top|left|right|bottom)-$spacing"
		] }
	],
	[/^(?:position-|pos-)?(start|end)-(.+)$/, handleInsetValues$1],
	[/^(?:position-|pos-)?inset-([xy])-(.+)$/, handleInsetValues$1],
	[/^(?:position-|pos-)?inset-([rltbse])-(.+)$/, handleInsetValues$1],
	[/^(?:position-|pos-)?inset-(block|inline)-(.+)$/, handleInsetValues$1],
	[/^(?:position-|pos-)?inset-([bi][se])-(.+)$/, handleInsetValues$1],
	[/^(?:position-|pos-)?(top|left|right|bottom)-(.+)$/, ([, d, v], ctx) => ({ [d]: handleInsetValue$1(v, ctx) })]
];
var floats$1 = [
	["float-left", { float: "left" }],
	["float-right", { float: "right" }],
	["float-start", { float: "inline-start" }],
	["float-end", { float: "inline-end" }],
	["float-none", { float: "none" }],
	...makeGlobalStaticRules$1("float"),
	["clear-left", { clear: "left" }],
	["clear-right", { clear: "right" }],
	["clear-both", { clear: "both" }],
	["clear-start", { clear: "inline-start" }],
	["clear-end", { clear: "inline-end" }],
	["clear-none", { clear: "none" }],
	...makeGlobalStaticRules$1("clear")
];
var zIndexes$1 = [[/^(?:position-|pos-)?z([\d.]+)$/, ([, v]) => ({ "z-index": h$1.number(v) })], [
	/^(?:position-|pos-)?z-(.+)$/,
	([, v], { theme }) => ({ "z-index": theme.zIndex?.[v] ?? h$1.bracket.cssvar.global.auto.number(v) }),
	{ autocomplete: "z-<num>" }
]];
var boxSizing$1 = [
	["box-border", { "box-sizing": "border-box" }],
	["box-content", { "box-sizing": "content-box" }],
	...makeGlobalStaticRules$1("box", "box-sizing")
];
/**
* Used for debugging, only available in development mode.
*
* @example `?` / `where`
*/
var questionMark$1 = [[/^(where|\?)$/, (_, { constructCSS, generator }) => {
	if (generator.userConfig.envMode === "dev") return `@keyframes __un_qm{0%{box-shadow:inset 4px 4px #ff1e90, inset -4px -4px #ff1e90}100%{box-shadow:inset 8px 8px #3399ff, inset -8px -8px #3399ff}} ${constructCSS({ animation: "__un_qm 0.5s ease-in-out alternate infinite" })}`;
}]];
var cursorValues$1 = [
	"auto",
	"default",
	"none",
	"context-menu",
	"help",
	"pointer",
	"progress",
	"wait",
	"cell",
	"crosshair",
	"text",
	"vertical-text",
	"alias",
	"copy",
	"move",
	"no-drop",
	"not-allowed",
	"grab",
	"grabbing",
	"all-scroll",
	"col-resize",
	"row-resize",
	"n-resize",
	"e-resize",
	"s-resize",
	"w-resize",
	"ne-resize",
	"nw-resize",
	"se-resize",
	"sw-resize",
	"ew-resize",
	"ns-resize",
	"nesw-resize",
	"nwse-resize",
	"zoom-in",
	"zoom-out"
];
var containValues$1 = [
	"none",
	"strict",
	"content",
	"size",
	"inline-size",
	"layout",
	"style",
	"paint"
];
var displays$1 = [
	["inline", { display: "inline" }],
	["block", { display: "block" }],
	["inline-block", { display: "inline-block" }],
	["contents", { display: "contents" }],
	["flow-root", { display: "flow-root" }],
	["list-item", { display: "list-item" }],
	["hidden", { display: "none" }],
	[/^display-(.+)$/, ([, c]) => ({ display: h$1.bracket.cssvar.global(c) })]
];
var appearances$1 = [
	["visible", { visibility: "visible" }],
	["invisible", { visibility: "hidden" }],
	["backface-visible", { "backface-visibility": "visible" }],
	["backface-hidden", { "backface-visibility": "hidden" }],
	...makeGlobalStaticRules$1("backface", "backface-visibility")
];
var cursors$1 = [[/^cursor-(.+)$/, ([, c]) => ({ cursor: h$1.bracket.cssvar.global(c) })], ...cursorValues$1.map((v) => [`cursor-${v}`, { cursor: v }])];
var contains$1 = [[/^contain-(.*)$/, ([, d]) => {
	if (h$1.bracket(d) != null) return { contain: h$1.bracket(d).split(" ").map((e) => h$1.cssvar.fraction(e) ?? e).join(" ") };
	return containValues$1.includes(d) ? { contain: d } : void 0;
}]];
var pointerEvents$1 = [
	["pointer-events-auto", { "pointer-events": "auto" }],
	["pointer-events-none", { "pointer-events": "none" }],
	...makeGlobalStaticRules$1("pointer-events")
];
var resizes$1 = [
	["resize-x", { resize: "horizontal" }],
	["resize-y", { resize: "vertical" }],
	["resize", { resize: "both" }],
	["resize-none", { resize: "none" }],
	...makeGlobalStaticRules$1("resize")
];
var userSelects$1 = [
	["select-auto", {
		"-webkit-user-select": "auto",
		"user-select": "auto"
	}],
	["select-all", {
		"-webkit-user-select": "all",
		"user-select": "all"
	}],
	["select-text", {
		"-webkit-user-select": "text",
		"user-select": "text"
	}],
	["select-none", {
		"-webkit-user-select": "none",
		"user-select": "none"
	}],
	...makeGlobalStaticRules$1("select", "user-select")
];
var whitespaces$1 = [[
	/^(?:whitespace-|ws-)([-\w]+)$/,
	([, v]) => [
		"normal",
		"nowrap",
		"pre",
		"pre-line",
		"pre-wrap",
		"break-spaces",
		...globalKeywords$1
	].includes(v) ? { "white-space": v } : void 0,
	{ autocomplete: "(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)" }
]];
var contentVisibility$1 = [
	[
		/^intrinsic(?:-(block|inline|w|h))?(?:-size)?-(.+)$/,
		([, d, s]) => {
			return { [`contain-intrinsic-${{
				block: "block-size",
				inline: "inline-size",
				w: "width",
				h: "height"
			}[d] ?? "size"}`]: h$1.bracket.cssvar.global.fraction.rem(s) };
		},
		{ autocomplete: [
			"intrinsic-size-<num>",
			"intrinsic-<num>",
			"intrinsic-(block|inline|w|h)-<num>"
		] }
	],
	["content-visibility-visible", { "content-visibility": "visible" }],
	["content-visibility-hidden", { "content-visibility": "hidden" }],
	["content-visibility-auto", { "content-visibility": "auto" }],
	...makeGlobalStaticRules$1("content-visibility")
];
var contents$1 = [
	[/^content-(.+)$/, ([, v]) => ({ content: h$1.bracket.cssvar(v) })],
	["content-empty", { content: "\"\"" }],
	["content-none", { content: "none" }]
];
var breaks$1 = [
	["break-normal", {
		"overflow-wrap": "normal",
		"word-break": "normal"
	}],
	["break-words", { "overflow-wrap": "break-word" }],
	["break-all", { "word-break": "break-all" }],
	["break-keep", { "word-break": "keep-all" }],
	["break-anywhere", { "overflow-wrap": "anywhere" }]
];
var textWraps$1 = [
	["text-wrap", { "text-wrap": "wrap" }],
	["text-nowrap", { "text-wrap": "nowrap" }],
	["text-balance", { "text-wrap": "balance" }],
	["text-pretty", { "text-wrap": "pretty" }]
];
var textOverflows$1 = [
	["truncate", {
		"overflow": "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	}],
	["text-truncate", {
		"overflow": "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	}],
	["text-ellipsis", { "text-overflow": "ellipsis" }],
	["text-clip", { "text-overflow": "clip" }]
];
var textTransforms$2 = [
	["case-upper", { "text-transform": "uppercase" }],
	["case-lower", { "text-transform": "lowercase" }],
	["case-capital", { "text-transform": "capitalize" }],
	["case-normal", { "text-transform": "none" }],
	...makeGlobalStaticRules$1("case", "text-transform")
];
var fontStyles$1 = [
	["italic", { "font-style": "italic" }],
	["not-italic", { "font-style": "normal" }],
	["font-italic", { "font-style": "italic" }],
	["font-not-italic", { "font-style": "normal" }],
	["oblique", { "font-style": "oblique" }],
	["not-oblique", { "font-style": "normal" }],
	["font-oblique", { "font-style": "oblique" }],
	["font-not-oblique", { "font-style": "normal" }]
];
var fontSmoothings$1 = [["antialiased", {
	"-webkit-font-smoothing": "antialiased",
	"-moz-osx-font-smoothing": "grayscale"
}], ["subpixel-antialiased", {
	"-webkit-font-smoothing": "auto",
	"-moz-osx-font-smoothing": "auto"
}]];
var fieldSizing$1 = [["field-sizing-fixed", { "field-sizing": "fixed" }], ["field-sizing-content", { "field-sizing": "content" }]];
var ringBase = {
	"--un-ring-inset": " ",
	"--un-ring-offset-width": "0px",
	"--un-ring-offset-color": "#fff",
	"--un-ring-width": "0px",
	"--un-ring-color": "rgb(147 197 253 / 0.5)",
	"--un-shadow": "0 0 rgb(0 0 0 / 0)"
};
var rings$1 = [
	[
		/^ring(?:-(.+))?$/,
		([, d], { theme }) => {
			const value = theme.ringWidth?.[d || "DEFAULT"] ?? h$1.px(d || "1");
			if (value) return {
				"--un-ring-width": value,
				"--un-ring-offset-shadow": "var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)",
				"--un-ring-shadow": "var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color)",
				"box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
			};
		},
		{
			custom: { preflightKeys: Object.keys(ringBase) },
			autocomplete: "ring-$ringWidth"
		}
	],
	[
		/^ring-(?:width-|size-)(.+)$/,
		handleWidth$1$1,
		{ autocomplete: "ring-(width|size)-$lineWidth" }
	],
	["ring-offset", { "--un-ring-offset-width": "1px" }],
	[
		/^ring-offset-(?:width-|size-)?(.+)$/,
		([, d], { theme }) => ({ "--un-ring-offset-width": theme.lineWidth?.[d] ?? h$1.bracket.cssvar.px(d) }),
		{ autocomplete: "ring-offset-(width|size)-$lineWidth" }
	],
	[
		/^ring-(.+)$/,
		handleColorOrWidth$1$1,
		{ autocomplete: "ring-$colors" }
	],
	[
		/^ring-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-ring-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "ring-(op|opacity)-<percent>" }
	],
	[
		/^ring-offset-(.+)$/,
		colorResolver$1("--un-ring-offset-color", "ring-offset", "borderColor"),
		{ autocomplete: "ring-offset-$colors" }
	],
	[
		/^ring-offset-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-ring-offset-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "ring-offset-(op|opacity)-<percent>" }
	],
	["ring-inset", { "--un-ring-inset": "inset" }]
];
function handleWidth$1$1([, b], { theme }) {
	return { "--un-ring-width": theme.ringWidth?.[b] ?? h$1.bracket.cssvar.px(b) };
}
function handleColorOrWidth$1$1(match, ctx) {
	if (isCSSMathFn$1(h$1.bracket(match[1]))) return handleWidth$1$1(match, ctx);
	return colorResolver$1("--un-ring-color", "ring", "borderColor")(match, ctx);
}
var boxShadowsBase = {
	"--un-ring-offset-shadow": "0 0 rgb(0 0 0 / 0)",
	"--un-ring-shadow": "0 0 rgb(0 0 0 / 0)",
	"--un-shadow-inset": " ",
	"--un-shadow": "0 0 rgb(0 0 0 / 0)"
};
var boxShadows$1 = [
	[
		/^shadow(?:-(.+))?$/,
		(match, context) => {
			const [, d] = match;
			const { theme } = context;
			const v = theme.boxShadow?.[d || "DEFAULT"];
			const c = d ? h$1.bracket.cssvar(d) : void 0;
			if ((v != null || c != null) && !hasParseableColor$1(c, theme, "shadowColor")) return {
				"--un-shadow": colorableShadows$1(v || c, "--un-shadow-color").join(","),
				"box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
			};
			return colorResolver$1("--un-shadow-color", "shadow", "shadowColor")(match, context);
		},
		{
			custom: { preflightKeys: Object.keys(boxShadowsBase) },
			autocomplete: ["shadow-$colors", "shadow-$boxShadow"]
		}
	],
	[
		/^shadow-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-shadow-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "shadow-(op|opacity)-<percent>" }
	],
	["shadow-inset", { "--un-shadow-inset": "inset" }]
];
var sizeMapping$1 = {
	h: "height",
	w: "width",
	inline: "inline-size",
	block: "block-size"
};
function getPropName$1(minmax, hw) {
	return `${minmax || ""}${sizeMapping$1[hw]}`;
}
function getSizeValue$1(minmax, hw, theme, prop) {
	const v = theme[getPropName$1(minmax, hw).replace(/-(\w)/g, (_, p) => p.toUpperCase())]?.[prop];
	if (v != null) return v;
	switch (prop) {
		case "fit":
		case "max":
		case "min": return `${prop}-content`;
		case "stretch": return "stretch";
	}
	return h$1.bracket.cssvar.global.auto.fraction.rem(prop);
}
var sizes$1 = [
	[/^size-(min-|max-)?(.+)$/, ([, m, s], { theme }) => ({
		[getPropName$1(m, "w")]: getSizeValue$1(m, "w", theme, s),
		[getPropName$1(m, "h")]: getSizeValue$1(m, "h", theme, s)
	})],
	[/^(?:size-)?(min-|max-)?([wh])-?(.+)$/, ([, m, w, s], { theme }) => ({ [getPropName$1(m, w)]: getSizeValue$1(m, w, theme, s) })],
	[
		/^(?:size-)?(min-|max-)?(block|inline)-(.+)$/,
		([, m, w, s], { theme }) => ({ [getPropName$1(m, w)]: getSizeValue$1(m, w, theme, s) }),
		{ autocomplete: [
			"(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
			"(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
			"(max|min)-(w|h|block|inline)",
			"(max|min)-(w|h|block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
			"(w|h)-full",
			"(max|min)-(w|h)-full"
		] }
	],
	[/^(?:size-)?(min-|max-)?(h)-screen-(.+)$/, ([, m, h$1, p], context) => ({ [getPropName$1(m, h$1)]: handleBreakpoint$1(context, p, "verticalBreakpoints") })],
	[
		/^(?:size-)?(min-|max-)?(w)-screen-(.+)$/,
		([, m, w, p], context) => ({ [getPropName$1(m, w)]: handleBreakpoint$1(context, p) }),
		{ autocomplete: [
			"(w|h)-screen",
			"(min|max)-(w|h)-screen",
			"h-screen-$verticalBreakpoints",
			"(min|max)-h-screen-$verticalBreakpoints",
			"w-screen-$breakpoints",
			"(min|max)-w-screen-$breakpoints"
		] }
	]
];
function handleBreakpoint$1(context, point, key = "breakpoints") {
	const bp = resolveBreakpoints$1(context, key);
	if (bp) return bp.find((i) => i.point === point)?.size;
}
function getAspectRatio$1(prop) {
	if (/^\d+\/\d+$/.test(prop)) return prop;
	switch (prop) {
		case "square": return "1/1";
		case "video": return "16/9";
	}
	return h$1.bracket.cssvar.global.auto.number(prop);
}
var aspectRatio$1 = [[
	/^(?:size-)?aspect-(?:ratio-)?(.+)$/,
	([, d]) => ({ "aspect-ratio": getAspectRatio$1(d) }),
	{ autocomplete: ["aspect-(square|video|ratio)", "aspect-ratio-(square|video)"] }
]];
var paddings$1 = [
	[
		/^pa?()-?(.+)$/,
		directionSize$1("padding"),
		{ autocomplete: ["(m|p)<num>", "(m|p)-<num>"] }
	],
	[
		/^p-?xy()()$/,
		directionSize$1("padding"),
		{ autocomplete: "(m|p)-(xy)" }
	],
	[/^p-?([xy])(?:-?(.+))?$/, directionSize$1("padding")],
	[
		/^p-?([rltbse])(?:-?(.+))?$/,
		directionSize$1("padding"),
		{ autocomplete: "(m|p)<directions>-<num>" }
	],
	[
		/^p-(block|inline)(?:-(.+))?$/,
		directionSize$1("padding"),
		{ autocomplete: "(m|p)-(block|inline)-<num>" }
	],
	[
		/^p-?([bi][se])(?:-?(.+))?$/,
		directionSize$1("padding"),
		{ autocomplete: "(m|p)-(bs|be|is|ie)-<num>" }
	]
];
var margins$1 = [
	[/^ma?()-?(.+)$/, directionSize$1("margin")],
	[/^m-?xy()()$/, directionSize$1("margin")],
	[/^m-?([xy])(?:-?(.+))?$/, directionSize$1("margin")],
	[/^m-?([rltbse])(?:-?(.+))?$/, directionSize$1("margin")],
	[/^m-(block|inline)(?:-(.+))?$/, directionSize$1("margin")],
	[/^m-?([bi][se])(?:-?(.+))?$/, directionSize$1("margin")]
];
var svgUtilities$1 = [
	[
		/^fill-(.+)$/,
		colorResolver$1("fill", "fill", "backgroundColor"),
		{ autocomplete: "fill-$colors" }
	],
	[
		/^fill-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-fill-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "fill-(op|opacity)-<percent>" }
	],
	["fill-none", { fill: "none" }],
	[
		/^stroke-(?:width-|size-)?(.+)$/,
		handleWidth$4,
		{ autocomplete: ["stroke-width-$lineWidth", "stroke-size-$lineWidth"] }
	],
	[
		/^stroke-dash-(.+)$/,
		([, s]) => ({ "stroke-dasharray": h$1.bracket.cssvar.number(s) }),
		{ autocomplete: "stroke-dash-<num>" }
	],
	[
		/^stroke-offset-(.+)$/,
		([, s], { theme }) => ({ "stroke-dashoffset": theme.lineWidth?.[s] ?? h$1.bracket.cssvar.px.numberWithUnit(s) }),
		{ autocomplete: "stroke-offset-$lineWidth" }
	],
	[
		/^stroke-(.+)$/,
		handleColorOrWidth$4,
		{ autocomplete: "stroke-$colors" }
	],
	[
		/^stroke-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-stroke-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "stroke-(op|opacity)-<percent>" }
	],
	["stroke-cap-square", { "stroke-linecap": "square" }],
	["stroke-cap-round", { "stroke-linecap": "round" }],
	["stroke-cap-auto", { "stroke-linecap": "butt" }],
	["stroke-join-arcs", { "stroke-linejoin": "arcs" }],
	["stroke-join-bevel", { "stroke-linejoin": "bevel" }],
	["stroke-join-clip", { "stroke-linejoin": "miter-clip" }],
	["stroke-join-round", { "stroke-linejoin": "round" }],
	["stroke-join-auto", { "stroke-linejoin": "miter" }],
	["stroke-none", { stroke: "none" }]
];
function handleWidth$4([, b], { theme }) {
	return { "stroke-width": theme.lineWidth?.[b] ?? h$1.bracket.cssvar.fraction.px.number(b) };
}
function handleColorOrWidth$4(match, ctx) {
	if (isCSSMathFn$1(h$1.bracket(match[1]))) return handleWidth$4(match, ctx);
	return colorResolver$1("stroke", "stroke", "borderColor")(match, ctx);
}
var transformValues$1 = [
	"translate",
	"rotate",
	"scale"
];
var transformCpu$1 = [
	"translateX(var(--un-translate-x))",
	"translateY(var(--un-translate-y))",
	"rotate(var(--un-rotate))",
	"rotateZ(var(--un-rotate-z))",
	"skewX(var(--un-skew-x))",
	"skewY(var(--un-skew-y))",
	"scaleX(var(--un-scale-x))",
	"scaleY(var(--un-scale-y))"
].join(" ");
var transform$1 = [
	"translateX(var(--un-translate-x))",
	"translateY(var(--un-translate-y))",
	"translateZ(var(--un-translate-z))",
	"rotate(var(--un-rotate))",
	"rotateX(var(--un-rotate-x))",
	"rotateY(var(--un-rotate-y))",
	"rotateZ(var(--un-rotate-z))",
	"skewX(var(--un-skew-x))",
	"skewY(var(--un-skew-y))",
	"scaleX(var(--un-scale-x))",
	"scaleY(var(--un-scale-y))",
	"scaleZ(var(--un-scale-z))"
].join(" ");
var transformGpu$1 = [
	"translate3d(var(--un-translate-x), var(--un-translate-y), var(--un-translate-z))",
	"rotate(var(--un-rotate))",
	"rotateX(var(--un-rotate-x))",
	"rotateY(var(--un-rotate-y))",
	"rotateZ(var(--un-rotate-z))",
	"skewX(var(--un-skew-x))",
	"skewY(var(--un-skew-y))",
	"scaleX(var(--un-scale-x))",
	"scaleY(var(--un-scale-y))",
	"scaleZ(var(--un-scale-z))"
].join(" ");
var transformBase = {
	"--un-rotate": 0,
	"--un-rotate-x": 0,
	"--un-rotate-y": 0,
	"--un-rotate-z": 0,
	"--un-scale-x": 1,
	"--un-scale-y": 1,
	"--un-scale-z": 1,
	"--un-skew-x": 0,
	"--un-skew-y": 0,
	"--un-translate-x": 0,
	"--un-translate-y": 0,
	"--un-translate-z": 0
};
var preflightKeys = Object.keys(transformBase);
var transforms$1 = [
	[
		/^(?:transform-)?origin-(.+)$/,
		([, s]) => ({ "transform-origin": positionMap$1[s] ?? h$1.bracket.cssvar(s) }),
		{ autocomplete: [`transform-origin-(${Object.keys(positionMap$1).join("|")})`, `origin-(${Object.keys(positionMap$1).join("|")})`] }
	],
	[/^(transform-)?perspect(?:ive)?-(.+)$/, ([, t, s]) => {
		const v = h$1.bracket.cssvar.px.numberWithUnit(s);
		if (v != null) {
			if (t) return {
				"--un-perspective": `perspective(${v})`,
				"transform": `var(--un-perspective) ${transform$1}`
			};
			return {
				"-webkit-perspective": v,
				"perspective": v
			};
		}
	}],
	[/^perspect(?:ive)?-origin-(.+)$/, ([, s]) => {
		const v = h$1.bracket.cssvar(s) ?? (s.length >= 3 ? positionMap$1[s] : void 0);
		if (v != null) return {
			"-webkit-perspective-origin": v,
			"perspective-origin": v
		};
	}],
	[
		/^(?:transform-)?translate-()(.+)$/,
		handleTranslate$1,
		{ custom: { preflightKeys } }
	],
	[
		/^(?:transform-)?translate-([xyz])-(.+)$/,
		handleTranslate$1,
		{ custom: { preflightKeys } }
	],
	[
		/^(?:transform-)?rotate-()(.+)$/,
		handleRotate$1,
		{ custom: { preflightKeys } }
	],
	[
		/^(?:transform-)?rotate-([xyz])-(.+)$/,
		handleRotate$1,
		{ custom: { preflightKeys } }
	],
	[
		/^(?:transform-)?skew-()(.+)$/,
		handleSkew$1,
		{ custom: { preflightKeys } }
	],
	[
		/^(?:transform-)?skew-([xy])-(.+)$/,
		handleSkew$1,
		{
			custom: { preflightKeys },
			autocomplete: ["transform-skew-(x|y)-<percent>", "skew-(x|y)-<percent>"]
		}
	],
	[
		/^(?:transform-)?scale-()(.+)$/,
		handleScale$1,
		{ custom: { preflightKeys } }
	],
	[
		/^(?:transform-)?scale-([xyz])-(.+)$/,
		handleScale$1,
		{
			custom: { preflightKeys },
			autocomplete: [
				`transform-(${transformValues$1.join("|")})-<percent>`,
				`transform-(${transformValues$1.join("|")})-(x|y|z)-<percent>`,
				`(${transformValues$1.join("|")})-<percent>`,
				`(${transformValues$1.join("|")})-(x|y|z)-<percent>`
			]
		}
	],
	[/^(?:transform-)?preserve-3d$/, () => ({ "transform-style": "preserve-3d" })],
	[/^(?:transform-)?preserve-flat$/, () => ({ "transform-style": "flat" })],
	[
		"transform",
		{ transform: transform$1 },
		{ custom: { preflightKeys } }
	],
	[
		"transform-cpu",
		{ transform: transformCpu$1 },
		{ custom: { preflightKeys: [
			"--un-translate-x",
			"--un-translate-y",
			"--un-rotate",
			"--un-rotate-z",
			"--un-skew-x",
			"--un-skew-y",
			"--un-scale-x",
			"--un-scale-y"
		] } }
	],
	[
		"transform-gpu",
		{ transform: transformGpu$1 },
		{ custom: { preflightKeys } }
	],
	["transform-none", { transform: "none" }],
	...makeGlobalStaticRules$1("transform")
];
function handleTranslate$1([, d, b], { theme }) {
	const v = theme.spacing?.[b] ?? h$1.bracket.cssvar.fraction.rem(b);
	if (v != null) return [...transformXYZ$1(d, v, "translate"), ["transform", transform$1]];
}
function handleScale$1([, d, b]) {
	const v = h$1.bracket.cssvar.fraction.percent(b);
	if (v != null) return [...transformXYZ$1(d, v, "scale"), ["transform", transform$1]];
}
function handleRotate$1([, d = "", b]) {
	const v = h$1.bracket.cssvar.degree(b);
	if (v != null) if (d) return {
		"--un-rotate": 0,
		[`--un-rotate-${d}`]: v,
		"transform": transform$1
	};
	else return {
		"--un-rotate-x": 0,
		"--un-rotate-y": 0,
		"--un-rotate-z": 0,
		"--un-rotate": v,
		"transform": transform$1
	};
}
function handleSkew$1([, d, b]) {
	const v = h$1.bracket.cssvar.degree(b);
	if (v != null) return [...transformXYZ$1(d, v, "skew"), ["transform", transform$1]];
}
function resolveTransitionProperty$1(prop, theme) {
	let p;
	if (h$1.cssvar(prop) != null) p = h$1.cssvar(prop);
	else {
		if (prop.startsWith("[") && prop.endsWith("]")) prop = prop.slice(1, -1);
		const props = prop.split(",").map((p$1) => theme.transitionProperty?.[p$1] ?? h$1.properties(p$1));
		if (props.every(Boolean)) p = props.join(",");
	}
	return p;
}
var transitions$1 = [
	[
		/^transition(?:-(\D+?))?(?:-(\d+))?$/,
		([, prop, d], { theme }) => {
			if (!prop && !d) return {
				"transition-property": theme.transitionProperty?.DEFAULT,
				"transition-timing-function": theme.easing?.DEFAULT,
				"transition-duration": theme.duration?.DEFAULT ?? h$1.time("150")
			};
			else if (prop != null) {
				const p = resolveTransitionProperty$1(prop, theme);
				const duration = theme.duration?.[d || "DEFAULT"] ?? h$1.time(d || "150");
				if (p) return {
					"transition-property": p,
					"transition-timing-function": theme.easing?.DEFAULT,
					"transition-duration": duration
				};
			} else if (d != null) return {
				"transition-property": theme.transitionProperty?.DEFAULT,
				"transition-timing-function": theme.easing?.DEFAULT,
				"transition-duration": theme.duration?.[d] ?? h$1.time(d)
			};
		},
		{ autocomplete: "transition-$transitionProperty-$duration" }
	],
	[
		/^(?:transition-)?duration-(.+)$/,
		([, d], { theme }) => ({ "transition-duration": theme.duration?.[d || "DEFAULT"] ?? h$1.bracket.cssvar.time(d) }),
		{ autocomplete: ["transition-duration-$duration", "duration-$duration"] }
	],
	[
		/^(?:transition-)?delay-(.+)$/,
		([, d], { theme }) => ({ "transition-delay": theme.duration?.[d || "DEFAULT"] ?? h$1.bracket.cssvar.time(d) }),
		{ autocomplete: ["transition-delay-$duration", "delay-$duration"] }
	],
	[
		/^(?:transition-)?ease(?:-(.+))?$/,
		([, d], { theme }) => ({ "transition-timing-function": theme.easing?.[d || "DEFAULT"] ?? h$1.bracket.cssvar(d) }),
		{ autocomplete: ["transition-ease-(linear|in|out|in-out|DEFAULT)", "ease-(linear|in|out|in-out|DEFAULT)"] }
	],
	[
		/^(?:transition-)?property-(.+)$/,
		([, v], { theme }) => {
			const p = h$1.global(v) || resolveTransitionProperty$1(v, theme);
			if (p) return { "transition-property": p };
		},
		{ autocomplete: [
			`transition-property-(${[...globalKeywords$1].join("|")})`,
			"transition-property-$transitionProperty",
			"property-$transitionProperty"
		] }
	],
	["transition-none", { transition: "none" }],
	...makeGlobalStaticRules$1("transition"),
	["transition-discrete", { "transition-behavior": "allow-discrete" }],
	["transition-normal", { "transition-behavior": "normal" }]
];
var fonts$1 = [
	[
		/^text-(.+)$/,
		handleText$1,
		{ autocomplete: "text-$fontSize" }
	],
	[
		/^(?:text|font)-size-(.+)$/,
		handleSize$2,
		{ autocomplete: "text-size-$fontSize" }
	],
	[
		/^text-(?:color-)?(.+)$/,
		handlerColorOrSize$1,
		{ autocomplete: "text-$colors" }
	],
	[
		/^(?:color|c)-(.+)$/,
		colorResolver$1("color", "text", "textColor"),
		{ autocomplete: "(color|c)-$colors" }
	],
	[
		/^(?:text|color|c)-(.+)$/,
		([, v]) => globalKeywords$1.includes(v) ? { color: v } : void 0,
		{ autocomplete: `(text|color|c)-(${globalKeywords$1.join("|")})` }
	],
	[
		/^(?:text|color|c)-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-text-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "(text|color|c)-(op|opacity)-<percent>" }
	],
	[
		/^(?:font|fw)-?([^-]+)$/,
		([, s], { theme }) => ({ "font-weight": theme.fontWeight?.[s] || h$1.bracket.global.number(s) }),
		{ autocomplete: ["(font|fw)-(100|200|300|400|500|600|700|800|900)", "(font|fw)-$fontWeight"] }
	],
	[
		/^(?:font-)?(?:leading|lh|line-height)-(.+)$/,
		([, s], { theme }) => ({ "line-height": handleThemeByKey(s, theme, "lineHeight") }),
		{ autocomplete: "(leading|lh|line-height)-$lineHeight" }
	],
	["font-synthesis-weight", { "font-synthesis": "weight" }],
	["font-synthesis-style", { "font-synthesis": "style" }],
	["font-synthesis-small-caps", { "font-synthesis": "small-caps" }],
	["font-synthesis-none", { "font-synthesis": "none" }],
	[/^font-synthesis-(.+)$/, ([, s]) => ({ "font-synthesis": h$1.bracket.cssvar.global(s) })],
	[
		/^(?:font-)?tracking-(.+)$/,
		([, s], { theme }) => ({ "letter-spacing": theme.letterSpacing?.[s] || h$1.bracket.cssvar.global.rem(s) }),
		{ autocomplete: "tracking-$letterSpacing" }
	],
	[
		/^(?:font-)?word-spacing-(.+)$/,
		([, s], { theme }) => ({ "word-spacing": theme.wordSpacing?.[s] || h$1.bracket.cssvar.global.rem(s) }),
		{ autocomplete: "word-spacing-$wordSpacing" }
	],
	["font-stretch-normal", { "font-stretch": "normal" }],
	["font-stretch-ultra-condensed", { "font-stretch": "ultra-condensed" }],
	["font-stretch-extra-condensed", { "font-stretch": "extra-condensed" }],
	["font-stretch-condensed", { "font-stretch": "condensed" }],
	["font-stretch-semi-condensed", { "font-stretch": "semi-condensed" }],
	["font-stretch-semi-expanded", { "font-stretch": "semi-expanded" }],
	["font-stretch-expanded", { "font-stretch": "expanded" }],
	["font-stretch-extra-expanded", { "font-stretch": "extra-expanded" }],
	["font-stretch-ultra-expanded", { "font-stretch": "ultra-expanded" }],
	[
		/^font-stretch-(.+)$/,
		([, s]) => ({ "font-stretch": h$1.bracket.cssvar.fraction.global(s) }),
		{ autocomplete: "font-stretch-<percentage>" }
	],
	[
		/^font-(.+)$/,
		([, d], { theme }) => ({ "font-family": theme.fontFamily?.[d] || h$1.bracket.cssvar.global(d) }),
		{ autocomplete: "font-$fontFamily" }
	]
];
var tabSizes$1 = [[/^tab(?:-(.+))?$/, ([, s]) => {
	const v = h$1.bracket.cssvar.global.number(s || "4");
	if (v != null) return {
		"-moz-tab-size": v,
		"-o-tab-size": v,
		"tab-size": v
	};
}]];
var textIndents$1 = [[
	/^indent(?:-(.+))?$/,
	([, s], { theme }) => ({ "text-indent": theme.textIndent?.[s || "DEFAULT"] || h$1.bracket.cssvar.global.fraction.rem(s) }),
	{ autocomplete: "indent-$textIndent" }
]];
var textStrokes$1 = [
	[
		/^text-stroke(?:-(.+))?$/,
		([, s], { theme }) => ({ "-webkit-text-stroke-width": theme.textStrokeWidth?.[s || "DEFAULT"] || h$1.bracket.cssvar.px(s) }),
		{ autocomplete: "text-stroke-$textStrokeWidth" }
	],
	[
		/^text-stroke-(.+)$/,
		colorResolver$1("-webkit-text-stroke-color", "text-stroke", "borderColor"),
		{ autocomplete: "text-stroke-$colors" }
	],
	[
		/^text-stroke-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-text-stroke-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "text-stroke-(op|opacity)-<percent>" }
	]
];
var textShadows$1 = [
	[
		/^text-shadow(?:-(.+))?$/,
		([, s], { theme }) => {
			const v = theme.textShadow?.[s || "DEFAULT"];
			if (v != null) return {
				"--un-text-shadow": colorableShadows$1(v, "--un-text-shadow-color").join(","),
				"text-shadow": "var(--un-text-shadow)"
			};
			return { "text-shadow": h$1.bracket.cssvar.global(s) };
		},
		{ autocomplete: "text-shadow-$textShadow" }
	],
	[
		/^text-shadow-color-(.+)$/,
		colorResolver$1("--un-text-shadow-color", "text-shadow", "shadowColor"),
		{ autocomplete: "text-shadow-color-$colors" }
	],
	[
		/^text-shadow-color-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-text-shadow-opacity": h$1.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "text-shadow-color-(op|opacity)-<percent>" }
	]
];
function handleThemeByKey(s, theme, key) {
	return theme[key]?.[s] || h$1.bracket.cssvar.global.rem(s);
}
function handleSize$2([, s], { theme }) {
	const size = toArray(theme.fontSize?.[s])?.[0] ?? h$1.bracket.cssvar.global.rem(s);
	if (size != null) return { "font-size": size };
}
function handlerColorOrSize$1(match, ctx) {
	if (isCSSMathFn$1(h$1.bracket(match[1]))) return handleSize$2(match, ctx);
	return colorResolver$1("color", "text", "textColor")(match, ctx);
}
function handleText$1([, s = "base"], { theme }) {
	const split = splitShorthand$1(s, "length");
	if (!split) return;
	const [size, leading] = split;
	const sizePairs = toArray(theme.fontSize?.[size]);
	const lineHeight = leading ? handleThemeByKey(leading, theme, "lineHeight") : void 0;
	if (sizePairs?.[0]) {
		const [fontSize$1, height, letterSpacing] = sizePairs;
		if (typeof height === "object") return {
			"font-size": fontSize$1,
			...height
		};
		return {
			"font-size": fontSize$1,
			"line-height": lineHeight ?? height ?? "1",
			"letter-spacing": letterSpacing ? handleThemeByKey(letterSpacing, theme, "letterSpacing") : void 0
		};
	}
	const fontSize = h$1.bracketOfLength.rem(size);
	if (lineHeight && fontSize) return {
		"font-size": fontSize,
		"line-height": lineHeight
	};
	return { "font-size": h$1.bracketOfLength.rem(s) };
}
var variablesAbbrMap$2 = {
	backface: "backface-visibility",
	break: "word-break",
	case: "text-transform",
	content: "align-content",
	fw: "font-weight",
	items: "align-items",
	justify: "justify-content",
	select: "user-select",
	self: "align-self",
	vertical: "vertical-align",
	visible: "visibility",
	whitespace: "white-space",
	ws: "white-space"
};
var cssVariables$2 = [[/^(.+?)-(\$.+)$/, ([, name, varname]) => {
	const prop = variablesAbbrMap$2[name];
	if (prop) return { [prop]: h$1.cssvar(varname) };
}]];
var cssProperty$1 = [[/^\[(.*)\]$/, ([_, body]) => {
	if (!body.includes(":")) return;
	const [prop, ...rest] = body.split(":");
	const value = rest.join(":");
	if (!isURI$1(body) && /^[\w-]+$/.test(prop) && isValidCSSBody$1(value)) {
		const parsed = h$1.bracket(`[${value}]`);
		if (parsed) return { [prop]: parsed };
	}
}]];
function isValidCSSBody$1(body) {
	let i = 0;
	function findUntil(c) {
		while (i < body.length) {
			i += 1;
			if (body[i] === c) return true;
		}
		return false;
	}
	for (i = 0; i < body.length; i++) {
		const c = body[i];
		if ("\"`'".includes(c)) {
			if (!findUntil(c)) return false;
		} else if (c === "(") {
			if (!findUntil(")")) return false;
		} else if ("[]{}:".includes(c)) return false;
	}
	return true;
}
function isURI$1(declaration) {
	if (!declaration.includes("://")) return false;
	try {
		return new URL(declaration).host !== "";
	} catch {
		return false;
	}
}
var rules$2 = [
	cssVariables$2,
	cssProperty$1,
	contains$1,
	pointerEvents$1,
	appearances$1,
	positions$1,
	insets$1,
	zIndexes$1,
	orders$1,
	grids$1,
	floats$1,
	margins$1,
	boxSizing$1,
	displays$1,
	aspectRatio$1,
	sizes$1,
	flex$2,
	transforms$1,
	cursors$1,
	userSelects$1,
	resizes$1,
	appearance$1,
	placements$1,
	alignments$1,
	justifies$1,
	gaps$1,
	flexGridJustifiesAlignments$1,
	overflows$1,
	textOverflows$1,
	whitespaces$1,
	breaks$1,
	borders$1,
	bgColors$1,
	colorScheme$1,
	svgUtilities$1,
	paddings$1,
	textAligns$1,
	textIndents$1,
	textWraps$1,
	verticalAligns$1,
	fonts$1,
	textTransforms$2,
	fontStyles$1,
	textDecorations$1,
	fontSmoothings$1,
	tabSizes$1,
	textStrokes$1,
	textShadows$1,
	opacity$2,
	boxShadows$1,
	outline$1,
	rings$1,
	transitions$1,
	willChange$1,
	contentVisibility$1,
	contents$1,
	containerParent$1,
	fieldSizing$1,
	questionMark$1
].flat(1);
//#endregion
//#region node_modules/@unocss/preset-mini/dist/colors-Cxq9P2g9.mjs
var colors$1 = {
	inherit: "inherit",
	current: "currentColor",
	transparent: "transparent",
	black: "#000",
	white: "#fff",
	rose: {
		50: "#fff1f2",
		100: "#ffe4e6",
		200: "#fecdd3",
		300: "#fda4af",
		400: "#fb7185",
		500: "#f43f5e",
		600: "#e11d48",
		700: "#be123c",
		800: "#9f1239",
		900: "#881337",
		950: "#4c0519"
	},
	pink: {
		50: "#fdf2f8",
		100: "#fce7f3",
		200: "#fbcfe8",
		300: "#f9a8d4",
		400: "#f472b6",
		500: "#ec4899",
		600: "#db2777",
		700: "#be185d",
		800: "#9d174d",
		900: "#831843",
		950: "#500724"
	},
	fuchsia: {
		50: "#fdf4ff",
		100: "#fae8ff",
		200: "#f5d0fe",
		300: "#f0abfc",
		400: "#e879f9",
		500: "#d946ef",
		600: "#c026d3",
		700: "#a21caf",
		800: "#86198f",
		900: "#701a75",
		950: "#4a044e"
	},
	purple: {
		50: "#faf5ff",
		100: "#f3e8ff",
		200: "#e9d5ff",
		300: "#d8b4fe",
		400: "#c084fc",
		500: "#a855f7",
		600: "#9333ea",
		700: "#7e22ce",
		800: "#6b21a8",
		900: "#581c87",
		950: "#3b0764"
	},
	violet: {
		50: "#f5f3ff",
		100: "#ede9fe",
		200: "#ddd6fe",
		300: "#c4b5fd",
		400: "#a78bfa",
		500: "#8b5cf6",
		600: "#7c3aed",
		700: "#6d28d9",
		800: "#5b21b6",
		900: "#4c1d95",
		950: "#2e1065"
	},
	indigo: {
		50: "#eef2ff",
		100: "#e0e7ff",
		200: "#c7d2fe",
		300: "#a5b4fc",
		400: "#818cf8",
		500: "#6366f1",
		600: "#4f46e5",
		700: "#4338ca",
		800: "#3730a3",
		900: "#312e81",
		950: "#1e1b4b"
	},
	blue: {
		50: "#eff6ff",
		100: "#dbeafe",
		200: "#bfdbfe",
		300: "#93c5fd",
		400: "#60a5fa",
		500: "#3b82f6",
		600: "#2563eb",
		700: "#1d4ed8",
		800: "#1e40af",
		900: "#1e3a8a",
		950: "#172554"
	},
	sky: {
		50: "#f0f9ff",
		100: "#e0f2fe",
		200: "#bae6fd",
		300: "#7dd3fc",
		400: "#38bdf8",
		500: "#0ea5e9",
		600: "#0284c7",
		700: "#0369a1",
		800: "#075985",
		900: "#0c4a6e",
		950: "#082f49"
	},
	cyan: {
		50: "#ecfeff",
		100: "#cffafe",
		200: "#a5f3fc",
		300: "#67e8f9",
		400: "#22d3ee",
		500: "#06b6d4",
		600: "#0891b2",
		700: "#0e7490",
		800: "#155e75",
		900: "#164e63",
		950: "#083344"
	},
	teal: {
		50: "#f0fdfa",
		100: "#ccfbf1",
		200: "#99f6e4",
		300: "#5eead4",
		400: "#2dd4bf",
		500: "#14b8a6",
		600: "#0d9488",
		700: "#0f766e",
		800: "#115e59",
		900: "#134e4a",
		950: "#042f2e"
	},
	emerald: {
		50: "#ecfdf5",
		100: "#d1fae5",
		200: "#a7f3d0",
		300: "#6ee7b7",
		400: "#34d399",
		500: "#10b981",
		600: "#059669",
		700: "#047857",
		800: "#065f46",
		900: "#064e3b",
		950: "#022c22"
	},
	green: {
		50: "#f0fdf4",
		100: "#dcfce7",
		200: "#bbf7d0",
		300: "#86efac",
		400: "#4ade80",
		500: "#22c55e",
		600: "#16a34a",
		700: "#15803d",
		800: "#166534",
		900: "#14532d",
		950: "#052e16"
	},
	lime: {
		50: "#f7fee7",
		100: "#ecfccb",
		200: "#d9f99d",
		300: "#bef264",
		400: "#a3e635",
		500: "#84cc16",
		600: "#65a30d",
		700: "#4d7c0f",
		800: "#3f6212",
		900: "#365314",
		950: "#1a2e05"
	},
	yellow: {
		50: "#fefce8",
		100: "#fef9c3",
		200: "#fef08a",
		300: "#fde047",
		400: "#facc15",
		500: "#eab308",
		600: "#ca8a04",
		700: "#a16207",
		800: "#854d0e",
		900: "#713f12",
		950: "#422006"
	},
	amber: {
		50: "#fffbeb",
		100: "#fef3c7",
		200: "#fde68a",
		300: "#fcd34d",
		400: "#fbbf24",
		500: "#f59e0b",
		600: "#d97706",
		700: "#b45309",
		800: "#92400e",
		900: "#78350f",
		950: "#451a03"
	},
	orange: {
		50: "#fff7ed",
		100: "#ffedd5",
		200: "#fed7aa",
		300: "#fdba74",
		400: "#fb923c",
		500: "#f97316",
		600: "#ea580c",
		700: "#c2410c",
		800: "#9a3412",
		900: "#7c2d12",
		950: "#431407"
	},
	red: {
		50: "#fef2f2",
		100: "#fee2e2",
		200: "#fecaca",
		300: "#fca5a5",
		400: "#f87171",
		500: "#ef4444",
		600: "#dc2626",
		700: "#b91c1c",
		800: "#991b1b",
		900: "#7f1d1d",
		950: "#450a0a"
	},
	gray: {
		50: "#f9fafb",
		100: "#f3f4f6",
		200: "#e5e7eb",
		300: "#d1d5db",
		400: "#9ca3af",
		500: "#6b7280",
		600: "#4b5563",
		700: "#374151",
		800: "#1f2937",
		900: "#111827",
		950: "#030712"
	},
	slate: {
		50: "#f8fafc",
		100: "#f1f5f9",
		200: "#e2e8f0",
		300: "#cbd5e1",
		400: "#94a3b8",
		500: "#64748b",
		600: "#475569",
		700: "#334155",
		800: "#1e293b",
		900: "#0f172a",
		950: "#020617"
	},
	zinc: {
		50: "#fafafa",
		100: "#f4f4f5",
		200: "#e4e4e7",
		300: "#d4d4d8",
		400: "#a1a1aa",
		500: "#71717a",
		600: "#52525b",
		700: "#3f3f46",
		800: "#27272a",
		900: "#18181b",
		950: "#09090b"
	},
	neutral: {
		50: "#fafafa",
		100: "#f5f5f5",
		200: "#e5e5e5",
		300: "#d4d4d4",
		400: "#a3a3a3",
		500: "#737373",
		600: "#525252",
		700: "#404040",
		800: "#262626",
		900: "#171717",
		950: "#0a0a0a"
	},
	stone: {
		50: "#fafaf9",
		100: "#f5f5f4",
		200: "#e7e5e4",
		300: "#d6d3d1",
		400: "#a8a29e",
		500: "#78716c",
		600: "#57534e",
		700: "#44403c",
		800: "#292524",
		900: "#1c1917",
		950: "#0c0a09"
	},
	light: {
		50: "#fdfdfd",
		100: "#fcfcfc",
		200: "#fafafa",
		300: "#f8f9fa",
		400: "#f6f6f6",
		500: "#f2f2f2",
		600: "#f1f3f5",
		700: "#e9ecef",
		800: "#dee2e6",
		900: "#dde1e3",
		950: "#d8dcdf"
	},
	dark: {
		50: "#4a4a4a",
		100: "#3c3c3c",
		200: "#323232",
		300: "#2d2d2d",
		400: "#222222",
		500: "#1f1f1f",
		600: "#1c1c1e",
		700: "#1b1b1b",
		800: "#181818",
		900: "#0f0f0f",
		950: "#080808"
	},
	get lightblue() {
		return this.sky;
	},
	get lightBlue() {
		return this.sky;
	},
	get warmgray() {
		return this.stone;
	},
	get warmGray() {
		return this.stone;
	},
	get truegray() {
		return this.neutral;
	},
	get trueGray() {
		return this.neutral;
	},
	get coolgray() {
		return this.gray;
	},
	get coolGray() {
		return this.gray;
	},
	get bluegray() {
		return this.slate;
	},
	get blueGray() {
		return this.slate;
	}
};
Object.values(colors$1).forEach((color) => {
	if (typeof color !== "string" && color !== void 0) {
		color.DEFAULT = color.DEFAULT || color[400];
		Object.keys(color).forEach((key) => {
			const short = +key / 100;
			if (short === Math.round(short)) color[short] = color[key];
		});
	}
});
//#endregion
//#region node_modules/@unocss/preset-mini/dist/theme-B0WWWQYh.mjs
var blur$1 = {
	"DEFAULT": "8px",
	"0": "0",
	"sm": "4px",
	"md": "12px",
	"lg": "16px",
	"xl": "24px",
	"2xl": "40px",
	"3xl": "64px"
};
var dropShadow$1 = {
	"DEFAULT": ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
	"sm": "0 1px 1px rgb(0 0 0 / 0.05)",
	"md": ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
	"lg": ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
	"xl": ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
	"2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
	"none": "0 0 rgb(0 0 0 / 0)"
};
var fontFamily = {
	sans: [
		"ui-sans-serif",
		"system-ui",
		"-apple-system",
		"BlinkMacSystemFont",
		"\"Segoe UI\"",
		"Roboto",
		"\"Helvetica Neue\"",
		"Arial",
		"\"Noto Sans\"",
		"sans-serif",
		"\"Apple Color Emoji\"",
		"\"Segoe UI Emoji\"",
		"\"Segoe UI Symbol\"",
		"\"Noto Color Emoji\""
	].join(","),
	serif: [
		"ui-serif",
		"Georgia",
		"Cambria",
		"\"Times New Roman\"",
		"Times",
		"serif"
	].join(","),
	mono: [
		"ui-monospace",
		"SFMono-Regular",
		"Menlo",
		"Monaco",
		"Consolas",
		"\"Liberation Mono\"",
		"\"Courier New\"",
		"monospace"
	].join(",")
};
var fontSize = {
	"xs": ["0.75rem", "1rem"],
	"sm": ["0.875rem", "1.25rem"],
	"base": ["1rem", "1.5rem"],
	"lg": ["1.125rem", "1.75rem"],
	"xl": ["1.25rem", "1.75rem"],
	"2xl": ["1.5rem", "2rem"],
	"3xl": ["1.875rem", "2.25rem"],
	"4xl": ["2.25rem", "2.5rem"],
	"5xl": ["3rem", "1"],
	"6xl": ["3.75rem", "1"],
	"7xl": ["4.5rem", "1"],
	"8xl": ["6rem", "1"],
	"9xl": ["8rem", "1"]
};
var textIndent = {
	"DEFAULT": "1.5rem",
	"xs": "0.5rem",
	"sm": "1rem",
	"md": "1.5rem",
	"lg": "2rem",
	"xl": "2.5rem",
	"2xl": "3rem",
	"3xl": "4rem"
};
var textStrokeWidth$1 = {
	DEFAULT: "1.5rem",
	none: "0",
	sm: "thin",
	md: "medium",
	lg: "thick"
};
var textShadow$1 = {
	DEFAULT: ["0 0 1px rgb(0 0 0 / 0.2)", "0 0 1px rgb(1 0 5 / 0.1)"],
	none: "0 0 rgb(0 0 0 / 0)",
	sm: "1px 1px 3px rgb(36 37 47 / 0.25)",
	md: ["0 1px 2px rgb(30 29 39 / 0.19)", "1px 2px 4px rgb(54 64 147 / 0.18)"],
	lg: ["3px 3px 6px rgb(0 0 0 / 0.26)", "0 0 5px rgb(15 3 86 / 0.22)"],
	xl: ["1px 1px 3px rgb(0 0 0 / 0.29)", "2px 4px 7px rgb(73 64 125 / 0.35)"]
};
var lineHeight = {
	none: "1",
	tight: "1.25",
	snug: "1.375",
	normal: "1.5",
	relaxed: "1.625",
	loose: "2"
};
var letterSpacing = {
	tighter: "-0.05em",
	tight: "-0.025em",
	normal: "0em",
	wide: "0.025em",
	wider: "0.05em",
	widest: "0.1em"
};
var fontWeight$1 = {
	thin: "100",
	extralight: "200",
	light: "300",
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	extrabold: "800",
	black: "900"
};
var wordSpacing = letterSpacing;
var breakpoints = {
	"sm": "640px",
	"md": "768px",
	"lg": "1024px",
	"xl": "1280px",
	"2xl": "1536px"
};
var verticalBreakpoints = { ...breakpoints };
var lineWidth = {
	DEFAULT: "1px",
	none: "0"
};
var spacing$1 = {
	"DEFAULT": "1rem",
	"none": "0",
	"xs": "0.75rem",
	"sm": "0.875rem",
	"lg": "1.125rem",
	"xl": "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
	"5xl": "3rem",
	"6xl": "3.75rem",
	"7xl": "4.5rem",
	"8xl": "6rem",
	"9xl": "8rem"
};
var duration = {
	DEFAULT: "150ms",
	none: "0s",
	75: "75ms",
	100: "100ms",
	150: "150ms",
	200: "200ms",
	300: "300ms",
	500: "500ms",
	700: "700ms",
	1e3: "1000ms"
};
var borderRadius = {
	"DEFAULT": "0.25rem",
	"none": "0",
	"sm": "0.125rem",
	"md": "0.375rem",
	"lg": "0.5rem",
	"xl": "0.75rem",
	"2xl": "1rem",
	"3xl": "1.5rem",
	"full": "9999px"
};
var boxShadow = {
	"DEFAULT": ["var(--un-shadow-inset) 0 1px 3px 0 rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 1px 2px -1px rgb(0 0 0 / 0.1)"],
	"none": "0 0 rgb(0 0 0 / 0)",
	"sm": "var(--un-shadow-inset) 0 1px 2px 0 rgb(0 0 0 / 0.05)",
	"md": ["var(--un-shadow-inset) 0 4px 6px -1px rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 2px 4px -2px rgb(0 0 0 / 0.1)"],
	"lg": ["var(--un-shadow-inset) 0 10px 15px -3px rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 4px 6px -4px rgb(0 0 0 / 0.1)"],
	"xl": ["var(--un-shadow-inset) 0 20px 25px -5px rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 8px 10px -6px rgb(0 0 0 / 0.1)"],
	"2xl": "var(--un-shadow-inset) 0 25px 50px -12px rgb(0 0 0 / 0.25)",
	"inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
};
var ringWidth = {
	DEFAULT: "3px",
	none: "0"
};
var zIndex = { auto: "auto" };
var media$1 = { mouse: "(hover) and (pointer: fine)" };
var preflightBase = {
	...transformBase,
	...boxShadowsBase,
	...ringBase
};
var baseSize = {
	"xs": "20rem",
	"sm": "24rem",
	"md": "28rem",
	"lg": "32rem",
	"xl": "36rem",
	"2xl": "42rem",
	"3xl": "48rem",
	"4xl": "56rem",
	"5xl": "64rem",
	"6xl": "72rem",
	"7xl": "80rem",
	"prose": "65ch"
};
var width = {
	auto: "auto",
	...baseSize,
	screen: "100vw"
};
var maxWidth = {
	none: "none",
	...baseSize,
	screen: "100vw"
};
var blockSize = {
	auto: "auto",
	...baseSize,
	screen: "100vb"
};
var inlineSize = {
	auto: "auto",
	...baseSize,
	screen: "100vi"
};
var height = {
	auto: "auto",
	...baseSize,
	screen: "100vh"
};
var maxHeight = {
	none: "none",
	...baseSize,
	screen: "100vh"
};
var maxBlockSize = {
	none: "none",
	...baseSize,
	screen: "100vb"
};
var maxInlineSize = {
	none: "none",
	...baseSize,
	screen: "100vi"
};
var containers = { ...baseSize };
var theme$3 = {
	width,
	height,
	maxWidth,
	maxHeight,
	minWidth: maxWidth,
	minHeight: maxHeight,
	inlineSize,
	blockSize,
	maxInlineSize,
	maxBlockSize,
	minInlineSize: maxInlineSize,
	minBlockSize: maxBlockSize,
	colors: colors$1,
	fontFamily,
	fontSize,
	fontWeight: fontWeight$1,
	breakpoints,
	verticalBreakpoints,
	borderRadius,
	lineHeight,
	letterSpacing,
	wordSpacing,
	boxShadow,
	textIndent,
	textShadow: textShadow$1,
	textStrokeWidth: textStrokeWidth$1,
	blur: blur$1,
	dropShadow: dropShadow$1,
	easing: {
		"DEFAULT": "cubic-bezier(0.4, 0, 0.2, 1)",
		"linear": "linear",
		"in": "cubic-bezier(0.4, 0, 1, 1)",
		"out": "cubic-bezier(0, 0, 0.2, 1)",
		"in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
	},
	transitionProperty: {
		none: "none",
		all: "all",
		colors: [
			"color",
			"background-color",
			"border-color",
			"text-decoration-color",
			"fill",
			"stroke"
		].join(","),
		opacity: "opacity",
		shadow: "box-shadow",
		transform: "transform",
		get DEFAULT() {
			return [
				this.colors,
				"opacity",
				"box-shadow",
				"transform",
				"filter",
				"backdrop-filter"
			].join(",");
		}
	},
	lineWidth,
	spacing: spacing$1,
	duration,
	ringWidth,
	preflightBase,
	containers,
	zIndex,
	media: media$1
};
//#endregion
//#region node_modules/@unocss/preset-mini/dist/variants.mjs
var variantAria$1 = {
	name: "aria",
	match(matcher, ctx) {
		const variant = (0, utils_exports.variantGetParameter)("aria-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const aria = h$1.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
			if (aria) return {
				matcher: rest,
				selector: (s) => `${s}[aria-${aria}]`
			};
		}
	},
	multiPass: true
};
function taggedAria$1(tagName, combinator, options = {}) {
	return {
		name: `${tagName}-aria`,
		match(matcher, ctx) {
			const variant = (0, utils_exports.variantGetParameter)(`${tagName}-aria-`, matcher, ctx.generator.config.separators);
			if (variant) {
				const [match, rest, label] = variant;
				const ariaAttribute = h$1.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
				if (ariaAttribute) {
					const attributify = !!options?.attributifyPseudo;
					let firstPrefix = options?.prefix ?? "";
					firstPrefix = (Array.isArray(firstPrefix) ? firstPrefix : [firstPrefix]).filter(Boolean)[0] ?? "";
					const parent = `${attributify ? `[${firstPrefix}${tagName}=""]` : `.${firstPrefix}${tagName}`}`;
					const escapedLabel = escapeSelector(label ? `/${label}` : "");
					return {
						matcher: rest,
						handle: (input, next) => {
							const regexp = /* @__PURE__ */ new RegExp(`${escapeRegExp(parent)}${escapeRegExp(escapedLabel)}(?:\\[.+?\\])+`);
							const match$1 = input.prefix.match(regexp);
							let nextPrefix;
							if (match$1) {
								const insertIndex = (match$1.index ?? 0) + parent.length + escapedLabel.length;
								nextPrefix = [
									input.prefix.slice(0, insertIndex),
									`[aria-${ariaAttribute}]`,
									input.prefix.slice(insertIndex)
								].join("");
							} else {
								const prefixGroupIndex = Math.max(input.prefix.indexOf(parent), 0);
								nextPrefix = [
									input.prefix.slice(0, prefixGroupIndex),
									parent,
									escapedLabel,
									`[aria-${ariaAttribute}]`,
									combinator,
									input.prefix.slice(prefixGroupIndex)
								].join("");
							}
							return next({
								...input,
								prefix: nextPrefix
							});
						}
					};
				}
			}
		},
		multiPass: true
	};
}
function taggedHasAria() {
	return {
		name: "has-aria",
		match(matcher, ctx) {
			const variant = (0, utils_exports.variantGetParameter)("has-aria-", matcher, ctx.generator.config.separators);
			if (variant) {
				const [match, rest] = variant;
				const ariaAttribute = h$1.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
				if (ariaAttribute) return {
					matcher: rest,
					handle: (input, next) => next({
						...input,
						pseudo: `${input.pseudo}:has([aria-${ariaAttribute}])`
					})
				};
			}
		},
		multiPass: true
	};
}
function variantTaggedAriaAttributes$1(options = {}) {
	return [
		taggedAria$1("group", " ", options),
		taggedAria$1("peer", "~", options),
		taggedAria$1("parent", ">", options),
		taggedAria$1("previous", "+", options),
		taggedHasAria()
	];
}
var sizePseudo$1 = /(max|min)-\[([^\]]*)\]:/;
function variantBreakpoints$1() {
	const regexCache = {};
	return {
		name: "breakpoints",
		match(matcher, context) {
			if (sizePseudo$1.test(matcher)) {
				const match = matcher.match(sizePseudo$1);
				return {
					matcher: matcher.replace(match[0], ""),
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (${match[1]}-width: ${match[2]})`
					})
				};
			}
			const variantEntries = (resolveBreakpoints$1(context) ?? []).map(({ point, size }, idx) => [
				point,
				size,
				idx
			]);
			for (const [point, size, idx] of variantEntries) {
				if (!regexCache[point]) regexCache[point] = /* @__PURE__ */ new RegExp(`^((?:([al]t-|[<~]|max-))?${point}(?:${context.generator.config.separators.join("|")}))`);
				const match = matcher.match(regexCache[point]);
				if (!match) continue;
				const [, pre] = match;
				const m = matcher.slice(pre.length);
				if (m === "container") continue;
				const isLtPrefix = pre.startsWith("lt-") || pre.startsWith("<") || pre.startsWith("max-");
				const isAtPrefix = pre.startsWith("at-") || pre.startsWith("~");
				let order = 3e3;
				if (isLtPrefix) {
					order -= idx + 1;
					return {
						matcher: m,
						handle: (input, next) => next({
							...input,
							parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (max-width: ${(0, utils_exports.calcMaxWidthBySize)(size)})`,
							parentOrder: order
						})
					};
				}
				order += idx + 1;
				if (isAtPrefix && idx < variantEntries.length - 1) return {
					matcher: m,
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size}) and (max-width: ${(0, utils_exports.calcMaxWidthBySize)(variantEntries[idx + 1][1])})`,
						parentOrder: order
					})
				};
				return {
					matcher: m,
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size})`,
						parentOrder: order
					})
				};
			}
		},
		multiPass: true,
		autocomplete: "(at-|lt-|max-|)$breakpoints:"
	};
}
var variantChildren$1 = [(0, utils_exports.variantMatcher)("*", (input) => ({ selector: `${input.selector} > *` }), { order: -1 })];
function scopeMatcher$1(name, combinator) {
	return {
		name: `combinator:${name}`,
		match(matcher, ctx) {
			if (!matcher.startsWith(name)) return;
			const separators = ctx.generator.config.separators;
			let body = (0, utils_exports.variantGetBracket)(`${name}-`, matcher, separators);
			if (!body) {
				for (const separator of separators) if (matcher.startsWith(`${name}${separator}`)) {
					body = ["", matcher.slice(name.length + separator.length)];
					break;
				}
				if (!body) return;
			}
			let bracketValue = h$1.bracket(body[0]) ?? "";
			if (bracketValue === "") bracketValue = "*";
			return {
				matcher: body[1],
				selector: (s) => `${s}${combinator}${bracketValue}`
			};
		},
		multiPass: true
	};
}
var variantCombinators$2 = [
	scopeMatcher$1("all", " "),
	scopeMatcher$1("children", ">"),
	scopeMatcher$1("next", "+"),
	scopeMatcher$1("sibling", "+"),
	scopeMatcher$1("siblings", "~")
];
var variantContainerQuery$1 = {
	name: "@",
	match(matcher, ctx) {
		if (matcher.startsWith("@container")) return;
		const variant = (0, utils_exports.variantGetParameter)("@", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest, label] = variant;
			const unbracket = h$1.bracket(match);
			let container;
			if (unbracket) container = h$1.numberWithUnit(unbracket);
			else container = ctx.theme.containers?.[match] ?? "";
			if (container) {
				let order = 1e3 + Object.keys(ctx.theme.containers ?? {}).indexOf(match);
				if (label) order += 1e3;
				return {
					matcher: rest,
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@container${label ? ` ${label} ` : " "}(min-width: ${container})`,
						parentOrder: order
					})
				};
			}
		}
	},
	multiPass: true
};
function variantColorsMediaOrClass$1(options = {}) {
	if (options?.dark === "class" || typeof options.dark === "object") {
		const { dark = ".dark", light = ".light" } = typeof options.dark === "string" ? {} : options.dark;
		return [(0, utils_exports.variantMatcher)("dark", toArray(dark).map((dark$1) => (input) => ({ prefix: `${dark$1} $$ ${input.prefix}` }))), (0, utils_exports.variantMatcher)("light", toArray(light).map((light$1) => (input) => ({ prefix: `${light$1} $$ ${input.prefix}` })))];
	}
	return [(0, utils_exports.variantParentMatcher)("dark", "@media (prefers-color-scheme: dark)"), (0, utils_exports.variantParentMatcher)("light", "@media (prefers-color-scheme: light)")];
}
var variantDataAttribute$1 = {
	name: "data",
	match(matcher, ctx) {
		const variant = (0, utils_exports.variantGetParameter)("data-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const dataAttribute = h$1.bracket(match) ?? ctx.theme.data?.[match] ?? "";
			if (dataAttribute) return {
				matcher: rest,
				selector: (s) => `${s}[data-${dataAttribute}]`
			};
		}
	},
	multiPass: true
};
function taggedData$1(tagName, combinator, options = {}) {
	return {
		name: `${tagName}-data`,
		match(matcher, ctx) {
			const variant = (0, utils_exports.variantGetParameter)(`${tagName}-data-`, matcher, ctx.generator.config.separators);
			if (variant) {
				const [match, rest, label] = variant;
				const dataAttribute = h$1.bracket(match) ?? ctx.theme.data?.[match] ?? "";
				if (dataAttribute) {
					const attributify = !!options?.attributifyPseudo;
					let firstPrefix = options?.prefix ?? "";
					firstPrefix = (Array.isArray(firstPrefix) ? firstPrefix : [firstPrefix]).filter(Boolean)[0] ?? "";
					const parent = `${attributify ? `[${firstPrefix}${tagName}=""]` : `.${firstPrefix}${tagName}`}`;
					const escapedLabel = escapeSelector(label ? `/${label}` : "");
					return {
						matcher: rest,
						handle: (input, next) => {
							const regexp = /* @__PURE__ */ new RegExp(`${escapeRegExp(parent)}${escapeRegExp(escapedLabel)}(?:\\[.+?\\])+`);
							const match$1 = input.prefix.match(regexp);
							let nextPrefix;
							if (match$1) {
								const insertIndex = (match$1.index ?? 0) + parent.length + escapedLabel.length;
								nextPrefix = [
									input.prefix.slice(0, insertIndex),
									`[data-${dataAttribute}]`,
									input.prefix.slice(insertIndex)
								].join("");
							} else {
								const prefixGroupIndex = Math.max(input.prefix.indexOf(parent), 0);
								nextPrefix = [
									input.prefix.slice(0, prefixGroupIndex),
									parent,
									escapedLabel,
									`[data-${dataAttribute}]`,
									combinator,
									input.prefix.slice(prefixGroupIndex)
								].join("");
							}
							return next({
								...input,
								prefix: nextPrefix
							});
						}
					};
				}
			}
		},
		multiPass: true
	};
}
function taggedHasData() {
	return {
		name: "has-data",
		match(matcher, ctx) {
			const variant = (0, utils_exports.variantGetParameter)("has-data-", matcher, ctx.generator.config.separators);
			if (variant) {
				const [match, rest] = variant;
				const dataAttribute = h$1.bracket(match) ?? ctx.theme.data?.[match] ?? "";
				if (dataAttribute) return {
					matcher: rest,
					handle: (input, next) => next({
						...input,
						pseudo: `${input.pseudo}:has([data-${dataAttribute}])`
					})
				};
			}
		},
		multiPass: true
	};
}
function variantTaggedDataAttributes$1(options = {}) {
	return [
		taggedData$1("group", " ", options),
		taggedData$1("peer", "~", options),
		taggedData$1("parent", ">", options),
		taggedData$1("previous", "+", options),
		taggedHasData()
	];
}
var variantLanguageDirections$1 = [(0, utils_exports.variantMatcher)("rtl", (input) => ({ prefix: `[dir="rtl"] $$ ${input.prefix}` })), (0, utils_exports.variantMatcher)("ltr", (input) => ({ prefix: `[dir="ltr"] $$ ${input.prefix}` }))];
function variantImportant$1() {
	let re;
	return {
		name: "important",
		match(matcher, ctx) {
			if (!re) re = /* @__PURE__ */ new RegExp(`^(important(?:${ctx.generator.config.separators.join("|")})|!)`);
			let base;
			const match = matcher.match(re);
			if (match) base = matcher.slice(match[0].length);
			else if (matcher.endsWith("!")) base = matcher.slice(0, -1);
			if (base) return {
				matcher: base,
				body: (body) => {
					body.forEach((v) => {
						if (v[1] != null) v[1] += " !important";
					});
					return body;
				}
			};
		}
	};
}
var variantPrint$1 = (0, utils_exports.variantParentMatcher)("print", "@media print");
var variantCustomMedia$1 = {
	name: "media",
	match(matcher, ctx) {
		const variant = (0, utils_exports.variantGetParameter)("media-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			let media = h$1.bracket(match) ?? "";
			if (media === "") media = ctx.theme.media?.[match] ?? "";
			if (media) return {
				matcher: rest,
				handle: (input, next) => next({
					...input,
					parent: `${input.parent ? `${input.parent} $$ ` : ""}@media ${media}`
				})
			};
		}
	},
	multiPass: true
};
var variantSelector$1 = {
	name: "selector",
	match(matcher, ctx) {
		const variant = (0, utils_exports.variantGetBracket)("selector-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const selector = h$1.bracket(match);
			if (selector) return {
				matcher: rest,
				selector: () => selector
			};
		}
	}
};
var variantCssLayer$1 = {
	name: "layer",
	match(matcher, ctx) {
		const variant = (0, utils_exports.variantGetParameter)("layer-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const layer = h$1.bracket(match) ?? match;
			if (layer) return {
				matcher: rest,
				handle: (input, next) => next({
					...input,
					parent: `${input.parent ? `${input.parent} $$ ` : ""}@layer ${layer}`
				})
			};
		}
	}
};
var variantInternalLayer$1 = {
	name: "uno-layer",
	match(matcher, ctx) {
		const variant = (0, utils_exports.variantGetParameter)("uno-layer-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const layer = h$1.bracket(match) ?? match;
			if (layer) return {
				matcher: rest,
				layer
			};
		}
	}
};
var variantScope$1 = {
	name: "scope",
	match(matcher, ctx) {
		const variant = (0, utils_exports.variantGetBracket)("scope-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const scope = h$1.bracket(match);
			if (scope) return {
				matcher: rest,
				selector: (s) => `${scope} $$ ${s}`
			};
		}
	}
};
var variantVariables$1 = {
	name: "variables",
	match(matcher, ctx) {
		if (!matcher.startsWith("[")) return;
		const [match, rest] = (0, utils_exports.getBracket)(matcher, "[", "]") ?? [];
		if (!(match && rest)) return;
		let newMatcher;
		for (const separator of ctx.generator.config.separators) if (rest.startsWith(separator)) {
			newMatcher = rest.slice(separator.length);
			break;
		}
		if (newMatcher == null) return;
		const variant = h$1.bracket(match) ?? "";
		const useParent = variant.startsWith("@");
		if (!(useParent || variant.includes("&"))) return;
		return {
			matcher: newMatcher,
			handle(input, next) {
				const updates = useParent ? { parent: `${input.parent ? `${input.parent} $$ ` : ""}${variant}` } : { selector: variant.replace(/&/g, input.selector) };
				return next({
					...input,
					...updates
				});
			}
		};
	},
	multiPass: true
};
var variantTheme$1 = {
	name: "theme-variables",
	match(matcher, ctx) {
		if (!(0, utils_exports.hasThemeFn)(matcher)) return;
		return {
			matcher,
			handle(input, next) {
				return next({
					...input,
					entries: JSON.parse((0, utils_exports.transformThemeFn)(JSON.stringify(input.entries), ctx.theme))
				});
			}
		};
	}
};
var anchoredNumberRE$1 = /^-?[0-9.]+(?:[a-z]+|%)?$/;
var numberRE$2 = /-?[0-9.]+(?:[a-z]+|%)?/;
var ignoreProps$1 = [/\b(opacity|color|flex|backdrop-filter|^filter|transform)\b/];
function negateMathFunction$1(value) {
	const match = value.match(cssMathFnRE$1) || value.match(cssVarFnRE$1);
	if (match) {
		const [fnBody, rest] = getStringComponent(`(${match[2]})${match[3]}`, "(", ")", " ") ?? [];
		if (fnBody) return `calc(${match[1]}${fnBody} * -1)${rest ? ` ${rest}` : ""}`;
	}
}
var negateFunctionBodyRE$1 = /\b(hue-rotate)\s*(\(.*)/;
function negateFunctionBody$1(value) {
	const match = value.match(negateFunctionBodyRE$1);
	if (match) {
		const [fnBody, rest] = getStringComponent(match[2], "(", ")", " ") ?? [];
		if (fnBody) {
			const body = anchoredNumberRE$1.test(fnBody.slice(1, -1)) ? fnBody.replace(numberRE$2, (i) => i.startsWith("-") ? i.slice(1) : `-${i}`) : `(calc(${fnBody} * -1))`;
			return `${match[1]}${body}${rest ? ` ${rest}` : ""}`;
		}
	}
}
var variantNegative$1 = {
	name: "negative",
	match(matcher) {
		if (!matcher.startsWith("-")) return;
		return {
			matcher: matcher.slice(1),
			body: (body) => {
				if (body.find((v) => v[0] === "$$mini-no-negative")) return;
				let changed = false;
				body.forEach((v) => {
					const value = v[1]?.toString();
					if (!value || value === "0") return;
					if (ignoreProps$1.some((i) => i.test(v[0]))) return;
					const negatedFn = negateMathFunction$1(value);
					if (negatedFn) {
						v[1] = negatedFn;
						changed = true;
						return;
					}
					const negatedBody = negateFunctionBody$1(value);
					if (negatedBody) {
						v[1] = negatedBody;
						changed = true;
						return;
					}
					if (anchoredNumberRE$1.test(value)) {
						v[1] = value.replace(numberRE$2, (i) => i.startsWith("-") ? i.slice(1) : `-${i}`);
						changed = true;
					}
				});
				if (changed) return body;
				return [];
			}
		};
	}
};
function variantPseudoClassesAndElements$1() {
	return createPseudoClassesAndElements({
		getBracket: _utils_exports.getBracket,
		h: h$1,
		variantGetBracket: _utils_exports.variantGetBracket
	});
}
function variantPseudoClassFunctions$1() {
	return createPseudoClassFunctions({
		getBracket: _utils_exports.getBracket,
		h: h$1,
		variantGetBracket: _utils_exports.variantGetBracket
	});
}
function variantTaggedPseudoClasses$1(options = {}) {
	return createTaggedPseudoClasses(options, {
		getBracket: _utils_exports.getBracket,
		h: h$1,
		variantGetBracket: _utils_exports.variantGetBracket
	});
}
var variantPartClasses$1 = createPartClasses();
var variantStartingStyle$1 = {
	name: "starting",
	match(matcher) {
		if (!matcher.startsWith("starting:")) return;
		return {
			matcher: matcher.slice(9),
			handle: (input, next) => next({
				...input,
				parent: `@starting-style`
			})
		};
	}
};
var variantSupports$1 = {
	name: "supports",
	match(matcher, ctx) {
		const variant = (0, utils_exports.variantGetParameter)("supports-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			let supports = h$1.bracket(match) ?? "";
			if (supports === "") supports = ctx.theme.supports?.[match] ?? "";
			if (supports) {
				if (!(supports.startsWith("(") && supports.endsWith(")"))) supports = `(${supports})`;
				return {
					matcher: rest,
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@supports ${supports}`
					})
				};
			}
		}
	},
	multiPass: true
};
function variants$2(options) {
	return [
		variantAria$1,
		variantDataAttribute$1,
		variantCssLayer$1,
		variantSelector$1,
		variantInternalLayer$1,
		variantNegative$1,
		variantStartingStyle$1,
		variantImportant$1(),
		variantSupports$1,
		variantPrint$1,
		variantCustomMedia$1,
		variantBreakpoints$1(),
		...variantCombinators$2,
		...variantPseudoClassesAndElements$1(),
		variantPseudoClassFunctions$1(),
		...variantTaggedPseudoClasses$1(options),
		variantPartClasses$1,
		...variantColorsMediaOrClass$1(options),
		...variantLanguageDirections$1,
		variantScope$1,
		...variantChildren$1,
		variantContainerQuery$1,
		variantVariables$1,
		...variantTaggedDataAttributes$1(options),
		...variantTaggedAriaAttributes$1(options),
		variantTheme$1
	];
}
//#endregion
//#region node_modules/@unocss/extractor-arbitrary-variants/dist/index.mjs
function hash$1(str) {
	let i;
	let l;
	let hval = 2166136261;
	for (i = 0, l = str.length; i < l; i++) {
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	return `00000${(hval >>> 0).toString(36)}`.slice(-6);
}
function transformSkipCode(code, map, SKIP_RULES_RE, keyFlag) {
	for (const item of Array.from(code.matchAll(SKIP_RULES_RE))) if (item != null) {
		const matched = item[0];
		const withHashKey = `${keyFlag}${hash$1(matched)}`;
		map.set(withHashKey, matched);
		code = code.replace(matched, withHashKey);
	}
	return code;
}
function restoreSkipCode(code, map) {
	for (const [withHashKey, matched] of map.entries()) code = code.replaceAll(withHashKey, matched);
	return code;
}
var sourceMapRE = /\/\/#\s*sourceMappingURL=.*\n?/g;
function removeSourceMap(code) {
	if (code.includes("sourceMappingURL=")) return code.replace(sourceMapRE, "");
	return code;
}
var quotedArbitraryValuesRE = /(?:[\w&:[\]-]|\[\S{1,64}=\S{1,64}\]){1,64}\[\\?['"]?\S{1,64}?['"]\]\]?[\w:-]{0,64}/g;
var arbitraryPropertyRE = /\[(\\\W|[\w-]){1,64}:[^\s:]{0,64}?("\S{1,64}?"|'\S{1,64}?'|`\S{1,64}?`|[^\s:]{1,64}?)[^\s:]{0,64}?\)?\]/g;
var arbitraryPropertyCandidateRE = /^\[(?:\\\W|[\w-]){1,64}:['"]?\S{1,64}?['"]?\]$/;
function splitCodeWithArbitraryVariants(code) {
	const result = [];
	for (const match of code.matchAll(arbitraryPropertyRE)) {
		if (match.index !== 0 && !/^[\s'"`]/.test(code[match.index - 1] ?? "")) continue;
		result.push(match[0]);
	}
	for (const match of code.matchAll(quotedArbitraryValuesRE)) result.push(match[0]);
	const skipMap = /* @__PURE__ */ new Map();
	const skipFlag = "@unocss-skip-arbitrary-brackets";
	code = transformSkipCode(code, skipMap, /-\[(?!&.+?;)[^\]]*\]/g, skipFlag);
	if (!code) return result;
	code.split(defaultSplitRE).forEach((match) => {
		if (match.includes(skipFlag)) match = restoreSkipCode(match, skipMap);
		if (isValidSelector(match) && !arbitraryPropertyCandidateRE.test(match)) result.push(match);
	});
	return result;
}
function extractorArbitraryVariants() {
	return {
		name: "@unocss/extractor-arbitrary-variants",
		order: 0,
		extract({ code }) {
			return splitCodeWithArbitraryVariants(removeSourceMap(code));
		}
	};
}
//#endregion
//#region node_modules/@unocss/preset-mini/dist/index.mjs
function preflights$1(options) {
	if (options.preflight) return [{
		layer: "preflights",
		getCSS({ theme: theme$1, generator }) {
			if (theme$1.preflightBase) {
				let entries = Object.entries(theme$1.preflightBase);
				if (options.preflight === "on-demand") {
					const keys = new Set(Array.from(generator.activatedRules).map((r) => r[2]?.custom?.preflightKeys).filter(Boolean).flat());
					entries = entries.filter(([k]) => keys.has(k));
				}
				if (entries.length > 0) {
					let css = entriesToCss(entries);
					if (options.variablePrefix !== "un-") css = css.replace(/--un-/g, `--${options.variablePrefix}`);
					return toArray(theme$1.preflightRoot ?? ["*,::before,::after", "::backdrop"]).map((root) => `${root}{${css}}`).join("");
				}
			}
		}
	}];
}
var shorthands$1 = {
	position: [
		"relative",
		"absolute",
		"fixed",
		"sticky",
		"static"
	],
	globalKeyword: globalKeywords$1
};
/**
* The basic preset for UnoCSS, with only the most essential utilities.
*
* @see https://unocss.dev/presets/mini
*/
var presetMini = definePreset((options = {}) => {
	options.dark = options.dark ?? "class";
	options.attributifyPseudo = options.attributifyPseudo ?? false;
	options.preflight = options.preflight ?? true;
	options.variablePrefix = options.variablePrefix ?? "un-";
	return {
		name: "@unocss/preset-mini",
		theme: theme$3,
		rules: rules$2,
		variants: variants$2(options),
		options,
		prefix: options.prefix,
		postprocess: VarPrefixPostprocessor(options.variablePrefix),
		preflights: preflights$1(options),
		extractorDefault: options.arbitraryVariants === false ? void 0 : extractorArbitraryVariants(),
		autocomplete: { shorthands: shorthands$1 }
	};
});
var src_default$1 = presetMini;
function VarPrefixPostprocessor(prefix) {
	if (prefix !== "un-") return (obj) => {
		obj.entries.forEach((i) => {
			i[0] = i[0].replace(/^--un-/, `--${prefix}`);
			if (typeof i[1] === "string") i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`);
		});
	};
}
//#endregion
//#region node_modules/@unocss/preset-tagify/dist/index.mjs
var MARKER = "__TAGIFY__";
var htmlTagRE = /<([\w:-]+)/g;
function extractorTagify(options) {
	const { prefix = "", excludedTags = [
		"b",
		/^h\d+$/,
		"table"
	] } = options;
	return {
		name: "tagify",
		extract({ code }) {
			return Array.from(code.matchAll(htmlTagRE)).filter(({ 1: match }) => {
				for (const exclude of excludedTags) if (typeof exclude === "string") {
					if (match === exclude) return false;
				} else {
					exclude.lastIndex = 0;
					if (exclude.test(match)) return false;
				}
				return match.startsWith(prefix);
			}).map(([, matched]) => `${MARKER}${matched}`);
		}
	};
}
function variantTagify(options) {
	const { extraProperties } = options;
	const prefix = `${MARKER}${options.prefix ?? ""}`;
	return {
		name: "tagify",
		match(input) {
			if (!input.startsWith(prefix)) return;
			const matcher = input.slice(prefix.length);
			const handler = {
				matcher,
				selector: (i) => i.slice(11)
			};
			if (extraProperties) if (typeof extraProperties === "function") handler.body = (entries) => [...entries, ...Object.entries(extraProperties(matcher) ?? {})];
			else handler.body = (entries) => [...entries, ...Object.entries(extraProperties)];
			return handler;
		}
	};
}
var src_default$2 = definePreset((options = {}) => {
	const { defaultExtractor = true } = options;
	return {
		name: "@unocss/preset-tagify",
		variants: [variantTagify(options)],
		extractors: [extractorTagify(options)],
		extractorDefault: defaultExtractor ? void 0 : false
	};
});
//#endregion
//#region node_modules/@unocss/preset-typography/dist/index.mjs
var modifiers = [
	[
		"headings",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"th"
	],
	["h1"],
	["h2"],
	["h3"],
	["h4"],
	["h5"],
	["h6"],
	["p"],
	["a"],
	["blockquote"],
	["figure"],
	["figcaption"],
	["strong"],
	["em"],
	["kbd"],
	["code"],
	["pre"],
	["ol"],
	["ul"],
	["li"],
	["table"],
	["thead"],
	["tr"],
	["th"],
	["td"],
	["img"],
	["video"],
	["hr"]
];
var defaultColorScheme = {
	"body": [700, 300],
	"headings": [900, "white"],
	"lead": [600, 400],
	"links": [900, "white"],
	"bold": [900, "white"],
	"counters": [500, 400],
	"bullets": [300, 600],
	"hr": [200, 700],
	"quotes": [900, 100],
	"quote-borders": [200, 700],
	"captions": [500, 400],
	"kbd": [900, "white"],
	"kbd-shadows": [900, "white"],
	"code": [900, "white"],
	"pre-code": [200, 300],
	"pre-bg": [800, "rgb(0 0 0 / 50%)"],
	"th-borders": [300, 600],
	"td-borders": [200, 700]
};
var round$1 = (num) => num.toFixed(7).replace(/0+$/, "").replace(/\.$/, "");
var rem$1 = (px) => `${round$1(px / 16)}rem`;
var em = (px, base) => `${round$1(px / base)}em`;
var ProseDefaultCSSObject = {
	"color": "var(--un-prose-body)",
	"max-width": "65ch",
	"p": {},
	"[class~=\"lead\"]": { color: "var(--un-prose-lead)" },
	"a": {
		"color": "var(--un-prose-links)",
		"text-decoration": "underline",
		"font-weight": "500"
	},
	"strong": {
		"color": "var(--un-prose-bold)",
		"font-weight": "600"
	},
	"a strong": { color: "inherit" },
	"blockquote strong": { color: "inherit" },
	"thead th strong": { color: "inherit" },
	"ol": { "list-style-type": "decimal" },
	"ol[type=\"A\"]": { "list-style-type": "upper-alpha" },
	"ol[type=\"a\"]": { "list-style-type": "lower-alpha" },
	"ol[type=\"A\" s]": { "list-style-type": "upper-alpha" },
	"ol[type=\"a\" s]": { "list-style-type": "lower-alpha" },
	"ol[type=\"I\"]": { "list-style-type": "upper-roman" },
	"ol[type=\"i\"]": { "list-style-type": "lower-roman" },
	"ol[type=\"I\" s]": { "list-style-type": "upper-roman" },
	"ol[type=\"i\" s]": { "list-style-type": "lower-roman" },
	"ol[type=\"1\"]": { "list-style-type": "decimal" },
	"ul": { "list-style-type": "disc" },
	"ol > li::marker": {
		"font-weight": "400",
		"color": "var(--un-prose-counters)"
	},
	"ul > li::marker": { color: "var(--un-prose-bullets)" },
	"dt": {
		"color": "var(--un-prose-headings)",
		"font-weight": "600"
	},
	"hr": {
		"border-color": "var(--un-prose-hr)",
		"border-top-width": "1px"
	},
	"blockquote": {
		"font-weight": "500",
		"font-style": "italic",
		"color": "var(--un-prose-quotes)",
		"border-inline-start-width": "0.25rem",
		"border-inline-start-color": "var(--un-prose-quote-borders)",
		"quotes": "\"\\201C\"\"\\201D\"\"\\2018\"\"\\2019\""
	},
	"blockquote p:first-of-type::before": { content: "open-quote" },
	"blockquote p:last-of-type::after": { content: "close-quote" },
	"h1": {
		"color": "var(--un-prose-headings)",
		"font-weight": "800"
	},
	"h1 strong": {
		"font-weight": "900",
		"color": "inherit"
	},
	"h2": {
		"color": "var(--un-prose-headings)",
		"font-weight": "700"
	},
	"h2 strong": {
		"font-weight": "800",
		"color": "inherit"
	},
	"h3": {
		"color": "var(--un-prose-headings)",
		"font-weight": "600"
	},
	"h3 strong": {
		"font-weight": "700",
		"color": "inherit"
	},
	"h4": {
		"color": "var(--un-prose-headings)",
		"font-weight": "600"
	},
	"h4 strong": {
		"font-weight": "700",
		"color": "inherit"
	},
	"img": {},
	"picture": { display: "block" },
	"video": {},
	"kbd": {
		"font-weight": "500",
		"font-family": "inherit",
		"color": "var(--un-prose-kbd)",
		"box-shadow": "0 0 0 1px rgb(var(--un-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--un-prose-kbd-shadows) / 10%)"
	},
	"code": {
		"color": "var(--un-prose-code)",
		"font-weight": "600"
	},
	"code::before": { content: "\"`\"" },
	"code::after": { content: "\"`\"" },
	"a code": { color: "inherit" },
	"h1 code": { color: "inherit" },
	"h2 code": { color: "inherit" },
	"h3 code": { color: "inherit" },
	"h4 code": { color: "inherit" },
	"blockquote code": { color: "inherit" },
	"thead th code": { color: "inherit" },
	"pre": {
		"color": "var(--un-prose-pre-code)",
		"background-color": "var(--un-prose-pre-bg)",
		"overflow-x": "auto",
		"font-weight": "400"
	},
	"pre code": {
		"background-color": "transparent",
		"border-width": "0",
		"border-radius": "0",
		"padding": "0",
		"font-weight": "inherit",
		"color": "inherit",
		"font-size": "inherit",
		"font-family": "inherit",
		"line-height": "inherit"
	},
	"pre code::before": { content: "none" },
	"pre code::after": { content: "none" },
	"table": {
		"width": "100%",
		"table-layout": "auto",
		"margin-top": em(32, 16),
		"margin-bottom": em(32, 16)
	},
	"thead": {
		"border-bottom-width": "1px",
		"border-bottom-color": "var(--un-prose-th-borders)"
	},
	"thead th": {
		"color": "var(--un-prose-headings)",
		"font-weight": "600",
		"vertical-align": "bottom"
	},
	"tbody tr": {
		"border-bottom-width": "1px",
		"border-bottom-color": "var(--un-prose-td-borders)"
	},
	"tbody tr:last-child": { "border-bottom-width": "0" },
	"tbody td": { "vertical-align": "baseline" },
	"tfoot": {
		"border-top-width": "1px",
		"border-top-color": "var(--un-prose-th-borders)"
	},
	"tfoot td": { "vertical-align": "top" },
	"th, td": { "text-align": "start" },
	"figure > *": {},
	"figcaption": { color: "var(--un-prose-captions)" }
};
var ProseDefaultSize = {
	"sm": {
		"font-size": rem$1(14),
		"line-height": round$1(24 / 14),
		"p": {
			"margin-top": em(16, 14),
			"margin-bottom": em(16, 14)
		},
		"[class~=\"lead\"]": {
			"font-size": em(18, 14),
			"line-height": round$1(28 / 18),
			"margin-top": em(16, 18),
			"margin-bottom": em(16, 18)
		},
		"blockquote": {
			"margin-top": em(24, 18),
			"margin-bottom": em(24, 18),
			"padding-inline-start": em(20, 18)
		},
		"h1": {
			"font-size": em(30, 14),
			"margin-top": "0",
			"margin-bottom": em(24, 30),
			"line-height": round$1(36 / 30)
		},
		"h2": {
			"font-size": em(20, 14),
			"margin-top": em(32, 20),
			"margin-bottom": em(16, 20),
			"line-height": round$1(28 / 20)
		},
		"h3": {
			"font-size": em(18, 14),
			"margin-top": em(28, 18),
			"margin-bottom": em(8, 18),
			"line-height": round$1(28 / 18)
		},
		"h4": {
			"margin-top": em(20, 14),
			"margin-bottom": em(8, 14),
			"line-height": round$1(20 / 14)
		},
		"img": {
			"margin-top": em(24, 14),
			"margin-bottom": em(24, 14)
		},
		"picture": {
			"margin-top": em(24, 14),
			"margin-bottom": em(24, 14)
		},
		"picture > img": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"video": {
			"margin-top": em(24, 14),
			"margin-bottom": em(24, 14)
		},
		"kbd": {
			"font-size": em(12, 14),
			"border-radius": rem$1(5),
			"padding-top": em(2, 14),
			"padding-inline-end": em(5, 14),
			"padding-bottom": em(2, 14),
			"padding-inline-start": em(5, 14)
		},
		"code": { "font-size": em(12, 14) },
		"h2 code": { "font-size": em(18, 20) },
		"h3 code": { "font-size": em(16, 18) },
		"pre": {
			"font-size": em(12, 14),
			"line-height": round$1(20 / 12),
			"margin-top": em(20, 12),
			"margin-bottom": em(20, 12),
			"border-radius": rem$1(4),
			"padding-top": em(8, 12),
			"padding-inline-end": em(12, 12),
			"padding-bottom": em(8, 12),
			"padding-inline-start": em(12, 12)
		},
		"ol": {
			"margin-top": em(16, 14),
			"margin-bottom": em(16, 14),
			"padding-inline-start": em(22, 14)
		},
		"ul": {
			"margin-top": em(16, 14),
			"margin-bottom": em(16, 14),
			"padding-inline-start": em(22, 14)
		},
		"li": {
			"margin-top": em(4, 14),
			"margin-bottom": em(4, 14)
		},
		"ol > li": { "padding-inline-start": em(6, 14) },
		"ul > li": { "padding-inline-start": em(6, 14) },
		"> ul > li p": {
			"margin-top": em(8, 14),
			"margin-bottom": em(8, 14)
		},
		"> ul > li > p:first-child": { "margin-top": em(16, 14) },
		"> ul > li > p:last-child": { "margin-bottom": em(16, 14) },
		"> ol > li > p:first-child": { "margin-top": em(16, 14) },
		"> ol > li > p:last-child": { "margin-bottom": em(16, 14) },
		"ul ul, ul ol, ol ul, ol ol": {
			"margin-top": em(8, 14),
			"margin-bottom": em(8, 14)
		},
		"dl": {
			"margin-top": em(16, 14),
			"margin-bottom": em(16, 14)
		},
		"dt": { "margin-top": em(16, 14) },
		"dd": {
			"margin-top": em(4, 14),
			"padding-inline-start": em(22, 14)
		},
		"hr": {
			"margin-top": em(40, 14),
			"margin-bottom": em(40, 14)
		},
		"hr + *": { "margin-top": "0" },
		"h2 + *": { "margin-top": "0" },
		"h3 + *": { "margin-top": "0" },
		"h4 + *": { "margin-top": "0" },
		"table": {
			"font-size": em(12, 14),
			"line-height": round$1(18 / 12)
		},
		"thead th": {
			"padding-inline-end": em(12, 12),
			"padding-bottom": em(8, 12),
			"padding-inline-start": em(12, 12)
		},
		"thead th:first-child": { "padding-inline-start": "0" },
		"thead th:last-child": { "padding-inline-end": "0" },
		"tbody td, tfoot td": {
			"padding-top": em(8, 12),
			"padding-inline-end": em(12, 12),
			"padding-bottom": em(8, 12),
			"padding-inline-start": em(12, 12)
		},
		"tbody td:first-child, tfoot td:first-child": { "padding-inline-start": "0" },
		"tbody td:last-child, tfoot td:last-child": { "padding-inline-end": "0" },
		"figure": {
			"margin-top": em(24, 14),
			"margin-bottom": em(24, 14)
		},
		"figure > *": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"figcaption": {
			"font-size": em(12, 14),
			"line-height": round$1(16 / 12),
			"margin-top": em(8, 12)
		},
		"> :first-child": { "margin-top": "0" },
		"> :last-child": { "margin-bottom": "0" }
	},
	"base": {
		"font-size": rem$1(16),
		"line-height": round$1(28 / 16),
		"p": {
			"margin-top": em(20, 16),
			"margin-bottom": em(20, 16)
		},
		"[class~=\"lead\"]": {
			"font-size": em(20, 16),
			"line-height": round$1(32 / 20),
			"margin-top": em(24, 20),
			"margin-bottom": em(24, 20)
		},
		"blockquote": {
			"margin-top": em(32, 20),
			"margin-bottom": em(32, 20),
			"padding-inline-start": em(20, 20)
		},
		"h1": {
			"font-size": em(36, 16),
			"margin-top": "0",
			"margin-bottom": em(32, 36),
			"line-height": round$1(40 / 36)
		},
		"h2": {
			"font-size": em(24, 16),
			"margin-top": em(48, 24),
			"margin-bottom": em(24, 24),
			"line-height": round$1(32 / 24)
		},
		"h3": {
			"font-size": em(20, 16),
			"margin-top": em(32, 20),
			"margin-bottom": em(12, 20),
			"line-height": round$1(32 / 20)
		},
		"h4": {
			"margin-top": em(24, 16),
			"margin-bottom": em(8, 16),
			"line-height": round$1(24 / 16)
		},
		"img": {
			"margin-top": em(32, 16),
			"margin-bottom": em(32, 16)
		},
		"picture": {
			"margin-top": em(32, 16),
			"margin-bottom": em(32, 16)
		},
		"picture > img": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"video": {
			"margin-top": em(32, 16),
			"margin-bottom": em(32, 16)
		},
		"kbd": {
			"font-size": em(14, 16),
			"border-radius": rem$1(5),
			"padding-top": em(3, 16),
			"padding-inline-end": em(6, 16),
			"padding-bottom": em(3, 16),
			"padding-inline-start": em(6, 16)
		},
		"code": { "font-size": em(14, 16) },
		"h2 code": { "font-size": em(21, 24) },
		"h3 code": { "font-size": em(18, 20) },
		"pre": {
			"font-size": em(14, 16),
			"line-height": round$1(24 / 14),
			"margin-top": em(24, 14),
			"margin-bottom": em(24, 14),
			"border-radius": rem$1(6),
			"padding-top": em(12, 14),
			"padding-inline-end": em(16, 14),
			"padding-bottom": em(12, 14),
			"padding-inline-start": em(16, 14)
		},
		"ol": {
			"margin-top": em(20, 16),
			"margin-bottom": em(20, 16),
			"padding-inline-start": em(26, 16)
		},
		"ul": {
			"margin-top": em(20, 16),
			"margin-bottom": em(20, 16),
			"padding-inline-start": em(26, 16)
		},
		"li": {
			"margin-top": em(8, 16),
			"margin-bottom": em(8, 16)
		},
		"ol > li": { "padding-inline-start": em(6, 16) },
		"ul > li": { "padding-inline-start": em(6, 16) },
		"> ul > li p": {
			"margin-top": em(12, 16),
			"margin-bottom": em(12, 16)
		},
		"> ul > li > p:first-child": { "margin-top": em(20, 16) },
		"> ul > li > p:last-child": { "margin-bottom": em(20, 16) },
		"> ol > li > p:first-child": { "margin-top": em(20, 16) },
		"> ol > li > p:last-child": { "margin-bottom": em(20, 16) },
		"ul ul, ul ol, ol ul, ol ol": {
			"margin-top": em(12, 16),
			"margin-bottom": em(12, 16)
		},
		"dl": {
			"margin-top": em(20, 16),
			"margin-bottom": em(20, 16)
		},
		"dt": { "margin-top": em(20, 16) },
		"dd": {
			"margin-top": em(8, 16),
			"padding-inline-start": em(26, 16)
		},
		"hr": {
			"margin-top": em(48, 16),
			"margin-bottom": em(48, 16)
		},
		"hr + *": { "margin-top": "0" },
		"h2 + *": { "margin-top": "0" },
		"h3 + *": { "margin-top": "0" },
		"h4 + *": { "margin-top": "0" },
		"table": {
			"font-size": em(14, 16),
			"line-height": round$1(24 / 14)
		},
		"thead th": {
			"padding-inline-end": em(8, 14),
			"padding-bottom": em(8, 14),
			"padding-inline-start": em(8, 14)
		},
		"thead th:first-child": { "padding-inline-start": "0" },
		"thead th:last-child": { "padding-inline-end": "0" },
		"tbody td, tfoot td": {
			"padding-top": em(8, 14),
			"padding-inline-end": em(8, 14),
			"padding-bottom": em(8, 14),
			"padding-inline-start": em(8, 14)
		},
		"tbody td:first-child, tfoot td:first-child": { "padding-inline-start": "0" },
		"tbody td:last-child, tfoot td:last-child": { "padding-inline-end": "0" },
		"figure": {
			"margin-top": em(32, 16),
			"margin-bottom": em(32, 16)
		},
		"figure > *": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"figcaption": {
			"font-size": em(14, 16),
			"line-height": round$1(20 / 14),
			"margin-top": em(12, 14)
		},
		"> :first-child": { "margin-top": "0" },
		"> :last-child": { "margin-bottom": "0" }
	},
	"lg": {
		"font-size": rem$1(18),
		"line-height": round$1(32 / 18),
		"p": {
			"margin-top": em(24, 18),
			"margin-bottom": em(24, 18)
		},
		"[class~=\"lead\"]": {
			"font-size": em(22, 18),
			"line-height": round$1(32 / 22),
			"margin-top": em(24, 22),
			"margin-bottom": em(24, 22)
		},
		"blockquote": {
			"margin-top": em(40, 24),
			"margin-bottom": em(40, 24),
			"padding-inline-start": em(24, 24)
		},
		"h1": {
			"font-size": em(48, 18),
			"margin-top": "0",
			"margin-bottom": em(40, 48),
			"line-height": round$1(48 / 48)
		},
		"h2": {
			"font-size": em(30, 18),
			"margin-top": em(56, 30),
			"margin-bottom": em(32, 30),
			"line-height": round$1(40 / 30)
		},
		"h3": {
			"font-size": em(24, 18),
			"margin-top": em(40, 24),
			"margin-bottom": em(16, 24),
			"line-height": round$1(36 / 24)
		},
		"h4": {
			"margin-top": em(32, 18),
			"margin-bottom": em(8, 18),
			"line-height": round$1(28 / 18)
		},
		"img": {
			"margin-top": em(32, 18),
			"margin-bottom": em(32, 18)
		},
		"picture": {
			"margin-top": em(32, 18),
			"margin-bottom": em(32, 18)
		},
		"picture > img": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"video": {
			"margin-top": em(32, 18),
			"margin-bottom": em(32, 18)
		},
		"kbd": {
			"font-size": em(16, 18),
			"border-radius": rem$1(5),
			"padding-top": em(4, 18),
			"padding-inline-end": em(8, 18),
			"padding-bottom": em(4, 18),
			"padding-inline-start": em(8, 18)
		},
		"code": { "font-size": em(16, 18) },
		"h2 code": { "font-size": em(26, 30) },
		"h3 code": { "font-size": em(21, 24) },
		"pre": {
			"font-size": em(16, 18),
			"line-height": round$1(28 / 16),
			"margin-top": em(32, 16),
			"margin-bottom": em(32, 16),
			"border-radius": rem$1(6),
			"padding-top": em(16, 16),
			"padding-inline-end": em(24, 16),
			"padding-bottom": em(16, 16),
			"padding-inline-start": em(24, 16)
		},
		"ol": {
			"margin-top": em(24, 18),
			"margin-bottom": em(24, 18),
			"padding-inline-start": em(28, 18)
		},
		"ul": {
			"margin-top": em(24, 18),
			"margin-bottom": em(24, 18),
			"padding-inline-start": em(28, 18)
		},
		"li": {
			"margin-top": em(12, 18),
			"margin-bottom": em(12, 18)
		},
		"ol > li": { "padding-inline-start": em(8, 18) },
		"ul > li": { "padding-inline-start": em(8, 18) },
		"> ul > li p": {
			"margin-top": em(16, 18),
			"margin-bottom": em(16, 18)
		},
		"> ul > li > p:first-child": { "margin-top": em(24, 18) },
		"> ul > li > p:last-child": { "margin-bottom": em(24, 18) },
		"> ol > li > p:first-child": { "margin-top": em(24, 18) },
		"> ol > li > p:last-child": { "margin-bottom": em(24, 18) },
		"ul ul, ul ol, ol ul, ol ol": {
			"margin-top": em(16, 18),
			"margin-bottom": em(16, 18)
		},
		"dl": {
			"margin-top": em(24, 18),
			"margin-bottom": em(24, 18)
		},
		"dt": { "margin-top": em(24, 18) },
		"dd": {
			"margin-top": em(12, 18),
			"padding-inline-start": em(28, 18)
		},
		"hr": {
			"margin-top": em(56, 18),
			"margin-bottom": em(56, 18)
		},
		"hr + *": { "margin-top": "0" },
		"h2 + *": { "margin-top": "0" },
		"h3 + *": { "margin-top": "0" },
		"h4 + *": { "margin-top": "0" },
		"table": {
			"font-size": em(16, 18),
			"line-height": round$1(24 / 16)
		},
		"thead th": {
			"padding-inline-end": em(12, 16),
			"padding-bottom": em(12, 16),
			"padding-inline-start": em(12, 16)
		},
		"thead th:first-child": { "padding-inline-start": "0" },
		"thead th:last-child": { "padding-inline-end": "0" },
		"tbody td, tfoot td": {
			"padding-top": em(12, 16),
			"padding-inline-end": em(12, 16),
			"padding-bottom": em(12, 16),
			"padding-inline-start": em(12, 16)
		},
		"tbody td:first-child, tfoot td:first-child": { "padding-inline-start": "0" },
		"tbody td:last-child, tfoot td:last-child": { "padding-inline-end": "0" },
		"figure": {
			"margin-top": em(32, 18),
			"margin-bottom": em(32, 18)
		},
		"figure > *": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"figcaption": {
			"font-size": em(16, 18),
			"line-height": round$1(24 / 16),
			"margin-top": em(16, 16)
		},
		"> :first-child": { "margin-top": "0" },
		"> :last-child": { "margin-bottom": "0" }
	},
	"xl": {
		"font-size": rem$1(20),
		"line-height": round$1(36 / 20),
		"p": {
			"margin-top": em(24, 20),
			"margin-bottom": em(24, 20)
		},
		"[class~=\"lead\"]": {
			"font-size": em(24, 20),
			"line-height": round$1(36 / 24),
			"margin-top": em(24, 24),
			"margin-bottom": em(24, 24)
		},
		"blockquote": {
			"margin-top": em(48, 30),
			"margin-bottom": em(48, 30),
			"padding-inline-start": em(32, 30)
		},
		"h1": {
			"font-size": em(56, 20),
			"margin-top": "0",
			"margin-bottom": em(48, 56),
			"line-height": round$1(56 / 56)
		},
		"h2": {
			"font-size": em(36, 20),
			"margin-top": em(56, 36),
			"margin-bottom": em(32, 36),
			"line-height": round$1(40 / 36)
		},
		"h3": {
			"font-size": em(30, 20),
			"margin-top": em(48, 30),
			"margin-bottom": em(20, 30),
			"line-height": round$1(40 / 30)
		},
		"h4": {
			"margin-top": em(36, 20),
			"margin-bottom": em(12, 20),
			"line-height": round$1(32 / 20)
		},
		"img": {
			"margin-top": em(40, 20),
			"margin-bottom": em(40, 20)
		},
		"picture": {
			"margin-top": em(40, 20),
			"margin-bottom": em(40, 20)
		},
		"picture > img": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"video": {
			"margin-top": em(40, 20),
			"margin-bottom": em(40, 20)
		},
		"kbd": {
			"font-size": em(18, 20),
			"border-radius": rem$1(5),
			"padding-top": em(5, 20),
			"padding-inline-end": em(8, 20),
			"padding-bottom": em(5, 20),
			"padding-inline-start": em(8, 20)
		},
		"code": { "font-size": em(18, 20) },
		"h2 code": { "font-size": em(31, 36) },
		"h3 code": { "font-size": em(27, 30) },
		"pre": {
			"font-size": em(18, 20),
			"line-height": round$1(32 / 18),
			"margin-top": em(36, 18),
			"margin-bottom": em(36, 18),
			"border-radius": rem$1(8),
			"padding-top": em(20, 18),
			"padding-inline-end": em(24, 18),
			"padding-bottom": em(20, 18),
			"padding-inline-start": em(24, 18)
		},
		"ol": {
			"margin-top": em(24, 20),
			"margin-bottom": em(24, 20),
			"padding-inline-start": em(32, 20)
		},
		"ul": {
			"margin-top": em(24, 20),
			"margin-bottom": em(24, 20),
			"padding-inline-start": em(32, 20)
		},
		"li": {
			"margin-top": em(12, 20),
			"margin-bottom": em(12, 20)
		},
		"ol > li": { "padding-inline-start": em(8, 20) },
		"ul > li": { "padding-inline-start": em(8, 20) },
		"> ul > li p": {
			"margin-top": em(16, 20),
			"margin-bottom": em(16, 20)
		},
		"> ul > li > p:first-child": { "margin-top": em(24, 20) },
		"> ul > li > p:last-child": { "margin-bottom": em(24, 20) },
		"> ol > li > p:first-child": { "margin-top": em(24, 20) },
		"> ol > li > p:last-child": { "margin-bottom": em(24, 20) },
		"ul ul, ul ol, ol ul, ol ol": {
			"margin-top": em(16, 20),
			"margin-bottom": em(16, 20)
		},
		"dl": {
			"margin-top": em(24, 20),
			"margin-bottom": em(24, 20)
		},
		"dt": { "margin-top": em(24, 20) },
		"dd": {
			"margin-top": em(12, 20),
			"padding-inline-start": em(32, 20)
		},
		"hr": {
			"margin-top": em(56, 20),
			"margin-bottom": em(56, 20)
		},
		"hr + *": { "margin-top": "0" },
		"h2 + *": { "margin-top": "0" },
		"h3 + *": { "margin-top": "0" },
		"h4 + *": { "margin-top": "0" },
		"table": {
			"font-size": em(18, 20),
			"line-height": round$1(28 / 18)
		},
		"thead th": {
			"padding-inline-end": em(12, 18),
			"padding-bottom": em(16, 18),
			"padding-inline-start": em(12, 18)
		},
		"thead th:first-child": { "padding-inline-start": "0" },
		"thead th:last-child": { "padding-inline-end": "0" },
		"tbody td, tfoot td": {
			"padding-top": em(16, 18),
			"padding-inline-end": em(12, 18),
			"padding-bottom": em(16, 18),
			"padding-inline-start": em(12, 18)
		},
		"tbody td:first-child, tfoot td:first-child": { "padding-inline-start": "0" },
		"tbody td:last-child, tfoot td:last-child": { "padding-inline-end": "0" },
		"figure": {
			"margin-top": em(40, 20),
			"margin-bottom": em(40, 20)
		},
		"figure > *": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"figcaption": {
			"font-size": em(18, 20),
			"line-height": round$1(28 / 18),
			"margin-top": em(18, 18)
		},
		"> :first-child": { "margin-top": "0" },
		"> :last-child": { "margin-bottom": "0" }
	},
	"2xl": {
		"font-size": rem$1(24),
		"line-height": round$1(40 / 24),
		"p": {
			"margin-top": em(32, 24),
			"margin-bottom": em(32, 24)
		},
		"[class~=\"lead\"]": {
			"font-size": em(30, 24),
			"line-height": round$1(44 / 30),
			"margin-top": em(32, 30),
			"margin-bottom": em(32, 30)
		},
		"blockquote": {
			"margin-top": em(64, 36),
			"margin-bottom": em(64, 36),
			"padding-inline-start": em(40, 36)
		},
		"h1": {
			"font-size": em(64, 24),
			"margin-top": "0",
			"margin-bottom": em(56, 64),
			"line-height": round$1(64 / 64)
		},
		"h2": {
			"font-size": em(48, 24),
			"margin-top": em(72, 48),
			"margin-bottom": em(40, 48),
			"line-height": round$1(52 / 48)
		},
		"h3": {
			"font-size": em(36, 24),
			"margin-top": em(56, 36),
			"margin-bottom": em(24, 36),
			"line-height": round$1(44 / 36)
		},
		"h4": {
			"margin-top": em(40, 24),
			"margin-bottom": em(16, 24),
			"line-height": round$1(36 / 24)
		},
		"img": {
			"margin-top": em(48, 24),
			"margin-bottom": em(48, 24)
		},
		"picture": {
			"margin-top": em(48, 24),
			"margin-bottom": em(48, 24)
		},
		"picture > img": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"video": {
			"margin-top": em(48, 24),
			"margin-bottom": em(48, 24)
		},
		"kbd": {
			"font-size": em(20, 24),
			"border-radius": rem$1(6),
			"padding-top": em(6, 24),
			"padding-inline-end": em(8, 24),
			"padding-bottom": em(6, 24),
			"padding-inline-start": em(8, 24)
		},
		"code": { "font-size": em(20, 24) },
		"h2 code": { "font-size": em(42, 48) },
		"h3 code": { "font-size": em(32, 36) },
		"pre": {
			"font-size": em(20, 24),
			"line-height": round$1(36 / 20),
			"margin-top": em(40, 20),
			"margin-bottom": em(40, 20),
			"border-radius": rem$1(8),
			"padding-top": em(24, 20),
			"padding-inline-end": em(32, 20),
			"padding-bottom": em(24, 20),
			"padding-inline-start": em(32, 20)
		},
		"ol": {
			"margin-top": em(32, 24),
			"margin-bottom": em(32, 24),
			"padding-inline-start": em(38, 24)
		},
		"ul": {
			"margin-top": em(32, 24),
			"margin-bottom": em(32, 24),
			"padding-inline-start": em(38, 24)
		},
		"li": {
			"margin-top": em(12, 24),
			"margin-bottom": em(12, 24)
		},
		"ol > li": { "padding-inline-start": em(10, 24) },
		"ul > li": { "padding-inline-start": em(10, 24) },
		"> ul > li p": {
			"margin-top": em(20, 24),
			"margin-bottom": em(20, 24)
		},
		"> ul > li > p:first-child": { "margin-top": em(32, 24) },
		"> ul > li > p:last-child": { "margin-bottom": em(32, 24) },
		"> ol > li > p:first-child": { "margin-top": em(32, 24) },
		"> ol > li > p:last-child": { "margin-bottom": em(32, 24) },
		"ul ul, ul ol, ol ul, ol ol": {
			"margin-top": em(16, 24),
			"margin-bottom": em(16, 24)
		},
		"dl": {
			"margin-top": em(32, 24),
			"margin-bottom": em(32, 24)
		},
		"dt": { "margin-top": em(32, 24) },
		"dd": {
			"margin-top": em(12, 24),
			"padding-inline-start": em(38, 24)
		},
		"hr": {
			"margin-top": em(72, 24),
			"margin-bottom": em(72, 24)
		},
		"hr + *": { "margin-top": "0" },
		"h2 + *": { "margin-top": "0" },
		"h3 + *": { "margin-top": "0" },
		"h4 + *": { "margin-top": "0" },
		"table": {
			"font-size": em(20, 24),
			"line-height": round$1(28 / 20)
		},
		"thead th": {
			"padding-inline-end": em(12, 20),
			"padding-bottom": em(16, 20),
			"padding-inline-start": em(12, 20)
		},
		"thead th:first-child": { "padding-inline-start": "0" },
		"thead th:last-child": { "padding-inline-end": "0" },
		"tbody td, tfoot td": {
			"padding-top": em(16, 20),
			"padding-inline-end": em(12, 20),
			"padding-bottom": em(16, 20),
			"padding-inline-start": em(12, 20)
		},
		"tbody td:first-child, tfoot td:first-child": { "padding-inline-start": "0" },
		"tbody td:last-child, tfoot td:last-child": { "padding-inline-end": "0" },
		"figure": {
			"margin-top": em(48, 24),
			"margin-bottom": em(48, 24)
		},
		"figure > *": {
			"margin-top": "0",
			"margin-bottom": "0"
		},
		"figcaption": {
			"font-size": em(20, 24),
			"line-height": round$1(32 / 20),
			"margin-top": em(20, 20)
		},
		"> :first-child": { "margin-top": "0" },
		"> :last-child": { "margin-bottom": "0" }
	}
};
function resolveColorScheme(userColorScheme) {
	const scheme = clone(defaultColorScheme);
	if (userColorScheme) for (const key in userColorScheme) {
		const [color, invertColor] = toArray(userColorScheme[key]);
		const [defaultColor, defaultInvertColor] = scheme[key];
		scheme[key] = [color ?? defaultColor, invertColor ?? defaultInvertColor];
	}
	return scheme;
}
function resolveSizeScheme(userSizeScheme) {
	if (userSizeScheme) return mergeDeep(ProseDefaultSize, userSizeScheme);
	return ProseDefaultSize;
}
function getCSS(preflights, options) {
	const selectorName = options.selectorName || "prose";
	const notProseSelector = `:not(:where([class~="not-${selectorName}"],[class~="not-${selectorName}"] *))`;
	const important = options.important === true;
	let css = "";
	for (const [selectorOrKey, cssObjectOrValue] of Object.entries(preflights)) if (typeof cssObjectOrValue !== "object") css += `${selectorOrKey}:${cssObjectOrValue}${important ? " !important" : ""};`;
	else {
		const [selectorOrGroup, pseudo] = selectorOrKey.split("::");
		const _selector = `:where(${selectorOrGroup})${notProseSelector}${pseudo ? `::${pseudo}` : ""}`;
		css += `${_selector} {`;
		for (const [key, value] of Object.entries(cssObjectOrValue)) css += `${key}:${value}${important ? " !important" : ""};`;
		css += `}`;
	}
	return css;
}
function getElements(modifier) {
	for (const [name, ...selectors] of modifiers) if (name === modifier) return selectors.length > 0 ? selectors : [name];
}
var src_default$3 = definePreset((options) => {
	const selectorName = options?.selectorName ?? "prose";
	const disableNotUtility = options?.compatibility?.noColonNot || options?.compatibility?.noColonWhere;
	const cssVarPrefix = options?.cssVarPrefix ?? "--un-prose";
	const resolvedColorScheme = resolveColorScheme(options?.colorScheme);
	const resolvedSizeScheme = resolveSizeScheme(options?.sizeScheme);
	const extended = (entries, theme) => {
		const merged = mergeDeep(entries, (typeof options?.cssExtend === "function" ? options?.cssExtend(theme) : options?.cssExtend) ?? {});
		for (const key in merged) {
			const value = merged[key];
			if (value == null || typeof value === "object" && Object.keys(value).length === 0) delete merged[key];
		}
		return merged;
	};
	const normalizeSelector = (s) => {
		if (typeof options?.important === "string") s = `${options.important} ${s}`;
		if (!options?.compatibility?.noColonIs) s = `:is(${s})`;
		return s;
	};
	const defaultRE = /* @__PURE__ */ new RegExp(`^${selectorName}-default$`);
	const colorsRE = /* @__PURE__ */ new RegExp(`^${selectorName}-([-\\w]+)$`);
	const sizeRE = /* @__PURE__ */ new RegExp(`^${selectorName}-(${Object.keys(resolvedSizeScheme).join("|")})$`);
	return {
		name: "@unocss/preset-typography",
		enforce: "post",
		layers: { typography: -20 },
		shortcuts: [[
			selectorName,
			[`${selectorName}-default`, `${selectorName}-gray`],
			{ layer: "typography" }
		]],
		rules: [
			[
				defaultRE,
				(_, { symbols: symbols$1, theme }) => {
					const css = getCSS(extended(mergeDeep(ProseDefaultCSSObject, ProseDefaultSize.base), theme), options ?? {});
					return {
						[symbols$1.body]: css,
						[symbols$1.selector]: normalizeSelector
					};
				},
				{
					layer: "typography",
					autocomplete: "prose",
					internal: true
				}
			],
			[
				colorsRE,
				([, color], { theme, symbols: symbols$1 }) => {
					const baseColor = theme.colors?.[color];
					if (!baseColor || typeof baseColor !== "object") return;
					if ([
						"red",
						"orange",
						"amber",
						"yellow",
						"lime",
						"green",
						"emerald",
						"teal",
						"cyan",
						"sky",
						"blue",
						"indigo",
						"violet",
						"purple",
						"fuchsia",
						"pink",
						"rose"
					].includes(color)) return {
						[`${cssVarPrefix}-links`]: baseColor["600"],
						[`${cssVarPrefix}-invert-links`]: baseColor["500"],
						[symbols$1.selector]: normalizeSelector
					};
					else return Object.entries(resolvedColorScheme).reduce((acc, [key, value]) => {
						const [colorKey, invertKey] = value;
						const resolve = (key$1) => baseColor[key$1] ?? theme[key$1] ?? key$1;
						const color$1 = resolve(colorKey);
						const invertColor = resolve(invertKey);
						const cssVarColorKey = `${cssVarPrefix}-${key}`;
						const cssVarInvertColorKey = `${cssVarPrefix}-invert-${key}`;
						acc[cssVarColorKey] = colorToString(color$1, `var(${cssVarColorKey}-opacity)`);
						acc[cssVarInvertColorKey] = colorToString(invertColor, `var(${cssVarInvertColorKey}-opacity)`);
						for (const [c, k] of [[color$1, `${cssVarColorKey}-opacity`], [invertColor, `${cssVarInvertColorKey}-opacity`]]) if (alphaPlaceholders.some((p) => c.includes(p))) acc[k] = "1";
						return acc;
					}, { [symbols$1.selector]: normalizeSelector });
				},
				{
					layer: "typography",
					autocomplete: `${selectorName}-$colors`
				}
			],
			[
				sizeRE,
				([, size], { symbols: symbols$1, theme }) => {
					const css = getCSS(extended(resolvedSizeScheme[size], theme), options ?? {});
					return {
						[symbols$1.body]: css,
						[symbols$1.selector]: normalizeSelector
					};
				},
				{
					layer: "typography",
					autocomplete: `${selectorName}-(${Object.keys(resolvedSizeScheme).join("|")})`
				}
			],
			[
				`${selectorName}-invert`,
				[{
					[`${cssVarPrefix}-body`]: `var(${cssVarPrefix}-invert-body)`,
					[`${cssVarPrefix}-headings`]: `var(${cssVarPrefix}-invert-headings)`,
					[`${cssVarPrefix}-lead`]: `var(${cssVarPrefix}-invert-lead)`,
					[`${cssVarPrefix}-links`]: `var(${cssVarPrefix}-invert-links)`,
					[`${cssVarPrefix}-bold`]: `var(${cssVarPrefix}-invert-bold)`,
					[`${cssVarPrefix}-counters`]: `var(${cssVarPrefix}-invert-counters)`,
					[`${cssVarPrefix}-bullets`]: `var(${cssVarPrefix}-invert-bullets)`,
					[`${cssVarPrefix}-hr`]: `var(${cssVarPrefix}-invert-hr)`,
					[`${cssVarPrefix}-quotes`]: `var(${cssVarPrefix}-invert-quotes)`,
					[`${cssVarPrefix}-quote-borders`]: `var(${cssVarPrefix}-invert-quote-borders)`,
					[`${cssVarPrefix}-captions`]: `var(${cssVarPrefix}-invert-captions)`,
					[`${cssVarPrefix}-kbd`]: `var(${cssVarPrefix}-invert-kbd)`,
					[`${cssVarPrefix}-kbd-shadows`]: `var(${cssVarPrefix}-invert-kbd-shadows)`,
					[`${cssVarPrefix}-code`]: `var(${cssVarPrefix}-invert-code)`,
					[`${cssVarPrefix}-pre-code`]: `var(${cssVarPrefix}-invert-pre-code)`,
					[`${cssVarPrefix}-pre-bg`]: `var(${cssVarPrefix}-invert-pre-bg)`,
					[`${cssVarPrefix}-th-borders`]: `var(${cssVarPrefix}-invert-th-borders)`,
					[`${cssVarPrefix}-td-borders`]: `var(${cssVarPrefix}-invert-td-borders)`,
					[symbols.selector]: normalizeSelector
				}],
				{ layer: "typography" }
			]
		],
		variants: [{
			name: "typography element modifiers",
			match: (matcher) => {
				if (matcher.startsWith(`${selectorName}-`)) {
					const modifyRe = /* @__PURE__ */ new RegExp(`^${selectorName}-(\\w+)[:-].+$`);
					const modifier = matcher.match(modifyRe)?.[1];
					if (modifier) {
						const elements = getElements(modifier);
						if (elements?.length) return {
							matcher: matcher.slice(selectorName.length + modifier.length + 2),
							selector: (s) => {
								const notProseSelector = `:not(:where([class~="not-${selectorName}"],[class~="not-${selectorName}"] *))`;
								return disableNotUtility ? elements.map((e) => `${s} ${e}`).join(",") : `${s} :is(:where(${elements})${notProseSelector})`;
							}
						};
					}
				}
			},
			autocomplete: `${selectorName}-(${modifiers.map((m) => `${m[0]}:`).join("|")})`
		}]
	};
});
//#endregion
//#region node_modules/@unocss/preset-wind3/dist/container-re6ef8hp.mjs
var queryMatcher$1 = /@media \(min-width: (.+)\)/;
var container$2 = [[
	/^__container$/,
	(m, context) => {
		const { theme, variantHandlers } = context;
		const themePadding = theme.container?.padding;
		let padding;
		if (isString(themePadding)) padding = themePadding;
		else padding = themePadding?.DEFAULT;
		const themeMaxWidth = theme.container?.maxWidth;
		let maxWidth;
		for (const v of variantHandlers) {
			const query = v.handle?.({}, (x) => x)?.parent;
			if (isString(query)) {
				const match = query.match(queryMatcher$1)?.[1];
				if (match) {
					const matchBp = (resolveBreakpoints$1(context) ?? []).find((i) => i.size === match)?.point;
					if (!themeMaxWidth) maxWidth = match;
					else if (matchBp) maxWidth = themeMaxWidth?.[matchBp];
					if (matchBp && !isString(themePadding)) padding = themePadding?.[matchBp] ?? padding;
				}
			}
		}
		const css = { "max-width": maxWidth };
		if (!variantHandlers.length) css.width = "100%";
		if (theme.container?.center) {
			css["margin-left"] = "auto";
			css["margin-right"] = "auto";
		}
		if (themePadding) {
			css["padding-left"] = padding;
			css["padding-right"] = padding;
		}
		return css;
	},
	{ internal: true }
]];
var containerShortcuts$1 = [[/^(?:(\w+)[:-])?container$/, ([, bp], context) => {
	let points = (resolveBreakpoints$1(context) ?? []).map((i) => i.point);
	if (bp) {
		if (!points.includes(bp)) return;
		points = points.slice(points.indexOf(bp));
	}
	const shortcuts = points.map((p) => `${p}:__container`);
	if (!bp) shortcuts.unshift("__container");
	return shortcuts;
}]];
//#endregion
//#region node_modules/@unocss/preset-wind3/dist/rules.mjs
var animations$1 = [
	[
		/^(?:animate-)?keyframes-(.+)$/,
		([, name], { theme }) => {
			const kf = theme.animation?.keyframes?.[name];
			if (kf) return [`@keyframes ${name}${kf}`, { animation: name }];
		},
		{ autocomplete: ["animate-keyframes-$animation.keyframes", "keyframes-$animation.keyframes"] }
	],
	[
		/^animate-(.+)$/,
		([, name], { theme }) => {
			const kf = theme.animation?.keyframes?.[name];
			if (kf) {
				const duration = theme.animation?.durations?.[name] ?? "1s";
				const timing = theme.animation?.timingFns?.[name] ?? "linear";
				const count = theme.animation?.counts?.[name] ?? 1;
				const props = theme.animation?.properties?.[name];
				return [`@keyframes ${name}${kf}`, {
					animation: `${name} ${duration} ${timing} ${count}`,
					...props
				}];
			}
			return { animation: h$1.bracket.cssvar(name) };
		},
		{ autocomplete: "animate-$animation.keyframes" }
	],
	[/^animate-name-(.+)/, ([, d]) => ({ "animation-name": h$1.bracket.cssvar(d) ?? d })],
	[
		/^animate-duration-(.+)$/,
		([, d], { theme }) => ({ "animation-duration": theme.duration?.[d || "DEFAULT"] ?? h$1.bracket.cssvar.time(d) }),
		{ autocomplete: ["animate-duration", "animate-duration-$duration"] }
	],
	[
		/^animate-delay-(.+)$/,
		([, d], { theme }) => ({ "animation-delay": theme.duration?.[d || "DEFAULT"] ?? h$1.bracket.cssvar.time(d) }),
		{ autocomplete: ["animate-delay", "animate-delay-$duration"] }
	],
	[
		/^animate-ease(?:-(.+))?$/,
		([, d], { theme }) => ({ "animation-timing-function": theme.easing?.[d || "DEFAULT"] ?? h$1.bracket.cssvar(d) }),
		{ autocomplete: ["animate-ease", "animate-ease-$easing"] }
	],
	[
		/^animate-(fill-mode-|fill-|mode-)?(.+)$/,
		([, t, d]) => [
			"none",
			"forwards",
			"backwards",
			"both",
			...[t ? globalKeywords$1 : []]
		].includes(d) ? { "animation-fill-mode": d } : void 0,
		{ autocomplete: [
			"animate-(fill|mode|fill-mode)",
			"animate-(fill|mode|fill-mode)-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)",
			"animate-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)"
		] }
	],
	[
		/^animate-(direction-)?(.+)$/,
		([, t, d]) => [
			"normal",
			"reverse",
			"alternate",
			"alternate-reverse",
			...[t ? globalKeywords$1 : []]
		].includes(d) ? { "animation-direction": d } : void 0,
		{ autocomplete: [
			"animate-direction",
			"animate-direction-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)",
			"animate-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)"
		] }
	],
	[
		/^animate-(?:iteration-count-|iteration-|count-)(.+)$/,
		([, d]) => ({ "animation-iteration-count": h$1.bracket.cssvar(d) ?? d.replace(/-/g, ",") }),
		{ autocomplete: ["animate-(iteration|count|iteration-count)", "animate-(iteration|count|iteration-count)-<num>"] }
	],
	[
		/^animate-(play-state-|play-|state-)?(.+)$/,
		([, t, d]) => [
			"paused",
			"running",
			...[t ? globalKeywords$1 : []]
		].includes(d) ? { "animation-play-state": d } : void 0,
		{ autocomplete: [
			"animate-(play|state|play-state)",
			"animate-(play|state|play-state)-(paused|running|inherit|initial|revert|revert-layer|unset)",
			"animate-(paused|running|inherit|initial|revert|revert-layer|unset)"
		] }
	],
	["animate-none", { animation: "none" }],
	...makeGlobalStaticRules$1("animate", "animation")
];
function bgGradientToValue(cssColor) {
	if (cssColor) return colorToString(cssColor, 0);
	return "rgb(255 255 255 / 0)";
}
function bgGradientColorValue(mode, cssColor, color, alpha) {
	if (cssColor) if (alpha != null) return colorToString(cssColor, alpha);
	else return colorToString(cssColor, `var(--un-${mode}-opacity, ${colorOpacityToString(cssColor)})`);
	return colorToString(color, alpha);
}
function bgGradientColorResolver$1() {
	return ([, mode, body], { theme }) => {
		const data = parseColor$1(body, theme, "backgroundColor");
		if (!data) return;
		const { alpha, color, cssColor } = data;
		if (!color) return;
		const colorString = bgGradientColorValue(mode, cssColor, color, alpha);
		switch (mode) {
			case "from": return {
				"--un-gradient-from-position": "0%",
				"--un-gradient-from": `${colorString} var(--un-gradient-from-position)`,
				"--un-gradient-to-position": "100%",
				"--un-gradient-to": `${bgGradientToValue(cssColor)} var(--un-gradient-to-position)`,
				"--un-gradient-stops": "var(--un-gradient-from), var(--un-gradient-to)"
			};
			case "via": return {
				"--un-gradient-via-position": "50%",
				"--un-gradient-to": bgGradientToValue(cssColor),
				"--un-gradient-stops": `var(--un-gradient-from), ${colorString} var(--un-gradient-via-position), var(--un-gradient-to)`
			};
			case "to": return {
				"--un-gradient-to-position": "100%",
				"--un-gradient-to": `${colorString} var(--un-gradient-to-position)`
			};
		}
	};
}
function bgGradientPositionResolver$1() {
	return ([, mode, body]) => {
		return { [`--un-gradient-${mode}-position`]: `${Number(h$1.bracket.cssvar.percent(body)) * 100}%` };
	};
}
var backgroundStyles$1 = [
	[
		/^bg-gradient-(.+)$/,
		([, d]) => ({ "--un-gradient": h$1.bracket(d) }),
		{ autocomplete: [
			"bg-gradient",
			"bg-gradient-(from|to|via)",
			"bg-gradient-(from|to|via)-$colors",
			"bg-gradient-(from|to|via)-(op|opacity)",
			"bg-gradient-(from|to|via)-(op|opacity)-<percent>"
		] }
	],
	[/^(?:bg-gradient-)?stops-(\[.+\])$/, ([, s]) => ({ "--un-gradient-stops": h$1.bracket(s) })],
	[/^(?:bg-gradient-)?(from)-(.+)$/, bgGradientColorResolver$1()],
	[/^(?:bg-gradient-)?(via)-(.+)$/, bgGradientColorResolver$1()],
	[/^(?:bg-gradient-)?(to)-(.+)$/, bgGradientColorResolver$1()],
	[/^(?:bg-gradient-)?(from|via|to)-op(?:acity)?-?(.+)$/, ([, position, opacity]) => ({ [`--un-${position}-opacity`]: h$1.bracket.percent(opacity) })],
	[/^(from|via|to)-([\d.]+)%$/, bgGradientPositionResolver$1()],
	[
		/^bg-gradient-((?:repeating-)?(?:linear|radial|conic))$/,
		([, s]) => ({ "background-image": `${s}-gradient(var(--un-gradient, var(--un-gradient-stops, rgb(255 255 255 / 0))))` }),
		{ autocomplete: [
			"bg-gradient-repeating",
			"bg-gradient-(linear|radial|conic)",
			"bg-gradient-repeating-(linear|radial|conic)"
		] }
	],
	[
		/^bg-gradient-to-([rltb]{1,2})$/,
		([, d]) => {
			if (d in positionMap$1) return {
				"--un-gradient-shape": `to ${positionMap$1[d]} in oklch`,
				"--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)",
				"background-image": "linear-gradient(var(--un-gradient))"
			};
		},
		{ autocomplete: `bg-gradient-to-(${Object.keys(positionMap$1).filter((k) => k.length <= 2 && Array.from(k).every((c) => "rltb".includes(c))).join("|")})` }
	],
	[
		/^(?:bg-gradient-)?shape-(.+)$/,
		([, d]) => {
			const v = d in positionMap$1 ? `to ${positionMap$1[d]}` : h$1.bracket(d);
			if (v != null) return {
				"--un-gradient-shape": `${v} in oklch`,
				"--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)"
			};
		},
		{ autocomplete: [
			"bg-gradient-shape",
			`bg-gradient-shape-(${Object.keys(positionMap$1).join("|")})`,
			`shape-(${Object.keys(positionMap$1).join("|")})`
		] }
	],
	["bg-none", { "background-image": "none" }],
	["box-decoration-slice", { "box-decoration-break": "slice" }],
	["box-decoration-clone", { "box-decoration-break": "clone" }],
	...makeGlobalStaticRules$1("box-decoration", "box-decoration-break"),
	["bg-auto", { "background-size": "auto" }],
	["bg-cover", { "background-size": "cover" }],
	["bg-contain", { "background-size": "contain" }],
	["bg-fixed", { "background-attachment": "fixed" }],
	["bg-local", { "background-attachment": "local" }],
	["bg-scroll", { "background-attachment": "scroll" }],
	["bg-clip-border", {
		"-webkit-background-clip": "border-box",
		"background-clip": "border-box"
	}],
	["bg-clip-content", {
		"-webkit-background-clip": "content-box",
		"background-clip": "content-box"
	}],
	["bg-clip-padding", {
		"-webkit-background-clip": "padding-box",
		"background-clip": "padding-box"
	}],
	["bg-clip-text", {
		"-webkit-background-clip": "text",
		"background-clip": "text"
	}],
	...globalKeywords$1.map((keyword) => [`bg-clip-${keyword}`, {
		"-webkit-background-clip": keyword,
		"background-clip": keyword
	}]),
	[/^bg-([-\w]{3,})$/, ([, s]) => ({ "background-position": positionMap$1[s] })],
	["bg-repeat", { "background-repeat": "repeat" }],
	["bg-no-repeat", { "background-repeat": "no-repeat" }],
	["bg-repeat-x", { "background-repeat": "repeat-x" }],
	["bg-repeat-y", { "background-repeat": "repeat-y" }],
	["bg-repeat-round", { "background-repeat": "round" }],
	["bg-repeat-space", { "background-repeat": "space" }],
	...makeGlobalStaticRules$1("bg-repeat", "background-repeat"),
	["bg-origin-border", { "background-origin": "border-box" }],
	["bg-origin-padding", { "background-origin": "padding-box" }],
	["bg-origin-content", { "background-origin": "content-box" }],
	...makeGlobalStaticRules$1("bg-origin", "background-origin")
];
var listStyles$1 = {
	"disc": "disc",
	"circle": "circle",
	"square": "square",
	"decimal": "decimal",
	"zero-decimal": "decimal-leading-zero",
	"greek": "lower-greek",
	"roman": "lower-roman",
	"upper-roman": "upper-roman",
	"alpha": "lower-alpha",
	"upper-alpha": "upper-alpha",
	"latin": "lower-latin",
	"upper-latin": "upper-latin"
};
var listStyle$1 = [
	[
		/^list-(.+?)(?:-(outside|inside))?$/,
		([, alias, position]) => {
			const style = listStyles$1[alias];
			if (style) {
				if (position) return {
					"list-style-position": position,
					"list-style-type": style
				};
				return { "list-style-type": style };
			}
		},
		{ autocomplete: [`list-(${Object.keys(listStyles$1).join("|")})`, `list-(${Object.keys(listStyles$1).join("|")})-(outside|inside)`] }
	],
	["list-outside", { "list-style-position": "outside" }],
	["list-inside", { "list-style-position": "inside" }],
	["list-none", { "list-style-type": "none" }],
	[/^list-image-(.+)$/, ([, d]) => {
		if (/^\[url\(.+\)\]$/.test(d)) return { "list-style-image": h$1.bracket(d) };
	}],
	["list-image-none", { "list-style-image": "none" }],
	...makeGlobalStaticRules$1("list", "list-style-type")
];
var accents$1 = [[
	/^accent-(.+)$/,
	colorResolver$1("accent-color", "accent", "accentColor"),
	{ autocomplete: "accent-$colors" }
], [
	/^accent-op(?:acity)?-?(.+)$/,
	([, d]) => ({ "--un-accent-opacity": h$1.bracket.percent(d) }),
	{ autocomplete: ["accent-(op|opacity)", "accent-(op|opacity)-<percent>"] }
]];
var carets$1 = [[
	/^caret-(.+)$/,
	colorResolver$1("caret-color", "caret", "textColor"),
	{ autocomplete: "caret-$colors" }
], [
	/^caret-op(?:acity)?-?(.+)$/,
	([, d]) => ({ "--un-caret-opacity": h$1.bracket.percent(d) }),
	{ autocomplete: ["caret-(op|opacity)", "caret-(op|opacity)-<percent>"] }
]];
var imageRenderings$1 = [
	["image-render-auto", { "image-rendering": "auto" }],
	["image-render-edge", { "image-rendering": "crisp-edges" }],
	["image-render-pixel", [
		["-ms-interpolation-mode", "nearest-neighbor"],
		["image-rendering", "-webkit-optimize-contrast"],
		["image-rendering", "-moz-crisp-edges"],
		["image-rendering", "-o-pixelated"],
		["image-rendering", "pixelated"]
	]]
];
var overscrolls$1 = [
	["overscroll-auto", { "overscroll-behavior": "auto" }],
	["overscroll-contain", { "overscroll-behavior": "contain" }],
	["overscroll-none", { "overscroll-behavior": "none" }],
	...makeGlobalStaticRules$1("overscroll", "overscroll-behavior"),
	["overscroll-x-auto", { "overscroll-behavior-x": "auto" }],
	["overscroll-x-contain", { "overscroll-behavior-x": "contain" }],
	["overscroll-x-none", { "overscroll-behavior-x": "none" }],
	...makeGlobalStaticRules$1("overscroll-x", "overscroll-behavior-x"),
	["overscroll-y-auto", { "overscroll-behavior-y": "auto" }],
	["overscroll-y-contain", { "overscroll-behavior-y": "contain" }],
	["overscroll-y-none", { "overscroll-behavior-y": "none" }],
	...makeGlobalStaticRules$1("overscroll-y", "overscroll-behavior-y")
];
var scrollBehaviors$1 = [
	["scroll-auto", { "scroll-behavior": "auto" }],
	["scroll-smooth", { "scroll-behavior": "smooth" }],
	...makeGlobalStaticRules$1("scroll", "scroll-behavior")
];
var columns$1 = [
	[
		/^columns-(.+)$/,
		([, v], { theme }) => {
			if (theme.containers && v in theme.containers) return { columns: theme.containers[v] };
			return { columns: h$1.bracket.numberWithUnit.number.cssvar(v) };
		},
		{ autocomplete: ["columns-<num>", "columns-$containers"] }
	],
	["columns-auto", { columns: "auto" }],
	["break-before-auto", { "break-before": "auto" }],
	["break-before-avoid", { "break-before": "avoid" }],
	["break-before-all", { "break-before": "all" }],
	["break-before-avoid-page", { "break-before": "avoid-page" }],
	["break-before-page", { "break-before": "page" }],
	["break-before-left", { "break-before": "left" }],
	["break-before-right", { "break-before": "right" }],
	["break-before-column", { "break-before": "column" }],
	...makeGlobalStaticRules$1("break-before"),
	["break-inside-auto", { "break-inside": "auto" }],
	["break-inside-avoid", { "break-inside": "avoid" }],
	["break-inside-avoid-page", { "break-inside": "avoid-page" }],
	["break-inside-avoid-column", { "break-inside": "avoid-column" }],
	...makeGlobalStaticRules$1("break-inside"),
	["break-after-auto", { "break-after": "auto" }],
	["break-after-avoid", { "break-after": "avoid" }],
	["break-after-all", { "break-after": "all" }],
	["break-after-avoid-page", { "break-after": "avoid-page" }],
	["break-after-page", { "break-after": "page" }],
	["break-after-left", { "break-after": "left" }],
	["break-after-right", { "break-after": "right" }],
	["break-after-column", { "break-after": "column" }],
	...makeGlobalStaticRules$1("break-after")
];
var divides$1 = [
	[
		/^divide-?([xy])$/,
		handlerDivide$1,
		{ autocomplete: [
			"divide-(x|y|block|inline)",
			"divide-(x|y|block|inline)-reverse",
			"divide-(x|y|block|inline)-$lineWidth"
		] }
	],
	[/^divide-?([xy])-?(.+)$/, handlerDivide$1],
	[/^divide-?([xy])-reverse$/, ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 })],
	[/^divide-(block|inline)$/, handlerDivide$1],
	[/^divide-(block|inline)-(.+)$/, handlerDivide$1],
	[/^divide-(block|inline)-reverse$/, ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 })],
	[
		/^divide-(.+)$/,
		colorResolver$1("border-color", "divide", "borderColor"),
		{ autocomplete: "divide-$colors" }
	],
	[
		/^divide-op(?:acity)?-?(.+)$/,
		([, opacity]) => ({ "--un-divide-opacity": h$1.bracket.percent(opacity) }),
		{ autocomplete: ["divide-(op|opacity)", "divide-(op|opacity)-<percent>"] }
	],
	...borderStyles$1.map((style) => [`divide-${style}`, { "border-style": style }])
];
function handlerDivide$1([, d, s], { theme }) {
	let v = theme.lineWidth?.[s || "DEFAULT"] ?? h$1.bracket.cssvar.px(s || "1");
	if (v != null) {
		if (v === "0") v = "0px";
		const results = directionMap$1[d].map((item) => {
			return [`border${item}-width`, item.endsWith("right") || item.endsWith("bottom") ? `calc(${v} * var(--un-divide-${d}-reverse))` : `calc(${v} * calc(1 - var(--un-divide-${d}-reverse)))`];
		});
		if (results) return [[`--un-divide-${d}-reverse`, 0], ...results];
	}
}
var filterBase = {
	"--un-blur": " ",
	"--un-brightness": " ",
	"--un-contrast": " ",
	"--un-drop-shadow": " ",
	"--un-grayscale": " ",
	"--un-hue-rotate": " ",
	"--un-invert": " ",
	"--un-saturate": " ",
	"--un-sepia": " "
};
var filterBaseKeys$1 = Object.keys(filterBase);
var filterMetaCustom = { preflightKeys: filterBaseKeys$1 };
var filterProperty = "var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia)";
var backdropFilterBase = {
	"--un-backdrop-blur": " ",
	"--un-backdrop-brightness": " ",
	"--un-backdrop-contrast": " ",
	"--un-backdrop-grayscale": " ",
	"--un-backdrop-hue-rotate": " ",
	"--un-backdrop-invert": " ",
	"--un-backdrop-opacity": " ",
	"--un-backdrop-saturate": " ",
	"--un-backdrop-sepia": " "
};
var backdropFilterBaseKeys = Object.keys(backdropFilterBase);
var backdropMetaCustom = { preflightKeys: backdropFilterBaseKeys };
var backdropFilterProperty = "var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia)";
var composeMetaCustom = { preflightKeys: [...filterBaseKeys$1, ...backdropFilterBaseKeys] };
function percentWithDefault$1(str) {
	let v = h$1.bracket.cssvar(str || "");
	if (v != null) return v;
	v = str ? h$1.percent(str) : "1";
	if (v != null && Number.parseFloat(v) <= 1) return v;
}
function toFilter$1(varName, resolver) {
	return ([, b, s], { theme }) => {
		const value = resolver(s, theme) ?? (s === "none" ? "0" : "");
		if (value !== "") if (b) return {
			[`--un-${b}${varName}`]: `${varName}(${value})`,
			"-webkit-backdrop-filter": backdropFilterProperty,
			"backdrop-filter": backdropFilterProperty
		};
		else return {
			[`--un-${varName}`]: `${varName}(${value})`,
			filter: filterProperty
		};
	};
}
function dropShadowResolver$1([, s], { theme }) {
	let v = theme.dropShadow?.[s || "DEFAULT"];
	if (v != null) {
		const shadows = colorableShadows$1(v, "--un-drop-shadow-color");
		return {
			"--un-drop-shadow": `drop-shadow(${shadows.join(") drop-shadow(")})`,
			"filter": filterProperty
		};
	}
	v = h$1.bracket.cssvar(s);
	if (v != null) return {
		"--un-drop-shadow": `drop-shadow(${v})`,
		"filter": filterProperty
	};
}
var filters$1 = [
	[
		/^(?:(backdrop-)|filter-)?blur(?:-(.+))?$/,
		toFilter$1("blur", (s, theme) => theme.blur?.[s || "DEFAULT"] || h$1.bracket.cssvar.px(s)),
		{
			custom: composeMetaCustom,
			autocomplete: [
				"(backdrop|filter)-blur-$blur",
				"blur-$blur",
				"filter-blur"
			]
		}
	],
	[
		/^(?:(backdrop-)|filter-)?brightness-(.+)$/,
		toFilter$1("brightness", (s) => h$1.bracket.cssvar.percent(s)),
		{
			custom: composeMetaCustom,
			autocomplete: ["(backdrop|filter)-brightness-<percent>", "brightness-<percent>"]
		}
	],
	[
		/^(?:(backdrop-)|filter-)?contrast-(.+)$/,
		toFilter$1("contrast", (s) => h$1.bracket.cssvar.percent(s)),
		{
			custom: composeMetaCustom,
			autocomplete: ["(backdrop|filter)-contrast-<percent>", "contrast-<percent>"]
		}
	],
	[
		/^(?:filter-)?drop-shadow(?:-(.+))?$/,
		dropShadowResolver$1,
		{
			custom: filterMetaCustom,
			autocomplete: [
				"filter-drop",
				"filter-drop-shadow",
				"filter-drop-shadow-color",
				"drop-shadow",
				"drop-shadow-color",
				"filter-drop-shadow-$dropShadow",
				"drop-shadow-$dropShadow",
				"filter-drop-shadow-color-$colors",
				"drop-shadow-color-$colors",
				"filter-drop-shadow-color-(op|opacity)",
				"drop-shadow-color-(op|opacity)",
				"filter-drop-shadow-color-(op|opacity)-<percent>",
				"drop-shadow-color-(op|opacity)-<percent>"
			]
		}
	],
	[/^(?:filter-)?drop-shadow-color-(.+)$/, colorResolver$1("--un-drop-shadow-color", "drop-shadow", "shadowColor")],
	[/^(?:filter-)?drop-shadow-color-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-drop-shadow-opacity": h$1.bracket.percent(opacity) })],
	[
		/^(?:(backdrop-)|filter-)?grayscale(?:-(.+))?$/,
		toFilter$1("grayscale", percentWithDefault$1),
		{
			custom: composeMetaCustom,
			autocomplete: [
				"(backdrop|filter)-grayscale",
				"(backdrop|filter)-grayscale-<percent>",
				"grayscale-<percent>"
			]
		}
	],
	[
		/^(?:(backdrop-)|filter-)?hue-rotate-(.+)$/,
		toFilter$1("hue-rotate", (s) => h$1.bracket.cssvar.degree(s)),
		{ custom: composeMetaCustom }
	],
	[
		/^(?:(backdrop-)|filter-)?invert(?:-(.+))?$/,
		toFilter$1("invert", percentWithDefault$1),
		{
			custom: composeMetaCustom,
			autocomplete: [
				"(backdrop|filter)-invert",
				"(backdrop|filter)-invert-<percent>",
				"invert-<percent>"
			]
		}
	],
	[
		/^(backdrop-)op(?:acity)?-(.+)$/,
		toFilter$1("opacity", (s) => h$1.bracket.cssvar.percent(s)),
		{
			custom: composeMetaCustom,
			autocomplete: ["backdrop-(op|opacity)", "backdrop-(op|opacity)-<percent>"]
		}
	],
	[
		/^(?:(backdrop-)|filter-)?saturate-(.+)$/,
		toFilter$1("saturate", (s) => h$1.bracket.cssvar.percent(s)),
		{
			custom: composeMetaCustom,
			autocomplete: [
				"(backdrop|filter)-saturate",
				"(backdrop|filter)-saturate-<percent>",
				"saturate-<percent>"
			]
		}
	],
	[
		/^(?:(backdrop-)|filter-)?sepia(?:-(.+))?$/,
		toFilter$1("sepia", percentWithDefault$1),
		{
			custom: composeMetaCustom,
			autocomplete: [
				"(backdrop|filter)-sepia",
				"(backdrop|filter)-sepia-<percent>",
				"sepia-<percent>"
			]
		}
	],
	[
		"filter",
		{ filter: filterProperty },
		{ custom: filterMetaCustom }
	],
	[
		"backdrop-filter",
		{
			"-webkit-backdrop-filter": backdropFilterProperty,
			"backdrop-filter": backdropFilterProperty
		},
		{ custom: backdropMetaCustom }
	],
	["filter-none", { filter: "none" }],
	["backdrop-filter-none", {
		"-webkit-backdrop-filter": "none",
		"backdrop-filter": "none"
	}],
	...globalKeywords$1.map((keyword) => [`filter-${keyword}`, { filter: keyword }]),
	...globalKeywords$1.map((keyword) => [`backdrop-filter-${keyword}`, {
		"-webkit-backdrop-filter": keyword,
		"backdrop-filter": keyword
	}])
];
var lineClamps$1 = [[
	/^line-clamp-(\d+)$/,
	([, v]) => ({
		"overflow": "hidden",
		"display": "-webkit-box",
		"-webkit-box-orient": "vertical",
		"-webkit-line-clamp": v,
		"line-clamp": v
	}),
	{ autocomplete: ["line-clamp", "line-clamp-<num>"] }
], ...["none", ...globalKeywords$1].map((keyword) => [`line-clamp-${keyword}`, {
	"overflow": "visible",
	"display": "block",
	"-webkit-box-orient": "horizontal",
	"-webkit-line-clamp": keyword,
	"line-clamp": keyword
}])];
var placeholders$1 = [[
	/^\$ placeholder-(.+)$/,
	colorResolver$1("color", "placeholder", "accentColor"),
	{ autocomplete: "placeholder-$colors" }
], [
	/^\$ placeholder-op(?:acity)?-?(.+)$/,
	([, opacity]) => ({ "--un-placeholder-opacity": h$1.bracket.percent(opacity) }),
	{ autocomplete: ["placeholder-(op|opacity)", "placeholder-(op|opacity)-<percent>"] }
]];
var scrollSnapTypeBase = { "--un-scroll-snap-strictness": "proximity" };
var custom$3 = { preflightKeys: Object.keys(scrollSnapTypeBase) };
var scrolls$1 = [
	[
		/^snap-(x|y)$/,
		([, d]) => ({ "scroll-snap-type": `${d} var(--un-scroll-snap-strictness)` }),
		{
			custom: custom$3,
			autocomplete: "snap-(x|y|both)"
		}
	],
	[
		/^snap-both$/,
		() => ({ "scroll-snap-type": "both var(--un-scroll-snap-strictness)" }),
		{ custom: custom$3 }
	],
	["snap-mandatory", { "--un-scroll-snap-strictness": "mandatory" }],
	["snap-proximity", { "--un-scroll-snap-strictness": "proximity" }],
	["snap-none", { "scroll-snap-type": "none" }],
	["snap-start", { "scroll-snap-align": "start" }],
	["snap-end", { "scroll-snap-align": "end" }],
	["snap-center", { "scroll-snap-align": "center" }],
	["snap-align-none", { "scroll-snap-align": "none" }],
	["snap-normal", { "scroll-snap-stop": "normal" }],
	["snap-always", { "scroll-snap-stop": "always" }],
	[
		/^scroll-ma?()-?(.+)$/,
		directionSize$1("scroll-margin"),
		{ autocomplete: [
			"scroll-(m|p|ma|pa|block|inline)",
			"scroll-(m|p|ma|pa|block|inline)-$spacing",
			"scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)",
			"scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)-$spacing"
		] }
	],
	[/^scroll-m-?([xy])-?(.+)$/, directionSize$1("scroll-margin")],
	[/^scroll-m-?([rltb])-?(.+)$/, directionSize$1("scroll-margin")],
	[/^scroll-m-(block|inline)-(.+)$/, directionSize$1("scroll-margin")],
	[/^scroll-m-?([bi][se])-?(.+)$/, directionSize$1("scroll-margin")],
	[/^scroll-pa?()-?(.+)$/, directionSize$1("scroll-padding")],
	[/^scroll-p-?([xy])-?(.+)$/, directionSize$1("scroll-padding")],
	[/^scroll-p-?([rltb])-?(.+)$/, directionSize$1("scroll-padding")],
	[/^scroll-p-(block|inline)-(.+)$/, directionSize$1("scroll-padding")],
	[/^scroll-p-?([bi][se])-?(.+)$/, directionSize$1("scroll-padding")]
];
var spaces$1 = [
	[
		/^space-([xy])-(.+)$/,
		handlerSpace$1,
		{ autocomplete: [
			"space-(x|y|block|inline)",
			"space-(x|y|block|inline)-reverse",
			"space-(x|y|block|inline)-$spacing"
		] }
	],
	[/^space-([xy])-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })],
	[/^space-(block|inline)-(.+)$/, handlerSpace$1],
	[/^space-(block|inline)-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })]
];
function handlerSpace$1([, d, s], { theme }) {
	let v = theme.spacing?.[s || "DEFAULT"] ?? h$1.bracket.cssvar.auto.fraction.rem(s || "1");
	if (v != null) {
		if (v === "0") v = "0px";
		const results = directionMap$1[d].map((item) => {
			return [`margin${item}`, item.endsWith("right") || item.endsWith("bottom") ? `calc(${v} * var(--un-space-${d}-reverse))` : `calc(${v} * calc(1 - var(--un-space-${d}-reverse)))`];
		});
		if (results) return [[`--un-space-${d}-reverse`, 0], ...results];
	}
}
var textTransforms$1 = [
	["uppercase", { "text-transform": "uppercase" }],
	["lowercase", { "text-transform": "lowercase" }],
	["capitalize", { "text-transform": "capitalize" }],
	["normal-case", { "text-transform": "none" }]
];
var hyphens$1 = [...[
	"manual",
	"auto",
	"none",
	...globalKeywords$1
].map((keyword) => [`hyphens-${keyword}`, {
	"-webkit-hyphens": keyword,
	"-ms-hyphens": keyword,
	"hyphens": keyword
}])];
var writingModes$1 = [
	["write-vertical-right", { "writing-mode": "vertical-rl" }],
	["write-vertical-left", { "writing-mode": "vertical-lr" }],
	["write-normal", { "writing-mode": "horizontal-tb" }],
	...makeGlobalStaticRules$1("write", "writing-mode")
];
var writingOrientations$1 = [
	["write-orient-mixed", { "text-orientation": "mixed" }],
	["write-orient-sideways", { "text-orientation": "sideways" }],
	["write-orient-upright", { "text-orientation": "upright" }],
	...makeGlobalStaticRules$1("write-orient", "text-orientation")
];
var screenReadersAccess$1 = [["sr-only", {
	"position": "absolute",
	"width": "1px",
	"height": "1px",
	"padding": "0",
	"margin": "-1px",
	"overflow": "hidden",
	"clip": "rect(0,0,0,0)",
	"white-space": "nowrap",
	"border-width": 0
}], ["not-sr-only", {
	"position": "static",
	"width": "auto",
	"height": "auto",
	"padding": "0",
	"margin": "0",
	"overflow": "visible",
	"clip": "auto",
	"white-space": "normal"
}]];
var isolations$1 = [
	["isolate", { isolation: "isolate" }],
	["isolate-auto", { isolation: "auto" }],
	["isolation-auto", { isolation: "auto" }]
];
var objectPositions$1 = [
	["object-cover", { "object-fit": "cover" }],
	["object-contain", { "object-fit": "contain" }],
	["object-fill", { "object-fit": "fill" }],
	["object-scale-down", { "object-fit": "scale-down" }],
	["object-none", { "object-fit": "none" }],
	[
		/^object-(.+)$/,
		([, d]) => {
			if (positionMap$1[d]) return { "object-position": positionMap$1[d] };
			if (h$1.bracketOfPosition(d) != null) return { "object-position": h$1.bracketOfPosition(d).split(" ").map((e) => h$1.position.fraction.auto.px.cssvar(e) ?? e).join(" ") };
		},
		{ autocomplete: `object-(${Object.keys(positionMap$1).join("|")})` }
	]
];
var backgroundBlendModes$1 = [
	["bg-blend-multiply", { "background-blend-mode": "multiply" }],
	["bg-blend-screen", { "background-blend-mode": "screen" }],
	["bg-blend-overlay", { "background-blend-mode": "overlay" }],
	["bg-blend-darken", { "background-blend-mode": "darken" }],
	["bg-blend-lighten", { "background-blend-mode": "lighten" }],
	["bg-blend-color-dodge", { "background-blend-mode": "color-dodge" }],
	["bg-blend-color-burn", { "background-blend-mode": "color-burn" }],
	["bg-blend-hard-light", { "background-blend-mode": "hard-light" }],
	["bg-blend-soft-light", { "background-blend-mode": "soft-light" }],
	["bg-blend-difference", { "background-blend-mode": "difference" }],
	["bg-blend-exclusion", { "background-blend-mode": "exclusion" }],
	["bg-blend-hue", { "background-blend-mode": "hue" }],
	["bg-blend-saturation", { "background-blend-mode": "saturation" }],
	["bg-blend-color", { "background-blend-mode": "color" }],
	["bg-blend-luminosity", { "background-blend-mode": "luminosity" }],
	["bg-blend-normal", { "background-blend-mode": "normal" }],
	...makeGlobalStaticRules$1("bg-blend", "background-blend")
];
var mixBlendModes$1 = [
	["mix-blend-multiply", { "mix-blend-mode": "multiply" }],
	["mix-blend-screen", { "mix-blend-mode": "screen" }],
	["mix-blend-overlay", { "mix-blend-mode": "overlay" }],
	["mix-blend-darken", { "mix-blend-mode": "darken" }],
	["mix-blend-lighten", { "mix-blend-mode": "lighten" }],
	["mix-blend-color-dodge", { "mix-blend-mode": "color-dodge" }],
	["mix-blend-color-burn", { "mix-blend-mode": "color-burn" }],
	["mix-blend-hard-light", { "mix-blend-mode": "hard-light" }],
	["mix-blend-soft-light", { "mix-blend-mode": "soft-light" }],
	["mix-blend-difference", { "mix-blend-mode": "difference" }],
	["mix-blend-exclusion", { "mix-blend-mode": "exclusion" }],
	["mix-blend-hue", { "mix-blend-mode": "hue" }],
	["mix-blend-saturation", { "mix-blend-mode": "saturation" }],
	["mix-blend-color", { "mix-blend-mode": "color" }],
	["mix-blend-luminosity", { "mix-blend-mode": "luminosity" }],
	["mix-blend-plus-lighter", { "mix-blend-mode": "plus-lighter" }],
	["mix-blend-normal", { "mix-blend-mode": "normal" }],
	...makeGlobalStaticRules$1("mix-blend")
];
var dynamicViewportHeight$1 = [
	["min-h-dvh", { "min-height": "100dvh" }],
	["min-h-svh", { "min-height": "100svh" }],
	["min-h-lvh", { "min-height": "100lvh" }],
	["h-dvh", { height: "100dvh" }],
	["h-svh", { height: "100svh" }],
	["h-lvh", { height: "100lvh" }],
	["max-h-dvh", { "max-height": "100dvh" }],
	["max-h-svh", { "max-height": "100svh" }],
	["max-h-lvh", { "max-height": "100lvh" }]
];
var borderSpacingBase = {
	"--un-border-spacing-x": 0,
	"--un-border-spacing-y": 0
};
var custom$2 = { preflightKeys: Object.keys(borderSpacingBase) };
var borderSpacingProperty = "var(--un-border-spacing-x) var(--un-border-spacing-y)";
var tables$1 = [
	["inline-table", { display: "inline-table" }],
	["table", { display: "table" }],
	["table-caption", { display: "table-caption" }],
	["table-cell", { display: "table-cell" }],
	["table-column", { display: "table-column" }],
	["table-column-group", { display: "table-column-group" }],
	["table-footer-group", { display: "table-footer-group" }],
	["table-header-group", { display: "table-header-group" }],
	["table-row", { display: "table-row" }],
	["table-row-group", { display: "table-row-group" }],
	["border-collapse", { "border-collapse": "collapse" }],
	["border-separate", { "border-collapse": "separate" }],
	[
		/^border-spacing-(.+)$/,
		([, s], { theme }) => {
			const v = theme.spacing?.[s] ?? h$1.bracket.cssvar.global.auto.fraction.rem(s);
			if (v != null) return {
				"--un-border-spacing-x": v,
				"--un-border-spacing-y": v,
				"border-spacing": borderSpacingProperty
			};
		},
		{
			custom: custom$2,
			autocomplete: ["border-spacing", "border-spacing-$spacing"]
		}
	],
	[
		/^border-spacing-([xy])-(.+)$/,
		([, d, s], { theme }) => {
			const v = theme.spacing?.[s] ?? h$1.bracket.cssvar.global.auto.fraction.rem(s);
			if (v != null) return {
				[`--un-border-spacing-${d}`]: v,
				"border-spacing": borderSpacingProperty
			};
		},
		{
			custom: custom$2,
			autocomplete: ["border-spacing-(x|y)", "border-spacing-(x|y)-$spacing"]
		}
	],
	["caption-top", { "caption-side": "top" }],
	["caption-bottom", { "caption-side": "bottom" }],
	["table-auto", { "table-layout": "auto" }],
	["table-fixed", { "table-layout": "fixed" }],
	["table-empty-cells-visible", { "empty-cells": "show" }],
	["table-empty-cells-hidden", { "empty-cells": "hide" }]
];
var touchActionBase = {
	"--un-pan-x": " ",
	"--un-pan-y": " ",
	"--un-pinch-zoom": " "
};
var custom$1 = { preflightKeys: Object.keys(touchActionBase) };
var touchActionProperty = "var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom)";
var touchActions$1 = [
	[
		/^touch-pan-(x|left|right)$/,
		([, d]) => ({
			"--un-pan-x": `pan-${d}`,
			"touch-action": touchActionProperty
		}),
		{
			custom: custom$1,
			autocomplete: ["touch-pan", "touch-pan-(x|left|right|y|up|down)"]
		}
	],
	[
		/^touch-pan-(y|up|down)$/,
		([, d]) => ({
			"--un-pan-y": `pan-${d}`,
			"touch-action": touchActionProperty
		}),
		{ custom: custom$1 }
	],
	[
		"touch-pinch-zoom",
		{
			"--un-pinch-zoom": "pinch-zoom",
			"touch-action": touchActionProperty
		},
		{ custom: custom$1 }
	],
	["touch-auto", { "touch-action": "auto" }],
	["touch-manipulation", { "touch-action": "manipulation" }],
	["touch-none", { "touch-action": "none" }],
	...makeGlobalStaticRules$1("touch", "touch-action")
];
var fontVariantNumericBase = {
	"--un-ordinal": " ",
	"--un-slashed-zero": " ",
	"--un-numeric-figure": " ",
	"--un-numeric-spacing": " ",
	"--un-numeric-fraction": " "
};
var custom = { preflightKeys: Object.keys(fontVariantNumericBase) };
function toEntries(entry) {
	return {
		...entry,
		"font-variant-numeric": "var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)"
	};
}
var fontVariantNumeric$1 = [
	[
		/^ordinal$/,
		() => toEntries({ "--un-ordinal": "ordinal" }),
		{
			custom,
			autocomplete: "ordinal"
		}
	],
	[
		/^slashed-zero$/,
		() => toEntries({ "--un-slashed-zero": "slashed-zero" }),
		{
			custom,
			autocomplete: "slashed-zero"
		}
	],
	[
		/^lining-nums$/,
		() => toEntries({ "--un-numeric-figure": "lining-nums" }),
		{
			custom,
			autocomplete: "lining-nums"
		}
	],
	[
		/^oldstyle-nums$/,
		() => toEntries({ "--un-numeric-figure": "oldstyle-nums" }),
		{
			custom,
			autocomplete: "oldstyle-nums"
		}
	],
	[
		/^proportional-nums$/,
		() => toEntries({ "--un-numeric-spacing": "proportional-nums" }),
		{
			custom,
			autocomplete: "proportional-nums"
		}
	],
	[
		/^tabular-nums$/,
		() => toEntries({ "--un-numeric-spacing": "tabular-nums" }),
		{
			custom,
			autocomplete: "tabular-nums"
		}
	],
	[
		/^diagonal-fractions$/,
		() => toEntries({ "--un-numeric-fraction": "diagonal-fractions" }),
		{
			custom,
			autocomplete: "diagonal-fractions"
		}
	],
	[
		/^stacked-fractions$/,
		() => toEntries({ "--un-numeric-fraction": "stacked-fractions" }),
		{
			custom,
			autocomplete: "stacked-fractions"
		}
	],
	["normal-nums", { "font-variant-numeric": "normal" }]
];
var variablesAbbrMap$1 = {
	"bg-blend": "background-blend-mode",
	"bg-clip": "-webkit-background-clip",
	"bg-gradient": "linear-gradient",
	"bg-image": "background-image",
	"bg-origin": "background-origin",
	"bg-position": "background-position",
	"bg-repeat": "background-repeat",
	"bg-size": "background-size",
	"mix-blend": "mix-blend-mode",
	"object": "object-fit",
	"object-position": "object-position",
	"write": "writing-mode",
	"write-orient": "text-orientation"
};
var rules$1 = [
	cssVariables$2,
	[[/^(.+?)-(\$.+)$/, ([, name, varname]) => {
		const prop = variablesAbbrMap$1[name];
		if (prop) return { [prop]: h$1.cssvar(varname) };
	}]],
	cssProperty$1,
	container$2,
	contains$1,
	screenReadersAccess$1,
	pointerEvents$1,
	appearances$1,
	positions$1,
	insets$1,
	lineClamps$1,
	isolations$1,
	zIndexes$1,
	orders$1,
	grids$1,
	floats$1,
	margins$1,
	boxSizing$1,
	displays$1,
	aspectRatio$1,
	sizes$1,
	flex$2,
	tables$1,
	transforms$1,
	animations$1,
	cursors$1,
	touchActions$1,
	userSelects$1,
	resizes$1,
	scrolls$1,
	listStyle$1,
	appearance$1,
	columns$1,
	placements$1,
	alignments$1,
	justifies$1,
	gaps$1,
	flexGridJustifiesAlignments$1,
	spaces$1,
	divides$1,
	overflows$1,
	overscrolls$1,
	scrollBehaviors$1,
	textOverflows$1,
	whitespaces$1,
	breaks$1,
	borders$1,
	bgColors$1,
	backgroundStyles$1,
	colorScheme$1,
	svgUtilities$1,
	objectPositions$1,
	paddings$1,
	textAligns$1,
	textIndents$1,
	textWraps$1,
	verticalAligns$1,
	fonts$1,
	textTransforms$2,
	textTransforms$1,
	fontStyles$1,
	fontVariantNumeric$1,
	textDecorations$1,
	fontSmoothings$1,
	tabSizes$1,
	textStrokes$1,
	textShadows$1,
	hyphens$1,
	writingModes$1,
	writingOrientations$1,
	carets$1,
	accents$1,
	opacity$2,
	backgroundBlendModes$1,
	mixBlendModes$1,
	boxShadows$1,
	outline$1,
	rings$1,
	imageRenderings$1,
	filters$1,
	transitions$1,
	willChange$1,
	contentVisibility$1,
	contents$1,
	placeholders$1,
	containerParent$1,
	[[/^view-transition-([\w-]+)$/, ([, name]) => {
		return { "view-transition-name": name };
	}]],
	dynamicViewportHeight$1,
	fieldSizing$1,
	questionMark$1
].flat(1);
//#endregion
//#region node_modules/@unocss/preset-wind3/dist/shortcuts.mjs
var shortcuts$1 = [...containerShortcuts$1];
//#endregion
//#region node_modules/@unocss/preset-wind3/dist/theme.mjs
var theme$2 = {
	...theme$3,
	aria: {
		busy: "busy=\"true\"",
		checked: "checked=\"true\"",
		disabled: "disabled=\"true\"",
		expanded: "expanded=\"true\"",
		hidden: "hidden=\"true\"",
		pressed: "pressed=\"true\"",
		readonly: "readonly=\"true\"",
		required: "required=\"true\"",
		selected: "selected=\"true\""
	},
	animation: {
		keyframes: {
			"pulse": "{0%, 100% {opacity:1} 50% {opacity:.5}}",
			"bounce": "{0%, 100% {transform:translateY(-25%);animation-timing-function:cubic-bezier(0.8,0,1,1)} 50% {transform:translateY(0);animation-timing-function:cubic-bezier(0,0,0.2,1)}}",
			"spin": "{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
			"ping": "{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}",
			"bounce-alt": "{from,20%,53%,80%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);transform:translate3d(0,0,0)}40%,43%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-30px,0)}70%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}",
			"flash": "{from,50%,to{opacity:1}25%,75%{opacity:0}}",
			"pulse-alt": "{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scale3d(1,1,1)}}",
			"rubber-band": "{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,0.75,1)}40%{transform:scale3d(0.75,1.25,1)}50%{transform:scale3d(1.15,0.85,1)}65%{transform:scale3d(0.95,1.05,1)}75%{transform:scale3d(1.05,0.95,1)}to{transform:scale3d(1,1,1)}}",
			"shake-x": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}",
			"shake-y": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(0,-10px,0)}20%,40%,60%,80%{transform:translate3d(0,10px,0)}}",
			"head-shake": "{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}",
			"swing": "{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}",
			"tada": "{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}",
			"wobble": "{from{transform:translate3d(0,0,0)}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:translate3d(0,0,0)}}",
			"jello": "{from,11.1%,to{transform:translate3d(0,0,0)}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg)skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}",
			"heart-beat": "{0%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}",
			"hinge": "{0%{transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{transform:rotate3d(0,0,1,80deg);transform-origin:top left;animation-timing-function:ease-in-out}40%,80%{transform:rotate3d(0,0,1,60deg);transform-origin:top left;animation-timing-function:ease-in-out}to{transform:translate3d(0,700px,0);opacity:0}}",
			"jack-in-the-box": "{from{opacity:0;transform-origin:center bottom;transform:scale(0.1) rotate(30deg)}50%{transform:rotate(-10deg)}70%{transform:rotate(3deg)}to{transform:scale(1)}}",
			"light-speed-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
			"light-speed-in-right": "{from{opacity:0;transform:translate3d(100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
			"light-speed-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0) skewX(30deg)}}",
			"light-speed-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) skewX(30deg)}}",
			"flip": "{from{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);animation-timing-function:ease-out}40%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);animation-timing-function:ease-out}50%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);animation-timing-function:ease-in}80%{transform:perspective(400px) scale3d(0.95,0.95,0.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}to{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}}",
			"flip-in-x": "{from{transform:perspective(400px) rotate3d(1,0,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}",
			"flip-in-y": "{from{transform:perspective(400px) rotate3d(0,1,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}",
			"flip-out-x": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}",
			"flip-out-y": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}",
			"rotate-in": "{from{transform-origin:center;transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform-origin:center;transform:translate3d(0,0,0);opacity:1}}",
			"rotate-in-down-left": "{from{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:left bottom;transform:translate3d(0,0,0);opacity:1}}",
			"rotate-in-down-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
			"rotate-in-up-left": "{from{transform-origin:left top;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:left top;transform:translate3d(0,0,0);opacity:1}}",
			"rotate-in-up-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,-90deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
			"rotate-out": "{from{transform-origin:center;opacity:1}to{transform-origin:center;transform:rotate3d(0,0,1,200deg);opacity:0}}",
			"rotate-out-down-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}}",
			"rotate-out-down-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
			"rotate-out-up-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
			"rotate-out-up-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,90deg);opacity:0}}",
			"roll-in": "{from{opacity:0;transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"roll-out": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}",
			"zoom-in": "{from{opacity:0;transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}",
			"zoom-in-down": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
			"zoom-in-left": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
			"zoom-in-right": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
			"zoom-in-up": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
			"zoom-out": "{from{opacity:1}50%{opacity:0;transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}",
			"zoom-out-down": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
			"zoom-out-left": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(-2000px,0,0);transform-origin:left center}}",
			"zoom-out-right": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(2000px,0,0);transform-origin:right center}}",
			"zoom-out-up": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
			"bounce-in": "{from,20%,40%,60%,80%,to{animation-timing-function:ease-in-out}0%{opacity:0;transform:scale3d(0.3,0.3,0.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(0.9,0.9,0.9)}60%{transform:scale3d(1.03,1.03,1.03);opacity:1}80%{transform:scale3d(0.97,0.97,0.97)}to{opacity:1;transform:scale3d(1,1,1)}}",
			"bounce-in-down": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translate3d(0,0,0)}}",
			"bounce-in-left": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}",
			"bounce-in-right": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}",
			"bounce-in-up": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}",
			"bounce-out": "{20%{transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(0.3,0.3,0.3)}}",
			"bounce-out-down": "{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}",
			"bounce-out-left": "{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
			"bounce-out-right": "{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}",
			"bounce-out-up": "{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
			"slide-in-down": "{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
			"slide-in-left": "{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
			"slide-in-right": "{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
			"slide-in-up": "{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
			"slide-out-down": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}",
			"slide-out-left": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}",
			"slide-out-right": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}",
			"slide-out-up": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}",
			"fade-in": "{from{opacity:0}to{opacity:1}}",
			"fade-in-down": "{from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-down-big": "{from{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-left-big": "{from{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-right": "{from{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-right-big": "{from{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-up": "{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-up-big": "{from{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-top-left": "{from{opacity:0;transform:translate3d(-100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-top-right": "{from{opacity:0;transform:translate3d(100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-bottom-left": "{from{opacity:0;transform:translate3d(-100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-in-bottom-right": "{from{opacity:0;transform:translate3d(100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
			"fade-out": "{from{opacity:1}to{opacity:0}}",
			"fade-out-down": "{from{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}",
			"fade-out-down-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}",
			"fade-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}",
			"fade-out-left-big": "{from{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
			"fade-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}",
			"fade-out-right-big": "{from{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}",
			"fade-out-up": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}",
			"fade-out-up-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
			"fade-out-top-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,-100%,0)}}",
			"fade-out-top-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,-100%,0)}}",
			"fade-out-bottom-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,100%,0)}}",
			"fade-out-bottom-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,100%,0)}}",
			"back-in-up": "{0%{opacity:0.7;transform:translateY(1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
			"back-in-down": "{0%{opacity:0.7;transform:translateY(-1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
			"back-in-right": "{0%{opacity:0.7;transform:translateX(2000px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
			"back-in-left": "{0%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}80%{opacity:0.7;transform:translateX(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
			"back-out-up": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}",
			"back-out-down": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(700px) scale(0.7)}}",
			"back-out-right": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateX(2000px) scale(0.7)}}",
			"back-out-left": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}"
		},
		durations: {
			"pulse": "2s",
			"heart-beat": "1.3s",
			"bounce-in": "0.75s",
			"bounce-out": "0.75s",
			"flip-out-x": "0.75s",
			"flip-out-y": "0.75s",
			"hinge": "2s"
		},
		timingFns: {
			"pulse": "cubic-bezier(0.4,0,.6,1)",
			"ping": "cubic-bezier(0,0,.2,1)",
			"head-shake": "ease-in-out",
			"heart-beat": "ease-in-out",
			"pulse-alt": "ease-in-out",
			"light-speed-in-left": "ease-out",
			"light-speed-in-right": "ease-out",
			"light-speed-out-left": "ease-in",
			"light-speed-out-right": "ease-in"
		},
		properties: {
			"bounce-alt": { "transform-origin": "center bottom" },
			"jello": { "transform-origin": "center" },
			"swing": { "transform-origin": "top center" },
			"flip": { "backface-visibility": "visible" },
			"flip-in-x": { "backface-visibility": "visible !important" },
			"flip-in-y": { "backface-visibility": "visible !important" },
			"flip-out-x": { "backface-visibility": "visible !important" },
			"flip-out-y": { "backface-visibility": "visible !important" },
			"rotate-in": { "transform-origin": "center" },
			"rotate-in-down-left": { "transform-origin": "left bottom" },
			"rotate-in-down-right": { "transform-origin": "right bottom" },
			"rotate-in-up-left": { "transform-origin": "left bottom" },
			"rotate-in-up-right": { "transform-origin": "right bottom" },
			"rotate-out": { "transform-origin": "center" },
			"rotate-out-down-left": { "transform-origin": "left bottom" },
			"rotate-out-down-right": { "transform-origin": "right bottom" },
			"rotate-out-up-left": { "transform-origin": "left bottom" },
			"rotate-out-up-right": { "transform-origin": "right bottom" },
			"hinge": { "transform-origin": "top left" },
			"zoom-out-down": { "transform-origin": "center bottom" },
			"zoom-out-left": { "transform-origin": "left center" },
			"zoom-out-right": { "transform-origin": "right center" },
			"zoom-out-up": { "transform-origin": "center bottom" }
		},
		counts: {
			"spin": "infinite",
			"ping": "infinite",
			"pulse": "infinite",
			"pulse-alt": "infinite",
			"bounce": "infinite",
			"bounce-alt": "infinite"
		},
		category: {
			"pulse": "Attention Seekers",
			"bounce": "Attention Seekers",
			"spin": "Attention Seekers",
			"ping": "Attention Seekers",
			"bounce-alt": "Attention Seekers",
			"flash": "Attention Seekers",
			"pulse-alt": "Attention Seekers",
			"rubber-band": "Attention Seekers",
			"shake-x": "Attention Seekers",
			"shake-y": "Attention Seekers",
			"head-shake": "Attention Seekers",
			"swing": "Attention Seekers",
			"tada": "Attention Seekers",
			"wobble": "Attention Seekers",
			"jello": "Attention Seekers",
			"heart-beat": "Attention Seekers",
			"hinge": "Specials",
			"jack-in-the-box": "Specials",
			"light-speed-in-left": "Lightspeed",
			"light-speed-in-right": "Lightspeed",
			"light-speed-out-left": "Lightspeed",
			"light-speed-out-right": "Lightspeed",
			"flip": "Flippers",
			"flip-in-x": "Flippers",
			"flip-in-y": "Flippers",
			"flip-out-x": "Flippers",
			"flip-out-y": "Flippers",
			"rotate-in": "Rotating Entrances",
			"rotate-in-down-left": "Rotating Entrances",
			"rotate-in-down-right": "Rotating Entrances",
			"rotate-in-up-left": "Rotating Entrances",
			"rotate-in-up-right": "Rotating Entrances",
			"rotate-out": "Rotating Exits",
			"rotate-out-down-left": "Rotating Exits",
			"rotate-out-down-right": "Rotating Exits",
			"rotate-out-up-left": "Rotating Exits",
			"rotate-out-up-right": "Rotating Exits",
			"roll-in": "Specials",
			"roll-out": "Specials",
			"zoom-in": "Zooming Entrances",
			"zoom-in-down": "Zooming Entrances",
			"zoom-in-left": "Zooming Entrances",
			"zoom-in-right": "Zooming Entrances",
			"zoom-in-up": "Zooming Entrances",
			"zoom-out": "Zooming Exits",
			"zoom-out-down": "Zooming Exits",
			"zoom-out-left": "Zooming Exits",
			"zoom-out-right": "Zooming Exits",
			"zoom-out-up": "Zooming Exits",
			"bounce-in": "Bouncing Entrances",
			"bounce-in-down": "Bouncing Entrances",
			"bounce-in-left": "Bouncing Entrances",
			"bounce-in-right": "Bouncing Entrances",
			"bounce-in-up": "Bouncing Entrances",
			"bounce-out": "Bouncing Exits",
			"bounce-out-down": "Bouncing Exits",
			"bounce-out-left": "Bouncing Exits",
			"bounce-out-right": "Bouncing Exits",
			"bounce-out-up": "Bouncing Exits",
			"slide-in-down": "Sliding Entrances",
			"slide-in-left": "Sliding Entrances",
			"slide-in-right": "Sliding Entrances",
			"slide-in-up": "Sliding Entrances",
			"slide-out-down": "Sliding Exits",
			"slide-out-left": "Sliding Exits",
			"slide-out-right": "Sliding Exits",
			"slide-out-up": "Sliding Exits",
			"fade-in": "Fading Entrances",
			"fade-in-down": "Fading Entrances",
			"fade-in-down-big": "Fading Entrances",
			"fade-in-left": "Fading Entrances",
			"fade-in-left-big": "Fading Entrances",
			"fade-in-right": "Fading Entrances",
			"fade-in-right-big": "Fading Entrances",
			"fade-in-up": "Fading Entrances",
			"fade-in-up-big": "Fading Entrances",
			"fade-in-top-left": "Fading Entrances",
			"fade-in-top-right": "Fading Entrances",
			"fade-in-bottom-left": "Fading Entrances",
			"fade-in-bottom-right": "Fading Entrances",
			"fade-out": "Fading Exits",
			"fade-out-down": "Fading Exits",
			"fade-out-down-big": "Fading Exits",
			"fade-out-left": "Fading Exits",
			"fade-out-left-big": "Fading Exits",
			"fade-out-right": "Fading Exits",
			"fade-out-right-big": "Fading Exits",
			"fade-out-up": "Fading Exits",
			"fade-out-up-big": "Fading Exits",
			"fade-out-top-left": "Fading Exits",
			"fade-out-top-right": "Fading Exits",
			"fade-out-bottom-left": "Fading Exits",
			"fade-out-bottom-right": "Fading Exits",
			"back-in-up": "Back Entrances",
			"back-in-down": "Back Entrances",
			"back-in-right": "Back Entrances",
			"back-in-left": "Back Entrances",
			"back-out-up": "Back Exits",
			"back-out-down": "Back Exits",
			"back-out-right": "Back Exits",
			"back-out-left": "Back Exits"
		}
	},
	media: {
		portrait: "(orientation: portrait)",
		landscape: "(orientation: landscape)",
		os_dark: "(prefers-color-scheme: dark)",
		os_light: "(prefers-color-scheme: light)",
		motion_ok: "(prefers-reduced-motion: no-preference)",
		motion_not_ok: "(prefers-reduced-motion: reduce)",
		high_contrast: "(prefers-contrast: high)",
		low_contrast: "(prefers-contrast: low)",
		opacity_ok: "(prefers-reduced-transparency: no-preference)",
		opacity_not_ok: "(prefers-reduced-transparency: reduce)",
		use_data_ok: "(prefers-reduced-data: no-preference)",
		use_data_not_ok: "(prefers-reduced-data: reduce)",
		touch: "(hover: none) and (pointer: coarse)",
		stylus: "(hover: none) and (pointer: fine)",
		pointer: "(hover) and (pointer: coarse)",
		mouse: "(hover) and (pointer: fine)",
		hd_color: "(dynamic-range: high)"
	},
	supports: { grid: "(display: grid)" },
	preflightBase: {
		...transformBase,
		...touchActionBase,
		...scrollSnapTypeBase,
		...fontVariantNumericBase,
		...borderSpacingBase,
		...boxShadowsBase,
		...ringBase,
		...filterBase,
		...backdropFilterBase
	}
};
//#endregion
//#region node_modules/@unocss/preset-wind3/dist/variants.mjs
var variantCombinators$1 = [variantMatcher("svg", (input) => ({ selector: `${input.selector} svg` }))];
var variantColorsScheme$1 = [
	variantMatcher(".dark", (input) => ({ prefix: `.dark $$ ${input.prefix}` })),
	variantMatcher(".light", (input) => ({ prefix: `.light $$ ${input.prefix}` })),
	variantParentMatcher("@dark", "@media (prefers-color-scheme: dark)"),
	variantParentMatcher("@light", "@media (prefers-color-scheme: light)")
];
var variantContrasts$1 = [variantParentMatcher("contrast-more", "@media (prefers-contrast: more)"), variantParentMatcher("contrast-less", "@media (prefers-contrast: less)")];
var variantMotions$1 = [variantParentMatcher("motion-reduce", "@media (prefers-reduced-motion: reduce)"), variantParentMatcher("motion-safe", "@media (prefers-reduced-motion: no-preference)")];
var variantOrientations$1 = [variantParentMatcher("landscape", "@media (orientation: landscape)"), variantParentMatcher("portrait", "@media (orientation: portrait)")];
var variantSpaceAndDivide = (matcher) => {
	if (matcher.startsWith("_")) return;
	if (/space-[xy]-.+$/.test(matcher) || /divide-/.test(matcher)) return {
		matcher,
		selector: (input) => {
			const not = ">:not([hidden])~:not([hidden])";
			return input.includes(not) ? input : `${input}${not}`;
		}
	};
};
var variantStickyHover$1 = [variantMatcher("@hover", (input) => ({
	parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (hover: hover) and (pointer: fine)`,
	selector: `${input.selector || ""}:hover`
}))];
function mixComponent(v1, v2, w) {
	return `calc(${v2} + (${v1} - ${v2}) * ${w} / 100)`;
}
/**
* Returns RGB color from a mixture of color1 and color2. Support RGB color values.
* https://sass-lang.com/documentation/modules/color#mix
*
* @param color1
* @param color2
* @param weight - How many of color2 will be used to mix into color1. Value of 0 will resulting in color2, value of 100 color1.
* @return
*/
function mixColor(color1, color2, weight) {
	const colors = [color1, color2];
	const cssColors = [];
	for (let c = 0; c < 2; c++) {
		const color = typeof colors[c] === "string" ? parseCssColor(colors[c]) : colors[c];
		if (!color || !["rgb", "rgba"].includes(color.type)) return;
		cssColors.push(color);
	}
	const newComponents = [];
	for (let x = 0; x < 3; x++) newComponents.push(mixComponent(cssColors[0].components[x], cssColors[1].components[x], weight));
	return {
		type: "rgb",
		components: newComponents,
		alpha: mixComponent(cssColors[0].alpha ?? 1, cssColors[1].alpha ?? 1, weight)
	};
}
/**
* Mix color with white. @see {@link mixColor}
*/
function tint(color, weight) {
	return mixColor("#fff", color, weight);
}
/**
* Mix color with black. @see {@link mixColor}
*/
function shade(color, weight) {
	return mixColor("#000", color, weight);
}
/**
* Mix color with black or white, according to weight. @see {@link mixColor}
*/
function shift(color, weight) {
	const num = Number.parseFloat(`${weight}`);
	if (!Number.isNaN(num)) return num > 0 ? shade(color, weight) : tint(color, -num);
}
var fns = {
	tint,
	shade,
	shift
};
/**
* Shade the color if the weight is positive, tint the color otherwise.
* Shading mixes the color with black, Tinting mixes the color with white.
* @see {@link mixColor}
*/
function variantColorMix() {
	let re;
	return {
		name: "mix",
		match(matcher, ctx) {
			if (!re) re = /* @__PURE__ */ new RegExp(`^mix-(tint|shade|shift)-(-?\\d{1,3})(?:${ctx.generator.config.separators.join("|")})`);
			const m = matcher.match(re);
			if (m) return {
				matcher: matcher.slice(m[0].length),
				body: (body) => {
					body.forEach((v) => {
						if (v[1]) {
							const color = parseCssColor(`${v[1]}`);
							if (color) {
								const mixed = fns[m[1]](color, m[2]);
								if (mixed) v[1] = colorToString(mixed);
							}
						}
					});
					return body;
				}
			};
		}
	};
}
var placeholderModifier$1 = (input, { theme }) => {
	const m = input.match(/^(.*)\b(placeholder-)(.+)$/);
	if (m) {
		const [, pre = "", p, body] = m;
		if (hasParseableColor$1(body, theme, "accentColor") || hasOpacityValue$1(body)) return { matcher: `${pre}placeholder-$ ${p}${body}` };
	}
};
function hasOpacityValue$1(body) {
	const match = body.match(/^op(?:acity)?-?(.+)$/);
	if (match && match[1] != null) return h$1.bracket.percent(match[1]) != null;
	return false;
}
function variants$1(options) {
	return [
		placeholderModifier$1,
		variantSpaceAndDivide,
		...variants$2(options),
		...variantContrasts$1,
		...variantOrientations$1,
		...variantMotions$1,
		...variantCombinators$1,
		...variantColorsScheme$1,
		...variantStickyHover$1,
		variantColorMix()
	];
}
//#endregion
//#region node_modules/@unocss/preset-wind3/dist/index.mjs
function important$1(option) {
	if (option == null || option === false) return [];
	const wrapWithIs = (selector) => {
		if (selector.startsWith(":is(") && selector.endsWith(")")) return selector;
		if (selector.includes("::")) return selector.replace(/(.*?)((?:\s\*)?::.*)/, ":is($1)$2");
		return `:is(${selector})`;
	};
	return [option === true ? (util) => {
		util.entries.forEach((i) => {
			if (i[1] != null && !String(i[1]).endsWith("!important")) i[1] += " !important";
		});
	} : (util) => {
		if (!util.selector.startsWith(option)) util.selector = `${option} ${wrapWithIs(util.selector)}`;
	}];
}
function postprocessors$1(options) {
	return [...toArray(src_default$1(options).postprocess), ...important$1(options.important)];
}
/**
* The Tailwind CSS v3 / Windi CSS compact preset for UnoCSS.
*
* @see https://unocss.dev/presets/wind3
*/
var presetWind3 = definePreset((options = {}) => {
	options.important = options.important ?? false;
	return {
		...presetMini(options),
		name: "@unocss/preset-wind3",
		theme: theme$2,
		rules: rules$1,
		shortcuts: shortcuts$1,
		variants: variants$1(options),
		postprocess: postprocessors$1(options)
	};
});
var src_default$7 = presetWind3;
var src_default$4 = definePreset((options = {}) => {
	return {
		...presetWind3(options),
		name: "@unocss/preset-uno"
	};
});
//#endregion
//#region node_modules/@unocss/preset-web-fonts/dist/index.mjs
function createBunnyFontsProvider(name, host) {
	return {
		name,
		getImportUrl(fonts) {
			return `${host}/css?family=${fonts.map((font) => {
				const { name: name$1, weights, italic } = font;
				const formattedName = name$1.toLowerCase().replace(/\s/g, "-");
				if (!weights?.length) return `${formattedName}${italic ? ":i" : ""}`;
				let weightsAsString = weights.map((weight) => weight.toString());
				if (!weightsAsString.some((weight) => weight.endsWith("i")) && italic) weightsAsString = weightsAsString.map((weight) => weight += "i");
				return `${formattedName}:${weightsAsString.join(",")}`;
			}).join("|")}&display=swap`;
		}
	};
}
var BunnyFontsProvider = createBunnyFontsProvider("bunny", "https://fonts.bunny.net");
function generateFontAxes(axes) {
	if (!axes || axes.length === 0) return "";
	let combinations = [[]];
	for (const { values } of axes) {
		const newCombinations = [];
		for (const combo of combinations) for (const value of values) newCombinations.push([...combo, value]);
		combinations = newCombinations;
	}
	return combinations.map((arr) => arr.join(",")).join(";");
}
function createGoogleCompatibleProvider(name, host) {
	return {
		name,
		getImportUrl(fonts) {
			return `${host}/css2?${fonts.map((i) => {
				let name$1 = i.name.replace(/\s+/g, "+");
				/**
				* When using the Google Fonts API, be sure to list them alphabetically.
				* @see https://fonts.google.com/knowledge/using_type/styling_type_on_the_web_with_variable_fonts
				* @example ital, opsz, slnt, wdth, wght
				*/
				const axisValues = [];
				if (i.italic) axisValues.push({
					axis: "ital",
					values: ["0", "1"]
				});
				if (i.widths?.length) axisValues.push({
					axis: "wdth",
					values: i.widths.map((w) => w.toString())
				});
				if (i.weights?.length) axisValues.push({
					axis: "wght",
					values: i.weights.map((w) => w.toString())
				});
				if (axisValues.length) {
					name$1 += ":";
					name$1 += axisValues.map((a) => a.axis).join(",");
					name$1 += "@";
					name$1 += generateFontAxes(axisValues);
				}
				return `family=${name$1}`;
			}).join("&")}&display=swap`;
		}
	};
}
var GoogleFontsProvider = createGoogleCompatibleProvider("google", "https://fonts.googleapis.com");
var CoolLabsFontsProvider = createGoogleCompatibleProvider("coollabs", "https://api.fonts.coollabs.io");
var FontshareProvider = createFontshareProvider("fontshare", "https://api.fontshare.com");
function createFontshareProvider(name, host) {
	return {
		name,
		getImportUrl(fonts) {
			return `${host}/v2/css?${fonts.map((f) => {
				let name$1 = f.name.replace(/\s+/g, "-").toLocaleLowerCase();
				if (f.weights?.length) name$1 += `@${f.weights.flatMap((w) => f.italic ? Number(w) + 1 : w).sort().join()}`;
				else name$1 += `@${f.italic ? 2 : 1}`;
				return `f[]=${name$1}`;
			}).join("&")}&display=swap`;
		}
	};
}
function createFontSourceProvider(name, host) {
	const fontsMap = /* @__PURE__ */ new Map();
	const variablesMap = /* @__PURE__ */ new Map();
	return {
		name,
		async getPreflight(fonts, fetcher) {
			return (await Promise.all(fonts.map(async (font) => {
				const css = [];
				const id = font.name.toLowerCase().replace(/\s+/g, "-");
				let metadata = fontsMap.get(id);
				if (!metadata) {
					const url = `https://api.fontsource.org/v1/fonts/${id}`;
					try {
						metadata = await fetcher(url);
						fontsMap.set(id, metadata);
					} catch {
						throw new Error(`Failed to fetch font: ${font.name}`);
					}
				}
				const { weights, unicodeRange, variants, family } = metadata;
				const subsets = metadata.subsets.filter((subset) => font.subsets ? font.subsets.includes(subset) : true);
				const style = font.italic ? "italic" : "normal";
				if (metadata.variable && !font.preferStatic) {
					let variableData = variablesMap.get(id);
					const url = `https://api.fontsource.org/v1/variable/${id}`;
					try {
						variableData = await fetcher(url);
						variablesMap.set(id, variableData);
					} catch {
						throw new Error(`Failed to fetch font variable: ${font.name}`);
					}
					const mergeAxes = mergeDeep(variableData.axes, font.variable ?? {});
					for (const subset of subsets) if (unicodeRange[subset]) {
						const fontObj = {
							family,
							display: "swap",
							style,
							weight: 400,
							src: [{
								url: `${host}/fontsource/fonts/${metadata.id}:vf@latest/${subset}-wght-${style}.woff2`,
								format: "woff2-variations"
							}],
							variable: {
								wght: mergeAxes.wght ?? void 0,
								wdth: mergeAxes.wdth ?? void 0,
								slnt: mergeAxes.slnt ?? void 0
							},
							unicodeRange: unicodeRange[subset],
							comment: `${metadata.id}-${subset}-wght-normal`
						};
						css.push(generateFontFace(fontObj));
					} else Object.entries(unicodeRange).filter(([subKey]) => !metadata.subsets.includes(subKey)).forEach(([subKey, range]) => {
						const fontObj = {
							family,
							display: "swap",
							style,
							weight: 400,
							src: [{
								url: `${host}/fontsource/fonts/${metadata.id}:vf@latest/${subKey.slice(1, -1)}-wght-${style}.woff2`,
								format: "woff2-variations"
							}],
							variable: {
								wght: mergeAxes.wght ?? void 0,
								wdth: mergeAxes.wdth ?? void 0,
								slnt: mergeAxes.slnt ?? void 0
							},
							unicodeRange: range,
							comment: `${metadata.id}-${subKey}-wght-normal`
						};
						css.push(generateFontFace(fontObj));
					});
				} else {
					const _weights = font.weights && font.weights.length > 0 ? font.weights : weights;
					for (const subset of subsets) for (const weight of _weights) {
						const url = variants[weight][style][subset].url;
						const fontObj = {
							family,
							display: "swap",
							style,
							weight: Number(weight),
							src: [{
								url: url.woff2,
								format: "woff2"
							}],
							unicodeRange: unicodeRange[subset],
							comment: `${metadata.id}-${subset}-${weight}-${style}`
						};
						css.push(generateFontFace(fontObj));
					}
				}
				return css;
			}))).flat().join("\n\n");
		}
	};
}
var FontSourceProvider = createFontSourceProvider("fontsource", "https://cdn.jsdelivr.net");
function generateFontFace(font) {
	const { family, style, display, weight, variable, src, unicodeRange, comment, spacer = "\n  " } = font;
	const { wght, wdth, slnt } = variable ?? {};
	let result = "@font-face {";
	result += `${spacer}font-family: '${family}';`;
	result += `${spacer}font-style: ${slnt ? `oblique ${Number(slnt.max) * -1}deg ${Number(slnt.min) * -1}deg` : style};`;
	result += `${spacer}font-display: ${display};`;
	result += `${spacer}font-weight: ${wght ? getVariableWght(wght) : weight};`;
	if (wdth) result += `${spacer}font-stretch: ${wdth.min}% ${wdth.max}%;`;
	result += `${spacer}src: ${src.map(({ url, format }) => `url(${url}) format('${format}')`).join(", ")};`;
	if (unicodeRange) result += `${spacer}unicode-range: ${unicodeRange};`;
	if (comment) result = `/* ${comment} */\n${result}`;
	return `${result}\n}`;
}
function getVariableWght(axes) {
	if (!axes) return "400";
	if (axes.min === axes.max) return `${axes.min}`;
	return `${axes.min} ${axes.max}`;
}
var builtinProviders = {
	google: GoogleFontsProvider,
	bunny: BunnyFontsProvider,
	fontshare: FontshareProvider,
	fontsource: FontSourceProvider,
	coollabs: CoolLabsFontsProvider,
	none: {
		name: "none",
		getPreflight() {
			return "";
		},
		getFontName(font) {
			return font.name;
		}
	}
};
function resolveProvider(provider) {
	if (typeof provider === "string") return builtinProviders[provider];
	return provider;
}
function normalizedFontMeta(meta, defaultProvider) {
	if (typeof meta !== "string") {
		meta.provider = resolveProvider(meta.provider || defaultProvider);
		if (meta.weights) meta.weights = [...new Set(meta.weights.sort((a, b) => a.toString().localeCompare(b.toString(), "en", { numeric: true })))];
		if (meta.widths) meta.widths = [...new Set(meta.widths.sort((a, b) => a.toString().localeCompare(b.toString(), "en", { numeric: true })))];
		return meta;
	}
	const [name, weights = ""] = meta.split(":");
	return {
		name,
		weights: [...new Set(weights.split(/[,;]\s*/).filter(Boolean).sort((a, b) => a.localeCompare(b, "en", { numeric: true })))],
		provider: resolveProvider(defaultProvider)
	};
}
function createWebFontPreset(fetcher) {
	return (options = {}) => {
		const { provider: defaultProvider = "google", extendTheme = true, inlineImports = true, customFetch = fetcher, timeouts = {} } = options;
		const fontLayer = "fonts";
		const layerName = inlineImports ? fontLayer : LAYER_IMPORTS;
		const processors = toArray(options.processors || []);
		const fontObject = Object.fromEntries(Object.entries(options.fonts || {}).map(([name, meta]) => [name, toArray(meta).map((m) => normalizedFontMeta(m, defaultProvider))]));
		const fonts = Object.values(fontObject).flatMap((i) => i);
		const importCache = {};
		async function fetchWithTimeout(url) {
			if (timeouts === false) return customFetch(url);
			const { warning = 1e3, failure = 2e3 } = timeouts;
			let warned = false;
			const timer = setTimeout(() => {
				console.warn(`[unocss] Fetching web fonts: ${url}`);
				warned = true;
			}, warning);
			return await Promise.race([customFetch(url), new Promise((_, reject) => {
				setTimeout(() => reject(/* @__PURE__ */ new Error(`[unocss] Fetch web fonts timeout.`)), failure);
			})]).then((res) => {
				if (warned) console.info(`[unocss] Web fonts fetched.`);
				return res;
			}).finally(() => clearTimeout(timer));
		}
		async function importUrl(url) {
			if (inlineImports) {
				if (!importCache[url]) importCache[url] = fetchWithTimeout(url).catch((e) => {
					console.error(`[unocss] Failed to fetch web fonts: ${url}`);
					console.error(e);
					if (typeof process !== "undefined" && process.env.CI) throw e;
				});
				return await importCache[url];
			} else return `@import url('${url}');`;
		}
		const enabledProviders = Array.from(new Set(fonts.map((i) => i.provider)));
		async function getCSSDefault(fonts$1, providers) {
			const preflights = [];
			for (const provider of providers) {
				const fontsForProvider = fonts$1.filter((i) => i.provider.name === provider.name);
				if (provider.getImportUrl) {
					const url = provider.getImportUrl(fontsForProvider);
					if (url) preflights.push(await importUrl(url));
				}
				try {
					preflights.push(await provider.getPreflight?.(fontsForProvider, fetchWithTimeout));
				} catch (e) {
					console.warn(`[unocss] Web fonts preflight fetch failed.`, e);
				}
			}
			return preflights.filter(Boolean).join("\n");
		}
		const preset = {
			name: "@unocss/preset-web-fonts",
			preflights: [{
				async getCSS() {
					let css;
					for (const processor of processors) {
						const result = await processor.getCSS?.(fonts, enabledProviders, getCSSDefault);
						if (result) {
							css = result;
							break;
						}
					}
					if (!css) css = await getCSSDefault(fonts, enabledProviders);
					for (const processor of processors) css = await processor.transformCSS?.(css) || css;
					return css;
				},
				layer: layerName
			}],
			layers: { [fontLayer]: -200 }
		};
		if (extendTheme) preset.extendTheme = (theme, config) => {
			const hasWind4 = config.presets.some((p) => p.name === "@unocss/preset-wind4");
			const themeKey = options.themeKey ?? (hasWind4 ? "font" : "fontFamily");
			if (!theme[themeKey]) theme[themeKey] = {};
			const obj = Object.fromEntries(Object.entries(fontObject).map(([name, fonts$1]) => [name, fonts$1.map((f) => f.provider.getFontName?.(f) ?? `"${f.name}"`)]));
			for (const key of Object.keys(obj)) if (typeof theme[themeKey][key] === "string") theme[themeKey][key] = obj[key].map((i) => `${i},`).join("") + theme[themeKey][key];
			else theme[themeKey][key] = obj[key].join(",");
		};
		return preset;
	};
}
var userAgentWoff2 = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
var defaultFetch = async (url) => (await import("./dist-BoIO7K9F.js")).$fetch(url, {
	headers: { "User-Agent": userAgentWoff2 },
	retry: 3
});
var src_default$5 = definePreset(createWebFontPreset(defaultFetch));
var src_default$6 = definePreset((options = {}) => {
	return {
		...presetWind3(options),
		name: "@unocss/preset-wind"
	};
});
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/postprocess.mjs
function important({ important: option }) {
	if (option == null || option === false) return [];
	const wrapWithIs = (selector) => {
		if (selector.startsWith(":is(") && selector.endsWith(")")) return selector;
		if (selector.includes("::")) return selector.replace(/(.*?)((?:\s\*)?::.*)/, ":is($1)$2");
		return `:is(${selector})`;
	};
	return [(util) => {
		if (util.layer === "properties") return;
		if (option === true) util.entries.forEach((i) => {
			if (i[1] != null && !String(i[1]).endsWith("!important")) i[1] += " !important";
		});
		else if (!util.selector.startsWith(option)) util.selector = `${option} ${wrapWithIs(util.selector)}`;
	}];
}
function varPrefix({ variablePrefix: prefix }) {
	const processor = (obj) => {
		obj.entries.forEach((i) => {
			i[0] = i[0].replace(/^--un-/, `--${prefix}`);
			if (typeof i[1] === "string") i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`);
		});
	};
	return prefix !== "un-" ? [processor] : [];
}
function postprocessors(options) {
	return [important, varPrefix].flatMap((i) => i(options));
}
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/chunk-w_xFUvYo.mjs
var __defProp = Object.defineProperty;
var __exportAll = (all, symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/utils-B_qFX7UQ.mjs
var PRESET_NAME = "@unocss/preset-wind4";
var CONTROL_NO_NEGATIVE = "$$mini-no-negative";
var SpecialColorKey = {
	transparent: "transparent",
	current: "currentColor",
	inherit: "inherit"
};
var directionMap = {
	"l": ["-left"],
	"r": ["-right"],
	"t": ["-top"],
	"b": ["-bottom"],
	"s": ["-inline-start"],
	"e": ["-inline-end"],
	"x": ["-inline"],
	"y": ["-block"],
	"": [""],
	"bs": ["-block-start"],
	"be": ["-block-end"],
	"is": ["-inline-start"],
	"ie": ["-inline-end"],
	"block": ["-block-start", "-block-end"],
	"inline": ["-inline-start", "-inline-end"]
};
var insetMap = {
	...directionMap,
	x: ["-inset-inline"],
	y: ["-inset-block"],
	s: ["-inset-inline-start"],
	start: ["-inset-inline-start"],
	e: ["-inset-inline-end"],
	end: ["-inset-inline-end"],
	bs: ["-inset-block-start"],
	be: ["-inset-block-end"],
	is: ["-inset-inline-start"],
	ie: ["-inset-inline-end"],
	block: ["-inset-block-start", "-inset-block-end"],
	inline: ["-inset-inline-start", "-inset-inline-end"]
};
var cornerMap = {
	"l": ["-top-left", "-bottom-left"],
	"r": ["-top-right", "-bottom-right"],
	"t": ["-top-left", "-top-right"],
	"b": ["-bottom-left", "-bottom-right"],
	"tl": ["-top-left"],
	"lt": ["-top-left"],
	"tr": ["-top-right"],
	"rt": ["-top-right"],
	"bl": ["-bottom-left"],
	"lb": ["-bottom-left"],
	"br": ["-bottom-right"],
	"rb": ["-bottom-right"],
	"": [""],
	"bs": ["-start-start", "-start-end"],
	"be": ["-end-start", "-end-end"],
	"s": ["-end-start", "-start-start"],
	"is": ["-end-start", "-start-start"],
	"e": ["-start-end", "-end-end"],
	"ie": ["-start-end", "-end-end"],
	"ss": ["-start-start"],
	"bs-is": ["-start-start"],
	"is-bs": ["-start-start"],
	"se": ["-start-end"],
	"bs-ie": ["-start-end"],
	"ie-bs": ["-start-end"],
	"es": ["-end-start"],
	"be-is": ["-end-start"],
	"is-be": ["-end-start"],
	"ee": ["-end-end"],
	"be-ie": ["-end-end"],
	"ie-be": ["-end-end"]
};
var xyzMap = {
	"x": ["-x"],
	"y": ["-y"],
	"z": ["-z"],
	"": ["-x", "-y"]
};
var xyzArray = [
	"x",
	"y",
	"z"
];
var basePositionMap = [
	"top",
	"top center",
	"top left",
	"top right",
	"bottom",
	"bottom center",
	"bottom left",
	"bottom right",
	"left",
	"left center",
	"left top",
	"left bottom",
	"right",
	"right center",
	"right top",
	"right bottom",
	"center",
	"center top",
	"center bottom",
	"center left",
	"center right",
	"center center"
];
var positionMap = Object.assign({}, ...basePositionMap.map((p) => ({ [p.replace(/ /, "-")]: p })), ...basePositionMap.map((p) => ({ [p.replace(/\b(\w)\w+/g, "$1").replace(/ /, "")]: p })));
var globalKeywords = [
	"inherit",
	"initial",
	"revert",
	"revert-layer",
	"unset"
];
var cssMathFnRE = /^(calc|clamp|min|max)\s*\((.+)\)(.*)/;
var cssVarFnRE = /^(var)\s*\((.+)\)(.*)/;
var numberWithUnitRE = /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i;
var numberRE$1 = /^(-?\d*(?:\.\d+)?)$/;
var unitOnlyRE = /^(px|[sld]?v[wh])$/i;
var unitOnlyMap = {
	px: 1,
	vw: 100,
	vh: 100,
	svw: 100,
	svh: 100,
	dvw: 100,
	dvh: 100,
	lvh: 100,
	lvw: 100
};
var bracketTypeRe = /^\[(color|image|length|size|position|quoted|string|number|family):/i;
var splitComma = /,(?![^()]*\))/g;
var handlers_exports = /* @__PURE__ */ __exportAll({
	auto: () => auto,
	bracket: () => bracket,
	bracketOfColor: () => bracketOfColor,
	bracketOfFamily: () => bracketOfFamily,
	bracketOfLength: () => bracketOfLength,
	bracketOfNumber: () => bracketOfNumber,
	bracketOfPosition: () => bracketOfPosition,
	cssvar: () => cssvar,
	degree: () => degree,
	fraction: () => fraction,
	global: () => global,
	none: () => none,
	number: () => number$1,
	numberWithUnit: () => numberWithUnit,
	percent: () => percent,
	position: () => position,
	properties: () => properties$2,
	px: () => px,
	rem: () => rem,
	time: () => time$1
});
var cssProps = [
	"color",
	"border-color",
	"background-color",
	"outline-color",
	"text-decoration-color",
	"flex-grow",
	"flex",
	"flex-shrink",
	"grid",
	"grid-template-columns",
	"grid-template-rows",
	"caret-color",
	"font",
	"gap",
	"opacity",
	"visibility",
	"z-index",
	"font-weight",
	"zoom",
	"text-shadow",
	"transform",
	"box-shadow",
	"border",
	"background-position",
	"left",
	"right",
	"top",
	"bottom",
	"object-position",
	"max-height",
	"min-height",
	"max-width",
	"min-width",
	"height",
	"width",
	"border-width",
	"margin",
	"padding",
	"outline-width",
	"outline-offset",
	"font-size",
	"line-height",
	"text-indent",
	"vertical-align",
	"border-spacing",
	"letter-spacing",
	"word-spacing",
	"stroke",
	"filter",
	"backdrop-filter",
	"fill",
	"mask",
	"mask-size",
	"mask-border",
	"clip-path",
	"clip",
	"border-radius"
];
function round(n) {
	return +n.toFixed(10);
}
function numberWithUnit(str) {
	const match = str.match(numberWithUnitRE);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (unit && !Number.isNaN(num)) return `${round(num)}${unit}`;
}
function auto(str) {
	if (str === "auto" || str === "a") return "auto";
}
function rem(str) {
	if (!str) return;
	if (unitOnlyRE.test(str)) return `${unitOnlyMap[str]}${str}`;
	const match = str.match(numberWithUnitRE);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (!Number.isNaN(num)) {
		if (num === 0) return "0";
		return unit ? `${round(num)}${unit}` : `${round(num / 4)}rem`;
	}
}
function px(str) {
	if (unitOnlyRE.test(str)) return `${unitOnlyMap[str]}${str}`;
	const match = str.match(numberWithUnitRE);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (!Number.isNaN(num)) return unit ? `${round(num)}${unit}` : `${round(num)}px`;
}
function number$1(str) {
	if (!numberRE$1.test(str)) return;
	const num = Number.parseFloat(str);
	if (!Number.isNaN(num)) return round(num);
}
function percent(str) {
	if (str.endsWith("%")) str = str.slice(0, -1);
	const num = number$1(str);
	if (num != null) return `${num}%`;
}
function fraction(str) {
	if (!str) return;
	if (str === "full") return "100%";
	const [left, right] = str.split("/");
	const num = Number.parseFloat(left) / Number.parseFloat(right);
	if (!Number.isNaN(num)) {
		if (num === 0) return "0";
		return `${round(num * 100)}%`;
	}
}
function processThemeVariable(name, key, paths, theme) {
	const valOrObj = getThemeByKey(theme, key, paths);
	const hasDefault = typeof valOrObj === "object" && "DEFAULT" in valOrObj;
	if (hasDefault) paths.push("DEFAULT");
	const val = hasDefault ? valOrObj.DEFAULT : valOrObj;
	const varKey = hasDefault && key !== "spacing" ? `${name}.DEFAULT` : name;
	if (val != null) themeTracking(key, paths.length ? paths : void 0);
	return {
		val,
		varKey
	};
}
function bracketWithType(str, requiredType, theme) {
	if (str && str.startsWith("[") && str.endsWith("]")) {
		let base;
		let hintedType;
		const match = str.match(bracketTypeRe);
		if (!match) base = str.slice(1, -1);
		else {
			if (!requiredType) hintedType = match[1];
			else if (match[1] !== requiredType) return;
			base = str.slice(match[0].length, -1);
		}
		if (!base) return;
		if (base === "=\"\"") return;
		if (base.startsWith("--")) {
			const calcMatch = base.match(/^--([\w.-]+)\(([^)]+)\)$/);
			if (calcMatch != null && theme) {
				const [, name, factor] = calcMatch;
				const [key, ...paths] = name.split(".");
				const { val, varKey } = processThemeVariable(name, key, paths, theme);
				if (val != null) base = `calc(var(--${escapeSelector(varKey.replaceAll(".", "-"))}) * ${factor})`;
			} else {
				const [name, defaultValue] = base.slice(2).split(",");
				const suffix = defaultValue ? `, ${defaultValue}` : "";
				const escapedName = escapeSelector(name);
				if (theme) {
					const [key, ...paths] = name.split(".");
					const { val, varKey } = processThemeVariable(name, key, paths, theme);
					base = val != null ? `var(--${escapeSelector(varKey.replaceAll(".", "-"))}${suffix})` : `var(--${escapedName}${suffix})`;
				} else base = `var(--${escapedName}${suffix})`;
			}
		}
		let curly = 0;
		for (const i of base) if (i === "[") curly += 1;
		else if (i === "]") {
			curly -= 1;
			if (curly < 0) return;
		}
		if (curly) return;
		switch (hintedType) {
			case "string": return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_");
			case "quoted": return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(["\\])/g, "\\$1").replace(/^(.+)$/, "\"$1\"");
		}
		return base.replace(/(url\(.*?\))/g, (v) => v.replace(/_/g, "\\_")).replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(?:calc|clamp|max|min)\((.*)/g, (match$1) => {
			const vars = [];
			return match$1.replace(/var\((--.+?)[,)]/g, (match$2, g1) => {
				vars.push(g1);
				return match$2.replace(g1, "--un-calc");
			}).replace(/(-?\d*\.?\d(?!-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ").replace(/--un-calc/g, () => vars.shift());
		});
	}
}
function bracket(str, theme) {
	return bracketWithType(str, void 0, theme);
}
function bracketOfColor(str, theme) {
	return bracketWithType(str, "color", theme);
}
function bracketOfLength(str, theme) {
	return bracketWithType(str, "length", theme) || bracketWithType(str, "size", theme);
}
function bracketOfPosition(str, theme) {
	return bracketWithType(str, "position", theme);
}
function bracketOfFamily(str, theme) {
	return bracketWithType(str, "family", theme);
}
function bracketOfNumber(str, theme) {
	return bracketWithType(str, "number", theme);
}
function cssvar(str) {
	if (str.startsWith("var(")) return str;
	const match = str.match(/^(?:\$|--)([^\s'"`;{}]+)$/);
	if (match) {
		const [name, defaultValue] = match[1].split(",");
		return `var(--${escapeSelector(name)}${defaultValue ? `, ${defaultValue}` : ""})`;
	}
}
function time$1(str) {
	const match = str.match(/^(-?[0-9.]+)(s|ms)?$/i);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (!Number.isNaN(num)) {
		if (num === 0 && !unit) return "0s";
		return unit ? `${round(num)}${unit}` : `${round(num)}ms`;
	}
}
function degree(str) {
	const match = str.match(/^(-?[0-9.]+)(deg|rad|grad|turn)?$/i);
	if (!match) return;
	const [, n, unit] = match;
	const num = Number.parseFloat(n);
	if (!Number.isNaN(num)) {
		if (num === 0) return "0deg";
		return unit ? `${round(num)}${unit}` : `${round(num)}deg`;
	}
}
function global(str) {
	if (globalKeywords.includes(str)) return str;
}
function properties$2(str) {
	if (str.split(",").every((prop) => cssProps.includes(prop))) return str;
}
function position(str) {
	if ([
		"top",
		"left",
		"right",
		"bottom",
		"center"
	].includes(str)) return str;
}
function none(str) {
	if (str === "none") return "none";
}
var h = createValueHandler(handlers_exports);
function numberResolver(size, defaultValue) {
	const v = h.number(size) ?? defaultValue;
	if (v != null) {
		let num = Number(v);
		if (String(v).endsWith("%")) num = Number(String(v).slice(0, -1)) / 100;
		return num;
	}
}
/**
* Returns a {@link DynamicMatcher} that generates spacing CSS properties for directional utilities.
*
* @param property - The base CSS property name (e.g. 'margin', 'padding').
* @param map - Optional mapping of direction keys to property postfixes. Defaults to {@link directionMap}.
* @param formatter - Optional function to format the final property name. Defaults to `(p, d) => \`\${p}\${d}\``.
*/
function directionSize(property, map = directionMap, formatter = (p, d) => `${p}${d}`) {
	return (([_, direction, size = "4"], { theme }) => {
		if (size != null && direction != null) {
			let v;
			const isNegative = size.startsWith("-");
			if (isNegative) size = size.slice(1);
			v = numberResolver(size);
			if (v != null && !Number.isNaN(v)) {
				themeTracking("spacing");
				return map[direction].map((i) => [formatter(property, i), `calc(var(--spacing) * ${isNegative ? "-" : ""}${v})`]);
			} else if (theme.spacing && size in theme.spacing) {
				themeTracking("spacing", size);
				return map[direction].map((i) => [formatter(property, i), isNegative ? `calc(var(--${escapeSelector(`spacing-${size}`)}) * -1)` : `var(--${escapeSelector(`spacing-${size}`)})`]);
			}
			v = h.bracket.cssvar.global.auto.fraction.rem(isNegative ? `-${size}` : size, theme);
			if (v != null) return map[direction].map((i) => [formatter(property, i), v]);
		}
	});
}
/**
* Parse color string into {@link ParsedColorValue} (if possible). Color value will first be matched to theme object before parsing.
* See also color.tests.ts for more examples.
*
* @example Parseable strings:
* 'red' // From theme, if 'red' is available
* 'red-100' // From theme, plus scale
* 'red-100/20' // From theme, plus scale/opacity
* '[rgb(100 2 3)]/[var(--op)]' // Bracket with rgb color and bracket with opacity
* '[rgb(100 2 3)]/[var(--op)]/[in_oklab]' // Bracket with rgb color, bracket with opacity and bracket with interpolation method
*
* @param body - Color string to be parsed.
* @param theme - {@link Theme} object.
* @return object if string is parseable.
*/
function parseColor(body, theme) {
	let split;
	const [front, ...rest] = getStringComponents(body, ["/", ":"], 3) ?? [];
	if (front != null) {
		const match = (front.match(bracketTypeRe) ?? [])[1];
		if (match == null || match === "color") split = [front, ...rest];
	}
	if (!split) return;
	let opacity;
	let [main, opacityOrModifier, modifier] = split;
	if (isInterpolatedMethod(opacityOrModifier) || isInterpolatedMethod(h.bracket(opacityOrModifier ?? ""))) modifier = opacityOrModifier;
	else opacity = opacityOrModifier;
	const colors = main.replace(/([a-z])(\d)(?![-_a-z])/g, "$1-$2").split(/-/g);
	const [name] = colors;
	if (!name) return;
	let parsed = parseThemeColor(theme, colors);
	if (!parsed && colors.length >= 2) {
		const last = colors.at(-1);
		const secondLast = colors.at(-2);
		if (/^\d+$/.test(last)) parsed = parseThemeColor(theme, colors.slice(0, -2).concat([`${secondLast}${last}`]));
	}
	let { no, keys, color } = parsed ?? {};
	if (!color) {
		const bracket$1 = h.bracketOfColor(main, theme);
		const bracketOrMain = bracket$1 || main;
		if (h.numberWithUnit(bracketOrMain)) return;
		if (/^#[\da-f]+$/i.test(bracketOrMain)) color = bracketOrMain;
		else if (/^hex-[\da-fA-F]+$/.test(bracketOrMain)) color = `#${bracketOrMain.slice(4)}`;
		else if (main.startsWith("$")) color = h.cssvar(main);
		color = color || bracket$1;
	}
	return {
		opacity,
		modifier: modifier && h.bracket.cssvar(modifier) || modifier,
		name,
		no,
		color: color ?? SpecialColorKey[name],
		alpha: h.bracket.cssvar.percent(opacity ?? ""),
		keys,
		get cssColor() {
			return parseCssColor(this.color);
		}
	};
}
function parseThemeColor(theme, keys) {
	let color;
	let no;
	let key;
	const colorData = getThemeByKey(theme, "colors", keys);
	if (typeof colorData === "object") {
		if ("DEFAULT" in colorData) {
			color = colorData.DEFAULT;
			no = "DEFAULT";
			key = [...keys, no];
		}
	} else if (typeof colorData === "string") {
		color = colorData;
		key = keys;
		no = keys.at(-1);
	}
	if (!color) return;
	return {
		color,
		no,
		keys: key
	};
}
function getThemeByKey(theme, themeKey, keys) {
	const obj = theme[themeKey];
	function deepGet(current, path) {
		if (path.length === 0) return current;
		if (!current || typeof current !== "object") return void 0;
		for (let i = path.length; i > 0; i--) {
			const flatKey = path.slice(0, i).join("-");
			if (flatKey in current) {
				const v = current[flatKey];
				if (i === path.length) return v;
				return deepGet(v, path.slice(i));
			}
		}
	}
	return deepGet(obj, keys);
}
function colorCSSGenerator(data, property, varName, ctx) {
	if (!data) return;
	const { color, keys, alpha, modifier } = data;
	const rawColorComment = ctx?.generator.config.envMode === "dev" && color ? ` /* ${color} */` : "";
	const css = {};
	if (color) {
		const result = [css];
		const isCSSVar = color.includes("var(");
		const isSpecial = Object.values(SpecialColorKey).includes(color);
		if (isSpecial && !alpha) {
			css[property] = color;
			return result;
		}
		const alphaKey = `--un-${varName}-opacity`;
		const value = keys && !isCSSVar && !isSpecial ? generateThemeVariable("colors", keys) : color;
		let method = modifier ?? (keys ? "in srgb" : "in oklab");
		if (!method.startsWith("in ") && !method.startsWith("var(")) method = `in ${method}`;
		css[property] = `color-mix(${method}, ${value} ${alpha ?? `var(${alphaKey})`}, transparent)${rawColorComment}`;
		result.push(defineProperty(alphaKey, {
			syntax: "<percentage>",
			initialValue: "100%"
		}));
		if (!isSpecial) {
			if (keys && !isCSSVar) {
				themeTracking(`colors`, keys);
				if (!modifier) {
					const colorValue = [
						"shadow",
						"inset-shadow",
						"text-shadow",
						"drop-shadow"
					].includes(varName) ? `${alpha ? `color-mix(in oklab, ${value} ${alpha}, transparent)` : `${value}`} var(${alphaKey})` : `${value} ${alpha ?? `var(${alphaKey})`}`;
					result.push({
						[symbols.parent]: "@supports (color: color-mix(in lab, red, red))",
						[symbols.noMerge]: true,
						[property]: `color-mix(in oklab, ${colorValue}, transparent)${rawColorComment}`
					});
				}
			}
			if (ctx?.theme) detectThemeValue(color, ctx.theme);
		}
		return result;
	}
}
function colorResolver(property, varName) {
	return ([, body], ctx) => {
		const data = parseColor(body ?? "", ctx.theme);
		if (!data) return;
		return colorCSSGenerator(data, property, varName, ctx);
	};
}
function colorableShadows(shadows, colorVar, alpha) {
	const colored = [];
	shadows = toArray(shadows);
	for (let i = 0; i < shadows.length; i++) {
		const components = getStringComponents(shadows[i], " ", 6);
		if (!components || components.length < 3) return shadows;
		let isInset = false;
		const pos = components.indexOf("inset");
		if (pos !== -1) {
			components.splice(pos, 1);
			isInset = true;
		}
		let colorVarValue = "";
		const lastComp = components.at(-1);
		if (parseCssColor(components.at(0))) {
			const color = parseCssColor(components.shift());
			if (color) colorVarValue = colorToString(color);
		} else if (parseCssColor(lastComp)) {
			const color = parseCssColor(components.pop());
			if (color) colorVarValue = colorToString(color);
		} else if (lastComp && lastComp.startsWith("var(")) {
			const color = components.pop();
			if (color) colorVarValue = color;
		}
		colored.push(`${isInset ? "inset " : ""}${components.join(" ")} var(${colorVar}, ${alpha ? `oklab(from ${colorVarValue} l a b / ${alpha})` : colorVarValue})`);
	}
	return colored;
}
function hasParseableColor(color, theme) {
	return color != null && !!parseColor(color, theme)?.color;
}
var reLetters = /[a-z]+/gi;
var resolvedBreakpoints = /* @__PURE__ */ new WeakMap();
function resolveBreakpoints({ theme, generator }, key = "breakpoint") {
	const breakpoints = (generator?.userConfig?.theme)?.[key] || theme[key];
	if (!breakpoints) return void 0;
	if (resolvedBreakpoints.has(theme)) return resolvedBreakpoints.get(theme);
	const resolved = Object.entries(breakpoints).sort((a, b) => Number.parseInt(a[1].replace(reLetters, "")) - Number.parseInt(b[1].replace(reLetters, ""))).map(([point, size]) => ({
		point,
		size
	}));
	resolvedBreakpoints.set(theme, resolved);
	return resolved;
}
function makeGlobalStaticRules(prefix, property) {
	return globalKeywords.map((keyword) => [`${prefix}-${keyword}`, { [property ?? prefix]: keyword }]);
}
function defineProperty(property, options = {}) {
	const { syntax = "*", inherits = false, initialValue } = options;
	const value = {
		[symbols.shortcutsNoMerge]: true,
		[symbols.noMerge]: true,
		[symbols.noScope]: true,
		[symbols.variants]: () => [{
			parent: "",
			layer: "properties",
			selector: () => `@property ${property}`
		}],
		syntax: JSON.stringify(syntax),
		inherits: inherits ? "true" : "false"
	};
	if (initialValue != null) value["initial-value"] = initialValue;
	propertyTracking(property, initialValue ? String(initialValue) : "initial");
	return value;
}
function isCSSMathFn(value) {
	return value != null && cssMathFnRE.test(value);
}
function isSize(str) {
	if (str[0] === "[" && str.slice(-1) === "]") str = str.slice(1, -1);
	return cssMathFnRE.test(str) || numberWithUnitRE.test(str);
}
function hyphenate(str) {
	return str.replace(/(?:^|\B)([A-Z])/g, "-$1").toLowerCase();
}
function compressCSS(css, isDev = false) {
	if (isDev) return css.trim();
	return css.trim().replace(/\s+/g, " ").replace(/\/\*[\s\S]*?\*\//g, "");
}
/**
* Used to track theme keys.
*
* eg: colors:red-100
*
* @internal
*/
var trackedTheme = /* @__PURE__ */ new Set([]);
function themeTracking(key, props = "DEFAULT") {
	const k = `${key}:${toArray(props).join("-")}`;
	if (!trackedTheme.has(k)) trackedTheme.add(k);
}
function generateThemeVariable(key, props) {
	return `var(--${key}-${toArray(props).join("-")})`;
}
function detectThemeValue(value, theme) {
	if (value.startsWith("var(")) {
		const variable = value.match(/var\(--([\w-]+)(?:,.*)?\)/)?.[1];
		if (variable) {
			const [key, ...path] = variable.split("-");
			const themeValue = getThemeByKey(theme, key, path);
			if (typeof themeValue === "string") {
				themeTracking(key, path);
				detectThemeValue(themeValue, theme);
			}
		}
	}
}
var trackedProperties = /* @__PURE__ */ new Map();
function propertyTracking(property, value) {
	if (!trackedProperties.has(property)) trackedProperties.set(property, value);
}
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/container-BsDB8iH5.mjs
var containerParent = [[/^@container(?:\/(\w+))?(?:-(normal))?$/, ([, l, v]) => {
	return {
		"container-type": v ?? "inline-size",
		"container-name": l
	};
}]];
var queryMatcher = /@media \(min-width: (.+)\)/;
var container$1 = [[
	/^__container$/,
	(_, context) => {
		const { theme, variantHandlers } = context;
		const themePadding = theme.containers?.padding;
		let padding;
		if (isString(themePadding)) padding = themePadding;
		else padding = themePadding?.DEFAULT;
		const themeMaxWidth = theme.containers?.maxWidth;
		let maxWidth;
		for (const v of variantHandlers) {
			const query = v.handle?.({}, (x) => x)?.parent;
			if (isString(query)) {
				const match = query.match(queryMatcher)?.[1];
				if (match) {
					const matchBp = (resolveBreakpoints(context) ?? []).find((i) => i.size === match)?.point;
					if (!themeMaxWidth) maxWidth = match;
					else if (matchBp) maxWidth = themeMaxWidth?.[matchBp];
					if (matchBp && !isString(themePadding)) padding = themePadding?.[matchBp] ?? padding;
				}
			}
		}
		const css = { "max-width": maxWidth };
		if (!variantHandlers.length) css.width = "100%";
		if (theme.containers?.center) {
			css["margin-left"] = "auto";
			css["margin-right"] = "auto";
		}
		if (themePadding) {
			css["padding-left"] = padding;
			css["padding-right"] = padding;
		}
		return css;
	},
	{ internal: true }
]];
var containerShortcuts = [[/^(?:(\w+)[:-])?container$/, ([, bp], context) => {
	let points = (resolveBreakpoints(context) ?? []).map((i) => i.point);
	if (bp) {
		if (!points.includes(bp)) return;
		points = points.slice(points.indexOf(bp));
	}
	const shortcuts = points.map((p) => `${p}:__container`);
	if (!bp) shortcuts.unshift("__container");
	return shortcuts;
}]];
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/rules.mjs
var verticalAlignAlias = {
	"mid": "middle",
	"base": "baseline",
	"btm": "bottom",
	"baseline": "baseline",
	"top": "top",
	"start": "top",
	"middle": "middle",
	"bottom": "bottom",
	"end": "bottom",
	"text-top": "text-top",
	"text-bottom": "text-bottom",
	"sub": "sub",
	"super": "super",
	...Object.fromEntries(globalKeywords.map((x) => [x, x]))
};
var verticalAligns = [[
	/^(?:vertical|align|v)-(.+)$/,
	([, v]) => ({ "vertical-align": verticalAlignAlias[v] ?? h.bracket.cssvar.numberWithUnit(v) }),
	{ autocomplete: [`(vertical|align|v)-(${Object.keys(verticalAlignAlias).join("|")})`, "(vertical|align|v)-<percentage>"] }
]];
var textAlignValues = [
	"center",
	"left",
	"right",
	"justify",
	"start",
	"end"
];
var textAligns = [...textAlignValues.map((v) => [`text-${v}`, { "text-align": v }]), ...[...globalKeywords, ...textAlignValues].map((v) => [`text-align-${v}`, { "text-align": v }])];
var animations = [
	[
		/^(?:animate-)?keyframes-(.+)$/,
		([, name], { theme }) => {
			const kf = theme.animation?.keyframes?.[name];
			if (kf) return [`@keyframes ${name}${kf}`, { animation: name }];
		},
		{ autocomplete: ["animate-keyframes-$animation.keyframes", "keyframes-$animation.keyframes"] }
	],
	[
		/^animate-(.+)$/,
		([, name], { theme }) => {
			const kf = theme.animation?.keyframes?.[name];
			if (kf) {
				const duration = theme.animation?.durations?.[name] ?? "1s";
				const timing = theme.animation?.timingFns?.[name] ?? "linear";
				const count = theme.animation?.counts?.[name] ?? 1;
				const props = theme.animation?.properties?.[name];
				return [`@keyframes ${name}${kf}`, {
					animation: `${name} ${duration} ${timing} ${count}`,
					...props
				}];
			}
			return { animation: h.bracket.cssvar(name) };
		},
		{ autocomplete: "animate-$animation.keyframes" }
	],
	[/^animate-name-(.+)/, ([, d]) => ({ "animation-name": h.bracket.cssvar(d) ?? d })],
	[
		/^animate-duration-(.+)$/,
		([, d], { theme }) => ({ "animation-duration": theme.duration?.[d || "DEFAULT"] ?? h.bracket.cssvar.time(d) }),
		{ autocomplete: ["animate-duration"] }
	],
	[
		/^animate-delay-(.+)$/,
		([, d], { theme }) => ({ "animation-delay": theme.duration?.[d || "DEFAULT"] ?? h.bracket.cssvar.time(d) }),
		{ autocomplete: ["animate-delay"] }
	],
	[
		/^animate-ease(?:-(.+))?$/,
		([, d], { theme }) => ({ "animation-timing-function": theme.ease?.[d || "DEFAULT"] ?? h.bracket.cssvar(d) }),
		{ autocomplete: ["animate-ease", "animate-ease-$ease"] }
	],
	[
		/^animate-(fill-mode-|fill-|mode-)?(.+)$/,
		([, t, d]) => [
			"none",
			"forwards",
			"backwards",
			"both",
			...[t ? globalKeywords : []]
		].includes(d) ? { "animation-fill-mode": d } : void 0,
		{ autocomplete: [
			"animate-(fill|mode|fill-mode)",
			"animate-(fill|mode|fill-mode)-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)",
			"animate-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)"
		] }
	],
	[
		/^animate-(direction-)?(.+)$/,
		([, t, d]) => [
			"normal",
			"reverse",
			"alternate",
			"alternate-reverse",
			...[t ? globalKeywords : []]
		].includes(d) ? { "animation-direction": d } : void 0,
		{ autocomplete: [
			"animate-direction",
			"animate-direction-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)",
			"animate-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)"
		] }
	],
	[
		/^animate-(?:iteration-count-|iteration-|count-)(.+)$/,
		([, d]) => ({ "animation-iteration-count": h.bracket.cssvar(d) ?? d.replace(/-/g, ",") }),
		{ autocomplete: ["animate-(iteration|count|iteration-count)", "animate-(iteration|count|iteration-count)-<num>"] }
	],
	[
		/^animate-(play-state-|play-|state-)?(.+)$/,
		([, t, d]) => [
			"paused",
			"running",
			...[t ? globalKeywords : []]
		].includes(d) ? { "animation-play-state": d } : void 0,
		{ autocomplete: [
			"animate-(play|state|play-state)",
			"animate-(play|state|play-state)-(paused|running|inherit|initial|revert|revert-layer|unset)",
			"animate-(paused|running|inherit|initial|revert|revert-layer|unset)"
		] }
	],
	["animate-none", { animation: "none" }],
	...makeGlobalStaticRules("animate", "animation")
];
var properties$1 = {
	"gradient-position": defineProperty("--un-gradient-position"),
	"gradient-from": defineProperty("--un-gradient-from", {
		syntax: "<color>",
		initialValue: "#0000"
	}),
	"gradient-via": defineProperty("--un-gradient-via", {
		syntax: "<color>",
		initialValue: "#0000"
	}),
	"gradient-to": defineProperty("--un-gradient-to", {
		syntax: "<color>",
		initialValue: "#0000"
	}),
	"gradient-stops": defineProperty("--un-gradient-stops"),
	"gradient-via-stops": defineProperty("--un-gradient-via-stops"),
	"gradient-from-position": defineProperty("--un-gradient-from-position", {
		syntax: "<length-percentage>",
		initialValue: "0%"
	}),
	"gradient-via-position": defineProperty("--un-gradient-via-position", {
		syntax: "<length-percentage>",
		initialValue: "50%"
	}),
	"gradient-to-position": defineProperty("--un-gradient-to-position", {
		syntax: "<length-percentage>",
		initialValue: "100%"
	})
};
function resolveModifier(modifier) {
	let interpolationMethod = "in oklab";
	if (modifier) if (modifier.startsWith("[") && modifier.endsWith("]")) interpolationMethod = modifier.slice(1, -1);
	else switch (modifier) {
		case "longer":
		case "shorter":
		case "increasing":
		case "decreasing":
			interpolationMethod = `in oklch ${modifier} hue`;
			break;
		default: interpolationMethod = `in ${modifier}`;
	}
	return interpolationMethod;
}
function bgGradientColorResolver() {
	return function* ([, position, body], { theme }) {
		const css = {};
		const data = parseColor(body, theme);
		if (data) {
			const { color, keys, alpha } = data;
			if (color) {
				if (Object.values(SpecialColorKey).includes(color)) css[`--un-gradient-${position}`] = color;
				else {
					css[`--un-${position}-opacity`] = alpha;
					const value = keys ? generateThemeVariable("colors", keys) : color;
					css[`--un-gradient-${position}`] = `color-mix(in oklab, ${value} var(--un-${position}-opacity), transparent)`;
					yield defineProperty(`--un-${position}-opacity`, {
						syntax: "<percentage>",
						initialValue: "100%"
					});
				}
				if (keys) themeTracking(`colors`, keys);
				if (theme) detectThemeValue(color, theme);
			}
		} else css[`--un-gradient-${position}`] = h.bracket.cssvar(body);
		if (css[`--un-gradient-${position}`]) {
			switch (position) {
				case "from":
					yield {
						...css,
						"--un-gradient-stops": "var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))"
					};
					break;
				case "via":
					yield {
						...css,
						"--un-gradient-via-stops": `var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-via) var(--un-gradient-via-position), var(--un-gradient-to) var(--un-gradient-to-position)`,
						"--un-gradient-stops": `var(--un-gradient-via-stops)`
					};
					break;
				case "to":
					yield {
						...css,
						"--un-gradient-stops": "var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))"
					};
					break;
				case "stops":
					yield { ...css };
					break;
			}
			for (const p of Object.values(properties$1)) yield p;
		}
	};
}
function bgGradientPositionResolver() {
	return function* ([, mode, body]) {
		yield { [`--un-gradient-${mode}-position`]: `${h.bracket.cssvar.percent(body)}` };
		for (const p of Object.values(properties$1)) yield p;
	};
}
var backgroundStyles = [
	[
		/^bg-(linear|radial|conic)-([^/]+)(?:\/(.+))?$/,
		([, m, d, s]) => {
			let v;
			if (h.number(d) != null) v = `from ${h.number(d)}deg ${resolveModifier(s)};`;
			else v = h.bracket(d);
			if (v) return {
				"--un-gradient-position": v,
				"background-image": `${m}-gradient(var(--un-gradient-stops))`
			};
		},
		{ autocomplete: [
			"bg-(linear|radial|conic)",
			"(from|to|via)-$colors",
			"(from|to|via)-(op|opacity)",
			"(from|to|via)-(op|opacity)-<percent>"
		] }
	],
	[/^(from|via|to|stops)-(.+)$/, bgGradientColorResolver()],
	[/^(from|via|to)-op(?:acity)?-?(.+)$/, ([, position, opacity$1]) => ({ [`--un-${position}-opacity`]: h.bracket.percent(opacity$1) })],
	[/^(from|via|to)-([\d.]+%)$/, bgGradientPositionResolver()],
	[
		/^bg-((?:repeating-)?(?:linear|radial|conic))$/,
		([, s]) => ({ "background-image": `${s}-gradient(var(--un-gradient, var(--un-gradient-stops, rgb(255 255 255 / 0))))` }),
		{ autocomplete: [
			"bg-gradient-repeating",
			"bg-gradient-(linear|radial|conic)",
			"bg-gradient-repeating-(linear|radial|conic)"
		] }
	],
	[
		/^bg-(gradient|linear|radial|conic)(?:-to-([rltb]{1,2}))?(?:\/(.+))?$/,
		([, m, d, s]) => {
			return {
				"--un-gradient-position": `${d in positionMap ? `to ${positionMap[d]} ` : " "}${resolveModifier(s)}`,
				"background-image": `${m === "gradient" ? "linear" : m}-gradient(var(--un-gradient-stops))`
			};
		},
		{ autocomplete: [
			"gradient",
			"linear",
			"radial",
			"conic"
		].map((i) => {
			return `bg-${i}-to-(${Object.keys(positionMap).filter((k) => k.length <= 2 && Array.from(k).every((c) => "rltb".includes(c))).join("|")})`;
		}) }
	],
	["bg-none", { "background-image": "none" }],
	["box-decoration-slice", { "box-decoration-break": "slice" }],
	["box-decoration-clone", { "box-decoration-break": "clone" }],
	...makeGlobalStaticRules("box-decoration", "box-decoration-break"),
	["bg-auto", { "background-size": "auto" }],
	["bg-cover", { "background-size": "cover" }],
	["bg-contain", { "background-size": "contain" }],
	[/^bg-size-(.+)$/, ([, v]) => ({ "background-size": h.bracket.cssvar(v) })],
	["bg-fixed", { "background-attachment": "fixed" }],
	["bg-local", { "background-attachment": "local" }],
	["bg-scroll", { "background-attachment": "scroll" }],
	["bg-clip-border", {
		"-webkit-background-clip": "border-box",
		"background-clip": "border-box"
	}],
	["bg-clip-content", {
		"-webkit-background-clip": "content-box",
		"background-clip": "content-box"
	}],
	["bg-clip-padding", {
		"-webkit-background-clip": "padding-box",
		"background-clip": "padding-box"
	}],
	["bg-clip-text", {
		"-webkit-background-clip": "text",
		"background-clip": "text"
	}],
	...globalKeywords.map((keyword) => [`bg-clip-${keyword}`, {
		"-webkit-background-clip": keyword,
		"background-clip": keyword
	}]),
	[/^bg-([-\w]{3,})$/, ([, s]) => ({ "background-position": positionMap[s] })],
	["bg-repeat", { "background-repeat": "repeat" }],
	["bg-no-repeat", { "background-repeat": "no-repeat" }],
	["bg-repeat-x", { "background-repeat": "repeat-x" }],
	["bg-repeat-y", { "background-repeat": "repeat-y" }],
	["bg-repeat-round", { "background-repeat": "round" }],
	["bg-repeat-space", { "background-repeat": "space" }],
	...makeGlobalStaticRules("bg-repeat", "background-repeat"),
	["bg-origin-border", { "background-origin": "border-box" }],
	["bg-origin-padding", { "background-origin": "padding-box" }],
	["bg-origin-content", { "background-origin": "content-box" }],
	...makeGlobalStaticRules("bg-origin", "background-origin")
];
var outline = [
	[
		/^outline-(?:width-|size-)?(.+)$/,
		handleWidth$2,
		{ autocomplete: "outline-(width|size)-<num>" }
	],
	[
		/^outline-(?:color-)?(.+)$/,
		handleColorOrWidth$2,
		{ autocomplete: "outline-$colors" }
	],
	[
		/^outline-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-outline-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "outline-(op|opacity)-<percent>" }
	],
	[
		/^outline-offset-(.+)$/,
		([, d]) => ({ "outline-offset": h.bracket.cssvar.global.px(d) }),
		{ autocomplete: "outline-(offset)-<num>" }
	],
	["outline-offset-none", { "outline-offset": "0" }],
	["outline", [{
		"outline-style": "var(--un-outline-style)",
		"outline-width": "1px"
	}, defineProperty("--un-outline-style", { initialValue: "solid" })]],
	["outline-hidden", [{ "outline-style": "none" }, {
		[symbols.parent]: `@media (forced-colors: active)`,
		"outline": `2px solid transparent`,
		"outline-offset": `2px`
	}]],
	["outline-none", {
		"--un-outline-style": "none",
		"outline-style": "none"
	}],
	...[
		"auto",
		"dashed",
		"dotted",
		"double",
		"solid",
		"groove",
		"ridge",
		"inset",
		"outset",
		...globalKeywords
	].map((v) => [`outline-${v}`, {
		"--un-outline-style": v,
		"outline-style": v
	}])
];
function* handleWidth$2([, b]) {
	const v = h.bracket.cssvar.global.px(b);
	if (v != null) {
		yield {
			"outline-style": "var(--un-outline-style)",
			"outline-width": v
		};
		yield defineProperty("--un-outline-style", { initialValue: "solid" });
	}
}
function* handleColorOrWidth$2(match, ctx) {
	if (isCSSMathFn(h.bracket(match[1]))) yield* handleWidth$2(match);
	else {
		const result = colorResolver("outline-color", "outline")(match, ctx);
		if (result) for (const i of result) yield i;
	}
}
var appearance = [["appearance-auto", {
	"-webkit-appearance": "auto",
	"appearance": "auto"
}], ["appearance-none", {
	"-webkit-appearance": "none",
	"appearance": "none"
}]];
function willChangeProperty(prop) {
	const v = h.bracket(prop);
	if (v && h.properties(v)) return v;
	return h.properties.auto.cssvar.global(prop) ?? {
		contents: "contents",
		scroll: "scroll-position"
	}[prop];
}
var willChange = [[/^will-change-(.+)/, ([, p]) => ({ "will-change": willChangeProperty(p) })]];
var listStyles = {
	"disc": "disc",
	"circle": "circle",
	"square": "square",
	"decimal": "decimal",
	"zero-decimal": "decimal-leading-zero",
	"greek": "lower-greek",
	"roman": "lower-roman",
	"upper-roman": "upper-roman",
	"alpha": "lower-alpha",
	"upper-alpha": "upper-alpha",
	"latin": "lower-latin",
	"upper-latin": "upper-latin"
};
var listStyle = [
	[
		/^list-(.+?)(?:-(outside|inside))?$/,
		([, alias, position]) => {
			const style = listStyles[alias];
			if (style) {
				if (position) return {
					"list-style-position": position,
					"list-style-type": style
				};
				return { "list-style-type": style };
			}
		},
		{ autocomplete: [`list-(${Object.keys(listStyles).join("|")})`, `list-(${Object.keys(listStyles).join("|")})-(outside|inside)`] }
	],
	["list-outside", { "list-style-position": "outside" }],
	["list-inside", { "list-style-position": "inside" }],
	["list-none", { "list-style-type": "none" }],
	[/^list-image-(.+)$/, ([, d]) => {
		if (/^\[url\(.+\)\]$/.test(d)) return { "list-style-image": h.bracket(d) };
	}],
	["list-image-none", { "list-style-image": "none" }],
	...makeGlobalStaticRules("list", "list-style-type")
];
var accents = [[
	/^accent-(.+)$/,
	colorResolver("accent-color", "accent"),
	{ autocomplete: "accent-$colors" }
], [
	/^accent-op(?:acity)?-?(.+)$/,
	([, d]) => ({ "--un-accent-opacity": h.bracket.percent(d) }),
	{ autocomplete: ["accent-(op|opacity)", "accent-(op|opacity)-<percent>"] }
]];
var carets = [[
	/^caret-(.+)$/,
	colorResolver("caret-color", "caret"),
	{ autocomplete: "caret-$colors" }
], [
	/^caret-op(?:acity)?-?(.+)$/,
	([, d]) => ({ "--un-caret-opacity": h.bracket.percent(d) }),
	{ autocomplete: ["caret-(op|opacity)", "caret-(op|opacity)-<percent>"] }
]];
var imageRenderings = [
	["image-render-auto", { "image-rendering": "auto" }],
	["image-render-edge", { "image-rendering": "crisp-edges" }],
	["image-render-pixel", [
		["-ms-interpolation-mode", "nearest-neighbor"],
		["image-rendering", "-webkit-optimize-contrast"],
		["image-rendering", "-moz-crisp-edges"],
		["image-rendering", "-o-pixelated"],
		["image-rendering", "pixelated"]
	]]
];
var overscrolls = [
	["overscroll-auto", { "overscroll-behavior": "auto" }],
	["overscroll-contain", { "overscroll-behavior": "contain" }],
	["overscroll-none", { "overscroll-behavior": "none" }],
	...makeGlobalStaticRules("overscroll", "overscroll-behavior"),
	["overscroll-x-auto", { "overscroll-behavior-x": "auto" }],
	["overscroll-x-contain", { "overscroll-behavior-x": "contain" }],
	["overscroll-x-none", { "overscroll-behavior-x": "none" }],
	...makeGlobalStaticRules("overscroll-x", "overscroll-behavior-x"),
	["overscroll-y-auto", { "overscroll-behavior-y": "auto" }],
	["overscroll-y-contain", { "overscroll-behavior-y": "contain" }],
	["overscroll-y-none", { "overscroll-behavior-y": "none" }],
	...makeGlobalStaticRules("overscroll-y", "overscroll-behavior-y")
];
var scrollBehaviors = [
	["scroll-auto", { "scroll-behavior": "auto" }],
	["scroll-smooth", { "scroll-behavior": "smooth" }],
	...makeGlobalStaticRules("scroll", "scroll-behavior")
];
var borderStyles = [
	"solid",
	"dashed",
	"dotted",
	"double",
	"hidden",
	"none",
	"groove",
	"ridge",
	"inset",
	"outset",
	...globalKeywords
];
var borders = [
	[
		/^(?:border|b)()(?:-(.+))?$/,
		handlerBorderSize,
		{ autocomplete: "(border|b)-<directions>" }
	],
	[/^(?:border|b)-([xy])(?:-(.+))?$/, handlerBorderSize],
	[/^(?:border|b)-([rltbse])(?:-(.+))?$/, handlerBorderSize],
	[/^(?:border|b)-(block|inline)(?:-(.+))?$/, handlerBorderSize],
	[/^(?:border|b)-([bi][se])(?:-(.+))?$/, handlerBorderSize],
	[
		/^(?:border|b)-()(?:width|size)-(.+)$/,
		handlerBorderSize,
		{ autocomplete: ["(border|b)-<num>", "(border|b)-<directions>-<num>"] }
	],
	[/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, handlerBorderSize],
	[/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, handlerBorderSize],
	[/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, handlerBorderSize],
	[/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, handlerBorderSize],
	[
		/^(?:border|b)-()(?:color-)?(.+)$/,
		handlerBorderColorOrSize,
		{ autocomplete: ["(border|b)-$colors", "(border|b)-<directions>-$colors"] }
	],
	[/^(?:border|b)-([xy])-(?:color-)?(.+)$/, handlerBorderColorOrSize],
	[/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, handlerBorderColorOrSize],
	[/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, handlerBorderColorOrSize],
	[/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, handlerBorderColorOrSize],
	[
		/^(?:border|b)-()op(?:acity)?-?(.+)$/,
		handlerBorderOpacity,
		{ autocomplete: "(border|b)-(op|opacity)-<percent>" }
	],
	[/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
	[/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
	[/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
	[/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
	[
		/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/,
		handlerRounded,
		{ autocomplete: [
			"(border|b)-(rounded|rd)",
			"(border|b)-(rounded|rd)-$radius",
			"(rounded|rd)",
			"(rounded|rd)-$radius"
		] }
	],
	[/^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/, handlerRounded],
	[/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, handlerRounded],
	[/^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/, handlerRounded],
	[/^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/, handlerRounded],
	[
		/^(?:border|b)-(?:style-)?()(.+)$/,
		handlerBorderStyle,
		{ autocomplete: [
			"(border|b)-style",
			`(border|b)-(${borderStyles.join("|")})`,
			"(border|b)-<directions>-style",
			`(border|b)-<directions>-(${borderStyles.join("|")})`,
			`(border|b)-<directions>-style-(${borderStyles.join("|")})`,
			`(border|b)-style-(${borderStyles.join("|")})`
		] }
	],
	[/^(?:border|b)-([xy])-(?:style-)?(.+)$/, handlerBorderStyle],
	[/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/, handlerBorderStyle],
	[/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/, handlerBorderStyle],
	[/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/, handlerBorderStyle]
];
function borderColorResolver(direction) {
	return ([, body], ctx) => {
		const data = parseColor(body, ctx.theme);
		const result = colorCSSGenerator(data, `border${direction}-color`, `border${direction}`, ctx);
		if (result) {
			const css = result[0];
			if (data?.color && !Object.values(SpecialColorKey).includes(data.color) && !data.alpha && direction && direction !== "") css[`--un-border${direction}-opacity`] = `var(--un-border-opacity)`;
			return result;
		}
	};
}
function handlerBorderSize([, a = "", b = "1"]) {
	const v = h.bracket.cssvar.global.px(b);
	if (a in directionMap && v != null) return directionMap[a].map((i) => [`border${i}-width`, v]);
}
function handlerBorderColorOrSize([, a = "", b], ctx) {
	if (a in directionMap) {
		if (isCSSMathFn(h.bracket(b))) return handlerBorderSize([
			"",
			a,
			b
		]);
		if (hasParseableColor(b, ctx.theme)) {
			const directions$1 = directionMap[a].map((i) => borderColorResolver(i)(["", b], ctx)).filter(notNull);
			return [directions$1.map((d) => d[0]).reduce((acc, item) => {
				Object.assign(acc, item);
				return acc;
			}, {}), ...directions$1.flatMap((d) => d.slice(1))];
		}
	}
}
function handlerBorderOpacity([, a = "", opacity$1]) {
	const v = h.bracket.percent.cssvar(opacity$1);
	if (a in directionMap && v != null) return directionMap[a].map((i) => [`--un-border${i}-opacity`, v]);
}
function handlerRounded([, a = "", s = "DEFAULT"], { theme }) {
	if (a in cornerMap) {
		if (s === "full") return cornerMap[a].map((i) => [`border${i}-radius`, "calc(infinity * 1px)"]);
		const _v = theme.radius?.[s] ?? h.bracket.cssvar.global.fraction.rem(s);
		if (_v != null) {
			const isVar = theme.radius && s in theme.radius;
			if (isVar) themeTracking(`radius`, s);
			return cornerMap[a].map((i) => [`border${i}-radius`, isVar ? generateThemeVariable("radius", s) : _v]);
		}
	}
}
function handlerBorderStyle([, a = "", s]) {
	if (borderStyles.includes(s) && a in directionMap) return [["--un-border-style", s], ...directionMap[a].map((i) => [`border${i}-style`, s])];
}
/**
* @example op10 op-30 opacity-100
*/
var opacity = [[/^op(?:acity)?-?(.+)$/, ([, d]) => ({ opacity: h.bracket.percent.cssvar(d) })]];
var bgUrlRE = /^\[url\(.+\)\]$/;
var bgLengthRE = /^\[(?:length|size):.+\]$/;
var bgPositionRE = /^\[position:.+\]$/;
var bgGradientRE = /^\[(?:linear|conic|radial)-gradient\(.+\)\]$/;
var bgImageRE = /^\[image:.+\]$/;
var bgColors = [[
	/^bg-(.+)$/,
	(...args) => {
		const d = args[0][1];
		if (bgUrlRE.test(d)) return {
			"--un-url": h.bracket(d),
			"background-image": "var(--un-url)"
		};
		if (bgLengthRE.test(d) && h.bracketOfLength(d) != null) return { "background-size": h.bracketOfLength(d).split(" ").map((e) => h.fraction.auto.px.cssvar(e) ?? e).join(" ") };
		if ((isSize(d) || bgPositionRE.test(d)) && h.bracketOfPosition(d) != null) return { "background-position": h.bracketOfPosition(d).split(" ").map((e) => h.position.fraction.auto.px.cssvar(e) ?? e).join(" ") };
		if (bgGradientRE.test(d) || bgImageRE.test(d)) {
			const s = h.bracket(d);
			if (s) {
				const url = s.startsWith("http") ? `url(${s})` : h.cssvar(s);
				return { "background-image": url ?? s };
			}
		}
		return colorResolver("background-color", "bg")(...args);
	},
	{ autocomplete: "bg-$colors" }
], [
	/^bg-op(?:acity)?-?(.+)$/,
	([, opacity$1]) => ({ "--un-bg-opacity": h.bracket.percent.cssvar(opacity$1) }),
	{ autocomplete: "bg-(op|opacity)-<percent>" }
]];
var colorScheme = [[/^(?:color-)?scheme-(.+)$/, ([, v]) => ({ "color-scheme": v.split("-").join(" ") })]];
var columns = [
	[
		/^columns-(.+)$/,
		([, v], { theme }) => {
			if (theme.container && v in theme.container) {
				themeTracking("container", v);
				return { columns: generateThemeVariable("container", v) };
			}
			return { columns: h.bracket.numberWithUnit.number.cssvar(v) };
		},
		{ autocomplete: ["columns-<num>", "columns-$container"] }
	],
	["columns-auto", { columns: "auto" }],
	["break-before-auto", { "break-before": "auto" }],
	["break-before-avoid", { "break-before": "avoid" }],
	["break-before-all", { "break-before": "all" }],
	["break-before-avoid-page", { "break-before": "avoid-page" }],
	["break-before-page", { "break-before": "page" }],
	["break-before-left", { "break-before": "left" }],
	["break-before-right", { "break-before": "right" }],
	["break-before-column", { "break-before": "column" }],
	...makeGlobalStaticRules("break-before"),
	["break-inside-auto", { "break-inside": "auto" }],
	["break-inside-avoid", { "break-inside": "avoid" }],
	["break-inside-avoid-page", { "break-inside": "avoid-page" }],
	["break-inside-avoid-column", { "break-inside": "avoid-column" }],
	...makeGlobalStaticRules("break-inside"),
	["break-after-auto", { "break-after": "auto" }],
	["break-after-avoid", { "break-after": "avoid" }],
	["break-after-all", { "break-after": "all" }],
	["break-after-avoid-page", { "break-after": "avoid-page" }],
	["break-after-page", { "break-after": "page" }],
	["break-after-left", { "break-after": "left" }],
	["break-after-right", { "break-after": "right" }],
	["break-after-column", { "break-after": "column" }],
	...makeGlobalStaticRules("break-after")
];
var decorationStyles = [
	"solid",
	"double",
	"dotted",
	"dashed",
	"wavy",
	...globalKeywords
];
var textDecorations = [
	[
		/^(?:decoration-)?(underline|overline|line-through)$/,
		([, s]) => ({ "text-decoration-line": s }),
		{ autocomplete: "decoration-(underline|overline|line-through)" }
	],
	[
		/^(?:underline|decoration)-(?:size-)?(.+)$/,
		handleWidth$1,
		{ autocomplete: "(underline|decoration)-<num>" }
	],
	[
		/^(?:underline|decoration)-(auto|from-font)$/,
		([, s]) => ({ "text-decoration-thickness": s }),
		{ autocomplete: "(underline|decoration)-(auto|from-font)" }
	],
	[
		/^(?:underline|decoration)-(.+)$/,
		handleColorOrWidth$1,
		{ autocomplete: "(underline|decoration)-$colors" }
	],
	[
		/^(?:underline|decoration)-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-line-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "(underline|decoration)-(op|opacity)-<percent>" }
	],
	[
		/^(?:underline|decoration)-offset-(.+)$/,
		([, s]) => ({ "text-underline-offset": h.auto.bracket.cssvar.global.px(s) }),
		{ autocomplete: "(underline|decoration)-(offset)-<num>" }
	],
	...decorationStyles.map((v) => [`underline-${v}`, { "text-decoration-style": v }]),
	...decorationStyles.map((v) => [`decoration-${v}`, { "text-decoration-style": v }]),
	["no-underline", { "text-decoration": "none" }],
	["decoration-none", { "text-decoration": "none" }]
];
function handleWidth$1([, b]) {
	return { "text-decoration-thickness": h.bracket.cssvar.global.px(b) };
}
function handleColorOrWidth$1(match, ctx) {
	if (isCSSMathFn(h.bracket(match[1]))) return handleWidth$1(match);
	const result = colorResolver("text-decoration-color", "line")(match, ctx);
	if (result) {
		const css = result[0];
		css["-webkit-text-decoration-color"] = css["text-decoration-color"];
		return result;
	}
}
var paddings = [
	[
		/^pa?()-?(.+)$/,
		directionSize("padding"),
		{ autocomplete: ["(m|p)<num>", "(m|p)-<num>"] }
	],
	[
		/^p-?xy()()$/,
		directionSize("padding"),
		{ autocomplete: "(m|p)-(xy)" }
	],
	[/^p-?([xy])(?:-?(.+))?$/, directionSize("padding")],
	[
		/^p-?([rltbse])(?:-?(.+))?$/,
		directionSize("padding"),
		{ autocomplete: "(m|p)<directions>-<num>" }
	],
	[
		/^p-(block|inline)(?:-(.+))?$/,
		directionSize("padding"),
		{ autocomplete: "(m|p)-(block|inline)-<num>" }
	],
	[
		/^p-?([bi][se])(?:-?(.+))?$/,
		directionSize("padding"),
		{ autocomplete: "(m|p)-(bs|be|is|ie)-<num>" }
	]
];
var margins = [
	[/^ma?()-?(.+)$/, directionSize("margin")],
	[/^m-?xy()()$/, directionSize("margin")],
	[/^m-?([xy])(?:-?(.+))?$/, directionSize("margin")],
	[/^m-?([rltbse])(?:-?(.+))?$/, directionSize("margin")],
	[/^m-(block|inline)(?:-(.+))?$/, directionSize("margin")],
	[/^m-?([bi][se])(?:-?(.+))?$/, directionSize("margin")]
];
var spaces = [[
	/^space-([xy])-(.+)$/,
	handlerSpace,
	{ autocomplete: [
		"space-(x|y)",
		"space-(x|y)-reverse",
		"space-(x|y)-$spacing"
	] }
], [/^space-([xy])-reverse$/, function* ([m, d], { symbols: symbols$1 }) {
	yield {
		[symbols$1.variants]: [notLastChildSelectorVariant(m)],
		[`--un-space-${d}-reverse`]: "1"
	};
	yield defineProperty(`--un-space-${d}-reverse`, { initialValue: 0 });
}]];
function notLastChildSelectorVariant(s) {
	return {
		matcher: s,
		handle: (input, next) => next({
			...input,
			parent: `${input.parent ? `${input.parent} $$ ` : ""}${input.selector}`,
			selector: ":where(&>:not(:last-child))"
		})
	};
}
function* handlerSpace([m, d, s], { theme, symbols: symbols$1 }) {
	let v;
	const num = numberResolver(s);
	if (num != null) {
		themeTracking(`spacing`);
		v = `calc(var(--spacing) * ${num})`;
	} else v = theme.spacing?.[s] ?? h.bracket.cssvar.auto.fraction.rem(s || "1");
	if (v != null) {
		const results = directionMap[d === "x" ? "inline" : "block"].map((item, index) => {
			return [`margin${item}`, `calc(${v} * ${index === 0 ? `var(--un-space-${d}-reverse)` : `calc(1 - var(--un-space-${d}-reverse))`})`];
		});
		if (results) {
			yield {
				[symbols$1.variants]: [notLastChildSelectorVariant(m)],
				[`--un-space-${d}-reverse`]: "0",
				...Object.fromEntries(results)
			};
			yield defineProperty(`--un-space-${d}-reverse`, { initialValue: 0 });
		}
	}
}
var divides = [
	[
		/^divide-(.+)$/,
		function* (match, ctx) {
			const result = colorResolver("border-color", "divide")(match, ctx);
			if (result) {
				yield {
					[ctx.symbols.variants]: [notLastChildSelectorVariant(match[0])],
					...result[0]
				};
				yield result[1];
			}
		},
		{ autocomplete: "divide-$colors" }
	],
	[
		/^divide-op(?:acity)?-?(.+)$/,
		function* ([match, opacity$1], { symbols: symbols$1 }) {
			yield {
				[symbols$1.variants]: [notLastChildSelectorVariant(match)],
				"--un-divide-opacity": h.bracket.percent(opacity$1)
			};
		},
		{ autocomplete: ["divide-(op|opacity)", "divide-(op|opacity)-<percent>"] }
	],
	[
		/^divide-?([xy])$/,
		handlerDivide,
		{ autocomplete: ["divide-(x|y)", "divide-(x|y)-reverse"] }
	],
	[/^divide-?([xy])-?(.+)$/, handlerDivide],
	[/^divide-?([xy])-reverse$/, function* ([m, d], { symbols: symbols$1 }) {
		yield {
			[symbols$1.variants]: [notLastChildSelectorVariant(m)],
			[`--un-divide-${d}-reverse`]: "1"
		};
		yield defineProperty(`--un-divide-${d}-reverse`, { initialValue: 0 });
	}],
	[
		/* @__PURE__ */ new RegExp(`^divide-(${borderStyles.join("|")})$`),
		function* ([match, style], { symbols: symbols$1 }) {
			yield {
				[symbols$1.variants]: [notLastChildSelectorVariant(match)],
				"border-style": style
			};
		},
		{ autocomplete: borderStyles.map((i) => `divide-${i}`) }
	]
];
function* handlerDivide([m, d, s], { symbols: symbols$1 }) {
	let v = h.bracket.cssvar.px(s || "1");
	if (v != null) {
		if (v === "0") v = "0px";
		const results = {
			x: ["-left", "-right"],
			y: ["-top", "-bottom"]
		}[d].map((item) => {
			const value = item.endsWith("left") || item.endsWith("top") ? `calc(${v} * var(--un-divide-${d}-reverse))` : `calc(${v} * calc(1 - var(--un-divide-${d}-reverse)))`;
			return [[`border${item}-width`, value], [`border${item}-style`, `var(--un-border-style)`]];
		});
		if (results) {
			yield {
				[symbols$1.variants]: [notLastChildSelectorVariant(m)],
				[`--un-divide-${d}-reverse`]: 0,
				...Object.fromEntries(results.flat())
			};
			yield defineProperty(`--un-divide-${d}-reverse`, { initialValue: 0 });
			yield defineProperty(`--un-border-style`, { initialValue: "solid" });
		}
	}
}
var filterBaseKeys = [
	"blur",
	"brightness",
	"contrast",
	"grayscale",
	"hue-rotate",
	"invert",
	"saturate",
	"sepia",
	"drop-shadow"
];
var filterProperties = filterBaseKeys.map((i) => defineProperty(`--un-${i}`));
var filterCSS = filterBaseKeys.map((i) => `var(--un-${i},)`).join(" ");
var backdropBaseKeys = [
	"backdrop-blur",
	"backdrop-brightness",
	"backdrop-contrast",
	"backdrop-grayscale",
	"backdrop-hue-rotate",
	"backdrop-invert",
	"backdrop-opacity",
	"backdrop-saturate",
	"backdrop-sepia"
];
var backdropProperties = backdropBaseKeys.map((i) => defineProperty(`--un-${i}`));
var backdropCSS = backdropBaseKeys.map((i) => `var(--un-${i},)`).join(" ");
function percentWithDefault(str) {
	let v = h.bracket.cssvar(str || "");
	if (v != null) return v;
	v = str ? h.percent(str) : "100%";
	if (v != null && Number.parseFloat(v.slice(0, -1)) <= 100) return v;
}
function toFilter(varName, resolver) {
	return ([, b, s], { theme }) => {
		const value = resolver(s, theme) ?? (s === "none" ? "0" : "");
		if (value !== "") if (b) return [{
			[`--un-${b}${varName}`]: `${varName}(${value})`,
			"-webkit-backdrop-filter": backdropCSS,
			"backdrop-filter": backdropCSS
		}, ...backdropProperties];
		else return [{
			[`--un-${varName}`]: `${varName}(${value})`,
			filter: filterCSS
		}, ...filterProperties];
	};
}
function dropShadowResolver(match, ctx) {
	const [, s] = match;
	const { theme } = ctx;
	let res = [];
	if (s) {
		res = getStringComponents(s, "/", 2) ?? [];
		if (s.startsWith("/")) res = ["", s.slice(1)];
	}
	let v = theme.dropShadow?.[res[0] || "DEFAULT"];
	const c = s ? h.bracket.cssvar(s) : void 0;
	if ((v != null || c != null) && !hasParseableColor(c, theme)) {
		const alpha = res[1] ? h.bracket.percent.cssvar(res[1]) : void 0;
		return [{
			"--un-drop-shadow-opacity": alpha,
			"--un-drop-shadow": `drop-shadow(${colorableShadows(v || c, "--un-drop-shadow-color", alpha).join(") drop-shadow(")})`,
			"filter": filterCSS
		}, ...filterProperties];
	}
	if (hasParseableColor(s, theme)) return colorResolver("--un-drop-shadow-color", "drop-shadow")(match, ctx);
	v = h.bracket.cssvar(s) ?? (s === "none" ? "" : void 0);
	if (v != null) return [{
		"--un-drop-shadow": v ? `drop-shadow(${v})` : v,
		"filter": filterCSS
	}, ...filterProperties];
}
var filters = [
	[
		/^(?:(backdrop-)|filter-)?blur(?:-(.+))?$/,
		toFilter("blur", (s, theme) => theme.blur?.[s || "DEFAULT"] || h.bracket.cssvar.px(s)),
		{ autocomplete: [
			"(backdrop|filter)-blur-$blur",
			"blur-$blur",
			"filter-blur"
		] }
	],
	[
		/^(?:(backdrop-)|filter-)?brightness-(.+)$/,
		toFilter("brightness", (s) => h.bracket.cssvar.percent(s)),
		{ autocomplete: ["(backdrop|filter)-brightness-<percent>", "brightness-<percent>"] }
	],
	[
		/^(?:(backdrop-)|filter-)?contrast-(.+)$/,
		toFilter("contrast", (s) => h.bracket.cssvar.percent(s)),
		{ autocomplete: ["(backdrop|filter)-contrast-<percent>", "contrast-<percent>"] }
	],
	[
		/^(?:filter-)?drop-shadow(?:-?(.+))?$/,
		dropShadowResolver,
		{ autocomplete: [
			"filter-drop",
			"filter-drop-shadow",
			"filter-drop-shadow-color",
			"drop-shadow",
			"drop-shadow-color",
			"filter-drop-shadow-$dropShadow",
			"drop-shadow-$dropShadow",
			"filter-drop-shadow-$colors",
			"drop-shadow-$colors",
			"filter-drop-shadow-color-$colors",
			"drop-shadow-color-$colors",
			"filter-drop-shadow-color-(op|opacity)",
			"drop-shadow-color-(op|opacity)",
			"filter-drop-shadow-color-(op|opacity)-<percent>",
			"drop-shadow(-color)?-(op|opacity)-<percent>"
		] }
	],
	[/^(?:filter-)?drop-shadow-color-(.+)$/, colorResolver("--un-drop-shadow-color", "drop-shadow")],
	[/^(?:filter-)?drop-shadow(?:-color)?-op(?:acity)?-?(.+)$/, ([, opacity$1]) => ({ "--un-drop-shadow-opacity": h.bracket.percent(opacity$1) })],
	[
		/^(?:(backdrop-)|filter-)?grayscale(?:-(.+))?$/,
		toFilter("grayscale", percentWithDefault),
		{ autocomplete: [
			"(backdrop|filter)-grayscale",
			"(backdrop|filter)-grayscale-<percent>",
			"grayscale-<percent>"
		] }
	],
	[/^(?:(backdrop-)|filter-)?hue-rotate-(.+)$/, toFilter("hue-rotate", (s) => h.bracket.cssvar.degree(s))],
	[
		/^(?:(backdrop-)|filter-)?invert(?:-(.+))?$/,
		toFilter("invert", percentWithDefault),
		{ autocomplete: [
			"(backdrop|filter)-invert",
			"(backdrop|filter)-invert-<percent>",
			"invert-<percent>"
		] }
	],
	[
		/^(backdrop-)op(?:acity)?-(.+)$/,
		toFilter("opacity", (s) => h.bracket.cssvar.percent(s)),
		{ autocomplete: ["backdrop-(op|opacity)", "backdrop-(op|opacity)-<percent>"] }
	],
	[
		/^(?:(backdrop-)|filter-)?saturate-(.+)$/,
		toFilter("saturate", (s) => h.bracket.cssvar.percent(s)),
		{ autocomplete: [
			"(backdrop|filter)-saturate",
			"(backdrop|filter)-saturate-<percent>",
			"saturate-<percent>"
		] }
	],
	[
		/^(?:(backdrop-)|filter-)?sepia(?:-(.+))?$/,
		toFilter("sepia", percentWithDefault),
		{ autocomplete: [
			"(backdrop|filter)-sepia",
			"(backdrop|filter)-sepia-<percent>",
			"sepia-<percent>"
		] }
	],
	["filter", { filter: filterCSS }],
	["backdrop-filter", {
		"-webkit-backdrop-filter": backdropCSS,
		"backdrop-filter": backdropCSS
	}],
	["filter-none", { filter: "none" }],
	["backdrop-filter-none", {
		"-webkit-backdrop-filter": "none",
		"backdrop-filter": "none"
	}],
	...globalKeywords.map((keyword) => [`filter-${keyword}`, { filter: keyword }]),
	...globalKeywords.map((keyword) => [`backdrop-filter-${keyword}`, {
		"-webkit-backdrop-filter": keyword,
		"backdrop-filter": keyword
	}])
];
var flex$1 = [
	["flex", { display: "flex" }],
	["inline-flex", { display: "inline-flex" }],
	["flex-inline", { display: "inline-flex" }],
	[/^flex-(.*)$/, ([, d]) => ({ flex: h.bracket(d) != null ? h.bracket(d).split(" ").map((e) => h.cssvar.fraction(e) ?? e).join(" ") : h.cssvar.fraction(d) })],
	["flex-1", { flex: "1 1 0%" }],
	["flex-auto", { flex: "1 1 auto" }],
	["flex-initial", { flex: "0 1 auto" }],
	["flex-none", { flex: "none" }],
	[
		/^(?:flex-)?shrink(?:-(.*))?$/,
		([, d = ""]) => ({ "flex-shrink": h.bracket.cssvar.number(d) ?? 1 }),
		{ autocomplete: ["flex-shrink-<num>", "shrink-<num>"] }
	],
	[
		/^(?:flex-)?grow(?:-(.*))?$/,
		([, d = ""]) => ({ "flex-grow": h.bracket.cssvar.number(d) ?? 1 }),
		{ autocomplete: ["flex-grow-<num>", "grow-<num>"] }
	],
	[
		/^(?:flex-)?basis-(.+)$/,
		([, d]) => {
			const v = numberResolver(d);
			if (v != null) {
				themeTracking(`spacing`);
				return { "flex-basis": `calc(var(--spacing) * ${v})` };
			}
			return { "flex-basis": h.bracket.cssvar.auto.fraction.rem(d) };
		},
		{ autocomplete: ["flex-basis-$spacing", "basis-$spacing"] }
	],
	["flex-row", { "flex-direction": "row" }],
	["flex-row-reverse", { "flex-direction": "row-reverse" }],
	["flex-col", { "flex-direction": "column" }],
	["flex-col-reverse", { "flex-direction": "column-reverse" }],
	["flex-wrap", { "flex-wrap": "wrap" }],
	["flex-wrap-reverse", { "flex-wrap": "wrap-reverse" }],
	["flex-nowrap", { "flex-wrap": "nowrap" }]
];
var directions = {
	"": [""],
	"x": ["column-"],
	"y": ["row-"],
	"col": ["column-"],
	"row": ["row-"]
};
var gaps = [
	[
		/^(?:flex-|grid-)?gap-?()(.+)$/,
		directionSize("gap", directions, (p, i) => `${i}${p}`),
		{ autocomplete: ["gap-$spacing", "gap-<num>"] }
	],
	[
		/^(?:flex-|grid-)?gap-([xy])-?(.+)$/,
		directionSize("gap", directions, (p, i) => `${i}${p}`),
		{ autocomplete: ["gap-(x|y)-$spacing", "gap-(x|y)-<num>"] }
	],
	[
		/^(?:flex-|grid-)?gap-(col|row)-?(.+)$/,
		directionSize("gap", directions, (p, i) => `${i}${p}`),
		{ autocomplete: ["gap-(col|row)-$spacing", "gap-(col|row)-<num>"] }
	]
];
function rowCol(s) {
	return s.replace("col", "column");
}
function autoDirection(prop) {
	switch (prop) {
		case "min": return "min-content";
		case "max": return "max-content";
		case "fr": return "minmax(0,1fr)";
	}
	return h.bracket.cssvar.auto.rem(prop);
}
var grids = [
	["grid", { display: "grid" }],
	["inline-grid", { display: "inline-grid" }],
	[/^(?:grid-)?(row|col)-(.+)$/, ([, c, v]) => ({ [`grid-${rowCol(c)}`]: h.bracket.number.cssvar.auto(v) })],
	[
		/^(?:grid-)?(row|col)-span-(.+)$/,
		([, c, s]) => {
			if (s === "full") return { [`grid-${rowCol(c)}`]: "1/-1" };
			const v = h.bracket.number.cssvar(s);
			if (v != null) return { [`grid-${rowCol(c)}`]: `span ${v}/span ${v}` };
		},
		{ autocomplete: "(grid-row|grid-col|row|col)-span-<num>" }
	],
	[/^(?:grid-)?(row|col)-start-(.+)$/, ([, c, v]) => ({ [`grid-${rowCol(c)}-start`]: h.bracket.cssvar(v) ?? v })],
	[
		/^(?:grid-)?(row|col)-end-(.+)$/,
		([, c, v]) => ({ [`grid-${rowCol(c)}-end`]: h.bracket.cssvar(v) ?? v }),
		{ autocomplete: "(grid-row|grid-col|row|col)-(start|end)-<num>" }
	],
	[
		/^(?:grid-)?auto-(rows|cols)-(.+)$/,
		([, c, v]) => ({ [`grid-auto-${rowCol(c)}`]: autoDirection(v) }),
		{ autocomplete: "(grid-auto|auto)-(rows|cols)-<num>" }
	],
	[/^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/, ([, v]) => ({ "grid-auto-flow": h.bracket.cssvar(v) })],
	[
		/^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/,
		([, v]) => ({ "grid-auto-flow": rowCol(v).replace("-", " ") }),
		{ autocomplete: ["(grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)"] }
	],
	[/^(?:grid-)?(rows|cols)-(.+)$/, ([, c, v]) => ({ [`grid-template-${rowCol(c)}`]: h.bracket.cssvar(v) })],
	[/^(?:grid-)?(rows|cols)-minmax-([\w.-]+)$/, ([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(auto-fill,minmax(${d},1fr))` })],
	[
		/^(?:grid-)?(rows|cols)-(\d+)$/,
		([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(${d},minmax(0,1fr))` }),
		{ autocomplete: "(grid-rows|grid-cols|rows|cols)-<num>" }
	],
	[/^grid-area(s)?-(.+)$/, ([, s, v]) => {
		if (s != null) return { "grid-template-areas": h.cssvar(v) ?? v.split("-").map((s$1) => `"${h.bracket(s$1)}"`).join(" ") };
		return { "grid-area": h.bracket.cssvar(v) };
	}],
	["grid-rows-none", { "grid-template-rows": "none" }],
	["grid-cols-none", { "grid-template-columns": "none" }],
	["grid-rows-subgrid", { "grid-template-rows": "subgrid" }],
	["grid-cols-subgrid", { "grid-template-columns": "subgrid" }]
];
var overflowValues = [
	"auto",
	"hidden",
	"clip",
	"visible",
	"scroll",
	"overlay",
	...globalKeywords
];
var overflows = [[
	/^(?:overflow|of)-(.+)$/,
	([, v]) => overflowValues.includes(v) ? { overflow: v } : void 0,
	{ autocomplete: [`(overflow|of)-(${overflowValues.join("|")})`, `(overflow|of)-(x|y)-(${overflowValues.join("|")})`] }
], [/^(?:overflow|of)-([xy])-(.+)$/, ([, d, v]) => overflowValues.includes(v) ? { [`overflow-${d}`]: v } : void 0]];
var lineClamps = [[
	/^line-clamp-(\d+)$/,
	([, v]) => ({
		"overflow": "hidden",
		"display": "-webkit-box",
		"-webkit-box-orient": "vertical",
		"-webkit-line-clamp": v
	}),
	{ autocomplete: ["line-clamp", "line-clamp-(1|2|3|4|5|6|none)"] }
], ["line-clamp-none", {
	"overflow": "visible",
	"display": "block",
	"-webkit-box-orient": "horizontal",
	"-webkit-line-clamp": "unset"
}]];
var linearMap = {
	t: ["top"],
	b: ["bottom"],
	l: ["left"],
	r: ["right"],
	x: ["left", "right"],
	y: ["top", "bottom"]
};
var maskInitialValue = "linear-gradient(#fff, #fff)";
var baseMaskImage = {
	"mask-image": "var(--un-mask-linear), var(--un-mask-radial), var(--un-mask-conic)",
	"mask-composite": "intersect"
};
function handlePosition([, v = ""]) {
	if (v in cornerMap) {
		const positions$1 = v.split("").flatMap((c) => linearMap[c]).join(" ");
		return { "mask-position": positions$1 };
	}
	const _v = h.bracket.cssvar.global.position(v);
	if (_v !== null) return { "mask-position": _v };
}
function handleImage([_, gradient = "", direction, val], ctx) {
	const css = { ...baseMaskImage };
	const props = [];
	props.push(...[
		"linear",
		"radial",
		"conic"
	].map((g) => defineProperty(`--un-mask-${g}`, { initialValue: maskInitialValue })));
	if (gradient in linearMap) {
		css["--un-mask-linear"] = "var(--un-mask-left), var(--un-mask-right), var(--un-mask-bottom), var(--un-mask-top)";
		for (const dir of linearMap[gradient]) {
			css[`--un-mask-${dir}`] = `linear-gradient(to ${dir}, var(--un-mask-${dir}-from-color) var(--un-mask-${dir}-from-position), var(--un-mask-${dir}-to-color) var(--un-mask-${dir}-to-position))`;
			if (numberResolver(val) != null) {
				themeTracking("spacing");
				css[`--un-mask-${dir}-${direction}-position`] = `calc(var(--spacing) * ${h.bracket.cssvar.fraction.number(val)})`;
			} else css[`--un-mask-${dir}-${direction}-position`] = h.bracket.cssvar.fraction.rem(val);
			if (hasParseableColor(val, ctx.theme)) {
				const result = colorResolver(`--un-mask-${dir}-${direction}-color`, hyphenate("colors"))([_, val], ctx);
				if (result) {
					const [c, ...p] = result;
					Object.assign(css, c);
					props.push(...p);
				}
			}
			props.push(...["from", "to"].flatMap((p) => [defineProperty(`--un-mask-${dir}-${p}-position`, {
				syntax: "<length-percentage>",
				initialValue: p === "from" ? "0%" : "100%"
			}), defineProperty(`--un-mask-${dir}-${p}-color`, {
				syntax: "<color>",
				initialValue: p === "from" ? "black" : "transparent"
			})]));
		}
		props.push(...[
			"top",
			"right",
			"bottom",
			"left"
		].map((d) => defineProperty(`--un-mask-${d}`, { initialValue: maskInitialValue })));
	} else {
		if (direction == null) if (gradient === "radial") {
			css["--un-mask-radial"] = "radial-gradient(var(--un-mask-radial-stops, var(--un-mask-radial-size)))";
			css["--un-mask-radial-size"] = h.bracket.cssvar.rem(val);
		} else {
			css[`--un-mask-${gradient}`] = `${gradient}-gradient(var(--un-mask-${gradient}-stops, var(--un-mask-${gradient}-position)))`;
			css[`--un-mask-${gradient}-position`] = numberResolver(val) ? `calc(1deg * ${h.bracket.cssvar.number(val)})` : h.bracket.cssvar.fraction(val);
		}
		else {
			const gradientStopsPrefixMap = {
				linear: "",
				radial: "var(--un-mask-radial-shape) var(--un-mask-radial-size) at ",
				conic: "from "
			};
			css[`--un-mask-${gradient}-stops`] = `${gradientStopsPrefixMap[gradient]}var(--un-mask-${gradient}-position), var(--un-mask-${gradient}-from-color) var(--un-mask-${gradient}-from-position), var(--un-mask-${gradient}-to-color) var(--un-mask-${gradient}-to-position)`;
			css[`--un-mask-${gradient}`] = `${gradient}-gradient(var(--un-mask-${gradient}-stops))`;
			if (hasParseableColor(val, ctx.theme)) {
				const result = colorResolver(`--un-mask-${gradient}-${direction}-color`, hyphenate("colors"))([_, val], ctx);
				if (result) {
					const [c, ...p] = result;
					Object.assign(css, c);
					props.push(...p);
				}
			} else if (numberResolver(val) != null) {
				themeTracking("spacing");
				css[`--un-mask-${gradient}-${direction}-position`] = `calc(var(--spacing) * ${h.bracket.cssvar.fraction.number(val)})`;
			} else css[`--un-mask-${gradient}-${direction}-position`] = h.bracket.cssvar.fraction.rem(val);
		}
		if (gradient === "radial") props.push(...[defineProperty("--un-mask-radial-shape", { initialValue: "ellipse" }), defineProperty("--un-mask-radial-size", { initialValue: "farthest-corner" })]);
		props.push(...["from", "to"].flatMap((p) => [
			defineProperty(`--un-mask-${gradient}-position`, { initialValue: gradient === "radial" ? "center" : "0deg" }),
			defineProperty(`--un-mask-${gradient}-${p}-position`, {
				syntax: "<length-percentage>",
				initialValue: p === "from" ? "0%" : "100%"
			}),
			defineProperty(`--un-mask-${gradient}-${p}-color`, {
				syntax: "<color>",
				initialValue: p === "from" ? "black" : "transparent"
			})
		]));
	}
	return [css, ...props];
}
function handleSize$1([, v = ""]) {
	const _v = h.bracket.cssvar.global.fraction.rem(v);
	if (_v !== null) return { "mask-size": _v };
}
var masks = [
	["mask-clip-border", { "mask-clip": "border-box" }],
	["mask-clip-padding", { "mask-clip": "padding-box" }],
	["mask-clip-content", { "mask-clip": "content-box" }],
	["mask-clip-fill", { "mask-clip": "fill-box" }],
	["mask-clip-stroke", { "mask-clip": "stroke-box" }],
	["mask-clip-view", { "mask-clip": "view-box" }],
	["mask-no-clip", { "mask-clip": "no-clip" }],
	["mask-add", { "mask-composite": "add" }],
	["mask-subtract", { "mask-composite": "subtract" }],
	["mask-intersect", { "mask-composite": "intersect" }],
	["mask-exclude", { "mask-composite": "exclude" }],
	[/^mask-(.+)$/, ([, v]) => ({ "mask-image": h.bracket.cssvar(v) })],
	[
		/^mask-(linear|radial|conic|[xytblr])-(from|to)()(?:-(.+))?$/,
		handleImage,
		{ autocomplete: [
			"mask-(linear|radial|conic)-(from|to)-$colors",
			"mask-(linear|radial|conic)-(from|to)-<percentage>",
			"mask-(linear|radial|conic)-(from|to)",
			"mask-(linear|radial|conic)-<percent>",
			"mask-(x|y|t|b|l|r)-(from|to)-$colors",
			"mask-(x|y|t|b|l|r)-(from|to)-<percentage>",
			"mask-(x|y|t|b|l|r)-(from|to)",
			"mask-(x|y|t|b|l|r)-<percent>"
		] }
	],
	[/^mask-(linear|radial|conic)-(from|to)?-?(.*)$/, handleImage],
	[/^mask-([trblxy])-(from|to)-(.*)$/, handleImage],
	["mask-none", { "mask-image": "none" }],
	["mask-radial-circle", { "--un-mask-radial-shape": "circle" }],
	["mask-radial-ellipse", { "--un-mask-radial-shape": "ellipse" }],
	["mask-radial-closest-side", { "--un-mask-radial-size": "closest-side" }],
	["mask-radial-closest-corner", { "--un-mask-radial-size": "closest-corner" }],
	["mask-radial-farthest-side", { "--un-mask-radial-size": "farthest-side" }],
	["mask-radial-farthest-corner", { "--un-mask-radial-size": "farthest-corner" }],
	[
		/^mask-radial-at-([-\w]{3,})$/,
		([, s]) => ({ "--un-mask-radial-position": positionMap[s] }),
		{ autocomplete: [`mask-radial-at-(${Object.keys(positionMap).filter((p) => p.length > 2).join("|")})`] }
	],
	["mask-alpha", { "mask-mode": "alpha" }],
	["mask-luminance", { "mask-mode": "luminance" }],
	["mask-match", { "mask-mode": "match-source" }],
	["mask-origin-border", { "mask-origin": "border-box" }],
	["mask-origin-padding", { "mask-origin": "padding-box" }],
	["mask-origin-content", { "mask-origin": "content-box" }],
	["mask-origin-fill", { "mask-origin": "fill-box" }],
	["mask-origin-stroke", { "mask-origin": "stroke-box" }],
	["mask-origin-view", { "mask-origin": "view-box" }],
	[/^mask-([rltb]{1,2})$/, handlePosition],
	[/^mask-([-\w]{3,})$/, ([, s]) => ({ "mask-position": positionMap[s] })],
	[/^mask-(?:position-|pos-)(.+)$/, handlePosition],
	["mask-repeat", { "mask-repeat": "repeat" }],
	["mask-no-repeat", { "mask-repeat": "no-repeat" }],
	["mask-repeat-x", { "mask-repeat": "repeat-x" }],
	["mask-repeat-y", { "mask-repeat": "repeat-y" }],
	["mask-repeat-space", { "mask-repeat": "space" }],
	["mask-repeat-round", { "mask-repeat": "round" }],
	["mask-auto", { "mask-size": "auto" }],
	["mask-cover", { "mask-size": "cover" }],
	["mask-contain", { "mask-size": "contain" }],
	[/^mask-size-(.+)$/, handleSize$1],
	["mask-type-luminance", { "mask-type": "luminance" }],
	["mask-type-alpha", { "mask-type": "alpha" }]
];
var placeholders = [[
	/^\$ placeholder-(.+)$/,
	colorResolver("color", "placeholder"),
	{ autocomplete: "placeholder-$colors" }
], [
	/^\$ placeholder-op(?:acity)?-?(.+)$/,
	([, opacity$1]) => ({ "--un-placeholder-opacity": h.bracket.percent(opacity$1) }),
	{ autocomplete: ["placeholder-(op|opacity)", "placeholder-(op|opacity)-<percent>"] }
]];
var positions = [
	[
		/^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/,
		([, v]) => ({ position: v }),
		{ autocomplete: [
			"(position|pos)-<position>",
			"(position|pos)-<globalKeyword>",
			"<position>"
		] }
	],
	[/^(?:position-|pos-)([-\w]+)$/, ([, v]) => globalKeywords.includes(v) ? { position: v } : void 0],
	[/^(?:position-|pos-)?(static)$/, ([, v]) => ({ position: v })]
];
var justifies = [
	["justify-start", { "justify-content": "flex-start" }],
	["justify-end", { "justify-content": "flex-end" }],
	["justify-center", { "justify-content": "center" }],
	["justify-between", { "justify-content": "space-between" }],
	["justify-around", { "justify-content": "space-around" }],
	["justify-evenly", { "justify-content": "space-evenly" }],
	["justify-stretch", { "justify-content": "stretch" }],
	["justify-left", { "justify-content": "left" }],
	["justify-right", { "justify-content": "right" }],
	["justify-center-safe", { "justify-content": "safe center" }],
	["justify-end-safe", { "justify-content": "safe flex-end" }],
	["justify-normal", { "justify-content": "normal" }],
	...makeGlobalStaticRules("justify", "justify-content"),
	["justify-items-start", { "justify-items": "start" }],
	["justify-items-end", { "justify-items": "end" }],
	["justify-items-center", { "justify-items": "center" }],
	["justify-items-stretch", { "justify-items": "stretch" }],
	["justify-items-center-safe", { "justify-items": "safe center" }],
	["justify-items-end-safe", { "justify-items": "safe flex-end" }],
	...makeGlobalStaticRules("justify-items"),
	["justify-self-auto", { "justify-self": "auto" }],
	["justify-self-start", { "justify-self": "start" }],
	["justify-self-end", { "justify-self": "end" }],
	["justify-self-center", { "justify-self": "center" }],
	["justify-self-stretch", { "justify-self": "stretch" }],
	["justify-self-baseline", { "justify-self": "baseline" }],
	["justify-self-center-safe", { "justify-self": "safe center" }],
	["justify-self-end-safe", { "justify-self": "safe flex-end" }],
	...makeGlobalStaticRules("justify-self")
];
var orders = [
	[/^order-(.+)$/, ([, v]) => ({ order: h.bracket.cssvar.number(v) })],
	["order-first", { order: "calc(-infinity)" }],
	["order-last", { order: "calc(infinity)" }],
	["order-none", { order: "0" }]
];
var alignments = [
	["content-center", { "align-content": "center" }],
	["content-start", { "align-content": "flex-start" }],
	["content-end", { "align-content": "flex-end" }],
	["content-between", { "align-content": "space-between" }],
	["content-around", { "align-content": "space-around" }],
	["content-evenly", { "align-content": "space-evenly" }],
	["content-baseline", { "align-content": "baseline" }],
	["content-center-safe", { "align-content": "safe center" }],
	["content-end-safe", { "align-content": "safe flex-end" }],
	["content-stretch", { "align-content": "stretch" }],
	["content-normal", { "align-content": "normal" }],
	...makeGlobalStaticRules("content", "align-content"),
	["items-start", { "align-items": "flex-start" }],
	["items-end", { "align-items": "flex-end" }],
	["items-center", { "align-items": "center" }],
	["items-baseline", { "align-items": "baseline" }],
	["items-stretch", { "align-items": "stretch" }],
	["items-baseline-last", { "align-items": "last baseline" }],
	["items-center-safe", { "align-items": "safe center" }],
	["items-end-safe", { "align-items": "safe flex-end" }],
	...makeGlobalStaticRules("items", "align-items"),
	["self-auto", { "align-self": "auto" }],
	["self-start", { "align-self": "flex-start" }],
	["self-end", { "align-self": "flex-end" }],
	["self-center", { "align-self": "center" }],
	["self-stretch", { "align-self": "stretch" }],
	["self-baseline", { "align-self": "baseline" }],
	["self-baseline-last", { "align-self": "last baseline" }],
	["self-center-safe", { "align-self": "safe center" }],
	["self-end-safe", { "align-self": "safe flex-end" }],
	...makeGlobalStaticRules("self", "align-self")
];
var placements = [
	["place-content-center", { "place-content": "center" }],
	["place-content-start", { "place-content": "start" }],
	["place-content-end", { "place-content": "end" }],
	["place-content-between", { "place-content": "space-between" }],
	["place-content-around", { "place-content": "space-around" }],
	["place-content-evenly", { "place-content": "space-evenly" }],
	["place-content-stretch", { "place-content": "stretch" }],
	["place-content-baseline", { "place-content": "baseline" }],
	["place-content-center-safe", { "place-content": "safe center" }],
	["place-content-end-safe", { "place-content": "safe flex-end" }],
	...makeGlobalStaticRules("place-content"),
	["place-items-start", { "place-items": "start" }],
	["place-items-end", { "place-items": "end" }],
	["place-items-center", { "place-items": "center" }],
	["place-items-stretch", { "place-items": "stretch" }],
	["place-items-baseline", { "place-items": "baseline" }],
	["place-items-center-safe", { "place-items": "safe center" }],
	["place-items-end-safe", { "place-items": "safe flex-end" }],
	...makeGlobalStaticRules("place-items"),
	["place-self-auto", { "place-self": "auto" }],
	["place-self-start", { "place-self": "start" }],
	["place-self-end", { "place-self": "end" }],
	["place-self-center", { "place-self": "center" }],
	["place-self-stretch", { "place-self": "stretch" }],
	["place-self-center-safe", { "place-self": "safe center" }],
	["place-self-end-safe", { "place-self": "safe flex-end" }],
	...makeGlobalStaticRules("place-self")
];
/**
* This is to add `flex-` and `grid-` prefix to the alignment rules,
* supporting `flex="~ items-center"` in attributify mode.
*/
var flexGridJustifiesAlignments = [
	...justifies,
	...alignments,
	...placements
].flatMap(([k, v]) => [[`flex-${k}`, v], [`grid-${k}`, v]]);
function handleInsetValue(v) {
	const _v = numberResolver(v);
	if (_v != null) {
		themeTracking(`spacing`);
		return `calc(var(--spacing) * ${_v})`;
	} else return h.bracket.cssvar.global.auto.fraction.rem(v);
}
function handleInsetValues([, d, v]) {
	const r = handleInsetValue(v);
	if (r != null && d in insetMap) return insetMap[d].map((i) => [i.slice(1), r]);
}
var insets = [
	[
		/^(?:position-|pos-)?inset-(.+)$/,
		([, v]) => ({ inset: handleInsetValue(v) }),
		{ autocomplete: [
			"(position|pos)-inset-<directions>-$spacing",
			"(position|pos)-inset-(block|inline)-$spacing",
			"(position|pos)-inset-(bs|be|is|ie)-$spacing",
			"(position|pos)-(top|left|right|bottom)-$spacing"
		] }
	],
	[/^(?:position-|pos-)?(start|end)-(.+)$/, handleInsetValues],
	[/^(?:position-|pos-)?inset-([xy])-(.+)$/, handleInsetValues],
	[/^(?:position-|pos-)?inset-([rltbse])-(.+)$/, handleInsetValues],
	[/^(?:position-|pos-)?inset-(block|inline)-(.+)$/, handleInsetValues],
	[/^(?:position-|pos-)?inset-([bi][se])-(.+)$/, handleInsetValues],
	[/^(?:position-|pos-)?(top|left|right|bottom)-(.+)$/, ([, d, v]) => ({ [d]: handleInsetValue(v) })]
];
var floats = [
	["float-left", { float: "left" }],
	["float-right", { float: "right" }],
	["float-start", { float: "inline-start" }],
	["float-end", { float: "inline-end" }],
	["float-none", { float: "none" }],
	...makeGlobalStaticRules("float"),
	["clear-left", { clear: "left" }],
	["clear-right", { clear: "right" }],
	["clear-both", { clear: "both" }],
	["clear-start", { clear: "inline-start" }],
	["clear-end", { clear: "inline-end" }],
	["clear-none", { clear: "none" }],
	...makeGlobalStaticRules("clear")
];
var zIndexes = [[/^(?:position-|pos-)?z([\d.]+)$/, ([, v]) => ({ "z-index": h.number(v) })], [
	/^(?:position-|pos-)?z-(.+)$/,
	([, v]) => ({ "z-index": h.bracket.cssvar.global.auto.number(v) }),
	{ autocomplete: "z-<num>" }
]];
var boxSizing = [
	["box-border", { "box-sizing": "border-box" }],
	["box-content", { "box-sizing": "content-box" }],
	...makeGlobalStaticRules("box", "box-sizing")
];
/**
* Used for debugging, only available in development mode.
*
* @example `?` / `where`
*/
var questionMark = [[/^(where|\?)$/, (_, { constructCSS, generator }) => {
	if (generator.userConfig.envMode === "dev") return `@keyframes __un_qm{0%{box-shadow:inset 4px 4px #ff1e90, inset -4px -4px #ff1e90}100%{box-shadow:inset 8px 8px #3399ff, inset -8px -8px #3399ff}} ${constructCSS({ animation: "__un_qm 0.5s ease-in-out alternate infinite" })}`;
}]];
var shadowProperties = {
	shadow: defineProperty("--un-shadow", { initialValue: "0 0 #0000" }),
	shadowColor: defineProperty("--un-shadow-color"),
	insetShadow: defineProperty("--un-inset-shadow", { initialValue: "0 0 #0000" }),
	insetShadowColor: defineProperty("--un-inset-shadow-color"),
	ringColor: defineProperty("--un-ring-color"),
	ringShadow: defineProperty("--un-ring-shadow", { initialValue: "0 0 #0000" }),
	insetRingColor: defineProperty("--un-inset-ring-color"),
	insetRingShadow: defineProperty("--un-inset-ring-shadow", { initialValue: "0 0 #0000" }),
	ringInset: defineProperty("--un-ring-inset"),
	ringOffsetWidth: defineProperty("--un-ring-offset-width", {
		syntax: "<length>",
		initialValue: "0px"
	}),
	ringOffsetColor: defineProperty("--un-ring-offset-color"),
	ringOffsetShadow: defineProperty("--un-ring-offset-shadow", { initialValue: "0 0 #0000" })
};
var boxShadows = [
	[
		/^shadow(?:-?(.+))?$/,
		handleShadow("shadow"),
		{ autocomplete: ["shadow-$colors", "shadow-$shadow"] }
	],
	[
		/^shadow-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-shadow-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "shadow-(op|opacity)-<percent>" }
	],
	[
		/^inset-shadow(?:-(.+))?$/,
		handleShadow("insetShadow"),
		{ autocomplete: ["inset-shadow-$colors", "inset-shadow-$insetShadow"] }
	],
	[
		/^inset-shadow-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-inset-shadow-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "shadow-(op|opacity)-<percent>" }
	]
];
function handleShadow(themeKey) {
	return (match, ctx) => {
		const [, d] = match;
		const { theme } = ctx;
		let res = [];
		if (d) {
			res = getStringComponents(d, "/", 2) ?? [];
			if (d.startsWith("/")) res = ["", d.slice(1)];
		}
		const v = theme[themeKey]?.[res[0] || "DEFAULT"];
		const c = d ? h.bracket.cssvar(d) : void 0;
		const shadowVar = hyphenate(themeKey);
		if ((v != null || c != null) && !hasParseableColor(c, theme)) {
			const alpha = res[1] ? h.bracket.percent.cssvar(res[1]) : void 0;
			return [{
				[`--un-${shadowVar}-opacity`]: alpha,
				[`--un-${shadowVar}`]: colorableShadows(v || c, `--un-${shadowVar}-color`, alpha).join(","),
				"box-shadow": "var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
			}, ...Object.values(shadowProperties)];
		}
		return colorResolver(`--un-${shadowVar}-color`, shadowVar)(match, ctx);
	};
}
var rings = [
	[/^ring(?:-(.+))?$/, ([, d]) => {
		const v = h.bracket.px(d || "1");
		if (v != null) return [{
			"--un-ring-shadow": `var(--un-ring-inset,) 0 0 0 calc(${v} + var(--un-ring-offset-width)) var(--un-ring-color, currentColor)`,
			"box-shadow": "var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
		}, ...Object.values(shadowProperties)];
	}],
	[
		/^ring-(.+)$/,
		colorResolver(`--un-ring-color`, "ring"),
		{ autocomplete: "ring-$colors" }
	],
	[
		/^ring-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-ring-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "ring-(op|opacity)-<percent>" }
	],
	[/^inset-ring(?:-(.+))?$/, ([, d]) => {
		const v = h.bracket.px(d || "1");
		if (v != null) return [{
			"--un-inset-ring-shadow": `inset 0 0 0 ${v} var(--un-inset-ring-color, currentColor)`,
			"box-shadow": "var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
		}, ...Object.values(shadowProperties)];
	}],
	[
		/^inset-ring-(.+)$/,
		colorResolver(`--un-inset-ring-color`, "inset-ring"),
		{ autocomplete: "inset-ring-$colors" }
	],
	[
		/^inset-ring-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-inset-ring-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "inset-ring-(op|opacity)-<percent>" }
	],
	[
		/^ring-offset(?:-(?:width-|size-)?(.+))?$/,
		([, d]) => {
			const v = h.bracket.cssvar.px(d || "1");
			if (v != null) return {
				"--un-ring-offset-width": v,
				"--un-ring-offset-shadow": "var(--un-ring-inset,) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)"
			};
		},
		{ autocomplete: "ring-offset-$colors" }
	],
	[
		/^ring-offset-(.+)$/,
		colorResolver(`--un-ring-offset-color`, "ring-offset"),
		{ autocomplete: "ring-offset-$colors" }
	],
	[
		/^ring-offset-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-ring-offset-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "ring-offset-(op|opacity)-<percent>" }
	],
	["ring-inset", { "--un-ring-inset": "inset" }]
];
var scrolls = [
	...[
		"x",
		"y",
		"both"
	].map((d) => [`snap-${d}`, [{ "scroll-snap-type": `${d} var(--un-scroll-snap-strictness)` }, defineProperty("--un-scroll-snap-strictness", { initialValue: "proximity" })]]),
	...["mandatory", "proximity"].map((d) => [`snap-${d}`, [{ "--un-scroll-snap-strictness": d }, defineProperty("--un-scroll-snap-strictness", { initialValue: "proximity" })]]),
	["snap-none", { "scroll-snap-type": "none" }],
	["snap-start", { "scroll-snap-align": "start" }],
	["snap-end", { "scroll-snap-align": "end" }],
	["snap-center", { "scroll-snap-align": "center" }],
	["snap-align-none", { "scroll-snap-align": "none" }],
	["snap-normal", { "scroll-snap-stop": "normal" }],
	["snap-always", { "scroll-snap-stop": "always" }],
	[
		/^scroll-ma?()-?(.+)$/,
		directionSize("scroll-margin"),
		{ autocomplete: [
			"scroll-(m|p|ma|pa|block|inline)",
			"scroll-(m|p|ma|pa|block|inline)-$spacing",
			"scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)",
			"scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)-$spacing"
		] }
	],
	[/^scroll-m-?([xy])-?(.+)$/, directionSize("scroll-margin")],
	[/^scroll-m-?([rltb])-?(.+)$/, directionSize("scroll-margin")],
	[/^scroll-m-(block|inline)-(.+)$/, directionSize("scroll-margin")],
	[/^scroll-m-?([bi][se])-?(.+)$/, directionSize("scroll-margin")],
	[/^scroll-pa?()-?(.+)$/, directionSize("scroll-padding")],
	[/^scroll-p-?([xy])-?(.+)$/, directionSize("scroll-padding")],
	[/^scroll-p-?([rltb])-?(.+)$/, directionSize("scroll-padding")],
	[/^scroll-p-(block|inline)-(.+)$/, directionSize("scroll-padding")],
	[/^scroll-p-?([bi][se])-?(.+)$/, directionSize("scroll-padding")]
];
var sizeMapping = {
	h: "height",
	w: "width",
	inline: "inline-size",
	block: "block-size"
};
function getPropName(minmax, hw) {
	return `${minmax || ""}${sizeMapping[hw]}`;
}
function getSizeValue(theme, hw, prop) {
	let v;
	for (const key of ["container", "spacing"]) if (theme[key]?.[prop]) {
		themeTracking(key, prop);
		v = generateThemeVariable(key, prop);
		break;
	}
	if (!v) switch (prop) {
		case "fit":
		case "max":
		case "min":
			v = `${prop}-content`;
			break;
		case "stretch":
			v = "stretch";
			break;
		case "screen":
			v = hw === "w" ? "100vw" : "100vh";
			break;
	}
	if (!v && h.number(prop) != null) {
		themeTracking(`spacing`);
		v = `calc(var(--spacing) * ${h.number(prop)})`;
	}
	return v ?? h.bracket.cssvar.global.auto.none.fraction.rem(prop);
}
var sizes = [
	[/^size-(min-|max-)?(.+)$/, ([, m, s], { theme }) => ({
		[getPropName(m, "w")]: getSizeValue(theme, "w", s),
		[getPropName(m, "h")]: getSizeValue(theme, "h", s)
	})],
	[/^(?:size-)?(min-|max-)?([wh])-?(.+)$/, ([, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(theme, w, s) })],
	[
		/^(?:size-)?(min-|max-)?(block|inline)-(.+)$/,
		([, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(theme, w, s) }),
		{ autocomplete: [
			"(w|h)-<num>",
			"(w|h)-(full|screen|fit|max|min)",
			"(max|min)-(w|h)-<num>",
			"(max|min)-(w|h)-(full|screen|fit|max|min)",
			"(block|inline)-<num>",
			"(block|inline)-(full|screen|fit|max|min)",
			"(max|min)-(w|h|block|inline)",
			"(max|min)-(w|h|block|inline)-<num>",
			"(max|min)-(w|h|block|inline)-(full|screen|fit|max|min)"
		] }
	],
	[/^(?:size-)?(min-|max-)?(h)-screen-(.+)$/, ([, m, h$1, p], context) => ({ [getPropName(m, h$1)]: handleBreakpoint(context, p, "verticalBreakpoint") })],
	[
		/^(?:size-)?(min-|max-)?(w)-screen-(.+)$/,
		([, m, w, p], context) => ({ [getPropName(m, w)]: handleBreakpoint(context, p) }),
		{ autocomplete: [
			"(w|h)-screen",
			"(min|max)-(w|h)-screen",
			"h-screen-$breakpoint",
			"(min|max)-h-screen-$breakpoint",
			"w-screen-$breakpoint",
			"(min|max)-w-screen-$breakpoint"
		] }
	]
];
function handleBreakpoint(context, point, key = "breakpoint") {
	const bp = resolveBreakpoints(context, key);
	if (bp) return bp.find((i) => i.point === point)?.size;
}
function getAspectRatio(prop) {
	if (/^\d+\/\d+$/.test(prop)) return prop;
	switch (prop) {
		case "square": return "1/1";
		case "video": return "16/9";
	}
	return h.bracket.cssvar.global.auto.number(prop);
}
var aspectRatio = [[
	/^(?:size-)?aspect-(?:ratio-)?(.+)$/,
	([, d]) => ({ "aspect-ratio": getAspectRatio(d) }),
	{ autocomplete: ["aspect-(square|video|ratio)", "aspect-ratio-(square|video)"] }
]];
var cursorValues = [
	"auto",
	"default",
	"none",
	"context-menu",
	"help",
	"pointer",
	"progress",
	"wait",
	"cell",
	"crosshair",
	"text",
	"vertical-text",
	"alias",
	"copy",
	"move",
	"no-drop",
	"not-allowed",
	"grab",
	"grabbing",
	"all-scroll",
	"col-resize",
	"row-resize",
	"n-resize",
	"e-resize",
	"s-resize",
	"w-resize",
	"ne-resize",
	"nw-resize",
	"se-resize",
	"sw-resize",
	"ew-resize",
	"ns-resize",
	"nesw-resize",
	"nwse-resize",
	"zoom-in",
	"zoom-out"
];
var containValues = [
	"size",
	"layout",
	"paint",
	"style"
];
var displays = [
	["inline", { display: "inline" }],
	["block", { display: "block" }],
	["inline-block", { display: "inline-block" }],
	["contents", { display: "contents" }],
	["flow-root", { display: "flow-root" }],
	["list-item", { display: "list-item" }],
	["hidden", { display: "none" }],
	[/^display-(.+)$/, ([, c]) => ({ display: h.bracket.cssvar.global(c) })]
];
var appearances = [
	["visible", { visibility: "visible" }],
	["invisible", { visibility: "hidden" }],
	["collapse", { visibility: "collapse" }],
	["backface-visible", { "backface-visibility": "visible" }],
	["backface-hidden", { "backface-visibility": "hidden" }],
	...makeGlobalStaticRules("backface", "backface-visibility")
];
var cursors = [[/^cursor-(.+)$/, ([, c]) => ({ cursor: h.bracket.cssvar.global(c) })], ...cursorValues.map((v) => [`cursor-${v}`, { cursor: v }])];
var contains = [
	[/^contain-(.*)$/, ([, d]) => {
		if (h.bracket(d) != null) return { contain: h.bracket(d).split(" ").map((e) => h.cssvar.fraction(e) ?? e).join(" ") };
		return containValues.includes(d) ? [{
			"--un-contain-size": d,
			"contain": containValues.map((i) => `var(--un-contain-${i})`).join(" ")
		}, ...containValues.map((i) => defineProperty(`--un-contain-${i}`))] : void 0;
	}],
	["contain-strict", { contain: "strict" }],
	["contain-content", { contain: "content" }],
	["contain-none", { contain: "none" }]
];
var pointerEvents = [
	["pointer-events-auto", { "pointer-events": "auto" }],
	["pointer-events-none", { "pointer-events": "none" }],
	...makeGlobalStaticRules("pointer-events")
];
var resizes = [
	["resize-x", { resize: "horizontal" }],
	["resize-y", { resize: "vertical" }],
	["resize", { resize: "both" }],
	["resize-none", { resize: "none" }],
	...makeGlobalStaticRules("resize")
];
var userSelects = [
	["select-auto", {
		"-webkit-user-select": "auto",
		"user-select": "auto"
	}],
	["select-all", {
		"-webkit-user-select": "all",
		"user-select": "all"
	}],
	["select-text", {
		"-webkit-user-select": "text",
		"user-select": "text"
	}],
	["select-none", {
		"-webkit-user-select": "none",
		"user-select": "none"
	}],
	...makeGlobalStaticRules("select", "user-select")
];
var whitespaces = [[
	/^(?:whitespace-|ws-)([-\w]+)$/,
	([, v]) => [
		"normal",
		"nowrap",
		"pre",
		"pre-line",
		"pre-wrap",
		"break-spaces",
		...globalKeywords
	].includes(v) ? { "white-space": v } : void 0,
	{ autocomplete: "(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)" }
]];
var contentVisibility = [
	[
		/^intrinsic(?:-(block|inline|w|h))?(?:-size)?-(.+)$/,
		([, d, s]) => {
			return { [`contain-intrinsic-${{
				block: "block-size",
				inline: "inline-size",
				w: "width",
				h: "height"
			}[d] ?? "size"}`]: h.bracket.cssvar.global.fraction.rem(s) };
		},
		{ autocomplete: [
			"intrinsic-size-<num>",
			"intrinsic-<num>",
			"intrinsic-(block|inline|w|h)-<num>"
		] }
	],
	["content-visibility-visible", { "content-visibility": "visible" }],
	["content-visibility-hidden", { "content-visibility": "hidden" }],
	["content-visibility-auto", { "content-visibility": "auto" }],
	...makeGlobalStaticRules("content-visibility")
];
var contents = [
	[/^content-(.+)$/, ([, v]) => {
		if (h.bracket.cssvar(v) != null) return [{
			"--un-content": h.bracket.cssvar(v),
			"content": "var(--un-content)"
		}, defineProperty("--un-content", { initialValue: "\"\"" })];
	}],
	["content-empty", { content: "\"\"" }],
	["content-none", { content: "none" }]
];
var breaks = [
	["break-normal", {
		"overflow-wrap": "normal",
		"word-break": "normal"
	}],
	["break-words", { "overflow-wrap": "break-word" }],
	["break-all", { "word-break": "break-all" }],
	["break-keep", { "word-break": "keep-all" }],
	["break-anywhere", { "overflow-wrap": "anywhere" }],
	["wrap-break-word", { "overflow-wrap": "break-word" }],
	["wrap-anywhere", { "overflow-wrap": "anywhere" }],
	["wrap-normal", { "overflow-wrap": "normal" }]
];
var textWraps = [
	["text-wrap", { "text-wrap": "wrap" }],
	["text-nowrap", { "text-wrap": "nowrap" }],
	["text-balance", { "text-wrap": "balance" }],
	["text-pretty", { "text-wrap": "pretty" }]
];
var textOverflows = [
	["truncate", {
		"overflow": "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	}],
	["text-truncate", {
		"overflow": "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	}],
	["text-ellipsis", { "text-overflow": "ellipsis" }],
	["text-clip", { "text-overflow": "clip" }]
];
var textTransforms = [
	["case-upper", { "text-transform": "uppercase" }],
	["case-lower", { "text-transform": "lowercase" }],
	["case-capital", { "text-transform": "capitalize" }],
	["case-normal", { "text-transform": "none" }],
	["uppercase", { "text-transform": "uppercase" }],
	["lowercase", { "text-transform": "lowercase" }],
	["capitalize", { "text-transform": "capitalize" }],
	["normal-case", { "text-transform": "none" }],
	...makeGlobalStaticRules("case", "text-transform")
];
var fontStyles = [
	["italic", { "font-style": "italic" }],
	["not-italic", { "font-style": "normal" }],
	["font-italic", { "font-style": "italic" }],
	["font-not-italic", { "font-style": "normal" }],
	["oblique", { "font-style": "oblique" }],
	["not-oblique", { "font-style": "normal" }],
	["font-oblique", { "font-style": "oblique" }],
	["font-not-oblique", { "font-style": "normal" }]
];
var fontSmoothings = [["antialiased", {
	"-webkit-font-smoothing": "antialiased",
	"-moz-osx-font-smoothing": "grayscale"
}], ["subpixel-antialiased", {
	"-webkit-font-smoothing": "auto",
	"-moz-osx-font-smoothing": "auto"
}]];
var hyphens = [...[
	"manual",
	"auto",
	"none",
	...globalKeywords
].map((keyword) => [`hyphens-${keyword}`, {
	"-webkit-hyphens": keyword,
	"-ms-hyphens": keyword,
	"hyphens": keyword
}])];
var writingModes = [
	["write-vertical-right", { "writing-mode": "vertical-rl" }],
	["write-vertical-left", { "writing-mode": "vertical-lr" }],
	["write-normal", { "writing-mode": "horizontal-tb" }],
	...makeGlobalStaticRules("write", "writing-mode")
];
var writingOrientations = [
	["write-orient-mixed", { "text-orientation": "mixed" }],
	["write-orient-sideways", { "text-orientation": "sideways" }],
	["write-orient-upright", { "text-orientation": "upright" }],
	...makeGlobalStaticRules("write-orient", "text-orientation")
];
var screenReadersAccess = [["sr-only", {
	"position": "absolute",
	"width": "1px",
	"height": "1px",
	"padding": "0",
	"margin": "-1px",
	"overflow": "hidden",
	"clip": "rect(0,0,0,0)",
	"white-space": "nowrap",
	"border-width": 0
}], ["not-sr-only", {
	"position": "static",
	"width": "auto",
	"height": "auto",
	"padding": "0",
	"margin": "0",
	"overflow": "visible",
	"clip": "auto",
	"white-space": "normal"
}]];
var isolations = [
	["isolate", { isolation: "isolate" }],
	["isolate-auto", { isolation: "auto" }],
	["isolation-auto", { isolation: "auto" }]
];
var objectPositions = [
	["object-cover", { "object-fit": "cover" }],
	["object-contain", { "object-fit": "contain" }],
	["object-fill", { "object-fit": "fill" }],
	["object-scale-down", { "object-fit": "scale-down" }],
	["object-none", { "object-fit": "none" }],
	[
		/^object-(.+)$/,
		([, d]) => {
			if (positionMap[d]) return { "object-position": positionMap[d] };
			if (h.bracketOfPosition(d) != null) return { "object-position": h.bracketOfPosition(d).split(" ").map((e) => h.position.fraction.auto.px.cssvar(e) ?? e).join(" ") };
		},
		{ autocomplete: `object-(${Object.keys(positionMap).join("|")})` }
	]
];
var backgroundBlendModes = [
	["bg-blend-multiply", { "background-blend-mode": "multiply" }],
	["bg-blend-screen", { "background-blend-mode": "screen" }],
	["bg-blend-overlay", { "background-blend-mode": "overlay" }],
	["bg-blend-darken", { "background-blend-mode": "darken" }],
	["bg-blend-lighten", { "background-blend-mode": "lighten" }],
	["bg-blend-color-dodge", { "background-blend-mode": "color-dodge" }],
	["bg-blend-color-burn", { "background-blend-mode": "color-burn" }],
	["bg-blend-hard-light", { "background-blend-mode": "hard-light" }],
	["bg-blend-soft-light", { "background-blend-mode": "soft-light" }],
	["bg-blend-difference", { "background-blend-mode": "difference" }],
	["bg-blend-exclusion", { "background-blend-mode": "exclusion" }],
	["bg-blend-hue", { "background-blend-mode": "hue" }],
	["bg-blend-saturation", { "background-blend-mode": "saturation" }],
	["bg-blend-color", { "background-blend-mode": "color" }],
	["bg-blend-luminosity", { "background-blend-mode": "luminosity" }],
	["bg-blend-normal", { "background-blend-mode": "normal" }],
	...makeGlobalStaticRules("bg-blend", "background-blend")
];
var mixBlendModes = [
	["mix-blend-multiply", { "mix-blend-mode": "multiply" }],
	["mix-blend-screen", { "mix-blend-mode": "screen" }],
	["mix-blend-overlay", { "mix-blend-mode": "overlay" }],
	["mix-blend-darken", { "mix-blend-mode": "darken" }],
	["mix-blend-lighten", { "mix-blend-mode": "lighten" }],
	["mix-blend-color-dodge", { "mix-blend-mode": "color-dodge" }],
	["mix-blend-color-burn", { "mix-blend-mode": "color-burn" }],
	["mix-blend-hard-light", { "mix-blend-mode": "hard-light" }],
	["mix-blend-soft-light", { "mix-blend-mode": "soft-light" }],
	["mix-blend-difference", { "mix-blend-mode": "difference" }],
	["mix-blend-exclusion", { "mix-blend-mode": "exclusion" }],
	["mix-blend-hue", { "mix-blend-mode": "hue" }],
	["mix-blend-saturation", { "mix-blend-mode": "saturation" }],
	["mix-blend-color", { "mix-blend-mode": "color" }],
	["mix-blend-luminosity", { "mix-blend-mode": "luminosity" }],
	["mix-blend-plus-lighter", { "mix-blend-mode": "plus-lighter" }],
	["mix-blend-normal", { "mix-blend-mode": "normal" }],
	...makeGlobalStaticRules("mix-blend")
];
var dynamicViewportHeight = [
	["min-h-dvh", { "min-height": "100dvh" }],
	["min-h-svh", { "min-height": "100svh" }],
	["min-h-lvh", { "min-height": "100lvh" }],
	["h-dvh", { height: "100dvh" }],
	["h-svh", { height: "100svh" }],
	["h-lvh", { height: "100lvh" }],
	["max-h-dvh", { "max-height": "100dvh" }],
	["max-h-svh", { "max-height": "100svh" }],
	["max-h-lvh", { "max-height": "100lvh" }]
];
var accessibility = [["forced-color-adjust-auto", { "forced-color-adjust": "auto" }], ["forced-color-adjust-none", { "forced-color-adjust": "none" }]];
var fieldSizing = [["field-sizing-fixed", { "field-sizing": "fixed" }], ["field-sizing-content", { "field-sizing": "content" }]];
var svgUtilities = [
	[
		/^fill-(.+)$/,
		colorResolver("fill", "fill"),
		{ autocomplete: "fill-$colors" }
	],
	[
		/^fill-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-fill-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "fill-(op|opacity)-<percent>" }
	],
	["fill-none", { fill: "none" }],
	[/^stroke-(?:width-|size-)?(.+)$/, handleWidth],
	[
		/^stroke-dash-(.+)$/,
		([, s]) => ({ "stroke-dasharray": h.bracket.cssvar.number(s) }),
		{ autocomplete: "stroke-dash-<num>" }
	],
	[/^stroke-offset-(.+)$/, ([, s]) => ({ "stroke-dashoffset": h.bracket.cssvar.px.numberWithUnit(s) })],
	[
		/^stroke-(.+)$/,
		handleColorOrWidth,
		{ autocomplete: "stroke-$colors" }
	],
	[
		/^stroke-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-stroke-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "stroke-(op|opacity)-<percent>" }
	],
	["stroke-cap-square", { "stroke-linecap": "square" }],
	["stroke-cap-round", { "stroke-linecap": "round" }],
	["stroke-cap-auto", { "stroke-linecap": "butt" }],
	["stroke-join-arcs", { "stroke-linejoin": "arcs" }],
	["stroke-join-bevel", { "stroke-linejoin": "bevel" }],
	["stroke-join-clip", { "stroke-linejoin": "miter-clip" }],
	["stroke-join-round", { "stroke-linejoin": "round" }],
	["stroke-join-auto", { "stroke-linejoin": "miter" }],
	["stroke-none", { stroke: "none" }]
];
function handleWidth([, b]) {
	return { "stroke-width": h.bracket.cssvar.fraction.px.number(b) };
}
function handleColorOrWidth(match, ctx) {
	if (isCSSMathFn(h.bracket(match[1]))) return handleWidth(match);
	return colorResolver("stroke", "stroke")(match, ctx);
}
var tables = [
	["inline-table", { display: "inline-table" }],
	["table", { display: "table" }],
	["table-caption", { display: "table-caption" }],
	["table-cell", { display: "table-cell" }],
	["table-column", { display: "table-column" }],
	["table-column-group", { display: "table-column-group" }],
	["table-footer-group", { display: "table-footer-group" }],
	["table-header-group", { display: "table-header-group" }],
	["table-row", { display: "table-row" }],
	["table-row-group", { display: "table-row-group" }],
	["border-collapse", { "border-collapse": "collapse" }],
	["border-separate", { "border-collapse": "separate" }],
	[
		/^border-spacing-(.+)$/,
		function* ([, s], { theme }) {
			const v = resolveValue(s, theme);
			if (v != null) {
				yield {
					"--un-border-spacing-x": v,
					"--un-border-spacing-y": v,
					"border-spacing": "var(--un-border-spacing-x) var(--un-border-spacing-y)"
				};
				for (const d of ["x", "y"]) yield defineProperty(`--un-border-spacing-${d}`, {
					syntax: "<length>",
					initialValue: "0"
				});
			}
		},
		{ autocomplete: ["border-spacing", "border-spacing-$spacing"] }
	],
	[
		/^border-spacing-([xy])-(.+)$/,
		function* ([, d, s], { theme }) {
			const v = resolveValue(s, theme);
			if (v != null) {
				yield {
					[`--un-border-spacing-${d}`]: v,
					"border-spacing": "var(--un-border-spacing-x) var(--un-border-spacing-y)"
				};
				for (const d$1 of ["x", "y"]) yield defineProperty(`--un-border-spacing-${d$1}`, {
					syntax: "<length>",
					initialValue: "0"
				});
			}
		},
		{ autocomplete: ["border-spacing-(x|y)", "border-spacing-(x|y)-$spacing"] }
	],
	["caption-top", { "caption-side": "top" }],
	["caption-bottom", { "caption-side": "bottom" }],
	["table-auto", { "table-layout": "auto" }],
	["table-fixed", { "table-layout": "fixed" }],
	["table-empty-cells-visible", { "empty-cells": "show" }],
	["table-empty-cells-hidden", { "empty-cells": "hide" }]
];
function resolveValue(s, theme) {
	let v = theme.spacing?.[s];
	if (!v) {
		const num = numberResolver(s);
		if (num != null) {
			themeTracking(`spacing`);
			v = `calc(var(--spacing) * ${num})`;
		} else v = h.bracket.cssvar.global.auto.fraction.rem(s);
	}
	return v;
}
var touchActionValue = "var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom)";
var touchActionProperties = [
	"pan-x",
	"pan-y",
	"pinch-zoom"
].map((d) => defineProperty(`--un-${d}`));
var touchActions = [
	[
		/^touch-pan-(x|left|right)$/,
		function* ([, d]) {
			yield {
				"--un-pan-x": `pan-${d}`,
				"touch-action": touchActionValue
			};
			for (const p of touchActionProperties) yield p;
		},
		{ autocomplete: ["touch-pan", "touch-pan-(x|left|right|y|up|down)"] }
	],
	[/^touch-pan-(y|up|down)$/, function* ([, d]) {
		yield {
			"--un-pan-y": `pan-${d}`,
			"touch-action": touchActionValue
		};
		for (const p of touchActionProperties) yield p;
	}],
	[/^touch-pinch-zoom$/, function* () {
		yield {
			"--un-pinch-zoom": "pinch-zoom",
			"touch-action": touchActionValue
		};
		for (const p of touchActionProperties) yield p;
	}],
	["touch-auto", { "touch-action": "auto" }],
	["touch-manipulation", { "touch-action": "manipulation" }],
	["touch-none", { "touch-action": "none" }],
	...makeGlobalStaticRules("touch", "touch-action")
];
var transformValues = [
	"translate",
	"rotate",
	"scale"
];
var transformCpu = [
	"var(--un-rotate-x)",
	"var(--un-rotate-y)",
	"var(--un-rotate-z)",
	"var(--un-skew-x)",
	"var(--un-skew-y)"
].join(" ");
var transform = transformCpu;
var transformGpu = ["translateZ(0)", transformCpu].join(" ");
var transforms = [
	[
		/^(?:transform-)?origin-(.+)$/,
		([, s]) => ({ "transform-origin": positionMap[s] ?? h.bracket.cssvar(s) }),
		{ autocomplete: [`transform-origin-(${Object.keys(positionMap).join("|")})`, `origin-(${Object.keys(positionMap).join("|")})`] }
	],
	[
		/^(transform-)?perspect(?:ive)?-(.+)$/,
		([, t, s], { theme }) => {
			let v;
			if (theme.perspective?.[s]) {
				themeTracking(`perspective`, s);
				v = generateThemeVariable("perspective", s);
			} else v = h.bracket.cssvar.px.numberWithUnit(s);
			if (v != null) {
				if (t) return {
					"--un-perspective": `perspective(${v})`,
					"transform": `var(--un-perspective) ${transform}`
				};
				return { perspective: v };
			}
		},
		{ autocomplete: [`perspective-<num>`, `perspective-$perspective`] }
	],
	[/^(?:transform-)?perspect(?:ive)?-origin-(.+)$/, ([, s]) => {
		const v = h.bracket.cssvar(s) ?? (s.length >= 3 ? positionMap[s] : void 0);
		if (v != null) return { "perspective-origin": v };
	}],
	[/^(?:transform-)?translate-()(.+)$/, handleTranslate],
	[/^(?:transform-)?translate-([xyz])-(.+)$/, handleTranslate],
	[/^(?:transform-)?rotate-()(.+)$/, handleRotate],
	[/^(?:transform-)?rotate-([xyz])-(.+)$/, handleRotate],
	[/^(?:transform-)?skew-()(.+)$/, handleSkew],
	[
		/^(?:transform-)?skew-([xy])-(.+)$/,
		handleSkew,
		{ autocomplete: ["transform-skew-(x|y)-<percent>", "skew-(x|y)-<percent>"] }
	],
	[/^(?:transform-)?scale-()(.+)$/, handleScale],
	[
		/^(?:transform-)?scale-([xyz])-(.+)$/,
		handleScale,
		{ autocomplete: [
			`transform-(${transformValues.join("|")})-<percent>`,
			`transform-(${transformValues.join("|")})-(x|y|z)-<percent>`,
			`(${transformValues.join("|")})-<percent>`,
			`(${transformValues.join("|")})-(x|y|z)-<percent>`
		] }
	],
	["transform-3d", { "transform-style": "preserve-3d" }],
	["transform-flat", { "transform-style": "flat" }],
	[/^transform-(border|content|fill|stroke|view)$/, ([, d]) => ({ "transform-box": `${d}-box` })],
	["transform", { transform }],
	["transform-cpu", { transform: transformCpu }],
	["transform-gpu", { transform: transformGpu }],
	["transform-none", { transform: "none" }],
	...makeGlobalStaticRules("transform")
];
function handleTranslate([, d, b]) {
	const v = numberResolver(b) ?? h.bracket.cssvar.none.fraction.rem(b);
	if (v != null) {
		if (v === "none") return { translate: "none" };
		themeTracking(`spacing`);
		return [[...transformXYZ(d, typeof v === "number" ? `calc(var(--spacing) * ${v})` : v, "translate"), [
			"translate",
			`var(--un-translate-x) var(--un-translate-y)${d === "z" ? " var(--un-translate-z)" : ""}`,
			CONTROL_NO_NEGATIVE
		]], ...[
			"x",
			"y",
			"z"
		].map((d$1) => defineProperty(`--un-translate-${d$1}`, { initialValue: 0 }))];
	}
}
function handleScale([, d, b]) {
	const v = h.bracket.cssvar.none.fraction.percent(b);
	if (v != null) {
		if (v === "none") return { scale: "none" };
		return [[...transformXYZ(d, v, "scale"), ["scale", `var(--un-scale-x) var(--un-scale-y)${d === "z" ? " var(--un-scale-z)" : ""}`]], ...[
			"x",
			"y",
			"z"
		].map((d$1) => defineProperty(`--un-scale-${d$1}`, { initialValue: 1 }))];
	}
}
function handleRotate([, d = "", b]) {
	const v = h.bracket.cssvar.none.degree(b);
	if (v != null) {
		if (v === "none") return { rotate: "none" };
		if (d) return [
			[...transformXYZ(d, v.endsWith("deg") ? `rotate${d.toUpperCase()}(${v})` : v, "rotate"), ["transform", transform]],
			...[
				"x",
				"y",
				"z"
			].map((d$1) => defineProperty(`--un-rotate-${d$1}`, { initialValue: `rotate${d$1.toUpperCase()}(0)` })),
			...["x", "y"].map((d$1) => defineProperty(`--un-skew-${d$1}`, { initialValue: `skew${d$1.toUpperCase()}(0)` }))
		];
		else return { rotate: h.bracket.cssvar.degree(b) };
	}
}
function handleSkew([, d, b]) {
	const v = h.bracket.cssvar.degree(b);
	const ds = xyzMap[d];
	if (v != null && ds) return [
		[...ds.map((_d) => [`--un-skew${_d}`, v.endsWith("deg") ? `skew${_d.slice(1).toUpperCase()}(${v})` : v]), ["transform", transform]],
		...[
			"x",
			"y",
			"z"
		].map((d$1) => defineProperty(`--un-rotate-${d$1}`, { initialValue: `rotate${d$1.toUpperCase()}(0)` })),
		...["x", "y"].map((d$1) => defineProperty(`--un-skew-${d$1}`, { initialValue: `skew${d$1.toUpperCase()}(0)` }))
	];
}
function transformXYZ(d, v, name) {
	const values = v.split(splitComma);
	if (d || !d && values.length === 1) return xyzMap[d].map((i) => [`--un-${name}${i}`, v]);
	return values.map((v$1, i) => [`--un-${name}-${xyzArray[i]}`, v$1]);
}
function resolveTransitionProperty(prop, theme) {
	let p;
	if (h.cssvar(prop) != null) p = h.cssvar(prop);
	else {
		if (prop.startsWith("[") && prop.endsWith("]")) prop = prop.slice(1, -1);
		const props = prop.split(",").map((p$1) => theme.property?.[p$1] ?? h.properties(p$1));
		if (props.every(Boolean)) p = props.join(",");
	}
	return p;
}
var transitions = [
	[/^transition(?:-(\D+?))?(?:-(\d+))?$/, ([, prop, d], { theme }) => {
		themeTracking("default", ["transition", "timingFunction"]);
		themeTracking("default", ["transition", "duration"]);
		const defaultTransition = {
			"transition-property": theme.property?.DEFAULT,
			"transition-timing-function": `var(--un-ease, ${generateThemeVariable("default", ["transition", "timingFunction"])})`,
			"transition-duration": `var(--un-duration, ${generateThemeVariable("default", ["transition", "duration"])})`
		};
		if (!prop && !d) return { ...defaultTransition };
		else if (prop != null) {
			const p = resolveTransitionProperty(prop, theme);
			if (p) return {
				"--un-duration": d && h.time(d),
				...defaultTransition,
				"transition-property": p
			};
		} else if (d != null) return {
			"--un-duration": h.time(d),
			...defaultTransition
		};
	}],
	[/^(?:transition-)?duration-(.+)$/, ([, d]) => ({
		"--un-duration": h.bracket.cssvar.time(d),
		"transition-duration": h.bracket.cssvar.time(d)
	})],
	[/^(?:transition-)?delay-(.+)$/, ([, d]) => ({ "transition-delay": h.bracket.cssvar.time(d) })],
	[
		/^(?:transition-)?ease(?:-(.+))?$/,
		([, d = "DEFAULT"], { theme }) => {
			let v;
			if (theme.ease?.[d]) {
				themeTracking("ease", d);
				v = generateThemeVariable("ease", d);
			} else v = h.bracket.cssvar(d);
			return [{
				"--un-ease": v,
				"transition-timing-function": v
			}, defineProperty("--un-ease")];
		},
		{ autocomplete: ["transition-ease-(linear|in|out|in-out)", "ease-(linear|in|out|in-out)"] }
	],
	[
		/^(?:transition-)?property-(.+)$/,
		([, v], { theme }) => {
			const p = h.global(v) || resolveTransitionProperty(v, theme);
			if (p) return { "transition-property": p };
		},
		{ autocomplete: [`transition-property-(${[...globalKeywords].join("|")})`] }
	],
	["transition-none", { transition: "none" }],
	...makeGlobalStaticRules("transition"),
	["transition-discrete", { "transition-behavior": "allow-discrete" }],
	["transition-normal", { "transition-behavior": "normal" }]
];
var fonts = [
	[
		/^text-(.+)$/,
		handleText,
		{ autocomplete: "text-$text" }
	],
	[
		/^(?:text|font)-size-(.+)$/,
		handleSize,
		{ autocomplete: "text-size-$text" }
	],
	[
		/^text-(?:color-)?(.+)$/,
		handlerColorOrSize,
		{ autocomplete: "text-$colors" }
	],
	[/^(?:color|c)-(.+)$/, colorResolver("color", "text")],
	[
		/^(?:text|color|c)-(.+)$/,
		([, v]) => globalKeywords.includes(v) ? { color: v } : void 0,
		{ autocomplete: `(text|color|c)-(${globalKeywords.join("|")})` }
	],
	[
		/^(?:text|color|c)-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-text-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "(text|color|c)-(op|opacity)-<percent>" }
	],
	[
		/^fw-?([^-]+)$/,
		([, s], { theme }) => {
			let v;
			if (theme.fontWeight?.[s]) {
				themeTracking(`fontWeight`, s);
				v = generateThemeVariable("fontWeight", s);
			} else v = h.bracket.cssvar.global.number(s);
			return {
				"--un-font-weight": v,
				"font-weight": v
			};
		},
		{ autocomplete: ["(font|fw)-(100|200|300|400|500|600|700|800|900)", "(font|fw)-$fontWeight"] }
	],
	[
		/^(?:font-)?(?:leading|lh|line-height)-(.+)$/,
		([, s], { theme }) => {
			let v;
			if (theme.leading?.[s]) {
				themeTracking("leading", s);
				v = generateThemeVariable("leading", s);
			} else if (numberResolver(s)) {
				themeTracking("spacing");
				v = `calc(var(--spacing) * ${numberResolver(s)})`;
			} else v = h.bracket.cssvar.global.rem(s);
			if (v != null) return [{
				"--un-leading": v,
				"line-height": v
			}, defineProperty("--un-leading")];
		},
		{ autocomplete: "(leading|lh|line-height)-$leading" }
	],
	["font-synthesis-weight", { "font-synthesis": "weight" }],
	["font-synthesis-style", { "font-synthesis": "style" }],
	["font-synthesis-small-caps", { "font-synthesis": "small-caps" }],
	["font-synthesis-none", { "font-synthesis": "none" }],
	[/^font-synthesis-(.+)$/, ([, s]) => ({ "font-synthesis": h.bracket.cssvar.global(s) })],
	[
		/^(?:font-)?tracking-(.+)$/,
		([, s], { theme }) => {
			let v;
			if (theme.tracking?.[s]) {
				themeTracking(`tracking`, s);
				v = generateThemeVariable("tracking", s);
			} else v = h.bracket.cssvar.global.rem(s);
			return {
				"--un-tracking": v,
				"letter-spacing": v
			};
		},
		{ autocomplete: "tracking-$tracking" }
	],
	[
		/^(?:font-)?word-spacing-(.+)$/,
		([, s], { theme }) => {
			const v = theme.tracking?.[s] ? generateThemeVariable("tracking", s) : h.bracket.cssvar.global.rem(s);
			return {
				"--un-word-spacing": v,
				"word-spacing": v
			};
		},
		{ autocomplete: "word-spacing-$spacing" }
	],
	["font-stretch-normal", { "font-stretch": "normal" }],
	["font-stretch-ultra-condensed", { "font-stretch": "ultra-condensed" }],
	["font-stretch-extra-condensed", { "font-stretch": "extra-condensed" }],
	["font-stretch-condensed", { "font-stretch": "condensed" }],
	["font-stretch-semi-condensed", { "font-stretch": "semi-condensed" }],
	["font-stretch-semi-expanded", { "font-stretch": "semi-expanded" }],
	["font-stretch-expanded", { "font-stretch": "expanded" }],
	["font-stretch-extra-expanded", { "font-stretch": "extra-expanded" }],
	["font-stretch-ultra-expanded", { "font-stretch": "ultra-expanded" }],
	[
		/^font-stretch-(.+)$/,
		([, s]) => ({ "font-stretch": h.bracket.cssvar.fraction.global(s) }),
		{ autocomplete: "font-stretch-<percentage>" }
	],
	[
		/^font-(.+)$/,
		([, d], { theme }) => {
			let v;
			if (theme.font?.[d]) {
				themeTracking("font", d);
				v = generateThemeVariable("font", d);
				return { "font-family": v };
			}
			if (theme.fontWeight?.[d]) {
				themeTracking("fontWeight", d);
				v = generateThemeVariable("fontWeight", d);
				return {
					"--un-font-weight": v,
					"font-weight": v
				};
			}
			v = h.number(d);
			if (v != null) return {
				"--un-font-weight": v,
				"font-weight": v
			};
			v = h.bracketOfFamily(d);
			if (v != null && h.number(v) == null) {
				v = h.cssvar(v) ?? v;
				return { "font-family": v };
			}
			v = h.bracketOfNumber(d);
			if (v != null) {
				v = h.cssvar.number(v);
				return {
					"--un-font-weight": v,
					"font-weight": v
				};
			}
			v = h.bracket(d);
			if (v != null && h.number(v) != null) {
				const num = h.number(v);
				return {
					"--un-font-weight": num,
					"font-weight": num
				};
			}
			v = h.bracket.cssvar.global(d);
			if (v != null) return { "font-family": v };
		},
		{ autocomplete: ["font-$font", "font-$fontWeight"] }
	]
];
var tabSizes = [[/^tab(?:-(.+))?$/, ([, s]) => {
	const v = h.bracket.cssvar.global.number(s || "4");
	if (v != null) return {
		"-moz-tab-size": v,
		"-o-tab-size": v,
		"tab-size": v
	};
}]];
var textIndents = [[/^indent-(.+)$/, ([, s]) => {
	let v = numberResolver(s);
	if (v != null) {
		themeTracking(`spacing`);
		return { "text-indent": `calc(var(--spacing) * ${v})` };
	}
	v = h.bracket.cssvar.auto.global.rem(s);
	if (v != null) return { "text-indent": v };
}]];
var textStrokes = [
	[
		/^text-stroke(?:-(.+))?$/,
		([, s = "DEFAULT"], { theme }) => {
			if (theme.textStrokeWidth?.[s]) themeTracking(`textStrokeWidth`, s);
			return { "-webkit-text-stroke-width": theme.textStrokeWidth?.[s] ? generateThemeVariable("textStrokeWidth", s) : h.bracket.cssvar.px(s) };
		},
		{ autocomplete: "text-stroke-$textStrokeWidth" }
	],
	[
		/^text-stroke-(.+)$/,
		colorResolver("-webkit-text-stroke-color", "text-stroke"),
		{ autocomplete: "text-stroke-$colors" }
	],
	[
		/^text-stroke-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-text-stroke-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "text-stroke-(op|opacity)-<percent>" }
	]
];
function handleTextShadow(match, ctx) {
	const [, s] = match;
	const { theme } = ctx;
	let res = [];
	if (s) res = getStringComponents(s, "/", 2) ?? [];
	const v = theme.textShadow?.[res[0]];
	const c = s ? h.bracket.cssvar(s) : void 0;
	if ((v != null || c != null) && !hasParseableColor(c, theme)) {
		const alpha = res[1] ? h.bracket.percent.cssvar(res[1]) : void 0;
		return {
			"--un-text-shadow-opacity": alpha,
			"--un-text-shadow": colorableShadows(v || c, "--un-text-shadow-color", alpha).join(","),
			"text-shadow": "var(--un-text-shadow)"
		};
	}
	return colorResolver("--un-text-shadow-color", "text-shadow")(match, ctx) ?? { "text-shadow": h.bracket.cssvar.global(s) };
}
var textShadows = [
	[
		/^text-shadow-(.+)$/,
		handleTextShadow,
		{ autocomplete: [
			"text-shadow-$textShadow",
			"text-shadow(-color)?-$colors",
			"text-shadow(-color)?-(op|opacity)-<percent>"
		] }
	],
	[
		/^text-shadow-color-(.+)$/,
		colorResolver("--un-text-shadow-color", "text-shadow"),
		{ autocomplete: "text-shadow-color-$colors" }
	],
	[
		/^text-shadow(?:-color)?-op(?:acity)?-?(.+)$/,
		([, opacity$1]) => ({ "--un-text-shadow-opacity": h.bracket.percent.cssvar(opacity$1) }),
		{ autocomplete: "text-shadow(-color)?-(op|opacity)-<percent>" }
	]
];
var fontVariantNumericProperties = [
	defineProperty("--un-ordinal"),
	defineProperty("--un-slashed-zero"),
	defineProperty("--un-numeric-figure"),
	defineProperty("--un-numeric-spacing"),
	defineProperty("--un-numeric-fraction")
];
var baseFontVariantNumeric = { "font-variant-numeric": "var(--un-ordinal,) var(--un-slashed-zero,) var(--un-numeric-figure,) var(--un-numeric-spacing,) var(--un-numeric-fraction,)" };
var fontVariantNumeric = [
	["ordinal", [{
		"--un-ordinal": "ordinal",
		...baseFontVariantNumeric
	}, ...fontVariantNumericProperties]],
	["slashed-zero", [{
		"--un-slashed-zero": "slashed-zero",
		...baseFontVariantNumeric
	}, ...fontVariantNumericProperties]],
	["lining-nums", [{
		"--un-numeric-figure": "lining-nums",
		...baseFontVariantNumeric
	}, ...fontVariantNumericProperties]],
	["oldstyle-nums", [{
		"--un-numeric-figure": "oldstyle-nums",
		...baseFontVariantNumeric
	}, ...fontVariantNumericProperties]],
	["proportional-nums", [{
		"--un-numeric-spacing": "proportional-nums",
		...baseFontVariantNumeric
	}, ...fontVariantNumericProperties]],
	["tabular-nums", [{
		"--un-numeric-spacing": "tabular-nums",
		...baseFontVariantNumeric
	}, ...fontVariantNumericProperties]],
	["diagonal-fractions", [{
		"--un-numeric-fraction": "diagonal-fractions",
		...baseFontVariantNumeric
	}, ...fontVariantNumericProperties]],
	["stacked-fractions", [{
		"--un-numeric-fraction": "stacked-fractions",
		...baseFontVariantNumeric
	}, ...fontVariantNumericProperties]],
	["normal-nums", [{ "font-variant-numeric": "normal" }]]
];
function handleText([, s = "base"], { theme }) {
	const split = splitShorthand(s, "length");
	if (!split) return;
	const [size, leading] = split;
	const sizePairs = theme.text?.[size];
	let lineHeight;
	if (leading) if (theme.leading?.[leading]) {
		themeTracking(`leading`, leading);
		lineHeight = generateThemeVariable("leading", leading);
	} else lineHeight = h.bracket.cssvar.global.rem(leading);
	if (sizePairs) {
		themeTracking(`text`, [size, "fontSize"]);
		themeTracking(`text`, [size, "lineHeight"]);
		if (sizePairs.letterSpacing) themeTracking(`text`, [size, "letterSpacing"]);
		return {
			"font-size": generateThemeVariable("text", [size, "fontSize"]),
			"line-height": lineHeight ?? `var(--un-leading, ${generateThemeVariable("text", [size, "lineHeight"])})`,
			"letter-spacing": sizePairs.letterSpacing ? generateThemeVariable("text", [size, "letterSpacing"]) : void 0
		};
	}
	const fontSize = h.bracketOfLength.rem(size);
	if (lineHeight && fontSize) return {
		"font-size": fontSize,
		"line-height": lineHeight
	};
	return { "font-size": h.bracketOfLength.rem(s) };
}
function handleSize([, s], { theme }) {
	if (theme.text?.[s] != null) {
		themeTracking(`text`, [s, "fontSize"]);
		themeTracking(`text`, [s, "lineHeight"]);
		return {
			"font-size": generateThemeVariable("text", [s, "fontSize"]),
			"line-height": `var(--un-leading, ${generateThemeVariable("text", [s, "lineHeight"])})`
		};
	} else {
		const d = h.bracket.cssvar.global.rem(s);
		if (d) return { "font-size": d };
	}
}
function handlerColorOrSize(match, ctx) {
	if (isCSSMathFn(h.bracket(match[1]))) return handleSize(match, ctx);
	return colorResolver("color", "text")(match, ctx);
}
function splitShorthand(body, type) {
	const [front, rest] = getStringComponent(body, "[", "]", ["/", ":"]) ?? [];
	if (front != null) {
		const match = (front.match(bracketTypeRe) ?? [])[1];
		if (match == null || match === type) return [front, rest];
	}
}
var variablesAbbrMap = {
	"backface": "backface-visibility",
	"break": "word-break",
	"case": "text-transform",
	"content": "align-content",
	"fw": "font-weight",
	"items": "align-items",
	"justify": "justify-content",
	"select": "user-select",
	"self": "align-self",
	"vertical": "vertical-align",
	"visible": "visibility",
	"whitespace": "white-space",
	"ws": "white-space",
	"bg-blend": "background-blend-mode",
	"bg-clip": "-webkit-background-clip",
	"bg-image": "background-image",
	"bg-origin": "background-origin",
	"bg-position": "background-position",
	"bg-repeat": "background-repeat",
	"bg-size": "background-size",
	"mix-blend": "mix-blend-mode",
	"object": "object-fit",
	"object-position": "object-position",
	"write": "writing-mode",
	"write-orient": "text-orientation"
};
var cssVariables = [[/^(.+?)-(\$.+)$/, ([, name, varname]) => {
	const prop = variablesAbbrMap[name];
	if (prop) return { [prop]: h.cssvar(varname) };
}]];
var cssProperty = [[/^\[(.*)\]$/, ([_, body], { theme }) => {
	if (!body.includes(":")) return;
	const [prop, ...rest] = body.split(":");
	const value = rest.join(":");
	if (!isURI(body) && /^[\w-]+$/.test(prop) && isValidCSSBody(value)) {
		const parsed = h.bracket(`[${value}]`, theme);
		if (parsed) return { [prop]: parsed };
	}
}]];
function isValidCSSBody(body) {
	let i = 0;
	function findUntil(c) {
		while (i < body.length) {
			i += 1;
			if (body[i] === c) return true;
		}
		return false;
	}
	for (i = 0; i < body.length; i++) {
		const c = body[i];
		if ("\"`'".includes(c)) {
			if (!findUntil(c)) return false;
		} else if (c === "(") {
			if (!findUntil(")")) return false;
		} else if ("[]{}:".includes(c)) return false;
	}
	return true;
}
function isURI(declaration) {
	if (!declaration.includes("://")) return false;
	try {
		return new URL(declaration).host !== "";
	} catch {
		return false;
	}
}
var rules = [
	fonts,
	tabSizes,
	textIndents,
	textStrokes,
	textShadows,
	margins,
	paddings,
	textAligns,
	verticalAligns,
	appearance,
	outline,
	willChange,
	listStyle,
	accents,
	carets,
	imageRenderings,
	overscrolls,
	outline,
	scrollBehaviors,
	willChange,
	borders,
	bgColors,
	opacity,
	colorScheme,
	container$1,
	containerParent,
	textDecorations,
	flex$1,
	gaps,
	grids,
	sizes,
	aspectRatio,
	displays,
	appearances,
	cursors,
	contains,
	pointerEvents,
	resizes,
	userSelects,
	whitespaces,
	contentVisibility,
	contents,
	breaks,
	textWraps,
	textOverflows,
	textTransforms,
	fontStyles,
	fontSmoothings,
	rings,
	boxShadows,
	transforms,
	transitions,
	cssVariables,
	cssProperty,
	alignments,
	boxSizing,
	flexGridJustifiesAlignments,
	floats,
	insets,
	justifies,
	orders,
	placements,
	positions,
	zIndexes,
	overflows,
	svgUtilities,
	animations,
	backgroundStyles,
	hyphens,
	writingModes,
	writingOrientations,
	accessibility,
	screenReadersAccess,
	isolations,
	objectPositions,
	backgroundBlendModes,
	mixBlendModes,
	dynamicViewportHeight,
	masks,
	columns,
	filters,
	lineClamps,
	placeholders,
	scrolls,
	tables,
	touchActions,
	fontVariantNumeric,
	[[/^view-transition-([\w-]+)$/, ([, name]) => {
		return { "view-transition-name": name };
	}]],
	spaces,
	divides,
	fieldSizing,
	questionMark
].flat();
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/shortcuts.mjs
var shortcuts = [...containerShortcuts];
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/colors-DfOpBqNN.mjs
var colors = {
	black: "#000",
	white: "#fff",
	slate: {
		50: "oklch(98.4% 0.003 247.858)",
		100: "oklch(96.8% 0.007 247.896)",
		200: "oklch(92.9% 0.013 255.508)",
		300: "oklch(86.9% 0.022 252.894)",
		400: "oklch(70.4% 0.04 256.788)",
		500: "oklch(55.4% 0.046 257.417)",
		600: "oklch(44.6% 0.043 257.281)",
		700: "oklch(37.2% 0.044 257.287)",
		800: "oklch(27.9% 0.041 260.031)",
		900: "oklch(20.8% 0.042 265.755)",
		950: "oklch(12.9% 0.042 264.695)"
	},
	gray: {
		50: "oklch(98.5% 0.002 247.839)",
		100: "oklch(96.7% 0.003 264.542)",
		200: "oklch(92.8% 0.006 264.531)",
		300: "oklch(87.2% 0.01 258.338)",
		400: "oklch(70.7% 0.022 261.325)",
		500: "oklch(55.1% 0.027 264.364)",
		600: "oklch(44.6% 0.03 256.802)",
		700: "oklch(37.3% 0.034 259.733)",
		800: "oklch(27.8% 0.033 256.848)",
		900: "oklch(21% 0.034 264.665)",
		950: "oklch(13% 0.028 261.692)"
	},
	zinc: {
		50: "oklch(98.5% 0 0)",
		100: "oklch(96.7% 0.001 286.375)",
		200: "oklch(92% 0.004 286.32)",
		300: "oklch(87.1% 0.006 286.286)",
		400: "oklch(70.5% 0.015 286.067)",
		500: "oklch(55.2% 0.016 285.938)",
		600: "oklch(44.2% 0.017 285.786)",
		700: "oklch(37% 0.013 285.805)",
		800: "oklch(27.4% 0.006 286.033)",
		900: "oklch(21% 0.006 285.885)",
		950: "oklch(14.1% 0.005 285.823)"
	},
	neutral: {
		50: "oklch(98.5% 0 0)",
		100: "oklch(97% 0 0)",
		200: "oklch(92.2% 0 0)",
		300: "oklch(87% 0 0)",
		400: "oklch(70.8% 0 0)",
		500: "oklch(55.6% 0 0)",
		600: "oklch(43.9% 0 0)",
		700: "oklch(37.1% 0 0)",
		800: "oklch(26.9% 0 0)",
		900: "oklch(20.5% 0 0)",
		950: "oklch(14.5% 0 0)"
	},
	stone: {
		50: "oklch(98.5% 0.001 106.423)",
		100: "oklch(97% 0.001 106.424)",
		200: "oklch(92.3% 0.003 48.717)",
		300: "oklch(86.9% 0.005 56.366)",
		400: "oklch(70.9% 0.01 56.259)",
		500: "oklch(55.3% 0.013 58.071)",
		600: "oklch(44.4% 0.011 73.639)",
		700: "oklch(37.4% 0.01 67.558)",
		800: "oklch(26.8% 0.007 34.298)",
		900: "oklch(21.6% 0.006 56.043)",
		950: "oklch(14.7% 0.004 49.25)"
	},
	mauve: {
		50: "oklch(98.5% 0 0)",
		100: "oklch(96% 0.003 325.6)",
		200: "oklch(92.2% 0.005 325.62)",
		300: "oklch(86.5% 0.012 325.68)",
		400: "oklch(71.1% 0.019 323.02)",
		500: "oklch(54.2% 0.034 322.5)",
		600: "oklch(43.5% 0.029 321.78)",
		700: "oklch(36.4% 0.029 323.89)",
		800: "oklch(26.3% 0.024 320.12)",
		900: "oklch(21.2% 0.019 322.12)",
		950: "oklch(14.5% 0.008 326)"
	},
	olive: {
		50: "oklch(98.8% 0.003 106.5)",
		100: "oklch(96.6% 0.005 106.5)",
		200: "oklch(93% 0.007 106.5)",
		300: "oklch(88% 0.011 106.6)",
		400: "oklch(73.7% 0.021 106.9)",
		500: "oklch(58% 0.031 107.3)",
		600: "oklch(46.6% 0.025 107.3)",
		700: "oklch(39.4% 0.023 107.4)",
		800: "oklch(28.6% 0.016 107.4)",
		900: "oklch(22.8% 0.013 107.4)",
		950: "oklch(15.3% 0.006 107.1)"
	},
	mist: {
		50: "oklch(98.7% 0.002 197.1)",
		100: "oklch(96.3% 0.002 197.1)",
		200: "oklch(92.5% 0.005 214.3)",
		300: "oklch(87.2% 0.007 219.6)",
		400: "oklch(72.3% 0.014 214.4)",
		500: "oklch(56% 0.021 213.5)",
		600: "oklch(45% 0.017 213.2)",
		700: "oklch(37.8% 0.015 216)",
		800: "oklch(27.5% 0.011 216.9)",
		900: "oklch(21.8% 0.008 223.9)",
		950: "oklch(14.8% 0.004 228.8)"
	},
	taupe: {
		50: "oklch(98.6% 0.002 67.8)",
		100: "oklch(96% 0.002 17.2)",
		200: "oklch(92.2% 0.005 34.3)",
		300: "oklch(86.8% 0.007 39.5)",
		400: "oklch(71.4% 0.014 41.2)",
		500: "oklch(54.7% 0.021 43.1)",
		600: "oklch(43.8% 0.017 39.3)",
		700: "oklch(36.7% 0.016 35.7)",
		800: "oklch(26.8% 0.011 36.5)",
		900: "oklch(21.4% 0.009 43.1)",
		950: "oklch(14.7% 0.004 49.3)"
	},
	red: {
		50: "oklch(97.1% 0.013 17.38)",
		100: "oklch(93.6% 0.032 17.717)",
		200: "oklch(88.5% 0.062 18.334)",
		300: "oklch(80.8% 0.114 19.571)",
		400: "oklch(70.4% 0.191 22.216)",
		500: "oklch(63.7% 0.237 25.331)",
		600: "oklch(57.7% 0.245 27.325)",
		700: "oklch(50.5% 0.213 27.518)",
		800: "oklch(44.4% 0.177 26.899)",
		900: "oklch(39.6% 0.141 25.723)",
		950: "oklch(25.8% 0.092 26.042)"
	},
	orange: {
		50: "oklch(98% 0.016 73.684)",
		100: "oklch(95.4% 0.038 75.164)",
		200: "oklch(90.1% 0.076 70.697)",
		300: "oklch(83.7% 0.128 66.29)",
		400: "oklch(75% 0.183 55.934)",
		500: "oklch(70.5% 0.213 47.604)",
		600: "oklch(64.6% 0.222 41.116)",
		700: "oklch(55.3% 0.195 38.402)",
		800: "oklch(47% 0.157 37.304)",
		900: "oklch(40.8% 0.123 38.172)",
		950: "oklch(26.6% 0.079 36.259)"
	},
	amber: {
		50: "oklch(98.7% 0.022 95.277)",
		100: "oklch(96.2% 0.059 95.617)",
		200: "oklch(92.4% 0.12 95.746)",
		300: "oklch(87.9% 0.169 91.605)",
		400: "oklch(82.8% 0.189 84.429)",
		500: "oklch(76.9% 0.188 70.08)",
		600: "oklch(66.6% 0.179 58.318)",
		700: "oklch(55.5% 0.163 48.998)",
		800: "oklch(47.3% 0.137 46.201)",
		900: "oklch(41.4% 0.112 45.904)",
		950: "oklch(27.9% 0.077 45.635)"
	},
	yellow: {
		50: "oklch(98.7% 0.026 102.212)",
		100: "oklch(97.3% 0.071 103.193)",
		200: "oklch(94.5% 0.129 101.54)",
		300: "oklch(90.5% 0.182 98.111)",
		400: "oklch(85.2% 0.199 91.936)",
		500: "oklch(79.5% 0.184 86.047)",
		600: "oklch(68.1% 0.162 75.834)",
		700: "oklch(55.4% 0.135 66.442)",
		800: "oklch(47.6% 0.114 61.907)",
		900: "oklch(42.1% 0.095 57.708)",
		950: "oklch(28.6% 0.066 53.813)"
	},
	lime: {
		50: "oklch(98.6% 0.031 120.757)",
		100: "oklch(96.7% 0.067 122.328)",
		200: "oklch(93.8% 0.127 124.321)",
		300: "oklch(89.7% 0.196 126.665)",
		400: "oklch(84.1% 0.238 128.85)",
		500: "oklch(76.8% 0.233 130.85)",
		600: "oklch(64.8% 0.2 131.684)",
		700: "oklch(53.2% 0.157 131.589)",
		800: "oklch(45.3% 0.124 130.933)",
		900: "oklch(40.5% 0.101 131.063)",
		950: "oklch(27.4% 0.072 132.109)"
	},
	green: {
		50: "oklch(98.2% 0.018 155.826)",
		100: "oklch(96.2% 0.044 156.743)",
		200: "oklch(92.5% 0.084 155.995)",
		300: "oklch(87.1% 0.15 154.449)",
		400: "oklch(79.2% 0.209 151.711)",
		500: "oklch(72.3% 0.219 149.579)",
		600: "oklch(62.7% 0.194 149.214)",
		700: "oklch(52.7% 0.154 150.069)",
		800: "oklch(44.8% 0.119 151.328)",
		900: "oklch(39.3% 0.095 152.535)",
		950: "oklch(26.6% 0.065 152.934)"
	},
	emerald: {
		50: "oklch(97.9% 0.021 166.113)",
		100: "oklch(95% 0.052 163.051)",
		200: "oklch(90.5% 0.093 164.15)",
		300: "oklch(84.5% 0.143 164.978)",
		400: "oklch(76.5% 0.177 163.223)",
		500: "oklch(69.6% 0.17 162.48)",
		600: "oklch(59.6% 0.145 163.225)",
		700: "oklch(50.8% 0.118 165.612)",
		800: "oklch(43.2% 0.095 166.913)",
		900: "oklch(37.8% 0.077 168.94)",
		950: "oklch(26.2% 0.051 172.552)"
	},
	teal: {
		50: "oklch(98.4% 0.014 180.72)",
		100: "oklch(95.3% 0.051 180.801)",
		200: "oklch(91% 0.096 180.426)",
		300: "oklch(85.5% 0.138 181.071)",
		400: "oklch(77.7% 0.152 181.912)",
		500: "oklch(70.4% 0.14 182.503)",
		600: "oklch(60% 0.118 184.704)",
		700: "oklch(51.1% 0.096 186.391)",
		800: "oklch(43.7% 0.078 188.216)",
		900: "oklch(38.6% 0.063 188.416)",
		950: "oklch(27.7% 0.046 192.524)"
	},
	cyan: {
		50: "oklch(98.4% 0.019 200.873)",
		100: "oklch(95.6% 0.045 203.388)",
		200: "oklch(91.7% 0.08 205.041)",
		300: "oklch(86.5% 0.127 207.078)",
		400: "oklch(78.9% 0.154 211.53)",
		500: "oklch(71.5% 0.143 215.221)",
		600: "oklch(60.9% 0.126 221.723)",
		700: "oklch(52% 0.105 223.128)",
		800: "oklch(45% 0.085 224.283)",
		900: "oklch(39.8% 0.07 227.392)",
		950: "oklch(30.2% 0.056 229.695)"
	},
	sky: {
		50: "oklch(97.7% 0.013 236.62)",
		100: "oklch(95.1% 0.026 236.824)",
		200: "oklch(90.1% 0.058 230.902)",
		300: "oklch(82.8% 0.111 230.318)",
		400: "oklch(74.6% 0.16 232.661)",
		500: "oklch(68.5% 0.169 237.323)",
		600: "oklch(58.8% 0.158 241.966)",
		700: "oklch(50% 0.134 242.749)",
		800: "oklch(44.3% 0.11 240.79)",
		900: "oklch(39.1% 0.09 240.876)",
		950: "oklch(29.3% 0.066 243.157)"
	},
	blue: {
		50: "oklch(97% 0.014 254.604)",
		100: "oklch(93.2% 0.032 255.585)",
		200: "oklch(88.2% 0.059 254.128)",
		300: "oklch(80.9% 0.105 251.813)",
		400: "oklch(70.7% 0.165 254.624)",
		500: "oklch(62.3% 0.214 259.815)",
		600: "oklch(54.6% 0.245 262.881)",
		700: "oklch(48.8% 0.243 264.376)",
		800: "oklch(42.4% 0.199 265.638)",
		900: "oklch(37.9% 0.146 265.522)",
		950: "oklch(28.2% 0.091 267.935)"
	},
	indigo: {
		50: "oklch(96.2% 0.018 272.314)",
		100: "oklch(93% 0.034 272.788)",
		200: "oklch(87% 0.065 274.039)",
		300: "oklch(78.5% 0.115 274.713)",
		400: "oklch(67.3% 0.182 276.935)",
		500: "oklch(58.5% 0.233 277.117)",
		600: "oklch(51.1% 0.262 276.966)",
		700: "oklch(45.7% 0.24 277.023)",
		800: "oklch(39.8% 0.195 277.366)",
		900: "oklch(35.9% 0.144 278.697)",
		950: "oklch(25.7% 0.09 281.288)"
	},
	violet: {
		50: "oklch(96.9% 0.016 293.756)",
		100: "oklch(94.3% 0.029 294.588)",
		200: "oklch(89.4% 0.057 293.283)",
		300: "oklch(81.1% 0.111 293.571)",
		400: "oklch(70.2% 0.183 293.541)",
		500: "oklch(60.6% 0.25 292.717)",
		600: "oklch(54.1% 0.281 293.009)",
		700: "oklch(49.1% 0.27 292.581)",
		800: "oklch(43.2% 0.232 292.759)",
		900: "oklch(38% 0.189 293.745)",
		950: "oklch(28.3% 0.141 291.089)"
	},
	purple: {
		50: "oklch(97.7% 0.014 308.299)",
		100: "oklch(94.6% 0.033 307.174)",
		200: "oklch(90.2% 0.063 306.703)",
		300: "oklch(82.7% 0.119 306.383)",
		400: "oklch(71.4% 0.203 305.504)",
		500: "oklch(62.7% 0.265 303.9)",
		600: "oklch(55.8% 0.288 302.321)",
		700: "oklch(49.6% 0.265 301.924)",
		800: "oklch(43.8% 0.218 303.724)",
		900: "oklch(38.1% 0.176 304.987)",
		950: "oklch(29.1% 0.149 302.717)"
	},
	fuchsia: {
		50: "oklch(97.7% 0.017 320.058)",
		100: "oklch(95.2% 0.037 318.852)",
		200: "oklch(90.3% 0.076 319.62)",
		300: "oklch(83.3% 0.145 321.434)",
		400: "oklch(74% 0.238 322.16)",
		500: "oklch(66.7% 0.295 322.15)",
		600: "oklch(59.1% 0.293 322.896)",
		700: "oklch(51.8% 0.253 323.949)",
		800: "oklch(45.2% 0.211 324.591)",
		900: "oklch(40.1% 0.17 325.612)",
		950: "oklch(29.3% 0.136 325.661)"
	},
	pink: {
		50: "oklch(97.1% 0.014 343.198)",
		100: "oklch(94.8% 0.028 342.258)",
		200: "oklch(89.9% 0.061 343.231)",
		300: "oklch(82.3% 0.12 346.018)",
		400: "oklch(71.8% 0.202 349.761)",
		500: "oklch(65.6% 0.241 354.308)",
		600: "oklch(59.2% 0.249 0.584)",
		700: "oklch(52.5% 0.223 3.958)",
		800: "oklch(45.9% 0.187 3.815)",
		900: "oklch(40.8% 0.153 2.432)",
		950: "oklch(28.4% 0.109 3.907)"
	},
	rose: {
		50: "oklch(96.9% 0.015 12.422)",
		100: "oklch(94.1% 0.03 12.58)",
		200: "oklch(89.2% 0.058 10.001)",
		300: "oklch(81% 0.117 11.638)",
		400: "oklch(71.2% 0.194 13.428)",
		500: "oklch(64.5% 0.246 16.439)",
		600: "oklch(58.6% 0.253 17.585)",
		700: "oklch(51.4% 0.222 16.935)",
		800: "oklch(45.5% 0.188 13.697)",
		900: "oklch(41% 0.159 10.272)",
		950: "oklch(27.1% 0.105 12.094)"
	},
	light: {
		50: "oklch(99.4% 0 0)",
		100: "oklch(99.11% 0 0)",
		200: "oklch(98.51% 0 0)",
		300: "oklch(98.16% 0.0017 247.84)",
		400: "oklch(97.31% 0 0)",
		500: "oklch(96.12% 0 0)",
		600: "oklch(96.32% 0.0034 247.86)",
		700: "oklch(94.17% 0.0052 247.88)",
		800: "oklch(91.09% 0.007 247.9)",
		900: "oklch(90.72% 0.0051 228.82)",
		950: "oklch(89.23% 0.006 239.83)"
	},
	dark: {
		50: "oklch(40.91% 0 0)",
		100: "oklch(35.62% 0 0)",
		200: "oklch(31.71% 0 0)",
		300: "oklch(29.72% 0 0)",
		400: "oklch(25.2% 0 0)",
		500: "oklch(23.93% 0 0)",
		600: "oklch(22.73% 0.0038 286.09)",
		700: "oklch(22.21% 0 0)",
		800: "oklch(20.9% 0 0)",
		900: "oklch(16.84% 0 0)",
		950: "oklch(13.44% 0 0)"
	}
};
Object.values(colors).forEach((color) => {
	if (typeof color !== "string" && color !== void 0) color.DEFAULT = color.DEFAULT || color[400];
});
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/theme.mjs
var animation = {
	keyframes: {
		"pulse": "{0%, 100% {opacity:1} 50% {opacity:.5}}",
		"bounce": "{0%, 100% {transform:translateY(-25%);animation-timing-function:cubic-bezier(0.8,0,1,1)} 50% {transform:translateY(0);animation-timing-function:cubic-bezier(0,0,0.2,1)}}",
		"spin": "{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
		"ping": "{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}",
		"bounce-alt": "{from,20%,53%,80%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);transform:translate3d(0,0,0)}40%,43%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-30px,0)}70%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}",
		"flash": "{from,50%,to{opacity:1}25%,75%{opacity:0}}",
		"pulse-alt": "{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scale3d(1,1,1)}}",
		"rubber-band": "{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,0.75,1)}40%{transform:scale3d(0.75,1.25,1)}50%{transform:scale3d(1.15,0.85,1)}65%{transform:scale3d(0.95,1.05,1)}75%{transform:scale3d(1.05,0.95,1)}to{transform:scale3d(1,1,1)}}",
		"shake-x": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}",
		"shake-y": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(0,-10px,0)}20%,40%,60%,80%{transform:translate3d(0,10px,0)}}",
		"head-shake": "{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}",
		"swing": "{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}",
		"tada": "{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}",
		"wobble": "{from{transform:translate3d(0,0,0)}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:translate3d(0,0,0)}}",
		"jello": "{from,11.1%,to{transform:translate3d(0,0,0)}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg)skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}",
		"heart-beat": "{0%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}",
		"hinge": "{0%{transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{transform:rotate3d(0,0,1,80deg);transform-origin:top left;animation-timing-function:ease-in-out}40%,80%{transform:rotate3d(0,0,1,60deg);transform-origin:top left;animation-timing-function:ease-in-out}to{transform:translate3d(0,700px,0);opacity:0}}",
		"jack-in-the-box": "{from{opacity:0;transform-origin:center bottom;transform:scale(0.1) rotate(30deg)}50%{transform:rotate(-10deg)}70%{transform:rotate(3deg)}to{transform:scale(1)}}",
		"light-speed-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
		"light-speed-in-right": "{from{opacity:0;transform:translate3d(100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
		"light-speed-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0) skewX(30deg)}}",
		"light-speed-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) skewX(30deg)}}",
		"flip": "{from{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);animation-timing-function:ease-out}40%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);animation-timing-function:ease-out}50%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);animation-timing-function:ease-in}80%{transform:perspective(400px) scale3d(0.95,0.95,0.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}to{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}}",
		"flip-in-x": "{from{transform:perspective(400px) rotate3d(1,0,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}",
		"flip-in-y": "{from{transform:perspective(400px) rotate3d(0,1,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}",
		"flip-out-x": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}",
		"flip-out-y": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}",
		"rotate-in": "{from{transform-origin:center;transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform-origin:center;transform:translate3d(0,0,0);opacity:1}}",
		"rotate-in-down-left": "{from{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:left bottom;transform:translate3d(0,0,0);opacity:1}}",
		"rotate-in-down-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
		"rotate-in-up-left": "{from{transform-origin:left top;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:left top;transform:translate3d(0,0,0);opacity:1}}",
		"rotate-in-up-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,-90deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
		"rotate-out": "{from{transform-origin:center;opacity:1}to{transform-origin:center;transform:rotate3d(0,0,1,200deg);opacity:0}}",
		"rotate-out-down-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}}",
		"rotate-out-down-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
		"rotate-out-up-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
		"rotate-out-up-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,90deg);opacity:0}}",
		"roll-in": "{from{opacity:0;transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"roll-out": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}",
		"zoom-in": "{from{opacity:0;transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}",
		"zoom-in-down": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
		"zoom-in-left": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
		"zoom-in-right": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
		"zoom-in-up": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
		"zoom-out": "{from{opacity:1}50%{opacity:0;transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}",
		"zoom-out-down": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
		"zoom-out-left": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(-2000px,0,0);transform-origin:left center}}",
		"zoom-out-right": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(2000px,0,0);transform-origin:right center}}",
		"zoom-out-up": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
		"bounce-in": "{from,20%,40%,60%,80%,to{animation-timing-function:ease-in-out}0%{opacity:0;transform:scale3d(0.3,0.3,0.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(0.9,0.9,0.9)}60%{transform:scale3d(1.03,1.03,1.03);opacity:1}80%{transform:scale3d(0.97,0.97,0.97)}to{opacity:1;transform:scale3d(1,1,1)}}",
		"bounce-in-down": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translate3d(0,0,0)}}",
		"bounce-in-left": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}",
		"bounce-in-right": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}",
		"bounce-in-up": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}",
		"bounce-out": "{20%{transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(0.3,0.3,0.3)}}",
		"bounce-out-down": "{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}",
		"bounce-out-left": "{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
		"bounce-out-right": "{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}",
		"bounce-out-up": "{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
		"slide-in-down": "{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
		"slide-in-left": "{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
		"slide-in-right": "{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
		"slide-in-up": "{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
		"slide-out-down": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}",
		"slide-out-left": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}",
		"slide-out-right": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}",
		"slide-out-up": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}",
		"fade-in": "{from{opacity:0}to{opacity:1}}",
		"fade-in-down": "{from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-down-big": "{from{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-left-big": "{from{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-right": "{from{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-right-big": "{from{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-up": "{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-up-big": "{from{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-top-left": "{from{opacity:0;transform:translate3d(-100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-top-right": "{from{opacity:0;transform:translate3d(100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-bottom-left": "{from{opacity:0;transform:translate3d(-100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-in-bottom-right": "{from{opacity:0;transform:translate3d(100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
		"fade-out": "{from{opacity:1}to{opacity:0}}",
		"fade-out-down": "{from{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}",
		"fade-out-down-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}",
		"fade-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}",
		"fade-out-left-big": "{from{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
		"fade-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}",
		"fade-out-right-big": "{from{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}",
		"fade-out-up": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}",
		"fade-out-up-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
		"fade-out-top-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,-100%,0)}}",
		"fade-out-top-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,-100%,0)}}",
		"fade-out-bottom-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,100%,0)}}",
		"fade-out-bottom-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,100%,0)}}",
		"back-in-up": "{0%{opacity:0.7;transform:translateY(1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
		"back-in-down": "{0%{opacity:0.7;transform:translateY(-1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
		"back-in-right": "{0%{opacity:0.7;transform:translateX(2000px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
		"back-in-left": "{0%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}80%{opacity:0.7;transform:translateX(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
		"back-out-up": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}",
		"back-out-down": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(700px) scale(0.7)}}",
		"back-out-right": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateX(2000px) scale(0.7)}}",
		"back-out-left": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}"
	},
	durations: {
		"pulse": "2s",
		"heart-beat": "1.3s",
		"bounce-in": "0.75s",
		"bounce-out": "0.75s",
		"flip-out-x": "0.75s",
		"flip-out-y": "0.75s",
		"hinge": "2s"
	},
	timingFns: {
		"pulse": "cubic-bezier(0.4,0,.6,1)",
		"ping": "cubic-bezier(0,0,.2,1)",
		"head-shake": "ease-in-out",
		"heart-beat": "ease-in-out",
		"pulse-alt": "ease-in-out",
		"light-speed-in-left": "ease-out",
		"light-speed-in-right": "ease-out",
		"light-speed-out-left": "ease-in",
		"light-speed-out-right": "ease-in"
	},
	properties: {
		"bounce-alt": { "transform-origin": "center bottom" },
		"jello": { "transform-origin": "center" },
		"swing": { "transform-origin": "top center" },
		"flip": { "backface-visibility": "visible" },
		"flip-in-x": { "backface-visibility": "visible !important" },
		"flip-in-y": { "backface-visibility": "visible !important" },
		"flip-out-x": { "backface-visibility": "visible !important" },
		"flip-out-y": { "backface-visibility": "visible !important" },
		"rotate-in": { "transform-origin": "center" },
		"rotate-in-down-left": { "transform-origin": "left bottom" },
		"rotate-in-down-right": { "transform-origin": "right bottom" },
		"rotate-in-up-left": { "transform-origin": "left bottom" },
		"rotate-in-up-right": { "transform-origin": "right bottom" },
		"rotate-out": { "transform-origin": "center" },
		"rotate-out-down-left": { "transform-origin": "left bottom" },
		"rotate-out-down-right": { "transform-origin": "right bottom" },
		"rotate-out-up-left": { "transform-origin": "left bottom" },
		"rotate-out-up-right": { "transform-origin": "right bottom" },
		"hinge": { "transform-origin": "top left" },
		"zoom-out-down": { "transform-origin": "center bottom" },
		"zoom-out-left": { "transform-origin": "left center" },
		"zoom-out-right": { "transform-origin": "right center" },
		"zoom-out-up": { "transform-origin": "center bottom" }
	},
	counts: {
		"spin": "infinite",
		"ping": "infinite",
		"pulse": "infinite",
		"pulse-alt": "infinite",
		"bounce": "infinite",
		"bounce-alt": "infinite"
	},
	category: {
		"pulse": "Attention Seekers",
		"bounce": "Attention Seekers",
		"spin": "Attention Seekers",
		"ping": "Attention Seekers",
		"bounce-alt": "Attention Seekers",
		"flash": "Attention Seekers",
		"pulse-alt": "Attention Seekers",
		"rubber-band": "Attention Seekers",
		"shake-x": "Attention Seekers",
		"shake-y": "Attention Seekers",
		"head-shake": "Attention Seekers",
		"swing": "Attention Seekers",
		"tada": "Attention Seekers",
		"wobble": "Attention Seekers",
		"jello": "Attention Seekers",
		"heart-beat": "Attention Seekers",
		"hinge": "Specials",
		"jack-in-the-box": "Specials",
		"light-speed-in-left": "Lightspeed",
		"light-speed-in-right": "Lightspeed",
		"light-speed-out-left": "Lightspeed",
		"light-speed-out-right": "Lightspeed",
		"flip": "Flippers",
		"flip-in-x": "Flippers",
		"flip-in-y": "Flippers",
		"flip-out-x": "Flippers",
		"flip-out-y": "Flippers",
		"rotate-in": "Rotating Entrances",
		"rotate-in-down-left": "Rotating Entrances",
		"rotate-in-down-right": "Rotating Entrances",
		"rotate-in-up-left": "Rotating Entrances",
		"rotate-in-up-right": "Rotating Entrances",
		"rotate-out": "Rotating Exits",
		"rotate-out-down-left": "Rotating Exits",
		"rotate-out-down-right": "Rotating Exits",
		"rotate-out-up-left": "Rotating Exits",
		"rotate-out-up-right": "Rotating Exits",
		"roll-in": "Specials",
		"roll-out": "Specials",
		"zoom-in": "Zooming Entrances",
		"zoom-in-down": "Zooming Entrances",
		"zoom-in-left": "Zooming Entrances",
		"zoom-in-right": "Zooming Entrances",
		"zoom-in-up": "Zooming Entrances",
		"zoom-out": "Zooming Exits",
		"zoom-out-down": "Zooming Exits",
		"zoom-out-left": "Zooming Exits",
		"zoom-out-right": "Zooming Exits",
		"zoom-out-up": "Zooming Exits",
		"bounce-in": "Bouncing Entrances",
		"bounce-in-down": "Bouncing Entrances",
		"bounce-in-left": "Bouncing Entrances",
		"bounce-in-right": "Bouncing Entrances",
		"bounce-in-up": "Bouncing Entrances",
		"bounce-out": "Bouncing Exits",
		"bounce-out-down": "Bouncing Exits",
		"bounce-out-left": "Bouncing Exits",
		"bounce-out-right": "Bouncing Exits",
		"bounce-out-up": "Bouncing Exits",
		"slide-in-down": "Sliding Entrances",
		"slide-in-left": "Sliding Entrances",
		"slide-in-right": "Sliding Entrances",
		"slide-in-up": "Sliding Entrances",
		"slide-out-down": "Sliding Exits",
		"slide-out-left": "Sliding Exits",
		"slide-out-right": "Sliding Exits",
		"slide-out-up": "Sliding Exits",
		"fade-in": "Fading Entrances",
		"fade-in-down": "Fading Entrances",
		"fade-in-down-big": "Fading Entrances",
		"fade-in-left": "Fading Entrances",
		"fade-in-left-big": "Fading Entrances",
		"fade-in-right": "Fading Entrances",
		"fade-in-right-big": "Fading Entrances",
		"fade-in-up": "Fading Entrances",
		"fade-in-up-big": "Fading Entrances",
		"fade-in-top-left": "Fading Entrances",
		"fade-in-top-right": "Fading Entrances",
		"fade-in-bottom-left": "Fading Entrances",
		"fade-in-bottom-right": "Fading Entrances",
		"fade-out": "Fading Exits",
		"fade-out-down": "Fading Exits",
		"fade-out-down-big": "Fading Exits",
		"fade-out-left": "Fading Exits",
		"fade-out-left-big": "Fading Exits",
		"fade-out-right": "Fading Exits",
		"fade-out-right-big": "Fading Exits",
		"fade-out-up": "Fading Exits",
		"fade-out-up-big": "Fading Exits",
		"fade-out-top-left": "Fading Exits",
		"fade-out-top-right": "Fading Exits",
		"fade-out-bottom-left": "Fading Exits",
		"fade-out-bottom-right": "Fading Exits",
		"back-in-up": "Back Entrances",
		"back-in-down": "Back Entrances",
		"back-in-right": "Back Entrances",
		"back-in-left": "Back Entrances",
		"back-out-up": "Back Exits",
		"back-out-down": "Back Exits",
		"back-out-right": "Back Exits",
		"back-out-left": "Back Exits"
	}
};
var aria = {
	busy: "busy=\"true\"",
	checked: "checked=\"true\"",
	disabled: "disabled=\"true\"",
	expanded: "expanded=\"true\"",
	hidden: "hidden=\"true\"",
	pressed: "pressed=\"true\"",
	readonly: "readonly=\"true\"",
	required: "required=\"true\"",
	selected: "selected=\"true\""
};
var blur = {
	"DEFAULT": "8px",
	"xs": "4px",
	"sm": "8px",
	"md": "12px",
	"lg": "16px",
	"xl": "24px",
	"2xl": "40px",
	"3xl": "64px"
};
var font = {
	sans: [
		"ui-sans-serif",
		"system-ui",
		"-apple-system",
		"BlinkMacSystemFont",
		"\"Segoe UI\"",
		"Roboto",
		"\"Helvetica Neue\"",
		"Arial",
		"\"Noto Sans\"",
		"sans-serif",
		"\"Apple Color Emoji\"",
		"\"Segoe UI Emoji\"",
		"\"Segoe UI Symbol\"",
		"\"Noto Color Emoji\""
	].join(","),
	serif: [
		"ui-serif",
		"Georgia",
		"Cambria",
		"\"Times New Roman\"",
		"Times",
		"serif"
	].join(","),
	mono: [
		"ui-monospace",
		"SFMono-Regular",
		"Menlo",
		"Monaco",
		"Consolas",
		"\"Liberation Mono\"",
		"\"Courier New\"",
		"monospace"
	].join(",")
};
var text = {
	"xs": {
		fontSize: "0.75rem",
		lineHeight: "1rem"
	},
	"sm": {
		fontSize: "0.875rem",
		lineHeight: "1.25rem"
	},
	"base": {
		fontSize: "1rem",
		lineHeight: "1.5rem"
	},
	"lg": {
		fontSize: "1.125rem",
		lineHeight: "1.75rem"
	},
	"xl": {
		fontSize: "1.25rem",
		lineHeight: "1.75rem"
	},
	"2xl": {
		fontSize: "1.5rem",
		lineHeight: "2rem"
	},
	"3xl": {
		fontSize: "1.875rem",
		lineHeight: "2.25rem"
	},
	"4xl": {
		fontSize: "2.25rem",
		lineHeight: "2.5rem"
	},
	"5xl": {
		fontSize: "3rem",
		lineHeight: "1"
	},
	"6xl": {
		fontSize: "3.75rem",
		lineHeight: "1"
	},
	"7xl": {
		fontSize: "4.5rem",
		lineHeight: "1"
	},
	"8xl": {
		fontSize: "6rem",
		lineHeight: "1"
	},
	"9xl": {
		fontSize: "8rem",
		lineHeight: "1"
	}
};
var fontWeight = {
	thin: "100",
	extralight: "200",
	light: "300",
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	extrabold: "800",
	black: "900"
};
var tracking = {
	tighter: "-0.05em",
	tight: "-0.025em",
	normal: "0em",
	wide: "0.025em",
	wider: "0.05em",
	widest: "0.1em"
};
var leading = {
	none: "1",
	tight: "1.25",
	snug: "1.375",
	normal: "1.5",
	relaxed: "1.625",
	loose: "2"
};
var textStrokeWidth = {
	DEFAULT: "1.5rem",
	none: "0",
	sm: "thin",
	md: "medium",
	lg: "thick"
};
var media = {
	portrait: "(orientation: portrait)",
	landscape: "(orientation: landscape)",
	os_dark: "(prefers-color-scheme: dark)",
	os_light: "(prefers-color-scheme: light)",
	motion_ok: "(prefers-reduced-motion: no-preference)",
	motion_not_ok: "(prefers-reduced-motion: reduce)",
	high_contrast: "(prefers-contrast: high)",
	low_contrast: "(prefers-contrast: low)",
	opacity_ok: "(prefers-reduced-transparency: no-preference)",
	opacity_not_ok: "(prefers-reduced-transparency: reduce)",
	use_data_ok: "(prefers-reduced-data: no-preference)",
	use_data_not_ok: "(prefers-reduced-data: reduce)",
	touch: "(hover: none) and (pointer: coarse)",
	stylus: "(hover: none) and (pointer: fine)",
	pointer: "(hover) and (pointer: coarse)",
	mouse: "(hover) and (pointer: fine)",
	hd_color: "(dynamic-range: high)"
};
var spacing = {
	"DEFAULT": "0.25rem",
	"xs": "0.75rem",
	"sm": "0.875rem",
	"lg": "1.125rem",
	"xl": "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
	"5xl": "3rem",
	"6xl": "3.75rem",
	"7xl": "4.5rem",
	"8xl": "6rem",
	"9xl": "8rem"
};
var radius = {
	"DEFAULT": "0.25rem",
	"none": "0",
	"xs": "0.125rem",
	"sm": "0.25rem",
	"md": "0.375rem",
	"lg": "0.5rem",
	"xl": "0.75rem",
	"2xl": "1rem",
	"3xl": "1.5rem",
	"4xl": "2rem"
};
var shadow = {
	"DEFAULT": [`0 1px 3px 0 rgb(0 0 0 / 0.1)`, `0 1px 2px -1px rgb(0 0 0 / 0.1)`],
	"2xs": `0 1px rgb(0 0 0 / 0.05)`,
	"xs": `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
	"sm": [`0 1px 3px 0 rgb(0 0 0 / 0.1)`, `0 1px 2px -1px rgb(0 0 0 / 0.1)`],
	"md": [`0 4px 6px -1px rgb(0 0 0 / 0.1)`, `0 2px 4px -2px rgb(0 0 0 / 0.1)`],
	"lg": [`0 10px 15px -3px rgb(0 0 0 / 0.1)`, `0 4px 6px -4px rgb(0 0 0 / 0.1)`],
	"xl": [`0 20px 25px -5px rgb(0 0 0 / 0.1)`, `0 8px 10px -6px rgb(0 0 0 / 0.1)`],
	"2xl": `0 25px 50px -12px rgb(0 0 0 / 0.25)`,
	"none": "0 0 rgb(0 0 0 / 0)",
	"inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
};
var insetShadow = {
	"2xs": "inset 0 1px rgb(0 0 0 / 0.05)",
	"xs": "inset 0 1px 1px rgb(0 0 0 / 0.05)",
	"sm": "inset 0 2px 4px rgb(0 0 0 / 0.05)",
	"none": "0 0 rgb(0 0 0 / 0)"
};
var dropShadow = {
	"DEFAULT": ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
	"xs": "0 1px 1px rgb(0 0 0 / 0.05)",
	"sm": "0 1px 2px rgb(0 0 0 / 0.15)",
	"md": "0 3px 3px rgb(0 0 0 / 0.12)",
	"lg": "0 4px 4px rgb(0 0 0 / 0.15)",
	"xl": "0 9px 7px rgb(0 0 0 / 0.1)",
	"2xl": "0 25px 25px rgb(0 0 0 / 0.15)"
};
var textShadow = {
	"none": "0 0 rgb(0 0 0 / 0)",
	"2xs": "0 1px 0 rgb(0 0 0 / 0.15)",
	"xs": "0 1px 1px rgb(0 0 0 / 0.2)",
	"sm": [
		"0 1px 0 rgb(0 0 0 / 0.075)",
		"0 1px 1px rgb(0 0 0 / 0.075)",
		"0 2px 2px rgb(0 0 0 / 0.075)"
	],
	"md": [
		"0 1px 1px rgb(0 0 0 / 0.1)",
		"0 1px 2px rgb(0 0 0 / 0.1)",
		"0 2px 4px rgb(0 0 0 / 0.1)"
	],
	"lg": [
		"0 1px 2px rgb(0 0 0 / 0.1)",
		"0 3px 2px rgb(0 0 0 / 0.1)",
		"0 4px 8px rgb(0 0 0 / 0.1)"
	]
};
var perspective = {
	dramatic: "100px",
	near: "300px",
	normal: "500px",
	midrange: "800px",
	distant: "1200px"
};
/** For reset css */
var defaults = {
	transition: {
		duration: "150ms",
		timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
	},
	font: {
		family: "var(--font-sans)",
		featureSettings: "var(--font-sans--font-feature-settings)",
		variationSettings: "var(--font-sans--font-variation-settings)"
	},
	monoFont: {
		family: "var(--font-mono)",
		featureSettings: "var(--font-mono--font-feature-settings)",
		variationSettings: "var(--font-mono--font-variation-settings)"
	}
};
var container = {
	"3xs": "16rem",
	"2xs": "18rem",
	"xs": "20rem",
	"sm": "24rem",
	"md": "28rem",
	"lg": "32rem",
	"xl": "36rem",
	"2xl": "42rem",
	"3xl": "48rem",
	"4xl": "56rem",
	"5xl": "64rem",
	"6xl": "72rem",
	"7xl": "80rem",
	"prose": "65ch"
};
var breakpoint = {
	"sm": "40rem",
	"md": "48rem",
	"lg": "64rem",
	"xl": "80rem",
	"2xl": "96rem"
};
var verticalBreakpoint = { ...breakpoint };
var supports = { grid: "(display: grid)" };
var theme = {
	font,
	colors,
	spacing,
	breakpoint,
	verticalBreakpoint,
	text,
	fontWeight,
	tracking,
	leading,
	textStrokeWidth,
	radius,
	shadow,
	insetShadow,
	dropShadow,
	textShadow,
	ease: {
		"linear": "linear",
		"in": "cubic-bezier(0.4, 0, 1, 1)",
		"out": "cubic-bezier(0, 0, 0.2, 1)",
		"in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
		"DEFAULT": "cubic-bezier(0.4, 0, 0.2, 1)"
	},
	animation,
	blur,
	perspective,
	property: {
		none: "none",
		all: "all",
		colors: [
			"color",
			"background-color",
			"border-color",
			"text-decoration-color",
			"fill",
			"stroke",
			"--un-gradient-from",
			"--un-gradient-via",
			"--un-gradient-to"
		].join(","),
		opacity: "opacity",
		shadow: "box-shadow",
		transform: [
			"transform",
			"translate",
			"scale",
			"rotate"
		].join(","),
		get DEFAULT() {
			return [
				this.colors,
				this.opacity,
				this.shadow,
				this.transform,
				"filter",
				"-webkit-backdrop-filter",
				"backdrop-filter"
			].join(",");
		}
	},
	default: defaults,
	container,
	aria,
	media,
	supports
};
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/variants-Dae_1bdw.mjs
var variantAria = {
	name: "aria",
	match(matcher, ctx) {
		const variant = variantGetParameter("aria-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const aria = h.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
			if (aria) return {
				matcher: rest,
				selector: (s) => `${s}[aria-${aria}]`
			};
		}
	},
	multiPass: true,
	autocomplete: "aria-$aria"
};
function taggedAria(tagName) {
	return {
		name: `${tagName}-aria`,
		match(matcher, ctx) {
			const variant = variantGetParameter(`${tagName}-aria-`, matcher, ctx.generator.config.separators);
			if (variant) {
				const [match, rest, label] = variant;
				const ariaAttribute = h.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
				if (ariaAttribute) {
					const tagSelectorMap = {
						group: `&:is(:where(.group${label ? `\\/${label}` : ""})[aria-${ariaAttribute}] *)`,
						peer: `&:is(:where(.peer${label ? `\\/${label}` : ""})[aria-${ariaAttribute}] ~ *)`,
						previous: `:where(*[aria-${ariaAttribute}] + &)`,
						parent: `:where(*[aria-${ariaAttribute}] > &)`,
						has: `&:has(*[aria-${ariaAttribute}])`,
						in: `:where(*[aria-${ariaAttribute}]) &`
					};
					return {
						matcher: rest,
						handle: (input, next) => next({
							...input,
							parent: `${input.parent ? `${input.parent} $$ ` : ""}${input.selector}`,
							selector: tagSelectorMap[tagName]
						})
					};
				}
			}
		},
		multiPass: true
	};
}
var variantTaggedAriaAttributes = [
	taggedAria("group"),
	taggedAria("peer"),
	taggedAria("parent"),
	taggedAria("previous"),
	taggedAria("has"),
	taggedAria("in")
];
var sizePseudo = /(max|min)-\[([^\]]*)\]:/;
function variantBreakpoints() {
	const regexCache = {};
	return {
		name: "breakpoints",
		match(matcher, context) {
			if (sizePseudo.test(matcher)) {
				const match = matcher.match(sizePseudo);
				return {
					matcher: matcher.replace(match[0], ""),
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (${match[1]}-width: ${match[2]})`
					})
				};
			}
			const variantEntries = (resolveBreakpoints(context) ?? []).map(({ point, size }, idx) => [
				point,
				size,
				idx
			]);
			for (const [point, size, idx] of variantEntries) {
				if (!regexCache[point]) regexCache[point] = /* @__PURE__ */ new RegExp(`^((?:([al]t-|[<~]|max-))?${point}(?:${context.generator.config.separators.join("|")}))`);
				const match = matcher.match(regexCache[point]);
				if (!match) continue;
				const [, pre] = match;
				const m = matcher.slice(pre.length);
				if (m === "container") continue;
				const isLtPrefix = pre.startsWith("lt-") || pre.startsWith("<") || pre.startsWith("max-");
				const isAtPrefix = pre.startsWith("at-") || pre.startsWith("~");
				let order = 3e3;
				if (isLtPrefix) {
					order -= idx + 1;
					return {
						matcher: m,
						handle: (input, next) => next({
							...input,
							parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (max-width: ${calcMaxWidthBySize(size)})`,
							parentOrder: order
						})
					};
				}
				order += idx + 1;
				if (isAtPrefix && idx < variantEntries.length - 1) return {
					matcher: m,
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size}) and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})`,
						parentOrder: order
					})
				};
				return {
					matcher: m,
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size})`,
						parentOrder: order
					})
				};
			}
		},
		multiPass: true,
		autocomplete: "(at-|lt-|max-|)$breakpoint:"
	};
}
var variantChildren = [variantMatcher("*", (input) => ({ selector: `${input.selector} > *` }), { order: -1 }), variantMatcher("**", (input) => ({ selector: `${input.selector} *` }), { order: -1 })];
function scopeMatcher(name, combinator) {
	return {
		name: `combinator:${name}`,
		match(matcher, ctx) {
			if (!matcher.startsWith(name)) return;
			const separators = ctx.generator.config.separators;
			let body = variantGetBracket(`${name}-`, matcher, separators);
			if (!body) {
				for (const separator of separators) if (matcher.startsWith(`${name}${separator}`)) {
					body = ["", matcher.slice(name.length + separator.length)];
					break;
				}
				if (!body) return;
			}
			let bracketValue = h.bracket(body[0]) ?? "";
			if (bracketValue === "") bracketValue = "*";
			return {
				matcher: body[1],
				selector: (s) => `${s}${combinator}${bracketValue}`
			};
		},
		multiPass: true
	};
}
var variantCombinators = [
	scopeMatcher("all", " "),
	scopeMatcher("children", ">"),
	scopeMatcher("next", "+"),
	scopeMatcher("sibling", "+"),
	scopeMatcher("siblings", "~")
];
var variantSvgCombinators = [variantMatcher("svg", (input) => ({ selector: `${input.selector} svg` }))];
var variantContainerQuery = {
	name: "@",
	match(matcher, ctx) {
		if (matcher.startsWith("@container")) return;
		const variant = variantGetParameter("@", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest, label] = variant;
			const unbracket = h.bracket(match);
			let container;
			if (unbracket) container = h.numberWithUnit(unbracket);
			else container = ctx.theme.container?.[match] ?? "";
			if (container) {
				let order = 1e3 + Object.keys(ctx.theme.container ?? {}).indexOf(match);
				if (label) order += 1e3;
				return {
					matcher: rest,
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@container${label ? ` ${label} ` : " "}(min-width: ${container})`,
						parentOrder: order
					})
				};
			}
		}
	},
	multiPass: true
};
function variantColorsMediaOrClass(options = {}) {
	if (options?.dark === "class" || typeof options.dark === "object") {
		const { dark = ".dark", light = ".light" } = typeof options.dark === "string" ? {} : options.dark;
		return [variantMatcher("dark", (input) => ({ prefix: `${dark} $$ ${input.prefix}` })), variantMatcher("light", (input) => ({ prefix: `${light} $$ ${input.prefix}` }))];
	}
	return [variantParentMatcher("dark", "@media (prefers-color-scheme: dark)"), variantParentMatcher("light", "@media (prefers-color-scheme: light)")];
}
var variantColorsScheme = [
	variantMatcher(".dark", (input) => ({ prefix: `.dark $$ ${input.prefix}` })),
	variantMatcher(".light", (input) => ({ prefix: `.light $$ ${input.prefix}` })),
	variantParentMatcher("@dark", "@media (prefers-color-scheme: dark)"),
	variantParentMatcher("@light", "@media (prefers-color-scheme: light)"),
	variantParentMatcher("not-dark", "@media not (prefers-color-scheme: dark)")
];
var variantDataAttribute = {
	name: "data",
	match(matcher, ctx) {
		const variant = variantGetParameter("data-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? "";
			if (dataAttribute) return {
				matcher: rest,
				selector: (s) => `${s}[data-${dataAttribute}]`
			};
		}
	},
	multiPass: true
};
function taggedData(tagName) {
	return {
		name: `${tagName}-data`,
		match(matcher, ctx) {
			const variant = variantGetParameter(`${tagName}-data-`, matcher, ctx.generator.config.separators);
			if (variant) {
				const [match, rest, label] = variant;
				const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? "";
				if (dataAttribute) {
					const tagSelectorMap = {
						group: `&:is(:where(.group${label ? `\\/${label}` : ""})[data-${dataAttribute}] *)`,
						peer: `&:is(:where(.peer${label ? `\\/${label}` : ""})[data-${dataAttribute}] ~ *)`,
						previous: `:where(*[data-${dataAttribute}] + &)`,
						parent: `:where(*[data-${dataAttribute}] > &)`,
						has: `&:has(*[data-${dataAttribute}])`,
						in: `:where(*[data-${dataAttribute}]) &`
					};
					return {
						matcher: rest,
						handle: (input, next) => next({
							...input,
							parent: `${input.parent ? `${input.parent} $$ ` : ""}${input.selector}`,
							selector: tagSelectorMap[tagName]
						})
					};
				}
			}
		},
		multiPass: true
	};
}
var variantTaggedDataAttributes = [
	taggedData("group"),
	taggedData("peer"),
	taggedData("parent"),
	taggedData("previous"),
	taggedData("has"),
	taggedData("in")
];
var variantLanguageDirections = [variantMatcher("rtl", (input) => ({ prefix: `[dir="rtl"] $$ ${input.prefix}` })), variantMatcher("ltr", (input) => ({ prefix: `[dir="ltr"] $$ ${input.prefix}` }))];
function variantImportant() {
	let re;
	return {
		name: "important",
		match(matcher, ctx) {
			if (!re) re = /* @__PURE__ */ new RegExp(`^(important(?:${ctx.generator.config.separators.join("|")})|!)`);
			let base;
			const match = matcher.match(re);
			if (match) base = matcher.slice(match[0].length);
			else if (matcher.endsWith("!")) base = matcher.slice(0, -1);
			if (base) return {
				matcher: base,
				body: (body) => {
					body.forEach((v) => {
						if (v[1] != null) v[1] += " !important";
					});
					return body;
				}
			};
		}
	};
}
var variantInert = variantMatcher("inert", (input) => ({
	parent: `${input.parent ? `${input.parent} $$ ` : ""}${input.selector}`,
	selector: "&:is([inert],[inert] *)"
}));
var variantNoscript = variantParentMatcher("noscript", "@media (scripting: none)");
var variantScripting = {
	name: "scripting",
	match(matcher, ctx) {
		const variant = variantGetParameter(["script-", "scripting-"], matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			if ([
				"none",
				"initial-only",
				"enabled"
			].includes(match)) return {
				matcher: rest,
				handle: (input, next) => next({
					...input,
					parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (scripting: ${match})`
				})
			};
		}
	},
	multiPass: true,
	autocomplete: ["(scripting|script)-(none|initial-only|enabled)"]
};
var variantPrint = variantParentMatcher("print", "@media print");
var variantCustomMedia = {
	name: "media",
	match(matcher, ctx) {
		const variant = variantGetParameter("media-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			let media = h.bracket(match) ?? "";
			if (media === "") media = ctx.theme.media?.[match] ?? "";
			if (media) return {
				matcher: rest,
				handle: (input, next) => next({
					...input,
					parent: `${input.parent ? `${input.parent} $$ ` : ""}@media ${media}`
				})
			};
		}
	},
	multiPass: true,
	autocomplete: "media-$media"
};
var variantContrasts = [variantParentMatcher("contrast-more", "@media (prefers-contrast: more)"), variantParentMatcher("contrast-less", "@media (prefers-contrast: less)")];
var variantMotions = [variantParentMatcher("motion-reduce", "@media (prefers-reduced-motion: reduce)"), variantParentMatcher("motion-safe", "@media (prefers-reduced-motion: no-preference)")];
var variantOrientations = [variantParentMatcher("landscape", "@media (orientation: landscape)"), variantParentMatcher("portrait", "@media (orientation: portrait)")];
var variantForcedColors = [variantParentMatcher("forced-colors", "@media (forced-colors: active)")];
var variantSelector = {
	name: "selector",
	match(matcher, ctx) {
		const variant = variantGetBracket("selector-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const selector = h.bracket(match);
			if (selector) return {
				matcher: rest,
				selector: () => selector
			};
		}
	}
};
var variantCssLayer = {
	name: "layer",
	match(matcher, ctx) {
		const variant = variantGetParameter("layer-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const layer = h.bracket(match) ?? match;
			if (layer) return {
				matcher: rest,
				handle: (input, next) => next({
					...input,
					parent: `${input.parent ? `${input.parent} $$ ` : ""}@layer ${layer}`
				})
			};
		}
	}
};
var variantInternalLayer = {
	name: "uno-layer",
	match(matcher, ctx) {
		const variant = variantGetParameter("uno-layer-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const layer = h.bracket(match) ?? match;
			if (layer) return {
				matcher: rest,
				layer
			};
		}
	}
};
var variantScope = {
	name: "scope",
	match(matcher, ctx) {
		const variant = variantGetBracket("scope-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const scope = h.bracket(match);
			if (scope) return {
				matcher: rest,
				selector: (s) => `${scope} $$ ${s}`
			};
		}
	}
};
var variantVariables = {
	name: "variables",
	match(matcher, ctx) {
		if (!matcher.startsWith("[")) return;
		const [match, rest] = getBracket(matcher, "[", "]") ?? [];
		if (!(match && rest)) return;
		let newMatcher;
		for (const separator of ctx.generator.config.separators) if (rest.startsWith(separator)) {
			newMatcher = rest.slice(separator.length);
			break;
		}
		if (newMatcher == null) return;
		const variant = h.bracket(match) ?? "";
		const useParent = variant.startsWith("@");
		if (!(useParent || variant.includes("&"))) return;
		return {
			matcher: newMatcher,
			handle(input, next) {
				const updates = useParent ? { parent: `${input.parent ? `${input.parent} $$ ` : ""}${variant}` } : { selector: variant.replace(/&/g, input.selector) };
				return next({
					...input,
					...updates
				});
			}
		};
	},
	multiPass: true
};
var variantTheme = {
	name: "theme-variables",
	match(matcher, ctx) {
		if (!hasThemeFn(matcher)) return;
		return {
			matcher,
			handle(input, next) {
				return next({
					...input,
					entries: JSON.parse(transformThemeFn(JSON.stringify(input.entries), ctx.theme))
				});
			}
		};
	}
};
var variantStickyHover = [variantMatcher("@hover", (input) => ({
	parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (hover: hover) and (pointer: fine)`,
	selector: `${input.selector || ""}:hover`
}))];
var variantImplicitGroup = {
	name: "implicit-group",
	match(matcher, ctx) {
		const variant = variantGetParameter("in-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			const group = h.bracket(match) ?? match;
			if (group) return {
				matcher: rest,
				handle: (input, next) => next({
					...input,
					parent: `${input.parent ? `${input.parent} $$ ` : ""}${input.selector}`,
					selector: `:where(*:is(${group})) &`
				})
			};
		}
	}
};
var anchoredNumberRE = /^-?[0-9.]+(?:[a-z]+|%)?$/;
var numberRE = /-?[0-9.]+(?:[a-z]+|%)?/;
var spacingMultiplyRE = /var\(--spacing(?:-[\w-]+)?\)\s*\*\s*(-?[0-9.]+(?:[a-z]+|%)?)/;
var ignoreProps = [/\b(opacity|color|flex|backdrop-filter|^filter|^scale|transform|mask-image)\b/];
function negateMathFunction(value) {
	const match = value.match(cssMathFnRE) || value.match(cssVarFnRE);
	if (match) {
		const [fnBody, rest] = getStringComponent(`(${match[2]})${match[3]}`, "(", ")", " ") ?? [];
		if (fnBody) {
			const spacingMultiplyMatch = fnBody.match(spacingMultiplyRE);
			if (spacingMultiplyMatch) {
				const num = spacingMultiplyMatch[1];
				const nextNum = num.startsWith("-") ? num.slice(1) : `-${num}`;
				const nextFnBody = fnBody.replace(spacingMultiplyRE, (segment) => {
					return segment.replace(num, nextNum);
				});
				return `${match[1]}${nextFnBody}${rest ? ` ${rest}` : ""}`;
			}
			return `calc(${match[1]}${fnBody} * -1)${rest ? ` ${rest}` : ""}`;
		}
	}
}
var negateFunctionBodyRE = /\b(hue-rotate)\s*(\(.*)/;
function negateFunctionBody(value) {
	const match = value.match(negateFunctionBodyRE);
	if (match) {
		const [fnBody, rest] = getStringComponent(match[2], "(", ")", " ") ?? [];
		if (fnBody) {
			const body = anchoredNumberRE.test(fnBody.slice(1, -1)) ? fnBody.replace(numberRE, (i) => i.startsWith("-") ? i.slice(1) : `-${i}`) : `(calc(${fnBody} * -1))`;
			return `${match[1]}${body}${rest ? ` ${rest}` : ""}`;
		}
	}
}
var variantNegative = {
	name: "negative",
	match(matcher) {
		if (!matcher.startsWith("-")) return;
		return {
			matcher: matcher.slice(1),
			body: (body) => {
				if (body.find((v) => v[0] === "$$mini-no-negative")) return;
				let changed = false;
				for (const v of body) {
					const [prop, rawValue, meta] = v;
					if (typeof rawValue === "object") continue;
					if (meta && toArray(meta).includes("$$mini-no-negative")) continue;
					const value = rawValue?.toString();
					if (!value || value === "0" || ignoreProps.some((i) => i.test(prop))) continue;
					const nextValue = negateMathFunction(value) ?? negateFunctionBody(value) ?? (anchoredNumberRE.test(value) ? value.replace(numberRE, (i) => i.startsWith("-") ? i.slice(1) : `-${i}`) : void 0);
					if (!nextValue || nextValue === value) continue;
					v[1] = nextValue;
					changed = true;
				}
				if (changed) return body;
				return [];
			}
		};
	}
};
var placeholderModifier = (input, { theme }) => {
	const m = input.match(/^(.*)\b(placeholder-)(.+)$/);
	if (m) {
		const [, pre = "", p, body] = m;
		if (hasParseableColor(body, theme) || hasOpacityValue(body)) return { matcher: `${pre}placeholder-$ ${p}${body}` };
	}
};
function hasOpacityValue(body) {
	const match = body.match(/^op(?:acity)?-?(.+)$/);
	if (match && match[1] != null) return h.bracket.percent(match[1]) != null;
	return false;
}
function variantPseudoClassesAndElements() {
	return createPseudoClassesAndElements({
		getBracket,
		h,
		variantGetBracket
	});
}
function variantPseudoClassFunctions() {
	return createPseudoClassFunctions({
		getBracket,
		h,
		variantGetBracket
	});
}
function variantTaggedPseudoClasses(options = {}) {
	return createTaggedPseudoClasses(options, {
		getBracket,
		h,
		variantGetBracket
	});
}
var variantPartClasses = createPartClasses();
var variantStartingStyle = {
	name: "starting",
	match(matcher) {
		if (!matcher.startsWith("starting:")) return;
		return {
			matcher: matcher.slice(9),
			handle: (input, next) => next({
				...input,
				parent: `@starting-style`
			})
		};
	}
};
var variantSupports = {
	name: "supports",
	match(matcher, ctx) {
		const variant = variantGetParameter("supports-", matcher, ctx.generator.config.separators);
		if (variant) {
			const [match, rest] = variant;
			let supports = h.bracket(match) ?? "";
			if (supports === "") supports = ctx.theme.supports?.[match] ?? "";
			if (supports) {
				if (!(supports.startsWith("(") && supports.endsWith(")"))) supports = `(${supports})`;
				return {
					matcher: rest,
					handle: (input, next) => next({
						...input,
						parent: `${input.parent ? `${input.parent} $$ ` : ""}@supports ${supports}`
					})
				};
			}
		}
	},
	multiPass: true
};
function variants(options) {
	return [
		variantAria,
		variantDataAttribute,
		variantCssLayer,
		variantSelector,
		variantInternalLayer,
		variantNegative,
		variantStartingStyle,
		variantImportant(),
		variantSupports,
		variantNoscript,
		variantScripting,
		variantPrint,
		variantCustomMedia,
		...variantContrasts,
		...variantMotions,
		...variantOrientations,
		...variantForcedColors,
		variantBreakpoints(),
		...variantCombinators,
		...variantSvgCombinators,
		placeholderModifier,
		...variantPseudoClassesAndElements(),
		variantPseudoClassFunctions(),
		...variantTaggedPseudoClasses(options),
		variantPartClasses,
		...variantColorsMediaOrClass(options),
		...variantColorsScheme,
		...variantLanguageDirections,
		variantScope,
		...variantChildren,
		variantInert,
		variantContainerQuery,
		variantVariables,
		...variantTaggedDataAttributes,
		...variantTaggedAriaAttributes,
		variantTheme,
		...variantStickyHover,
		variantImplicitGroup
	].flat();
}
//#endregion
//#region node_modules/@unocss/preset-wind4/dist/index.mjs
function property$2(options) {
	if (options.preflights?.property === false) return void 0;
	const propertyConfig = typeof options.preflights?.property === "object" ? options.preflights.property : void 0;
	const parentSelector = propertyConfig?.parent !== void 0 ? propertyConfig.parent : "@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))";
	const selector = propertyConfig?.selector ?? "*, ::before, ::after, ::backdrop";
	return {
		getCSS: () => {
			if (trackedProperties.size === 0) return;
			const css = Array.from(trackedProperties.entries()).map(([property$1, value]) => `${property$1}:${value};`).join("");
			return parentSelector === false ? `${selector}{${css}}` : `${parentSelector}{${selector}{${css}}}`;
		},
		layer: "properties"
	};
}
var resetCSS = `
/*
  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
  2. Remove default margins and padding
  3. Reset all borders.
*/

*,
::after,
::before,
::backdrop,
::file-selector-button {
  box-sizing: border-box; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 2 */
  border: 0 solid; /* 3 */
}

/*
  1. Use a consistent sensible line-height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  3. Use a more readable tab size.
  4. Use the user's configured \`sans\` font-family by default.
  5. Use the user's configured \`sans\` font-feature-settings by default.
  6. Use the user's configured \`sans\` font-variation-settings by default.
  7. Disable tap highlights on iOS.
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  tab-size: 4; /* 3 */
  font-family: var(
    --default-font-family,
    ui-sans-serif,
    system-ui,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji'
  ); /* 4 */
  font-feature-settings: var(--default-font-featureSettings, normal); /* 5 */
  font-variation-settings: var(--default-font-variationSettings, normal); /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  3. Reset the default border style to a 1px solid border.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
  Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

/*
  Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
  Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  -webkit-text-decoration: inherit;
  text-decoration: inherit;
}

/*
  Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
  1. Use the user's configured \`mono\` font-family by default.
  2. Use the user's configured \`mono\` font-feature-settings by default.
  3. Use the user's configured \`mono\` font-variation-settings by default.
  4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: var(
    --default-monoFont-family,
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    'Liberation Mono',
    'Courier New',
    monospace
  ); /* 1 */
  font-feature-settings: var(--default-monoFont-featureSettings, normal); /* 2 */
  font-variation-settings: var(--default-monoFont-variationSettings, normal); /* 3 */
  font-size: 1em; /* 4 */
}

/*
  Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
  Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
  Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
  Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
  Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
  Make lists unstyled by default.
*/

ol,
ul,
menu {
  list-style: none;
}

/*
  1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
  2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
      This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/*
  1. Inherit font styles in all browsers.
  2. Remove border radius in all browsers.
  3. Remove background color in all browsers.
  4. Ensure consistent opacity for disabled states in all browsers.
*/

button,
input,
select,
optgroup,
textarea,
::file-selector-button {
  font: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  border-radius: 0; /* 2 */
  background-color: transparent; /* 3 */
  opacity: 1; /* 4 */
}

/*
  Restore default font weight.
*/

:where(select:is([multiple], [size])) optgroup {
  font-weight: bolder;
}

/*
  Restore indentation.
*/

:where(select:is([multiple], [size])) optgroup option {
  padding-inline-start: 20px;
}

/*
  Restore space after button.
*/

::file-selector-button {
  margin-inline-end: 4px;
}

/*
  Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
*/

::placeholder {
  opacity: 1;
}

/*
  Set the default placeholder color to a semi-transparent version of the current text color in browsers that do not
  crash when using \`color-mix(…)\` with \`currentcolor\`. (https://github.com/tailwindlabs/tailwindcss/issues/17194)
*/

@supports (not (-webkit-appearance: -apple-pay-button)) /* Not Safari */ or
  (contain-intrinsic-size: 1px) /* Safari 17+ */ {
  ::placeholder {
    color: color-mix(in oklab, currentcolor 50%, transparent);
  }
}

/*
  Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
  Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
  1. Ensure date/time inputs have the same height when empty in iOS Safari.
  2. Ensure text alignment can be changed on date/time inputs in iOS Safari.
*/

::-webkit-date-and-time-value {
  min-height: 1lh; /* 1 */
  text-align: inherit; /* 2 */
}

/*
  Prevent height from changing on date/time inputs in macOS Safari when the input is set to \`display: block\`.
*/

::-webkit-datetime-edit {
  display: inline-flex;
}

/*
  Remove excess padding from pseudo-elements in date/time inputs to ensure consistent height across browsers.
*/

::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

::-webkit-datetime-edit,
::-webkit-datetime-edit-year-field,
::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-hour-field,
::-webkit-datetime-edit-minute-field,
::-webkit-datetime-edit-second-field,
::-webkit-datetime-edit-millisecond-field,
::-webkit-datetime-edit-meridiem-field {
  padding-block: 0;
}

/*
  Center dropdown marker shown on inputs with paired \`<datalist>\`s in Chrome. (https://github.com/tailwindlabs/tailwindcss/issues/18499)
*/

::-webkit-calendar-picker-indicator {
  line-height: 1;
}

/*
  Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
  Correct the inability to style the border radius in iOS Safari.
*/

button,
input:where([type='button'], [type='reset'], [type='submit']),
::file-selector-button {
  appearance: button;
}

/*
  Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
  Make elements with the HTML hidden attribute stay hidden by default.
*/

[hidden]:where(:not([hidden~='until-found'])) {
  display: none !important;
}
`;
function reset(options) {
	if (options.preflights?.reset === false) return void 0;
	return {
		getCSS: ({ generator }) => {
			themeTracking("font", "sans");
			themeTracking("font", "mono");
			themeTracking("default", ["font", "family"]);
			themeTracking("default", ["monoFont", "family"]);
			return compressCSS(resetCSS, generator.config.envMode === "dev");
		},
		layer: "base"
	};
}
/** Exclude output for CSS Variables */
var ExcludeCssVarKeys = [
	"spacing",
	"breakpoint",
	"verticalBreakpoint",
	"shadow",
	"insetShadow",
	"dropShadow",
	"textShadow",
	"animation",
	"property",
	"aria",
	"media",
	"supports",
	"containers"
];
function getThemeVarsMap(theme$2, keys) {
	const themeMap = new Map([["--spacing", theme$2.spacing.DEFAULT]]);
	const normalizeValue = (value) => value.replace(alphaPlaceholdersRE, "1");
	function process(obj, prefix) {
		for (const key in obj) if (Array.isArray(obj[key])) themeMap.set(`--${prefix}-${key}`, normalizeValue(obj[key].join(",")));
		else if (typeof obj[key] === "object") process(obj[key], `${prefix}-${key}`);
		else themeMap.set(`--${prefix}-${key}`, normalizeValue(obj[key]));
	}
	for (const key in theme$2) {
		if (!keys.includes(key)) continue;
		process(theme$2[key], key);
	}
	return themeMap;
}
function theme$1(options) {
	const preflightsTheme = typeof options.preflights?.theme === "boolean" || typeof options.preflights?.theme === "string" ? { mode: options.preflights.theme ?? "on-demand" } : {
		mode: options.preflights?.theme?.mode ?? "on-demand",
		...options.preflights?.theme
	};
	return {
		layer: "theme",
		getCSS(ctx) {
			const { theme: theme$2, generator } = ctx;
			const safelist = uniq(generator.config.safelist.flatMap((s) => typeof s === "function" ? s(ctx) : s));
			const { mode, process } = preflightsTheme;
			if (mode === false) return;
			if (safelist.length > 0) for (const s of safelist) {
				const [key, ...prop] = s.trim().split(":");
				if (key in theme$2 && prop.length <= 1) {
					const props = prop.length === 0 ? ["DEFAULT"] : prop[0].split("-");
					const v = getThemeByKey(theme$2, key, props);
					if (typeof v === "string") {
						themeTracking(key, props);
						detectThemeValue(v, theme$2);
					}
				}
			}
			let deps;
			const generateCSS = (deps$1) => {
				if (process) for (const utility of deps$1) for (const p of toArray(process)) p(utility, ctx);
				const resolvedDeps = deps$1.map(([key, value]) => key && value ? `${escapeSelector(key)}: ${value};` : void 0).filter(Boolean);
				if (resolvedDeps.length === 0) return;
				return compressCSS(`
:root, :host {
${resolvedDeps.join("\n")}
}`, generator.config.envMode === "dev");
			};
			if (mode === "on-demand") {
				if (trackedTheme.size === 0) return void 0;
				deps = Array.from(trackedTheme).map((k) => {
					const [key, prop] = k.split(":");
					const v = getThemeByKey(theme$2, key, prop.split("-"));
					if (typeof v === "string") return [`--${key}${`${key === "spacing" && prop === "DEFAULT" ? "" : `-${prop}`}`}`, v];
				}).filter(Boolean);
			} else {
				const keys = Object.keys(theme$2).filter((k) => !ExcludeCssVarKeys.includes(k));
				deps = Array.from(getThemeVarsMap(theme$2, keys));
			}
			return generateCSS(deps);
		}
	};
}
var preflights = (options) => {
	return [
		reset(options),
		theme$1(options),
		property$2(options)
	].filter(Boolean);
};
var shorthands = {
	position: [
		"relative",
		"absolute",
		"fixed",
		"sticky",
		"static"
	],
	globalKeyword: globalKeywords
};
var src_default$8 = definePreset((options = {}) => {
	options.dark = options.dark ?? "class";
	options.attributifyPseudo = options.attributifyPseudo ?? false;
	options.variablePrefix = options.variablePrefix ?? "un-";
	options.important = options.important ?? false;
	return {
		name: PRESET_NAME,
		rules,
		shortcuts,
		theme,
		layers: {
			properties: -200,
			theme: -150,
			base: -100
		},
		preflights: preflights(options),
		variants: variants(options),
		prefix: options.prefix,
		postprocess: postprocessors(options),
		extractorDefault: options.arbitraryVariants === false ? void 0 : extractorArbitraryVariants(),
		autocomplete: { shorthands },
		options,
		configResolved() {
			trackedTheme.clear();
			trackedProperties.clear();
		},
		meta: {
			themeDeps: trackedTheme,
			propertyDeps: trackedProperties
		}
	};
});
//#endregion
//#region node_modules/oxc-parser/src-js/wrap.js
function wrap$1(result) {
	let program, module, comments, errors;
	return {
		get program() {
			if (!program) program = jsonParseAst(result.program);
			return program;
		},
		get module() {
			if (!module) module = result.module;
			return module;
		},
		get comments() {
			if (!comments) comments = result.comments;
			return comments;
		},
		get errors() {
			if (!errors) errors = result.errors;
			return errors;
		}
	};
}
function jsonParseAst(programJson) {
	const { node: program, fixes } = JSON.parse(programJson);
	for (const fixPath of fixes) applyFix(program, fixPath);
	return program;
}
function applyFix(program, fixPath) {
	let node = program;
	for (const key of fixPath) node = node[key];
	if (node.bigint) node.value = BigInt(node.bigint);
	else try {
		node.value = RegExp(node.regex.pattern, node.regex.flags);
	} catch {}
}
//#endregion
//#region node_modules/oxc-parser/src-js/wasm.js
function parseSync(filename, sourceText, options) {
	return wrap$1(bindings.parseSync(filename, sourceText, options));
}
//#endregion
//#region node_modules/magic-regexp/dist/shared/magic-regexp.DKp_q_HX.mjs
var NO_WRAP_RE = /^(?:\(.*\)|\\?.)$/;
function wrap(s) {
	const v = s.toString();
	return NO_WRAP_RE.test(v) ? v : `(?:${v})`;
}
var GROUPED_AS_REPLACE_RE = /^(?:\(\?:(.+)\)|(.+))$/;
var GROUPED_REPLACE_RE = /^(?:\(\?:(.+)\)([?+*]|\{[\d,]+\})?|(.+))$/;
function createInput(s) {
	const groupedAsFn = (key) => createInput(`(?<${key}>${`${s}`.replace(GROUPED_AS_REPLACE_RE, "$1$2")})`);
	return {
		toString: () => s.toString(),
		and: Object.assign((...inputs) => createInput(`${s}${exactly(...inputs)}`), { referenceTo: (groupName) => createInput(`${s}\\k<${groupName}>`) }),
		or: (...inputs) => createInput(`(?:${s}|${inputs.map((v) => exactly(v)).join("|")})`),
		after: (...input) => createInput(`(?<=${exactly(...input)})${s}`),
		before: (...input) => createInput(`${s}(?=${exactly(...input)})`),
		notAfter: (...input) => createInput(`(?<!${exactly(...input)})${s}`),
		notBefore: (...input) => createInput(`${s}(?!${exactly(...input)})`),
		times: Object.assign((number) => createInput(`${wrap(s)}{${number}}`), {
			any: () => createInput(`${wrap(s)}*`),
			atLeast: (min) => createInput(`${wrap(s)}{${min},}`),
			atMost: (max) => createInput(`${wrap(s)}{0,${max}}`),
			between: (min, max) => createInput(`${wrap(s)}{${min},${max}}`)
		}),
		optionally: () => createInput(`${wrap(s)}?`),
		as: groupedAsFn,
		groupedAs: groupedAsFn,
		grouped: () => createInput(`${s}`.replace(GROUPED_REPLACE_RE, "($1$3)$2")),
		at: {
			lineStart: () => createInput(`^${s}`),
			lineEnd: () => createInput(`${s}$`)
		}
	};
}
var ESCAPE_REPLACE_RE = /[.*+?^${}()|[\]\\/]/g;
function createCharInput(raw) {
	const input = createInput(`[${raw}]`);
	const from = (charFrom, charTo) => createCharInput(`${raw}${escapeCharInput(charFrom)}-${escapeCharInput(charTo)}`);
	const orChar = Object.assign((chars) => createCharInput(`${raw}${escapeCharInput(chars)}`), { from });
	return Object.assign(input, {
		orChar,
		from
	});
}
function escapeCharInput(raw) {
	return raw.replace(/[-\\^\]]/g, "\\$&");
}
Object.assign((chars) => {
	return createCharInput(escapeCharInput(chars));
}, createCharInput(""));
Object.assign((chars) => {
	return createCharInput(`^${escapeCharInput(chars)}`);
}, createCharInput("^"));
function anyOf(...inputs) {
	return createInput(`(?:${inputs.map((a) => exactly(a)).join("|")})`);
}
createInput(".");
createInput("\\b\\w+\\b");
createInput("\\w");
createInput("\\b");
createInput("\\d");
createInput("\\s");
Object.assign(createInput("[a-zA-Z]"), {
	lowercase: createInput("[a-z]"),
	uppercase: createInput("[A-Z]")
});
createInput("\\t");
createInput("\\n");
createInput("\\r");
createInput("\\W+"), createInput("\\W"), createInput("\\B"), createInput("\\D"), createInput("\\S"), Object.assign(createInput("[^a-zA-Z]"), {
	lowercase: createInput("[^a-z]"),
	uppercase: createInput("[^A-Z]")
}), createInput("[^\\t]"), createInput("[^\\n]"), createInput("[^\\r]");
function exactly(...inputs) {
	return createInput(inputs.map((input) => typeof input === "string" ? input.replace(ESCAPE_REPLACE_RE, "\\$&") : input).join(""));
}
//#endregion
//#region node_modules/magic-regexp/dist/further-magic.mjs
var createRegExp = (...inputs) => {
	const flags = inputs.length > 1 && (Array.isArray(inputs[inputs.length - 1]) || inputs[inputs.length - 1] instanceof Set) ? inputs.pop() : void 0;
	return new RegExp(exactly(...inputs).toString(), [...flags || ""].join(""));
};
//#endregion
//#region node_modules/oxc-walker/dist/index.mjs
function isNode(v) {
	return v !== null && typeof v === "object" && v.type != null && typeof v.type === "string";
}
var WalkerBase = class {
	scopeTracker;
	enter;
	leave;
	contextEnter = {
		skip: () => {
			this._skip = true;
		},
		remove: () => {
			this._remove = true;
		},
		replace: (node) => {
			this._replacement = node;
		}
	};
	contextLeave = {
		remove: this.contextEnter.remove,
		replace: this.contextEnter.replace
	};
	_skip = false;
	_remove = false;
	_replacement = null;
	constructor(handler, options) {
		this.enter = handler.enter;
		this.leave = handler.leave;
		this.scopeTracker = options?.scopeTracker;
	}
	replace(parent, key, index, node) {
		if (!parent || key === null) return;
		if (index !== null) parent[key][index] = node;
		else parent[key] = node;
	}
	insert(parent, key, index, node) {
		if (!parent || key === null) return;
		if (index !== null) parent[key].splice(index, 0, node);
		else parent[key] = node;
	}
	remove(parent, key, index) {
		if (!parent || key === null) return;
		if (index !== null) parent[key].splice(index, 1);
		else delete parent[key];
	}
};
var WalkerSync = class extends WalkerBase {
	constructor(handler, options) {
		super(handler, options);
	}
	traverse(input, key, index, parent) {
		const ctx = {
			key: null,
			index: index ?? null,
			ast: input
		};
		const hasScopeTracker = !!this.scopeTracker;
		const _walk = (input2, parent2, key2, index2, skip) => {
			if (!isNode(input2)) return null;
			this.scopeTracker?.processNodeEnter(input2);
			let currentNode = input2;
			let removedInEnter = false;
			let skipChildren = skip;
			if (this.enter && !skip) {
				const _skip = this._skip;
				const _remove = this._remove;
				const _replacement = this._replacement;
				this._skip = false;
				this._remove = false;
				this._replacement = null;
				ctx.key = key2;
				ctx.index = index2;
				this.enter.call(this.contextEnter, input2, parent2, ctx);
				if (this._replacement && !this._remove) {
					currentNode = this._replacement;
					this.replace(parent2, key2, index2, this._replacement);
				}
				if (this._remove) {
					removedInEnter = true;
					currentNode = null;
					this.remove(parent2, key2, index2);
				}
				if (this._skip) skipChildren = true;
				this._skip = _skip;
				this._remove = _remove;
				this._replacement = _replacement;
			}
			if ((!skipChildren || hasScopeTracker) && currentNode) for (const k in currentNode) {
				const node = currentNode[k];
				if (!node || typeof node !== "object") continue;
				if (Array.isArray(node)) for (let i = 0; i < node.length; i++) {
					const child = node[i];
					if (isNode(child)) {
						if (_walk(child, currentNode, k, i, skipChildren) === null) i--;
					}
				}
				else if (isNode(node)) _walk(node, currentNode, k, null, skipChildren);
			}
			this.scopeTracker?.processNodeLeave(input2);
			if (this.leave && !skip) {
				const _replacement = this._replacement;
				const _remove = this._remove;
				this._replacement = null;
				this._remove = false;
				ctx.key = key2;
				ctx.index = index2;
				this.leave.call(this.contextLeave, input2, parent2, ctx);
				if (this._replacement && !this._remove) {
					currentNode = this._replacement;
					if (removedInEnter) this.insert(parent2, key2, index2, this._replacement);
					else this.replace(parent2, key2, index2, this._replacement);
				}
				if (this._remove) {
					currentNode = null;
					this.remove(parent2, key2, index2);
				}
				this._replacement = _replacement;
				this._remove = _remove;
			}
			return currentNode;
		};
		return _walk(input, parent ?? null, key ?? null, index ?? null, false);
	}
};
function walk$2(input, options) {
	return new WalkerSync({
		enter: options.enter,
		leave: options.leave
	}, { scopeTracker: options.scopeTracker }).traverse(input);
}
createRegExp(exactly("jsx").or("tsx").or("js").or("ts").groupedAs("lang").after(exactly(".").and(anyOf("c", "m").optionally())).at.lineEnd());
//#endregion
//#region node_modules/@unocss/transformer-attributify-jsx/dist/index.mjs
function getEnvFlags() {
	const isNode = typeof process !== "undefined" && process.stdout;
	return {
		isNode,
		isVSCode: isNode && !!process.env.VSCODE_CWD,
		isESLint: isNode && !!process.env.ESLINT
	};
}
async function attributifyJsxOxcResolver(params) {
	const { code, id, uno, isBlocked } = params;
	const tasks = [];
	const ast = parseSync(id, code.toString(), { sourceType: "module" });
	if (ast.errors?.length) throw new Error(`Oxc parse errors:\n${ast.errors.join("\n")}`);
	walk$2(ast.program, { enter(node) {
		if (node.type !== "JSXAttribute") return;
		if (node.value === null) {
			const attr = node.name.type === "JSXNamespacedName" ? `${node.name.namespace.name}:${node.name.name.name}` : node.name.name;
			if (isBlocked(attr)) return;
			tasks.push(uno.parseToken(attr).then((matched) => {
				if (matched) code.appendRight(node.end, "=\"\"");
			}));
		}
	} });
	await Promise.all(tasks);
}
var elementRE = /<([^/?<>0-9$_!][^\s>]*)\s+((?:"[^"]*"|'[^"]*'|(\{[^}]*\})|[^{>])+)>/g;
var attributeRE = /(?<![~`!$%^&*()_+\-=[{;':"|,.<>/?])([a-z()#][[?\w\-:()#%\]]*)(?:\s*=\s*('[^']*'|"[^"]*"|\S+))?|\{[^}]*\}/gi;
var valuedAttributeRE = /((?!\d|-{2}|-\d)[\w\u00A0-\uFFFF:!%.~<-]+)=(?:"[^"]*"|'[^']*'|(\{)((?:[`(][^`)]*[`)]|[^}])+)(\}))/g;
async function attributifyJsxRegexResolver(params) {
	const { code, uno, isBlocked } = params;
	const tasks = [];
	const attributifyPrefix = uno.config.presets.find((i) => i.name === "@unocss/preset-attributify")?.options?.prefix ?? "un-";
	for (const item of Array.from(code.original.matchAll(elementRE))) {
		let attributifyPart = item[2];
		if (valuedAttributeRE.test(attributifyPart)) attributifyPart = attributifyPart.replace(valuedAttributeRE, (match, _, dynamicFlagStart) => {
			if (!dynamicFlagStart) return " ".repeat(match.length);
			let preLastModifierIndex = 0;
			let temp = match;
			for (const _item of match.matchAll(elementRE)) {
				const attrAttributePart = _item[2];
				if (valuedAttributeRE.test(attrAttributePart)) attrAttributePart.replace(valuedAttributeRE, (m) => " ".repeat(m.length));
				const pre = temp.slice(0, preLastModifierIndex) + " ".repeat(_item.index + _item[0].indexOf(_item[2]) - preLastModifierIndex) + attrAttributePart;
				temp = pre + " ".repeat(_item.input.length - pre.length);
				preLastModifierIndex = pre.length;
			}
			if (preLastModifierIndex !== 0) return temp;
			return " ".repeat(match.length);
		});
		for (const attr of attributifyPart.matchAll(attributeRE)) {
			const matchedRule = attr[0];
			if (matchedRule.includes("=") || isBlocked(matchedRule)) continue;
			const updatedMatchedRule = matchedRule.startsWith(attributifyPrefix) ? matchedRule.slice(attributifyPrefix.length) : matchedRule;
			tasks.push(uno.parseToken(updatedMatchedRule).then((matched) => {
				if (matched) {
					const startIdx = (item.index || 0) + (attr.index || 0) + item[0].indexOf(item[2]);
					const endIdx = startIdx + matchedRule.length;
					code.overwrite(startIdx, endIdx, `${matchedRule}=""`);
				}
			}));
		}
	}
	await Promise.all(tasks);
}
function createFilter(include, exclude) {
	const includePattern = toArray(include || []);
	const excludePattern = toArray(exclude || []);
	return (id) => {
		if (excludePattern.some((p) => id.match(p))) return false;
		return includePattern.some((p) => id.match(p));
	};
}
function transformerAttributifyJsx(options = {}) {
	const { blocklist = [] } = options;
	const isBlocked = (matchedRule) => {
		for (const blockedRule of blocklist) if (blockedRule instanceof RegExp) {
			if (blockedRule.test(matchedRule)) return true;
		} else if (matchedRule === blockedRule) return true;
		return false;
	};
	return {
		name: "@unocss/transformer-attributify-jsx",
		enforce: "pre",
		idFilter: createFilter(options.include || [/\.[jt]sx$/, /\.mdx$/], options.exclude || []),
		async transform(code, id, { uno }) {
			try {
				if (getEnvFlags().isVSCode) return;
			} catch {}
			const params = {
				code,
				id,
				uno,
				isBlocked
			};
			try {
				await attributifyJsxOxcResolver(params);
			} catch (error) {
				console.warn(`[@unocss/transformer-attributify-jsx]: Oxc resolver failed for "${id}", falling back to regex resolver:`, error);
				await attributifyJsxRegexResolver(params);
			}
		}
	};
}
//#endregion
//#region node_modules/@unocss/transformer-compile-class/dist/index.mjs
function transformerCompileClass(options = {}) {
	const { trigger = /(["'`])\s*:uno-?(?<name>\S+)?:\s([\s\S]*?)\1/g, classPrefix = "uno-", hashFn = hash, keepUnknown = true, alwaysHash = false } = options;
	const compiledClass = /* @__PURE__ */ new Set();
	const regexp = typeof trigger === "string" ? new RegExp(`(["'\`])\\s*${escapeRegExp(trigger)}\\s([\\s\\S]*?)\\1`, "g") : trigger;
	return {
		name: "@unocss/transformer-compile-class",
		enforce: "pre",
		async transform(s, _, { uno, tokens, invalidate }) {
			const matches = Array.from(s.original.matchAll(regexp));
			if (!matches.length) return;
			const size = compiledClass.size;
			for (const match of matches) {
				let body = (match.length === 4 && match.groups ? expandVariantGroup(match[3].trim()) : expandVariantGroup(match[2].trim())).replace(/\s+/g, " ");
				const start = match.index;
				const replacements = [];
				if (keepUnknown) {
					const result = await Promise.all(body.split(/\s+/).filter(Boolean).map(async (i) => [i, !!await uno.parseToken(i)]));
					const known = result.filter(([, matched]) => matched).map(([i]) => i);
					const unknown = result.filter(([, matched]) => !matched).map(([i]) => i);
					replacements.push(...unknown);
					body = known.join(" ");
				}
				if (body) {
					let hash$1;
					let explicitName = false;
					if (match.groups && match.groups.name) {
						hash$1 = match.groups.name;
						if (alwaysHash) hash$1 += `-${hashFn(body)}`;
						explicitName = true;
					} else hash$1 = hashFn(body);
					const className = `${classPrefix}${hash$1}`;
					if (tokens && tokens.has(className) && explicitName) {
						const existing = uno.config.shortcuts.find((i) => i[0] === className);
						if (existing && existing[1] !== body) throw new Error(`Duplicated compile class name "${className}". One is "${body}" and the other is "${existing[1]}". Please choose different class name or set 'alwaysHash' to 'true'.`);
					}
					compiledClass.add(className);
					replacements.unshift(className);
					if (options.layer) uno.config.shortcuts.push([
						className,
						body,
						{ layer: options.layer }
					]);
					else uno.config.shortcuts.push([className, body]);
					if (tokens) tokens.add(className);
				}
				s.overwrite(start + 1, start + match[0].length - 1, replacements.join(" "));
			}
			if (compiledClass.size > size) invalidate();
		}
	};
}
function hash(str) {
	let i;
	let l;
	let hval = 2166136261;
	for (i = 0, l = str.length; i < l; i++) {
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	return `00000${(hval >>> 0).toString(36)}`.slice(-6);
}
//#endregion
//#region node_modules/css-tree/lib/tokenizer/char-code-definitions.js
var EOF = 0;
function isDigit(code) {
	return code >= 48 && code <= 57;
}
function isHexDigit(code) {
	return isDigit(code) || code >= 65 && code <= 70 || code >= 97 && code <= 102;
}
function isUppercaseLetter(code) {
	return code >= 65 && code <= 90;
}
function isLowercaseLetter(code) {
	return code >= 97 && code <= 122;
}
function isLetter(code) {
	return isUppercaseLetter(code) || isLowercaseLetter(code);
}
function isNonAscii(code) {
	return code >= 128;
}
function isNameStart(code) {
	return isLetter(code) || isNonAscii(code) || code === 95;
}
function isName(code) {
	return isNameStart(code) || isDigit(code) || code === 45;
}
function isNonPrintable(code) {
	return code >= 0 && code <= 8 || code === 11 || code >= 14 && code <= 31 || code === 127;
}
function isNewline(code) {
	return code === 10 || code === 13 || code === 12;
}
function isWhiteSpace(code) {
	return isNewline(code) || code === 32 || code === 9;
}
function isValidEscape(first, second) {
	if (first !== 92) return false;
	if (isNewline(second) || second === EOF) return false;
	return true;
}
function isIdentifierStart(first, second, third) {
	if (first === 45) return isNameStart(second) || second === 45 || isValidEscape(second, third);
	if (isNameStart(first)) return true;
	if (first === 92) return isValidEscape(first, second);
	return false;
}
function isNumberStart(first, second, third) {
	if (first === 43 || first === 45) {
		if (isDigit(second)) return 2;
		return second === 46 && isDigit(third) ? 3 : 0;
	}
	if (first === 46) return isDigit(second) ? 2 : 0;
	if (isDigit(first)) return 1;
	return 0;
}
function isBOM(code) {
	if (code === 65279) return 1;
	if (code === 65534) return 1;
	return 0;
}
var CATEGORY = new Array(128);
for (let i = 0; i < CATEGORY.length; i++) CATEGORY[i] = isWhiteSpace(i) && 130 || isDigit(i) && 131 || isNameStart(i) && 132 || isNonPrintable(i) && 133 || i || 128;
function charCodeCategory(code) {
	return code < 128 ? CATEGORY[code] : 132;
}
//#endregion
//#region node_modules/css-tree/lib/tokenizer/utils.js
function getCharCode(source, offset) {
	return offset < source.length ? source.charCodeAt(offset) : 0;
}
function getNewlineLength(source, offset, code) {
	if (code === 13 && getCharCode(source, offset + 1) === 10) return 2;
	return 1;
}
function cmpChar(testStr, offset, referenceCode) {
	let code = testStr.charCodeAt(offset);
	if (isUppercaseLetter(code)) code = code | 32;
	return code === referenceCode;
}
function cmpStr(testStr, start, end, referenceStr) {
	if (end - start !== referenceStr.length) return false;
	if (start < 0 || end > testStr.length) return false;
	for (let i = start; i < end; i++) {
		const referenceCode = referenceStr.charCodeAt(i - start);
		let testCode = testStr.charCodeAt(i);
		if (isUppercaseLetter(testCode)) testCode = testCode | 32;
		if (testCode !== referenceCode) return false;
	}
	return true;
}
function findWhiteSpaceStart(source, offset) {
	for (; offset >= 0; offset--) if (!isWhiteSpace(source.charCodeAt(offset))) break;
	return offset + 1;
}
function findWhiteSpaceEnd(source, offset) {
	for (; offset < source.length; offset++) if (!isWhiteSpace(source.charCodeAt(offset))) break;
	return offset;
}
function findDecimalNumberEnd(source, offset) {
	for (; offset < source.length; offset++) if (!isDigit(source.charCodeAt(offset))) break;
	return offset;
}
function consumeEscaped(source, offset) {
	offset += 2;
	if (isHexDigit(getCharCode(source, offset - 1))) {
		for (const maxOffset = Math.min(source.length, offset + 5); offset < maxOffset; offset++) if (!isHexDigit(getCharCode(source, offset))) break;
		const code = getCharCode(source, offset);
		if (isWhiteSpace(code)) offset += getNewlineLength(source, offset, code);
	}
	return offset;
}
function consumeName(source, offset) {
	for (; offset < source.length; offset++) {
		const code = source.charCodeAt(offset);
		if (isName(code)) continue;
		if (isValidEscape(code, getCharCode(source, offset + 1))) {
			offset = consumeEscaped(source, offset) - 1;
			continue;
		}
		break;
	}
	return offset;
}
function consumeNumber(source, offset) {
	let code = source.charCodeAt(offset);
	if (code === 43 || code === 45) code = source.charCodeAt(offset += 1);
	if (isDigit(code)) {
		offset = findDecimalNumberEnd(source, offset + 1);
		code = source.charCodeAt(offset);
	}
	if (code === 46 && isDigit(source.charCodeAt(offset + 1))) {
		offset += 2;
		offset = findDecimalNumberEnd(source, offset);
	}
	if (cmpChar(source, offset, 101)) {
		let sign = 0;
		code = source.charCodeAt(offset + 1);
		if (code === 45 || code === 43) {
			sign = 1;
			code = source.charCodeAt(offset + 2);
		}
		if (isDigit(code)) offset = findDecimalNumberEnd(source, offset + 1 + sign + 1);
	}
	return offset;
}
function consumeBadUrlRemnants(source, offset) {
	for (; offset < source.length; offset++) {
		const code = source.charCodeAt(offset);
		if (code === 41) {
			offset++;
			break;
		}
		if (isValidEscape(code, getCharCode(source, offset + 1))) offset = consumeEscaped(source, offset);
	}
	return offset;
}
function decodeEscaped(escaped) {
	if (escaped.length === 1 && !isHexDigit(escaped.charCodeAt(0))) return escaped[0];
	let code = parseInt(escaped, 16);
	if (code === 0 || code >= 55296 && code <= 57343 || code > 1114111) code = 65533;
	return String.fromCodePoint(code);
}
//#endregion
//#region node_modules/css-tree/lib/tokenizer/names.js
var names_default = [
	"EOF-token",
	"ident-token",
	"function-token",
	"at-keyword-token",
	"hash-token",
	"string-token",
	"bad-string-token",
	"url-token",
	"bad-url-token",
	"delim-token",
	"number-token",
	"percentage-token",
	"dimension-token",
	"whitespace-token",
	"CDO-token",
	"CDC-token",
	"colon-token",
	"semicolon-token",
	"comma-token",
	"[-token",
	"]-token",
	"(-token",
	")-token",
	"{-token",
	"}-token",
	"comment-token"
];
//#endregion
//#region node_modules/css-tree/lib/tokenizer/adopt-buffer.js
var MIN_SIZE = 16 * 1024;
function adoptBuffer(buffer = null, size) {
	if (buffer === null || buffer.length < size) return new Uint32Array(Math.max(size + 1024, MIN_SIZE));
	return buffer;
}
//#endregion
//#region node_modules/css-tree/lib/tokenizer/OffsetToLocation.js
var N$4 = 10;
var F$2 = 12;
var R$2 = 13;
function computeLinesAndColumns(host) {
	const source = host.source;
	const sourceLength = source.length;
	const startOffset = source.length > 0 ? isBOM(source.charCodeAt(0)) : 0;
	const lines = adoptBuffer(host.lines, sourceLength);
	const columns = adoptBuffer(host.columns, sourceLength);
	let line = host.startLine;
	let column = host.startColumn;
	for (let i = startOffset; i < sourceLength; i++) {
		const code = source.charCodeAt(i);
		lines[i] = line;
		columns[i] = column++;
		if (code === N$4 || code === R$2 || code === F$2) {
			if (code === R$2 && i + 1 < sourceLength && source.charCodeAt(i + 1) === N$4) {
				i++;
				lines[i] = line;
				columns[i] = column;
			}
			line++;
			column = 1;
		}
	}
	lines[sourceLength] = line;
	columns[sourceLength] = column;
	host.lines = lines;
	host.columns = columns;
	host.computed = true;
}
var OffsetToLocation = class {
	constructor(source, startOffset, startLine, startColumn) {
		this.setSource(source, startOffset, startLine, startColumn);
		this.lines = null;
		this.columns = null;
	}
	setSource(source = "", startOffset = 0, startLine = 1, startColumn = 1) {
		this.source = source;
		this.startOffset = startOffset;
		this.startLine = startLine;
		this.startColumn = startColumn;
		this.computed = false;
	}
	getLocation(offset, filename) {
		if (!this.computed) computeLinesAndColumns(this);
		return {
			source: filename,
			offset: this.startOffset + offset,
			line: this.lines[offset],
			column: this.columns[offset]
		};
	}
	getLocationRange(start, end, filename) {
		if (!this.computed) computeLinesAndColumns(this);
		return {
			source: filename,
			start: {
				offset: this.startOffset + start,
				line: this.lines[start],
				column: this.columns[start]
			},
			end: {
				offset: this.startOffset + end,
				line: this.lines[end],
				column: this.columns[end]
			}
		};
	}
};
//#endregion
//#region node_modules/css-tree/lib/tokenizer/TokenStream.js
var OFFSET_MASK = 16777215;
var TYPE_SHIFT = 24;
var BLOCK_OPEN_TOKEN = 1;
var BLOCK_CLOSE_TOKEN = 2;
var balancePair$1 = new Uint8Array(32);
balancePair$1[2] = 22;
balancePair$1[21] = 22;
balancePair$1[19] = 20;
balancePair$1[23] = 24;
var blockTokens = new Uint8Array(32);
blockTokens[2] = BLOCK_OPEN_TOKEN;
blockTokens[21] = BLOCK_OPEN_TOKEN;
blockTokens[19] = BLOCK_OPEN_TOKEN;
blockTokens[23] = BLOCK_OPEN_TOKEN;
blockTokens[22] = BLOCK_CLOSE_TOKEN;
blockTokens[20] = BLOCK_CLOSE_TOKEN;
blockTokens[24] = BLOCK_CLOSE_TOKEN;
function boundIndex(index, min, max) {
	return index < min ? min : index > max ? max : index;
}
var TokenStream = class {
	constructor(source, tokenize) {
		this.setSource(source, tokenize);
	}
	reset() {
		this.eof = false;
		this.tokenIndex = -1;
		this.tokenType = 0;
		this.tokenStart = this.firstCharOffset;
		this.tokenEnd = this.firstCharOffset;
	}
	setSource(source = "", tokenize = () => {}) {
		source = String(source || "");
		const sourceLength = source.length;
		const offsetAndType = adoptBuffer(this.offsetAndType, source.length + 1);
		const balance = adoptBuffer(this.balance, source.length + 1);
		let tokenCount = 0;
		let firstCharOffset = -1;
		let balanceCloseType = 0;
		let balanceStart = source.length;
		this.offsetAndType = null;
		this.balance = null;
		balance.fill(0);
		tokenize(source, (type, start, end) => {
			const index = tokenCount++;
			offsetAndType[index] = type << TYPE_SHIFT | end;
			if (firstCharOffset === -1) firstCharOffset = start;
			balance[index] = balanceStart;
			if (type === balanceCloseType) {
				const prevBalanceStart = balance[balanceStart];
				balance[balanceStart] = index;
				balanceStart = prevBalanceStart;
				balanceCloseType = balancePair$1[offsetAndType[prevBalanceStart] >> TYPE_SHIFT];
			} else if (this.isBlockOpenerTokenType(type)) {
				balanceStart = index;
				balanceCloseType = balancePair$1[type];
			}
		});
		offsetAndType[tokenCount] = 0 << TYPE_SHIFT | sourceLength;
		balance[tokenCount] = tokenCount;
		for (let i = 0; i < tokenCount; i++) {
			const balanceStart = balance[i];
			if (balanceStart <= i) {
				const balanceEnd = balance[balanceStart];
				if (balanceEnd !== i) balance[i] = balanceEnd;
			} else if (balanceStart > tokenCount) balance[i] = tokenCount;
		}
		this.source = source;
		this.firstCharOffset = firstCharOffset === -1 ? 0 : firstCharOffset;
		this.tokenCount = tokenCount;
		this.offsetAndType = offsetAndType;
		this.balance = balance;
		this.reset();
		this.next();
	}
	lookupType(offset) {
		offset += this.tokenIndex;
		if (offset < this.tokenCount) return this.offsetAndType[offset] >> TYPE_SHIFT;
		return 0;
	}
	lookupTypeNonSC(idx) {
		for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
			const tokenType = this.offsetAndType[offset] >> TYPE_SHIFT;
			if (tokenType !== 13 && tokenType !== 25) {
				if (idx-- === 0) return tokenType;
			}
		}
		return 0;
	}
	lookupOffset(offset) {
		offset += this.tokenIndex;
		if (offset < this.tokenCount) return this.offsetAndType[offset - 1] & OFFSET_MASK;
		return this.source.length;
	}
	lookupOffsetNonSC(idx) {
		for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
			const tokenType = this.offsetAndType[offset] >> TYPE_SHIFT;
			if (tokenType !== 13 && tokenType !== 25) {
				if (idx-- === 0) return offset - this.tokenIndex;
			}
		}
		return 0;
	}
	lookupValue(offset, referenceStr) {
		offset += this.tokenIndex;
		if (offset < this.tokenCount) return cmpStr(this.source, this.offsetAndType[offset - 1] & OFFSET_MASK, this.offsetAndType[offset] & OFFSET_MASK, referenceStr);
		return false;
	}
	getTokenStart(tokenIndex) {
		if (tokenIndex === this.tokenIndex) return this.tokenStart;
		if (tokenIndex > 0) return tokenIndex < this.tokenCount ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
		return this.firstCharOffset;
	}
	getTokenEnd(tokenIndex) {
		if (tokenIndex === this.tokenIndex) return this.tokenEnd;
		return this.offsetAndType[boundIndex(tokenIndex, 0, this.tokenCount)] & OFFSET_MASK;
	}
	getTokenType(tokenIndex) {
		if (tokenIndex === this.tokenIndex) return this.tokenType;
		return this.offsetAndType[boundIndex(tokenIndex, 0, this.tokenCount)] >> TYPE_SHIFT;
	}
	substrToCursor(start) {
		return this.source.substring(start, this.tokenStart);
	}
	isBlockOpenerTokenType(tokenType) {
		return blockTokens[tokenType] === BLOCK_OPEN_TOKEN;
	}
	isBlockCloserTokenType(tokenType) {
		return blockTokens[tokenType] === BLOCK_CLOSE_TOKEN;
	}
	getBlockTokenPairIndex(tokenIndex) {
		const type = this.getTokenType(tokenIndex);
		if (blockTokens[type] === 1) {
			const pairIndex = this.balance[tokenIndex];
			const closeType = this.getTokenType(pairIndex);
			return balancePair$1[type] === closeType ? pairIndex : -1;
		} else if (blockTokens[type] === 2) {
			const pairIndex = this.balance[tokenIndex];
			return balancePair$1[this.getTokenType(pairIndex)] === type ? pairIndex : -1;
		}
		return -1;
	}
	isBalanceEdge(tokenIndex) {
		return this.balance[this.tokenIndex] < tokenIndex;
	}
	isDelim(code, offset) {
		if (offset) return this.lookupType(offset) === 9 && this.source.charCodeAt(this.lookupOffset(offset)) === code;
		return this.tokenType === 9 && this.source.charCodeAt(this.tokenStart) === code;
	}
	skip(tokenCount) {
		let next = this.tokenIndex + tokenCount;
		if (next < this.tokenCount) {
			this.tokenIndex = next;
			this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
			next = this.offsetAndType[next];
			this.tokenType = next >> TYPE_SHIFT;
			this.tokenEnd = next & OFFSET_MASK;
		} else {
			this.tokenIndex = this.tokenCount;
			this.next();
		}
	}
	next() {
		let next = this.tokenIndex + 1;
		if (next < this.tokenCount) {
			this.tokenIndex = next;
			this.tokenStart = this.tokenEnd;
			next = this.offsetAndType[next];
			this.tokenType = next >> TYPE_SHIFT;
			this.tokenEnd = next & OFFSET_MASK;
		} else {
			this.eof = true;
			this.tokenIndex = this.tokenCount;
			this.tokenType = 0;
			this.tokenStart = this.tokenEnd = this.source.length;
		}
	}
	skipSC() {
		while (this.tokenType === 13 || this.tokenType === 25) this.next();
	}
	skipUntilBalanced(startToken, stopConsume) {
		let cursor = startToken;
		let balanceEnd = 0;
		let offset = 0;
		loop: for (; cursor < this.tokenCount; cursor++) {
			balanceEnd = this.balance[cursor];
			if (balanceEnd < startToken) break loop;
			offset = cursor > 0 ? this.offsetAndType[cursor - 1] & OFFSET_MASK : this.firstCharOffset;
			switch (stopConsume(this.source.charCodeAt(offset))) {
				case 1: break loop;
				case 2:
					cursor++;
					break loop;
				default: if (this.isBlockOpenerTokenType(this.offsetAndType[cursor] >> TYPE_SHIFT)) cursor = balanceEnd;
			}
		}
		this.skip(cursor - this.tokenIndex);
	}
	forEachToken(fn) {
		for (let i = 0, offset = this.firstCharOffset; i < this.tokenCount; i++) {
			const start = offset;
			const item = this.offsetAndType[i];
			const end = item & OFFSET_MASK;
			const type = item >> TYPE_SHIFT;
			offset = end;
			fn(type, start, end, i);
		}
	}
	dump() {
		const tokens = new Array(this.tokenCount);
		this.forEachToken((type, start, end, index) => {
			tokens[index] = {
				idx: index,
				type: names_default[type],
				chunk: this.source.substring(start, end),
				balance: this.balance[index]
			};
		});
		return tokens;
	}
};
//#endregion
//#region node_modules/css-tree/lib/tokenizer/index.js
function tokenize$1(source, onToken) {
	function getCharCode(offset) {
		return offset < sourceLength ? source.charCodeAt(offset) : 0;
	}
	function consumeNumericToken() {
		offset = consumeNumber(source, offset);
		if (isIdentifierStart(getCharCode(offset), getCharCode(offset + 1), getCharCode(offset + 2))) {
			type = 12;
			offset = consumeName(source, offset);
			return;
		}
		if (getCharCode(offset) === 37) {
			type = 11;
			offset++;
			return;
		}
		type = 10;
	}
	function consumeIdentLikeToken() {
		const nameStartOffset = offset;
		offset = consumeName(source, offset);
		if (cmpStr(source, nameStartOffset, offset, "url") && getCharCode(offset) === 40) {
			offset = findWhiteSpaceEnd(source, offset + 1);
			if (getCharCode(offset) === 34 || getCharCode(offset) === 39) {
				type = 2;
				offset = nameStartOffset + 4;
				return;
			}
			consumeUrlToken();
			return;
		}
		if (getCharCode(offset) === 40) {
			type = 2;
			offset++;
			return;
		}
		type = 1;
	}
	function consumeStringToken(endingCodePoint) {
		if (!endingCodePoint) endingCodePoint = getCharCode(offset++);
		type = 5;
		for (; offset < source.length; offset++) {
			const code = source.charCodeAt(offset);
			switch (charCodeCategory(code)) {
				case endingCodePoint:
					offset++;
					return;
				case 130:
					if (isNewline(code)) {
						offset += getNewlineLength(source, offset, code);
						type = 6;
						return;
					}
					break;
				case 92:
					if (offset === source.length - 1) break;
					const nextCode = getCharCode(offset + 1);
					if (isNewline(nextCode)) offset += getNewlineLength(source, offset + 1, nextCode);
					else if (isValidEscape(code, nextCode)) offset = consumeEscaped(source, offset) - 1;
					break;
			}
		}
	}
	function consumeUrlToken() {
		type = 7;
		offset = findWhiteSpaceEnd(source, offset);
		for (; offset < source.length; offset++) {
			const code = source.charCodeAt(offset);
			switch (charCodeCategory(code)) {
				case 41:
					offset++;
					return;
				case 130:
					offset = findWhiteSpaceEnd(source, offset);
					if (getCharCode(offset) === 41 || offset >= source.length) {
						if (offset < source.length) offset++;
						return;
					}
					offset = consumeBadUrlRemnants(source, offset);
					type = 8;
					return;
				case 34:
				case 39:
				case 40:
				case 133:
					offset = consumeBadUrlRemnants(source, offset);
					type = 8;
					return;
				case 92:
					if (isValidEscape(code, getCharCode(offset + 1))) {
						offset = consumeEscaped(source, offset) - 1;
						break;
					}
					offset = consumeBadUrlRemnants(source, offset);
					type = 8;
					return;
			}
		}
	}
	source = String(source || "");
	const sourceLength = source.length;
	let start = isBOM(getCharCode(0));
	let offset = start;
	let type;
	while (offset < sourceLength) {
		const code = source.charCodeAt(offset);
		switch (charCodeCategory(code)) {
			case 130:
				type = 13;
				offset = findWhiteSpaceEnd(source, offset + 1);
				break;
			case 34:
				consumeStringToken();
				break;
			case 35:
				if (isName(getCharCode(offset + 1)) || isValidEscape(getCharCode(offset + 1), getCharCode(offset + 2))) {
					type = 4;
					offset = consumeName(source, offset + 1);
				} else {
					type = 9;
					offset++;
				}
				break;
			case 39:
				consumeStringToken();
				break;
			case 40:
				type = 21;
				offset++;
				break;
			case 41:
				type = 22;
				offset++;
				break;
			case 43:
				if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeNumericToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 44:
				type = 18;
				offset++;
				break;
			case 45:
				if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeNumericToken();
				else if (getCharCode(offset + 1) === 45 && getCharCode(offset + 2) === 62) {
					type = 15;
					offset = offset + 3;
				} else if (isIdentifierStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeIdentLikeToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 46:
				if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeNumericToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 47:
				if (getCharCode(offset + 1) === 42) {
					type = 25;
					offset = source.indexOf("*/", offset + 2);
					offset = offset === -1 ? source.length : offset + 2;
				} else {
					type = 9;
					offset++;
				}
				break;
			case 58:
				type = 16;
				offset++;
				break;
			case 59:
				type = 17;
				offset++;
				break;
			case 60:
				if (getCharCode(offset + 1) === 33 && getCharCode(offset + 2) === 45 && getCharCode(offset + 3) === 45) {
					type = 14;
					offset = offset + 4;
				} else {
					type = 9;
					offset++;
				}
				break;
			case 64:
				if (isIdentifierStart(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
					type = 3;
					offset = consumeName(source, offset + 1);
				} else {
					type = 9;
					offset++;
				}
				break;
			case 91:
				type = 19;
				offset++;
				break;
			case 92:
				if (isValidEscape(code, getCharCode(offset + 1))) consumeIdentLikeToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 93:
				type = 20;
				offset++;
				break;
			case 123:
				type = 23;
				offset++;
				break;
			case 125:
				type = 24;
				offset++;
				break;
			case 131:
				consumeNumericToken();
				break;
			case 132:
				consumeIdentLikeToken();
				break;
			default:
				type = 9;
				offset++;
		}
		onToken(type, start, start = offset);
	}
}
//#endregion
//#region node_modules/css-tree/lib/utils/List.js
var releasedCursors = null;
var List = class List {
	static createItem(data) {
		return {
			prev: null,
			next: null,
			data
		};
	}
	constructor() {
		this.head = null;
		this.tail = null;
		this.cursor = null;
	}
	createItem(data) {
		return List.createItem(data);
	}
	allocateCursor(prev, next) {
		let cursor;
		if (releasedCursors !== null) {
			cursor = releasedCursors;
			releasedCursors = releasedCursors.cursor;
			cursor.prev = prev;
			cursor.next = next;
			cursor.cursor = this.cursor;
		} else cursor = {
			prev,
			next,
			cursor: this.cursor
		};
		this.cursor = cursor;
		return cursor;
	}
	releaseCursor() {
		const { cursor } = this;
		this.cursor = cursor.cursor;
		cursor.prev = null;
		cursor.next = null;
		cursor.cursor = releasedCursors;
		releasedCursors = cursor;
	}
	updateCursors(prevOld, prevNew, nextOld, nextNew) {
		let { cursor } = this;
		while (cursor !== null) {
			if (cursor.prev === prevOld) cursor.prev = prevNew;
			if (cursor.next === nextOld) cursor.next = nextNew;
			cursor = cursor.cursor;
		}
	}
	*[Symbol.iterator]() {
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) yield cursor.data;
	}
	get size() {
		let size = 0;
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) size++;
		return size;
	}
	get isEmpty() {
		return this.head === null;
	}
	get first() {
		return this.head && this.head.data;
	}
	get last() {
		return this.tail && this.tail.data;
	}
	fromArray(array) {
		let cursor = null;
		this.head = null;
		for (let data of array) {
			const item = List.createItem(data);
			if (cursor !== null) cursor.next = item;
			else this.head = item;
			item.prev = cursor;
			cursor = item;
		}
		this.tail = cursor;
		return this;
	}
	toArray() {
		return [...this];
	}
	toJSON() {
		return [...this];
	}
	forEach(fn, thisArg = this) {
		const cursor = this.allocateCursor(null, this.head);
		while (cursor.next !== null) {
			const item = cursor.next;
			cursor.next = item.next;
			fn.call(thisArg, item.data, item, this);
		}
		this.releaseCursor();
	}
	forEachRight(fn, thisArg = this) {
		const cursor = this.allocateCursor(this.tail, null);
		while (cursor.prev !== null) {
			const item = cursor.prev;
			cursor.prev = item.prev;
			fn.call(thisArg, item.data, item, this);
		}
		this.releaseCursor();
	}
	reduce(fn, initialValue, thisArg = this) {
		let cursor = this.allocateCursor(null, this.head);
		let acc = initialValue;
		let item;
		while (cursor.next !== null) {
			item = cursor.next;
			cursor.next = item.next;
			acc = fn.call(thisArg, acc, item.data, item, this);
		}
		this.releaseCursor();
		return acc;
	}
	reduceRight(fn, initialValue, thisArg = this) {
		let cursor = this.allocateCursor(this.tail, null);
		let acc = initialValue;
		let item;
		while (cursor.prev !== null) {
			item = cursor.prev;
			cursor.prev = item.prev;
			acc = fn.call(thisArg, acc, item.data, item, this);
		}
		this.releaseCursor();
		return acc;
	}
	some(fn, thisArg = this) {
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) if (fn.call(thisArg, cursor.data, cursor, this)) return true;
		return false;
	}
	map(fn, thisArg = this) {
		const result = new List();
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) result.appendData(fn.call(thisArg, cursor.data, cursor, this));
		return result;
	}
	filter(fn, thisArg = this) {
		const result = new List();
		for (let cursor = this.head; cursor !== null; cursor = cursor.next) if (fn.call(thisArg, cursor.data, cursor, this)) result.appendData(cursor.data);
		return result;
	}
	nextUntil(start, fn, thisArg = this) {
		if (start === null) return;
		const cursor = this.allocateCursor(null, start);
		while (cursor.next !== null) {
			const item = cursor.next;
			cursor.next = item.next;
			if (fn.call(thisArg, item.data, item, this)) break;
		}
		this.releaseCursor();
	}
	prevUntil(start, fn, thisArg = this) {
		if (start === null) return;
		const cursor = this.allocateCursor(start, null);
		while (cursor.prev !== null) {
			const item = cursor.prev;
			cursor.prev = item.prev;
			if (fn.call(thisArg, item.data, item, this)) break;
		}
		this.releaseCursor();
	}
	clear() {
		this.head = null;
		this.tail = null;
	}
	copy() {
		const result = new List();
		for (let data of this) result.appendData(data);
		return result;
	}
	prepend(item) {
		this.updateCursors(null, item, this.head, item);
		if (this.head !== null) {
			this.head.prev = item;
			item.next = this.head;
		} else this.tail = item;
		this.head = item;
		return this;
	}
	prependData(data) {
		return this.prepend(List.createItem(data));
	}
	append(item) {
		return this.insert(item);
	}
	appendData(data) {
		return this.insert(List.createItem(data));
	}
	insert(item, before = null) {
		if (before !== null) {
			this.updateCursors(before.prev, item, before, item);
			if (before.prev === null) {
				if (this.head !== before) throw new Error("before doesn't belong to list");
				this.head = item;
				before.prev = item;
				item.next = before;
				this.updateCursors(null, item);
			} else {
				before.prev.next = item;
				item.prev = before.prev;
				before.prev = item;
				item.next = before;
			}
		} else {
			this.updateCursors(this.tail, item, null, item);
			if (this.tail !== null) {
				this.tail.next = item;
				item.prev = this.tail;
			} else this.head = item;
			this.tail = item;
		}
		return this;
	}
	insertData(data, before) {
		return this.insert(List.createItem(data), before);
	}
	remove(item) {
		this.updateCursors(item, item.prev, item, item.next);
		if (item.prev !== null) item.prev.next = item.next;
		else {
			if (this.head !== item) throw new Error("item doesn't belong to list");
			this.head = item.next;
		}
		if (item.next !== null) item.next.prev = item.prev;
		else {
			if (this.tail !== item) throw new Error("item doesn't belong to list");
			this.tail = item.prev;
		}
		item.prev = null;
		item.next = null;
		return item;
	}
	push(data) {
		this.insert(List.createItem(data));
	}
	pop() {
		return this.tail !== null ? this.remove(this.tail) : null;
	}
	unshift(data) {
		this.prepend(List.createItem(data));
	}
	shift() {
		return this.head !== null ? this.remove(this.head) : null;
	}
	prependList(list) {
		return this.insertList(list, this.head);
	}
	appendList(list) {
		return this.insertList(list);
	}
	insertList(list, before) {
		if (list.head === null) return this;
		if (before !== void 0 && before !== null) {
			this.updateCursors(before.prev, list.tail, before, list.head);
			if (before.prev !== null) {
				before.prev.next = list.head;
				list.head.prev = before.prev;
			} else this.head = list.head;
			before.prev = list.tail;
			list.tail.next = before;
		} else {
			this.updateCursors(this.tail, list.tail, null, list.head);
			if (this.tail !== null) {
				this.tail.next = list.head;
				list.head.prev = this.tail;
			} else this.head = list.head;
			this.tail = list.tail;
		}
		list.head = null;
		list.tail = null;
		return this;
	}
	replace(oldItem, newItemOrList) {
		if ("head" in newItemOrList) this.insertList(newItemOrList, oldItem);
		else this.insert(newItemOrList, oldItem);
		this.remove(oldItem);
	}
};
//#endregion
//#region node_modules/css-tree/lib/utils/create-custom-error.js
function createCustomError(name, message) {
	const error = Object.create(SyntaxError.prototype);
	const errorStack = /* @__PURE__ */ new Error();
	return Object.assign(error, {
		name,
		message,
		get stack() {
			return (errorStack.stack || "").replace(/^(.+\n){1,3}/, `${name}: ${message}\n`);
		}
	});
}
//#endregion
//#region node_modules/css-tree/lib/parser/SyntaxError.js
var MAX_LINE_LENGTH = 100;
var OFFSET_CORRECTION = 60;
var TAB_REPLACEMENT = "    ";
function sourceFragment({ source, line, column, baseLine, baseColumn }, extraLines) {
	function processLines(start, end) {
		return lines.slice(start, end).map((line, idx) => String(start + idx + 1).padStart(maxNumLength) + " |" + line).join("\n");
	}
	const lines = ("\n".repeat(Math.max(baseLine - 1, 0)) + " ".repeat(Math.max(baseColumn - 1, 0)) + source).split(/\r\n?|\n|\f/);
	const startLine = Math.max(1, line - extraLines) - 1;
	const endLine = Math.min(line + extraLines, lines.length + 1);
	const maxNumLength = Math.max(4, String(endLine).length) + 1;
	let cutLeft = 0;
	column += 3 * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;
	if (column > MAX_LINE_LENGTH) {
		cutLeft = column - OFFSET_CORRECTION + 3;
		column = OFFSET_CORRECTION - 2;
	}
	for (let i = startLine; i <= endLine; i++) if (i >= 0 && i < lines.length) {
		lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
		lines[i] = (cutLeft > 0 && lines[i].length > cutLeft ? "…" : "") + lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) + (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? "…" : "");
	}
	return [
		processLines(startLine, line),
		new Array(column + maxNumLength + 2).join("-") + "^",
		processLines(line, endLine)
	].filter(Boolean).join("\n").replace(/^(\s+\d+\s+\|\n)+/, "").replace(/\n(\s+\d+\s+\|)+$/, "");
}
function SyntaxError$2(message, source, offset, line, column, baseLine = 1, baseColumn = 1) {
	return Object.assign(createCustomError("SyntaxError", message), {
		source,
		offset,
		line,
		column,
		sourceFragment(extraLines) {
			return sourceFragment({
				source,
				line,
				column,
				baseLine,
				baseColumn
			}, isNaN(extraLines) ? 0 : extraLines);
		},
		get formattedMessage() {
			return `Parse error: ${message}\n` + sourceFragment({
				source,
				line,
				column,
				baseLine,
				baseColumn
			}, 2);
		}
	});
}
//#endregion
//#region node_modules/css-tree/lib/parser/sequence.js
function readSequence(recognizer) {
	const children = this.createList();
	let space = false;
	const context = { recognizer };
	while (!this.eof) {
		switch (this.tokenType) {
			case 25:
				this.next();
				continue;
			case 13:
				space = true;
				this.next();
				continue;
		}
		let child = recognizer.getNode.call(this, context);
		if (child === void 0) break;
		if (space) {
			if (recognizer.onWhiteSpace) recognizer.onWhiteSpace.call(this, child, children, context);
			space = false;
		}
		children.push(child);
	}
	if (space && recognizer.onWhiteSpace) recognizer.onWhiteSpace.call(this, null, children, context);
	return children;
}
//#endregion
//#region node_modules/css-tree/lib/parser/create.js
var NOOP = () => {};
var EXCLAMATIONMARK$3 = 33;
var NUMBERSIGN$4 = 35;
var SEMICOLON = 59;
var LEFTCURLYBRACKET$1 = 123;
var NULL = 0;
var arrayMethods = {
	createList() {
		return [];
	},
	createSingleNodeList(node) {
		return [node];
	},
	getFirstListNode(list) {
		return list && list[0] || null;
	},
	getLastListNode(list) {
		return list && list.length > 0 ? list[list.length - 1] : null;
	}
};
var listMethods = {
	createList() {
		return new List();
	},
	createSingleNodeList(node) {
		return new List().appendData(node);
	},
	getFirstListNode(list) {
		return list && list.first;
	},
	getLastListNode(list) {
		return list && list.last;
	}
};
function createParseContext(name) {
	return function() {
		return this[name]();
	};
}
function fetchParseValues(dict) {
	const result = Object.create(null);
	for (const name of Object.keys(dict)) {
		const item = dict[name];
		const fn = item.parse || item;
		if (fn) result[name] = fn;
	}
	return result;
}
function processConfig(config) {
	const parseConfig = {
		context: Object.create(null),
		features: Object.assign(Object.create(null), config.features),
		scope: Object.assign(Object.create(null), config.scope),
		atrule: fetchParseValues(config.atrule),
		pseudo: fetchParseValues(config.pseudo),
		node: fetchParseValues(config.node)
	};
	for (const [name, context] of Object.entries(config.parseContext)) switch (typeof context) {
		case "function":
			parseConfig.context[name] = context;
			break;
		case "string":
			parseConfig.context[name] = createParseContext(context);
			break;
	}
	return {
		config: parseConfig,
		...parseConfig,
		...parseConfig.node
	};
}
function createParser(config) {
	let source = "";
	let filename = "<unknown>";
	let needPositions = false;
	let onParseError = NOOP;
	let onParseErrorThrow = false;
	const locationMap = new OffsetToLocation();
	const parser = Object.assign(new TokenStream(), processConfig(config || {}), {
		parseAtrulePrelude: true,
		parseRulePrelude: true,
		parseValue: true,
		parseCustomProperty: false,
		readSequence,
		consumeUntilBalanceEnd: () => 0,
		consumeUntilLeftCurlyBracket(code) {
			return code === LEFTCURLYBRACKET$1 ? 1 : 0;
		},
		consumeUntilLeftCurlyBracketOrSemicolon(code) {
			return code === LEFTCURLYBRACKET$1 || code === SEMICOLON ? 1 : 0;
		},
		consumeUntilExclamationMarkOrSemicolon(code) {
			return code === EXCLAMATIONMARK$3 || code === SEMICOLON ? 1 : 0;
		},
		consumeUntilSemicolonIncluded(code) {
			return code === SEMICOLON ? 2 : 0;
		},
		createList: NOOP,
		createSingleNodeList: NOOP,
		getFirstListNode: NOOP,
		getLastListNode: NOOP,
		parseWithFallback(consumer, fallback) {
			const startIndex = this.tokenIndex;
			try {
				return consumer.call(this);
			} catch (e) {
				if (onParseErrorThrow) throw e;
				this.skip(startIndex - this.tokenIndex);
				const fallbackNode = fallback.call(this);
				onParseErrorThrow = true;
				onParseError(e, fallbackNode);
				onParseErrorThrow = false;
				return fallbackNode;
			}
		},
		lookupNonWSType(offset) {
			let type;
			do {
				type = this.lookupType(offset++);
				if (type !== 13 && type !== 25) return type;
			} while (type !== NULL);
			return NULL;
		},
		charCodeAt(offset) {
			return offset >= 0 && offset < source.length ? source.charCodeAt(offset) : 0;
		},
		substring(offsetStart, offsetEnd) {
			return source.substring(offsetStart, offsetEnd);
		},
		substrToCursor(start) {
			return this.source.substring(start, this.tokenStart);
		},
		cmpChar(offset, charCode) {
			return cmpChar(source, offset, charCode);
		},
		cmpStr(offsetStart, offsetEnd, str) {
			return cmpStr(source, offsetStart, offsetEnd, str);
		},
		consume(tokenType) {
			const start = this.tokenStart;
			this.eat(tokenType);
			return this.substrToCursor(start);
		},
		consumeFunctionName() {
			const name = source.substring(this.tokenStart, this.tokenEnd - 1);
			this.eat(2);
			return name;
		},
		consumeNumber(type) {
			const number = source.substring(this.tokenStart, consumeNumber(source, this.tokenStart));
			this.eat(type);
			return number;
		},
		eat(tokenType) {
			if (this.tokenType !== tokenType) {
				const tokenName = names_default[tokenType].slice(0, -6).replace(/-/g, " ").replace(/^./, (m) => m.toUpperCase());
				let message = `${/[[\](){}]/.test(tokenName) ? `"${tokenName}"` : tokenName} is expected`;
				let offset = this.tokenStart;
				switch (tokenType) {
					case 1:
						if (this.tokenType === 2 || this.tokenType === 7) {
							offset = this.tokenEnd - 1;
							message = "Identifier is expected but function found";
						} else message = "Identifier is expected";
						break;
					case 4:
						if (this.isDelim(NUMBERSIGN$4)) {
							this.next();
							offset++;
							message = "Name is expected";
						}
						break;
					case 11:
						if (this.tokenType === 10) {
							offset = this.tokenEnd;
							message = "Percent sign is expected";
						}
						break;
				}
				this.error(message, offset);
			}
			this.next();
		},
		eatIdent(name) {
			if (this.tokenType !== 1 || this.lookupValue(0, name) === false) this.error(`Identifier "${name}" is expected`);
			this.next();
		},
		eatDelim(code) {
			if (!this.isDelim(code)) this.error(`Delim "${String.fromCharCode(code)}" is expected`);
			this.next();
		},
		getLocation(start, end) {
			if (needPositions) return locationMap.getLocationRange(start, end, filename);
			return null;
		},
		getLocationFromList(list) {
			if (needPositions) {
				const head = this.getFirstListNode(list);
				const tail = this.getLastListNode(list);
				return locationMap.getLocationRange(head !== null ? head.loc.start.offset - locationMap.startOffset : this.tokenStart, tail !== null ? tail.loc.end.offset - locationMap.startOffset : this.tokenStart, filename);
			}
			return null;
		},
		error(message, offset) {
			const location = typeof offset !== "undefined" && offset < source.length ? locationMap.getLocation(offset) : this.eof ? locationMap.getLocation(findWhiteSpaceStart(source, source.length - 1)) : locationMap.getLocation(this.tokenStart);
			throw new SyntaxError$2(message || "Unexpected input", source, location.offset, location.line, location.column, locationMap.startLine, locationMap.startColumn);
		}
	});
	const createTokenIterateAPI = () => ({
		filename,
		source,
		tokenCount: parser.tokenCount,
		getTokenType: (index) => parser.getTokenType(index),
		getTokenTypeName: (index) => names_default[parser.getTokenType(index)],
		getTokenStart: (index) => parser.getTokenStart(index),
		getTokenEnd: (index) => parser.getTokenEnd(index),
		getTokenValue: (index) => parser.source.substring(parser.getTokenStart(index), parser.getTokenEnd(index)),
		substring: (start, end) => parser.source.substring(start, end),
		balance: parser.balance.subarray(0, parser.tokenCount + 1),
		isBlockOpenerTokenType: parser.isBlockOpenerTokenType,
		isBlockCloserTokenType: parser.isBlockCloserTokenType,
		getBlockTokenPairIndex: (index) => parser.getBlockTokenPairIndex(index),
		getLocation: (offset) => locationMap.getLocation(offset, filename),
		getRangeLocation: (start, end) => locationMap.getLocationRange(start, end, filename)
	});
	const parse = function(source_, options) {
		source = source_;
		options = options || {};
		parser.setSource(source, tokenize$1);
		locationMap.setSource(source, options.offset, options.line, options.column);
		filename = options.filename || "<unknown>";
		needPositions = Boolean(options.positions);
		onParseError = typeof options.onParseError === "function" ? options.onParseError : NOOP;
		onParseErrorThrow = false;
		parser.parseAtrulePrelude = "parseAtrulePrelude" in options ? Boolean(options.parseAtrulePrelude) : true;
		parser.parseRulePrelude = "parseRulePrelude" in options ? Boolean(options.parseRulePrelude) : true;
		parser.parseValue = "parseValue" in options ? Boolean(options.parseValue) : true;
		parser.parseCustomProperty = "parseCustomProperty" in options ? Boolean(options.parseCustomProperty) : false;
		const { context = "default", list = true, onComment, onToken } = options;
		if (context in parser.context === false) throw new Error("Unknown context `" + context + "`");
		Object.assign(parser, list ? listMethods : arrayMethods);
		if (Array.isArray(onToken)) parser.forEachToken((type, start, end) => {
			onToken.push({
				type,
				start,
				end
			});
		});
		else if (typeof onToken === "function") parser.forEachToken(onToken.bind(createTokenIterateAPI()));
		if (typeof onComment === "function") parser.forEachToken((type, start, end) => {
			if (type === 25) {
				const loc = parser.getLocation(start, end);
				onComment(cmpStr(source, end - 2, end, "*/") ? source.slice(start + 2, end - 2) : source.slice(start + 2, end), loc);
			}
		});
		const ast = parser.context[context].call(parser, options);
		if (!parser.eof) parser.error();
		return ast;
	};
	return Object.assign(parse, {
		SyntaxError: SyntaxError$2,
		config: parser.config
	});
}
//#endregion
//#region node_modules/source-map-js/lib/base64.js
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function(number) {
		if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
		throw new TypeError("Must be between 0 and 63: " + number);
	};
	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function(charCode) {
		var bigA = 65;
		var bigZ = 90;
		var littleA = 97;
		var littleZ = 122;
		var zero = 48;
		var nine = 57;
		var plus = 43;
		var slash = 47;
		var littleOffset = 26;
		var numberOffset = 52;
		if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
		if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
		if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
		if (charCode == plus) return 62;
		if (charCode == slash) return 63;
		return -1;
	};
}));
//#endregion
//#region node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64 = require_base64();
	var VLQ_BASE_SHIFT = 5;
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	var VLQ_BASE_MASK = VLQ_BASE - 1;
	var VLQ_CONTINUATION_BIT = VLQ_BASE;
	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
	}
	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative ? -shifted : shifted;
	}
	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;
		var vlq = toVLQSigned(aValue);
		do {
			digit = vlq & VLQ_BASE_MASK;
			vlq >>>= VLQ_BASE_SHIFT;
			if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
			encoded += base64.encode(digit);
		} while (vlq > 0);
		return encoded;
	};
	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;
		do {
			if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
			digit = base64.decode(aStr.charCodeAt(aIndex++));
			if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
			continuation = !!(digit & VLQ_CONTINUATION_BIT);
			digit &= VLQ_BASE_MASK;
			result = result + (digit << shift);
			shift += VLQ_BASE_SHIFT;
		} while (continuation);
		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};
}));
//#endregion
//#region node_modules/source-map-js/lib/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) return aArgs[aName];
		else if (arguments.length === 3) return aDefaultValue;
		else throw new Error("\"" + aName + "\" is a required argument.");
	}
	exports.getArg = getArg;
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) return null;
		return {
			scheme: match[1],
			auth: match[2],
			host: match[3],
			port: match[4],
			path: match[5]
		};
	}
	exports.urlParse = urlParse;
	function urlGenerate(aParsedUrl) {
		var url = "";
		if (aParsedUrl.scheme) url += aParsedUrl.scheme + ":";
		url += "//";
		if (aParsedUrl.auth) url += aParsedUrl.auth + "@";
		if (aParsedUrl.host) url += aParsedUrl.host;
		if (aParsedUrl.port) url += ":" + aParsedUrl.port;
		if (aParsedUrl.path) url += aParsedUrl.path;
		return url;
	}
	exports.urlGenerate = urlGenerate;
	var MAX_CACHED_INPUTS = 32;
	/**
	* Takes some function `f(input) -> result` and returns a memoized version of
	* `f`.
	*
	* We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
	* memoization is a dumb-simple, linear least-recently-used cache.
	*/
	function lruMemoize(f) {
		var cache = [];
		return function(input) {
			for (var i = 0; i < cache.length; i++) if (cache[i].input === input) {
				var temp = cache[0];
				cache[0] = cache[i];
				cache[i] = temp;
				return cache[0].result;
			}
			var result = f(input);
			cache.unshift({
				input,
				result
			});
			if (cache.length > MAX_CACHED_INPUTS) cache.pop();
			return result;
		};
	}
	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consecutive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	var normalize = lruMemoize(function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
			if (!url.path) return aPath;
			path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);
		var parts = [];
		var start = 0;
		var i = 0;
		while (true) {
			start = i;
			i = path.indexOf("/", start);
			if (i === -1) {
				parts.push(path.slice(start));
				break;
			} else {
				parts.push(path.slice(start, i));
				while (i < path.length && path[i] === "/") i++;
			}
		}
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
			part = parts[i];
			if (part === ".") parts.splice(i, 1);
			else if (part === "..") up++;
			else if (up > 0) if (part === "") {
				parts.splice(i + 1, up);
				up = 0;
			} else {
				parts.splice(i, 2);
				up--;
			}
		}
		path = parts.join("/");
		if (path === "") path = isAbsolute ? "/" : ".";
		if (url) {
			url.path = path;
			return urlGenerate(url);
		}
		return path;
	});
	exports.normalize = normalize;
	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		if (aPath === "") aPath = ".";
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) aRoot = aRootUrl.path || "/";
		if (aPathUrl && !aPathUrl.scheme) {
			if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
			return urlGenerate(aPathUrl);
		}
		if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
			aRootUrl.host = aPath;
			return urlGenerate(aRootUrl);
		}
		var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
		if (aRootUrl) {
			aRootUrl.path = joined;
			return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;
	exports.isAbsolute = function(aPath) {
		return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
	};
	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		aRoot = aRoot.replace(/\/$/, "");
		var level = 0;
		while (aPath.indexOf(aRoot + "/") !== 0) {
			var index = aRoot.lastIndexOf("/");
			if (index < 0) return aPath;
			aRoot = aRoot.slice(0, index);
			if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
			++level;
		}
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	var supportsNullProto = function() {
		return !("__proto__" in Object.create(null));
	}();
	function identity(s) {
		return s;
	}
	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) return "$" + aStr;
		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	function fromSetString(aStr) {
		if (isProtoString(aStr)) return aStr.slice(1);
		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	function isProtoString(s) {
		if (!s) return false;
		var length = s.length;
		if (length < 9) return false;
		if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
		for (var i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
		return true;
	}
	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) return 0;
		if (aStr1 === null) return 1;
		if (aStr2 === null) return -1;
		if (aStr1 > aStr2) return 1;
		return -1;
	}
	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
	/**
	* Strip any JSON XSSI avoidance prefix from the string (as documented
	* in the source maps specification), and then parse the string as
	* JSON.
	*/
	function parseSourceMapInput(str) {
		return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
	}
	exports.parseSourceMapInput = parseSourceMapInput;
	/**
	* Compute the URL of a source given the the source root, the source's
	* URL, and the source map's URL.
	*/
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		sourceURL = sourceURL || "";
		if (sourceRoot) {
			if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") sourceRoot += "/";
			sourceURL = sourceRoot + sourceURL;
		}
		if (sourceMapURL) {
			var parsed = urlParse(sourceMapURL);
			if (!parsed) throw new Error("sourceMapURL could not be parsed");
			if (parsed.path) {
				var index = parsed.path.lastIndexOf("/");
				if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
			}
			sourceURL = join(urlGenerate(parsed), sourceURL);
		}
		return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
}));
//#endregion
//#region node_modules/source-map-js/lib/array-set.js
var require_array_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";
	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = hasNativeMap ? /* @__PURE__ */ new Map() : Object.create(null);
	}
	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
		return set;
	};
	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};
	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
		var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
		if (!isDuplicate) if (hasNativeMap) this._set.set(aStr, idx);
		else this._set[sStr] = idx;
	};
	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		if (hasNativeMap) return this._set.has(aStr);
		else {
			var sStr = util.toSetString(aStr);
			return has.call(this._set, sStr);
		}
	};
	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		if (hasNativeMap) {
			var idx = this._set.get(aStr);
			if (idx >= 0) return idx;
		} else {
			var sStr = util.toSetString(aStr);
			if (has.call(this._set, sStr)) return this._set[sStr];
		}
		throw new Error("\"" + aStr + "\" is not in the set.");
	};
	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
		throw new Error("No element indexed by " + aIdx);
	};
	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};
	exports.ArraySet = ArraySet;
}));
//#endregion
//#region node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}
	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		this._last = {
			generatedLine: -1,
			generatedColumn: 0
		};
	}
	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
	};
	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
			this._last = aMapping;
			this._array.push(aMapping);
		} else {
			this._sorted = false;
			this._array.push(aMapping);
		}
	};
	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
			this._array.sort(util.compareByGeneratedPositionsInflated);
			this._sorted = true;
		}
		return this._array;
	};
	exports.MappingList = MappingList;
}));
//#endregion
//#region node_modules/css-tree/lib/generator/sourceMap.js
var import_source_map_generator = (/* @__PURE__ */ __commonJSMin(((exports) => {
	var base64VLQ = require_base64_vlq();
	var util = require_util();
	var ArraySet = require_array_set().ArraySet;
	var MappingList = require_mapping_list().MappingList;
	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) aArgs = {};
		this._file = util.getArg(aArgs, "file", null);
		this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
		this._skipValidation = util.getArg(aArgs, "skipValidation", false);
		this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}
	SourceMapGenerator.prototype._version = 3;
	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
			file: aSourceMapConsumer.file,
			sourceRoot
		}));
		aSourceMapConsumer.eachMapping(function(mapping) {
			var newMapping = { generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			} };
			if (mapping.source != null) {
				newMapping.source = mapping.source;
				if (sourceRoot != null) newMapping.source = util.relative(sourceRoot, newMapping.source);
				newMapping.original = {
					line: mapping.originalLine,
					column: mapping.originalColumn
				};
				if (mapping.name != null) newMapping.name = mapping.name;
			}
			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var sourceRelative = sourceFile;
			if (sourceRoot !== null) sourceRelative = util.relative(sourceRoot, sourceFile);
			if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) generator.setSourceContent(sourceFile, content);
		});
		return generator;
	};
	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, "generated");
		var original = util.getArg(aArgs, "original", null);
		var source = util.getArg(aArgs, "source", null);
		var name = util.getArg(aArgs, "name", null);
		if (!this._skipValidation) {
			if (this._validateMapping(generated, original, source, name) === false) return;
		}
		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) this._sources.add(source);
		}
		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) this._names.add(name);
		}
		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source,
			name
		});
	};
	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) source = util.relative(this._sourceRoot, source);
		if (aSourceContent != null) {
			if (!this._sourcesContents) this._sourcesContents = Object.create(null);
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
		}
	};
	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.");
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
		var newSources = new ArraySet();
		var newNames = new ArraySet();
		this._mappings.unsortedForEach(function(mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
				var original = aSourceMapConsumer.originalPositionFor({
					line: mapping.originalLine,
					column: mapping.originalColumn
				});
				if (original.source != null) {
					mapping.source = original.source;
					if (aSourceMapPath != null) mapping.source = util.join(aSourceMapPath, mapping.source);
					if (sourceRoot != null) mapping.source = util.relative(sourceRoot, mapping.source);
					mapping.originalLine = original.line;
					mapping.originalColumn = original.column;
					if (original.name != null) mapping.name = original.name;
				}
			}
			var source = mapping.source;
			if (source != null && !newSources.has(source)) newSources.add(source);
			var name = mapping.name;
			if (name != null && !newNames.has(name)) newNames.add(name);
		}, this);
		this._sources = newSources;
		this._names = newNames;
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aSourceMapPath != null) sourceFile = util.join(aSourceMapPath, sourceFile);
				if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
				this.setSourceContent(sourceFile, content);
			}
		}, this);
	};
	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
		if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
			var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
		if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) return;
		else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) return;
		else {
			var message = "Invalid mapping: " + JSON.stringify({
				generated: aGenerated,
				source: aSource,
				original: aOriginal,
				name: aName
			});
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
	};
	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = "";
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;
		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = "";
			if (mapping.generatedLine !== previousGeneratedLine) {
				previousGeneratedColumn = 0;
				while (mapping.generatedLine !== previousGeneratedLine) {
					next += ";";
					previousGeneratedLine++;
				}
			} else if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
				next += ",";
			}
			next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;
			if (mapping.source != null) {
				sourceIdx = this._sources.indexOf(mapping.source);
				next += base64VLQ.encode(sourceIdx - previousSource);
				previousSource = sourceIdx;
				next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
				previousOriginalLine = mapping.originalLine - 1;
				next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
				previousOriginalColumn = mapping.originalColumn;
				if (mapping.name != null) {
					nameIdx = this._names.indexOf(mapping.name);
					next += base64VLQ.encode(nameIdx - previousName);
					previousName = nameIdx;
				}
			}
			result += next;
		}
		return result;
	};
	SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function(source) {
			if (!this._sourcesContents) return null;
			if (aSourceRoot != null) source = util.relative(aSourceRoot, source);
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
		}, this);
	};
	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) map.file = this._file;
		if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
		if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		return map;
	};
	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
	};
	exports.SourceMapGenerator = SourceMapGenerator;
})))();
var trackNodes = new Set([
	"Atrule",
	"Selector",
	"Declaration"
]);
function generateSourceMap(handlers) {
	const map = new import_source_map_generator.SourceMapGenerator();
	const generated = {
		line: 1,
		column: 0
	};
	const original = {
		line: 0,
		column: 0
	};
	const activatedGenerated = {
		line: 1,
		column: 0
	};
	const activatedMapping = { generated: activatedGenerated };
	let line = 1;
	let column = 0;
	let sourceMappingActive = false;
	const origHandlersNode = handlers.node;
	handlers.node = function(node) {
		if (node.loc && node.loc.start && trackNodes.has(node.type)) {
			const nodeLine = node.loc.start.line;
			const nodeColumn = node.loc.start.column - 1;
			if (original.line !== nodeLine || original.column !== nodeColumn) {
				original.line = nodeLine;
				original.column = nodeColumn;
				generated.line = line;
				generated.column = column;
				if (sourceMappingActive) {
					sourceMappingActive = false;
					if (generated.line !== activatedGenerated.line || generated.column !== activatedGenerated.column) map.addMapping(activatedMapping);
				}
				sourceMappingActive = true;
				map.addMapping({
					source: node.loc.source,
					original,
					generated
				});
			}
		}
		origHandlersNode.call(this, node);
		if (sourceMappingActive && trackNodes.has(node.type)) {
			activatedGenerated.line = line;
			activatedGenerated.column = column;
		}
	};
	const origHandlersEmit = handlers.emit;
	handlers.emit = function(value, type, auto) {
		for (let i = 0; i < value.length; i++) if (value.charCodeAt(i) === 10) {
			line++;
			column = 0;
		} else column++;
		origHandlersEmit(value, type, auto);
	};
	const origHandlersResult = handlers.result;
	handlers.result = function() {
		if (sourceMappingActive) map.addMapping(activatedMapping);
		return {
			css: origHandlersResult(),
			map
		};
	};
	return handlers;
}
//#endregion
//#region node_modules/css-tree/lib/generator/token-before.js
var token_before_exports = /* @__PURE__ */ __exportAll$2({
	safe: () => safe,
	spec: () => spec
});
var PLUSSIGN$9 = 43;
var HYPHENMINUS$6 = 45;
var code = (type, value) => {
	if (type === 9) type = value;
	if (typeof type === "string") type = Math.min(type.charCodeAt(0), 128) << 6;
	return type << 1;
};
var specPairs = [
	[1, 1],
	[1, 2],
	[1, 7],
	[1, 8],
	[1, "-"],
	[1, 10],
	[1, 11],
	[1, 12],
	[1, 15],
	[1, 21],
	[3, 1],
	[3, 2],
	[3, 7],
	[3, 8],
	[3, "-"],
	[3, 10],
	[3, 11],
	[3, 12],
	[3, 15],
	[4, 1],
	[4, 2],
	[4, 7],
	[4, 8],
	[4, "-"],
	[4, 10],
	[4, 11],
	[4, 12],
	[4, 15],
	[12, 1],
	[12, 2],
	[12, 7],
	[12, 8],
	[12, "-"],
	[12, 10],
	[12, 11],
	[12, 12],
	[12, 15],
	["#", 1],
	["#", 2],
	["#", 7],
	["#", 8],
	["#", "-"],
	["#", 10],
	["#", 11],
	["#", 12],
	["#", 15],
	["-", 1],
	["-", 2],
	["-", 7],
	["-", 8],
	["-", "-"],
	["-", 10],
	["-", 11],
	["-", 12],
	["-", 15],
	[10, 1],
	[10, 2],
	[10, 7],
	[10, 8],
	[10, 10],
	[10, 11],
	[10, 12],
	[10, "%"],
	[10, 15],
	["@", 1],
	["@", 2],
	["@", 7],
	["@", 8],
	["@", "-"],
	["@", 15],
	[".", 10],
	[".", 11],
	[".", 12],
	["+", 10],
	["+", 11],
	["+", 12],
	["/", "*"]
];
var safePairs = specPairs.concat([
	[1, 4],
	[12, 4],
	[4, 4],
	[3, 21],
	[3, 5],
	[3, 16],
	[11, 11],
	[11, 12],
	[11, 2],
	[11, "-"],
	[22, 1],
	[22, 2],
	[22, 11],
	[22, 12],
	[22, 4],
	[22, "-"]
]);
function createMap(pairs) {
	const isWhiteSpaceRequired = new Set(pairs.map(([prev, next]) => code(prev) << 16 | code(next)));
	return function(prevCode, type, value) {
		const nextCode = code(type, value);
		const nextCharCode = value.charCodeAt(0);
		return nextCode | (nextCharCode === HYPHENMINUS$6 && type !== 1 && type !== 2 && type !== 15 || nextCharCode === PLUSSIGN$9 ? isWhiteSpaceRequired.has((prevCode & 65534) << 16 | nextCharCode << 7) : isWhiteSpaceRequired.has((prevCode & 65534) << 16 | nextCode));
	};
}
var spec = createMap(specPairs);
var safe = createMap(safePairs);
//#endregion
//#region node_modules/css-tree/lib/generator/create.js
var REVERSESOLIDUS = 92;
function processChildren(node, delimeter) {
	if (typeof delimeter === "function") {
		let prev = null;
		node.children.forEach((node) => {
			if (prev !== null) delimeter.call(this, prev);
			this.node(node);
			prev = node;
		});
		return;
	}
	node.children.forEach(this.node, this);
}
function createGenerator$1(config) {
	const types = /* @__PURE__ */ new Map();
	for (let [name, item] of Object.entries(config.node)) if (typeof (item.generate || item) === "function") types.set(name, item.generate || item);
	return function(node, options) {
		let buffer = "";
		let prevCode = 0;
		let handlers = {
			node(node) {
				if (types.has(node.type)) types.get(node.type).call(publicApi, node);
				else throw new Error("Unknown node type: " + node.type);
			},
			tokenBefore: safe,
			token(type, value, suppressAutoWhiteSpace) {
				prevCode = this.tokenBefore(prevCode, type, value);
				if (!suppressAutoWhiteSpace && prevCode & 1) this.emit(" ", 13, true);
				this.emit(value, type, false);
				if (type === 9 && value.charCodeAt(0) === REVERSESOLIDUS) this.emit("\n", 13, true);
			},
			emit(value) {
				buffer += value;
			},
			result() {
				return buffer;
			}
		};
		if (options) {
			if (typeof options.decorator === "function") handlers = options.decorator(handlers);
			if (options.sourceMap) handlers = generateSourceMap(handlers);
			if (options.mode in token_before_exports) handlers.tokenBefore = token_before_exports[options.mode];
		}
		const publicApi = {
			node: (node) => handlers.node(node),
			children: processChildren,
			token: (type, value) => handlers.token(type, value),
			tokenize: (raw) => tokenize$1(raw, (type, start, end) => {
				handlers.token(type, raw.slice(start, end), start !== 0);
			})
		};
		handlers.node(node);
		return handlers.result();
	};
}
//#endregion
//#region node_modules/css-tree/lib/convertor/create.js
function createConvertor(walk) {
	return {
		fromPlainObject(ast) {
			walk(ast, { enter(node) {
				if (node.children && node.children instanceof List === false) node.children = new List().fromArray(node.children);
			} });
			return ast;
		},
		toPlainObject(ast) {
			walk(ast, { leave(node) {
				if (node.children && node.children instanceof List) node.children = node.children.toArray();
			} });
			return ast;
		}
	};
}
//#endregion
//#region node_modules/css-tree/lib/walker/create.js
var { hasOwnProperty: hasOwnProperty$3 } = Object.prototype;
var noop$3 = function() {};
function ensureFunction$1(value) {
	return typeof value === "function" ? value : noop$3;
}
function invokeForType(fn, type) {
	return function(node, item, list) {
		if (node.type === type) fn.call(this, node, item, list);
	};
}
function getWalkersFromStructure(name, nodeType) {
	const structure = nodeType.structure;
	const walkers = [];
	for (const key in structure) {
		if (hasOwnProperty$3.call(structure, key) === false) continue;
		let fieldTypes = structure[key];
		const walker = {
			name: key,
			type: false,
			nullable: false
		};
		if (!Array.isArray(fieldTypes)) fieldTypes = [fieldTypes];
		for (const fieldType of fieldTypes) if (fieldType === null) walker.nullable = true;
		else if (typeof fieldType === "string") walker.type = "node";
		else if (Array.isArray(fieldType)) walker.type = "list";
		if (walker.type) walkers.push(walker);
	}
	if (walkers.length) return {
		context: nodeType.walkContext,
		fields: walkers
	};
	return null;
}
function getTypesFromConfig(config) {
	const types = {};
	for (const name in config.node) if (hasOwnProperty$3.call(config.node, name)) {
		const nodeType = config.node[name];
		if (!nodeType.structure) throw new Error("Missed `structure` field in `" + name + "` node type definition");
		types[name] = getWalkersFromStructure(name, nodeType);
	}
	return types;
}
function createTypeIterator(config, reverse) {
	const fields = config.fields.slice();
	const contextName = config.context;
	const useContext = typeof contextName === "string";
	if (reverse) fields.reverse();
	return function(node, context, walk, walkReducer) {
		let prevContextValue;
		if (useContext) {
			prevContextValue = context[contextName];
			context[contextName] = node;
		}
		for (const field of fields) {
			const ref = node[field.name];
			if (!field.nullable || ref) {
				if (field.type === "list") {
					if (reverse ? ref.reduceRight(walkReducer, false) : ref.reduce(walkReducer, false)) return true;
				} else if (walk(ref)) return true;
			}
		}
		if (useContext) context[contextName] = prevContextValue;
	};
}
function createFastTraveralMap({ StyleSheet, Atrule, Rule, Block, DeclarationList }) {
	return {
		Atrule: {
			StyleSheet,
			Atrule,
			Rule,
			Block
		},
		Rule: {
			StyleSheet,
			Atrule,
			Rule,
			Block
		},
		Declaration: {
			StyleSheet,
			Atrule,
			Rule,
			Block,
			DeclarationList
		}
	};
}
function createWalker(config) {
	const types = getTypesFromConfig(config);
	const iteratorsNatural = {};
	const iteratorsReverse = {};
	const breakWalk = Symbol("break-walk");
	const skipNode = Symbol("skip-node");
	for (const name in types) if (hasOwnProperty$3.call(types, name) && types[name] !== null) {
		iteratorsNatural[name] = createTypeIterator(types[name], false);
		iteratorsReverse[name] = createTypeIterator(types[name], true);
	}
	const fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
	const fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);
	const walk = function(root, options) {
		function walkNode(node, item, list) {
			const enterRet = enter.call(context, node, item, list);
			if (enterRet === breakWalk) return true;
			if (enterRet === skipNode) return false;
			if (iterators.hasOwnProperty(node.type)) {
				if (iterators[node.type](node, context, walkNode, walkReducer)) return true;
			}
			if (leave.call(context, node, item, list) === breakWalk) return true;
			return false;
		}
		let enter = noop$3;
		let leave = noop$3;
		let iterators = iteratorsNatural;
		let walkReducer = (ret, data, item, list) => ret || walkNode(data, item, list);
		const context = {
			break: breakWalk,
			skip: skipNode,
			root,
			stylesheet: null,
			atrule: null,
			atrulePrelude: null,
			rule: null,
			selector: null,
			block: null,
			declaration: null,
			function: null
		};
		if (typeof options === "function") enter = options;
		else if (options) {
			enter = ensureFunction$1(options.enter);
			leave = ensureFunction$1(options.leave);
			if (options.reverse) iterators = iteratorsReverse;
			if (options.visit) {
				if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) iterators = options.reverse ? fastTraversalIteratorsReverse[options.visit] : fastTraversalIteratorsNatural[options.visit];
				else if (!types.hasOwnProperty(options.visit)) throw new Error("Bad value `" + options.visit + "` for `visit` option (should be: " + Object.keys(types).sort().join(", ") + ")");
				enter = invokeForType(enter, options.visit);
				leave = invokeForType(leave, options.visit);
			}
		}
		if (enter === noop$3 && leave === noop$3) throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
		walkNode(root);
	};
	walk.break = breakWalk;
	walk.skip = skipNode;
	walk.find = function(ast, fn) {
		let found = null;
		walk(ast, function(node, item, list) {
			if (fn.call(this, node, item, list)) {
				found = node;
				return breakWalk;
			}
		});
		return found;
	};
	walk.findLast = function(ast, fn) {
		let found = null;
		walk(ast, {
			reverse: true,
			enter(node, item, list) {
				if (fn.call(this, node, item, list)) {
					found = node;
					return breakWalk;
				}
			}
		});
		return found;
	};
	walk.findAll = function(ast, fn) {
		const found = [];
		walk(ast, function(node, item, list) {
			if (fn.call(this, node, item, list)) found.push(node);
		});
		return found;
	};
	return walk;
}
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/generate.js
function noop$2(value) {
	return value;
}
function generateMultiplier(multiplier) {
	const { min, max, comma } = multiplier;
	if (min === 0 && max === 0) return comma ? "#?" : "*";
	if (min === 0 && max === 1) return "?";
	if (min === 1 && max === 0) return comma ? "#" : "+";
	if (min === 1 && max === 1) return "";
	return (comma ? "#" : "") + (min === max ? "{" + min + "}" : "{" + min + "," + (max !== 0 ? max : "") + "}");
}
function generateTypeOpts(node) {
	switch (node.type) {
		case "Range": return " [" + (node.min === null ? "-∞" : node.min) + "," + (node.max === null ? "∞" : node.max) + "]";
		default: throw new Error("Unknown node type `" + node.type + "`");
	}
}
function generateSequence(node, decorate, forceBraces, compact) {
	const combinator = node.combinator === " " || compact ? node.combinator : " " + node.combinator + " ";
	const result = node.terms.map((term) => internalGenerate(term, decorate, forceBraces, compact)).join(combinator);
	if (node.explicit || forceBraces) return (compact || result[0] === "," ? "[" : "[ ") + result + (compact ? "]" : " ]");
	return result;
}
function internalGenerate(node, decorate, forceBraces, compact) {
	let result;
	switch (node.type) {
		case "Group":
			result = generateSequence(node, decorate, forceBraces, compact) + (node.disallowEmpty ? "!" : "");
			break;
		case "Multiplier": return internalGenerate(node.term, decorate, forceBraces, compact) + decorate(generateMultiplier(node), node);
		case "Boolean":
			result = "<boolean-expr[" + internalGenerate(node.term, decorate, forceBraces, compact) + "]>";
			break;
		case "Type":
			result = "<" + node.name + (node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : "") + ">";
			break;
		case "Property":
			result = "<'" + node.name + "'>";
			break;
		case "Keyword":
			result = node.name;
			break;
		case "AtKeyword":
			result = "@" + node.name;
			break;
		case "Function":
			result = node.name + "(";
			break;
		case "String":
		case "Token":
			result = node.value;
			break;
		case "Comma":
			result = ",";
			break;
		default: throw new Error("Unknown node type `" + node.type + "`");
	}
	return decorate(result, node);
}
function generate$50(node, options) {
	let decorate = noop$2;
	let forceBraces = false;
	let compact = false;
	if (typeof options === "function") decorate = options;
	else if (options) {
		forceBraces = Boolean(options.forceBraces);
		compact = Boolean(options.compact);
		if (typeof options.decorate === "function") decorate = options.decorate;
	}
	return internalGenerate(node, decorate, forceBraces, compact);
}
//#endregion
//#region node_modules/css-tree/lib/lexer/error.js
var defaultLoc = {
	offset: 0,
	line: 1,
	column: 1
};
function locateMismatch(matchResult, node) {
	const tokens = matchResult.tokens;
	const longestMatch = matchResult.longestMatch;
	const mismatchNode = longestMatch < tokens.length ? tokens[longestMatch].node || null : null;
	const badNode = mismatchNode !== node ? mismatchNode : null;
	let mismatchOffset = 0;
	let mismatchLength = 0;
	let entries = 0;
	let css = "";
	let start;
	let end;
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i].value;
		if (i === longestMatch) {
			mismatchLength = token.length;
			mismatchOffset = css.length;
		}
		if (badNode !== null && tokens[i].node === badNode) if (i <= longestMatch) entries++;
		else entries = 0;
		css += token;
	}
	if (longestMatch === tokens.length || entries > 1) {
		start = fromLoc(badNode || node, "end") || buildLoc(defaultLoc, css);
		end = buildLoc(start);
	} else {
		start = fromLoc(badNode, "start") || buildLoc(fromLoc(node, "start") || defaultLoc, css.slice(0, mismatchOffset));
		end = fromLoc(badNode, "end") || buildLoc(start, css.substr(mismatchOffset, mismatchLength));
	}
	return {
		css,
		mismatchOffset,
		mismatchLength,
		start,
		end
	};
}
function fromLoc(node, point) {
	const value = node && node.loc && node.loc[point];
	if (value) return "line" in value ? buildLoc(value) : value;
	return null;
}
function buildLoc({ offset, line, column }, extra) {
	const loc = {
		offset,
		line,
		column
	};
	if (extra) {
		const lines = extra.split(/\n|\r\n?|\f/);
		loc.offset += extra.length;
		loc.line += lines.length - 1;
		loc.column = lines.length === 1 ? loc.column + extra.length : lines.pop().length + 1;
	}
	return loc;
}
var SyntaxReferenceError = function(type, referenceName) {
	const error = createCustomError("SyntaxReferenceError", type + (referenceName ? " `" + referenceName + "`" : ""));
	error.reference = referenceName;
	return error;
};
var SyntaxMatchError = function(message, syntax, node, matchResult) {
	const error = createCustomError("SyntaxMatchError", message);
	const { css, mismatchOffset, mismatchLength, start, end } = locateMismatch(matchResult, node);
	error.rawMessage = message;
	error.syntax = syntax ? generate$50(syntax) : "<generic>";
	error.css = css;
	error.mismatchOffset = mismatchOffset;
	error.mismatchLength = mismatchLength;
	error.message = message + "\n  syntax: " + error.syntax + "\n   value: " + (css || "<empty string>") + "\n  --------" + new Array(error.mismatchOffset + 1).join("-") + "^";
	Object.assign(error, start);
	error.loc = {
		source: node && node.loc && node.loc.source || "<unknown>",
		start,
		end
	};
	return error;
};
//#endregion
//#region node_modules/css-tree/lib/utils/names.js
var keywords = /* @__PURE__ */ new Map();
var properties = /* @__PURE__ */ new Map();
var HYPHENMINUS$5 = 45;
var keyword = getKeywordDescriptor;
var property = getPropertyDescriptor;
function isCustomProperty(str, offset) {
	offset = offset || 0;
	return str.length - offset >= 2 && str.charCodeAt(offset) === HYPHENMINUS$5 && str.charCodeAt(offset + 1) === HYPHENMINUS$5;
}
function getVendorPrefix(str, offset) {
	offset = offset || 0;
	if (str.length - offset >= 3) {
		if (str.charCodeAt(offset) === HYPHENMINUS$5 && str.charCodeAt(offset + 1) !== HYPHENMINUS$5) {
			const secondDashIndex = str.indexOf("-", offset + 2);
			if (secondDashIndex !== -1) return str.substring(offset, secondDashIndex + 1);
		}
	}
	return "";
}
function getKeywordDescriptor(keyword) {
	if (keywords.has(keyword)) return keywords.get(keyword);
	const name = keyword.toLowerCase();
	let descriptor = keywords.get(name);
	if (descriptor === void 0) {
		const custom = isCustomProperty(name, 0);
		const vendor = !custom ? getVendorPrefix(name, 0) : "";
		descriptor = Object.freeze({
			basename: name.substr(vendor.length),
			name,
			prefix: vendor,
			vendor,
			custom
		});
	}
	keywords.set(keyword, descriptor);
	return descriptor;
}
function getPropertyDescriptor(property) {
	if (properties.has(property)) return properties.get(property);
	let name = property;
	let hack = property[0];
	if (hack === "/") hack = property[1] === "/" ? "//" : "/";
	else if (hack !== "_" && hack !== "*" && hack !== "$" && hack !== "#" && hack !== "+" && hack !== "&") hack = "";
	const custom = isCustomProperty(name, hack.length);
	if (!custom) {
		name = name.toLowerCase();
		if (properties.has(name)) {
			const descriptor = properties.get(name);
			properties.set(property, descriptor);
			return descriptor;
		}
	}
	const vendor = !custom ? getVendorPrefix(name, hack.length) : "";
	const prefix = name.substr(0, hack.length + vendor.length);
	const descriptor = Object.freeze({
		basename: name.substr(prefix.length),
		name: name.substr(hack.length),
		hack,
		vendor,
		prefix,
		custom
	});
	properties.set(property, descriptor);
	return descriptor;
}
//#endregion
//#region node_modules/css-tree/lib/lexer/generic-const.js
var cssWideKeywords = [
	"initial",
	"inherit",
	"unset",
	"revert",
	"revert-layer"
];
//#endregion
//#region node_modules/css-tree/lib/lexer/generic-an-plus-b.js
var PLUSSIGN$8 = 43;
var HYPHENMINUS$4 = 45;
var N$3 = 110;
var DISALLOW_SIGN$1 = true;
var ALLOW_SIGN$1 = false;
function isDelim$1(token, code) {
	return token !== null && token.type === 9 && token.value.charCodeAt(0) === code;
}
function skipSC(token, offset, getNextToken) {
	while (token !== null && (token.type === 13 || token.type === 25)) token = getNextToken(++offset);
	return offset;
}
function checkInteger$1(token, valueOffset, disallowSign, offset) {
	if (!token) return 0;
	const code = token.value.charCodeAt(valueOffset);
	if (code === PLUSSIGN$8 || code === HYPHENMINUS$4) {
		if (disallowSign) return 0;
		valueOffset++;
	}
	for (; valueOffset < token.value.length; valueOffset++) if (!isDigit(token.value.charCodeAt(valueOffset))) return 0;
	return offset + 1;
}
function consumeB$1(token, offset_, getNextToken) {
	let sign = false;
	let offset = skipSC(token, offset_, getNextToken);
	token = getNextToken(offset);
	if (token === null) return offset_;
	if (token.type !== 10) if (isDelim$1(token, PLUSSIGN$8) || isDelim$1(token, HYPHENMINUS$4)) {
		sign = true;
		offset = skipSC(getNextToken(++offset), offset, getNextToken);
		token = getNextToken(offset);
		if (token === null || token.type !== 10) return 0;
	} else return offset_;
	if (!sign) {
		const code = token.value.charCodeAt(0);
		if (code !== PLUSSIGN$8 && code !== HYPHENMINUS$4) return 0;
	}
	return checkInteger$1(token, sign ? 0 : 1, sign, offset);
}
function anPlusB(token, getNextToken) {
	let offset = 0;
	if (!token) return 0;
	if (token.type === 10) return checkInteger$1(token, 0, ALLOW_SIGN$1, offset);
	else if (token.type === 1 && token.value.charCodeAt(0) === HYPHENMINUS$4) {
		if (!cmpChar(token.value, 1, N$3)) return 0;
		switch (token.value.length) {
			case 2: return consumeB$1(getNextToken(++offset), offset, getNextToken);
			case 3:
				if (token.value.charCodeAt(2) !== HYPHENMINUS$4) return 0;
				offset = skipSC(getNextToken(++offset), offset, getNextToken);
				token = getNextToken(offset);
				return checkInteger$1(token, 0, DISALLOW_SIGN$1, offset);
			default:
				if (token.value.charCodeAt(2) !== HYPHENMINUS$4) return 0;
				return checkInteger$1(token, 3, DISALLOW_SIGN$1, offset);
		}
	} else if (token.type === 1 || isDelim$1(token, PLUSSIGN$8) && getNextToken(offset + 1).type === 1) {
		if (token.type !== 1) token = getNextToken(++offset);
		if (token === null || !cmpChar(token.value, 0, N$3)) return 0;
		switch (token.value.length) {
			case 1: return consumeB$1(getNextToken(++offset), offset, getNextToken);
			case 2:
				if (token.value.charCodeAt(1) !== HYPHENMINUS$4) return 0;
				offset = skipSC(getNextToken(++offset), offset, getNextToken);
				token = getNextToken(offset);
				return checkInteger$1(token, 0, DISALLOW_SIGN$1, offset);
			default:
				if (token.value.charCodeAt(1) !== HYPHENMINUS$4) return 0;
				return checkInteger$1(token, 2, DISALLOW_SIGN$1, offset);
		}
	} else if (token.type === 12) {
		let code = token.value.charCodeAt(0);
		let sign = code === PLUSSIGN$8 || code === HYPHENMINUS$4 ? 1 : 0;
		let i = sign;
		for (; i < token.value.length; i++) if (!isDigit(token.value.charCodeAt(i))) break;
		if (i === sign) return 0;
		if (!cmpChar(token.value, i, N$3)) return 0;
		if (i + 1 === token.value.length) return consumeB$1(getNextToken(++offset), offset, getNextToken);
		else {
			if (token.value.charCodeAt(i + 1) !== HYPHENMINUS$4) return 0;
			if (i + 2 === token.value.length) {
				offset = skipSC(getNextToken(++offset), offset, getNextToken);
				token = getNextToken(offset);
				return checkInteger$1(token, 0, DISALLOW_SIGN$1, offset);
			} else return checkInteger$1(token, i + 2, DISALLOW_SIGN$1, offset);
		}
	}
	return 0;
}
//#endregion
//#region node_modules/css-tree/lib/lexer/generic-urange.js
var PLUSSIGN$7 = 43;
var HYPHENMINUS$3 = 45;
var QUESTIONMARK$2 = 63;
var U$1 = 117;
function isDelim(token, code) {
	return token !== null && token.type === 9 && token.value.charCodeAt(0) === code;
}
function startsWith$1(token, code) {
	return token.value.charCodeAt(0) === code;
}
function hexSequence(token, offset, allowDash) {
	let hexlen = 0;
	for (let pos = offset; pos < token.value.length; pos++) {
		const code = token.value.charCodeAt(pos);
		if (code === HYPHENMINUS$3 && allowDash && hexlen !== 0) {
			hexSequence(token, offset + hexlen + 1, false);
			return 6;
		}
		if (!isHexDigit(code)) return 0;
		if (++hexlen > 6) return 0;
	}
	return hexlen;
}
function withQuestionMarkSequence(consumed, length, getNextToken) {
	if (!consumed) return 0;
	while (isDelim(getNextToken(length), QUESTIONMARK$2)) {
		if (++consumed > 6) return 0;
		length++;
	}
	return length;
}
function urange(token, getNextToken) {
	let length = 0;
	if (token === null || token.type !== 1 || !cmpChar(token.value, 0, U$1)) return 0;
	token = getNextToken(++length);
	if (token === null) return 0;
	if (isDelim(token, PLUSSIGN$7)) {
		token = getNextToken(++length);
		if (token === null) return 0;
		if (token.type === 1) return withQuestionMarkSequence(hexSequence(token, 0, true), ++length, getNextToken);
		if (isDelim(token, QUESTIONMARK$2)) return withQuestionMarkSequence(1, ++length, getNextToken);
		return 0;
	}
	if (token.type === 10) {
		const consumedHexLength = hexSequence(token, 1, true);
		if (consumedHexLength === 0) return 0;
		token = getNextToken(++length);
		if (token === null) return length;
		if (token.type === 12 || token.type === 10) {
			if (!startsWith$1(token, HYPHENMINUS$3) || !hexSequence(token, 1, false)) return 0;
			return length + 1;
		}
		return withQuestionMarkSequence(consumedHexLength, length, getNextToken);
	}
	if (token.type === 12) return withQuestionMarkSequence(hexSequence(token, 1, true), ++length, getNextToken);
	return 0;
}
//#endregion
//#region node_modules/css-tree/lib/lexer/generic.js
var calcFunctionNames = [
	"calc(",
	"-moz-calc(",
	"-webkit-calc("
];
var comparisonFunctionNames = [
	"min(",
	"max(",
	"clamp("
];
var steppedValueFunctionNames = [
	"round(",
	"mod(",
	"rem("
];
var trigNumberFunctionNames = [
	"sin(",
	"cos(",
	"tan("
];
var trigAngleFunctionNames = [
	"asin(",
	"acos(",
	"atan(",
	"atan2("
];
var otherNumberFunctionNames = [
	"pow(",
	"sqrt(",
	"log(",
	"exp(",
	"sign("
];
var expNumberDimensionPercentageFunctionNames = ["hypot("];
var signFunctionNames = ["abs("];
var numberFunctionNames = [
	...calcFunctionNames,
	...comparisonFunctionNames,
	...steppedValueFunctionNames,
	...trigNumberFunctionNames,
	...otherNumberFunctionNames,
	...expNumberDimensionPercentageFunctionNames,
	...signFunctionNames
];
var percentageFunctionNames = [
	...calcFunctionNames,
	...comparisonFunctionNames,
	...steppedValueFunctionNames,
	...expNumberDimensionPercentageFunctionNames,
	...signFunctionNames
];
var dimensionFunctionNames = [
	...calcFunctionNames,
	...comparisonFunctionNames,
	...steppedValueFunctionNames,
	...trigAngleFunctionNames,
	...expNumberDimensionPercentageFunctionNames,
	...signFunctionNames
];
var balancePair = new Map([
	[2, 22],
	[21, 22],
	[19, 20],
	[23, 24]
]);
function charCodeAt(str, index) {
	return index < str.length ? str.charCodeAt(index) : 0;
}
function eqStr(actual, expected) {
	return cmpStr(actual, 0, actual.length, expected);
}
function eqStrAny(actual, expected) {
	for (let i = 0; i < expected.length; i++) if (eqStr(actual, expected[i])) return true;
	return false;
}
function isPostfixIeHack(str, offset) {
	if (offset !== str.length - 2) return false;
	return charCodeAt(str, offset) === 92 && isDigit(charCodeAt(str, offset + 1));
}
function outOfRange(opts, value, numEnd) {
	if (opts && opts.type === "Range") {
		const num = Number(numEnd !== void 0 && numEnd !== value.length ? value.substr(0, numEnd) : value);
		if (isNaN(num)) return true;
		if (opts.min !== null && num < opts.min && typeof opts.min !== "string") return true;
		if (opts.max !== null && num > opts.max && typeof opts.max !== "string") return true;
	}
	return false;
}
function consumeFunction(token, getNextToken) {
	let balanceCloseType = 0;
	let balanceStash = [];
	let length = 0;
	scan: do {
		switch (token.type) {
			case 24:
			case 22:
			case 20:
				if (token.type !== balanceCloseType) break scan;
				balanceCloseType = balanceStash.pop();
				if (balanceStash.length === 0) {
					length++;
					break scan;
				}
				break;
			case 2:
			case 21:
			case 19:
			case 23:
				balanceStash.push(balanceCloseType);
				balanceCloseType = balancePair.get(token.type);
				break;
		}
		length++;
	} while (token = getNextToken(length));
	return length;
}
function math(next, functionNames) {
	return function(token, getNextToken, opts) {
		if (token === null) return 0;
		if (token.type === 2 && eqStrAny(token.value, functionNames)) return consumeFunction(token, getNextToken);
		return next(token, getNextToken, opts);
	};
}
function tokenType(expectedTokenType) {
	return function(token) {
		if (token === null || token.type !== expectedTokenType) return 0;
		return 1;
	};
}
function customIdent(token) {
	if (token === null || token.type !== 1) return 0;
	const name = token.value.toLowerCase();
	if (eqStrAny(name, cssWideKeywords)) return 0;
	if (eqStr(name, "default")) return 0;
	return 1;
}
function dashedIdent(token) {
	if (token === null || token.type !== 1) return 0;
	if (charCodeAt(token.value, 0) !== 45 || charCodeAt(token.value, 1) !== 45) return 0;
	return 1;
}
function customPropertyName(token) {
	if (!dashedIdent(token)) return 0;
	if (token.value === "--") return 0;
	return 1;
}
function hexColor(token) {
	if (token === null || token.type !== 4) return 0;
	const length = token.value.length;
	if (length !== 4 && length !== 5 && length !== 7 && length !== 9) return 0;
	for (let i = 1; i < length; i++) if (!isHexDigit(charCodeAt(token.value, i))) return 0;
	return 1;
}
function idSelector(token) {
	if (token === null || token.type !== 4) return 0;
	if (!isIdentifierStart(charCodeAt(token.value, 1), charCodeAt(token.value, 2), charCodeAt(token.value, 3))) return 0;
	return 1;
}
function declarationValue(token, getNextToken) {
	if (!token) return 0;
	let balanceCloseType = 0;
	let balanceStash = [];
	let length = 0;
	scan: do {
		switch (token.type) {
			case 6:
			case 8: break scan;
			case 24:
			case 22:
			case 20:
				if (token.type !== balanceCloseType) break scan;
				balanceCloseType = balanceStash.pop();
				break;
			case 17:
				if (balanceCloseType === 0) break scan;
				break;
			case 9:
				if (balanceCloseType === 0 && token.value === "!") break scan;
				break;
			case 2:
			case 21:
			case 19:
			case 23:
				balanceStash.push(balanceCloseType);
				balanceCloseType = balancePair.get(token.type);
				break;
		}
		length++;
	} while (token = getNextToken(length));
	return length;
}
function anyValue(token, getNextToken) {
	if (!token) return 0;
	let balanceCloseType = 0;
	let balanceStash = [];
	let length = 0;
	scan: do {
		switch (token.type) {
			case 6:
			case 8: break scan;
			case 24:
			case 22:
			case 20:
				if (token.type !== balanceCloseType) break scan;
				balanceCloseType = balanceStash.pop();
				break;
			case 2:
			case 21:
			case 19:
			case 23:
				balanceStash.push(balanceCloseType);
				balanceCloseType = balancePair.get(token.type);
				break;
		}
		length++;
	} while (token = getNextToken(length));
	return length;
}
function dimension(type) {
	if (type) type = new Set(type);
	return function(token, getNextToken, opts) {
		if (token === null || token.type !== 12) return 0;
		const numberEnd = consumeNumber(token.value, 0);
		if (type !== null) {
			const reverseSolidusOffset = token.value.indexOf("\\", numberEnd);
			const unit = reverseSolidusOffset === -1 || !isPostfixIeHack(token.value, reverseSolidusOffset) ? token.value.substr(numberEnd) : token.value.substring(numberEnd, reverseSolidusOffset);
			if (type.has(unit.toLowerCase()) === false) return 0;
		}
		if (outOfRange(opts, token.value, numberEnd)) return 0;
		return 1;
	};
}
function percentage(token, getNextToken, opts) {
	if (token === null || token.type !== 11) return 0;
	if (outOfRange(opts, token.value, token.value.length - 1)) return 0;
	return 1;
}
function zero(next) {
	if (typeof next !== "function") next = function() {
		return 0;
	};
	return function(token, getNextToken, opts) {
		if (token !== null && token.type === 10) {
			if (Number(token.value) === 0) return 1;
		}
		return next(token, getNextToken, opts);
	};
}
function number(token, getNextToken, opts) {
	if (token === null) return 0;
	const numberEnd = consumeNumber(token.value, 0);
	if (!(numberEnd === token.value.length) && !isPostfixIeHack(token.value, numberEnd)) return 0;
	if (outOfRange(opts, token.value, numberEnd)) return 0;
	return 1;
}
function integer(token, getNextToken, opts) {
	if (token === null || token.type !== 10) return 0;
	let i = charCodeAt(token.value, 0) === 43 || charCodeAt(token.value, 0) === 45 ? 1 : 0;
	for (; i < token.value.length; i++) if (!isDigit(charCodeAt(token.value, i))) return 0;
	if (outOfRange(opts, token.value, i)) return 0;
	return 1;
}
var tokenTypes = {
	"ident-token": tokenType(1),
	"function-token": tokenType(2),
	"at-keyword-token": tokenType(3),
	"hash-token": tokenType(4),
	"string-token": tokenType(5),
	"bad-string-token": tokenType(6),
	"url-token": tokenType(7),
	"bad-url-token": tokenType(8),
	"delim-token": tokenType(9),
	"number-token": tokenType(10),
	"percentage-token": tokenType(11),
	"dimension-token": tokenType(12),
	"whitespace-token": tokenType(13),
	"CDO-token": tokenType(14),
	"CDC-token": tokenType(15),
	"colon-token": tokenType(16),
	"semicolon-token": tokenType(17),
	"comma-token": tokenType(18),
	"[-token": tokenType(19),
	"]-token": tokenType(20),
	"(-token": tokenType(21),
	")-token": tokenType(22),
	"{-token": tokenType(23),
	"}-token": tokenType(24)
};
var productionTypes = {
	"string": tokenType(5),
	"ident": tokenType(1),
	"percentage": math(percentage, percentageFunctionNames),
	"zero": zero(),
	"number": math(number, numberFunctionNames),
	"integer": math(integer, numberFunctionNames),
	"custom-ident": customIdent,
	"dashed-ident": dashedIdent,
	"custom-property-name": customPropertyName,
	"hex-color": hexColor,
	"id-selector": idSelector,
	"an-plus-b": anPlusB,
	"urange": urange,
	"declaration-value": declarationValue,
	"any-value": anyValue
};
var unitGroups = [
	"length",
	"angle",
	"time",
	"frequency",
	"resolution",
	"flex",
	"decibel",
	"semitones"
];
function createDemensionTypes(units) {
	const { angle, decibel, frequency, flex, length, resolution, semitones, time } = units || {};
	return {
		"dimension": math(dimension(null), dimensionFunctionNames),
		"angle": math(dimension(angle), dimensionFunctionNames),
		"decibel": math(dimension(decibel), dimensionFunctionNames),
		"frequency": math(dimension(frequency), dimensionFunctionNames),
		"flex": math(dimension(flex), dimensionFunctionNames),
		"length": math(zero(dimension(length)), dimensionFunctionNames),
		"resolution": math(dimension(resolution), dimensionFunctionNames),
		"semitones": math(dimension(semitones), dimensionFunctionNames),
		"time": math(dimension(time), dimensionFunctionNames)
	};
}
function createAttrUnit(units) {
	const unitSet = /* @__PURE__ */ new Set();
	for (const group of unitGroups) if (Array.isArray(units[group])) for (const unit of units[group]) unitSet.add(unit.toLowerCase());
	return function attrUnit(token) {
		if (token === null) return 0;
		if (token.type === 9 && token.value === "%") return 1;
		if (token.type === 1 && unitSet.has(token.value.toLowerCase())) return 1;
		return 0;
	};
}
function createGenericTypes(units) {
	return {
		...tokenTypes,
		...productionTypes,
		...createDemensionTypes(units),
		"attr-unit": createAttrUnit(units)
	};
}
//#endregion
//#region node_modules/css-tree/lib/lexer/units.js
var units_exports = /* @__PURE__ */ __exportAll$2({
	angle: () => angle,
	decibel: () => decibel,
	flex: () => flex,
	frequency: () => frequency,
	length: () => length,
	resolution: () => resolution,
	semitones: () => semitones,
	time: () => time
});
var length = [
	"cm",
	"mm",
	"q",
	"in",
	"pt",
	"pc",
	"px",
	"em",
	"rem",
	"ex",
	"rex",
	"cap",
	"rcap",
	"ch",
	"rch",
	"ic",
	"ric",
	"lh",
	"rlh",
	"vw",
	"svw",
	"lvw",
	"dvw",
	"vh",
	"svh",
	"lvh",
	"dvh",
	"vi",
	"svi",
	"lvi",
	"dvi",
	"vb",
	"svb",
	"lvb",
	"dvb",
	"vmin",
	"svmin",
	"lvmin",
	"dvmin",
	"vmax",
	"svmax",
	"lvmax",
	"dvmax",
	"cqw",
	"cqh",
	"cqi",
	"cqb",
	"cqmin",
	"cqmax"
];
var angle = [
	"deg",
	"grad",
	"rad",
	"turn"
];
var time = ["s", "ms"];
var frequency = ["hz", "khz"];
var resolution = [
	"dpi",
	"dpcm",
	"dppx",
	"x"
];
var flex = ["fr"];
var decibel = ["db"];
var semitones = ["st"];
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/SyntaxError.js
function SyntaxError$1(message, input, offset) {
	return Object.assign(createCustomError("SyntaxError", message), {
		input,
		offset,
		rawMessage: message,
		message: message + "\n  " + input + "\n--" + new Array((offset || input.length) + 1).join("-") + "^"
	});
}
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/scanner.js
var TAB$1 = 9;
var N$2 = 10;
var F$1 = 12;
var R$1 = 13;
var SPACE$3 = 32;
var NAME_CHAR = new Uint8Array(128).map((_, idx) => /[a-zA-Z0-9\-]/.test(String.fromCharCode(idx)) ? 1 : 0);
var Scanner = class {
	constructor(str) {
		this.str = str;
		this.pos = 0;
	}
	charCodeAt(pos) {
		return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
	}
	charCode() {
		return this.charCodeAt(this.pos);
	}
	isNameCharCode(code = this.charCode()) {
		return code < 128 && NAME_CHAR[code] === 1;
	}
	nextCharCode() {
		return this.charCodeAt(this.pos + 1);
	}
	nextNonWsCode(pos) {
		return this.charCodeAt(this.findWsEnd(pos));
	}
	skipWs() {
		this.pos = this.findWsEnd(this.pos);
	}
	findWsEnd(pos) {
		for (; pos < this.str.length; pos++) {
			const code = this.str.charCodeAt(pos);
			if (code !== R$1 && code !== N$2 && code !== F$1 && code !== SPACE$3 && code !== TAB$1) break;
		}
		return pos;
	}
	substringToPos(end) {
		return this.str.substring(this.pos, this.pos = end);
	}
	eat(code) {
		if (this.charCode() !== code) this.error("Expect `" + String.fromCharCode(code) + "`");
		this.pos++;
	}
	peek() {
		return this.pos < this.str.length ? this.str.charAt(this.pos++) : "";
	}
	error(message) {
		throw new SyntaxError$1(message, this.str, this.pos);
	}
	scanSpaces() {
		return this.substringToPos(this.findWsEnd(this.pos));
	}
	scanWord() {
		let end = this.pos;
		for (; end < this.str.length; end++) {
			const code = this.str.charCodeAt(end);
			if (code >= 128 || NAME_CHAR[code] === 0) break;
		}
		if (this.pos === end) this.error("Expect a keyword");
		return this.substringToPos(end);
	}
	scanNumber() {
		let end = this.pos;
		for (; end < this.str.length; end++) {
			const code = this.str.charCodeAt(end);
			if (code < 48 || code > 57) break;
		}
		if (this.pos === end) this.error("Expect a number");
		return this.substringToPos(end);
	}
	scanString() {
		const end = this.str.indexOf("'", this.pos + 1);
		if (end === -1) {
			this.pos = this.str.length;
			this.error("Expect an apostrophe");
		}
		return this.substringToPos(end + 1);
	}
};
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/parse.js
var TAB = 9;
var N$1 = 10;
var F = 12;
var R = 13;
var SPACE$2 = 32;
var EXCLAMATIONMARK$2 = 33;
var NUMBERSIGN$3 = 35;
var AMPERSAND$5 = 38;
var APOSTROPHE$2 = 39;
var LEFTPARENTHESIS$2 = 40;
var RIGHTPARENTHESIS$2 = 41;
var ASTERISK$6 = 42;
var PLUSSIGN$6 = 43;
var COMMA = 44;
var HYPERMINUS = 45;
var LESSTHANSIGN$1 = 60;
var GREATERTHANSIGN$3 = 62;
var QUESTIONMARK$1 = 63;
var COMMERCIALAT = 64;
var LEFTSQUAREBRACKET = 91;
var RIGHTSQUAREBRACKET = 93;
var LEFTCURLYBRACKET = 123;
var VERTICALLINE$3 = 124;
var RIGHTCURLYBRACKET = 125;
var INFINITY = 8734;
var COMBINATOR_PRECEDENCE = {
	" ": 1,
	"&&": 2,
	"||": 3,
	"|": 4
};
function readMultiplierRange(scanner) {
	let min = null;
	let max = null;
	scanner.eat(LEFTCURLYBRACKET);
	scanner.skipWs();
	min = scanner.scanNumber(scanner);
	scanner.skipWs();
	if (scanner.charCode() === COMMA) {
		scanner.pos++;
		scanner.skipWs();
		if (scanner.charCode() !== RIGHTCURLYBRACKET) {
			max = scanner.scanNumber(scanner);
			scanner.skipWs();
		}
	} else max = min;
	scanner.eat(RIGHTCURLYBRACKET);
	return {
		min: Number(min),
		max: max ? Number(max) : 0
	};
}
function readMultiplier(scanner) {
	let range = null;
	let comma = false;
	switch (scanner.charCode()) {
		case ASTERISK$6:
			scanner.pos++;
			range = {
				min: 0,
				max: 0
			};
			break;
		case PLUSSIGN$6:
			scanner.pos++;
			range = {
				min: 1,
				max: 0
			};
			break;
		case QUESTIONMARK$1:
			scanner.pos++;
			range = {
				min: 0,
				max: 1
			};
			break;
		case NUMBERSIGN$3:
			scanner.pos++;
			comma = true;
			if (scanner.charCode() === LEFTCURLYBRACKET) range = readMultiplierRange(scanner);
			else if (scanner.charCode() === QUESTIONMARK$1) {
				scanner.pos++;
				range = {
					min: 0,
					max: 0
				};
			} else range = {
				min: 1,
				max: 0
			};
			break;
		case LEFTCURLYBRACKET:
			range = readMultiplierRange(scanner);
			break;
		default: return null;
	}
	return {
		type: "Multiplier",
		comma,
		min: range.min,
		max: range.max,
		term: null
	};
}
function maybeMultiplied(scanner, node) {
	const multiplier = readMultiplier(scanner);
	if (multiplier !== null) {
		multiplier.term = node;
		if (scanner.charCode() === NUMBERSIGN$3 && scanner.charCodeAt(scanner.pos - 1) === PLUSSIGN$6) return maybeMultiplied(scanner, multiplier);
		if (scanner.charCode() === QUESTIONMARK$1 && scanner.charCodeAt(scanner.pos - 1) === RIGHTCURLYBRACKET) return maybeMultiplied(scanner, multiplier);
		return multiplier;
	}
	return node;
}
function maybeToken(scanner) {
	const ch = scanner.peek();
	if (ch === "") return null;
	return maybeMultiplied(scanner, {
		type: "Token",
		value: ch
	});
}
function readProperty$1(scanner) {
	let name;
	scanner.eat(LESSTHANSIGN$1);
	scanner.eat(APOSTROPHE$2);
	name = scanner.scanWord();
	scanner.eat(APOSTROPHE$2);
	scanner.eat(GREATERTHANSIGN$3);
	return maybeMultiplied(scanner, {
		type: "Property",
		name
	});
}
function readTypeRange(scanner) {
	let min = null;
	let max = null;
	let sign = 1;
	scanner.eat(LEFTSQUAREBRACKET);
	if (scanner.charCode() === HYPERMINUS) {
		scanner.peek();
		sign = -1;
	}
	if (sign == -1 && scanner.charCode() === INFINITY) scanner.peek();
	else {
		min = sign * Number(scanner.scanNumber(scanner));
		if (scanner.isNameCharCode()) min += scanner.scanWord();
	}
	scanner.skipWs();
	scanner.eat(COMMA);
	scanner.skipWs();
	if (scanner.charCode() === INFINITY) scanner.peek();
	else {
		sign = 1;
		if (scanner.charCode() === HYPERMINUS) {
			scanner.peek();
			sign = -1;
		}
		max = sign * Number(scanner.scanNumber(scanner));
		if (scanner.isNameCharCode()) max += scanner.scanWord();
	}
	scanner.eat(RIGHTSQUAREBRACKET);
	return {
		type: "Range",
		min,
		max
	};
}
function readType(scanner) {
	let name;
	let opts = null;
	scanner.eat(LESSTHANSIGN$1);
	name = scanner.scanWord();
	if (name === "boolean-expr") {
		scanner.eat(LEFTSQUAREBRACKET);
		const implicitGroup = readImplicitGroup(scanner, RIGHTSQUAREBRACKET);
		scanner.eat(RIGHTSQUAREBRACKET);
		scanner.eat(GREATERTHANSIGN$3);
		return maybeMultiplied(scanner, {
			type: "Boolean",
			term: implicitGroup.terms.length === 1 ? implicitGroup.terms[0] : implicitGroup
		});
	}
	if (scanner.charCode() === LEFTPARENTHESIS$2 && scanner.nextCharCode() === RIGHTPARENTHESIS$2) {
		scanner.pos += 2;
		name += "()";
	}
	if (scanner.charCodeAt(scanner.findWsEnd(scanner.pos)) === LEFTSQUAREBRACKET) {
		scanner.skipWs();
		opts = readTypeRange(scanner);
	}
	scanner.eat(GREATERTHANSIGN$3);
	return maybeMultiplied(scanner, {
		type: "Type",
		name,
		opts
	});
}
function readKeywordOrFunction(scanner) {
	const name = scanner.scanWord();
	if (scanner.charCode() === LEFTPARENTHESIS$2) {
		scanner.pos++;
		return {
			type: "Function",
			name
		};
	}
	return maybeMultiplied(scanner, {
		type: "Keyword",
		name
	});
}
function regroupTerms(terms, combinators) {
	function createGroup(terms, combinator) {
		return {
			type: "Group",
			terms,
			combinator,
			disallowEmpty: false,
			explicit: false
		};
	}
	let combinator;
	combinators = Object.keys(combinators).sort((a, b) => COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b]);
	while (combinators.length > 0) {
		combinator = combinators.shift();
		let i = 0;
		let subgroupStart = 0;
		for (; i < terms.length; i++) {
			const term = terms[i];
			if (term.type === "Combinator") if (term.value === combinator) {
				if (subgroupStart === -1) subgroupStart = i - 1;
				terms.splice(i, 1);
				i--;
			} else {
				if (subgroupStart !== -1 && i - subgroupStart > 1) {
					terms.splice(subgroupStart, i - subgroupStart, createGroup(terms.slice(subgroupStart, i), combinator));
					i = subgroupStart + 1;
				}
				subgroupStart = -1;
			}
		}
		if (subgroupStart !== -1 && combinators.length) terms.splice(subgroupStart, i - subgroupStart, createGroup(terms.slice(subgroupStart, i), combinator));
	}
	return combinator;
}
function readImplicitGroup(scanner, stopCharCode = -1) {
	const combinators = Object.create(null);
	const terms = [];
	let prevToken = null;
	let prevTokenPos = scanner.pos;
	let prevTokenIsFunction = false;
	while (scanner.charCode() !== stopCharCode) {
		let token = prevTokenIsFunction ? readImplicitGroup(scanner, RIGHTPARENTHESIS$2) : peek(scanner);
		if (!token) break;
		if (token.type === "Spaces") continue;
		if (prevTokenIsFunction) {
			if (token.terms.length === 0) {
				prevTokenIsFunction = false;
				continue;
			}
			if (token.combinator === " ") {
				while (token.terms.length > 1) {
					combinators[" "] = true;
					terms.push({
						type: "Combinator",
						value: " "
					}, token.terms.shift());
				}
				token = token.terms[0];
			}
		}
		if (token.type === "Combinator") {
			if (prevToken === null || prevToken.type === "Combinator") {
				scanner.pos = prevTokenPos;
				scanner.error("Unexpected combinator");
			}
			combinators[token.value] = true;
		} else if (prevToken !== null && prevToken.type !== "Combinator") {
			combinators[" "] = true;
			terms.push({
				type: "Combinator",
				value: " "
			});
		}
		terms.push(token);
		prevToken = token;
		prevTokenPos = scanner.pos;
		prevTokenIsFunction = token.type === "Function";
	}
	if (prevToken !== null && prevToken.type === "Combinator") {
		scanner.pos -= prevTokenPos;
		scanner.error("Unexpected combinator");
	}
	return {
		type: "Group",
		terms,
		combinator: regroupTerms(terms, combinators) || " ",
		disallowEmpty: false,
		explicit: false
	};
}
function readGroup(scanner) {
	let result;
	scanner.eat(LEFTSQUAREBRACKET);
	result = readImplicitGroup(scanner, RIGHTSQUAREBRACKET);
	scanner.eat(RIGHTSQUAREBRACKET);
	result.explicit = true;
	if (scanner.charCode() === EXCLAMATIONMARK$2) {
		scanner.pos++;
		result.disallowEmpty = true;
	}
	return result;
}
function peek(scanner) {
	let code = scanner.charCode();
	switch (code) {
		case RIGHTSQUAREBRACKET: break;
		case LEFTSQUAREBRACKET: return maybeMultiplied(scanner, readGroup(scanner));
		case LESSTHANSIGN$1: return scanner.nextCharCode() === APOSTROPHE$2 ? readProperty$1(scanner) : readType(scanner);
		case VERTICALLINE$3: return {
			type: "Combinator",
			value: scanner.substringToPos(scanner.pos + (scanner.nextCharCode() === VERTICALLINE$3 ? 2 : 1))
		};
		case AMPERSAND$5:
			scanner.pos++;
			scanner.eat(AMPERSAND$5);
			return {
				type: "Combinator",
				value: "&&"
			};
		case COMMA:
			scanner.pos++;
			return { type: "Comma" };
		case APOSTROPHE$2: return maybeMultiplied(scanner, {
			type: "String",
			value: scanner.scanString()
		});
		case SPACE$2:
		case TAB:
		case N$1:
		case R:
		case F: return {
			type: "Spaces",
			value: scanner.scanSpaces()
		};
		case COMMERCIALAT:
			code = scanner.nextCharCode();
			if (scanner.isNameCharCode(code)) {
				scanner.pos++;
				return {
					type: "AtKeyword",
					name: scanner.scanWord()
				};
			}
			return maybeToken(scanner);
		case ASTERISK$6:
		case PLUSSIGN$6:
		case QUESTIONMARK$1:
		case NUMBERSIGN$3:
		case EXCLAMATIONMARK$2: break;
		case LEFTCURLYBRACKET:
			code = scanner.nextCharCode();
			if (code < 48 || code > 57) return maybeToken(scanner);
			break;
		default:
			if (scanner.isNameCharCode(code)) return readKeywordOrFunction(scanner);
			return maybeToken(scanner);
	}
}
function parse$50(source) {
	const scanner = new Scanner(source);
	const result = readImplicitGroup(scanner);
	if (scanner.pos !== source.length) scanner.error("Unexpected input");
	if (result.terms.length === 1 && result.terms[0].type === "Group") return result.terms[0];
	return result;
}
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/walk.js
var noop$1 = function() {};
function ensureFunction(value) {
	return typeof value === "function" ? value : noop$1;
}
function walk$1(node, options, context) {
	function walk(node) {
		enter.call(context, node);
		switch (node.type) {
			case "Group":
				node.terms.forEach(walk);
				break;
			case "Multiplier":
			case "Boolean":
				walk(node.term);
				break;
			case "Type":
			case "Property":
			case "Keyword":
			case "AtKeyword":
			case "Function":
			case "String":
			case "Token":
			case "Comma": break;
			default: throw new Error("Unknown type: " + node.type);
		}
		leave.call(context, node);
	}
	let enter = noop$1;
	let leave = noop$1;
	if (typeof options === "function") enter = options;
	else if (options) {
		enter = ensureFunction(options.enter);
		leave = ensureFunction(options.leave);
	}
	if (enter === noop$1 && leave === noop$1) throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
	walk(node, context);
}
//#endregion
//#region node_modules/css-tree/lib/lexer/prepare-tokens.js
var astToTokens = { decorator(handlers) {
	const tokens = [];
	let curNode = null;
	return {
		...handlers,
		node(node) {
			const tmp = curNode;
			curNode = node;
			handlers.node.call(this, node);
			curNode = tmp;
		},
		emit(value, type, auto) {
			tokens.push({
				type,
				value,
				node: auto ? null : curNode
			});
		},
		result() {
			return tokens;
		}
	};
} };
function stringToTokens(str) {
	const tokens = [];
	tokenize$1(str, (type, start, end) => tokens.push({
		type,
		value: str.slice(start, end),
		node: null
	}));
	return tokens;
}
function prepare_tokens_default(value, syntax) {
	if (typeof value === "string") return stringToTokens(value);
	return syntax.generate(value, astToTokens);
}
//#endregion
//#region node_modules/css-tree/lib/lexer/match-graph.js
var MATCH = { type: "Match" };
var MISMATCH = { type: "Mismatch" };
var DISALLOW_EMPTY = { type: "DisallowEmpty" };
var LEFTPARENTHESIS$1 = 40;
var RIGHTPARENTHESIS$1 = 41;
function createCondition(match, thenBranch, elseBranch) {
	if (thenBranch === MATCH && elseBranch === MISMATCH) return match;
	if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH) return match;
	if (match.type === "If" && match.else === MISMATCH && thenBranch === MATCH) {
		thenBranch = match.then;
		match = match.match;
	}
	return {
		type: "If",
		match,
		then: thenBranch,
		else: elseBranch
	};
}
function isFunctionType(name) {
	return name.length > 2 && name.charCodeAt(name.length - 2) === LEFTPARENTHESIS$1 && name.charCodeAt(name.length - 1) === RIGHTPARENTHESIS$1;
}
function isEnumCapatible(term) {
	return term.type === "Keyword" || term.type === "AtKeyword" || term.type === "Function" || term.type === "Type" && isFunctionType(term.name);
}
function groupNode(terms, combinator = " ", explicit = false) {
	return {
		type: "Group",
		terms,
		combinator,
		disallowEmpty: false,
		explicit
	};
}
function replaceTypeInGraph(node, replacements, visited = /* @__PURE__ */ new Set()) {
	if (!visited.has(node)) {
		visited.add(node);
		switch (node.type) {
			case "If":
				node.match = replaceTypeInGraph(node.match, replacements, visited);
				node.then = replaceTypeInGraph(node.then, replacements, visited);
				node.else = replaceTypeInGraph(node.else, replacements, visited);
				break;
			case "Type": return replacements[node.name] || node;
		}
	}
	return node;
}
function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
	switch (combinator) {
		case " ": {
			let result = MATCH;
			for (let i = terms.length - 1; i >= 0; i--) {
				const term = terms[i];
				result = createCondition(term, result, MISMATCH);
			}
			return result;
		}
		case "|": {
			let result = MISMATCH;
			let map = null;
			for (let i = terms.length - 1; i >= 0; i--) {
				let term = terms[i];
				if (isEnumCapatible(term)) {
					if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
						map = Object.create(null);
						result = createCondition({
							type: "Enum",
							map
						}, MATCH, result);
					}
					if (map !== null) {
						const key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
						if (key in map === false) {
							map[key] = term;
							continue;
						}
					}
				}
				map = null;
				result = createCondition(term, MATCH, result);
			}
			return result;
		}
		case "&&": {
			if (terms.length > 5) return {
				type: "MatchOnce",
				terms,
				all: true
			};
			let result = MISMATCH;
			for (let i = terms.length - 1; i >= 0; i--) {
				const term = terms[i];
				let thenClause;
				if (terms.length > 1) thenClause = buildGroupMatchGraph(combinator, terms.filter(function(newGroupTerm) {
					return newGroupTerm !== term;
				}), false);
				else thenClause = MATCH;
				result = createCondition(term, thenClause, result);
			}
			return result;
		}
		case "||": {
			if (terms.length > 5) return {
				type: "MatchOnce",
				terms,
				all: false
			};
			let result = atLeastOneTermMatched ? MATCH : MISMATCH;
			for (let i = terms.length - 1; i >= 0; i--) {
				const term = terms[i];
				let thenClause;
				if (terms.length > 1) thenClause = buildGroupMatchGraph(combinator, terms.filter(function(newGroupTerm) {
					return newGroupTerm !== term;
				}), true);
				else thenClause = MATCH;
				result = createCondition(term, thenClause, result);
			}
			return result;
		}
	}
}
function buildMultiplierMatchGraph(node) {
	let result = MATCH;
	let matchTerm = buildMatchGraphInternal(node.term);
	if (node.max === 0) {
		matchTerm = createCondition(matchTerm, DISALLOW_EMPTY, MISMATCH);
		result = createCondition(matchTerm, null, MISMATCH);
		result.then = createCondition(MATCH, MATCH, result);
		if (node.comma) result.then.else = createCondition({
			type: "Comma",
			syntax: node
		}, result, MISMATCH);
	} else for (let i = node.min || 1; i <= node.max; i++) {
		if (node.comma && result !== MATCH) result = createCondition({
			type: "Comma",
			syntax: node
		}, result, MISMATCH);
		result = createCondition(matchTerm, createCondition(MATCH, MATCH, result), MISMATCH);
	}
	if (node.min === 0) result = createCondition(MATCH, MATCH, result);
	else for (let i = 0; i < node.min - 1; i++) {
		if (node.comma && result !== MATCH) result = createCondition({
			type: "Comma",
			syntax: node
		}, result, MISMATCH);
		result = createCondition(matchTerm, result, MISMATCH);
	}
	return result;
}
function buildMatchGraphInternal(node) {
	if (typeof node === "function") return {
		type: "Generic",
		fn: node
	};
	switch (node.type) {
		case "Group": {
			let result = buildGroupMatchGraph(node.combinator, node.terms.map(buildMatchGraphInternal), false);
			if (node.disallowEmpty) result = createCondition(result, DISALLOW_EMPTY, MISMATCH);
			return result;
		}
		case "Multiplier": return buildMultiplierMatchGraph(node);
		case "Boolean": {
			const term = buildMatchGraphInternal(node.term);
			const matchNode = buildMatchGraphInternal(groupNode([groupNode([{
				type: "Keyword",
				name: "not"
			}, {
				type: "Type",
				name: "!boolean-group"
			}]), groupNode([{
				type: "Type",
				name: "!boolean-group"
			}, groupNode([{
				type: "Multiplier",
				comma: false,
				min: 0,
				max: 0,
				term: groupNode([{
					type: "Keyword",
					name: "and"
				}, {
					type: "Type",
					name: "!boolean-group"
				}])
			}, {
				type: "Multiplier",
				comma: false,
				min: 0,
				max: 0,
				term: groupNode([{
					type: "Keyword",
					name: "or"
				}, {
					type: "Type",
					name: "!boolean-group"
				}])
			}], "|")])], "|"));
			const booleanGroup = buildMatchGraphInternal(groupNode([
				{
					type: "Type",
					name: "!term"
				},
				groupNode([
					{
						type: "Token",
						value: "("
					},
					{
						type: "Type",
						name: "!self"
					},
					{
						type: "Token",
						value: ")"
					}
				]),
				{
					type: "Type",
					name: "general-enclosed"
				}
			], "|"));
			replaceTypeInGraph(booleanGroup, {
				"!term": term,
				"!self": matchNode
			});
			replaceTypeInGraph(matchNode, { "!boolean-group": booleanGroup });
			return matchNode;
		}
		case "Type":
		case "Property": return {
			type: node.type,
			name: node.name,
			syntax: node
		};
		case "Keyword": return {
			type: node.type,
			name: node.name.toLowerCase(),
			syntax: node
		};
		case "AtKeyword": return {
			type: node.type,
			name: "@" + node.name.toLowerCase(),
			syntax: node
		};
		case "Function": return {
			type: node.type,
			name: node.name.toLowerCase() + "(",
			syntax: node
		};
		case "String":
			if (node.value.length === 3) return {
				type: "Token",
				value: node.value.charAt(1),
				syntax: node
			};
			return {
				type: node.type,
				value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, "'"),
				syntax: node
			};
		case "Token": return {
			type: node.type,
			value: node.value,
			syntax: node
		};
		case "Comma": return {
			type: node.type,
			syntax: node
		};
		default: throw new Error("Unknown node type:", node.type);
	}
}
function buildMatchGraph(syntaxTree, ref) {
	if (typeof syntaxTree === "string") syntaxTree = parse$50(syntaxTree);
	return {
		type: "MatchGraph",
		match: buildMatchGraphInternal(syntaxTree),
		syntax: ref || null,
		source: syntaxTree
	};
}
//#endregion
//#region node_modules/css-tree/lib/lexer/match.js
var { hasOwnProperty: hasOwnProperty$2 } = Object.prototype;
var STUB = 0;
var TOKEN = 1;
var OPEN_SYNTAX = 2;
var CLOSE_SYNTAX = 3;
var EXIT_REASON_MATCH = "Match";
var EXIT_REASON_MISMATCH = "Mismatch";
var EXIT_REASON_ITERATION_LIMIT = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)";
var ITERATION_LIMIT = 15e3;
var totalIterationCount = 0;
function reverseList(list) {
	let prev = null;
	let next = null;
	let item = list;
	while (item !== null) {
		next = item.prev;
		item.prev = prev;
		prev = item;
		item = next;
	}
	return prev;
}
function areStringsEqualCaseInsensitive(testStr, referenceStr) {
	if (testStr.length !== referenceStr.length) return false;
	for (let i = 0; i < testStr.length; i++) {
		const referenceCode = referenceStr.charCodeAt(i);
		let testCode = testStr.charCodeAt(i);
		if (testCode >= 65 && testCode <= 90) testCode = testCode | 32;
		if (testCode !== referenceCode) return false;
	}
	return true;
}
function isContextEdgeDelim(token) {
	if (token.type !== 9) return false;
	return token.value !== "?";
}
function isCommaContextStart(token) {
	if (token === null) return true;
	return token.type === 18 || token.type === 2 || token.type === 21 || token.type === 19 || token.type === 23 || isContextEdgeDelim(token);
}
function isCommaContextEnd(token) {
	if (token === null) return true;
	return token.type === 22 || token.type === 20 || token.type === 24 || token.type === 9 && token.value === "/";
}
function internalMatch(tokens, state, syntaxes) {
	function moveToNextToken() {
		do {
			tokenIndex++;
			token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
		} while (token !== null && (token.type === 13 || token.type === 25));
	}
	function getNextToken(offset) {
		const nextIndex = tokenIndex + offset;
		return nextIndex < tokens.length ? tokens[nextIndex] : null;
	}
	function stateSnapshotFromSyntax(nextState, prev) {
		return {
			nextState,
			matchStack,
			syntaxStack,
			thenStack,
			tokenIndex,
			prev
		};
	}
	function pushThenStack(nextState) {
		thenStack = {
			nextState,
			matchStack,
			syntaxStack,
			prev: thenStack
		};
	}
	function pushElseStack(nextState) {
		elseStack = stateSnapshotFromSyntax(nextState, elseStack);
	}
	function addTokenToMatch() {
		matchStack = {
			type: TOKEN,
			syntax: state.syntax,
			token,
			prev: matchStack
		};
		moveToNextToken();
		syntaxStash = null;
		if (tokenIndex > longestMatch) longestMatch = tokenIndex;
	}
	function openSyntax() {
		syntaxStack = {
			syntax: state.syntax,
			opts: state.syntax.opts || syntaxStack !== null && syntaxStack.opts || null,
			prev: syntaxStack
		};
		matchStack = {
			type: OPEN_SYNTAX,
			syntax: state.syntax,
			token: matchStack.token,
			prev: matchStack
		};
	}
	function closeSyntax() {
		if (matchStack.type === OPEN_SYNTAX) matchStack = matchStack.prev;
		else matchStack = {
			type: CLOSE_SYNTAX,
			syntax: syntaxStack.syntax,
			token: matchStack.token,
			prev: matchStack
		};
		syntaxStack = syntaxStack.prev;
	}
	let syntaxStack = null;
	let thenStack = null;
	let elseStack = null;
	let syntaxStash = null;
	let iterationCount = 0;
	let exitReason = null;
	let token = null;
	let tokenIndex = -1;
	let longestMatch = 0;
	let matchStack = {
		type: STUB,
		syntax: null,
		token: null,
		prev: null
	};
	moveToNextToken();
	while (exitReason === null && ++iterationCount < ITERATION_LIMIT) switch (state.type) {
		case "Match":
			if (thenStack === null) {
				if (token !== null) {
					if (tokenIndex !== tokens.length - 1 || token.value !== "\\0" && token.value !== "\\9") {
						state = MISMATCH;
						break;
					}
				}
				exitReason = EXIT_REASON_MATCH;
				break;
			}
			state = thenStack.nextState;
			if (state === DISALLOW_EMPTY) if (thenStack.matchStack === matchStack) {
				state = MISMATCH;
				break;
			} else state = MATCH;
			while (thenStack.syntaxStack !== syntaxStack) closeSyntax();
			thenStack = thenStack.prev;
			break;
		case "Mismatch":
			if (syntaxStash !== null && syntaxStash !== false) {
				if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
					elseStack = syntaxStash;
					syntaxStash = false;
				}
			} else if (elseStack === null) {
				exitReason = EXIT_REASON_MISMATCH;
				break;
			}
			state = elseStack.nextState;
			thenStack = elseStack.thenStack;
			syntaxStack = elseStack.syntaxStack;
			matchStack = elseStack.matchStack;
			tokenIndex = elseStack.tokenIndex;
			token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
			elseStack = elseStack.prev;
			break;
		case "MatchGraph":
			state = state.match;
			break;
		case "If":
			if (state.else !== MISMATCH) pushElseStack(state.else);
			if (state.then !== MATCH) pushThenStack(state.then);
			state = state.match;
			break;
		case "MatchOnce":
			state = {
				type: "MatchOnceBuffer",
				syntax: state,
				index: 0,
				mask: 0
			};
			break;
		case "MatchOnceBuffer": {
			const terms = state.syntax.terms;
			if (state.index === terms.length) {
				if (state.mask === 0 || state.syntax.all) {
					state = MISMATCH;
					break;
				}
				state = MATCH;
				break;
			}
			if (state.mask === (1 << terms.length) - 1) {
				state = MATCH;
				break;
			}
			for (; state.index < terms.length; state.index++) {
				const matchFlag = 1 << state.index;
				if ((state.mask & matchFlag) === 0) {
					pushElseStack(state);
					pushThenStack({
						type: "AddMatchOnce",
						syntax: state.syntax,
						mask: state.mask | matchFlag
					});
					state = terms[state.index++];
					break;
				}
			}
			break;
		}
		case "AddMatchOnce":
			state = {
				type: "MatchOnceBuffer",
				syntax: state.syntax,
				index: 0,
				mask: state.mask
			};
			break;
		case "Enum":
			if (token !== null) {
				let name = token.value.toLowerCase();
				if (name.indexOf("\\") !== -1) name = name.replace(/\\[09].*$/, "");
				if (hasOwnProperty$2.call(state.map, name)) {
					state = state.map[name];
					break;
				}
			}
			state = MISMATCH;
			break;
		case "Generic": {
			const opts = syntaxStack !== null ? syntaxStack.opts : null;
			const lastTokenIndex = tokenIndex + Math.floor(state.fn(token, getNextToken, opts));
			if (!isNaN(lastTokenIndex) && lastTokenIndex > tokenIndex) {
				while (tokenIndex < lastTokenIndex) addTokenToMatch();
				state = MATCH;
			} else state = MISMATCH;
			break;
		}
		case "Type":
		case "Property": {
			const syntaxDict = state.type === "Type" ? "types" : "properties";
			const dictSyntax = hasOwnProperty$2.call(syntaxes, syntaxDict) ? syntaxes[syntaxDict][state.name] : null;
			if (!dictSyntax || !dictSyntax.match) throw new Error("Bad syntax reference: " + (state.type === "Type" ? "<" + state.name + ">" : "<'" + state.name + "'>"));
			if (syntaxStash !== false && token !== null && state.type === "Type") {
				if (state.name === "custom-ident" && token.type === 1 || state.name === "length" && token.value === "0") {
					if (syntaxStash === null) syntaxStash = stateSnapshotFromSyntax(state, elseStack);
					state = MISMATCH;
					break;
				}
			}
			openSyntax();
			state = dictSyntax.matchRef || dictSyntax.match;
			break;
		}
		case "Keyword": {
			const name = state.name;
			if (token !== null) {
				let keywordName = token.value;
				if (keywordName.indexOf("\\") !== -1) keywordName = keywordName.replace(/\\[09].*$/, "");
				if (areStringsEqualCaseInsensitive(keywordName, name)) {
					addTokenToMatch();
					state = MATCH;
					break;
				}
			}
			state = MISMATCH;
			break;
		}
		case "AtKeyword":
		case "Function":
			if (token !== null && areStringsEqualCaseInsensitive(token.value, state.name)) {
				addTokenToMatch();
				state = MATCH;
				break;
			}
			state = MISMATCH;
			break;
		case "Token":
			if (token !== null && token.value === state.value) {
				addTokenToMatch();
				state = MATCH;
				break;
			}
			state = MISMATCH;
			break;
		case "Comma":
			if (token !== null && token.type === 18) if (isCommaContextStart(matchStack.token)) state = MISMATCH;
			else {
				addTokenToMatch();
				state = isCommaContextEnd(token) ? MISMATCH : MATCH;
			}
			else state = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? MATCH : MISMATCH;
			break;
		case "String":
			let string = "";
			let lastTokenIndex = tokenIndex;
			for (; lastTokenIndex < tokens.length && string.length < state.value.length; lastTokenIndex++) string += tokens[lastTokenIndex].value;
			if (areStringsEqualCaseInsensitive(string, state.value)) {
				while (tokenIndex < lastTokenIndex) addTokenToMatch();
				state = MATCH;
			} else state = MISMATCH;
			break;
		default: throw new Error("Unknown node type: " + state.type);
	}
	totalIterationCount += iterationCount;
	switch (exitReason) {
		case null:
			console.warn("[csstree-match] BREAK after " + ITERATION_LIMIT + " iterations");
			exitReason = EXIT_REASON_ITERATION_LIMIT;
			matchStack = null;
			break;
		case EXIT_REASON_MATCH:
			while (syntaxStack !== null) closeSyntax();
			break;
		default: matchStack = null;
	}
	return {
		tokens,
		reason: exitReason,
		iterations: iterationCount,
		match: matchStack,
		longestMatch
	};
}
function matchAsTree(tokens, matchGraph, syntaxes) {
	const matchResult = internalMatch(tokens, matchGraph, syntaxes || {});
	if (matchResult.match === null) return matchResult;
	let item = matchResult.match;
	let host = matchResult.match = {
		syntax: matchGraph.syntax || null,
		match: []
	};
	const hostStack = [host];
	item = reverseList(item).prev;
	while (item !== null) {
		switch (item.type) {
			case OPEN_SYNTAX:
				host.match.push(host = {
					syntax: item.syntax,
					match: []
				});
				hostStack.push(host);
				break;
			case CLOSE_SYNTAX:
				hostStack.pop();
				host = hostStack[hostStack.length - 1];
				break;
			default: host.match.push({
				syntax: item.syntax || null,
				token: item.token.value,
				node: item.token.node
			});
		}
		item = item.prev;
	}
	return matchResult;
}
//#endregion
//#region node_modules/css-tree/lib/lexer/trace.js
var trace_exports = /* @__PURE__ */ __exportAll$2({
	getTrace: () => getTrace,
	isKeyword: () => isKeyword,
	isProperty: () => isProperty,
	isType: () => isType
});
function getTrace(node) {
	function shouldPutToTrace(syntax) {
		if (syntax === null) return false;
		return syntax.type === "Type" || syntax.type === "Property" || syntax.type === "Keyword";
	}
	function hasMatch(matchNode) {
		if (Array.isArray(matchNode.match)) {
			for (let i = 0; i < matchNode.match.length; i++) if (hasMatch(matchNode.match[i])) {
				if (shouldPutToTrace(matchNode.syntax)) result.unshift(matchNode.syntax);
				return true;
			}
		} else if (matchNode.node === node) {
			result = shouldPutToTrace(matchNode.syntax) ? [matchNode.syntax] : [];
			return true;
		}
		return false;
	}
	let result = null;
	if (this.matched !== null) hasMatch(this.matched);
	return result;
}
function isType(node, type) {
	return testNode(this, node, (match) => match.type === "Type" && match.name === type);
}
function isProperty(node, property) {
	return testNode(this, node, (match) => match.type === "Property" && match.name === property);
}
function isKeyword(node) {
	return testNode(this, node, (match) => match.type === "Keyword");
}
function testNode(match, node, fn) {
	const trace = getTrace.call(match, node);
	if (trace === null) return false;
	return trace.some(fn);
}
//#endregion
//#region node_modules/css-tree/lib/lexer/search.js
function getFirstMatchNode(matchNode) {
	if ("node" in matchNode) return matchNode.node;
	return getFirstMatchNode(matchNode.match[0]);
}
function getLastMatchNode(matchNode) {
	if ("node" in matchNode) return matchNode.node;
	return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
}
function matchFragments(lexer, ast, match, type, name) {
	function findFragments(matchNode) {
		if (matchNode.syntax !== null && matchNode.syntax.type === type && matchNode.syntax.name === name) {
			const start = getFirstMatchNode(matchNode);
			const end = getLastMatchNode(matchNode);
			lexer.syntax.walk(ast, function(node, item, list) {
				if (node === start) {
					const nodes = new List();
					do {
						nodes.appendData(item.data);
						if (item.data === end) break;
						item = item.next;
					} while (item !== null);
					fragments.push({
						parent: list,
						nodes
					});
				}
			});
		}
		if (Array.isArray(matchNode.match)) matchNode.match.forEach(findFragments);
	}
	const fragments = [];
	if (match.matched !== null) findFragments(match.matched);
	return fragments;
}
//#endregion
//#region node_modules/css-tree/lib/lexer/structure.js
var { hasOwnProperty: hasOwnProperty$1 } = Object.prototype;
function isValidNumber(value) {
	return typeof value === "number" && isFinite(value) && Math.floor(value) === value && value >= 0;
}
function isValidLocation(loc) {
	return Boolean(loc) && isValidNumber(loc.offset) && isValidNumber(loc.line) && isValidNumber(loc.column);
}
function createNodeStructureChecker(type, fields) {
	return function checkNode(node, warn) {
		if (!node || node.constructor !== Object) return warn(node, "Type of node should be an Object");
		for (let key in node) {
			let valid = true;
			if (hasOwnProperty$1.call(node, key) === false) continue;
			if (key === "type") {
				if (node.type !== type) warn(node, "Wrong node type `" + node.type + "`, expected `" + type + "`");
			} else if (key === "loc") {
				if (node.loc === null) continue;
				else if (node.loc && node.loc.constructor === Object) if (typeof node.loc.source !== "string") key += ".source";
				else if (!isValidLocation(node.loc.start)) key += ".start";
				else if (!isValidLocation(node.loc.end)) key += ".end";
				else continue;
				valid = false;
			} else if (fields.hasOwnProperty(key)) {
				valid = false;
				for (let i = 0; !valid && i < fields[key].length; i++) {
					const fieldType = fields[key][i];
					switch (fieldType) {
						case String:
							valid = typeof node[key] === "string";
							break;
						case Boolean:
							valid = typeof node[key] === "boolean";
							break;
						case null:
							valid = node[key] === null;
							break;
						default: if (typeof fieldType === "string") valid = node[key] && node[key].type === fieldType;
						else if (Array.isArray(fieldType)) valid = node[key] instanceof List;
					}
				}
			} else warn(node, "Unknown field `" + key + "` for " + type + " node type");
			if (!valid) warn(node, "Bad value for `" + type + "." + key + "`");
		}
		for (const key in fields) if (hasOwnProperty$1.call(fields, key) && hasOwnProperty$1.call(node, key) === false) warn(node, "Field `" + type + "." + key + "` is missed");
	};
}
function genTypesList(fieldTypes, path) {
	const docsTypes = [];
	for (let i = 0; i < fieldTypes.length; i++) {
		const fieldType = fieldTypes[i];
		if (fieldType === String || fieldType === Boolean) docsTypes.push(fieldType.name.toLowerCase());
		else if (fieldType === null) docsTypes.push("null");
		else if (typeof fieldType === "string") docsTypes.push(fieldType);
		else if (Array.isArray(fieldType)) docsTypes.push("List<" + (genTypesList(fieldType, path) || "any") + ">");
		else throw new Error("Wrong value `" + fieldType + "` in `" + path + "` structure definition");
	}
	return docsTypes.join(" | ");
}
function processStructure(name, nodeType) {
	const structure = nodeType.structure;
	const fields = {
		type: String,
		loc: true
	};
	const docs = { type: "\"" + name + "\"" };
	for (const key in structure) {
		if (hasOwnProperty$1.call(structure, key) === false) continue;
		docs[key] = genTypesList(fields[key] = Array.isArray(structure[key]) ? structure[key].slice() : [structure[key]], name + "." + key);
	}
	return {
		docs,
		check: createNodeStructureChecker(name, fields)
	};
}
function getStructureFromConfig(config) {
	const structure = {};
	if (config.node) {
		for (const name in config.node) if (hasOwnProperty$1.call(config.node, name)) {
			const nodeType = config.node[name];
			if (nodeType.structure) structure[name] = processStructure(name, nodeType);
			else throw new Error("Missed `structure` field in `" + name + "` node type definition");
		}
	}
	return structure;
}
//#endregion
//#region node_modules/css-tree/lib/lexer/Lexer.js
function dumpMapSyntax(map, compact, syntaxAsAst) {
	const result = {};
	for (const name in map) if (map[name].syntax) result[name] = syntaxAsAst ? map[name].syntax : generate$50(map[name].syntax, { compact });
	return result;
}
function dumpAtruleMapSyntax(map, compact, syntaxAsAst) {
	const result = {};
	for (const [name, atrule] of Object.entries(map)) result[name] = {
		prelude: atrule.prelude && (syntaxAsAst ? atrule.prelude.syntax : generate$50(atrule.prelude.syntax, { compact })),
		descriptors: atrule.descriptors && dumpMapSyntax(atrule.descriptors, compact, syntaxAsAst)
	};
	return result;
}
function valueHasVar(tokens) {
	for (let i = 0; i < tokens.length; i++) if (tokens[i].value.toLowerCase() === "var(") return true;
	return false;
}
function syntaxHasTopLevelCommaMultiplier(syntax) {
	const singleTerm = syntax.terms[0];
	return syntax.explicit === false && syntax.terms.length === 1 && singleTerm.type === "Multiplier" && singleTerm.comma === true;
}
function buildMatchResult(matched, error, iterations) {
	return {
		matched,
		iterations,
		error,
		...trace_exports
	};
}
function matchSyntax(lexer, syntax, value, useCssWideKeywords) {
	const tokens = prepare_tokens_default(value, lexer.syntax);
	let result;
	if (valueHasVar(tokens)) return buildMatchResult(null, /* @__PURE__ */ new Error("Matching for a tree with var() is not supported"));
	if (useCssWideKeywords) result = matchAsTree(tokens, lexer.cssWideKeywordsSyntax, lexer);
	if (!useCssWideKeywords || !result.match) {
		result = matchAsTree(tokens, syntax.match, lexer);
		if (!result.match) return buildMatchResult(null, new SyntaxMatchError(result.reason, syntax.syntax, value, result), result.iterations);
	}
	return buildMatchResult(result.match, null, result.iterations);
}
var Lexer = class {
	constructor(config, syntax, structure) {
		this.cssWideKeywords = cssWideKeywords;
		this.syntax = syntax;
		this.generic = false;
		this.units = { ...units_exports };
		this.atrules = Object.create(null);
		this.properties = Object.create(null);
		this.types = Object.create(null);
		this.structure = structure || getStructureFromConfig(config);
		if (config) {
			if (config.cssWideKeywords) this.cssWideKeywords = config.cssWideKeywords;
			if (config.units) {
				for (const group of Object.keys(units_exports)) if (Array.isArray(config.units[group])) this.units[group] = config.units[group];
			}
			if (config.types) for (const [name, type] of Object.entries(config.types)) this.addType_(name, type);
			if (config.generic) {
				this.generic = true;
				for (const [name, value] of Object.entries(createGenericTypes(this.units))) this.addType_(name, value);
			}
			if (config.atrules) for (const [name, atrule] of Object.entries(config.atrules)) this.addAtrule_(name, atrule);
			if (config.properties) for (const [name, property] of Object.entries(config.properties)) this.addProperty_(name, property);
		}
		this.cssWideKeywordsSyntax = buildMatchGraph(this.cssWideKeywords.join(" |  "));
	}
	checkStructure(ast) {
		function collectWarning(node, message) {
			warns.push({
				node,
				message
			});
		}
		const structure = this.structure;
		const warns = [];
		this.syntax.walk(ast, function(node) {
			if (structure.hasOwnProperty(node.type)) structure[node.type].check(node, collectWarning);
			else collectWarning(node, "Unknown node type `" + node.type + "`");
		});
		return warns.length ? warns : false;
	}
	createDescriptor(syntax, type, name, parent = null) {
		const ref = {
			type,
			name
		};
		const descriptor = {
			type,
			name,
			parent,
			serializable: typeof syntax === "string" || syntax && typeof syntax.type === "string",
			syntax: null,
			match: null,
			matchRef: null
		};
		if (typeof syntax === "function") descriptor.match = buildMatchGraph(syntax, ref);
		else {
			if (typeof syntax === "string") Object.defineProperty(descriptor, "syntax", { get() {
				Object.defineProperty(descriptor, "syntax", { value: parse$50(syntax) });
				return descriptor.syntax;
			} });
			else descriptor.syntax = syntax;
			Object.defineProperty(descriptor, "match", { get() {
				Object.defineProperty(descriptor, "match", { value: buildMatchGraph(descriptor.syntax, ref) });
				return descriptor.match;
			} });
			if (type === "Property") Object.defineProperty(descriptor, "matchRef", { get() {
				const syntax = descriptor.syntax;
				const value = syntaxHasTopLevelCommaMultiplier(syntax) ? buildMatchGraph({
					...syntax,
					terms: [syntax.terms[0].term]
				}, ref) : null;
				Object.defineProperty(descriptor, "matchRef", { value });
				return value;
			} });
		}
		return descriptor;
	}
	addAtrule_(name, syntax) {
		if (!syntax) return;
		this.atrules[name] = {
			type: "Atrule",
			name,
			prelude: syntax.prelude ? this.createDescriptor(syntax.prelude, "AtrulePrelude", name) : null,
			descriptors: syntax.descriptors ? Object.keys(syntax.descriptors).reduce((map, descName) => {
				map[descName] = this.createDescriptor(syntax.descriptors[descName], "AtruleDescriptor", descName, name);
				return map;
			}, Object.create(null)) : null
		};
	}
	addProperty_(name, syntax) {
		if (!syntax) return;
		this.properties[name] = this.createDescriptor(syntax, "Property", name);
	}
	addType_(name, syntax) {
		if (!syntax) return;
		this.types[name] = this.createDescriptor(syntax, "Type", name);
	}
	checkAtruleName(atruleName) {
		if (!this.getAtrule(atruleName)) return new SyntaxReferenceError("Unknown at-rule", "@" + atruleName);
	}
	checkAtrulePrelude(atruleName, prelude) {
		const error = this.checkAtruleName(atruleName);
		if (error) return error;
		const atrule = this.getAtrule(atruleName);
		if (!atrule.prelude && prelude) return /* @__PURE__ */ new SyntaxError("At-rule `@" + atruleName + "` should not contain a prelude");
		if (atrule.prelude && !prelude) {
			if (!matchSyntax(this, atrule.prelude, "", false).matched) return /* @__PURE__ */ new SyntaxError("At-rule `@" + atruleName + "` should contain a prelude");
		}
	}
	checkAtruleDescriptorName(atruleName, descriptorName) {
		const error = this.checkAtruleName(atruleName);
		if (error) return error;
		const atrule = this.getAtrule(atruleName);
		const descriptor = keyword(descriptorName);
		if (!atrule.descriptors) return /* @__PURE__ */ new SyntaxError("At-rule `@" + atruleName + "` has no known descriptors");
		if (!atrule.descriptors[descriptor.name] && !atrule.descriptors[descriptor.basename]) return new SyntaxReferenceError("Unknown at-rule descriptor", descriptorName);
	}
	checkPropertyName(propertyName) {
		if (!this.getProperty(propertyName)) return new SyntaxReferenceError("Unknown property", propertyName);
	}
	matchAtrulePrelude(atruleName, prelude) {
		const error = this.checkAtrulePrelude(atruleName, prelude);
		if (error) return buildMatchResult(null, error);
		const atrule = this.getAtrule(atruleName);
		if (!atrule.prelude) return buildMatchResult(null, null);
		return matchSyntax(this, atrule.prelude, prelude || "", false);
	}
	matchAtruleDescriptor(atruleName, descriptorName, value) {
		const error = this.checkAtruleDescriptorName(atruleName, descriptorName);
		if (error) return buildMatchResult(null, error);
		const atrule = this.getAtrule(atruleName);
		const descriptor = keyword(descriptorName);
		return matchSyntax(this, atrule.descriptors[descriptor.name] || atrule.descriptors[descriptor.basename], value, false);
	}
	matchDeclaration(node) {
		if (node.type !== "Declaration") return buildMatchResult(null, /* @__PURE__ */ new Error("Not a Declaration node"));
		return this.matchProperty(node.property, node.value);
	}
	matchProperty(propertyName, value) {
		if (property(propertyName).custom) return buildMatchResult(null, /* @__PURE__ */ new Error("Lexer matching doesn't applicable for custom properties"));
		const error = this.checkPropertyName(propertyName);
		if (error) return buildMatchResult(null, error);
		return matchSyntax(this, this.getProperty(propertyName), value, true);
	}
	matchType(typeName, value) {
		const typeSyntax = this.getType(typeName);
		if (!typeSyntax) return buildMatchResult(null, new SyntaxReferenceError("Unknown type", typeName));
		return matchSyntax(this, typeSyntax, value, false);
	}
	match(syntax, value) {
		if (typeof syntax !== "string" && (!syntax || !syntax.type)) return buildMatchResult(null, new SyntaxReferenceError("Bad syntax"));
		if (typeof syntax === "string" || !syntax.match) syntax = this.createDescriptor(syntax, "Type", "anonymous");
		return matchSyntax(this, syntax, value, false);
	}
	findValueFragments(propertyName, value, type, name) {
		return matchFragments(this, value, this.matchProperty(propertyName, value), type, name);
	}
	findDeclarationValueFragments(declaration, type, name) {
		return matchFragments(this, declaration.value, this.matchDeclaration(declaration), type, name);
	}
	findAllFragments(ast, type, name) {
		const result = [];
		this.syntax.walk(ast, {
			visit: "Declaration",
			enter: (declaration) => {
				result.push.apply(result, this.findDeclarationValueFragments(declaration, type, name));
			}
		});
		return result;
	}
	getAtrule(atruleName, fallbackBasename = true) {
		const atrule = keyword(atruleName);
		return (atrule.vendor && fallbackBasename ? this.atrules[atrule.name] || this.atrules[atrule.basename] : this.atrules[atrule.name]) || null;
	}
	getAtrulePrelude(atruleName, fallbackBasename = true) {
		const atrule = this.getAtrule(atruleName, fallbackBasename);
		return atrule && atrule.prelude || null;
	}
	getAtruleDescriptor(atruleName, name) {
		return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators ? this.atrules[atruleName].declarators[name] || null : null;
	}
	getProperty(propertyName, fallbackBasename = true) {
		const property$3 = property(propertyName);
		return (property$3.vendor && fallbackBasename ? this.properties[property$3.name] || this.properties[property$3.basename] : this.properties[property$3.name]) || null;
	}
	getType(name) {
		return hasOwnProperty.call(this.types, name) ? this.types[name] : null;
	}
	validate() {
		function syntaxRef(name, isType) {
			return isType ? `<${name}>` : `<'${name}'>`;
		}
		function validate(syntax, name, broken, descriptor) {
			if (broken.has(name)) return broken.get(name);
			broken.set(name, false);
			if (descriptor.syntax !== null) walk$1(descriptor.syntax, function(node) {
				if (node.type !== "Type" && node.type !== "Property") return;
				const map = node.type === "Type" ? syntax.types : syntax.properties;
				const brokenMap = node.type === "Type" ? brokenTypes : brokenProperties;
				if (!hasOwnProperty.call(map, node.name)) {
					errors.push(`${syntaxRef(name, broken === brokenTypes)} used missed syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
					broken.set(name, true);
				} else if (validate(syntax, node.name, brokenMap, map[node.name])) {
					errors.push(`${syntaxRef(name, broken === brokenTypes)} used broken syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
					broken.set(name, true);
				}
			}, this);
		}
		const errors = [];
		let brokenTypes = /* @__PURE__ */ new Map();
		let brokenProperties = /* @__PURE__ */ new Map();
		for (const key in this.types) validate(this, key, brokenTypes, this.types[key]);
		for (const key in this.properties) validate(this, key, brokenProperties, this.properties[key]);
		const brokenTypesArray = [...brokenTypes.keys()].filter((name) => brokenTypes.get(name));
		const brokenPropertiesArray = [...brokenProperties.keys()].filter((name) => brokenProperties.get(name));
		if (brokenTypesArray.length || brokenPropertiesArray.length) return {
			errors,
			types: brokenTypesArray,
			properties: brokenPropertiesArray
		};
		return null;
	}
	dump(syntaxAsAst, pretty) {
		return {
			generic: this.generic,
			cssWideKeywords: this.cssWideKeywords,
			units: this.units,
			types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
			properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst),
			atrules: dumpAtruleMapSyntax(this.atrules, !pretty, syntaxAsAst)
		};
	}
	toString() {
		return JSON.stringify(this.dump());
	}
};
//#endregion
//#region node_modules/css-tree/lib/syntax/config/mix.js
function appendOrSet(a, b) {
	if (typeof b === "string" && /^\s*\|/.test(b)) return typeof a === "string" ? a + b : b.replace(/^\s*\|\s*/, "");
	return b || null;
}
function extractProps(obj, props) {
	const result = Object.create(null);
	for (const prop of Object.keys(obj)) if (props.includes(prop)) result[prop] = obj[prop];
	return result;
}
function mergeDicts(base, ext, fields) {
	const result = { ...base };
	for (const [key, props] of Object.entries(ext)) result[key] = {
		...result[key],
		...fields ? extractProps(props, fields) : props
	};
	return result;
}
function mix(dest, src) {
	const result = { ...dest };
	for (const [prop, value] of Object.entries(src)) switch (prop) {
		case "generic":
			result[prop] = Boolean(value);
			break;
		case "cssWideKeywords":
			result[prop] = dest[prop] ? [...dest[prop], ...value] : value || [];
			break;
		case "units":
			result[prop] = { ...dest[prop] };
			for (const [name, patch] of Object.entries(value)) result[prop][name] = Array.isArray(patch) ? patch : [];
			break;
		case "atrules":
			result[prop] = { ...dest[prop] };
			for (const [name, atrule] of Object.entries(value)) {
				const exists = result[prop][name] || {};
				const current = result[prop][name] = {
					prelude: exists.prelude || null,
					descriptors: { ...exists.descriptors }
				};
				if (!atrule) continue;
				current.prelude = atrule.prelude ? appendOrSet(current.prelude, atrule.prelude) : current.prelude || null;
				for (const [descriptorName, descriptorValue] of Object.entries(atrule.descriptors || {})) current.descriptors[descriptorName] = descriptorValue ? appendOrSet(current.descriptors[descriptorName], descriptorValue) : null;
				if (!Object.keys(current.descriptors).length) current.descriptors = null;
			}
			break;
		case "types":
		case "properties":
			result[prop] = { ...dest[prop] };
			for (const [name, syntax] of Object.entries(value)) result[prop][name] = appendOrSet(result[prop][name], syntax);
			break;
		case "parseContext":
			result[prop] = {
				...dest[prop],
				...value
			};
			break;
		case "scope":
		case "features":
			result[prop] = mergeDicts(dest[prop], value);
			break;
		case "atrule":
		case "pseudo":
			result[prop] = mergeDicts(dest[prop], value, ["parse"]);
			break;
		case "node":
			result[prop] = mergeDicts(dest[prop], value, [
				"name",
				"structure",
				"parse",
				"generate",
				"walkContext"
			]);
			break;
	}
	return result;
}
//#endregion
//#region node_modules/css-tree/lib/syntax/create.js
function createSyntax(config) {
	const parse = createParser(config);
	const walk = createWalker(config);
	const generate = createGenerator$1(config);
	const { fromPlainObject, toPlainObject } = createConvertor(walk);
	const syntax = {
		lexer: null,
		createLexer: (config) => new Lexer(config, syntax, syntax.lexer.structure),
		tokenize: tokenize$1,
		parse,
		generate,
		walk,
		find: walk.find,
		findLast: walk.findLast,
		findAll: walk.findAll,
		fromPlainObject,
		toPlainObject,
		fork(extension) {
			const base = mix({}, config);
			return createSyntax(typeof extension === "function" ? extension(base) : mix(base, extension));
		}
	};
	syntax.lexer = new Lexer({
		generic: config.generic,
		cssWideKeywords: config.cssWideKeywords,
		units: config.units,
		types: config.types,
		atrules: config.atrules,
		properties: config.properties,
		node: config.node
	}, syntax);
	return syntax;
}
var create_default = (config) => createSyntax(mix({}, config));
//#endregion
//#region node_modules/css-tree/dist/data.js
var data_default = {
	"generic": true,
	"cssWideKeywords": [
		"initial",
		"inherit",
		"unset",
		"revert",
		"revert-layer"
	],
	"units": {
		"angle": [
			"deg",
			"grad",
			"rad",
			"turn"
		],
		"decibel": ["db"],
		"flex": ["fr"],
		"frequency": ["hz", "khz"],
		"length": [
			"cm",
			"mm",
			"q",
			"in",
			"pt",
			"pc",
			"px",
			"em",
			"rem",
			"ex",
			"rex",
			"cap",
			"rcap",
			"ch",
			"rch",
			"ic",
			"ric",
			"lh",
			"rlh",
			"vw",
			"svw",
			"lvw",
			"dvw",
			"vh",
			"svh",
			"lvh",
			"dvh",
			"vi",
			"svi",
			"lvi",
			"dvi",
			"vb",
			"svb",
			"lvb",
			"dvb",
			"vmin",
			"svmin",
			"lvmin",
			"dvmin",
			"vmax",
			"svmax",
			"lvmax",
			"dvmax",
			"cqw",
			"cqh",
			"cqi",
			"cqb",
			"cqmin",
			"cqmax"
		],
		"resolution": [
			"dpi",
			"dpcm",
			"dppx",
			"x"
		],
		"semitones": ["st"],
		"time": ["s", "ms"]
	},
	"types": {
		"abs()": "abs( <calc-sum> )",
		"absolute-size": "xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large",
		"acos()": "acos( <calc-sum> )",
		"alpha-value": "<number>|<percentage>",
		"an+b": "odd|even|<integer>|<n-dimension>|'+'? † n|-n|<ndashdigit-dimension>|'+'? † <ndashdigit-ident>|<dashndashdigit-ident>|<n-dimension> <signed-integer>|'+'? † n <signed-integer>|-n <signed-integer>|<ndash-dimension> <signless-integer>|'+'? † n- <signless-integer>|-n- <signless-integer>|<n-dimension> ['+'|'-'] <signless-integer>|'+'? † n ['+'|'-'] <signless-integer>|-n ['+'|'-'] <signless-integer>",
		"anchor()": "anchor( <anchor-name>?&&<anchor-side> , <length-percentage>? )",
		"anchor-name": "<dashed-ident>",
		"anchor-side": "inside|outside|top|left|right|bottom|start|end|self-start|self-end|<percentage>|center",
		"anchor-size": "width|height|block|inline|self-block|self-inline",
		"anchor-size()": "anchor-size( [<anchor-name>||<anchor-size>]? , <length-percentage>? )",
		"angle-percentage": "<angle>|<percentage>",
		"angular-color-hint": "<angle-percentage>|<zero>",
		"angular-color-stop": "<color> <color-stop-angle>?",
		"angular-color-stop-list": "<angular-color-stop> , [<angular-color-hint>? , <angular-color-stop>]#?",
		"animateable-feature": "scroll-position|contents|<custom-ident>",
		"animation-action": "none|play|play-once|play-forwards|play-backwards|pause|reset|replay",
		"asin()": "asin( <calc-sum> )",
		"atan()": "atan( <calc-sum> )",
		"atan2()": "atan2( <calc-sum> , <calc-sum> )",
		"attachment": "scroll|fixed|local",
		"attr()": "attr( <attr-name> <attr-type>? , <declaration-value>? )",
		"attr-matcher": "['~'|'|'|'^'|'$'|'*']? '='",
		"attr-modifier": "i|s",
		"attr-type": "type( <syntax> )|raw-string|number|<attr-unit>",
		"attribute-selector": "'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'",
		"auto-repeat": "repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )",
		"auto-track-list": "[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",
		"axis": "block|inline|x|y",
		"baseline-position": "[first|last]? baseline",
		"basic-shape": "<inset()>|<xywh()>|<rect()>|<circle()>|<ellipse()>|<polygon()>|<path()>",
		"basic-shape-rect": "<inset()>|<rect()>|<xywh()>",
		"bg-clip": "<visual-box>|border-area|text",
		"bg-image": "<image>|none",
		"bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<visual-box>||<visual-box>",
		"bg-position": "[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]",
		"bg-size": "[<length-percentage [0,∞]>|auto]{1,2}|cover|contain",
		"blend-mode": "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",
		"blur()": "blur( <length>? )",
		"brightness()": "brightness( [<number>|<percentage>]? )",
		"calc()": "calc( <calc-sum> )",
		"calc-constant": "e|pi|infinity|-infinity|NaN",
		"calc-product": "<calc-value> ['*' <calc-value>|'/' <number>]*",
		"calc-size()": "calc-size( <calc-size-basis> , <calc-sum> )",
		"calc-size-basis": "<intrinsic-size-keyword>|<calc-size()>|any|<calc-sum>",
		"calc-sum": "<calc-product> [['+'|'-'] <calc-product>]*",
		"calc-value": "<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )",
		"cf-final-image": "<image>|<color>",
		"cf-mixing-image": "<percentage>?&&<image>",
		"circle()": "circle( <radial-size>? [at <position>]? )",
		"clamp()": "clamp( <calc-sum>#{3} )",
		"class-selector": "'.' <ident-token>",
		"clip-source": "<url>",
		"color": "<color-base>|currentColor|<system-color>|<device-cmyk()>|<light-dark()>|<-non-standard-color>",
		"color()": "color( <colorspace-params> [/ [<alpha-value>|none]]? )",
		"color-base": "<hex-color>|<color-function>|<named-color>|<color-mix()>|transparent",
		"color-function": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
		"color-interpolation-method": "in [<rectangular-color-space>|<polar-color-space> <hue-interpolation-method>?|<custom-color-space>]",
		"color-mix()": "color-mix( <color-interpolation-method> , [<color>&&<percentage [0,100]>?]#{2} )",
		"color-stop": "<color-stop-length>|<color-stop-angle>",
		"color-stop-angle": "[<angle-percentage>|<zero>]{1,2}",
		"color-stop-length": "<length-percentage>{1,2}",
		"color-stop-list": "<linear-color-stop> , [<linear-color-hint>? , <linear-color-stop>]#?",
		"colorspace-params": "[<predefined-rgb-params>|<xyz-params>]",
		"combinator": "'>'|'+'|'~'|['|' '|']",
		"common-lig-values": "[common-ligatures|no-common-ligatures]",
		"compat-auto": "searchfield|textarea|checkbox|radio|menulist|listbox|meter|progress-bar|button",
		"compat-special": "textfield|menulist-button",
		"complex-selector": "<complex-selector-unit> [<combinator>? <complex-selector-unit>]*",
		"complex-selector-list": "<complex-selector>#",
		"composite-style": "clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor",
		"compositing-operator": "add|subtract|intersect|exclude",
		"compound-selector": "[<type-selector>? <subclass-selector>*]!",
		"compound-selector-list": "<compound-selector>#",
		"conic-gradient()": "conic-gradient( [<conic-gradient-syntax>] )",
		"conic-gradient-syntax": "[[[from [<angle>|<zero>]]? [at <position>]?]||<color-interpolation-method>]? , <angular-color-stop-list>",
		"container-condition": "not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]",
		"container-name": "<custom-ident>",
		"container-query": "not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]",
		"content-distribution": "space-between|space-around|space-evenly|stretch",
		"content-list": "[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+",
		"content-position": "center|start|end|flex-start|flex-end",
		"content-replacement": "<image>",
		"contextual-alt-values": "[contextual|no-contextual]",
		"contrast()": "contrast( [<number>|<percentage>]? )",
		"coord-box": "content-box|padding-box|border-box|fill-box|stroke-box|view-box",
		"corner-shape-value": "round|scoop|bevel|notch|square|squircle|<superellipse()>",
		"cos()": "cos( <calc-sum> )",
		"counter": "<counter()>|<counters()>",
		"counter()": "counter( <counter-name> , <counter-style>? )",
		"counter-name": "<custom-ident>",
		"counter-style": "<counter-style-name>|symbols( )",
		"counter-style-name": "<custom-ident>",
		"counters()": "counters( <counter-name> , <string> , <counter-style>? )",
		"cross-fade()": "cross-fade( <cf-mixing-image> , <cf-final-image>? )",
		"cubic-bezier()": "cubic-bezier( [<number [0,1]> , <number>]#{2} )",
		"cubic-bezier-easing-function": "ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )",
		"cursor-predefined": "auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing",
		"custom-color-space": "<dashed-ident>",
		"custom-params": "<dashed-ident> [<number>|<percentage>|none]+",
		"dasharray": "[[<length-percentage>|<number>]+]#",
		"dashndashdigit-ident": "<ident-token>",
		"deprecated-system-color": "ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonHighlight|ButtonShadow|CaptionText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText",
		"discretionary-lig-values": "[discretionary-ligatures|no-discretionary-ligatures]",
		"display-box": "contents|none",
		"display-inside": "flow|flow-root|table|flex|grid|ruby",
		"display-internal": "table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container",
		"display-legacy": "inline-block|inline-list-item|inline-table|inline-flex|inline-grid",
		"display-listitem": "<display-outside>?&&[flow|flow-root]?&&list-item",
		"display-outside": "block|inline|run-in",
		"drop-shadow()": "drop-shadow( [<color>?&&<length>{2,3}] )",
		"dynamic-range-limit-mix()": "dynamic-range-limit-mix( [<'dynamic-range-limit'>&&<percentage [0,100]>]#{2,} )",
		"easing-function": "<linear-easing-function>|<cubic-bezier-easing-function>|<step-easing-function>",
		"east-asian-variant-values": "[jis78|jis83|jis90|jis04|simplified|traditional]",
		"east-asian-width-values": "[full-width|proportional-width]",
		"element()": "element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )",
		"ellipse()": "ellipse( <radial-size>? [at <position>]? )",
		"env()": "env( <custom-ident> , <declaration-value>? )",
		"exp()": "exp( <calc-sum> )",
		"explicit-track-list": "[<line-names>? <track-size>]+ <line-names>?",
		"family-name": "<string>|<custom-ident>+",
		"feature-tag-value": "<string> [<integer>|on|off]?",
		"feature-type": "@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation",
		"feature-value-block": "<feature-type> '{' <feature-value-declaration-list> '}'",
		"feature-value-block-list": "<feature-value-block>+",
		"feature-value-declaration": "<custom-ident> : <integer>+ ;",
		"feature-value-declaration-list": "<feature-value-declaration>",
		"feature-value-name": "<custom-ident>",
		"filter-function": "<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>",
		"filter-value-list": "[<filter-function>|<url>]+",
		"final-bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<visual-box>||<visual-box>||<'background-color'>",
		"fit-content()": "fit-content( <length-percentage [0,∞]> )",
		"fixed-breadth": "<length-percentage>",
		"fixed-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <fixed-size>]+ <line-names>? )",
		"fixed-size": "<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )",
		"font-stretch-absolute": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>",
		"font-variant-css2": "normal|small-caps",
		"font-weight-absolute": "normal|bold|<number [1,1000]>",
		"font-width-css3": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
		"form-control-identifier": "select",
		"frequency-percentage": "<frequency>|<percentage>",
		"generic-complete": "serif|sans-serif|system-ui|cursive|fantasy|math|monospace",
		"general-enclosed": "[<function-token> <any-value>? )]|[( <any-value>? )]",
		"generic-family": "<generic-script-specific>|<generic-complete>|<generic-incomplete>|<-non-standard-generic-family>",
		"generic-incomplete": "ui-serif|ui-sans-serif|ui-monospace|ui-rounded",
		"geometry-box": "<shape-box>|fill-box|stroke-box|view-box",
		"gradient": "<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>",
		"grayscale()": "grayscale( [<number>|<percentage>]? )",
		"grid-line": "auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]",
		"historical-lig-values": "[historical-ligatures|no-historical-ligatures]",
		"hsl()": "hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )|hsl( [<hue>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"hsla()": "hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )|hsla( [<hue>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"hue": "<number>|<angle>",
		"hue-interpolation-method": "[shorter|longer|increasing|decreasing] hue",
		"hue-rotate()": "hue-rotate( [<angle>|<zero>]? )",
		"hwb()": "hwb( [<hue>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"hypot()": "hypot( <calc-sum># )",
		"image": "<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>",
		"image()": "image( <image-tags>? [<image-src>? , <color>?]! )",
		"image-set()": "image-set( <image-set-option># )",
		"image-set-option": "[<image>|<string>] [<resolution>||type( <string> )]",
		"image-src": "<url>|<string>",
		"image-tags": "ltr|rtl",
		"inflexible-breadth": "<length-percentage>|min-content|max-content|auto",
		"inset()": "inset( <length-percentage>{1,4} [round <'border-radius'>]? )",
		"invert()": "invert( [<number>|<percentage>]? )",
		"keyframe-block": "<keyframe-selector># { <declaration-list> }",
		"keyframe-selector": "from|to|<percentage [0,100]>|<timeline-range-name> <percentage>",
		"keyframes-name": "<custom-ident>|<string>",
		"lab()": "lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"layer()": "layer( <layer-name> )",
		"layer-name": "<ident> ['.' <ident>]*",
		"lch()": "lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
		"leader()": "leader( <leader-type> )",
		"leader-type": "dotted|solid|space|<string>",
		"length-percentage": "<length>|<percentage>",
		"light-dark()": "light-dark( <color> , <color> )",
		"line-name-list": "[<line-names>|<name-repeat>]+",
		"line-names": "'[' <custom-ident>* ']'",
		"line-style": "none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset",
		"line-width": "<length>|thin|medium|thick",
		"linear()": "linear( [<number>&&<percentage>{0,2}]# )",
		"linear-color-hint": "<length-percentage>",
		"linear-color-stop": "<color> <color-stop-length>?",
		"linear-easing-function": "linear|<linear()>",
		"linear-gradient()": "linear-gradient( [<linear-gradient-syntax>] )",
		"linear-gradient-syntax": "[[<angle>|<zero>|to <side-or-corner>]||<color-interpolation-method>]? , <color-stop-list>",
		"log()": "log( <calc-sum> , <calc-sum>? )",
		"mask-layer": "<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>",
		"mask-position": "[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?",
		"mask-reference": "none|<image>|<mask-source>",
		"mask-source": "<url>",
		"masking-mode": "alpha|luminance|match-source",
		"matrix()": "matrix( <number>#{6} )",
		"matrix3d()": "matrix3d( <number>#{16} )",
		"max()": "max( <calc-sum># )",
		"media-and": "<media-in-parens> [and <media-in-parens>]+",
		"media-condition": "<media-not>|<media-and>|<media-or>|<media-in-parens>",
		"media-condition-without-or": "<media-not>|<media-and>|<media-in-parens>",
		"media-feature": "( [<mf-plain>|<mf-boolean>|<mf-range>] )",
		"media-in-parens": "( <media-condition> )|<media-feature>|<general-enclosed>",
		"media-not": "not <media-in-parens>",
		"media-or": "<media-in-parens> [or <media-in-parens>]+",
		"media-query": "<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?",
		"media-query-list": "<media-query>#",
		"media-type": "<ident>",
		"mf-boolean": "<mf-name>",
		"mf-name": "<ident>",
		"mf-plain": "<mf-name> : <mf-value>",
		"mf-range": "<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>",
		"mf-value": "<number>|<dimension>|<ident>|<ratio>",
		"min()": "min( <calc-sum># )",
		"minmax()": "minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )",
		"mod()": "mod( <calc-sum> , <calc-sum> )",
		"n-dimension": "<dimension-token>",
		"name-repeat": "repeat( [<integer [1,∞]>|auto-fill] , <line-names>+ )",
		"named-color": "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
		"namespace-prefix": "<ident>",
		"ndash-dimension": "<dimension-token>",
		"ndashdigit-dimension": "<dimension-token>",
		"ndashdigit-ident": "<ident-token>",
		"ns-prefix": "[<ident-token>|'*']? '|'",
		"number-percentage": "<number>|<percentage>",
		"numeric-figure-values": "[lining-nums|oldstyle-nums]",
		"numeric-fraction-values": "[diagonal-fractions|stacked-fractions]",
		"numeric-spacing-values": "[proportional-nums|tabular-nums]",
		"offset-path": "<ray()>|<url>|<basic-shape>",
		"oklab()": "oklab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
		"oklch()": "oklch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
		"opacity()": "opacity( [<number>|<percentage>]? )",
		"opacity-value": "<number>|<percentage>",
		"outline-line-style": "none|dotted|dashed|solid|double|groove|ridge|inset|outset",
		"outline-radius": "<length>|<percentage>",
		"overflow-position": "unsafe|safe",
		"page-body": "<declaration>? [; <page-body>]?|<page-margin-box> <page-body>",
		"page-margin-box": "<page-margin-box-type> '{' <declaration-list> '}'",
		"page-margin-box-type": "@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom",
		"page-selector": "<pseudo-page>+|<ident> <pseudo-page>*",
		"page-selector-list": "[<page-selector>#]?",
		"page-size": "A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger",
		"paint": "none|<color>|<url> [none|<color>]?|context-fill|context-stroke",
		"paint()": "paint( <ident> , <declaration-value>? )",
		"paint-box": "<visual-box>|fill-box|stroke-box",
		"palette-identifier": "<dashed-ident>",
		"palette-mix()": "palette-mix( <color-interpolation-method> , [[normal|light|dark|<palette-identifier>|<palette-mix()>]&&<percentage [0,100]>?]#{2} )",
		"path()": "path( <'fill-rule'>? , <string> )",
		"perspective()": "perspective( [<length [0,∞]>|none] )",
		"polar-color-space": "hsl|hwb|lch|oklch",
		"polygon()": "polygon( <'fill-rule'>? , [<length-percentage> <length-percentage>]# )",
		"position": "[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]",
		"position-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|center|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|center|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
		"pow()": "pow( <calc-sum> , <calc-sum> )",
		"predefined-rgb": "srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020",
		"predefined-rgb-params": "<predefined-rgb> [<number>|<percentage>|none]{3}",
		"pseudo-class-selector": "':' <ident-token>|':' <function-token> <any-value> ')'",
		"pseudo-element-selector": "':' <pseudo-class-selector>|<legacy-pseudo-element-selector>",
		"pseudo-page": ": [left|right|first|blank]",
		"query-in-parens": "( <container-condition> )|( <size-feature> )|style( <style-query> )|<general-enclosed>",
		"quote": "open-quote|close-quote|no-open-quote|no-close-quote",
		"radial-extent": "closest-corner|closest-side|farthest-corner|farthest-side",
		"radial-gradient()": "radial-gradient( [<radial-gradient-syntax>] )",
		"radial-gradient-syntax": "[[[<radial-shape>||<radial-size>]? [at <position>]?]||<color-interpolation-method>]? , <color-stop-list>",
		"radial-shape": "circle|ellipse",
		"radial-size": "<radial-extent>|<length [0,∞]>|<length-percentage [0,∞]>{2}",
		"ratio": "<number [0,∞]> [/ <number [0,∞]>]?",
		"ray()": "ray( <angle>&&<ray-size>?&&contain?&&[at <position>]? )",
		"ray-size": "closest-side|closest-corner|farthest-side|farthest-corner|sides",
		"rect()": "rect( [<length-percentage>|auto]{4} [round <'border-radius'>]? )",
		"rectangular-color-space": "srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65",
		"relative-selector": "<combinator>? <complex-selector>",
		"relative-selector-list": "<relative-selector>#",
		"relative-size": "larger|smaller",
		"rem()": "rem( <calc-sum> , <calc-sum> )",
		"repeat-style": "repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}",
		"repeating-conic-gradient()": "repeating-conic-gradient( [<conic-gradient-syntax>] )",
		"repeating-linear-gradient()": "repeating-linear-gradient( [<linear-gradient-syntax>] )",
		"repeating-radial-gradient()": "repeating-radial-gradient( [<radial-gradient-syntax>] )",
		"reversed-counter-name": "reversed( <counter-name> )",
		"rgb()": "rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )|rgb( [<number>|<percentage>|none]{3} [/ [<alpha-value>|none]]? )",
		"rgba()": "rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )|rgba( [<number>|<percentage>|none]{3} [/ [<alpha-value>|none]]? )",
		"rotate()": "rotate( [<angle>|<zero>] )",
		"rotate3d()": "rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )",
		"rotateX()": "rotateX( [<angle>|<zero>] )",
		"rotateY()": "rotateY( [<angle>|<zero>] )",
		"rotateZ()": "rotateZ( [<angle>|<zero>] )",
		"round()": "round( <rounding-strategy>? , <calc-sum> , <calc-sum> )",
		"rounding-strategy": "nearest|up|down|to-zero",
		"saturate()": "saturate( [<number>|<percentage>]? )",
		"scale()": "scale( [<number>|<percentage>]#{1,2} )",
		"scale3d()": "scale3d( [<number>|<percentage>]#{3} )",
		"scaleX()": "scaleX( [<number>|<percentage>] )",
		"scaleY()": "scaleY( [<number>|<percentage>] )",
		"scaleZ()": "scaleZ( [<number>|<percentage>] )",
		"scope-end": "<forgiving-selector-list>",
		"scope-start": "<forgiving-selector-list>",
		"scroll()": "scroll( [<scroller>||<axis>]? )",
		"scroller": "root|nearest|self",
		"scroll-state-feature": "<media-query-list>",
		"scroll-state-in-parens": "( <scroll-state-query> )|( <scroll-state-feature> )|<general-enclosed>",
		"scroll-state-query": "not <scroll-state-in-parens>|<scroll-state-in-parens> [[and <scroll-state-in-parens>]*|[or <scroll-state-in-parens>]*]|<scroll-state-feature>",
		"selector-list": "<complex-selector-list>",
		"self-position": "center|start|end|self-start|self-end|flex-start|flex-end",
		"sepia()": "sepia( [<number>|<percentage>]? )",
		"shadow": "inset?&&<length>{2,4}&&<color>?",
		"shadow-t": "[<length>{2,3}&&<color>?]",
		"shape": "rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )",
		"shape-box": "<visual-box>|margin-box",
		"side-or-corner": "[left|right]||[top|bottom]",
		"sign()": "sign( <calc-sum> )",
		"signed-integer": "<number-token>",
		"signless-integer": "<number-token>",
		"sin()": "sin( <calc-sum> )",
		"single-animation": "<'animation-duration'>||<easing-function>||<'animation-delay'>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]||<single-animation-timeline>",
		"single-animation-composition": "replace|add|accumulate",
		"single-animation-direction": "normal|reverse|alternate|alternate-reverse",
		"single-animation-fill-mode": "none|forwards|backwards|both",
		"single-animation-iteration-count": "infinite|<number>",
		"single-animation-play-state": "running|paused",
		"single-animation-timeline": "auto|none|<dashed-ident>|<scroll()>|<view()>",
		"single-transition": "[none|<single-transition-property>]||<time>||<easing-function>||<time>||<transition-behavior-value>",
		"single-transition-property": "all|<custom-ident>",
		"size": "closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}",
		"size-feature": "<mf-plain>|<mf-boolean>|<mf-range>",
		"skew()": "skew( [<angle>|<zero>] , [<angle>|<zero>]? )",
		"skewX()": "skewX( [<angle>|<zero>] )",
		"skewY()": "skewY( [<angle>|<zero>] )",
		"sqrt()": "sqrt( <calc-sum> )",
		"step-position": "jump-start|jump-end|jump-none|jump-both|start|end",
		"step-easing-function": "step-start|step-end|<steps()>",
		"steps()": "steps( <integer> , <step-position>? )",
		"style-feature": "<declaration>",
		"style-in-parens": "( <style-condition> )|( <style-feature> )|<general-enclosed>",
		"style-query": "<style-condition>|<style-feature>",
		"subclass-selector": "<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>",
		"superellipse()": "superellipse( [<number>|infinity|-infinity] )",
		"supports-condition": "not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*",
		"supports-decl": "( <declaration> )",
		"supports-feature": "<supports-decl>|<supports-selector-fn>",
		"supports-in-parens": "( <supports-condition> )|<supports-feature>|<general-enclosed>",
		"supports-selector-fn": "selector( <complex-selector> )",
		"symbol": "<string>|<image>|<custom-ident>",
		"symbols()": "symbols( <symbols-type>? [<string>|<image>]+ )",
		"symbols-type": "cyclic|numeric|alphabetic|symbolic|fixed",
		"system-color": "AccentColor|AccentColorText|ActiveText|ButtonBorder|ButtonFace|ButtonText|Canvas|CanvasText|Field|FieldText|GrayText|Highlight|HighlightText|LinkText|Mark|MarkText|SelectedItem|SelectedItemText|VisitedText",
		"system-family-name": "caption|icon|menu|message-box|small-caption|status-bar",
		"tan()": "tan( <calc-sum> )",
		"target": "<target-counter()>|<target-counters()>|<target-text()>",
		"target-counter()": "target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )",
		"target-counters()": "target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )",
		"target-text()": "target-text( [<string>|<url>] , [content|before|after|first-letter]? )",
		"text-edge": "[text|cap|ex|ideographic|ideographic-ink] [text|alphabetic|ideographic|ideographic-ink]?",
		"time-percentage": "<time>|<percentage>",
		"timeline-range-name": "cover|contain|entry|exit|entry-crossing|exit-crossing",
		"track-breadth": "<length-percentage>|<flex>|min-content|max-content|auto",
		"track-list": "[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?",
		"track-repeat": "repeat( [<integer [1,∞]>] , [<line-names>? <track-size>]+ <line-names>? )",
		"track-size": "<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )",
		"transform-function": "<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>",
		"transform-list": "<transform-function>+",
		"transition-behavior-value": "normal|allow-discrete",
		"translate()": "translate( <length-percentage> , <length-percentage>? )",
		"translate3d()": "translate3d( <length-percentage> , <length-percentage> , <length> )",
		"translateX()": "translateX( <length-percentage> )",
		"translateY()": "translateY( <length-percentage> )",
		"translateZ()": "translateZ( <length> )",
		"try-size": "most-width|most-height|most-block-size|most-inline-size",
		"try-tactic": "flip-block||flip-inline||flip-start",
		"type-or-unit": "string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%",
		"type-selector": "<wq-name>|<ns-prefix>? '*'",
		"var()": "var( <custom-property-name> , <declaration-value>? )",
		"view()": "view( [<axis>||<'view-timeline-inset'>]? )",
		"viewport-length": "auto|<length-percentage>",
		"visual-box": "content-box|padding-box|border-box",
		"wq-name": "<ns-prefix>? <ident-token>",
		"xywh()": "xywh( <length-percentage>{2} <length-percentage [0,∞]>{2} [round <'border-radius'>]? )",
		"xyz": "xyz|xyz-d50|xyz-d65",
		"xyz-params": "<xyz-space> [<number>|<percentage>|none]{3}",
		"-legacy-gradient": "<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>",
		"-legacy-linear-gradient": "-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )",
		"-legacy-repeating-linear-gradient": "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )",
		"-legacy-linear-gradient-arguments": "[<angle>|<side-or-corner>]? , <color-stop-list>",
		"-legacy-radial-gradient": "-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )",
		"-legacy-repeating-radial-gradient": "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )",
		"-legacy-radial-gradient-arguments": "[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>",
		"-legacy-radial-gradient-size": "closest-side|closest-corner|farthest-side|farthest-corner|contain|cover",
		"-legacy-radial-gradient-shape": "circle|ellipse",
		"-non-standard-font": "-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body",
		"-non-standard-color": "-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text",
		"-non-standard-image-rendering": "optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast",
		"-non-standard-overflow": "overlay|-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable",
		"-non-standard-size": "intrinsic|min-intrinsic|-webkit-fill-available|-webkit-fit-content|-webkit-min-content|-webkit-max-content|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content",
		"-webkit-gradient()": "-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )",
		"-webkit-gradient-color-stop": "from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )",
		"-webkit-gradient-point": "[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]",
		"-webkit-gradient-radius": "<length>|<percentage>",
		"-webkit-gradient-type": "linear|radial",
		"-webkit-mask-box-repeat": "repeat|stretch|round",
		"-ms-filter-function-list": "<-ms-filter-function>+",
		"-ms-filter-function": "<-ms-filter-function-progid>|<-ms-filter-function-legacy>",
		"-ms-filter-function-progid": "'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]",
		"-ms-filter-function-legacy": "<ident-token>|<function-token> <any-value>? )",
		"age": "child|young|old",
		"attr-name": "<wq-name>",
		"attr-fallback": "<any-value>",
		"autospace": "no-autospace|[ideograph-alpha||ideograph-numeric||punctuation]||[insert|replace]",
		"bottom": "<length>|auto",
		"generic-voice": "[<age>? <gender> <integer>?]",
		"gender": "male|female|neutral",
		"generic-script-specific": "generic( kai )|generic( fangsong )|generic( nastaliq )",
		"-non-standard-generic-family": "-apple-system|BlinkMacSystemFont",
		"intrinsic-size-keyword": "min-content|max-content|fit-content",
		"left": "<length>|auto",
		"device-cmyk()": "<legacy-device-cmyk-syntax>|<modern-device-cmyk-syntax>",
		"legacy-device-cmyk-syntax": "device-cmyk( <number>#{4} )",
		"modern-device-cmyk-syntax": "device-cmyk( <cmyk-component>{4} [/ [<alpha-value>|none]]? )",
		"cmyk-component": "<number>|<percentage>|none",
		"color-space": "<rectangular-color-space>|<polar-color-space>|<custom-color-space>",
		"right": "<length>|auto",
		"forgiving-selector-list": "<complex-real-selector-list>",
		"forgiving-relative-selector-list": "<relative-real-selector-list>",
		"complex-real-selector-list": "<complex-real-selector>#",
		"simple-selector-list": "<simple-selector>#",
		"relative-real-selector-list": "<relative-real-selector>#",
		"complex-selector-unit": "[<compound-selector>? <pseudo-compound-selector>*]!",
		"complex-real-selector": "<compound-selector> [<combinator>? <compound-selector>]*",
		"relative-real-selector": "<combinator>? <complex-real-selector>",
		"pseudo-compound-selector": "<pseudo-element-selector> <pseudo-class-selector>*",
		"simple-selector": "<type-selector>|<subclass-selector>",
		"legacy-pseudo-element-selector": "':' [before|after|first-line|first-letter]",
		"svg-length": "<percentage>|<length>|<number>",
		"svg-writing-mode": "lr-tb|rl-tb|tb-rl|lr|rl|tb",
		"top": "<length>|auto",
		"x": "<number>",
		"y": "<number>",
		"declaration": "<ident-token> : <declaration-value>? ['!' important]?",
		"declaration-list": "[<declaration>? ';']* <declaration>?",
		"url": "url( <string> <url-modifier>* )|<url-token>",
		"url-modifier": "<ident>|<function-token> <any-value> )",
		"number-zero-one": "<number [0,1]>",
		"number-one-or-greater": "<number [1,∞]>",
		"xyz-space": "xyz|xyz-d50|xyz-d65",
		"style-condition": "not <style-in-parens>|<style-in-parens> [[and <style-in-parens>]*|[or <style-in-parens>]*]",
		"-non-standard-display": "-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box",
		"inset-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
		"syntax": "'*'|<syntax-component> [<syntax-combinator> <syntax-component>]*|<syntax-string>",
		"syntax-component": "<syntax-single-component> <syntax-multiplier>?|'<' transform-list '>'",
		"syntax-single-component": "'<' <syntax-type-name> '>'|<ident>",
		"syntax-type-name": "angle|color|custom-ident|image|integer|length|length-percentage|number|percentage|resolution|string|time|url|transform-function",
		"syntax-combinator": "'|'",
		"syntax-multiplier": "'#'|'+'",
		"syntax-string": "<string>"
	},
	"properties": {
		"--*": "<declaration-value>",
		"-ms-accelerator": "false|true",
		"-ms-block-progression": "tb|rl|bt|lr",
		"-ms-content-zoom-chaining": "none|chained",
		"-ms-content-zoom-limit": "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
		"-ms-content-zoom-limit-max": "<percentage>",
		"-ms-content-zoom-limit-min": "<percentage>",
		"-ms-content-zoom-snap": "<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>",
		"-ms-content-zoom-snap-points": "snapInterval( <percentage> , <percentage> )|snapList( <percentage># )",
		"-ms-content-zoom-snap-type": "none|proximity|mandatory",
		"-ms-content-zooming": "none|zoom",
		"-ms-filter": "<string>",
		"-ms-flow-from": "[none|<custom-ident>]#",
		"-ms-flow-into": "[none|<custom-ident>]#",
		"-ms-grid-columns": "none|<track-list>|<auto-track-list>",
		"-ms-grid-rows": "none|<track-list>|<auto-track-list>",
		"-ms-high-contrast-adjust": "auto|none",
		"-ms-hyphenate-limit-chars": "auto|<integer>{1,3}",
		"-ms-hyphenate-limit-lines": "no-limit|<integer>",
		"-ms-hyphenate-limit-zone": "<percentage>|<length>",
		"-ms-ime-align": "auto|after",
		"-ms-overflow-style": "auto|none|scrollbar|-ms-autohiding-scrollbar",
		"-ms-scroll-chaining": "chained|none",
		"-ms-scroll-limit": "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
		"-ms-scroll-limit-x-max": "auto|<length>",
		"-ms-scroll-limit-x-min": "<length>",
		"-ms-scroll-limit-y-max": "auto|<length>",
		"-ms-scroll-limit-y-min": "<length>",
		"-ms-scroll-rails": "none|railed",
		"-ms-scroll-snap-points-x": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
		"-ms-scroll-snap-points-y": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
		"-ms-scroll-snap-type": "none|proximity|mandatory",
		"-ms-scroll-snap-x": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
		"-ms-scroll-snap-y": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
		"-ms-scroll-translation": "none|vertical-to-horizontal",
		"-ms-scrollbar-3dlight-color": "<color>",
		"-ms-scrollbar-arrow-color": "<color>",
		"-ms-scrollbar-base-color": "<color>",
		"-ms-scrollbar-darkshadow-color": "<color>",
		"-ms-scrollbar-face-color": "<color>",
		"-ms-scrollbar-highlight-color": "<color>",
		"-ms-scrollbar-shadow-color": "<color>",
		"-ms-scrollbar-track-color": "<color>",
		"-ms-text-autospace": "none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space",
		"-ms-touch-select": "grippers|none",
		"-ms-user-select": "none|element|text",
		"-ms-wrap-flow": "auto|both|start|end|maximum|clear",
		"-ms-wrap-margin": "<length>",
		"-ms-wrap-through": "wrap|none",
		"-moz-appearance": "none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized",
		"-moz-binding": "<url>|none",
		"-moz-border-bottom-colors": "<color>+|none",
		"-moz-border-left-colors": "<color>+|none",
		"-moz-border-right-colors": "<color>+|none",
		"-moz-border-top-colors": "<color>+|none",
		"-moz-context-properties": "none|[fill|fill-opacity|stroke|stroke-opacity]#",
		"-moz-float-edge": "border-box|content-box|margin-box|padding-box",
		"-moz-force-broken-image-icon": "0|1",
		"-moz-orient": "inline|block|horizontal|vertical",
		"-moz-outline-radius": "<outline-radius>{1,4} [/ <outline-radius>{1,4}]?",
		"-moz-outline-radius-bottomleft": "<outline-radius>",
		"-moz-outline-radius-bottomright": "<outline-radius>",
		"-moz-outline-radius-topleft": "<outline-radius>",
		"-moz-outline-radius-topright": "<outline-radius>",
		"-moz-stack-sizing": "ignore|stretch-to-fit",
		"-moz-text-blink": "none|blink",
		"-moz-user-focus": "ignore|normal|select-after|select-before|select-menu|select-same|select-all|none",
		"-moz-user-input": "auto|none|enabled|disabled",
		"-moz-user-modify": "read-only|read-write|write-only",
		"-moz-window-dragging": "drag|no-drag",
		"-moz-window-shadow": "default|menu|tooltip|sheet|none",
		"-webkit-appearance": "none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button",
		"-webkit-border-before": "<'border-width'>||<'border-style'>||<color>",
		"-webkit-border-before-color": "<color>",
		"-webkit-border-before-style": "<'border-style'>",
		"-webkit-border-before-width": "<'border-width'>",
		"-webkit-box-reflect": "[above|below|right|left]? <length>? <image>?",
		"-webkit-line-clamp": "none|<integer>",
		"-webkit-mask": "[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<visual-box>|border|padding|content|text]||[<visual-box>|border|padding|content]]#",
		"-webkit-mask-attachment": "<attachment>#",
		"-webkit-mask-clip": "[<coord-box>|no-clip|border|padding|content|text]#",
		"-webkit-mask-composite": "<composite-style>#",
		"-webkit-mask-image": "<mask-reference>#",
		"-webkit-mask-origin": "[<coord-box>|border|padding|content]#",
		"-webkit-mask-position": "<position>#",
		"-webkit-mask-position-x": "[<length-percentage>|left|center|right]#",
		"-webkit-mask-position-y": "[<length-percentage>|top|center|bottom]#",
		"-webkit-mask-repeat": "<repeat-style>#",
		"-webkit-mask-repeat-x": "repeat|no-repeat|space|round",
		"-webkit-mask-repeat-y": "repeat|no-repeat|space|round",
		"-webkit-mask-size": "<bg-size>#",
		"-webkit-overflow-scrolling": "auto|touch",
		"-webkit-tap-highlight-color": "<color>",
		"-webkit-text-fill-color": "<color>",
		"-webkit-text-stroke": "<length>||<color>",
		"-webkit-text-stroke-color": "<color>",
		"-webkit-text-stroke-width": "<length>",
		"-webkit-touch-callout": "default|none",
		"-webkit-user-modify": "read-only|read-write|read-write-plaintext-only",
		"-webkit-user-select": "auto|none|text|all",
		"accent-color": "auto|<color>",
		"align-content": "normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>",
		"align-items": "normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]|anchor-center",
		"align-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>|anchor-center",
		"align-tracks": "[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",
		"alignment-baseline": "auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical",
		"all": "initial|inherit|unset|revert|revert-layer",
		"anchor-name": "none|<dashed-ident>#",
		"anchor-scope": "none|all|<dashed-ident>#",
		"animation": "<single-animation>#",
		"animation-composition": "<single-animation-composition>#",
		"animation-delay": "<time>#",
		"animation-direction": "<single-animation-direction>#",
		"animation-duration": "[auto|<time [0s,∞]>]#",
		"animation-fill-mode": "<single-animation-fill-mode>#",
		"animation-iteration-count": "<single-animation-iteration-count>#",
		"animation-name": "[none|<keyframes-name>]#",
		"animation-play-state": "<single-animation-play-state>#",
		"animation-range": "[<'animation-range-start'> <'animation-range-end'>?]#",
		"animation-range-end": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"animation-range-start": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"animation-timeline": "<single-animation-timeline>#",
		"animation-timing-function": "<easing-function>#",
		"animation-trigger": "[none|[<dashed-ident> <animation-action>+]+]#",
		"appearance": "none|auto|<compat-auto>|<compat-special>",
		"aspect-ratio": "auto||<ratio>",
		"backdrop-filter": "none|<filter-value-list>",
		"backface-visibility": "visible|hidden",
		"background": "<bg-layer>#? , <final-bg-layer>",
		"background-attachment": "<attachment>#",
		"background-blend-mode": "<blend-mode>#",
		"background-clip": "<bg-clip>#",
		"background-color": "<color>",
		"background-image": "<bg-image>#",
		"background-origin": "<visual-box>#",
		"background-position": "<bg-position>#",
		"background-position-x": "[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#",
		"background-position-y": "[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#",
		"background-repeat": "<repeat-style>#",
		"background-size": "<bg-size>#",
		"baseline-shift": "baseline|sub|super|<svg-length>",
		"baseline-source": "auto|first|last",
		"block-size": "<'width'>",
		"border": "<line-width>||<line-style>||<color>",
		"border-block": "<'border-block-start'>",
		"border-block-color": "<'border-top-color'>{1,2}",
		"border-block-end": "<'border-top-width'>||<'border-top-style'>||<color>",
		"border-block-end-color": "<'border-top-color'>",
		"border-block-end-style": "<'border-top-style'>",
		"border-block-end-width": "<'border-top-width'>",
		"border-block-start": "<'border-top-width'>||<'border-top-style'>||<color>",
		"border-block-start-color": "<'border-top-color'>",
		"border-block-start-style": "<'border-top-style'>",
		"border-block-start-width": "<'border-top-width'>",
		"border-block-style": "<'border-top-style'>{1,2}",
		"border-block-width": "<'border-top-width'>{1,2}",
		"border-bottom": "<line-width>||<line-style>||<color>",
		"border-bottom-color": "<'border-top-color'>",
		"border-bottom-left-radius": "<length-percentage [0,∞]>{1,2}",
		"border-bottom-right-radius": "<length-percentage [0,∞]>{1,2}",
		"border-bottom-style": "<line-style>",
		"border-bottom-width": "<line-width>",
		"border-collapse": "separate|collapse",
		"border-color": "<color>{1,4}",
		"border-end-end-radius": "<'border-top-left-radius'>",
		"border-end-start-radius": "<'border-top-left-radius'>",
		"border-image": "<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>",
		"border-image-outset": "[<length [0,∞]>|<number [0,∞]>]{1,4}",
		"border-image-repeat": "[stretch|repeat|round|space]{1,2}",
		"border-image-slice": "[<number [0,∞]>|<percentage [0,∞]>]{1,4}&&fill?",
		"border-image-source": "none|<image>",
		"border-image-width": "[<length-percentage [0,∞]>|<number [0,∞]>|auto]{1,4}",
		"border-inline": "<'border-block-start'>",
		"border-inline-color": "<'border-top-color'>{1,2}",
		"border-inline-end": "<'border-top-width'>||<'border-top-style'>||<color>",
		"border-inline-end-color": "<'border-top-color'>",
		"border-inline-end-style": "<'border-top-style'>",
		"border-inline-end-width": "<'border-top-width'>",
		"border-inline-start": "<'border-top-width'>||<'border-top-style'>||<color>",
		"border-inline-start-color": "<'border-top-color'>",
		"border-inline-start-style": "<'border-top-style'>",
		"border-inline-start-width": "<'border-top-width'>",
		"border-inline-style": "<'border-top-style'>{1,2}",
		"border-inline-width": "<'border-top-width'>{1,2}",
		"border-left": "<line-width>||<line-style>||<color>",
		"border-left-color": "<color>",
		"border-left-style": "<line-style>",
		"border-left-width": "<line-width>",
		"border-radius": "<length-percentage [0,∞]>{1,4} [/ <length-percentage [0,∞]>{1,4}]?",
		"border-right": "<line-width>||<line-style>||<color>",
		"border-right-color": "<color>",
		"border-right-style": "<line-style>",
		"border-right-width": "<line-width>",
		"border-spacing": "<length>{1,2}",
		"border-start-end-radius": "<'border-top-left-radius'>",
		"border-start-start-radius": "<'border-top-left-radius'>",
		"border-style": "<line-style>{1,4}",
		"border-top": "<line-width>||<line-style>||<color>",
		"border-top-color": "<color>",
		"border-top-left-radius": "<length-percentage [0,∞]>{1,2}",
		"border-top-right-radius": "<length-percentage [0,∞]>{1,2}",
		"border-top-style": "<line-style>",
		"border-top-width": "<line-width>",
		"border-width": "<line-width>{1,4}",
		"bottom": "auto|<length-percentage>|<anchor()>|<anchor-size()>",
		"box-align": "start|center|end|baseline|stretch",
		"box-decoration-break": "slice|clone",
		"box-direction": "normal|reverse|inherit",
		"box-flex": "<number>",
		"box-flex-group": "<integer>",
		"box-lines": "single|multiple",
		"box-ordinal-group": "<integer>",
		"box-orient": "horizontal|vertical|inline-axis|block-axis|inherit",
		"box-pack": "start|center|end|justify",
		"box-shadow": "none|<shadow>#",
		"box-sizing": "content-box|border-box",
		"break-after": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
		"break-before": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
		"break-inside": "auto|avoid|avoid-page|avoid-column|avoid-region",
		"caption-side": "top|bottom",
		"caret": "<'caret-color'>||<'caret-animation'>||<'caret-shape'>",
		"caret-animation": "auto|manual",
		"caret-color": "auto|<color>",
		"caret-shape": "auto|bar|block|underscore",
		"clear": "none|left|right|both|inline-start|inline-end",
		"clip": "<shape>|auto",
		"clip-path": "<clip-source>|[<basic-shape>||<geometry-box>]|none",
		"clip-rule": "nonzero|evenodd",
		"color": "<color>",
		"color-interpolation-filters": "auto|sRGB|linearRGB",
		"color-scheme": "normal|[light|dark|<custom-ident>]+&&only?",
		"column-count": "<integer>|auto",
		"column-fill": "auto|balance",
		"column-gap": "normal|<length-percentage>",
		"column-height": "auto|<length [0,∞]>",
		"column-rule": "<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>",
		"column-rule-color": "<color>",
		"column-rule-style": "<'border-style'>",
		"column-rule-width": "<'border-width'>",
		"column-span": "none|all",
		"column-width": "auto|<length [0,∞]>",
		"column-wrap": "auto|nowrap|wrap",
		"columns": "[<'column-width'>||<'column-count'>] [/ <'column-height'>]?",
		"contain": "none|strict|content|[[size||inline-size]||layout||style||paint]",
		"contain-intrinsic-block-size": "auto? [none|<length>]",
		"contain-intrinsic-height": "auto? [none|<length>]",
		"contain-intrinsic-inline-size": "auto? [none|<length>]",
		"contain-intrinsic-size": "[auto? [none|<length>]]{1,2}",
		"contain-intrinsic-width": "auto? [none|<length>]",
		"container": "<'container-name'> [/ <'container-type'>]?",
		"container-name": "none|<custom-ident>+",
		"container-type": "normal||[size|inline-size]",
		"content": "normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>|<attr()>]+]?",
		"content-visibility": "visible|auto|hidden",
		"corner-block-end-shape": "<corner-shape-value>{1,2}",
		"corner-block-start-shape": "<corner-shape-value>{1,2}",
		"corner-bottom-shape": "<corner-shape-value>{1,2}",
		"corner-bottom-left-shape": "<corner-shape-value>",
		"corner-bottom-right-shape": "<corner-shape-value>",
		"corner-end-end-shape": "<corner-shape-value>",
		"corner-end-start-shape": "<corner-shape-value>",
		"corner-inline-end-shape": "<corner-shape-value>{1,2}",
		"corner-inline-start-shape": "<corner-shape-value>{1,2}",
		"corner-left-shape": "<corner-shape-value>{1,2}",
		"corner-right-shape": "<corner-shape-value>{1,2}",
		"corner-shape": "<corner-shape-value>{1,4}",
		"corner-start-start-shape": "<corner-shape-value>",
		"corner-start-end-shape": "<corner-shape-value>",
		"corner-top-shape": "<corner-shape-value>{1,2}",
		"corner-top-left-shape": "<corner-shape-value>",
		"corner-top-right-shape": "<corner-shape-value>",
		"counter-increment": "[<counter-name> <integer>?]+|none",
		"counter-reset": "[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none",
		"counter-set": "[<counter-name> <integer>?]+|none",
		"cursor": "[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",
		"cx": "<length>|<percentage>",
		"cy": "<length>|<percentage>",
		"d": "none|path( <string> )",
		"direction": "ltr|rtl",
		"display": "[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>",
		"dominant-baseline": "auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",
		"dynamic-range-limit": "standard|no-limit|constrained|<dynamic-range-limit-mix()>",
		"empty-cells": "show|hide",
		"field-sizing": "content|fixed",
		"fill": "<paint>",
		"fill-opacity": "<number-zero-one>|<percentage>",
		"fill-rule": "nonzero|evenodd",
		"filter": "none|<filter-value-list>|<-ms-filter-function-list>",
		"flex": "none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]",
		"flex-basis": "content|<'width'>",
		"flex-direction": "row|row-reverse|column|column-reverse",
		"flex-flow": "<'flex-direction'>||<'flex-wrap'>",
		"flex-grow": "<number>",
		"flex-shrink": "<number>",
		"flex-wrap": "nowrap|wrap|wrap-reverse",
		"float": "left|right|none|inline-start|inline-end",
		"flood-color": "<color>",
		"flood-opacity": "<'opacity'>",
		"font": "[[<'font-style'>||<font-variant-css2>||<'font-weight'>||<font-width-css3>]? <'font-size'> [/ <'line-height'>]? <'font-family'>#]|<system-family-name>|<-non-standard-font>",
		"font-family": "[<family-name>|<generic-family>]#",
		"font-feature-settings": "normal|<feature-tag-value>#",
		"font-kerning": "auto|normal|none",
		"font-language-override": "normal|<string>",
		"font-optical-sizing": "auto|none",
		"font-palette": "normal|light|dark|<palette-identifier>|<palette-mix()>",
		"font-size": "<absolute-size>|<relative-size>|<length-percentage [0,∞]>|math",
		"font-size-adjust": "none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]",
		"font-smooth": "auto|never|always|<absolute-size>|<length>",
		"font-stretch": "<font-stretch-absolute>",
		"font-style": "normal|italic|oblique <angle>?",
		"font-synthesis": "none|[weight||style||small-caps||position]",
		"font-synthesis-position": "auto|none",
		"font-synthesis-small-caps": "auto|none",
		"font-synthesis-style": "auto|none",
		"font-synthesis-weight": "auto|none",
		"font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
		"font-variant-alternates": "normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]",
		"font-variant-caps": "normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps",
		"font-variant-east-asian": "normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]",
		"font-variant-emoji": "normal|text|emoji|unicode",
		"font-variant-ligatures": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]",
		"font-variant-numeric": "normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]",
		"font-variant-position": "normal|sub|super",
		"font-variation-settings": "normal|[<string> <number>]#",
		"font-weight": "<font-weight-absolute>|bolder|lighter",
		"font-width": "normal|<percentage [0,∞]>|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
		"forced-color-adjust": "auto|none|preserve-parent-color",
		"gap": "<'row-gap'> <'column-gap'>?",
		"grid": "<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>",
		"grid-area": "<grid-line> [/ <grid-line>]{0,3}",
		"grid-auto-columns": "<track-size>+",
		"grid-auto-flow": "[row|column]||dense",
		"grid-auto-rows": "<track-size>+",
		"grid-column": "<grid-line> [/ <grid-line>]?",
		"grid-column-end": "<grid-line>",
		"grid-column-gap": "<length-percentage>",
		"grid-column-start": "<grid-line>",
		"grid-gap": "<'grid-row-gap'> <'grid-column-gap'>?",
		"grid-row": "<grid-line> [/ <grid-line>]?",
		"grid-row-end": "<grid-line>",
		"grid-row-gap": "<length-percentage>",
		"grid-row-start": "<grid-line>",
		"grid-template": "none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?",
		"grid-template-areas": "none|<string>+",
		"grid-template-columns": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
		"grid-template-rows": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
		"hanging-punctuation": "none|[first||[force-end|allow-end]||last]",
		"height": "auto|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"hyphenate-character": "auto|<string>",
		"hyphenate-limit-chars": "[auto|<integer>]{1,3}",
		"hyphens": "none|manual|auto",
		"image-orientation": "from-image|<angle>|[<angle>? flip]",
		"image-rendering": "auto|crisp-edges|pixelated|smooth|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>",
		"image-resolution": "[from-image||<resolution>]&&snap?",
		"ime-mode": "auto|normal|active|inactive|disabled",
		"initial-letter": "normal|[<number> <integer>?]",
		"initial-letter-align": "[auto|alphabetic|hanging|ideographic]",
		"inline-size": "<'width'>",
		"inset": "<'top'>{1,4}",
		"inset-block": "<'top'>{1,2}",
		"inset-block-end": "<'top'>",
		"inset-block-start": "<'top'>",
		"inset-inline": "<'top'>{1,2}",
		"inset-inline-end": "<'top'>",
		"inset-inline-start": "<'top'>",
		"interpolate-size": "numeric-only|allow-keywords",
		"isolation": "auto|isolate",
		"interactivity": "auto|inert",
		"interest-delay": "<'interest-delay-start'>{1,2}",
		"interest-delay-end": "normal|<time>",
		"interest-delay-start": "normal|<time>",
		"justify-content": "normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]",
		"justify-items": "normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]|anchor-center",
		"justify-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|anchor-center",
		"justify-tracks": "[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",
		"left": "auto|<length-percentage>|<anchor()>|<anchor-size()>",
		"letter-spacing": "normal|<length-percentage>",
		"lighting-color": "<color>",
		"line-break": "auto|loose|normal|strict|anywhere",
		"line-clamp": "none|<integer>",
		"line-height": "normal|<number>|<length>|<percentage>",
		"line-height-step": "<length>",
		"list-style": "<'list-style-type'>||<'list-style-position'>||<'list-style-image'>",
		"list-style-image": "<image>|none",
		"list-style-position": "inside|outside",
		"list-style-type": "<counter-style>|<string>|none",
		"margin": "<'margin-top'>{1,4}",
		"margin-block": "<'margin-top'>{1,2}",
		"margin-block-end": "<'margin-top'>",
		"margin-block-start": "<'margin-top'>",
		"margin-bottom": "<length-percentage>|auto|<anchor-size()>",
		"margin-inline": "<'margin-top'>{1,2}",
		"margin-inline-end": "<'margin-top'>",
		"margin-inline-start": "<'margin-top'>",
		"margin-left": "<length-percentage>|auto|<anchor-size()>",
		"margin-right": "<length-percentage>|auto|<anchor-size()>",
		"margin-top": "<length-percentage>|auto|<anchor-size()>",
		"margin-trim": "none|in-flow|all",
		"marker": "none|<url>",
		"marker-end": "none|<url>",
		"marker-mid": "none|<url>",
		"marker-start": "none|<url>",
		"mask": "<mask-layer>#",
		"mask-border": "<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>",
		"mask-border-mode": "luminance|alpha",
		"mask-border-outset": "[<length>|<number>]{1,4}",
		"mask-border-repeat": "[stretch|repeat|round|space]{1,2}",
		"mask-border-slice": "<number-percentage>{1,4} fill?",
		"mask-border-source": "none|<image>",
		"mask-border-width": "[<length-percentage>|<number>|auto]{1,4}",
		"mask-clip": "[<coord-box>|no-clip]#",
		"mask-composite": "<compositing-operator>#",
		"mask-image": "<mask-reference>#",
		"mask-mode": "<masking-mode>#",
		"mask-origin": "<coord-box>#",
		"mask-position": "<position>#",
		"mask-repeat": "<repeat-style>#",
		"mask-size": "<bg-size>#",
		"mask-type": "luminance|alpha",
		"masonry-auto-flow": "[pack|next]||[definite-first|ordered]",
		"math-depth": "auto-add|add( <integer> )|<integer>",
		"math-shift": "normal|compact",
		"math-style": "normal|compact",
		"max-block-size": "<'max-width'>",
		"max-height": "none|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"max-inline-size": "<'max-width'>",
		"max-lines": "none|<integer>",
		"max-width": "none|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"min-block-size": "<'min-width'>",
		"min-height": "auto|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"min-inline-size": "<'min-width'>",
		"min-width": "auto|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"mix-blend-mode": "<blend-mode>|plus-darker|plus-lighter",
		"object-fit": "fill|contain|cover|none|scale-down",
		"object-position": "<position>",
		"object-view-box": "none|<basic-shape-rect>",
		"offset": "[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?",
		"offset-anchor": "auto|<position>",
		"offset-distance": "<length-percentage>",
		"offset-path": "none|<offset-path>||<coord-box>",
		"offset-position": "normal|auto|<position>",
		"offset-rotate": "[auto|reverse]||<angle>",
		"opacity": "<opacity-value>",
		"order": "<integer>",
		"orphans": "<integer>",
		"outline": "<'outline-width'>||<'outline-style'>||<'outline-color'>",
		"outline-color": "auto|<color>",
		"outline-offset": "<length>",
		"outline-style": "auto|<outline-line-style>",
		"outline-width": "<line-width>",
		"overflow": "[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>",
		"overflow-anchor": "auto|none",
		"overflow-block": "visible|hidden|clip|scroll|auto|<-non-standard-overflow>",
		"overflow-clip-box": "padding-box|content-box",
		"overflow-clip-margin": "<visual-box>||<length [0,∞]>",
		"overflow-inline": "visible|hidden|clip|scroll|auto|<-non-standard-overflow>",
		"overflow-wrap": "normal|break-word|anywhere",
		"overflow-x": "visible|hidden|clip|scroll|auto|<-non-standard-overflow>",
		"overflow-y": "visible|hidden|clip|scroll|auto|<-non-standard-overflow>",
		"overlay": "none|auto",
		"overscroll-behavior": "[contain|none|auto]{1,2}",
		"overscroll-behavior-block": "contain|none|auto",
		"overscroll-behavior-inline": "contain|none|auto",
		"overscroll-behavior-x": "contain|none|auto",
		"overscroll-behavior-y": "contain|none|auto",
		"padding": "<'padding-top'>{1,4}",
		"padding-block": "<'padding-top'>{1,2}",
		"padding-block-end": "<'padding-top'>",
		"padding-block-start": "<'padding-top'>",
		"padding-bottom": "<length-percentage [0,∞]>",
		"padding-inline": "<'padding-top'>{1,2}",
		"padding-inline-end": "<'padding-top'>",
		"padding-inline-start": "<'padding-top'>",
		"padding-left": "<length-percentage [0,∞]>",
		"padding-right": "<length-percentage [0,∞]>",
		"padding-top": "<length-percentage [0,∞]>",
		"page": "auto|<custom-ident>",
		"page-break-after": "auto|always|avoid|left|right|recto|verso",
		"page-break-before": "auto|always|avoid|left|right|recto|verso",
		"page-break-inside": "auto|avoid",
		"paint-order": "normal|[fill||stroke||markers]",
		"perspective": "none|<length>",
		"perspective-origin": "<position>",
		"place-content": "<'align-content'> <'justify-content'>?",
		"place-items": "<'align-items'> <'justify-items'>?",
		"place-self": "<'align-self'> <'justify-self'>?",
		"pointer-events": "auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",
		"position": "static|relative|absolute|sticky|fixed|-webkit-sticky",
		"position-anchor": "auto|none|<anchor-name>",
		"position-area": "none|<position-area>",
		"position-try": "<'position-try-order'>? <'position-try-fallbacks'>",
		"position-try-fallbacks": "none|[[<dashed-ident>||<try-tactic>]|<'position-area'>]#",
		"position-try-order": "normal|<try-size>",
		"position-visibility": "always|[anchors-valid||anchors-visible||no-overflow]",
		"print-color-adjust": "economy|exact",
		"quotes": "none|auto|[<string> <string>]+",
		"r": "<length>|<percentage>",
		"reading-flow": "normal|source-order|flex-visual|flex-flow|grid-rows|grid-columns|grid-order",
		"reading-order": "<integer>",
		"resize": "none|both|horizontal|vertical|block|inline",
		"right": "auto|<length-percentage>|<anchor()>|<anchor-size()>",
		"rotate": "none|<angle>|[x|y|z|<number>{3}]&&<angle>",
		"row-gap": "normal|<length-percentage>",
		"ruby-align": "start|center|space-between|space-around",
		"ruby-merge": "separate|collapse|auto",
		"ruby-overhang": "auto|none",
		"ruby-position": "[alternate||[over|under]]|inter-character",
		"rx": "<length>|<percentage>",
		"ry": "<length>|<percentage>",
		"scale": "none|[<number>|<percentage>]{1,3}",
		"scroll-behavior": "auto|smooth",
		"scroll-initial-target": "none|nearest",
		"scroll-margin": "<length>{1,4}",
		"scroll-margin-block": "<length>{1,2}",
		"scroll-margin-block-end": "<length>",
		"scroll-margin-block-start": "<length>",
		"scroll-margin-bottom": "<length>",
		"scroll-margin-inline": "<length>{1,2}",
		"scroll-margin-inline-end": "<length>",
		"scroll-margin-inline-start": "<length>",
		"scroll-margin-left": "<length>",
		"scroll-margin-right": "<length>",
		"scroll-margin-top": "<length>",
		"scroll-marker-group": "none|before|after",
		"scroll-padding": "[auto|<length-percentage>]{1,4}",
		"scroll-padding-block": "[auto|<length-percentage>]{1,2}",
		"scroll-padding-block-end": "auto|<length-percentage>",
		"scroll-padding-block-start": "auto|<length-percentage>",
		"scroll-padding-bottom": "auto|<length-percentage>",
		"scroll-padding-inline": "[auto|<length-percentage>]{1,2}",
		"scroll-padding-inline-end": "auto|<length-percentage>",
		"scroll-padding-inline-start": "auto|<length-percentage>",
		"scroll-padding-left": "auto|<length-percentage>",
		"scroll-padding-right": "auto|<length-percentage>",
		"scroll-padding-top": "auto|<length-percentage>",
		"scroll-snap-align": "[none|start|end|center]{1,2}",
		"scroll-snap-coordinate": "none|<position>#",
		"scroll-snap-destination": "<position>",
		"scroll-snap-points-x": "none|repeat( <length-percentage> )",
		"scroll-snap-points-y": "none|repeat( <length-percentage> )",
		"scroll-snap-stop": "normal|always",
		"scroll-snap-type": "none|[x|y|block|inline|both] [mandatory|proximity]?",
		"scroll-snap-type-x": "none|mandatory|proximity",
		"scroll-snap-type-y": "none|mandatory|proximity",
		"scroll-target-group": "none|auto",
		"scroll-timeline": "[<'scroll-timeline-name'> <'scroll-timeline-axis'>?]#",
		"scroll-timeline-axis": "[block|inline|x|y]#",
		"scroll-timeline-name": "[none|<dashed-ident>]#",
		"scrollbar-color": "auto|<color>{2}",
		"scrollbar-gutter": "auto|stable&&both-edges?",
		"scrollbar-width": "auto|thin|none",
		"shape-image-threshold": "<opacity-value>",
		"shape-margin": "<length-percentage>",
		"shape-outside": "none|[<shape-box>||<basic-shape>]|<image>",
		"shape-rendering": "auto|optimizeSpeed|crispEdges|geometricPrecision",
		"speak-as": "normal|spell-out||digits||[literal-punctuation|no-punctuation]",
		"stop-color": "<'color'>",
		"stop-opacity": "<'opacity'>",
		"stroke": "<paint>",
		"stroke-color": "<color>",
		"stroke-dasharray": "none|[<svg-length>+]#",
		"stroke-dashoffset": "<svg-length>",
		"stroke-linecap": "butt|round|square",
		"stroke-linejoin": "miter|round|bevel",
		"stroke-miterlimit": "<number-one-or-greater>",
		"stroke-opacity": "<'opacity'>",
		"stroke-width": "<svg-length>",
		"tab-size": "<integer>|<length>",
		"table-layout": "auto|fixed",
		"text-align": "start|end|left|right|center|justify|match-parent",
		"text-align-last": "auto|start|end|left|right|center|justify",
		"text-anchor": "start|middle|end",
		"text-autospace": "normal|<autospace>|auto",
		"text-box": "normal|<'text-box-trim'>||<'text-box-edge'>",
		"text-box-edge": "auto|<text-edge>",
		"text-box-trim": "none|trim-start|trim-end|trim-both",
		"text-combine-upright": "none|all|[digits <integer>?]",
		"text-decoration": "<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>",
		"text-decoration-color": "<color>",
		"text-decoration-inset": "<length>{1,2}|auto",
		"text-decoration-line": "none|[underline||overline||line-through||blink]|spelling-error|grammar-error",
		"text-decoration-skip": "none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]",
		"text-decoration-skip-ink": "auto|all|none",
		"text-decoration-style": "solid|double|dotted|dashed|wavy",
		"text-decoration-thickness": "auto|from-font|<length>|<percentage>",
		"text-emphasis": "<'text-emphasis-style'>||<'text-emphasis-color'>",
		"text-emphasis-color": "<color>",
		"text-emphasis-position": "auto|[over|under]&&[right|left]?",
		"text-emphasis-style": "none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>",
		"text-indent": "<length-percentage>&&hanging?&&each-line?",
		"text-justify": "auto|inter-character|inter-word|none",
		"text-orientation": "mixed|upright|sideways",
		"text-overflow": "[clip|ellipsis|<string>]{1,2}",
		"text-rendering": "auto|optimizeSpeed|optimizeLegibility|geometricPrecision",
		"text-shadow": "none|<shadow-t>#",
		"text-size-adjust": "none|auto|<percentage>",
		"text-spacing-trim": "space-all|normal|space-first|trim-start",
		"text-transform": "none|[capitalize|uppercase|lowercase]||full-width||full-size-kana|math-auto",
		"text-underline-offset": "auto|<length>|<percentage>",
		"text-underline-position": "auto|from-font|[under||[left|right]]",
		"text-wrap": "<'text-wrap-mode'>||<'text-wrap-style'>",
		"text-wrap-mode": "wrap|nowrap",
		"text-wrap-style": "auto|balance|stable|pretty",
		"timeline-scope": "none|<dashed-ident>#",
		"timeline-trigger": "none|[<'timeline-trigger-name'> <'timeline-trigger-source'> <'timeline-trigger-range'> ['/' <'timeline-trigger-exit-range'>]?]#",
		"timeline-trigger-name": "none|<dashed-ident>#",
		"timeline-trigger-exit-range": "[<'timeline-trigger-exit-range-start'> <'timeline-trigger-exit-range-end'>?]#",
		"timeline-trigger-exit-range-end": "[auto|normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"timeline-trigger-exit-range-start": "[auto|normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"timeline-trigger-range": "[<'timeline-trigger-range-start'> <'timeline-trigger-range-end'>?]#",
		"timeline-trigger-range-end": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"timeline-trigger-range-start": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
		"timeline-trigger-source": "<single-animation-timeline>#",
		"top": "auto|<length-percentage>|<anchor()>|<anchor-size()>",
		"touch-action": "auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",
		"transform": "none|<transform-list>",
		"transform-box": "content-box|border-box|fill-box|stroke-box|view-box",
		"transform-origin": "[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?",
		"transform-style": "flat|preserve-3d",
		"transition": "<single-transition>#",
		"transition-behavior": "<transition-behavior-value>#",
		"transition-delay": "<time>#",
		"transition-duration": "<time>#",
		"transition-property": "none|<single-transition-property>#",
		"transition-timing-function": "<easing-function>#",
		"translate": "none|<length-percentage> [<length-percentage> <length>?]?",
		"trigger-scope": "none|all|<dashed-ident>#",
		"unicode-bidi": "normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext",
		"user-select": "auto|text|none|all",
		"vector-effect": "none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position",
		"vertical-align": "baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",
		"view-timeline": "[<'view-timeline-name'> [<'view-timeline-axis'>||<'view-timeline-inset'>]?]#",
		"view-timeline-axis": "[block|inline|x|y]#",
		"view-timeline-inset": "[[auto|<length-percentage>]{1,2}]#",
		"view-timeline-name": "[none|<dashed-ident>]#",
		"view-transition-class": "none|<custom-ident>+",
		"view-transition-name": "none|<custom-ident>|match-element",
		"visibility": "visible|hidden|collapse",
		"white-space": "normal|pre|pre-wrap|pre-line|<'white-space-collapse'>||<'text-wrap-mode'>",
		"white-space-collapse": "collapse|preserve|preserve-breaks|preserve-spaces|break-spaces",
		"widows": "<integer>",
		"width": "auto|<length-percentage [0,∞]>|min-content|max-content|fit-content|fit-content( <length-percentage [0,∞]> )|<calc-size()>|<anchor-size()>|stretch|<-non-standard-size>",
		"will-change": "auto|<animateable-feature>#",
		"word-break": "normal|break-all|keep-all|break-word|auto-phrase",
		"word-spacing": "normal|<length>",
		"word-wrap": "normal|break-word",
		"writing-mode": "horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>",
		"x": "<length>|<percentage>",
		"y": "<length>|<percentage>",
		"z-index": "auto|<integer>",
		"zoom": "normal|reset|<number [0,∞]>||<percentage [0,∞]>",
		"-moz-background-clip": "padding|border",
		"-moz-border-radius-bottomleft": "<'border-bottom-left-radius'>",
		"-moz-border-radius-bottomright": "<'border-bottom-right-radius'>",
		"-moz-border-radius-topleft": "<'border-top-left-radius'>",
		"-moz-border-radius-topright": "<'border-bottom-right-radius'>",
		"-moz-control-character-visibility": "visible|hidden",
		"-moz-osx-font-smoothing": "auto|grayscale",
		"-moz-user-select": "none|text|all|-moz-none",
		"-ms-flex-align": "start|end|center|baseline|stretch",
		"-ms-flex-item-align": "auto|start|end|center|baseline|stretch",
		"-ms-flex-line-pack": "start|end|center|justify|distribute|stretch",
		"-ms-flex-negative": "<'flex-shrink'>",
		"-ms-flex-pack": "start|end|center|justify|distribute",
		"-ms-flex-order": "<integer>",
		"-ms-flex-positive": "<'flex-grow'>",
		"-ms-flex-preferred-size": "<'flex-basis'>",
		"-ms-interpolation-mode": "nearest-neighbor|bicubic",
		"-ms-grid-column-align": "start|end|center|stretch",
		"-ms-grid-row-align": "start|end|center|stretch",
		"-ms-hyphenate-limit-last": "none|always|column|page|spread",
		"-webkit-background-clip": "[<visual-box>|border|padding|content|text]#",
		"-webkit-column-break-after": "always|auto|avoid",
		"-webkit-column-break-before": "always|auto|avoid",
		"-webkit-column-break-inside": "always|auto|avoid",
		"-webkit-font-smoothing": "auto|none|antialiased|subpixel-antialiased",
		"-webkit-mask-box-image": "[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?",
		"-webkit-print-color-adjust": "economy|exact",
		"-webkit-text-security": "none|circle|disc|square",
		"-webkit-user-drag": "none|element|auto",
		"behavior": "<url>+",
		"cue": "<'cue-before'> <'cue-after'>?",
		"cue-after": "<url> <decibel>?|none",
		"cue-before": "<url> <decibel>?|none",
		"glyph-orientation-horizontal": "<angle>",
		"glyph-orientation-vertical": "<angle>",
		"kerning": "auto|<svg-length>",
		"pause": "<'pause-before'> <'pause-after'>?",
		"pause-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
		"pause-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
		"position-try-options": "<'position-try-fallbacks'>",
		"rest": "<'rest-before'> <'rest-after'>?",
		"rest-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
		"rest-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
		"speak": "auto|never|always",
		"voice-balance": "<number>|left|center|right|leftwards|rightwards",
		"voice-duration": "auto|<time>",
		"voice-family": "[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve",
		"voice-pitch": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
		"voice-range": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
		"voice-rate": "[normal|x-slow|slow|medium|fast|x-fast]||<percentage>",
		"voice-stress": "normal|strong|moderate|none|reduced",
		"voice-volume": "silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]",
		"white-space-trim": "none|discard-before||discard-after||discard-inner"
	},
	"atrules": {
		"charset": {
			"prelude": "<string>",
			"descriptors": null
		},
		"counter-style": {
			"prelude": "<counter-style-name>",
			"descriptors": {
				"additive-symbols": "[<integer [0,∞]>&&<symbol>]#",
				"fallback": "<counter-style-name>",
				"negative": "<symbol> <symbol>?",
				"pad": "<integer [0,∞]>&&<symbol>",
				"prefix": "<symbol>",
				"range": "[[<integer>|infinite]{2}]#|auto",
				"speak-as": "auto|bullets|numbers|words|spell-out|<counter-style-name>",
				"suffix": "<symbol>",
				"symbols": "<symbol>+",
				"system": "cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"
			}
		},
		"container": {
			"prelude": "[<container-name>]? <container-condition>",
			"descriptors": null
		},
		"document": {
			"prelude": "[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",
			"descriptors": null
		},
		"font-face": {
			"prelude": null,
			"descriptors": {
				"ascent-override": "normal|<percentage>",
				"descent-override": "normal|<percentage>",
				"font-display": "auto|block|swap|fallback|optional",
				"font-family": "<family-name>",
				"font-feature-settings": "normal|<feature-tag-value>#",
				"font-stretch": "<font-stretch-absolute>{1,2}",
				"font-style": "normal|italic|oblique <angle>{0,2}",
				"font-variation-settings": "normal|[<string> <number>]#",
				"font-weight": "<font-weight-absolute>{1,2}",
				"line-gap-override": "normal|<percentage>",
				"size-adjust": "<percentage>",
				"src": "[<url> [format( <string># )]?|local( <family-name> )]#",
				"unicode-range": "<urange>#"
			}
		},
		"font-feature-values": {
			"prelude": "<family-name>#",
			"descriptors": null
		},
		"font-palette-values": {
			"prelude": "<dashed-ident>",
			"descriptors": {
				"base-palette": "light|dark|<integer [0,∞]>",
				"font-family": "<family-name>#",
				"override-colors": "[<integer [0,∞]> <color>]#"
			}
		},
		"import": {
			"prelude": "[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",
			"descriptors": null
		},
		"keyframes": {
			"prelude": "<keyframes-name>",
			"descriptors": null
		},
		"layer": {
			"prelude": "[<layer-name>#|<layer-name>?]",
			"descriptors": null
		},
		"media": {
			"prelude": "<media-query-list>",
			"descriptors": null
		},
		"namespace": {
			"prelude": "<namespace-prefix>? [<string>|<url>]",
			"descriptors": null
		},
		"page": {
			"prelude": "<page-selector-list>",
			"descriptors": {
				"bleed": "auto|<length>",
				"marks": "none|[crop||cross]",
				"page-orientation": "upright|rotate-left|rotate-right",
				"size": "<length [0,∞]>{1,2}|auto|[<page-size>||[portrait|landscape]]"
			}
		},
		"position-try": {
			"prelude": "<dashed-ident>",
			"descriptors": {
				"top": "<'top'>",
				"left": "<'left'>",
				"bottom": "<'bottom'>",
				"right": "<'right'>",
				"inset-block-start": "<'inset-block-start'>",
				"inset-block-end": "<'inset-block-end'>",
				"inset-inline-start": "<'inset-inline-start'>",
				"inset-inline-end": "<'inset-inline-end'>",
				"inset-block": "<'inset-block'>",
				"inset-inline": "<'inset-inline'>",
				"inset": "<'inset'>",
				"margin-top": "<'margin-top'>",
				"margin-left": "<'margin-left'>",
				"margin-bottom": "<'margin-bottom'>",
				"margin-right": "<'margin-right'>",
				"margin-block-start": "<'margin-block-start'>",
				"margin-block-end": "<'margin-block-end'>",
				"margin-inline-start": "<'margin-inline-start'>",
				"margin-inline-end": "<'margin-inline-end'>",
				"margin": "<'margin'>",
				"margin-block": "<'margin-block'>",
				"margin-inline": "<'margin-inline'>",
				"width": "<'width'>",
				"height": "<'height'>",
				"min-width": "<'min-width'>",
				"min-height": "<'min-height'>",
				"max-width": "<'max-width'>",
				"max-height": "<'max-height'>",
				"block-size": "<'block-size'>",
				"inline-size": "<'inline-size'>",
				"min-block-size": "<'min-block-size'>",
				"min-inline-size": "<'min-inline-size'>",
				"max-block-size": "<'max-block-size'>",
				"max-inline-size": "<'max-inline-size'>",
				"align-self": "<'align-self'>|anchor-center",
				"justify-self": "<'justify-self'>|anchor-center"
			}
		},
		"property": {
			"prelude": "<custom-property-name>",
			"descriptors": {
				"inherits": "true|false",
				"initial-value": "<declaration-value>?",
				"syntax": "<string>"
			}
		},
		"scope": {
			"prelude": "[( <scope-start> )]? [to ( <scope-end> )]?",
			"descriptors": null
		},
		"starting-style": {
			"prelude": null,
			"descriptors": null
		},
		"supports": {
			"prelude": "<supports-condition>",
			"descriptors": null
		},
		"view-transition": {
			"prelude": null,
			"descriptors": {
				"navigation": "auto|none",
				"types": "none|<custom-ident>+"
			}
		},
		"font-features-values": {
			"prelude": "[<string>|<custom-ident>]+",
			"descriptors": { "font-display": "auto|block|swap|fallback|optional" }
		}
	}
};
//#endregion
//#region node_modules/css-tree/lib/syntax/node/AnPlusB.js
var AnPlusB_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$49,
	name: () => name$48,
	parse: () => parse$49,
	structure: () => structure$48
});
var PLUSSIGN$5 = 43;
var HYPHENMINUS$2 = 45;
var N = 110;
var DISALLOW_SIGN = true;
var ALLOW_SIGN = false;
function checkInteger(offset, disallowSign) {
	let pos = this.tokenStart + offset;
	const code = this.charCodeAt(pos);
	if (code === PLUSSIGN$5 || code === HYPHENMINUS$2) {
		if (disallowSign) this.error("Number sign is not allowed");
		pos++;
	}
	for (; pos < this.tokenEnd; pos++) if (!isDigit(this.charCodeAt(pos))) this.error("Integer is expected", pos);
}
function checkTokenIsInteger(disallowSign) {
	return checkInteger.call(this, 0, disallowSign);
}
function expectCharCode(offset, code) {
	if (!this.cmpChar(this.tokenStart + offset, code)) {
		let msg = "";
		switch (code) {
			case N:
				msg = "N is expected";
				break;
			case HYPHENMINUS$2:
				msg = "HyphenMinus is expected";
				break;
		}
		this.error(msg, this.tokenStart + offset);
	}
}
function consumeB() {
	let offset = 0;
	let sign = 0;
	let type = this.tokenType;
	while (type === 13 || type === 25) type = this.lookupType(++offset);
	if (type !== 10) if (this.isDelim(PLUSSIGN$5, offset) || this.isDelim(HYPHENMINUS$2, offset)) {
		sign = this.isDelim(PLUSSIGN$5, offset) ? PLUSSIGN$5 : HYPHENMINUS$2;
		do
			type = this.lookupType(++offset);
		while (type === 13 || type === 25);
		if (type !== 10) {
			this.skip(offset);
			checkTokenIsInteger.call(this, DISALLOW_SIGN);
		}
	} else return null;
	if (offset > 0) this.skip(offset);
	if (sign === 0) {
		type = this.charCodeAt(this.tokenStart);
		if (type !== PLUSSIGN$5 && type !== HYPHENMINUS$2) this.error("Number sign is expected");
	}
	checkTokenIsInteger.call(this, sign !== 0);
	return sign === HYPHENMINUS$2 ? "-" + this.consume(10) : this.consume(10);
}
var name$48 = "AnPlusB";
var structure$48 = {
	a: [String, null],
	b: [String, null]
};
function parse$49() {
	const start = this.tokenStart;
	let a = null;
	let b = null;
	if (this.tokenType === 10) {
		checkTokenIsInteger.call(this, ALLOW_SIGN);
		b = this.consume(10);
	} else if (this.tokenType === 1 && this.cmpChar(this.tokenStart, HYPHENMINUS$2)) {
		a = "-1";
		expectCharCode.call(this, 1, N);
		switch (this.tokenEnd - this.tokenStart) {
			case 2:
				this.next();
				b = consumeB.call(this);
				break;
			case 3:
				expectCharCode.call(this, 2, HYPHENMINUS$2);
				this.next();
				this.skipSC();
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
				b = "-" + this.consume(10);
				break;
			default:
				expectCharCode.call(this, 2, HYPHENMINUS$2);
				checkInteger.call(this, 3, DISALLOW_SIGN);
				this.next();
				b = this.substrToCursor(start + 2);
		}
	} else if (this.tokenType === 1 || this.isDelim(PLUSSIGN$5) && this.lookupType(1) === 1) {
		let sign = 0;
		a = "1";
		if (this.isDelim(PLUSSIGN$5)) {
			sign = 1;
			this.next();
		}
		expectCharCode.call(this, 0, N);
		switch (this.tokenEnd - this.tokenStart) {
			case 1:
				this.next();
				b = consumeB.call(this);
				break;
			case 2:
				expectCharCode.call(this, 1, HYPHENMINUS$2);
				this.next();
				this.skipSC();
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
				b = "-" + this.consume(10);
				break;
			default:
				expectCharCode.call(this, 1, HYPHENMINUS$2);
				checkInteger.call(this, 2, DISALLOW_SIGN);
				this.next();
				b = this.substrToCursor(start + sign + 1);
		}
	} else if (this.tokenType === 12) {
		const code = this.charCodeAt(this.tokenStart);
		const sign = code === PLUSSIGN$5 || code === HYPHENMINUS$2;
		let i = this.tokenStart + sign;
		for (; i < this.tokenEnd; i++) if (!isDigit(this.charCodeAt(i))) break;
		if (i === this.tokenStart + sign) this.error("Integer is expected", this.tokenStart + sign);
		expectCharCode.call(this, i - this.tokenStart, N);
		a = this.substring(start, i);
		if (i + 1 === this.tokenEnd) {
			this.next();
			b = consumeB.call(this);
		} else {
			expectCharCode.call(this, i - this.tokenStart + 1, HYPHENMINUS$2);
			if (i + 2 === this.tokenEnd) {
				this.next();
				this.skipSC();
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
				b = "-" + this.consume(10);
			} else {
				checkInteger.call(this, i - this.tokenStart + 2, DISALLOW_SIGN);
				this.next();
				b = this.substrToCursor(i + 1);
			}
		}
	} else this.error();
	if (a !== null && a.charCodeAt(0) === PLUSSIGN$5) a = a.substr(1);
	if (b !== null && b.charCodeAt(0) === PLUSSIGN$5) b = b.substr(1);
	return {
		type: "AnPlusB",
		loc: this.getLocation(start, this.tokenStart),
		a,
		b
	};
}
function generate$49(node) {
	if (node.a) {
		const a = node.a === "+1" && "n" || node.a === "1" && "n" || node.a === "-1" && "-n" || node.a + "n";
		if (node.b) {
			const b = node.b[0] === "-" || node.b[0] === "+" ? node.b : "+" + node.b;
			this.tokenize(a + b);
		} else this.tokenize(a);
	} else this.tokenize(node.b);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Atrule.js
var Atrule_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$48,
	name: () => name$47,
	parse: () => parse$48,
	structure: () => structure$47,
	walkContext: () => walkContext$9
});
function consumeRaw$4() {
	return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, true);
}
function isDeclarationBlockAtrule() {
	for (let offset = 1, type; type = this.lookupType(offset); offset++) {
		if (type === 24) return true;
		if (type === 23 || type === 3) return false;
	}
	return false;
}
var name$47 = "Atrule";
var walkContext$9 = "atrule";
var structure$47 = {
	name: String,
	prelude: [
		"AtrulePrelude",
		"Raw",
		null
	],
	block: ["Block", null]
};
function parse$48(isDeclaration = false) {
	const start = this.tokenStart;
	let name;
	let nameLowerCase;
	let prelude = null;
	let block = null;
	this.eat(3);
	name = this.substrToCursor(start + 1);
	nameLowerCase = name.toLowerCase();
	this.skipSC();
	if (this.eof === false && this.tokenType !== 23 && this.tokenType !== 17) {
		if (this.parseAtrulePrelude) prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name, isDeclaration), consumeRaw$4);
		else prelude = consumeRaw$4.call(this, this.tokenIndex);
		this.skipSC();
	}
	switch (this.tokenType) {
		case 17:
			this.next();
			break;
		case 23:
			if (hasOwnProperty.call(this.atrule, nameLowerCase) && typeof this.atrule[nameLowerCase].block === "function") block = this.atrule[nameLowerCase].block.call(this, isDeclaration);
			else block = this.Block(isDeclarationBlockAtrule.call(this));
			break;
	}
	return {
		type: "Atrule",
		loc: this.getLocation(start, this.tokenStart),
		name,
		prelude,
		block
	};
}
function generate$48(node) {
	this.token(3, "@" + node.name);
	if (node.prelude !== null) this.node(node.prelude);
	if (node.block) this.node(node.block);
	else this.token(17, ";");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/AtrulePrelude.js
var AtrulePrelude_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$47,
	name: () => name$46,
	parse: () => parse$47,
	structure: () => structure$46,
	walkContext: () => walkContext$8
});
var name$46 = "AtrulePrelude";
var walkContext$8 = "atrulePrelude";
var structure$46 = { children: [[]] };
function parse$47(name) {
	let children = null;
	if (name !== null) name = name.toLowerCase();
	this.skipSC();
	if (hasOwnProperty.call(this.atrule, name) && typeof this.atrule[name].prelude === "function") children = this.atrule[name].prelude.call(this);
	else children = this.readSequence(this.scope.AtrulePrelude);
	this.skipSC();
	if (this.eof !== true && this.tokenType !== 23 && this.tokenType !== 17) this.error("Semicolon or block is expected");
	return {
		type: "AtrulePrelude",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$47(node) {
	this.children(node);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/AttributeSelector.js
var AttributeSelector_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$46,
	name: () => name$45,
	parse: () => parse$46,
	structure: () => structure$45
});
var DOLLARSIGN$1 = 36;
var ASTERISK$5 = 42;
var EQUALSSIGN$1 = 61;
var CIRCUMFLEXACCENT = 94;
var VERTICALLINE$2 = 124;
var TILDE$2 = 126;
function getAttributeName() {
	if (this.eof) this.error("Unexpected end of input");
	const start = this.tokenStart;
	let expectIdent = false;
	if (this.isDelim(ASTERISK$5)) {
		expectIdent = true;
		this.next();
	} else if (!this.isDelim(VERTICALLINE$2)) this.eat(1);
	if (this.isDelim(VERTICALLINE$2)) {
		if (this.charCodeAt(this.tokenStart + 1) !== EQUALSSIGN$1) {
			this.next();
			this.eat(1);
		} else if (expectIdent) this.error("Identifier is expected", this.tokenEnd);
	} else if (expectIdent) this.error("Vertical line is expected");
	return {
		type: "Identifier",
		loc: this.getLocation(start, this.tokenStart),
		name: this.substrToCursor(start)
	};
}
function getOperator() {
	const start = this.tokenStart;
	const code = this.charCodeAt(start);
	if (code !== EQUALSSIGN$1 && code !== TILDE$2 && code !== CIRCUMFLEXACCENT && code !== DOLLARSIGN$1 && code !== ASTERISK$5 && code !== VERTICALLINE$2) this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected");
	this.next();
	if (code !== EQUALSSIGN$1) {
		if (!this.isDelim(EQUALSSIGN$1)) this.error("Equal sign is expected");
		this.next();
	}
	return this.substrToCursor(start);
}
var name$45 = "AttributeSelector";
var structure$45 = {
	name: "Identifier",
	matcher: [String, null],
	value: [
		"String",
		"Identifier",
		null
	],
	flags: [String, null]
};
function parse$46() {
	const start = this.tokenStart;
	let name;
	let matcher = null;
	let value = null;
	let flags = null;
	this.eat(19);
	this.skipSC();
	name = getAttributeName.call(this);
	this.skipSC();
	if (this.tokenType !== 20) {
		if (this.tokenType !== 1) {
			matcher = getOperator.call(this);
			this.skipSC();
			value = this.tokenType === 5 ? this.String() : this.Identifier();
			this.skipSC();
		}
		if (this.tokenType === 1) {
			flags = this.consume(1);
			this.skipSC();
		}
	}
	this.eat(20);
	return {
		type: "AttributeSelector",
		loc: this.getLocation(start, this.tokenStart),
		name,
		matcher,
		value,
		flags
	};
}
function generate$46(node) {
	this.token(9, "[");
	this.node(node.name);
	if (node.matcher !== null) {
		this.tokenize(node.matcher);
		this.node(node.value);
	}
	if (node.flags !== null) this.token(1, node.flags);
	this.token(9, "]");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Block.js
var Block_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$45,
	name: () => name$44,
	parse: () => parse$45,
	structure: () => structure$44,
	walkContext: () => walkContext$7
});
var AMPERSAND$4 = 38;
function consumeRaw$3() {
	return this.Raw(null, true);
}
function consumeRule() {
	return this.parseWithFallback(this.Rule, consumeRaw$3);
}
function consumeRawDeclaration() {
	return this.Raw(this.consumeUntilSemicolonIncluded, true);
}
function consumeDeclaration() {
	if (this.tokenType === 17) return consumeRawDeclaration.call(this, this.tokenIndex);
	const node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);
	if (this.tokenType === 17) this.next();
	return node;
}
var name$44 = "Block";
var walkContext$7 = "block";
var structure$44 = { children: [[
	"Atrule",
	"Rule",
	"Declaration"
]] };
function parse$45(isStyleBlock) {
	const consumer = isStyleBlock ? consumeDeclaration : consumeRule;
	const start = this.tokenStart;
	let children = this.createList();
	this.eat(23);
	scan: while (!this.eof) switch (this.tokenType) {
		case 24: break scan;
		case 13:
		case 25:
			this.next();
			break;
		case 3:
			children.push(this.parseWithFallback(this.Atrule.bind(this, isStyleBlock), consumeRaw$3));
			break;
		default: if (isStyleBlock && this.isDelim(AMPERSAND$4)) children.push(consumeRule.call(this));
		else children.push(consumer.call(this));
	}
	if (!this.eof) this.eat(24);
	return {
		type: "Block",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$45(node) {
	this.token(23, "{");
	this.children(node, (prev) => {
		if (prev.type === "Declaration") this.token(17, ";");
	});
	this.token(24, "}");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Brackets.js
var Brackets_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$44,
	name: () => name$43,
	parse: () => parse$44,
	structure: () => structure$43
});
var name$43 = "Brackets";
var structure$43 = { children: [[]] };
function parse$44(readSequence, recognizer) {
	const start = this.tokenStart;
	let children = null;
	this.eat(19);
	children = readSequence.call(this, recognizer);
	if (!this.eof) this.eat(20);
	return {
		type: "Brackets",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$44(node) {
	this.token(9, "[");
	this.children(node);
	this.token(9, "]");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/CDC.js
var CDC_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$43,
	name: () => "CDC",
	parse: () => parse$43,
	structure: () => structure$42
});
var structure$42 = [];
function parse$43() {
	const start = this.tokenStart;
	this.eat(15);
	return {
		type: "CDC",
		loc: this.getLocation(start, this.tokenStart)
	};
}
function generate$43() {
	this.token(15, "-->");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/CDO.js
var CDO_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$42,
	name: () => "CDO",
	parse: () => parse$42,
	structure: () => structure$41
});
var structure$41 = [];
function parse$42() {
	const start = this.tokenStart;
	this.eat(14);
	return {
		type: "CDO",
		loc: this.getLocation(start, this.tokenStart)
	};
}
function generate$42() {
	this.token(14, "<!--");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/ClassSelector.js
var ClassSelector_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$41,
	name: () => name$40,
	parse: () => parse$41,
	structure: () => structure$40
});
var FULLSTOP$2 = 46;
var name$40 = "ClassSelector";
var structure$40 = { name: String };
function parse$41() {
	this.eatDelim(FULLSTOP$2);
	return {
		type: "ClassSelector",
		loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
		name: this.consume(1)
	};
}
function generate$41(node) {
	this.token(9, ".");
	this.token(1, node.name);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Combinator.js
var Combinator_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$40,
	name: () => name$39,
	parse: () => parse$40,
	structure: () => structure$39
});
var PLUSSIGN$4 = 43;
var SOLIDUS$7 = 47;
var GREATERTHANSIGN$2 = 62;
var TILDE$1 = 126;
var name$39 = "Combinator";
var structure$39 = { name: String };
function parse$40() {
	const start = this.tokenStart;
	let name;
	switch (this.tokenType) {
		case 13:
			name = " ";
			break;
		case 9:
			switch (this.charCodeAt(this.tokenStart)) {
				case GREATERTHANSIGN$2:
				case PLUSSIGN$4:
				case TILDE$1:
					this.next();
					break;
				case SOLIDUS$7:
					this.next();
					this.eatIdent("deep");
					this.eatDelim(SOLIDUS$7);
					break;
				default: this.error("Combinator is expected");
			}
			name = this.substrToCursor(start);
			break;
	}
	return {
		type: "Combinator",
		loc: this.getLocation(start, this.tokenStart),
		name
	};
}
function generate$40(node) {
	this.tokenize(node.name);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Comment.js
var Comment_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$39,
	name: () => name$38,
	parse: () => parse$39,
	structure: () => structure$38
});
var ASTERISK$4 = 42;
var SOLIDUS$6 = 47;
var name$38 = "Comment";
var structure$38 = { value: String };
function parse$39() {
	const start = this.tokenStart;
	let end = this.tokenEnd;
	this.eat(25);
	if (end - start + 2 >= 2 && this.charCodeAt(end - 2) === ASTERISK$4 && this.charCodeAt(end - 1) === SOLIDUS$6) end -= 2;
	return {
		type: "Comment",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substring(start + 2, end)
	};
}
function generate$39(node) {
	this.token(25, "/*" + node.value + "*/");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Condition.js
var Condition_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$38,
	name: () => name$37,
	parse: () => parse$38,
	structure: () => structure$37
});
var likelyFeatureToken = new Set([
	16,
	22,
	0
]);
var name$37 = "Condition";
var structure$37 = {
	kind: String,
	children: [[
		"Identifier",
		"Feature",
		"FeatureFunction",
		"FeatureRange",
		"SupportsDeclaration"
	]]
};
function featureOrRange(kind) {
	if (this.lookupTypeNonSC(1) === 1 && likelyFeatureToken.has(this.lookupTypeNonSC(2))) return this.Feature(kind);
	return this.FeatureRange(kind);
}
var parentheses = {
	media: featureOrRange,
	container: featureOrRange,
	supports() {
		return this.SupportsDeclaration();
	}
};
function parse$38(kind = "media") {
	const children = this.createList();
	scan: while (!this.eof) switch (this.tokenType) {
		case 25:
		case 13:
			this.next();
			continue;
		case 1:
			children.push(this.Identifier());
			break;
		case 21: {
			let term = this.parseWithFallback(() => parentheses[kind].call(this, kind), () => null);
			if (!term) term = this.parseWithFallback(() => {
				this.eat(21);
				const res = this.Condition(kind);
				this.eat(22);
				return res;
			}, () => {
				return this.GeneralEnclosed(kind);
			});
			children.push(term);
			break;
		}
		case 2: {
			let term = this.parseWithFallback(() => this.FeatureFunction(kind), () => null);
			if (!term) term = this.GeneralEnclosed(kind);
			children.push(term);
			break;
		}
		default: break scan;
	}
	if (children.isEmpty) this.error("Condition is expected");
	return {
		type: "Condition",
		loc: this.getLocationFromList(children),
		kind,
		children
	};
}
function generate$38(node) {
	node.children.forEach((child) => {
		if (child.type === "Condition") {
			this.token(21, "(");
			this.node(child);
			this.token(22, ")");
		} else this.node(child);
	});
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Declaration.js
var Declaration_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$37,
	name: () => name$36,
	parse: () => parse$37,
	structure: () => structure$36,
	walkContext: () => walkContext$6
});
var EXCLAMATIONMARK$1 = 33;
var NUMBERSIGN$2 = 35;
var DOLLARSIGN = 36;
var AMPERSAND$3 = 38;
var ASTERISK$3 = 42;
var PLUSSIGN$3 = 43;
var SOLIDUS$5 = 47;
function consumeValueRaw() {
	return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, true);
}
function consumeCustomPropertyRaw() {
	return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
}
function consumeValue() {
	const startValueToken = this.tokenIndex;
	const value = this.Value();
	if (value.type !== "Raw" && this.eof === false && this.tokenType !== 17 && this.isDelim(EXCLAMATIONMARK$1) === false && this.isBalanceEdge(startValueToken) === false) this.error();
	return value;
}
var name$36 = "Declaration";
var walkContext$6 = "declaration";
var structure$36 = {
	important: [Boolean, String],
	property: String,
	value: ["Value", "Raw"]
};
function parse$37() {
	const start = this.tokenStart;
	const startToken = this.tokenIndex;
	const property = readProperty.call(this);
	const customProperty = isCustomProperty(property);
	const parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
	const consumeRaw = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
	let important = false;
	let value;
	this.skipSC();
	this.eat(16);
	const valueStart = this.tokenIndex;
	if (!customProperty) this.skipSC();
	if (parseValue) value = this.parseWithFallback(consumeValue, consumeRaw);
	else value = consumeRaw.call(this, this.tokenIndex);
	if (customProperty && value.type === "Value" && value.children.isEmpty) {
		for (let offset = valueStart - this.tokenIndex; offset <= 0; offset++) if (this.lookupType(offset) === 13) {
			value.children.appendData({
				type: "WhiteSpace",
				loc: null,
				value: " "
			});
			break;
		}
	}
	if (this.isDelim(EXCLAMATIONMARK$1)) {
		important = getImportant.call(this);
		this.skipSC();
	}
	if (this.eof === false && this.tokenType !== 17 && this.isBalanceEdge(startToken) === false) this.error();
	return {
		type: "Declaration",
		loc: this.getLocation(start, this.tokenStart),
		important,
		property,
		value
	};
}
function generate$37(node) {
	this.token(1, node.property);
	this.token(16, ":");
	this.node(node.value);
	if (node.important) {
		this.token(9, "!");
		this.token(1, node.important === true ? "important" : node.important);
	}
}
function readProperty() {
	const start = this.tokenStart;
	if (this.tokenType === 9) switch (this.charCodeAt(this.tokenStart)) {
		case ASTERISK$3:
		case DOLLARSIGN:
		case PLUSSIGN$3:
		case NUMBERSIGN$2:
		case AMPERSAND$3:
			this.next();
			break;
		case SOLIDUS$5:
			this.next();
			if (this.isDelim(SOLIDUS$5)) this.next();
			break;
	}
	if (this.tokenType === 4) this.eat(4);
	else this.eat(1);
	return this.substrToCursor(start);
}
function getImportant() {
	this.eat(9);
	this.skipSC();
	const important = this.consume(1);
	return important === "important" ? true : important;
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/DeclarationList.js
var DeclarationList_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$36,
	name: () => name$35,
	parse: () => parse$36,
	structure: () => structure$35
});
var AMPERSAND$2 = 38;
function consumeRaw$2() {
	return this.Raw(this.consumeUntilSemicolonIncluded, true);
}
var name$35 = "DeclarationList";
var structure$35 = { children: [[
	"Declaration",
	"Atrule",
	"Rule"
]] };
function parse$36() {
	const children = this.createList();
	scan: while (!this.eof) switch (this.tokenType) {
		case 13:
		case 25:
		case 17:
			this.next();
			break;
		case 3:
			children.push(this.parseWithFallback(this.Atrule.bind(this, true), consumeRaw$2));
			break;
		default: if (this.isDelim(AMPERSAND$2)) children.push(this.parseWithFallback(this.Rule, consumeRaw$2));
		else children.push(this.parseWithFallback(this.Declaration, consumeRaw$2));
	}
	return {
		type: "DeclarationList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$36(node) {
	this.children(node, (prev) => {
		if (prev.type === "Declaration") this.token(17, ";");
	});
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Dimension.js
var Dimension_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$35,
	name: () => name$34,
	parse: () => parse$35,
	structure: () => structure$34
});
var name$34 = "Dimension";
var structure$34 = {
	value: String,
	unit: String
};
function parse$35() {
	const start = this.tokenStart;
	const value = this.consumeNumber(12);
	return {
		type: "Dimension",
		loc: this.getLocation(start, this.tokenStart),
		value,
		unit: this.substring(start + value.length, this.tokenStart)
	};
}
function generate$35(node) {
	this.token(12, node.value + node.unit);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Feature.js
var Feature_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$34,
	name: () => name$33,
	parse: () => parse$34,
	structure: () => structure$33
});
var SOLIDUS$4 = 47;
var name$33 = "Feature";
var structure$33 = {
	kind: String,
	name: String,
	value: [
		"Identifier",
		"Number",
		"Dimension",
		"Ratio",
		"Function",
		null
	]
};
function parse$34(kind) {
	const start = this.tokenStart;
	let name;
	let value = null;
	this.eat(21);
	this.skipSC();
	name = this.consume(1);
	this.skipSC();
	if (this.tokenType !== 22) {
		this.eat(16);
		this.skipSC();
		switch (this.tokenType) {
			case 10:
				if (this.lookupNonWSType(1) === 9) value = this.Ratio();
				else value = this.Number();
				break;
			case 12:
				value = this.Dimension();
				break;
			case 1:
				value = this.Identifier();
				break;
			case 2:
				value = this.parseWithFallback(() => {
					const res = this.Function(this.readSequence, this.scope.Value);
					this.skipSC();
					if (this.isDelim(SOLIDUS$4)) this.error();
					return res;
				}, () => {
					return this.Ratio();
				});
				break;
			default: this.error("Number, dimension, ratio or identifier is expected");
		}
		this.skipSC();
	}
	if (!this.eof) this.eat(22);
	return {
		type: "Feature",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		name,
		value
	};
}
function generate$34(node) {
	this.token(21, "(");
	this.token(1, node.name);
	if (node.value !== null) {
		this.token(16, ":");
		this.node(node.value);
	}
	this.token(22, ")");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/FeatureFunction.js
var FeatureFunction_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$33,
	name: () => name$32,
	parse: () => parse$33,
	structure: () => structure$32
});
var name$32 = "FeatureFunction";
var structure$32 = {
	kind: String,
	feature: String,
	value: ["Declaration", "Selector"]
};
function getFeatureParser(kind, name) {
	const parser = (this.features[kind] || {})[name];
	if (typeof parser !== "function") this.error(`Unknown feature ${name}()`);
	return parser;
}
function parse$33(kind = "unknown") {
	const start = this.tokenStart;
	const functionName = this.consumeFunctionName();
	const valueParser = getFeatureParser.call(this, kind, functionName.toLowerCase());
	this.skipSC();
	const value = this.parseWithFallback(() => {
		const startValueToken = this.tokenIndex;
		const value = valueParser.call(this);
		if (this.eof === false && this.isBalanceEdge(startValueToken) === false) this.error();
		return value;
	}, () => this.Raw(null, false));
	if (!this.eof) this.eat(22);
	return {
		type: "FeatureFunction",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		feature: functionName,
		value
	};
}
function generate$33(node) {
	this.token(2, node.feature + "(");
	this.node(node.value);
	this.token(22, ")");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/FeatureRange.js
var FeatureRange_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$32,
	name: () => name$31,
	parse: () => parse$32,
	structure: () => structure$31
});
var SOLIDUS$3 = 47;
var LESSTHANSIGN = 60;
var EQUALSSIGN = 61;
var GREATERTHANSIGN$1 = 62;
var name$31 = "FeatureRange";
var structure$31 = {
	kind: String,
	left: [
		"Identifier",
		"Number",
		"Dimension",
		"Ratio",
		"Function"
	],
	leftComparison: String,
	middle: [
		"Identifier",
		"Number",
		"Dimension",
		"Ratio",
		"Function"
	],
	rightComparison: [String, null],
	right: [
		"Identifier",
		"Number",
		"Dimension",
		"Ratio",
		"Function",
		null
	]
};
function readTerm() {
	this.skipSC();
	switch (this.tokenType) {
		case 10: if (this.isDelim(SOLIDUS$3, this.lookupOffsetNonSC(1))) return this.Ratio();
		else return this.Number();
		case 12: return this.Dimension();
		case 1: return this.Identifier();
		case 2: return this.parseWithFallback(() => {
			const res = this.Function(this.readSequence, this.scope.Value);
			this.skipSC();
			if (this.isDelim(SOLIDUS$3)) this.error();
			return res;
		}, () => {
			return this.Ratio();
		});
		default: this.error("Number, dimension, ratio or identifier is expected");
	}
}
function readComparison(expectColon) {
	this.skipSC();
	if (this.isDelim(LESSTHANSIGN) || this.isDelim(GREATERTHANSIGN$1)) {
		const value = this.source[this.tokenStart];
		this.next();
		if (this.isDelim(EQUALSSIGN)) {
			this.next();
			return value + "=";
		}
		return value;
	}
	if (this.isDelim(EQUALSSIGN)) return "=";
	this.error(`Expected ${expectColon ? "\":\", " : ""}"<", ">", "=" or ")"`);
}
function parse$32(kind = "unknown") {
	const start = this.tokenStart;
	this.skipSC();
	this.eat(21);
	const left = readTerm.call(this);
	const leftComparison = readComparison.call(this, left.type === "Identifier");
	const middle = readTerm.call(this);
	let rightComparison = null;
	let right = null;
	if (this.lookupNonWSType(0) !== 22) {
		rightComparison = readComparison.call(this);
		right = readTerm.call(this);
	}
	this.skipSC();
	this.eat(22);
	return {
		type: "FeatureRange",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		left,
		leftComparison,
		middle,
		rightComparison,
		right
	};
}
function generate$32(node) {
	this.token(21, "(");
	this.node(node.left);
	this.tokenize(node.leftComparison);
	this.node(node.middle);
	if (node.right) {
		this.tokenize(node.rightComparison);
		this.node(node.right);
	}
	this.token(22, ")");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Function.js
var Function_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$31,
	name: () => name$30,
	parse: () => parse$31,
	structure: () => structure$30,
	walkContext: () => walkContext$5
});
var name$30 = "Function";
var walkContext$5 = "function";
var structure$30 = {
	name: String,
	children: [[]]
};
function parse$31(readSequence, recognizer) {
	const start = this.tokenStart;
	const name = this.consumeFunctionName();
	const nameLowerCase = name.toLowerCase();
	let children;
	children = recognizer.hasOwnProperty(nameLowerCase) ? recognizer[nameLowerCase].call(this, recognizer) : readSequence.call(this, recognizer);
	if (!this.eof) this.eat(22);
	return {
		type: "Function",
		loc: this.getLocation(start, this.tokenStart),
		name,
		children
	};
}
function generate$31(node) {
	this.token(2, node.name + "(");
	this.children(node);
	this.token(22, ")");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/GeneralEnclosed.js
var GeneralEnclosed_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$30,
	name: () => name$29,
	parse: () => parse$30,
	structure: () => structure$29
});
var name$29 = "GeneralEnclosed";
var structure$29 = {
	kind: String,
	function: [String, null],
	children: [[]]
};
function parse$30(kind) {
	const start = this.tokenStart;
	let functionName = null;
	if (this.tokenType === 2) functionName = this.consumeFunctionName();
	else this.eat(21);
	const children = this.parseWithFallback(() => {
		const startValueToken = this.tokenIndex;
		const children = this.readSequence(this.scope.Value);
		if (this.eof === false && this.isBalanceEdge(startValueToken) === false) this.error();
		return children;
	}, () => this.createSingleNodeList(this.Raw(null, false)));
	if (!this.eof) this.eat(22);
	return {
		type: "GeneralEnclosed",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		function: functionName,
		children
	};
}
function generate$30(node) {
	if (node.function) this.token(2, node.function + "(");
	else this.token(21, "(");
	this.children(node);
	this.token(22, ")");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Hash.js
var Hash_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$29,
	name: () => name$28,
	parse: () => parse$29,
	structure: () => structure$28,
	xxx: () => "XXX"
});
var name$28 = "Hash";
var structure$28 = { value: String };
function parse$29() {
	const start = this.tokenStart;
	this.eat(4);
	return {
		type: "Hash",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substrToCursor(start + 1)
	};
}
function generate$29(node) {
	this.token(4, "#" + node.value);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Identifier.js
var Identifier_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$28,
	name: () => name$27,
	parse: () => parse$28,
	structure: () => structure$27
});
var name$27 = "Identifier";
var structure$27 = { name: String };
function parse$28() {
	return {
		type: "Identifier",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		name: this.consume(1)
	};
}
function generate$28(node) {
	this.token(1, node.name);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/IdSelector.js
var IdSelector_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$27,
	name: () => name$26,
	parse: () => parse$27,
	structure: () => structure$26
});
var name$26 = "IdSelector";
var structure$26 = { name: String };
function parse$27() {
	const start = this.tokenStart;
	this.eat(4);
	return {
		type: "IdSelector",
		loc: this.getLocation(start, this.tokenStart),
		name: this.substrToCursor(start + 1)
	};
}
function generate$27(node) {
	this.token(9, "#" + node.name);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Layer.js
var Layer_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$26,
	name: () => name$25,
	parse: () => parse$26,
	structure: () => structure$25
});
var FULLSTOP$1 = 46;
var name$25 = "Layer";
var structure$25 = { name: String };
function parse$26() {
	let tokenStart = this.tokenStart;
	let name = this.consume(1);
	while (this.isDelim(FULLSTOP$1)) {
		this.eat(9);
		name += "." + this.consume(1);
	}
	return {
		type: "Layer",
		loc: this.getLocation(tokenStart, this.tokenStart),
		name
	};
}
function generate$26(node) {
	this.tokenize(node.name);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/LayerList.js
var LayerList_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$25,
	name: () => name$24,
	parse: () => parse$25,
	structure: () => structure$24
});
var name$24 = "LayerList";
var structure$24 = { children: [["Layer"]] };
function parse$25() {
	const children = this.createList();
	this.skipSC();
	while (!this.eof) {
		children.push(this.Layer());
		if (this.lookupTypeNonSC(0) !== 18) break;
		this.skipSC();
		this.next();
		this.skipSC();
	}
	return {
		type: "LayerList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$25(node) {
	this.children(node, () => this.token(18, ","));
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/MediaQuery.js
var MediaQuery_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$24,
	name: () => name$23,
	parse: () => parse$24,
	structure: () => structure$23
});
var name$23 = "MediaQuery";
var structure$23 = {
	modifier: [String, null],
	mediaType: [String, null],
	condition: ["Condition", null]
};
function parse$24() {
	const start = this.tokenStart;
	let modifier = null;
	let mediaType = null;
	let condition = null;
	this.skipSC();
	if (this.tokenType === 1 && this.lookupTypeNonSC(1) !== 21) {
		const ident = this.consume(1);
		const identLowerCase = ident.toLowerCase();
		if (identLowerCase === "not" || identLowerCase === "only") {
			this.skipSC();
			modifier = identLowerCase;
			mediaType = this.consume(1);
		} else mediaType = ident;
		switch (this.lookupTypeNonSC(0)) {
			case 1:
				this.skipSC();
				this.eatIdent("and");
				condition = this.Condition("media");
				break;
			case 23:
			case 17:
			case 18:
			case 0: break;
			default: this.error("Identifier or parenthesis is expected");
		}
	} else switch (this.tokenType) {
		case 1:
		case 21:
		case 2:
			condition = this.Condition("media");
			break;
		case 23:
		case 17:
		case 0: break;
		default: this.error("Identifier or parenthesis is expected");
	}
	return {
		type: "MediaQuery",
		loc: this.getLocation(start, this.tokenStart),
		modifier,
		mediaType,
		condition
	};
}
function generate$24(node) {
	if (node.mediaType) {
		if (node.modifier) this.token(1, node.modifier);
		this.token(1, node.mediaType);
		if (node.condition) {
			this.token(1, "and");
			this.node(node.condition);
		}
	} else if (node.condition) this.node(node.condition);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/MediaQueryList.js
var MediaQueryList_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$23,
	name: () => name$22,
	parse: () => parse$23,
	structure: () => structure$22
});
var name$22 = "MediaQueryList";
var structure$22 = { children: [["MediaQuery"]] };
function parse$23() {
	const children = this.createList();
	this.skipSC();
	while (!this.eof) {
		children.push(this.MediaQuery());
		if (this.tokenType !== 18) break;
		this.next();
	}
	return {
		type: "MediaQueryList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$23(node) {
	this.children(node, () => this.token(18, ","));
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/NestingSelector.js
var NestingSelector_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$22,
	name: () => name$21,
	parse: () => parse$22,
	structure: () => structure$21
});
var AMPERSAND$1 = 38;
var name$21 = "NestingSelector";
var structure$21 = {};
function parse$22() {
	const start = this.tokenStart;
	this.eatDelim(AMPERSAND$1);
	return {
		type: "NestingSelector",
		loc: this.getLocation(start, this.tokenStart)
	};
}
function generate$22() {
	this.token(9, "&");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Nth.js
var Nth_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$21,
	name: () => "Nth",
	parse: () => parse$21,
	structure: () => structure$20
});
var structure$20 = {
	nth: ["AnPlusB", "Identifier"],
	selector: ["SelectorList", null]
};
function parse$21() {
	this.skipSC();
	const start = this.tokenStart;
	let end = start;
	let selector = null;
	let nth;
	if (this.lookupValue(0, "odd") || this.lookupValue(0, "even")) nth = this.Identifier();
	else nth = this.AnPlusB();
	end = this.tokenStart;
	this.skipSC();
	if (this.lookupValue(0, "of")) {
		this.next();
		selector = this.SelectorList();
		end = this.tokenStart;
	}
	return {
		type: "Nth",
		loc: this.getLocation(start, end),
		nth,
		selector
	};
}
function generate$21(node) {
	this.node(node.nth);
	if (node.selector !== null) {
		this.token(1, "of");
		this.node(node.selector);
	}
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Number.js
var Number_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$20,
	name: () => name$19,
	parse: () => parse$20,
	structure: () => structure$19
});
var name$19 = "Number";
var structure$19 = { value: String };
function parse$20() {
	return {
		type: "Number",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		value: this.consume(10)
	};
}
function generate$20(node) {
	this.token(10, node.value);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Operator.js
var Operator_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$19,
	name: () => name$18,
	parse: () => parse$19,
	structure: () => structure$18
});
var name$18 = "Operator";
var structure$18 = { value: String };
function parse$19() {
	const start = this.tokenStart;
	this.next();
	return {
		type: "Operator",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substrToCursor(start)
	};
}
function generate$19(node) {
	this.tokenize(node.value);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Parentheses.js
var Parentheses_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$18,
	name: () => name$17,
	parse: () => parse$18,
	structure: () => structure$17
});
var name$17 = "Parentheses";
var structure$17 = { children: [[]] };
function parse$18(readSequence, recognizer) {
	const start = this.tokenStart;
	let children = null;
	this.eat(21);
	children = readSequence.call(this, recognizer);
	if (!this.eof) this.eat(22);
	return {
		type: "Parentheses",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$18(node) {
	this.token(21, "(");
	this.children(node);
	this.token(22, ")");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Percentage.js
var Percentage_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$17,
	name: () => name$16,
	parse: () => parse$17,
	structure: () => structure$16
});
var name$16 = "Percentage";
var structure$16 = { value: String };
function parse$17() {
	return {
		type: "Percentage",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		value: this.consumeNumber(11)
	};
}
function generate$17(node) {
	this.token(11, node.value + "%");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js
var PseudoClassSelector_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$16,
	name: () => name$15,
	parse: () => parse$16,
	structure: () => structure$15,
	walkContext: () => walkContext$4
});
var name$15 = "PseudoClassSelector";
var walkContext$4 = "function";
var structure$15 = {
	name: String,
	children: [["Raw"], null]
};
function parse$16() {
	const start = this.tokenStart;
	let children = null;
	let name;
	let nameLowerCase;
	this.eat(16);
	if (this.tokenType === 2) {
		name = this.consumeFunctionName();
		nameLowerCase = name.toLowerCase();
		if (this.lookupNonWSType(0) == 22) children = this.createList();
		else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
			this.skipSC();
			children = this.pseudo[nameLowerCase].call(this);
			this.skipSC();
		} else {
			children = this.createList();
			children.push(this.Raw(null, false));
		}
		this.eat(22);
	} else name = this.consume(1);
	return {
		type: "PseudoClassSelector",
		loc: this.getLocation(start, this.tokenStart),
		name,
		children
	};
}
function generate$16(node) {
	this.token(16, ":");
	if (node.children === null) this.token(1, node.name);
	else {
		this.token(2, node.name + "(");
		this.children(node);
		this.token(22, ")");
	}
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js
var PseudoElementSelector_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$15,
	name: () => name$14,
	parse: () => parse$15,
	structure: () => structure$14,
	walkContext: () => walkContext$3
});
var name$14 = "PseudoElementSelector";
var walkContext$3 = "function";
var structure$14 = {
	name: String,
	children: [["Raw"], null]
};
function parse$15() {
	const start = this.tokenStart;
	let children = null;
	let name;
	let nameLowerCase;
	this.eat(16);
	this.eat(16);
	if (this.tokenType === 2) {
		name = this.consumeFunctionName();
		nameLowerCase = name.toLowerCase();
		if (this.lookupNonWSType(0) == 22) children = this.createList();
		else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
			this.skipSC();
			children = this.pseudo[nameLowerCase].call(this);
			this.skipSC();
		} else {
			children = this.createList();
			children.push(this.Raw(null, false));
		}
		this.eat(22);
	} else name = this.consume(1);
	return {
		type: "PseudoElementSelector",
		loc: this.getLocation(start, this.tokenStart),
		name,
		children
	};
}
function generate$15(node) {
	this.token(16, ":");
	this.token(16, ":");
	if (node.children === null) this.token(1, node.name);
	else {
		this.token(2, node.name + "(");
		this.children(node);
		this.token(22, ")");
	}
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Ratio.js
var Ratio_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$14,
	name: () => name$13,
	parse: () => parse$14,
	structure: () => structure$13
});
var SOLIDUS$2 = 47;
function consumeTerm() {
	this.skipSC();
	switch (this.tokenType) {
		case 10: return this.Number();
		case 2: return this.Function(this.readSequence, this.scope.Value);
		default: this.error("Number of function is expected");
	}
}
var name$13 = "Ratio";
var structure$13 = {
	left: ["Number", "Function"],
	right: [
		"Number",
		"Function",
		null
	]
};
function parse$14() {
	const start = this.tokenStart;
	const left = consumeTerm.call(this);
	let right = null;
	this.skipSC();
	if (this.isDelim(SOLIDUS$2)) {
		this.eatDelim(SOLIDUS$2);
		right = consumeTerm.call(this);
	}
	return {
		type: "Ratio",
		loc: this.getLocation(start, this.tokenStart),
		left,
		right
	};
}
function generate$14(node) {
	this.node(node.left);
	this.token(9, "/");
	if (node.right) this.node(node.right);
	else this.node(10, 1);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Raw.js
var Raw_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$13,
	name: () => "Raw",
	parse: () => parse$13,
	structure: () => structure$12
});
function getOffsetExcludeWS() {
	if (this.tokenIndex > 0) {
		if (this.lookupType(-1) === 13) return this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset;
	}
	return this.tokenStart;
}
var structure$12 = { value: String };
function parse$13(consumeUntil, excludeWhiteSpace) {
	const startOffset = this.getTokenStart(this.tokenIndex);
	let endOffset;
	this.skipUntilBalanced(this.tokenIndex, consumeUntil || this.consumeUntilBalanceEnd);
	if (excludeWhiteSpace && this.tokenStart > startOffset) endOffset = getOffsetExcludeWS.call(this);
	else endOffset = this.tokenStart;
	return {
		type: "Raw",
		loc: this.getLocation(startOffset, endOffset),
		value: this.substring(startOffset, endOffset)
	};
}
function generate$13(node) {
	this.tokenize(node.value);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Rule.js
var Rule_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$12,
	name: () => name$11,
	parse: () => parse$12,
	structure: () => structure$11,
	walkContext: () => walkContext$2
});
function consumeRaw$1() {
	return this.Raw(this.consumeUntilLeftCurlyBracket, true);
}
function consumePrelude() {
	const prelude = this.SelectorList();
	if (prelude.type !== "Raw" && this.eof === false && this.tokenType !== 23) this.error();
	return prelude;
}
var name$11 = "Rule";
var walkContext$2 = "rule";
var structure$11 = {
	prelude: ["SelectorList", "Raw"],
	block: ["Block"]
};
function parse$12() {
	const startToken = this.tokenIndex;
	const startOffset = this.tokenStart;
	let prelude;
	let block;
	if (this.parseRulePrelude) prelude = this.parseWithFallback(consumePrelude, consumeRaw$1);
	else prelude = consumeRaw$1.call(this, startToken);
	block = this.Block(true);
	return {
		type: "Rule",
		loc: this.getLocation(startOffset, this.tokenStart),
		prelude,
		block
	};
}
function generate$12(node) {
	this.node(node.prelude);
	this.node(node.block);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Scope.js
var Scope_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$11,
	name: () => name$10,
	parse: () => parse$11,
	structure: () => structure$10
});
var name$10 = "Scope";
var structure$10 = {
	root: [
		"SelectorList",
		"Raw",
		null
	],
	limit: [
		"SelectorList",
		"Raw",
		null
	]
};
function parse$11() {
	let root = null;
	let limit = null;
	this.skipSC();
	const startOffset = this.tokenStart;
	if (this.tokenType === 21) {
		this.next();
		this.skipSC();
		root = this.parseWithFallback(this.SelectorList, () => this.Raw(false, true));
		this.skipSC();
		this.eat(22);
	}
	if (this.lookupNonWSType(0) === 1) {
		this.skipSC();
		this.eatIdent("to");
		this.skipSC();
		this.eat(21);
		this.skipSC();
		limit = this.parseWithFallback(this.SelectorList, () => this.Raw(false, true));
		this.skipSC();
		this.eat(22);
	}
	return {
		type: "Scope",
		loc: this.getLocation(startOffset, this.tokenStart),
		root,
		limit
	};
}
function generate$11(node) {
	if (node.root) {
		this.token(21, "(");
		this.node(node.root);
		this.token(22, ")");
	}
	if (node.limit) {
		this.token(1, "to");
		this.token(21, "(");
		this.node(node.limit);
		this.token(22, ")");
	}
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Selector.js
var Selector_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$10,
	name: () => name$9,
	parse: () => parse$10,
	structure: () => structure$9
});
var name$9 = "Selector";
var structure$9 = { children: [[
	"TypeSelector",
	"IdSelector",
	"ClassSelector",
	"AttributeSelector",
	"PseudoClassSelector",
	"PseudoElementSelector",
	"Combinator"
]] };
function parse$10() {
	const children = this.readSequence(this.scope.Selector);
	if (this.getFirstListNode(children) === null) this.error("Selector is expected");
	return {
		type: "Selector",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$10(node) {
	this.children(node);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/SelectorList.js
var SelectorList_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$9,
	name: () => name$8,
	parse: () => parse$9,
	structure: () => structure$8,
	walkContext: () => walkContext$1
});
var name$8 = "SelectorList";
var walkContext$1 = "selector";
var structure$8 = { children: [["Selector", "Raw"]] };
function parse$9() {
	const children = this.createList();
	while (!this.eof) {
		children.push(this.Selector());
		if (this.tokenType === 18) {
			this.next();
			continue;
		}
		break;
	}
	return {
		type: "SelectorList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$9(node) {
	this.children(node, () => this.token(18, ","));
}
//#endregion
//#region node_modules/css-tree/lib/utils/string.js
var REVERSE_SOLIDUS$1 = 92;
var QUOTATION_MARK$1 = 34;
var APOSTROPHE$1 = 39;
function decode$1(str) {
	const len = str.length;
	const firstChar = str.charCodeAt(0);
	const start = firstChar === QUOTATION_MARK$1 || firstChar === APOSTROPHE$1 ? 1 : 0;
	const end = start === 1 && len > 1 && str.charCodeAt(len - 1) === firstChar ? len - 2 : len - 1;
	let decoded = "";
	for (let i = start; i <= end; i++) {
		let code = str.charCodeAt(i);
		if (code === REVERSE_SOLIDUS$1) {
			if (i === end) {
				if (i !== len - 1) decoded = str.substr(i + 1);
				break;
			}
			code = str.charCodeAt(++i);
			if (isValidEscape(REVERSE_SOLIDUS$1, code)) {
				const escapeStart = i - 1;
				const escapeEnd = consumeEscaped(str, escapeStart);
				i = escapeEnd - 1;
				decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
			} else if (code === 13 && str.charCodeAt(i + 1) === 10) i++;
		} else decoded += str[i];
	}
	return decoded;
}
function encode$1(str, apostrophe) {
	const quote = apostrophe ? "'" : "\"";
	const quoteCode = apostrophe ? APOSTROPHE$1 : QUOTATION_MARK$1;
	let encoded = "";
	let wsBeforeHexIsNeeded = false;
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (code === 0) {
			encoded += "�";
			continue;
		}
		if (code <= 31 || code === 127) {
			encoded += "\\" + code.toString(16);
			wsBeforeHexIsNeeded = true;
			continue;
		}
		if (code === quoteCode || code === REVERSE_SOLIDUS$1) {
			encoded += "\\" + str.charAt(i);
			wsBeforeHexIsNeeded = false;
		} else {
			if (wsBeforeHexIsNeeded && (isHexDigit(code) || isWhiteSpace(code))) encoded += " ";
			encoded += str.charAt(i);
			wsBeforeHexIsNeeded = false;
		}
	}
	return quote + encoded + quote;
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/String.js
var String_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$8,
	name: () => name$7,
	parse: () => parse$8,
	structure: () => structure$7
});
var name$7 = "String";
var structure$7 = { value: String };
function parse$8() {
	return {
		type: "String",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		value: decode$1(this.consume(5))
	};
}
function generate$8(node) {
	this.token(5, encode$1(node.value));
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/StyleSheet.js
var StyleSheet_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$7,
	name: () => name$6,
	parse: () => parse$7,
	structure: () => structure$6,
	walkContext: () => walkContext
});
var EXCLAMATIONMARK = 33;
function consumeRaw() {
	return this.Raw(null, false);
}
var name$6 = "StyleSheet";
var walkContext = "stylesheet";
var structure$6 = { children: [[
	"Comment",
	"CDO",
	"CDC",
	"Atrule",
	"Rule",
	"Raw"
]] };
function parse$7() {
	const start = this.tokenStart;
	const children = this.createList();
	let child;
	scan: while (!this.eof) {
		switch (this.tokenType) {
			case 13:
				this.next();
				continue;
			case 25:
				if (this.charCodeAt(this.tokenStart + 2) !== EXCLAMATIONMARK) {
					this.next();
					continue;
				}
				child = this.Comment();
				break;
			case 14:
				child = this.CDO();
				break;
			case 15:
				child = this.CDC();
				break;
			case 3:
				child = this.parseWithFallback(this.Atrule, consumeRaw);
				break;
			default: child = this.parseWithFallback(this.Rule, consumeRaw);
		}
		children.push(child);
	}
	return {
		type: "StyleSheet",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$7(node) {
	this.children(node);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/SupportsDeclaration.js
var SupportsDeclaration_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$6,
	name: () => name$5,
	parse: () => parse$6,
	structure: () => structure$5
});
var name$5 = "SupportsDeclaration";
var structure$5 = { declaration: "Declaration" };
function parse$6() {
	const start = this.tokenStart;
	this.eat(21);
	this.skipSC();
	const declaration = this.Declaration();
	if (!this.eof) this.eat(22);
	return {
		type: "SupportsDeclaration",
		loc: this.getLocation(start, this.tokenStart),
		declaration
	};
}
function generate$6(node) {
	this.token(21, "(");
	this.node(node.declaration);
	this.token(22, ")");
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/TypeSelector.js
var TypeSelector_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$5,
	name: () => name$4,
	parse: () => parse$5,
	structure: () => structure$4
});
var ASTERISK$2 = 42;
var VERTICALLINE$1 = 124;
function eatIdentifierOrAsterisk() {
	if (this.tokenType !== 1 && this.isDelim(ASTERISK$2) === false) this.error("Identifier or asterisk is expected");
	this.next();
}
var name$4 = "TypeSelector";
var structure$4 = { name: String };
function parse$5() {
	const start = this.tokenStart;
	if (this.isDelim(VERTICALLINE$1)) {
		this.next();
		eatIdentifierOrAsterisk.call(this);
	} else {
		eatIdentifierOrAsterisk.call(this);
		if (this.isDelim(VERTICALLINE$1)) {
			this.next();
			eatIdentifierOrAsterisk.call(this);
		}
	}
	return {
		type: "TypeSelector",
		loc: this.getLocation(start, this.tokenStart),
		name: this.substrToCursor(start)
	};
}
function generate$5(node) {
	this.tokenize(node.name);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/UnicodeRange.js
var UnicodeRange_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$4,
	name: () => name$3,
	parse: () => parse$4,
	structure: () => structure$3
});
var PLUSSIGN$2 = 43;
var HYPHENMINUS$1 = 45;
var QUESTIONMARK = 63;
function eatHexSequence(offset, allowDash) {
	let len = 0;
	for (let pos = this.tokenStart + offset; pos < this.tokenEnd; pos++) {
		const code = this.charCodeAt(pos);
		if (code === HYPHENMINUS$1 && allowDash && len !== 0) {
			eatHexSequence.call(this, offset + len + 1, false);
			return -1;
		}
		if (!isHexDigit(code)) this.error(allowDash && len !== 0 ? "Hyphen minus" + (len < 6 ? " or hex digit" : "") + " is expected" : len < 6 ? "Hex digit is expected" : "Unexpected input", pos);
		if (++len > 6) this.error("Too many hex digits", pos);
	}
	this.next();
	return len;
}
function eatQuestionMarkSequence(max) {
	let count = 0;
	while (this.isDelim(QUESTIONMARK)) {
		if (++count > max) this.error("Too many question marks");
		this.next();
	}
}
function startsWith(code) {
	if (this.charCodeAt(this.tokenStart) !== code) this.error((code === PLUSSIGN$2 ? "Plus sign" : "Hyphen minus") + " is expected");
}
function scanUnicodeRange() {
	let hexLength = 0;
	switch (this.tokenType) {
		case 10:
			hexLength = eatHexSequence.call(this, 1, true);
			if (this.isDelim(QUESTIONMARK)) {
				eatQuestionMarkSequence.call(this, 6 - hexLength);
				break;
			}
			if (this.tokenType === 12 || this.tokenType === 10) {
				startsWith.call(this, HYPHENMINUS$1);
				eatHexSequence.call(this, 1, false);
				break;
			}
			break;
		case 12:
			hexLength = eatHexSequence.call(this, 1, true);
			if (hexLength > 0) eatQuestionMarkSequence.call(this, 6 - hexLength);
			break;
		default:
			this.eatDelim(PLUSSIGN$2);
			if (this.tokenType === 1) {
				hexLength = eatHexSequence.call(this, 0, true);
				if (hexLength > 0) eatQuestionMarkSequence.call(this, 6 - hexLength);
				break;
			}
			if (this.isDelim(QUESTIONMARK)) {
				this.next();
				eatQuestionMarkSequence.call(this, 5);
				break;
			}
			this.error("Hex digit or question mark is expected");
	}
}
var name$3 = "UnicodeRange";
var structure$3 = { value: String };
function parse$4() {
	const start = this.tokenStart;
	this.eatIdent("u");
	scanUnicodeRange.call(this);
	return {
		type: "UnicodeRange",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substrToCursor(start)
	};
}
function generate$4(node) {
	this.tokenize(node.value);
}
//#endregion
//#region node_modules/css-tree/lib/utils/url.js
var SPACE$1 = 32;
var REVERSE_SOLIDUS = 92;
var QUOTATION_MARK = 34;
var APOSTROPHE = 39;
var LEFTPARENTHESIS = 40;
var RIGHTPARENTHESIS = 41;
function decode(str) {
	const len = str.length;
	let start = 4;
	let end = str.charCodeAt(len - 1) === RIGHTPARENTHESIS ? len - 2 : len - 1;
	let decoded = "";
	while (start < end && isWhiteSpace(str.charCodeAt(start))) start++;
	while (start < end && isWhiteSpace(str.charCodeAt(end))) end--;
	for (let i = start; i <= end; i++) {
		let code = str.charCodeAt(i);
		if (code === REVERSE_SOLIDUS) {
			if (i === end) {
				if (i !== len - 1) decoded = str.substr(i + 1);
				break;
			}
			code = str.charCodeAt(++i);
			if (isValidEscape(REVERSE_SOLIDUS, code)) {
				const escapeStart = i - 1;
				const escapeEnd = consumeEscaped(str, escapeStart);
				i = escapeEnd - 1;
				decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
			} else if (code === 13 && str.charCodeAt(i + 1) === 10) i++;
		} else decoded += str[i];
	}
	return decoded;
}
function encode(str) {
	let encoded = "";
	let wsBeforeHexIsNeeded = false;
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (code === 0) {
			encoded += "�";
			continue;
		}
		if (code <= 31 || code === 127) {
			encoded += "\\" + code.toString(16);
			wsBeforeHexIsNeeded = true;
			continue;
		}
		if (code === SPACE$1 || code === REVERSE_SOLIDUS || code === QUOTATION_MARK || code === APOSTROPHE || code === LEFTPARENTHESIS || code === RIGHTPARENTHESIS) {
			encoded += "\\" + str.charAt(i);
			wsBeforeHexIsNeeded = false;
		} else {
			if (wsBeforeHexIsNeeded && isHexDigit(code)) encoded += " ";
			encoded += str.charAt(i);
			wsBeforeHexIsNeeded = false;
		}
	}
	return "url(" + encoded + ")";
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Url.js
var Url_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$3,
	name: () => "Url",
	parse: () => parse$3,
	structure: () => structure$2
});
var structure$2 = { value: String };
function parse$3() {
	const start = this.tokenStart;
	let value;
	switch (this.tokenType) {
		case 7:
			value = decode(this.consume(7));
			break;
		case 2:
			if (!this.cmpStr(this.tokenStart, this.tokenEnd, "url(")) this.error("Function name must be `url`");
			this.eat(2);
			this.skipSC();
			value = decode$1(this.consume(5));
			this.skipSC();
			if (!this.eof) this.eat(22);
			break;
		default: this.error("Url or Function is expected");
	}
	return {
		type: "Url",
		loc: this.getLocation(start, this.tokenStart),
		value
	};
}
function generate$3(node) {
	this.token(7, encode(node.value));
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Value.js
var Value_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$2,
	name: () => name$1,
	parse: () => parse$2,
	structure: () => structure$1
});
var name$1 = "Value";
var structure$1 = { children: [[]] };
function parse$2() {
	const start = this.tokenStart;
	const children = this.readSequence(this.scope.Value);
	return {
		type: "Value",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$2(node) {
	this.children(node);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/WhiteSpace.js
var WhiteSpace_exports = /* @__PURE__ */ __exportAll$2({
	generate: () => generate$1,
	name: () => name,
	parse: () => parse$1,
	structure: () => structure
});
var SPACE = Object.freeze({
	type: "WhiteSpace",
	loc: null,
	value: " "
});
var name = "WhiteSpace";
var structure = { value: String };
function parse$1() {
	this.eat(13);
	return SPACE;
}
function generate$1(node) {
	this.token(13, node.value);
}
//#endregion
//#region node_modules/css-tree/lib/syntax/node/index.js
var node_exports = /* @__PURE__ */ __exportAll$2({
	AnPlusB: () => AnPlusB_exports,
	Atrule: () => Atrule_exports,
	AtrulePrelude: () => AtrulePrelude_exports,
	AttributeSelector: () => AttributeSelector_exports,
	Block: () => Block_exports,
	Brackets: () => Brackets_exports,
	CDC: () => CDC_exports,
	CDO: () => CDO_exports,
	ClassSelector: () => ClassSelector_exports,
	Combinator: () => Combinator_exports,
	Comment: () => Comment_exports,
	Condition: () => Condition_exports,
	Declaration: () => Declaration_exports,
	DeclarationList: () => DeclarationList_exports,
	Dimension: () => Dimension_exports,
	Feature: () => Feature_exports,
	FeatureFunction: () => FeatureFunction_exports,
	FeatureRange: () => FeatureRange_exports,
	Function: () => Function_exports,
	GeneralEnclosed: () => GeneralEnclosed_exports,
	Hash: () => Hash_exports,
	IdSelector: () => IdSelector_exports,
	Identifier: () => Identifier_exports,
	Layer: () => Layer_exports,
	LayerList: () => LayerList_exports,
	MediaQuery: () => MediaQuery_exports,
	MediaQueryList: () => MediaQueryList_exports,
	NestingSelector: () => NestingSelector_exports,
	Nth: () => Nth_exports,
	Number: () => Number_exports,
	Operator: () => Operator_exports,
	Parentheses: () => Parentheses_exports,
	Percentage: () => Percentage_exports,
	PseudoClassSelector: () => PseudoClassSelector_exports,
	PseudoElementSelector: () => PseudoElementSelector_exports,
	Ratio: () => Ratio_exports,
	Raw: () => Raw_exports,
	Rule: () => Rule_exports,
	Scope: () => Scope_exports,
	Selector: () => Selector_exports,
	SelectorList: () => SelectorList_exports,
	String: () => String_exports,
	StyleSheet: () => StyleSheet_exports,
	SupportsDeclaration: () => SupportsDeclaration_exports,
	TypeSelector: () => TypeSelector_exports,
	UnicodeRange: () => UnicodeRange_exports,
	Url: () => Url_exports,
	Value: () => Value_exports,
	WhiteSpace: () => WhiteSpace_exports
});
//#endregion
//#region node_modules/css-tree/lib/syntax/config/lexer.js
var lexer_default = {
	generic: true,
	cssWideKeywords,
	...data_default,
	node: node_exports
};
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/default.js
var NUMBERSIGN$1 = 35;
var ASTERISK$1 = 42;
var PLUSSIGN$1 = 43;
var HYPHENMINUS = 45;
var SOLIDUS$1 = 47;
var U = 117;
function defaultRecognizer(context) {
	switch (this.tokenType) {
		case 4: return this.Hash();
		case 18: return this.Operator();
		case 21: return this.Parentheses(this.readSequence, context.recognizer);
		case 19: return this.Brackets(this.readSequence, context.recognizer);
		case 5: return this.String();
		case 12: return this.Dimension();
		case 11: return this.Percentage();
		case 10: return this.Number();
		case 2: return this.cmpStr(this.tokenStart, this.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, context.recognizer);
		case 7: return this.Url();
		case 1: if (this.cmpChar(this.tokenStart, U) && this.cmpChar(this.tokenStart + 1, PLUSSIGN$1)) return this.UnicodeRange();
		else return this.Identifier();
		case 9: {
			const code = this.charCodeAt(this.tokenStart);
			if (code === SOLIDUS$1 || code === ASTERISK$1 || code === PLUSSIGN$1 || code === HYPHENMINUS) return this.Operator();
			if (code === NUMBERSIGN$1) this.error("Hex or identifier is expected", this.tokenStart + 1);
			break;
		}
	}
}
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/atrulePrelude.js
var atrulePrelude_default = { getNode: defaultRecognizer };
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/selector.js
var NUMBERSIGN = 35;
var AMPERSAND = 38;
var ASTERISK = 42;
var PLUSSIGN = 43;
var SOLIDUS = 47;
var FULLSTOP = 46;
var GREATERTHANSIGN = 62;
var VERTICALLINE = 124;
var TILDE = 126;
function onWhiteSpace(next, children) {
	if (children.last !== null && children.last.type !== "Combinator" && next !== null && next.type !== "Combinator") children.push({
		type: "Combinator",
		loc: null,
		name: " "
	});
}
function getNode() {
	switch (this.tokenType) {
		case 19: return this.AttributeSelector();
		case 4: return this.IdSelector();
		case 16: if (this.lookupType(1) === 16) return this.PseudoElementSelector();
		else return this.PseudoClassSelector();
		case 1: return this.TypeSelector();
		case 10:
		case 11: return this.Percentage();
		case 12:
			if (this.charCodeAt(this.tokenStart) === FULLSTOP) this.error("Identifier is expected", this.tokenStart + 1);
			break;
		case 9:
			switch (this.charCodeAt(this.tokenStart)) {
				case PLUSSIGN:
				case GREATERTHANSIGN:
				case TILDE:
				case SOLIDUS: return this.Combinator();
				case FULLSTOP: return this.ClassSelector();
				case ASTERISK:
				case VERTICALLINE: return this.TypeSelector();
				case NUMBERSIGN: return this.IdSelector();
				case AMPERSAND: return this.NestingSelector();
			}
			break;
	}
}
var selector_default = {
	onWhiteSpace,
	getNode
};
//#endregion
//#region node_modules/css-tree/lib/syntax/function/expression.js
function expression_default() {
	return this.createSingleNodeList(this.Raw(null, false));
}
//#endregion
//#region node_modules/css-tree/lib/syntax/function/var.js
function var_default() {
	const children = this.createList();
	this.skipSC();
	children.push(this.Identifier());
	this.skipSC();
	if (this.tokenType === 18) {
		children.push(this.Operator());
		const startIndex = this.tokenIndex;
		const value = this.parseCustomProperty ? this.Value(null) : this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
		if (value.type === "Value" && value.children.isEmpty) {
			for (let offset = startIndex - this.tokenIndex; offset <= 0; offset++) if (this.lookupType(offset) === 13) {
				value.children.appendData({
					type: "WhiteSpace",
					loc: null,
					value: " "
				});
				break;
			}
		}
		children.push(value);
	}
	return children;
}
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/value.js
function isPlusMinusOperator(node) {
	return node !== null && node.type === "Operator" && (node.value[node.value.length - 1] === "-" || node.value[node.value.length - 1] === "+");
}
var value_default = {
	getNode: defaultRecognizer,
	onWhiteSpace(next, children) {
		if (isPlusMinusOperator(next)) next.value = " " + next.value;
		if (isPlusMinusOperator(children.last)) children.last.value += " ";
	},
	"expression": expression_default,
	"var": var_default
};
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/index.js
var scope_exports = /* @__PURE__ */ __exportAll$2({
	AtrulePrelude: () => atrulePrelude_default,
	Selector: () => selector_default,
	Value: () => value_default
});
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/container.js
var nonContainerNameKeywords = new Set([
	"none",
	"and",
	"not",
	"or"
]);
var container_default = { parse: {
	prelude() {
		const children = this.createList();
		if (this.tokenType === 1) {
			const name = this.substring(this.tokenStart, this.tokenEnd);
			if (!nonContainerNameKeywords.has(name.toLowerCase())) children.push(this.Identifier());
		}
		children.push(this.Condition("container"));
		return children;
	},
	block(nested = false) {
		return this.Block(nested);
	}
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/font-face.js
var font_face_default = { parse: {
	prelude: null,
	block() {
		return this.Block(true);
	}
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/import.js
function parseWithFallback(parse, fallback) {
	return this.parseWithFallback(() => {
		try {
			return parse.call(this);
		} finally {
			this.skipSC();
			if (this.lookupNonWSType(0) !== 22) this.error();
		}
	}, fallback || (() => this.Raw(null, true)));
}
var parseFunctions = {
	layer() {
		this.skipSC();
		const children = this.createList();
		const node = parseWithFallback.call(this, this.Layer);
		if (node.type !== "Raw" || node.value !== "") children.push(node);
		return children;
	},
	supports() {
		this.skipSC();
		const children = this.createList();
		const node = parseWithFallback.call(this, this.Declaration, () => parseWithFallback.call(this, () => this.Condition("supports")));
		if (node.type !== "Raw" || node.value !== "") children.push(node);
		return children;
	}
};
var import_default = { parse: {
	prelude() {
		const children = this.createList();
		switch (this.tokenType) {
			case 5:
				children.push(this.String());
				break;
			case 7:
			case 2:
				children.push(this.Url());
				break;
			default: this.error("String or url() is expected");
		}
		this.skipSC();
		if (this.tokenType === 1 && this.cmpStr(this.tokenStart, this.tokenEnd, "layer")) children.push(this.Identifier());
		else if (this.tokenType === 2 && this.cmpStr(this.tokenStart, this.tokenEnd, "layer(")) children.push(this.Function(null, parseFunctions));
		this.skipSC();
		if (this.tokenType === 2 && this.cmpStr(this.tokenStart, this.tokenEnd, "supports(")) children.push(this.Function(null, parseFunctions));
		if (this.lookupNonWSType(0) === 1 || this.lookupNonWSType(0) === 21) children.push(this.MediaQueryList());
		return children;
	},
	block: null
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/layer.js
var layer_default = { parse: {
	prelude() {
		return this.createSingleNodeList(this.LayerList());
	},
	block() {
		return this.Block(false);
	}
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/media.js
var media_default = { parse: {
	prelude() {
		return this.createSingleNodeList(this.MediaQueryList());
	},
	block(nested = false) {
		return this.Block(nested);
	}
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/nest.js
var nest_default = { parse: {
	prelude() {
		return this.createSingleNodeList(this.SelectorList());
	},
	block() {
		return this.Block(true);
	}
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/page.js
var page_default = { parse: {
	prelude() {
		return this.createSingleNodeList(this.SelectorList());
	},
	block() {
		return this.Block(true);
	}
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/scope.js
var scope_default = { parse: {
	prelude() {
		return this.createSingleNodeList(this.Scope());
	},
	block(nested = false) {
		return this.Block(nested);
	}
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/starting-style.js
var starting_style_default = { parse: {
	prelude: null,
	block(nested = false) {
		return this.Block(nested);
	}
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/supports.js
var supports_default = { parse: {
	prelude() {
		return this.createSingleNodeList(this.Condition("supports"));
	},
	block(nested = false) {
		return this.Block(nested);
	}
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/index.js
var atrule_default = {
	container: container_default,
	"font-face": font_face_default,
	import: import_default,
	layer: layer_default,
	media: media_default,
	nest: nest_default,
	page: page_default,
	scope: scope_default,
	"starting-style": starting_style_default,
	supports: supports_default
};
//#endregion
//#region node_modules/css-tree/lib/syntax/pseudo/lang.js
function parseLanguageRangeList() {
	const children = this.createList();
	this.skipSC();
	loop: while (!this.eof) {
		switch (this.tokenType) {
			case 1:
				children.push(this.Identifier());
				break;
			case 5:
				children.push(this.String());
				break;
			case 18:
				children.push(this.Operator());
				break;
			case 22: break loop;
			default: this.error("Identifier, string or comma is expected");
		}
		this.skipSC();
	}
	return children;
}
//#endregion
//#region node_modules/css-tree/lib/syntax/pseudo/index.js
var selectorList = { parse() {
	return this.createSingleNodeList(this.SelectorList());
} };
var selector = { parse() {
	return this.createSingleNodeList(this.Selector());
} };
var identList = { parse() {
	return this.createSingleNodeList(this.Identifier());
} };
var langList = { parse: parseLanguageRangeList };
var nth = { parse() {
	return this.createSingleNodeList(this.Nth());
} };
//#endregion
//#region node_modules/css-tree/lib/syntax/config/parser.js
var parser_default = {
	parseContext: {
		default: "StyleSheet",
		stylesheet: "StyleSheet",
		atrule: "Atrule",
		atrulePrelude(options) {
			return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
		},
		mediaQueryList: "MediaQueryList",
		mediaQuery: "MediaQuery",
		condition(options) {
			return this.Condition(options.kind);
		},
		rule: "Rule",
		selectorList: "SelectorList",
		selector: "Selector",
		block() {
			return this.Block(true);
		},
		declarationList: "DeclarationList",
		declaration: "Declaration",
		value: "Value"
	},
	features: {
		supports: { selector() {
			return this.Selector();
		} },
		container: { style() {
			return this.Declaration();
		} }
	},
	scope: scope_exports,
	atrule: atrule_default,
	pseudo: {
		"dir": identList,
		"has": selectorList,
		"lang": langList,
		"matches": selectorList,
		"is": selectorList,
		"-moz-any": selectorList,
		"-webkit-any": selectorList,
		"where": selectorList,
		"not": selectorList,
		"nth-child": nth,
		"nth-last-child": nth,
		"nth-last-of-type": nth,
		"nth-of-type": nth,
		"slotted": selector,
		"host": selector,
		"host-context": selector
	},
	node: /* @__PURE__ */ __exportAll$2({
		AnPlusB: () => parse$49,
		Atrule: () => parse$48,
		AtrulePrelude: () => parse$47,
		AttributeSelector: () => parse$46,
		Block: () => parse$45,
		Brackets: () => parse$44,
		CDC: () => parse$43,
		CDO: () => parse$42,
		ClassSelector: () => parse$41,
		Combinator: () => parse$40,
		Comment: () => parse$39,
		Condition: () => parse$38,
		Declaration: () => parse$37,
		DeclarationList: () => parse$36,
		Dimension: () => parse$35,
		Feature: () => parse$34,
		FeatureFunction: () => parse$33,
		FeatureRange: () => parse$32,
		Function: () => parse$31,
		GeneralEnclosed: () => parse$30,
		Hash: () => parse$29,
		IdSelector: () => parse$27,
		Identifier: () => parse$28,
		Layer: () => parse$26,
		LayerList: () => parse$25,
		MediaQuery: () => parse$24,
		MediaQueryList: () => parse$23,
		NestingSelector: () => parse$22,
		Nth: () => parse$21,
		Number: () => parse$20,
		Operator: () => parse$19,
		Parentheses: () => parse$18,
		Percentage: () => parse$17,
		PseudoClassSelector: () => parse$16,
		PseudoElementSelector: () => parse$15,
		Ratio: () => parse$14,
		Raw: () => parse$13,
		Rule: () => parse$12,
		Scope: () => parse$11,
		Selector: () => parse$10,
		SelectorList: () => parse$9,
		String: () => parse$8,
		StyleSheet: () => parse$7,
		SupportsDeclaration: () => parse$6,
		TypeSelector: () => parse$5,
		UnicodeRange: () => parse$4,
		Url: () => parse$3,
		Value: () => parse$2,
		WhiteSpace: () => parse$1
	})
};
//#endregion
//#region node_modules/css-tree/lib/syntax/config/walker.js
var walker_default = { node: node_exports };
//#endregion
//#region node_modules/css-tree/lib/syntax/index.js
var syntax_default = create_default({
	...lexer_default,
	...parser_default,
	...walker_default
});
//#endregion
//#region node_modules/css-tree/lib/utils/clone.js
function clone$1(node) {
	const result = {};
	for (const key of Object.keys(node)) {
		let value = node[key];
		if (value) {
			if (Array.isArray(value) || value instanceof List) value = value.map(clone$1);
			else if (value.constructor === Object) value = clone$1(value);
		}
		result[key] = value;
	}
	return result;
}
//#endregion
//#region node_modules/css-tree/lib/index.js
var { tokenize, parse, generate, lexer, createLexer, walk, find, findLast, findAll, toPlainObject, fromPlainObject, fork } = syntax_default;
//#endregion
//#region node_modules/@unocss/transformer-directives/dist/index.mjs
async function handleApply(ctx, node) {
	const { code, uno, options, filename } = ctx;
	await Promise.all(node.block.children.map(async (childNode) => {
		if (childNode.type === "Raw") return transformDirectives(code, uno, options, filename, childNode.value, childNode.loc.start.offset);
		await parseApply(ctx, node, childNode);
	}).toArray());
}
async function parseApply({ code, uno, applyVariable }, node, childNode) {
	const original = code.original;
	let body;
	if (childNode.type === "Atrule" && childNode.name === "apply" && childNode.prelude && childNode.prelude.type === "Raw") body = removeQuotes(childNode.prelude.value.trim());
	else if (childNode.type === "Declaration" && applyVariable.includes(childNode.property) && (childNode.value.type === "Value" || childNode.value.type === "Raw")) {
		let rawValue = original.slice(childNode.value.loc.start.offset, childNode.value.loc.end.offset).trim();
		rawValue = removeQuotes(rawValue);
		body = rawValue.split(/\s+/g).filter(Boolean).map((i) => removeQuotes(i)).join(" ");
	}
	if (!body) return;
	body = removeComments(body);
	const classNames = expandVariantGroup(body).split(/\s+/g).map((className) => className.trim().replace(/\\/, ""));
	const utils = (await Promise.all(classNames.map((i) => uno.parseToken(i, "-")))).filter(notNull).flat().sort((a, b) => a[0] - b[0]).sort((a, b) => (a[3] ? uno.parentOrders.get(a[3]) ?? 0 : 0) - (b[3] ? uno.parentOrders.get(b[3]) ?? 0 : 0)).reduce((acc, item) => {
		const target = acc.find((i) => i[1] === item[1] && i[3] === item[3]);
		if (target) target[2] += item[2];
		else acc.push([...item]);
		return acc;
	}, []);
	if (!utils.length) return;
	let semicolonOffset = original[childNode.loc.end.offset] === ";" ? 1 : original[childNode.loc.end.offset] === "@" ? -1 : 0;
	for (const i of utils) {
		const [, _selector, body$1, parent, meta] = i;
		const selectorOrGroup = _selector?.replace(regexScopePlaceholder, " ") || _selector;
		if (parent || selectorOrGroup && selectorOrGroup !== ".\\-" || meta?.noMerge) {
			let newSelector = generate(node.prelude);
			const className = code.slice(node.prelude.loc.start.offset, node.prelude.loc.end.offset);
			if (meta?.noMerge) newSelector = selectorOrGroup;
			else if (selectorOrGroup && selectorOrGroup !== ".\\-") {
				const ruleAST = parse(`${selectorOrGroup}{}`, { context: "rule" });
				const prelude = clone$1(node.prelude);
				prelude.children?.forEach((child) => {
					const selectorListAst = clone$1(ruleAST.prelude);
					const classSelectors = new List();
					selectorListAst?.children?.forEach((selectorAst) => {
						classSelectors.appendList(selectorAst?.children?.filter((i$1) => i$1.type === "ClassSelector" && i$1.name === "\\-"));
					});
					classSelectors.forEach((i$1) => Object.assign(i$1, clone$1(child)));
					Object.assign(child, selectorListAst);
				});
				newSelector = generate(prelude);
			}
			let css = `${newSelector.includes(".\\-") ? className.split(",").map((e) => newSelector.replace(/.\\-/g, e.trim())).join(",") : newSelector}{${body$1}}`;
			if (parent) if (parent.includes(" $$ ")) {
				const [first, ...parentSelectors] = parent.split(" $$ ").reverse();
				css = `${parentSelectors.reduce((p, c, i$1) => i$1 === parentSelectors.length - 1 ? `${p}{${c}{${css}}}${"}".repeat(i$1)}` : `${p}{${c}`, first)}`;
			} else if (parent === ".\\-") css = `${className}{${css}}`;
			else css = `${parent}{${css}}`;
			semicolonOffset = 0;
			code.appendLeft(node.loc.end.offset, css);
		} else if (body$1.includes("@")) code.appendRight(original.length, body$1);
		else code.appendRight(childNode.loc.end.offset + semicolonOffset, body$1);
	}
	code.remove(childNode.loc.start.offset, childNode.loc.end.offset + semicolonOffset);
}
function removeQuotes(value) {
	return value.replace(/^(['"])(.*)\1$/, "$2");
}
function removeComments(value) {
	return value.replace(/(\/\*(?:.|\n)*?\*\/)|(\/\/.*)/g, "");
}
async function transformIconString(uno, icon, color) {
	const presetIcons = uno.config.presets?.flat()?.find((i) => i.name === "@unocss/preset-icons");
	if (!presetIcons) {
		console.warn("@unocss/preset-icons not found, icon() directive will be keep as-is");
		return;
	}
	const { scale = 1, prefix = "i-", collections: customCollections, customizations = {}, autoInstall = false, iconifyCollectionsNames, collectionsNodeResolvePath, unit } = presetIcons.options;
	const api = presetIcons.api;
	const loaderOptions = {
		addXmlNs: true,
		scale,
		customCollections,
		autoInstall,
		cwd: collectionsNodeResolvePath,
		warn: void 0,
		customizations: {
			...customizations,
			trimCustomSvg: true,
			async iconCustomizer(collection, icon$1, props) {
				await customizations.iconCustomizer?.(collection, icon$1, props);
				if (unit) {
					if (!props.width) props.width = `${scale}${unit}`;
					if (!props.height) props.height = `${scale}${unit}`;
				}
			}
		}
	};
	const loader = await api.createNodeLoader?.() || (async () => void 0);
	for (const p of toArray(prefix)) if (icon.startsWith(p)) {
		icon = icon.slice(p.length);
		const parsed = await api.parseIconWithLoader(icon, loader, loaderOptions, iconifyCollectionsNames);
		if (parsed) return `url("data:image/svg+xml;utf8,${color ? api.encodeSvgForCss(parsed.svg).replace(/currentcolor/gi, color) : api.encodeSvgForCss(parsed.svg)}")`;
	}
}
async function handleFunction({ code, uno, options }, node) {
	const { throwOnMissing = true } = options;
	switch (node.name) {
		case "theme": {
			if (!node.children.size) throw new Error("theme() expect exact one argument");
			if (node.children.first.type !== "String") throw new Error("theme() expect a string argument");
			let defaultValueLoc;
			if (node.children.size > 1) {
				const remains = node.children.toArray().slice(1);
				if (!(remains[0].type === "Operator" && remains[0].value === ",")) throw new Error("theme() expect a comma between expression string and default value");
				if (remains.length > 1) defaultValueLoc = [remains[1].loc.start.offset, node.children.last.loc.end.offset];
			}
			const themeStr = node.children.first.value;
			let value = transformThemeString(themeStr, uno.config.theme, !defaultValueLoc && throwOnMissing);
			if (!value && defaultValueLoc) value = code.slice(defaultValueLoc[0], defaultValueLoc[1]);
			if (value) code.overwrite(node.loc.start.offset, node.loc.end.offset, value);
			break;
		}
		case "icon": {
			const params = node.children.toArray().filter((node$1) => node$1.type === "String").map((node$1) => node$1.value);
			if (params.length === 0) throw new Error("icon() expects at least one argument");
			let [icon, color] = params;
			if (color) color = encodeURIComponent(transformThemeFn(color, uno.config.theme, throwOnMissing));
			const value = await transformIconString(uno, icon, color);
			if (value) code.overwrite(node.loc.start.offset, node.loc.end.offset, value);
			break;
		}
	}
}
var screenRuleRE = /(@screen [^{]+)(.+)/g;
function handleScreen({ code, uno }, node) {
	let breakpointName = "";
	let prefix = "";
	if (node.prelude?.type === "Raw") breakpointName = node.prelude.value.trim();
	if (!breakpointName) return;
	const match = breakpointName.match(/^(?:(lt|at)-)?(\w+)$/);
	if (match) {
		prefix = match[1];
		breakpointName = match[2];
	}
	const resolveBreakpoints = () => {
		const key = uno.config.presets.some((p) => p.name === "@unocss/preset-wind4") ? "breakpoint" : "breakpoints";
		const breakpoints = uno.config.theme[key];
		return breakpoints ? Object.entries(breakpoints).sort((a, b) => Number.parseInt(a[1].replace(/[a-z]+/gi, "")) - Number.parseInt(b[1].replace(/[a-z]+/gi, ""))).map(([point, size]) => ({
			point,
			size
		})) : void 0;
	};
	const variantEntries = (resolveBreakpoints() ?? []).map(({ point, size }, idx) => [
		point,
		size,
		idx
	]);
	const generateMediaQuery = (breakpointName$1, prefix$1) => {
		const [, size, idx] = variantEntries.find((i) => i[0] === breakpointName$1);
		if (prefix$1) if (prefix$1 === "lt") return `@media (max-width: ${calcMaxWidthBySize(size)})`;
		else if (prefix$1 === "at") return `@media (min-width: ${size})${variantEntries[idx + 1] ? ` and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})` : ""}`;
		else throw new Error(`breakpoint variant not supported: ${prefix$1}`);
		return `@media (min-width: ${size})`;
	};
	if (!variantEntries.find((i) => i[0] === breakpointName)) throw new Error(`breakpoint ${breakpointName} not found`);
	const offset = node.loc.start.offset;
	const str = code.original.slice(offset, node.loc.end.offset);
	const matches = Array.from(str.matchAll(screenRuleRE));
	if (!matches.length) return;
	for (const match$1 of matches) code.overwrite(offset + match$1.index, offset + match$1.index + match$1[1].length, `${generateMediaQuery(breakpointName, prefix)}`);
}
async function transformDirectives(code, uno, options, filename, originalCode, offset) {
	let { applyVariable } = options;
	const varStyle = options.varStyle;
	if (applyVariable === void 0) {
		if (varStyle !== void 0) applyVariable = varStyle ? [`${varStyle}apply`] : [];
		applyVariable = [
			"--at-apply",
			"--uno-apply",
			"--uno"
		];
	}
	applyVariable = toArray(applyVariable || []);
	const isHasApply = (code$1) => code$1.includes("@apply") || applyVariable.some((s) => code$1.includes(s));
	const parseCode = originalCode || code.original;
	const hasApply = isHasApply(parseCode);
	const hasScreen = parseCode.includes("@screen");
	const hasFn = hasThemeFn(parseCode) || hasIconFn(parseCode);
	if (!hasApply && !hasFn && !hasScreen) return;
	const ast = parse(parseCode, {
		parseCustomProperty: true,
		parseAtrulePrelude: false,
		positions: true,
		filename,
		offset
	});
	if (ast.type !== "StyleSheet") return;
	const stack = [];
	const ctx = {
		options,
		applyVariable,
		uno,
		code,
		filename,
		offset
	};
	const processNode = async (node, _item, _list) => {
		if (hasScreen && node.type === "Atrule" && node.name === "screen") handleScreen(ctx, node);
		else if (node.type === "Function") await handleFunction(ctx, node);
		else if (hasApply && node.type === "Rule") await handleApply(ctx, node);
	};
	walk(ast, (...args) => stack.push(processNode(...args)));
	await Promise.all(stack);
	const oldCode = code.toString();
	if (!isHasApply(oldCode)) {
		const newCode = oldCode.replace(/([^{}]+)\{\s*\}\s*/g, (m, selector) => {
			if (/^[\s\w\-.,#:[\]=*"'>~+^$|()\\]+$/.test(selector.trim())) return "";
			return m;
		});
		if (newCode !== oldCode) code.update(0, code.original.length, newCode);
	}
}
function transformerDirectives(options = {}) {
	return {
		name: "@unocss/transformer-directives",
		enforce: options?.enforce,
		idFilter: (id) => cssIdRE.test(id),
		transform: (code, id, ctx) => {
			return transformDirectives(code, ctx.uno, options, id);
		}
	};
}
//#endregion
//#region node_modules/@unocss/transformer-variant-group/dist/index.mjs
function transformerVariantGroup(options = {}) {
	return {
		name: "@unocss/transformer-variant-group",
		enforce: "pre",
		transform(s) {
			const result = parseVariantGroup(s, options.separators);
			return { get highlightAnnotations() {
				return [...result.groupsByOffset.values()].flatMap((group) => group.items);
			} };
		}
	};
}
//#endregion
//#region node_modules/unocss/dist/index.mjs
/**
* Define UnoCSS config
*/
function defineConfig(config) {
	return config;
}
//#endregion
export { BetterMap, CountableSet, DEFAULT_LAYERS, LAYER_DEFAULT, LAYER_IMPORTS, LAYER_PREFLIGHTS, LAYER_SHORTCUTS, TwoKeyMap, UnoGenerator, VirtualKey, attributifyRE, clearIdenticalEntries, clone, collapseVariantGroup, createGenerator, createNanoEvents, cssIdRE, defaultSplitRE, defineConfig, definePreset, e, entriesToCss, escapeRegExp, escapeSelector, expandVariantGroup, extractorSplit as extractorDefault, extractorSplit, hasScopePlaceholder, isAttributifySelector, isCountableSet, isObject, isRawUtil, isStaticRule, isStaticShortcut, isString, isValidSelector, makeRegexClassGroup, mergeConfigs, mergeDeep, noop, normalizeCSSEntries, normalizeCSSValues, normalizeVariant, notNull, parseVariantGroup, src_default as presetAttributify, browser_default as presetIcons, src_default$1 as presetMini, src_default$2 as presetTagify, src_default$3 as presetTypography, src_default$4 as presetUno, src_default$5 as presetWebFonts, src_default$6 as presetWind, src_default$7 as presetWind3, src_default$8 as presetWind4, regexScopePlaceholder, resolveConfig, resolvePreset, resolvePresets, resolveShortcuts, splitWithVariantGroupRE, symbols, toArray, toEscapedSelector, transformerAttributifyJsx, transformerCompileClass, transformerDirectives, transformerVariantGroup, uniq, uniqueBy, validateFilterRE, warnOnce, withLayer };

//# sourceMappingURL=unocss.js.map