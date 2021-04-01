/*
 Highcharts JS v9.0.1 (2021-02-15)

 Old IE (v6, v7, v8) module for Highcharts v6+.

 (c) 2010-2021 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/oldie",["static/js/highcharts"],function(C){a(C);a.Highcharts=C;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function C(a, D, p, x){a.hasOwnProperty(D)||(a[D]=x.apply(null,p))}a=a?a._modules:{};C(a,"Extensions/Math3D.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a, D){function p(a, h, f){h=0<f&&f<Number.POSITIVE_INFINITY?
f/(a.z+h.z+f):1;return{x:a.x*h,y:a.y*h}}function m(a,h,f,g){var B=h.options.chart.options3d,m=d(g,f?h.inverted:!1),r={x:h.plotWidth/2,y:h.plotHeight/2,z:B.depth/2,vd:d(B.depth,1)*d(B.viewDistance,0)},n=h.scale3d||1;g=I*B.beta*(m?-1:1);B=I*B.alpha*(m?-1:1);var Q=Math.cos(B),t=Math.cos(-g),R=Math.sin(B),x=Math.sin(-g);f||(r.x+=h.plotLeft,r.y+=h.plotTop);return a.map(function(f){var h=(m?f.y:f.x)-r.x;var z=(m?f.x:f.y)-r.y;f=(f.z||0)-r.z;h={x:t*h-x*f,y:-R*x*h+Q*z-t*R*f,z:Q*x*h+R*z+Q*t*f};z=p(h,r,r.vd);
z.x=z.x*n+r.x;z.y=z.y*n+r.y;z.z=h.z*n+r.z;return{x:m?z.y:z.x,y:m?z.x:z.y,z:z.z}})}function g(a,h){var f=h.options.chart.options3d,g=h.plotWidth/2;h=h.plotHeight/2;f=d(f.depth,1)*d(f.viewDistance,0)+f.depth;return Math.sqrt(Math.pow(g-d(a.plotX,a.x),2)+Math.pow(h-d(a.plotY,a.y),2)+Math.pow(f-d(a.plotZ,a.z),2))}function t(a){var h=0,f;for(f=0;f<a.length;f++){var g=(f+1)%a.length;h+=a[f].x*a[g].y-a[g].x*a[f].y}return h/2}function n(a,h,f){return t(m(a,h,f))}var d=D.pick,I=a.deg2rad;a.perspective3D=p;
a.perspective=m;a.pointCameraDistance=g;a.shapeArea=t;a.shapeArea3d=n;return{perspective:m,perspective3D:p,pointCameraDistance:g,shapeArea:t,shapeArea3D:n}});C(a,"Core/Renderer/SVG/SVGElement3D.js",[a["Core/Color/Color.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Utilities.js"]],function(a,D,p){var m=a.parse,g=p.defined,t=p.merge,n=p.objectEach,d=p.pick,I;(function(a){a.base={initArgs:function(a){var f=this,h=f.renderer,g=h[f.pathType+"Path"](a),d=g.zIndexes;f.parts.forEach(function(a){f[a]=
h.path(g[a]).attr({"class":"highcharts-3d-"+a,zIndex:d[a]||0}).add(f)});f.attr({"stroke-linejoin":"round",zIndex:d.group});f.originalDestroy=f.destroy;f.destroy=f.destroyParts;f.forcedSides=g.forcedSides},singleSetterForParts:function(a,f,g,d,m,I){var h={};d=[null,null,d||"attr",m,I];var p=g&&g.zIndexes;g?(p&&p.group&&this.attr({zIndex:p.group}),n(g,function(f,d){h[d]={};h[d][a]=f;p&&(h[d].zIndex=g.zIndexes[d]||0)}),d[1]=h):(h[a]=f,d[0]=h);return this.processParts.apply(this,d)},processParts:function(a,
f,g,m,p){var h=this;h.parts.forEach(function(I){f&&(a=d(f[I],!1));if(!1!==a)h[I][g](a,m,p)});return h},destroyParts:function(){this.processParts(null,null,"destroy");return this.originalDestroy()}};a.cuboid=t(a.base,{parts:["front","top","side"],pathType:"cuboid",attr:function(a,f,d,m){if("string"===typeof a&&"undefined"!==typeof f){var h=a;a={};a[h]=f}return a.shapeArgs||g(a.x)?this.singleSetterForParts("d",null,this.renderer[this.pathType+"Path"](a.shapeArgs||a)):D.prototype.attr.call(this,a,void 0,
d,m)},animate:function(h,f,d){if(g(h.x)&&g(h.y)){h=this.renderer[this.pathType+"Path"](h);var m=h.forcedSides;this.singleSetterForParts("d",null,h,"animate",f,d);this.attr({zIndex:h.zIndexes.group});m!==this.forcedSides&&(this.forcedSides=m,a.cuboid.fillSetter.call(this,this.fill))}else D.prototype.animate.call(this,h,f,d);return this},fillSetter:function(a){this.forcedSides=this.forcedSides||[];this.singleSetterForParts("fill",null,{front:a,top:m(a).brighten(0<=this.forcedSides.indexOf("top")?0:
.1).get(),side:m(a).brighten(0<=this.forcedSides.indexOf("side")?0:-.1).get()});this.color=this.fill=a;return this}})})(I||(I={}));return I});C(a,"Core/Renderer/SVG/SVGRenderer3D.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/Color/Color.js"],a["Core/Globals.js"],a["Extensions/Math3D.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Renderer/SVG/SVGElement3D.js"],a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Utilities.js"]],function(a,D,p,x,g,t,n,d){function m(a,f,b,u,v,q,c,e){var k=[],l=
q-v;return q>v&&q-v>Math.PI/2+.0001?(k=k.concat(m(a,f,b,u,v,v+Math.PI/2,c,e)),k=k.concat(m(a,f,b,u,v+Math.PI/2,q,c,e))):q<v&&v-q>Math.PI/2+.0001?(k=k.concat(m(a,f,b,u,v,v-Math.PI/2,c,e)),k=k.concat(m(a,f,b,u,v-Math.PI/2,q,c,e))):[["C",a+b*Math.cos(v)-b*P*l*Math.sin(v)+c,f+u*Math.sin(v)+u*P*l*Math.cos(v)+e,a+b*Math.cos(q)+b*P*l*Math.sin(q)+c,f+u*Math.sin(q)-u*P*l*Math.cos(q)+e,a+b*Math.cos(q)+c,f+u*Math.sin(q)+e]]}var C=a.animObject,h=D.parse,f=p.charts,Q=p.deg2rad,B=x.perspective,H=x.shapeArea,r=
d.defined,M=d.extend,J=d.merge,F=d.pick,K=Math.cos,O=Math.sin,G=Math.PI,P=4*(Math.sqrt(2)-1)/3/(G/2);n.prototype.elements3d=t;n.prototype.toLinePath=function(a,f){var b=[];a.forEach(function(a){b.push(["L",a.x,a.y])});a.length&&(b[0][0]="M",f&&b.push(["Z"]));return b};n.prototype.toLineSegments=function(a){var f=[],b=!0;a.forEach(function(a){f.push(b?["M",a.x,a.y]:["L",a.x,a.y]);b=!b});return f};n.prototype.face3d=function(a){var h=this,b=this.createElement("path");b.vertexes=[];b.insidePlotArea=
!1;b.enabled=!0;b.attr=function(a){if("object"===typeof a&&(r(a.enabled)||r(a.vertexes)||r(a.insidePlotArea))){this.enabled=F(a.enabled,this.enabled);this.vertexes=F(a.vertexes,this.vertexes);this.insidePlotArea=F(a.insidePlotArea,this.insidePlotArea);delete a.enabled;delete a.vertexes;delete a.insidePlotArea;var b=B(this.vertexes,f[h.chartIndex],this.insidePlotArea),q=h.toLinePath(b,!0);b=H(b);b=this.enabled&&0<b?"visible":"hidden";a.d=q;a.visibility=b}return g.prototype.attr.apply(this,arguments)};
b.animate=function(a){if("object"===typeof a&&(r(a.enabled)||r(a.vertexes)||r(a.insidePlotArea))){this.enabled=F(a.enabled,this.enabled);this.vertexes=F(a.vertexes,this.vertexes);this.insidePlotArea=F(a.insidePlotArea,this.insidePlotArea);delete a.enabled;delete a.vertexes;delete a.insidePlotArea;var b=B(this.vertexes,f[h.chartIndex],this.insidePlotArea),q=h.toLinePath(b,!0);b=H(b);b=this.enabled&&0<b?"visible":"hidden";a.d=q;this.attr("visibility",b)}return g.prototype.animate.apply(this,arguments)};
return b.attr(a)};n.prototype.polyhedron=function(a){var f=this,b=this.g(),u=b.destroy;this.styledMode||b.attr({"stroke-linejoin":"round"});b.faces=[];b.destroy=function(){for(var a=0;a<b.faces.length;a++)b.faces[a].destroy();return u.call(this)};b.attr=function(a,q,c,e){if("object"===typeof a&&r(a.faces)){for(;b.faces.length>a.faces.length;)b.faces.pop().destroy();for(;b.faces.length<a.faces.length;)b.faces.push(f.face3d().add(b));for(var k=0;k<a.faces.length;k++)f.styledMode&&delete a.faces[k].fill,
b.faces[k].attr(a.faces[k],null,c,e);delete a.faces}return g.prototype.attr.apply(this,arguments)};b.animate=function(a,q,c){if(a&&a.faces){for(;b.faces.length>a.faces.length;)b.faces.pop().destroy();for(;b.faces.length<a.faces.length;)b.faces.push(f.face3d().add(b));for(var e=0;e<a.faces.length;e++)b.faces[e].animate(a.faces[e],q,c);delete a.faces}return g.prototype.animate.apply(this,arguments)};return b.attr(a)};n.prototype.element3d=function(a,f){var b=this.g();M(b,this.elements3d[a]);b.initArgs(f);
return b};n.prototype.cuboid=function(a){return this.element3d("cuboid",a)};n.prototype.cuboidPath=function(a){function h(e){return 0===c&&1<e&&6>e?{x:g[e].x,y:g[e].y+10,z:g[e].z}:g[0].x===g[7].x&&4<=e?{x:g[e].x+10,y:g[e].y,z:g[e].z}:0===k&&2>e||5<e?{x:g[e].x,y:g[e].y,z:g[e].z+10}:g[e]}function b(c){return g[c]}var u=a.x,d=a.y,q=a.z||0,c=a.height,e=a.width,k=a.depth,l=f[this.chartIndex],y=l.options.chart.options3d.alpha,m=0,g=[{x:u,y:d,z:q},{x:u+e,y:d,z:q},{x:u+e,y:d+c,z:q},{x:u,y:d+c,z:q},{x:u,y:d+
c,z:q+k},{x:u+e,y:d+c,z:q+k},{x:u+e,y:d,z:q+k},{x:u,y:d,z:q+k}],L=[];g=B(g,l,a.insidePlotArea);var w=function(c,e,a){var k=[[],-1],l=c.map(b),q=e.map(b);c=c.map(h);e=e.map(h);0>H(l)?k=[l,0]:0>H(q)?k=[q,1]:a&&(L.push(a),k=0>H(c)?[l,0]:0>H(e)?[q,1]:[l,0]);return k};var A=w([3,2,1,0],[7,6,5,4],"front");a=A[0];var z=A[1];A=w([1,6,7,0],[4,5,2,3],"top");e=A[0];var E=A[1];A=w([1,2,5,6],[0,7,4,3],"side");w=A[0];A=A[1];1===A?m+=1E6*(l.plotWidth-u):A||(m+=1E6*u);m+=10*(!E||0<=y&&180>=y||360>y&&357.5<y?l.plotHeight-
d:10+d);1===z?m+=100*q:z||(m+=100*(1E3-q));return{front:this.toLinePath(a,!0),top:this.toLinePath(e,!0),side:this.toLinePath(w,!0),zIndexes:{group:Math.round(m)},forcedSides:L,isFront:z,isTop:E}};n.prototype.arc3d=function(a){function f(a){var c=!1,e={},k;a=J(a);for(k in a)-1!==m.indexOf(k)&&(e[k]=a[k],delete a[k],c=!0);return c?[e,a]:!1}var b=this.g(),d=b.renderer,m="x y r innerR start end depth".split(" ");a=J(a);a.alpha=(a.alpha||0)*Q;a.beta=(a.beta||0)*Q;b.top=d.path();b.side1=d.path();b.side2=
d.path();b.inn=d.path();b.out=d.path();b.onAdd=function(){var a=b.parentGroup,c=b.attr("class");b.top.add(b);["out","inn","side1","side2"].forEach(function(e){b[e].attr({"class":c+" highcharts-3d-side"}).add(a)})};["addClass","removeClass"].forEach(function(a){b[a]=function(){var c=arguments;["top","out","inn","side1","side2"].forEach(function(e){b[e][a].apply(b[e],c)})}});b.setPaths=function(a){var c=b.renderer.arc3dPath(a),e=100*c.zTop;b.attribs=a;b.top.attr({d:c.top,zIndex:c.zTop});b.inn.attr({d:c.inn,
zIndex:c.zInn});b.out.attr({d:c.out,zIndex:c.zOut});b.side1.attr({d:c.side1,zIndex:c.zSide1});b.side2.attr({d:c.side2,zIndex:c.zSide2});b.zIndex=e;b.attr({zIndex:e});a.center&&(b.top.setRadialReference(a.center),delete a.center)};b.setPaths(a);b.fillSetter=function(a){var c=h(a).brighten(-.1).get();this.fill=a;this.side1.attr({fill:c});this.side2.attr({fill:c});this.inn.attr({fill:c});this.out.attr({fill:c});this.top.attr({fill:a});return this};["opacity","translateX","translateY","visibility"].forEach(function(a){b[a+
"Setter"]=function(c,e){b[e]=c;["out","inn","side1","side2","top"].forEach(function(a){b[a].attr(e,c)})}});b.attr=function(a){var c;if("object"===typeof a&&(c=f(a))){var e=c[0];arguments[0]=c[1];M(b.attribs,e);b.setPaths(b.attribs)}return g.prototype.attr.apply(b,arguments)};b.animate=function(a,c,e){var k=this.attribs,l="data-"+Math.random().toString(26).substring(2,9);delete a.center;delete a.z;delete a.alpha;delete a.beta;var d=C(F(c,this.renderer.globalAnimation));if(d.duration){c=f(a);b[l]=0;
a[l]=1;b[l+"Setter"]=p.noop;if(c){var h=c[0];d.step=function(c,e){function a(c){return k[c]+(F(h[c],k[c])-k[c])*e.pos}e.prop===l&&e.elem.setPaths(J(k,{x:a("x"),y:a("y"),r:a("r"),innerR:a("innerR"),start:a("start"),end:a("end"),depth:a("depth")}))}}c=d}return g.prototype.animate.call(this,a,c,e)};b.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();return g.prototype.destroy.call(this)};b.hide=function(){this.top.hide();this.out.hide();
this.inn.hide();this.side1.hide();this.side2.hide()};b.show=function(a){this.top.show(a);this.out.show(a);this.inn.show(a);this.side1.show(a);this.side2.show(a)};return b};n.prototype.arc3dPath=function(a){function f(c){c%=2*Math.PI;c>Math.PI&&(c=2*Math.PI-c);return c}var b=a.x,d=a.y,g=a.start,h=a.end-.00001,c=a.r,e=a.innerR||0,k=a.depth||0,l=a.alpha,y=a.beta,N=Math.cos(g),p=Math.sin(g);a=Math.cos(h);var L=Math.sin(h),w=c*Math.cos(y);c*=Math.cos(l);var A=e*Math.cos(y),n=e*Math.cos(l);e=k*Math.sin(y);
var E=k*Math.sin(l);k=[["M",b+w*N,d+c*p]];k=k.concat(m(b,d,w,c,g,h,0,0));k.push(["L",b+A*a,d+n*L]);k=k.concat(m(b,d,A,n,h,g,0,0));k.push(["Z"]);var t=0<y?Math.PI/2:0;y=0<l?0:Math.PI/2;t=g>-t?g:h>-t?-t:g;var r=h<G-y?h:g<G-y?G-y:h,x=2*G-y;l=[["M",b+w*K(t),d+c*O(t)]];l=l.concat(m(b,d,w,c,t,r,0,0));h>x&&g<x?(l.push(["L",b+w*K(r)+e,d+c*O(r)+E]),l=l.concat(m(b,d,w,c,r,x,e,E)),l.push(["L",b+w*K(x),d+c*O(x)]),l=l.concat(m(b,d,w,c,x,h,0,0)),l.push(["L",b+w*K(h)+e,d+c*O(h)+E]),l=l.concat(m(b,d,w,c,h,x,e,E)),
l.push(["L",b+w*K(x),d+c*O(x)]),l=l.concat(m(b,d,w,c,x,r,0,0))):h>G-y&&g<G-y&&(l.push(["L",b+w*Math.cos(r)+e,d+c*Math.sin(r)+E]),l=l.concat(m(b,d,w,c,r,h,e,E)),l.push(["L",b+w*Math.cos(h),d+c*Math.sin(h)]),l=l.concat(m(b,d,w,c,h,r,0,0)));l.push(["L",b+w*Math.cos(r)+e,d+c*Math.sin(r)+E]);l=l.concat(m(b,d,w,c,r,t,e,E));l.push(["Z"]);y=[["M",b+A*N,d+n*p]];y=y.concat(m(b,d,A,n,g,h,0,0));y.push(["L",b+A*Math.cos(h)+e,d+n*Math.sin(h)+E]);y=y.concat(m(b,d,A,n,h,g,e,E));y.push(["Z"]);N=[["M",b+w*N,d+c*p],
["L",b+w*N+e,d+c*p+E],["L",b+A*N+e,d+n*p+E],["L",b+A*N,d+n*p],["Z"]];b=[["M",b+w*a,d+c*L],["L",b+w*a+e,d+c*L+E],["L",b+A*a+e,d+n*L+E],["L",b+A*a,d+n*L],["Z"]];L=Math.atan2(E,-e);d=Math.abs(h+L);a=Math.abs(g+L);g=Math.abs((g+h)/2+L);d=f(d);a=f(a);g=f(g);g*=1E5;h=1E5*a;d*=1E5;return{top:k,zTop:1E5*Math.PI+1,out:l,zOut:Math.max(g,h,d),inn:y,zInn:Math.max(g,h,d),side1:N,zSide1:.99*d,side2:b,zSide2:.99*h}};return n});C(a,"Extensions/Oldie/VMLAxis3D.js",[a["Core/Utilities.js"]],function(a){var m=a.addEvent,
p=function(){return function(a){this.axis=a}}();return function(){function a(){}a.compose=function(g){g.keepProps.push("vml");m(g,"init",a.onInit);m(g,"render",a.onRender)};a.onInit=function(){this.vml||(this.vml=new p(this))};a.onRender=function(){var a=this.vml;a.sideFrame&&(a.sideFrame.css({zIndex:0}),a.sideFrame.front.attr({fill:a.sideFrame.color}));a.bottomFrame&&(a.bottomFrame.css({zIndex:1}),a.bottomFrame.front.attr({fill:a.bottomFrame.color}));a.backFrame&&(a.backFrame.css({zIndex:0}),a.backFrame.front.attr({fill:a.backFrame.color}))};
return a}()});C(a,"Extensions/Oldie/VMLRenderer3D.js",[a["Core/Axis/Axis.js"],a["Core/Utilities.js"],a["Extensions/Oldie/VMLAxis3D.js"]],function(a,D,p){var m=D.setOptions;return function(){function g(){}g.compose=function(g,n){var d=n.prototype;g=g.prototype;m({animate:!1});g.face3d=d.face3d;g.polyhedron=d.polyhedron;g.elements3d=d.elements3d;g.element3d=d.element3d;g.cuboid=d.cuboid;g.cuboidPath=d.cuboidPath;g.toLinePath=d.toLinePath;g.toLineSegments=d.toLineSegments;g.arc3d=function(a){a=d.arc3d.call(this,
a);a.css({zIndex:a.zIndex});return a};g.arc3dPath=d.arc3dPath;p.compose(a)};return g}()});C(a,"Extensions/Oldie/Oldie.js",[a["Core/Chart/Chart.js"],a["Core/Color/Color.js"],a["Core/Globals.js"],a["Core/Color/Palette.js"],a["Core/Pointer.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Renderer/SVG/SVGRenderer3D.js"],a["Core/Utilities.js"],a["Extensions/Oldie/VMLRenderer3D.js"]],function(a,D,p,x,g,t,n,d,I){var m=D.parse,h=p.deg2rad,f=p.doc,C=p.noop,B=p.svg,H=p.win,r=d.addEvent,M=d.createElement,J=
d.css,F=d.defined,K=d.discardElement,O=d.erase,G=d.extend;D=d.extendClass;var P=d.getOptions,z=d.isArray,S=d.isNumber,b=d.isObject,u=d.pick,v=d.pInt,q=d.uniqueKey;P().global.VMLRadialGradientURL="http://code.highcharts.com/9.0.1/gfx/vml-radial-gradient.png";f&&!f.defaultView&&(p.getStyle=d.getStyle=function(c,a){var e={width:"clientWidth",height:"clientHeight"}[a];if(c.style[a])return v(c.style[a]);"opacity"===a&&(a="filter");if(e)return c.style.zoom=1,Math.max(c[e]-2*d.getStyle(c,"padding"),0);c=
c.currentStyle[a.replace(/\-(\w)/g,function(a,c){return c.toUpperCase()})];"filter"===a&&(c=c.replace(/alpha\(opacity=([0-9]+)\)/,function(c,a){return a/100}));return""===c?1:v(c)});B||(r(t,"afterInit",function(){"text"===this.element.nodeName&&this.css({position:"absolute"})}),g.prototype.normalize=function(a,e){a=a||H.event;a.target||(a.target=a.srcElement);e||(this.chartPosition=e=this.getChartPosition());return G(a,{chartX:Math.round(Math.max(a.x,a.clientX-e.left)),chartY:Math.round(a.y)})},a.prototype.ieSanitizeSVG=
function(a){return a=a.replace(/<IMG /g,"<image ").replace(/<(\/?)TITLE>/g,"<$1title>").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/ id=([^" >]+)/g,' id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()})},a.prototype.isReadyToRender=function(){var a=this;return B||H!=H.top||"complete"===
f.readyState?!0:(f.attachEvent("onreadystatechange",function(){f.detachEvent("onreadystatechange",a.firstRender);"complete"===f.readyState&&a.firstRender()}),!1)},f.createElementNS||(f.createElementNS=function(a,e){return f.createElement(e)}),p.addEventListenerPolyfill=function(a,e){function c(a){a.target=a.srcElement||H;e.call(b,a)}var b=this;b.attachEvent&&(b.hcEventsIE||(b.hcEventsIE={}),e.hcKey||(e.hcKey=q()),b.hcEventsIE[e.hcKey]=c,b.attachEvent("on"+a,c))},p.removeEventListenerPolyfill=function(a,
e){this.detachEvent&&(e=this.hcEventsIE[e.hcKey],this.detachEvent("on"+a,e))},a={docMode8:f&&8===f.documentMode,init:function(a,e){var c=["<",e,' filled="f" stroked="f"'],b=["position: ","absolute",";"],d="div"===e;("shape"===e||d)&&b.push("left:0;top:0;width:1px;height:1px;");b.push("visibility: ",d?"hidden":"visible");c.push(' style="',b.join(""),'"/>');e&&(c=d||"span"===e||"img"===e?c.join(""):a.prepVML(c),this.element=M(c));this.renderer=a},add:function(a){var c=this.renderer,k=this.element,b=
c.box,d=a&&a.inverted;b=a?a.element||a:b;a&&(this.parentGroup=a);d&&c.invertChild(k,b);b.appendChild(k);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:t.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,e=Math.cos(a*h),k=Math.sin(a*h);J(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",e,", M12=",-k,", M21=",k,
", M22=",e,", sizingMethod='auto expand')"].join(""):"none"})},getSpanCorrection:function(a,e,k,b,d){var c=b?Math.cos(b*h):1,f=b?Math.sin(b*h):0,l=u(this.elemHeight,this.element.offsetHeight);this.xCorr=0>c&&-a;this.yCorr=0>f&&-l;var g=0>c*f;this.xCorr+=f*e*(g?1-k:k);this.yCorr-=c*e*(b?g?k:1-k:1);d&&"left"!==d&&(this.xCorr-=a*k*(0>c?-1:1),b&&(this.yCorr-=l*k*(0>f?-1:1)),J(this.element,{textAlign:d}))},pathToVML:function(a){for(var c=a.length,b=[];c--;)S(a[c])?b[c]=Math.round(10*a[c])-5:"Z"===a[c]?
b[c]="x":(b[c]=a[c],!a.isArc||"wa"!==a[c]&&"at"!==a[c]||(b[c+5]===b[c+7]&&(b[c+7]+=a[c+7]>a[c+5]?1:-1),b[c+6]===b[c+8]&&(b[c+8]+=a[c+8]>a[c+6]?1:-1)));return b.join(" ")||"x"},clip:function(a){var c=this;if(a){var b=a.members;O(b,c);b.push(c);c.destroyClip=function(){O(b,c)};a=a.getCSS(c)}else c.destroyClip&&c.destroyClip(),a={clip:c.docMode8?"inherit":"rect(auto)"};return c.css(a)},css:t.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&K(a)},destroy:function(){this.destroyClip&&this.destroyClip();
return t.prototype.destroy.apply(this)},on:function(a,e){this.element["on"+a]=function(){var a=H.event;a.target=a.srcElement;e(a)};return this},cutOffPath:function(a,e){a=a.split(/[ ,]/);var c=a.length;if(9===c||11===c)a[c-4]=a[c-2]=v(a[c-2])-10*e;return a.join(" ")},shadow:function(a,e,b){var c=[],k,d=this.element,f=this.renderer,h=d.style,g=d.path;g&&"string"!==typeof g.value&&(g="x");var m=g;if(a){var p=u(a.width,3);var n=(a.opacity||.15)/p;for(k=1;3>=k;k++){var q=2*p+1-2*k;b&&(m=this.cutOffPath(g.value,
q+.5));var r=['<shape isShadow="true" strokeweight="',q,'" filled="false" path="',m,'" coordsize="10 10" style="',d.style.cssText,'" />'];var t=M(f.prepVML(r),null,{left:v(h.left)+u(a.offsetX,1),top:v(h.top)+u(a.offsetY,1)});b&&(t.cutOff=q+1);r=['<stroke color="',a.color||x.neutralColor100,'" opacity="',n*k,'"/>'];M(f.prepVML(r),null,null,t);e?e.element.appendChild(t):d.parentNode.insertBefore(t,d);c.push(t)}this.shadows=c}return this},updateShadows:C,setAttr:function(a,e){this.docMode8?this.element[a]=
e:this.element.setAttribute(a,e)},getAttr:function(a){return this.docMode8?this.element[a]:this.element.getAttribute(a)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,e,b){(b.getElementsByTagName("stroke")[0]||M(this.renderer.prepVML(["<stroke/>"]),null,null,b))[e]=a||"solid";this[e]=a},dSetter:function(a,e,b){var c=this.shadows;a=a||[];this.d=a.join&&a.join(" ");b.path=a=this.pathToVML(a);if(c)for(b=c.length;b--;)c[b].path=c[b].cutOff?this.cutOffPath(a,
c[b].cutOff):a;this.setAttr(e,a)},fillSetter:function(a,e,b){var c=b.nodeName;"SPAN"===c?b.style.color=a:"IMG"!==c&&(b.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,b,e,this)))},"fill-opacitySetter":function(a,e,b){M(this.renderer.prepVML(["<",e.split("-")[0],' opacity="',a,'"/>']),null,null,b)},opacitySetter:C,rotationSetter:function(a,b,d){d=d.style;this[b]=d[b]=a;d.left=-Math.round(Math.sin(a*h)+1)+"px";d.top=Math.round(Math.cos(a*h))+"px"},strokeSetter:function(a,b,d){this.setAttr("strokecolor",
this.renderer.color(a,d,b,this))},"stroke-widthSetter":function(a,b,d){d.stroked=!!a;this[b]=a;S(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,d){"inherit"===a&&(a="visible");this.shadows&&this.shadows.forEach(function(c){c.style[b]=a});"DIV"===d.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(d.style[b]=a?"visible":"hidden"),b="top");d.style[b]=a},xSetter:function(a,b,d){this[b]=a;"x"===b?b="left":"y"===b&&(b="top");
this.updateClipping?(this[b]=a,this.updateClipping()):d.style[b]=a},zIndexSetter:function(a,b,d){d.style[b]=a},fillGetter:function(){return this.getAttr("fillcolor")||""},strokeGetter:function(){return this.getAttr("strokecolor")||""},classGetter:function(){return this.getAttr("className")||""}},a["stroke-opacitySetter"]=a["fill-opacitySetter"],p.VMLElement=a=D(t,a),a.prototype.ySetter=a.prototype.widthSetter=a.prototype.heightSetter=a.prototype.xSetter,g={Element:a,isIE8:-1<H.navigator.userAgent.indexOf("MSIE 8.0"),
init:function(a,b,d){this.crispPolyLine=n.prototype.crispPolyLine;this.alignedObjects=[];var c=this.createElement("div").css({position:"relative"});var e=c.element;a.appendChild(c.element);this.isVML=!0;this.box=e;this.boxWrapper=c;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,d,!1);if(!f.namespaces.hcv){f.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{f.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(N){f.styleSheets[0].cssText+=
"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,e,d,f){var c=this.createElement(),k=b(a);return G(c,{members:[],count:0,left:(k?a.x:a)+1,top:(k?a.y:e)+1,width:(k?a.width:d)-1,height:(k?a.height:f)-1,getCSS:function(a){var c=a.element,b=c.nodeName,e=a.inverted,d=this.top-("shape"===b?c.offsetTop:0),f=this.left;c=f+this.width;var k=d+this.height;d={clip:"rect("+Math.round(e?
f:d)+"px,"+Math.round(e?k:c)+"px,"+Math.round(e?c:k)+"px,"+Math.round(e?d:f)+"px)"};!e&&a.docMode8&&"DIV"===b&&G(d,{width:c+"px",height:k+"px"});return d},updateClipping:function(){c.members.forEach(function(a){a.element&&a.css(c.getCSS(a))})}})},color:function(a,b,d,f){var c=this,e=/^rgba/,k,h,g="none";a&&a.linearGradient?h="gradient":a&&a.radialGradient&&(h="pattern");if(h){var l,p,n=a.linearGradient||a.radialGradient,q,r,t,u,v="";a=a.stops;var x=[],z=function(){k=['<fill colors="'+x.join(",")+
'" opacity="',r,'" o:opacity2="',q,'" type="',h,'" ',v,'focus="100%" method="any" />'];M(c.prepVML(k),null,null,b)};var B=a[0];var C=a[a.length-1];0<B[0]&&a.unshift([0,B[1]]);1>C[0]&&a.push([1,C[1]]);a.forEach(function(a,c){e.test(a[1])?(K=m(a[1]),l=K.get("rgb"),p=K.get("a")):(l=a[1],p=1);x.push(100*a[0]+"% "+l);c?(r=p,t=l):(q=p,u=l)});if("fill"===d)if("gradient"===h)d=n.x1||n[0]||0,a=n.y1||n[1]||0,B=n.x2||n[2]||0,n=n.y2||n[3]||0,v='angle="'+(90-180*Math.atan((n-a)/(B-d))/Math.PI)+'"',z();else{g=
n.r;var D=2*g,G=2*g,H=n.cx,I=n.cy,F=b.radialReference,J;g=function(){F&&(J=f.getBBox(),H+=(F[0]-J.x)/J.width-.5,I+=(F[1]-J.y)/J.height-.5,D*=F[2]/J.width,G*=F[2]/J.height);v='src="'+P().global.VMLRadialGradientURL+'" size="'+D+","+G+'" origin="0.5,0.5" position="'+H+","+I+'" color2="'+u+'" ';z()};f.added?g():f.onAdd=g;g=t}else g=l}else if(e.test(a)&&"IMG"!==b.tagName){var K=m(a);f[d+"-opacitySetter"](K.get("a"),d,b);g=K.get("rgb")}else g=b.getElementsByTagName(d),g.length&&(g[0].opacity=1,g[0].type=
"solid"),g=a;return g},prepVML:function(a){var c=this.isIE8;a=a.join("");c?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=-1===a.indexOf('style="')?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:n.prototype.html,path:function(a){var c={coordsize:"10 10"};z(a)?c.d=a:b(a)&&G(c,a);return this.createElement("shape").attr(c)},circle:function(a,
e,d){var c=this.symbol("circle");b(a)&&(d=a.r,e=a.y,a=a.x);c.isCircle=!0;c.r=d;return c.attr({x:a,y:e})},g:function(a){var c;a&&(c={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(c)},image:function(a,b,d,f,g){var c=this.createElement("img").attr({src:a});1<arguments.length&&c.attr({x:b,y:d,width:f,height:g});return c},createElement:function(a){return"rect"===a?this.symbol(a):n.prototype.createElement.call(this,a)},invertChild:function(a,b){var c=this;b=b.style;
var d="IMG"===a.tagName&&a.style;J(a,{flip:"x",left:v(b.width)-(d?v(d.top):1),top:v(b.height)-(d?v(d.left):1),rotation:-90});[].forEach.call(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,d,f,g){var c=g.start,e=g.end,h=g.r||d||f;d=g.innerR;f=Math.cos(c);var k=Math.sin(c),l=Math.cos(e),m=Math.sin(e);if(0===e-c)return["x"];c=["wa",a-h,b-h,a+h,b+h,a+h*f,b+h*k,a+h*l,b+h*m];g.open&&!d&&c.push("e","M",a,b);c.push("at",a-d,b-d,a+d,b+d,a+d*l,b+d*m,a+d*f,b+d*k,"x","e");c.isArc=!0;
return c},circle:function(a,b,d,f,g){g&&F(g.r)&&(d=f=2*g.r);g&&g.isCircle&&(a-=d/2,b-=f/2);return["wa",a,b,a+d,b+f,a+d,b+f/2,a+d,b+f/2,"e"]},rect:function(a,b,d,f,g){return n.prototype.symbols[F(g)&&g.r?"callout":"square"].call(0,a,b,d,f,g)}}},p.VMLRenderer=a=function(){this.init.apply(this,arguments)},G(a.prototype,n.prototype),G(a.prototype,g),p.Renderer=a,I.compose(a,n));n.prototype.getSpanWidth=function(a,b){var c=a.getBBox(!0).width;!B&&this.forExport&&(c=this.measureSpanWidth(b.firstChild.data,
a.styles));return c};n.prototype.measureSpanWidth=function(a,b){var c=f.createElement("span");a=f.createTextNode(a);c.appendChild(a);J(c,b);this.box.appendChild(c);b=c.offsetWidth;K(c);return b}});C(a,"masters/modules/oldie.src.js",[],function(){})});
//# sourceMappingURL=oldie.js.map