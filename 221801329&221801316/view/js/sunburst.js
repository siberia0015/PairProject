/*
 Highcharts JS v9.0.1 (2021-02-15)

 (c) 2016-2021 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(a) { "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/sunburst", ["highcharts"], function(q) { a(q);
        a.Highcharts = q; return a }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function(a) {
    function q(a, c, d, l) { a.hasOwnProperty(c) || (a[c] = l.apply(null, d)) }
    a = a ? a._modules : {};
    q(a, "Mixins/ColorMapSeries.js", [a["Core/Globals.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function(a, c, d) {
        var l = d.defined;
        return {
            colorMapPointMixin: { dataLabelOnNull: !0, isValid: function() { return null !== this.value && Infinity !== this.value && -Infinity !== this.value }, setState: function(a) { c.prototype.setState.call(this, a);
                    this.graphic && this.graphic.attr({ zIndex: "hover" === a ? 1 : 0 }) } },
            colorMapSeriesMixin: {
                pointArrayMap: ["value"],
                axisTypes: ["xAxis", "yAxis", "colorAxis"],
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                getSymbol: a.noop,
                parallelArrays: ["x", "y", "value"],
                colorKey: "value",
                pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
                colorAttribs: function(a) { var h = {};
                    l(a.color) && (h[this.colorProp || "fill"] = a.color); return h }
            }
        }
    });
    q(a, "Series/Treemap/TreemapAlgorithmGroup.js", [], function() {
        return function() {
            function a(a, d, l, r) { this.height = a;
                this.width = d;
                this.plot = r;
                this.startDirection = this.direction = l;
                this.lH = this.nH = this.lW = this.nW = this.total = 0;
                this.elArr = [];
                this.lP = { total: 0, lH: 0, nH: 0, lW: 0, nW: 0, nR: 0, lR: 0, aspectRatio: function(a, d) { return Math.max(a / d, d / a) } } }
            a.prototype.addElement = function(a) {
                this.lP.total = this.elArr[this.elArr.length -
                    1];
                this.total += a;
                0 === this.direction ? (this.lW = this.nW, this.lP.lH = this.lP.total / this.lW, this.lP.lR = this.lP.aspectRatio(this.lW, this.lP.lH), this.nW = this.total / this.height, this.lP.nH = this.lP.total / this.nW, this.lP.nR = this.lP.aspectRatio(this.nW, this.lP.nH)) : (this.lH = this.nH, this.lP.lW = this.lP.total / this.lH, this.lP.lR = this.lP.aspectRatio(this.lP.lW, this.lH), this.nH = this.total / this.width, this.lP.nW = this.lP.total / this.nH, this.lP.nR = this.lP.aspectRatio(this.lP.nW, this.nH));
                this.elArr.push(a)
            };
            a.prototype.reset =
                function() { this.lW = this.nW = 0;
                    this.elArr = [];
                    this.total = 0 };
            return a
        }()
    });
    q(a, "Mixins/DrawPoint.js", [], function() {
        var a = function(a) { return "function" === typeof a },
            c = function(d) {
                var c, r = this,
                    h = r.graphic,
                    n = d.animatableAttribs,
                    p = d.onComplete,
                    m = d.css,
                    b = d.renderer,
                    f = null === (c = r.series) || void 0 === c ? void 0 : c.options.animation;
                if (r.shouldDraw()) h || (r.graphic = h = b[d.shapeType](d.shapeArgs).add(d.group)), h.css(m).attr(d.attribs).animate(n, d.isNew ? !1 : f, p);
                else if (h) {
                    var C = function() {
                        r.graphic = h = h.destroy();
                        a(p) &&
                            p()
                    };
                    Object.keys(n).length ? h.animate(n, void 0, function() { C() }) : C()
                }
            };
        return { draw: c, drawPoint: function(a) {
                (a.attribs = a.attribs || {})["class"] = this.getClassName();
                c.call(this, a) }, isFn: a }
    });
    q(a, "Series/Treemap/TreemapPoint.js", [a["Mixins/DrawPoint.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, c, d) {
        var l = this && this.__extends || function() {
                var a = function(b, h) {
                    a = Object.setPrototypeOf || { __proto__: [] }
                    instanceof Array && function(a, b) { a.__proto__ = b } || function(a, b) {
                        for (var f in b) b.hasOwnProperty(f) &&
                            (a[f] = b[f])
                    };
                    return a(b, h)
                };
                return function(b, h) {
                    function f() { this.constructor = b }
                    a(b, h);
                    b.prototype = null === h ? Object.create(h) : (f.prototype = h.prototype, new f) }
            }(),
            r = c.series.prototype.pointClass,
            h = c.seriesTypes;
        c = h.pie.prototype.pointClass;
        var n = d.extend,
            p = d.isNumber,
            m = d.pick;
        d = function(a) {
            function b() { var b = null !== a && a.apply(this, arguments) || this;
                b.name = void 0;
                b.node = void 0;
                b.options = void 0;
                b.series = void 0;
                b.value = void 0; return b }
            l(b, a);
            b.prototype.getClassName = function() {
                var a = r.prototype.getClassName.call(this),
                    b = this.series,
                    f = b.options;
                this.node.level <= b.nodeMap[b.rootNode].level ? a += " highcharts-above-level" : this.node.isLeaf || m(f.interactByLeaf, !f.allowTraversingTree) ? this.node.isLeaf || (a += " highcharts-internal-node") : a += " highcharts-internal-node-interactive";
                return a
            };
            b.prototype.isValid = function() { return !(!this.id && !p(this.value)) };
            b.prototype.setState = function(a) { r.prototype.setState.call(this, a);
                this.graphic && this.graphic.attr({ zIndex: "hover" === a ? 1 : 0 }) };
            b.prototype.shouldDraw = function() {
                return p(this.plotY) &&
                    null !== this.y
            };
            return b
        }(h.scatter.prototype.pointClass);
        n(d.prototype, { draw: a.drawPoint, setVisible: c.prototype.setVisible });
        return d
    });
    q(a, "Series/Treemap/TreemapUtilities.js", [a["Core/Utilities.js"]], function(a) { var c = a.objectEach,
            d;
        (function(a) {
            function d(a, c, p) { void 0 === p && (p = this);
                a = c.call(p, a);!1 !== a && d(a, c, p) }
            a.AXIS_MAX = 100;
            a.isBoolean = function(a) { return "boolean" === typeof a };
            a.eachObject = function(a, d, p) { p = p || this;
                c(a, function(m, b) { d.call(p, m, b, a) }) };
            a.recursive = d })(d || (d = {})); return d });
    q(a,
        "Mixins/TreeSeries.js", [a["Core/Color/Color.js"], a["Core/Utilities.js"]],
        function(a, c) {
            var d = c.extend,
                l = c.isArray,
                r = c.isNumber,
                h = c.isObject,
                n = c.merge,
                p = c.pick;
            return {
                getColor: function(m, b) {
                    var f = b.index,
                        h = b.mapOptionsToLevel,
                        d = b.parentColor,
                        c = b.parentColorIndex,
                        n = b.series,
                        r = b.colors,
                        l = b.siblings,
                        x = n.points,
                        u = n.chart.options.chart,
                        v;
                    if (m) {
                        x = x[m.i];
                        m = h[m.level] || {};
                        if (h = x && m.colorByPoint) { var q = x.index % (r ? r.length : u.colorCount); var D = r && r[q] }
                        if (!n.chart.styledMode) {
                            r = x && x.options.color;
                            u = m && m.color;
                            if (v = d) v = (v = m && m.colorVariation) && "brightness" === v.key ? a.parse(d).brighten(f / l * v.to).get() : d;
                            v = p(r, u, D, v, n.color)
                        }
                        var E = p(x && x.options.colorIndex, m && m.colorIndex, q, c, b.colorIndex)
                    }
                    return { color: v, colorIndex: E }
                },
                getLevelOptions: function(a) {
                    var b = null;
                    if (h(a)) {
                        b = {};
                        var f = r(a.from) ? a.from : 1;
                        var c = a.levels;
                        var p = {};
                        var m = h(a.defaults) ? a.defaults : {};
                        l(c) && (p = c.reduce(function(a, b) {
                            if (h(b) && r(b.level)) {
                                var c = n({}, b);
                                var p = "boolean" === typeof c.levelIsConstant ? c.levelIsConstant : m.levelIsConstant;
                                delete c.levelIsConstant;
                                delete c.level;
                                b = b.level + (p ? 0 : f - 1);
                                h(a[b]) ? d(a[b], c) : a[b] = c
                            }
                            return a
                        }, {}));
                        c = r(a.to) ? a.to : 1;
                        for (a = 0; a <= c; a++) b[a] = n({}, m, h(p[a]) ? p[a] : {})
                    }
                    return b
                },
                setTreeValues: function C(a, f) {
                    var b = f.before,
                        c = f.idRoot,
                        h = f.mapIdToNode[c],
                        n = f.points[a.i],
                        r = n && n.options || {},
                        x = 0,
                        l = [];
                    d(a, { levelDynamic: a.level - (("boolean" === typeof f.levelIsConstant ? f.levelIsConstant : 1) ? 0 : h.level), name: p(n && n.name, ""), visible: c === a.id || ("boolean" === typeof f.visible ? f.visible : !1) });
                    "function" === typeof b && (a = b(a, f));
                    a.children.forEach(function(b,
                        c) { var h = d({}, f);
                        d(h, { index: c, siblings: a.children.length, visible: a.visible });
                        b = C(b, h);
                        l.push(b);
                        b.visible && (x += b.val) });
                    a.visible = 0 < x || a.visible;
                    b = p(r.value, x);
                    d(a, { children: l, childrenTotal: x, isLeaf: a.visible && !x, val: b });
                    return a
                },
                updateRootId: function(a) { if (h(a)) { var b = h(a.options) ? a.options : {};
                        b = p(a.rootNode, b.rootId, "");
                        h(a.userOptions) && (a.userOptions.rootId = b);
                        a.rootNode = b } return b }
            }
        });
    q(a, "Series/Treemap/TreemapComposition.js", [a["Core/Series/SeriesRegistry.js"], a["Series/Treemap/TreemapUtilities.js"],
        a["Core/Utilities.js"]
    ], function(a, c, d) { var l = d.addEvent,
            r = d.extend,
            h = !1;
        l(a.series, "afterBindAxes", function() { var a = this.xAxis,
                d = this.yAxis; if (a && d)
                if (this.is("treemap")) { var m = { endOnTick: !1, gridLineWidth: 0, lineWidth: 0, min: 0, dataMin: 0, minPadding: 0, max: c.AXIS_MAX, dataMax: c.AXIS_MAX, maxPadding: 0, startOnTick: !1, title: null, tickPositions: [] };
                    r(d.options, m);
                    r(a.options, m);
                    h = !0 } else h && (d.setOptions(d.userOptions), a.setOptions(a.userOptions), h = !1) }) });
    q(a, "Series/Treemap/TreemapSeries.js", [a["Core/Color/Color.js"],
        a["Mixins/ColorMapSeries.js"], a["Core/Globals.js"], a["Mixins/LegendSymbol.js"], a["Core/Color/Palette.js"], a["Core/Series/SeriesRegistry.js"], a["Series/Treemap/TreemapAlgorithmGroup.js"], a["Series/Treemap/TreemapPoint.js"], a["Series/Treemap/TreemapUtilities.js"], a["Mixins/TreeSeries.js"], a["Core/Utilities.js"]
    ], function(a, c, d, l, r, h, n, p, m, b, f) {
        var C = this && this.__extends || function() {
                var a = function(b, e) {
                    a = Object.setPrototypeOf || { __proto__: [] }
                    instanceof Array && function(e, a) { e.__proto__ = a } || function(e,
                        a) { for (var k in a) a.hasOwnProperty(k) && (e[k] = a[k]) };
                    return a(b, e)
                };
                return function(b, e) {
                    function k() { this.constructor = b }
                    a(b, e);
                    b.prototype = null === e ? Object.create(e) : (k.prototype = e.prototype, new k) }
            }(),
            Q = a.parse,
            q = c.colorMapSeriesMixin;
        a = d.noop;
        var u = h.series;
        c = h.seriesTypes;
        var I = c.column,
            L = c.heatmap,
            x = c.scatter,
            M = b.getColor,
            v = b.getLevelOptions,
            K = b.updateRootId,
            D = f.addEvent,
            E = f.correctFloat,
            B = f.defined,
            O = f.error,
            J = f.extend,
            V = f.fireEvent,
            S = f.isArray,
            g = f.isObject,
            P = f.isString,
            A = f.merge,
            z = f.pick,
            W = f.stableSort;
        b = function(a) {
            function b() { var e = null !== a && a.apply(this, arguments) || this;
                e.axisRatio = void 0;
                e.data = void 0;
                e.mapOptionsToLevel = void 0;
                e.nodeMap = void 0;
                e.options = void 0;
                e.points = void 0;
                e.rootNode = void 0;
                e.tree = void 0; return e }
            C(b, a);
            b.prototype.algorithmCalcPoints = function(e, a, b, g) {
                var k, G, t, f, c = b.lW,
                    h = b.lH,
                    d = b.plot,
                    p = 0,
                    H = b.elArr.length - 1;
                if (a) c = b.nW, h = b.nH;
                else var m = b.elArr[b.elArr.length - 1];
                b.elArr.forEach(function(e) {
                    if (a || p < H) 0 === b.direction ? (k = d.x, G = d.y, t = c, f = e / t) : (k = d.x, G = d.y, f = h, t = e / f), g.push({
                        x: k,
                        y: G,
                        width: t,
                        height: E(f)
                    }), 0 === b.direction ? d.y += f : d.x += t;
                    p += 1
                });
                b.reset();
                0 === b.direction ? b.width -= c : b.height -= h;
                d.y = d.parent.y + (d.parent.height - b.height);
                d.x = d.parent.x + (d.parent.width - b.width);
                e && (b.direction = 1 - b.direction);
                a || b.addElement(m)
            };
            b.prototype.algorithmFill = function(e, a, b) {
                var k = [],
                    y, g = a.direction,
                    t = a.x,
                    d = a.y,
                    f = a.width,
                    c = a.height,
                    h, p, H, m;
                b.forEach(function(b) {
                    y = b.val / a.val * a.height * a.width;
                    h = t;
                    p = d;
                    0 === g ? (m = c, H = y / m, f -= H, t += H) : (H = f, m = y / H, c -= m, d += m);
                    k.push({ x: h, y: p, width: H, height: m });
                    e &&
                        (g = 1 - g)
                });
                return k
            };
            b.prototype.algorithmLowAspectRatio = function(e, a, b) { var k = [],
                    y = this,
                    g, t = { x: a.x, y: a.y, parent: a },
                    d = 0,
                    f = b.length - 1,
                    c = new n(a.height, a.width, a.direction, t);
                b.forEach(function(b) { g = b.val / a.val * a.height * a.width;
                    c.addElement(g);
                    c.lP.nR > c.lP.lR && y.algorithmCalcPoints(e, !1, c, k, t);
                    d === f && y.algorithmCalcPoints(e, !0, c, k, t);
                    d += 1 }); return k };
            b.prototype.alignDataLabel = function(a, b, g) {
                var e = g.style;
                !B(e.textOverflow) && b.text && b.getBBox().width > b.text.textWidth && b.css({
                    textOverflow: "ellipsis",
                    width: e.width += "px"
                });
                I.prototype.alignDataLabel.apply(this, arguments);
                a.dataLabel && a.dataLabel.attr({ zIndex: (a.node.zIndex || 0) + 1 })
            };
            b.prototype.buildNode = function(a, b, g, d, y) { var e = this,
                    k = [],
                    t = e.points[b],
                    c = 0,
                    f;
                (d[a] || []).forEach(function(b) { f = e.buildNode(e.points[b].id, b, g + 1, d, a);
                    c = Math.max(f.height + 1, c);
                    k.push(f) });
                b = { id: a, i: b, children: k, height: c, level: g, parent: y, visible: !1 };
                e.nodeMap[b.id] = b;
                t && (t.node = b); return b };
            b.prototype.calculateChildrenAreas = function(a, b) {
                var e = this,
                    k = e.options,
                    g = e.mapOptionsToLevel[a.level +
                        1],
                    c = z(e[g && g.layoutAlgorithm] && g.layoutAlgorithm, k.layoutAlgorithm),
                    d = k.alternateStartingDirection,
                    f = [];
                a = a.children.filter(function(a) { return !a.ignore });
                g && g.layoutStartingDirection && (b.direction = "vertical" === g.layoutStartingDirection ? 0 : 1);
                f = e[c](b, a);
                a.forEach(function(a, k) { k = f[k];
                    a.values = A(k, { val: a.childrenTotal, direction: d ? 1 - b.direction : b.direction });
                    a.pointValues = A(k, { x: k.x / e.axisRatio, y: m.AXIS_MAX - k.y - k.height, width: k.width / e.axisRatio });
                    a.children.length && e.calculateChildrenAreas(a, a.values) })
            };
            b.prototype.drawDataLabels = function() { var a = this,
                    b = a.mapOptionsToLevel,
                    g, f;
                a.points.filter(function(a) { return a.node.visible }).forEach(function(e) { f = b[e.node.level];
                    g = { style: {} };
                    e.node.isLeaf || (g.enabled = !1);
                    f && f.dataLabels && (g = A(g, f.dataLabels), a._hasPointLabels = !0);
                    e.shapeArgs && (g.style.width = e.shapeArgs.width, e.dataLabel && e.dataLabel.css({ width: e.shapeArgs.width + "px" }));
                    e.dlOptions = A(g, e.options.dataLabels) });
                u.prototype.drawDataLabels.call(this) };
            b.prototype.drawPoints = function() {
                var a = this,
                    b =
                    a.chart,
                    g = b.renderer,
                    f = b.styledMode,
                    c = a.options,
                    d = f ? {} : c.shadow,
                    h = c.borderRadius,
                    p = b.pointCount < c.animationLimit,
                    m = c.allowTraversingTree;
                a.points.forEach(function(e) {
                    var b = e.node.levelDynamic,
                        k = {},
                        y = {},
                        t = {},
                        G = "level-group-" + e.node.level,
                        T = !!e.graphic,
                        X = p && T,
                        n = e.shapeArgs;
                    e.shouldDraw() && (h && (y.r = h), A(!0, X ? k : y, T ? n : {}, f ? {} : a.pointAttribs(e, e.selected ? "select" : void 0)), a.colorAttribs && f && J(t, a.colorAttribs(e)), a[G] || (a[G] = g.g(G).attr({ zIndex: 1E3 - (b || 0) }).add(a.group), a[G].survive = !0));
                    e.draw({
                        animatableAttribs: k,
                        attribs: y,
                        css: t,
                        group: a[G],
                        renderer: g,
                        shadow: d,
                        shapeArgs: n,
                        shapeType: "rect"
                    });
                    m && e.graphic && (e.drillId = c.interactByLeaf ? a.drillToByLeaf(e) : a.drillToByGroup(e))
                })
            };
            b.prototype.drillToByGroup = function(a) { var e = !1;
                1 !== a.node.level - this.nodeMap[this.rootNode].level || a.node.isLeaf || (e = a.id); return e };
            b.prototype.drillToByLeaf = function(a) { var e = !1; if (a.node.parent !== this.rootNode && a.node.isLeaf)
                    for (a = a.node; !e;) a = this.nodeMap[a.parent], a.parent === this.rootNode && (e = a.id); return e };
            b.prototype.drillToNode =
                function(a, b) { O(32, !1, void 0, { "treemap.drillToNode": "use treemap.setRootNode" });
                    this.setRootNode(a, b) };
            b.prototype.drillUp = function() { var a = this.nodeMap[this.rootNode];
                a && P(a.parent) && this.setRootNode(a.parent, !0, { trigger: "traverseUpButton" }) };
            b.prototype.getExtremes = function() { var a = u.prototype.getExtremes.call(this, this.colorValueData),
                    b = a.dataMax;
                this.valueMin = a.dataMin;
                this.valueMax = b; return u.prototype.getExtremes.call(this) };
            b.prototype.getListOfParents = function(a, b) {
                a = S(a) ? a : [];
                var e = S(b) ?
                    b : [];
                b = a.reduce(function(a, b, e) { b = z(b.parent, ""); "undefined" === typeof a[b] && (a[b] = []);
                    a[b].push(e); return a }, { "": [] });
                m.eachObject(b, function(a, b, g) { "" !== b && -1 === e.indexOf(b) && (a.forEach(function(a) { g[""].push(a) }), delete g[b]) });
                return b
            };
            b.prototype.getTree = function() { var a = this.data.map(function(a) { return a.id });
                a = this.getListOfParents(this.data, a);
                this.nodeMap = {}; return this.buildNode("", -1, 0, a) };
            b.prototype.hasData = function() { return !!this.processedXData.length };
            b.prototype.init = function(a, b) {
                q &&
                    (this.colorAttribs = q.colorAttribs);
                var e = D(this, "setOptions", function(a) { a = a.userOptions;
                    B(a.allowDrillToNode) && !B(a.allowTraversingTree) && (a.allowTraversingTree = a.allowDrillToNode, delete a.allowDrillToNode);
                    B(a.drillUpButton) && !B(a.traverseUpButton) && (a.traverseUpButton = a.drillUpButton, delete a.drillUpButton) });
                u.prototype.init.call(this, a, b);
                delete this.opacity;
                this.eventsToUnbind.push(e);
                this.options.allowTraversingTree && this.eventsToUnbind.push(D(this, "click", this.onClickDrillToNode))
            };
            b.prototype.onClickDrillToNode =
                function(a) { var b = (a = a.point) && a.drillId;
                    P(b) && (a.setState(""), this.setRootNode(b, !0, { trigger: "click" })) };
            b.prototype.pointAttribs = function(a, b) {
                var e = g(this.mapOptionsToLevel) ? this.mapOptionsToLevel : {},
                    k = a && e[a.node.level] || {};
                e = this.options;
                var f = b && e.states[b] || {},
                    c = a && a.getClassName() || "";
                a = {
                    stroke: a && a.borderColor || k.borderColor || f.borderColor || e.borderColor,
                    "stroke-width": z(a && a.borderWidth, k.borderWidth, f.borderWidth, e.borderWidth),
                    dashstyle: a && a.borderDashStyle || k.borderDashStyle || f.borderDashStyle ||
                        e.borderDashStyle,
                    fill: a && a.color || this.color
                }; - 1 !== c.indexOf("highcharts-above-level") ? (a.fill = "none", a["stroke-width"] = 0) : -1 !== c.indexOf("highcharts-internal-node-interactive") ? (b = z(f.opacity, e.opacity), a.fill = Q(a.fill).setOpacity(b).get(), a.cursor = "pointer") : -1 !== c.indexOf("highcharts-internal-node") ? a.fill = "none" : b && (a.fill = Q(a.fill).brighten(f.brightness).get());
                return a
            };
            b.prototype.renderTraverseUpButton = function(a) {
                var b = this,
                    e = b.options.traverseUpButton,
                    g = z(e.text, b.nodeMap[a].name, "\u25c1 Back");
                if ("" === a || b.is("sunburst") && 1 === b.tree.children.length && a === b.tree.children[0].id) b.drillUpButton && (b.drillUpButton = b.drillUpButton.destroy());
                else if (this.drillUpButton) this.drillUpButton.placed = !1, this.drillUpButton.attr({ text: g }).align();
                else { var f = (a = e.theme) && a.states;
                    this.drillUpButton = this.chart.renderer.button(g, 0, 0, function() { b.drillUp() }, a, f && f.hover, f && f.select).addClass("highcharts-drillup-button").attr({ align: e.position.align, zIndex: 7 }).add().align(e.position, !1, e.relativeTo || "plotBox") }
            };
            b.prototype.setColorRecursive = function(a, b, g, f, c) { var e = this,
                    k = e && e.chart;
                k = k && k.options && k.options.colors; if (a) { var d = M(a, { colors: k, index: f, mapOptionsToLevel: e.mapOptionsToLevel, parentColor: b, parentColorIndex: g, series: e, siblings: c }); if (b = e.points[a.i]) b.color = d.color, b.colorIndex = d.colorIndex;
                    (a.children || []).forEach(function(b, g) { e.setColorRecursive(b, d.color, d.colorIndex, g, a.children.length) }) } };
            b.prototype.setPointValues = function() {
                var a = this,
                    b = a.xAxis,
                    g = a.yAxis,
                    f = a.chart.styledMode;
                a.points.forEach(function(e) {
                    var c =
                        e.node,
                        k = c.pointValues;
                    c = c.visible;
                    if (k && c) { c = k.height; var d = k.width,
                            h = k.x,
                            p = k.y,
                            m = f ? 0 : (a.pointAttribs(e)["stroke-width"] || 0) % 2 / 2;
                        k = Math.round(b.toPixels(h, !0)) - m;
                        d = Math.round(b.toPixels(h + d, !0)) - m;
                        h = Math.round(g.toPixels(p, !0)) - m;
                        c = Math.round(g.toPixels(p + c, !0)) - m;
                        e.shapeArgs = { x: Math.min(k, d), y: Math.min(h, c), width: Math.abs(d - k), height: Math.abs(c - h) };
                        e.plotX = e.shapeArgs.x + e.shapeArgs.width / 2;
                        e.plotY = e.shapeArgs.y + e.shapeArgs.height / 2 } else delete e.plotX, delete e.plotY
                })
            };
            b.prototype.setRootNode = function(a,
                b, g) { a = J({ newRootId: a, previousRootId: this.rootNode, redraw: z(b, !0), series: this }, g);
                V(this, "setRootNode", a, function(a) { var b = a.series;
                    b.idPreviousRoot = a.previousRootId;
                    b.rootNode = a.newRootId;
                    b.isDirty = !0;
                    a.redraw && b.chart.redraw() }) };
            b.prototype.setState = function(a) { this.options.inactiveOtherPoints = !0;
                u.prototype.setState.call(this, a, !1);
                this.options.inactiveOtherPoints = !1 };
            b.prototype.setTreeValues = function(a) {
                var b = this,
                    e = b.options,
                    g = b.nodeMap[b.rootNode];
                e = m.isBoolean(e.levelIsConstant) ? e.levelIsConstant :
                    !0;
                var f = 0,
                    c = [],
                    d = b.points[a.i];
                a.children.forEach(function(a) { a = b.setTreeValues(a);
                    c.push(a);
                    a.ignore || (f += a.val) });
                W(c, function(a, b) { return (a.sortIndex || 0) - (b.sortIndex || 0) });
                var h = z(d && d.options.value, f);
                d && (d.value = h);
                J(a, { children: c, childrenTotal: f, ignore: !(z(d && d.visible, !0) && 0 < h), isLeaf: a.visible && !f, levelDynamic: a.level - (e ? 0 : g.level), name: z(d && d.name, ""), sortIndex: z(d && d.sortIndex, -h), val: h });
                return a
            };
            b.prototype.sliceAndDice = function(a, b) { return this.algorithmFill(!0, a, b) };
            b.prototype.squarified =
                function(a, b) { return this.algorithmLowAspectRatio(!0, a, b) };
            b.prototype.strip = function(a, b) { return this.algorithmLowAspectRatio(!1, a, b) };
            b.prototype.stripes = function(a, b) { return this.algorithmFill(!1, a, b) };
            b.prototype.translate = function() {
                var a = this,
                    b = a.options,
                    g = K(a);
                u.prototype.translate.call(a);
                var f = a.tree = a.getTree();
                var c = a.nodeMap[g];
                a.renderTraverseUpButton(g);
                a.mapOptionsToLevel = v({ from: c.level + 1, levels: b.levels, to: f.height, defaults: { levelIsConstant: a.options.levelIsConstant, colorByPoint: b.colorByPoint } });
                "" === g || c && c.children.length || (a.setRootNode("", !1), g = a.rootNode, c = a.nodeMap[g]);
                m.recursive(a.nodeMap[a.rootNode], function(b) { var g = !1,
                        e = b.parent;
                    b.visible = !0; if (e || "" === e) g = a.nodeMap[e]; return g });
                m.recursive(a.nodeMap[a.rootNode].children, function(a) { var b = !1;
                    a.forEach(function(a) { a.visible = !0;
                        a.children.length && (b = (b || []).concat(a.children)) }); return b });
                a.setTreeValues(f);
                a.axisRatio = a.xAxis.len / a.yAxis.len;
                a.nodeMap[""].pointValues = g = { x: 0, y: 0, width: m.AXIS_MAX, height: m.AXIS_MAX };
                a.nodeMap[""].values =
                    g = A(g, { width: g.width * a.axisRatio, direction: "vertical" === b.layoutStartingDirection ? 0 : 1, val: f.val });
                a.calculateChildrenAreas(f, g);
                a.colorAxis || b.colorByPoint || a.setColorRecursive(a.tree);
                b.allowTraversingTree && (b = c.pointValues, a.xAxis.setExtremes(b.x, b.x + b.width, !1), a.yAxis.setExtremes(b.y, b.y + b.height, !1), a.xAxis.setScale(), a.yAxis.setScale());
                a.setPointValues()
            };
            b.defaultOptions = A(x.defaultOptions, {
                allowTraversingTree: !1,
                animationLimit: 250,
                showInLegend: !1,
                marker: void 0,
                colorByPoint: !1,
                dataLabels: {
                    defer: !1,
                    enabled: !0,
                    formatter: function() { var a = this && this.point ? this.point : {}; return P(a.name) ? a.name : "" },
                    inside: !0,
                    verticalAlign: "middle"
                },
                tooltip: { headerFormat: "", pointFormat: "<b>{point.name}</b>: {point.value}<br/>" },
                ignoreHiddenPoint: !0,
                layoutAlgorithm: "sliceAndDice",
                layoutStartingDirection: "vertical",
                alternateStartingDirection: !1,
                levelIsConstant: !0,
                drillUpButton: { position: { align: "right", x: -10, y: 10 } },
                traverseUpButton: { position: { align: "right", x: -10, y: 10 } },
                borderColor: r.neutralColor10,
                borderWidth: 1,
                colorKey: "colorValue",
                opacity: .15,
                states: { hover: { borderColor: r.neutralColor40, brightness: L ? 0 : .1, halo: !1, opacity: .75, shadow: !1 } }
            });
            return b
        }(x);
        J(b.prototype, { buildKDTree: a, colorKey: "colorValue", directTouch: !0, drawLegendSymbol: l.drawRectangle, getExtremesFromAll: !0, getSymbol: a, optionalAxis: "colorAxis", parallelArrays: ["x", "y", "value", "colorValue"], pointArrayMap: ["value"], pointClass: p, trackerGroups: ["group", "dataLabelsGroup"], utils: { recursive: m.recursive } });
        h.registerSeriesType("treemap", b);
        "";
        return b
    });
    q(a, "Series/Sunburst/SunburstPoint.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, c) {
        var d = this && this.__extends || function() { var a = function(c, d) { a = Object.setPrototypeOf || { __proto__: [] }
                    instanceof Array && function(a, b) { a.__proto__ = b } || function(a, b) { for (var f in b) b.hasOwnProperty(f) && (a[f] = b[f]) }; return a(c, d) }; return function(c, d) {
                    function h() { this.constructor = c }
                    a(c, d);
                    c.prototype = null === d ? Object.create(d) : (h.prototype = d.prototype, new h) } }(),
            l = a.series.prototype.pointClass,
            r = c.correctFloat;
        c = c.extend;
        a = function(a) {
            function c() {
                var c =
                    null !== a && a.apply(this, arguments) || this;
                c.node = void 0;
                c.options = void 0;
                c.series = void 0;
                c.shapeExisting = void 0;
                return c
            }
            d(c, a);
            c.prototype.getDataLabelPath = function(a) {
                var c = this.series.chart.renderer,
                    b = this.shapeExisting,
                    f = b.start,
                    d = b.end,
                    h = f + (d - f) / 2;
                h = 0 > h && h > -Math.PI || h > Math.PI;
                var p = b.r + (a.options.distance || 0);
                f === -Math.PI / 2 && r(d) === r(1.5 * Math.PI) && (f = -Math.PI + Math.PI / 360, d = -Math.PI / 360, h = !0);
                if (d - f > Math.PI) { h = !1; var n = !0 }
                this.dataLabelPath && (this.dataLabelPath = this.dataLabelPath.destroy());
                this.dataLabelPath =
                    c.arc({ open: !0, longArc: n ? 1 : 0 }).add(a);
                this.dataLabelPath.attr({ start: h ? f : d, end: h ? d : f, clockwise: +h, x: b.x, y: b.y, r: (p + b.innerR) / 2 });
                return this.dataLabelPath
            };
            c.prototype.isValid = function() { return !0 };
            c.prototype.shouldDraw = function() { return !this.isNull };
            return c
        }(a.seriesTypes.treemap.prototype.pointClass);
        c(a.prototype, { getClassName: l.prototype.getClassName, haloPath: l.prototype.haloPath, setState: l.prototype.setState });
        return a
    });
    q(a, "Series/Sunburst/SunburstUtilities.js", [a["Core/Series/SeriesRegistry.js"],
        a["Core/Utilities.js"]
    ], function(a, c) {
        var d = a.seriesTypes.treemap,
            l = c.isNumber,
            r = c.isObject,
            h = c.merge,
            n;
        (function(a) {
            function c(a, c) { var b = []; if (l(a) && l(c) && a <= c)
                    for (; a <= c; a++) b.push(a); return b }
            a.recursive = d.prototype.utils.recursive;
            a.calculateLevelSizes = function(a, d) {
                d = r(d) ? d : {};
                var b = 0,
                    f;
                if (r(a)) {
                    var m = h({}, a);
                    a = l(d.from) ? d.from : 0;
                    var p = l(d.to) ? d.to : 0;
                    var n = c(a, p);
                    a = Object.keys(m).filter(function(a) { return -1 === n.indexOf(+a) });
                    var q = f = l(d.diffRadius) ? d.diffRadius : 0;
                    n.forEach(function(a) {
                        a = m[a];
                        var c = a.levelSize.unit,
                            d = a.levelSize.value;
                        "weight" === c ? b += d : "percentage" === c ? (a.levelSize = { unit: "pixels", value: d / 100 * q }, f -= a.levelSize.value) : "pixels" === c && (f -= d)
                    });
                    n.forEach(function(a) { var c = m[a]; "weight" === c.levelSize.unit && (c = c.levelSize.value, m[a].levelSize = { unit: "pixels", value: c / b * f }) });
                    a.forEach(function(a) { m[a].levelSize = { value: 0, unit: "pixels" } })
                }
                return m
            };
            a.getLevelFromAndTo = function(a) { var b = a.level; return { from: 0 < b ? b : 1, to: b + a.height } };
            a.range = c
        })(n || (n = {}));
        return n
    });
    q(a, "Series/Sunburst/SunburstSeries.js", [a["Mixins/CenteredSeries.js"], a["Core/Globals.js"], a["Core/Series/SeriesRegistry.js"], a["Series/Sunburst/SunburstPoint.js"], a["Series/Sunburst/SunburstUtilities.js"], a["Mixins/TreeSeries.js"], a["Core/Utilities.js"]], function(a, c, d, l, r, h, n) {
        function p(a, b) {
            var c = b.mapIdToNode[a.parent],
                d = b.series,
                f = d.chart,
                h = d.points[a.i];
            c = U(a, {
                colors: d.options.colors || f && f.options.colors,
                colorIndex: d.colorIndex,
                index: b.index,
                mapOptionsToLevel: b.mapOptionsToLevel,
                parentColor: c && c.color,
                parentColorIndex: c && c.colorIndex,
                series: b.series,
                siblings: b.siblings
            });
            a.color = c.color;
            a.colorIndex = c.colorIndex;
            h && (h.color = a.color, h.colorIndex = a.colorIndex, a.sliced = a.id !== b.idRoot ? h.sliced : !1);
            return a
        }
        var m = this && this.__extends || function() {
                var a = function(b, c) { a = Object.setPrototypeOf || { __proto__: [] }
                    instanceof Array && function(a, b) { a.__proto__ = b } || function(a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) }; return a(b, c) };
                return function(b, c) {
                    function d() { this.constructor = b }
                    a(b, c);
                    b.prototype = null === c ? Object.create(c) : (d.prototype =
                        c.prototype, new d)
                }
            }(),
            b = a.getCenter,
            f = a.getStartAndEndRadians;
        a = c.noop;
        var q = d.series,
            u = d.seriesTypes;
        c = u.column;
        var R = u.treemap,
            U = h.getColor,
            I = h.getLevelOptions,
            L = h.setTreeValues,
            x = h.updateRootId,
            M = n.error,
            v = n.extend,
            K = n.isNumber,
            D = n.isObject,
            E = n.isString,
            B = n.merge,
            O = n.splat,
            J = 180 / Math.PI;
        h = function(a) {
            function c() {
                var b = null !== a && a.apply(this, arguments) || this;
                b.center = void 0;
                b.data = void 0;
                b.mapOptionsToLevel = void 0;
                b.nodeMap = void 0;
                b.options = void 0;
                b.points = void 0;
                b.shapeRoot = void 0;
                b.startAndEndRadians =
                    void 0;
                b.tree = void 0;
                return b
            }
            m(c, a);
            c.prototype.alignDataLabel = function(b, c, d) { if (!d.textPath || !d.textPath.enabled) return a.prototype.alignDataLabel.apply(this, arguments) };
            c.prototype.animate = function(a) { var b = this.chart,
                    c = [b.plotWidth / 2, b.plotHeight / 2],
                    d = b.plotLeft,
                    g = b.plotTop;
                b = this.group;
                a ? (a = { translateX: c[0] + d, translateY: c[1] + g, scaleX: .001, scaleY: .001, rotation: 10, opacity: .01 }, b.attr(a)) : (a = { translateX: d, translateY: g, scaleX: 1, scaleY: 1, rotation: 0, opacity: 1 }, b.animate(a, this.options.animation)) };
            c.prototype.drawPoints = function() {
                var a = this,
                    b = a.mapOptionsToLevel,
                    c = a.shapeRoot,
                    d = a.group,
                    f = a.hasRendered,
                    h = a.rootNode,
                    m = a.idPreviousRoot,
                    e = a.nodeMap,
                    k = e[m],
                    p = k && k.shapeArgs;
                k = a.points;
                var n = a.startAndEndRadians,
                    r = a.chart,
                    l = r && r.options && r.options.chart || {},
                    x = "boolean" === typeof l.animation ? l.animation : !0,
                    u = a.center[3] / 2,
                    Y = a.chart.renderer,
                    C = !1,
                    E = !1;
                if (l = !!(x && f && h !== m && a.dataLabelsGroup)) {
                    a.dataLabelsGroup.attr({ opacity: 0 });
                    var I = function() {
                        C = !0;
                        a.dataLabelsGroup && a.dataLabelsGroup.animate({
                            opacity: 1,
                            visibility: "visible"
                        })
                    }
                }
                k.forEach(function(g) {
                    var k = g.node,
                        l = b[k.level];
                    var t = g.shapeExisting || {};
                    var q = k.shapeArgs || {},
                        N = !(!k.visible || !k.shapeArgs);
                    if (f && x) {
                        var A = {};
                        var z = { end: q.end, start: q.start, innerR: q.innerR, r: q.r, x: q.x, y: q.y };
                        N ? !g.graphic && p && (A = h === g.id ? { start: n.start, end: n.end } : p.end <= q.start ? { start: n.end, end: n.end } : { start: n.start, end: n.start }, A.innerR = A.r = u) : g.graphic && (m === g.id ? z = { innerR: u, r: u } : c && (z = c.end <= t.start ? { innerR: u, r: u, start: n.end, end: n.end } : { innerR: u, r: u, start: n.start, end: n.start }));
                        t = A
                    } else z = q, t = {};
                    A = [q.plotX, q.plotY];
                    if (!g.node.isLeaf)
                        if (h === g.id) { var w = e[h];
                            w = w.parent } else w = g.id;
                    v(g, { shapeExisting: q, tooltipPos: A, drillId: w, name: "" + (g.name || g.id || g.index), plotX: q.plotX, plotY: q.plotY, value: k.val, isNull: !N });
                    w = g.options;
                    k = D(q) ? q : {};
                    w = D(w) ? w.dataLabels : {};
                    l = O(D(l) ? l.dataLabels : {})[0];
                    l = B({ style: {} }, l, w);
                    w = l.rotationMode;
                    if (!K(l.rotation)) {
                        if ("auto" === w || "circular" === w)
                            if (1 > g.innerArcLength && g.outerArcLength > k.radius) { var F = 0;
                                g.dataLabelPath && "circular" === w && (l.textPath = { enabled: !0 }) } else 1 <
                                g.innerArcLength && g.outerArcLength > 1.5 * k.radius ? "circular" === w ? l.textPath = { enabled: !0, attributes: { dy: 5 } } : w = "parallel" : (g.dataLabel && g.dataLabel.textPathWrapper && "circular" === w && (l.textPath = { enabled: !1 }), w = "perpendicular");
                            "auto" !== w && "circular" !== w && (F = k.end - (k.end - k.start) / 2);
                        l.style.width = "parallel" === w ? Math.min(2.5 * k.radius, (g.outerArcLength + g.innerArcLength) / 2) : k.radius;
                        "perpendicular" === w && g.series.chart.renderer.fontMetrics(l.style.fontSize).h > g.outerArcLength && (l.style.width = 1);
                        l.style.width =
                            Math.max(l.style.width - 2 * (l.padding || 0), 1);
                        F = F * J % 180;
                        "parallel" === w && (F -= 90);
                        90 < F ? F -= 180 : -90 > F && (F += 180);
                        l.rotation = F
                    }
                    l.textPath && (0 === g.shapeExisting.innerR && l.textPath.enabled ? (l.rotation = 0, l.textPath.enabled = !1, l.style.width = Math.max(2 * g.shapeExisting.r - 2 * (l.padding || 0), 1)) : g.dlOptions && g.dlOptions.textPath && !g.dlOptions.textPath.enabled && "circular" === w && (l.textPath.enabled = !0), l.textPath.enabled && (l.rotation = 0, l.style.width = Math.max((g.outerArcLength + g.innerArcLength) / 2 - 2 * (l.padding || 0), 1)));
                    0 === l.rotation && (l.rotation = .001);
                    g.dlOptions = l;
                    if (!E && N) { E = !0; var y = I }
                    g.draw({ animatableAttribs: z, attribs: v(t, !r.styledMode && a.pointAttribs(g, g.selected && "select")), onComplete: y, group: d, renderer: Y, shapeType: "arc", shapeArgs: q })
                });
                l && E ? (a.hasRendered = !1, a.options.dataLabels.defer = !0, q.prototype.drawDataLabels.call(a), a.hasRendered = !0, C && I()) : q.prototype.drawDataLabels.call(a)
            };
            c.prototype.layoutAlgorithm = function(a, b, c) {
                var d = a.start,
                    g = a.end - d,
                    f = a.val,
                    h = a.x,
                    e = a.y,
                    k = c && D(c.levelSize) && K(c.levelSize.value) ?
                    c.levelSize.value : 0,
                    l = a.r,
                    m = l + k,
                    n = c && K(c.slicedOffset) ? c.slicedOffset : 0;
                return (b || []).reduce(function(a, b) { var c = 1 / f * b.val * g,
                        p = d + c / 2,
                        q = h + Math.cos(p) * n;
                    p = e + Math.sin(p) * n;
                    b = { x: b.sliced ? q : h, y: b.sliced ? p : e, innerR: l, r: m, radius: k, start: d, end: d + c };
                    a.push(b);
                    d = b.end; return a }, [])
            };
            c.prototype.setShapeArgs = function(a, b, c) {
                var d = [],
                    g = c[a.level + 1];
                a = a.children.filter(function(a) { return a.visible });
                d = this.layoutAlgorithm(b, a, g);
                a.forEach(function(a, b) {
                    b = d[b];
                    var e = b.start + (b.end - b.start) / 2,
                        g = b.innerR + (b.r - b.innerR) /
                        2,
                        f = b.end - b.start;
                    g = 0 === b.innerR && 6.28 < f ? { x: b.x, y: b.y } : { x: b.x + Math.cos(e) * g, y: b.y + Math.sin(e) * g };
                    var h = a.val ? a.childrenTotal > a.val ? a.childrenTotal : a.val : a.childrenTotal;
                    this.points[a.i] && (this.points[a.i].innerArcLength = f * b.innerR, this.points[a.i].outerArcLength = f * b.r);
                    a.shapeArgs = B(b, { plotX: g.x, plotY: g.y + 4 * Math.abs(Math.cos(e)) });
                    a.values = B(b, { val: h });
                    a.children.length && this.setShapeArgs(a, a.values, c)
                }, this)
            };
            c.prototype.translate = function() {
                var a = this,
                    c = a.options,
                    d = a.center = b.call(a),
                    h = a.startAndEndRadians =
                    f(c.startAngle, c.endAngle),
                    l = d[3] / 2,
                    m = d[2] / 2 - l,
                    n = x(a),
                    e = a.nodeMap,
                    k = e && e[n],
                    t = {};
                a.shapeRoot = k && k.shapeArgs;
                q.prototype.translate.call(a);
                var u = a.tree = a.getTree();
                a.renderTraverseUpButton(n);
                e = a.nodeMap;
                k = e[n];
                var y = E(k.parent) ? k.parent : "";
                y = e[y];
                var v = r.getLevelFromAndTo(k);
                var B = v.from,
                    C = v.to;
                v = I({ from: B, levels: a.options.levels, to: C, defaults: { colorByPoint: c.colorByPoint, dataLabels: c.dataLabels, levelIsConstant: c.levelIsConstant, levelSize: c.levelSize, slicedOffset: c.slicedOffset } });
                v = r.calculateLevelSizes(v, { diffRadius: m, from: B, to: C });
                L(u, { before: p, idRoot: n, levelIsConstant: c.levelIsConstant, mapOptionsToLevel: v, mapIdToNode: e, points: a.points, series: a });
                c = e[""].shapeArgs = { end: h.end, r: l, start: h.start, val: k.val, x: d[0], y: d[1] };
                this.setShapeArgs(y, c, v);
                a.mapOptionsToLevel = v;
                a.data.forEach(function(b) { t[b.id] && M(31, !1, a.chart);
                    t[b.id] = !0 });
                t = {}
            };
            c.defaultOptions = B(R.defaultOptions, {
                center: ["50%", "50%"],
                colorByPoint: !1,
                opacity: 1,
                dataLabels: { allowOverlap: !0, defer: !0, rotationMode: "auto", style: { textOverflow: "ellipsis" } },
                rootId: void 0,
                levelIsConstant: !0,
                levelSize: { value: 1, unit: "weight" },
                slicedOffset: 10
            });
            return c
        }(R);
        v(h.prototype, { drawDataLabels: a, pointAttribs: c.prototype.pointAttribs, pointClass: l, utils: r });
        d.registerSeriesType("sunburst", h);
        "";
        return h
    });
    q(a, "masters/modules/sunburst.src.js", [], function() {})
});
//# sourceMappingURL=sunburst.js.map