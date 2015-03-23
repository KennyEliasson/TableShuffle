!function(){"use strict";var a=1===angular.version.major&&0===angular.version.minor;angular.module("ui-rangeSlider",[]).directive("rangeSlider",["$document","$filter","$log",function(b,c,d){var e=".rangeSlider",f={disabled:!1,orientation:"horizontal",step:0,decimalPlaces:0,showValues:!0,preventEqualMinMax:!1,attachHandleValues:!1},g=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup",over:"pointerdown",out:"mouseout"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp",over:"MSPointerDown",out:"mouseout"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend",over:"mouseover touchstart",out:"mouseout"},h=g.start+e,i=g.move+e,j=g.end+e,k=g.over+e,l=g.out+e,m=function(a){try{return[a.clientX||a.originalEvent.clientX||a.originalEvent.touches[0].clientX,a.clientY||a.originalEvent.clientY||a.originalEvent.touches[0].clientY]}catch(b){return["x","y"]}},n=function(a){return 0>a?0:a>100?100:a},o=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},p={disabled:"=?",min:"=",max:"=",modelMin:"=?",modelMax:"=?",onHandleDown:"&",onHandleUp:"&",orientation:"@",step:"@",decimalPlaces:"@",filter:"@",filterOptions:"@",showValues:"@",pinHandle:"@",preventEqualMinMax:"@",attachHandleValues:"@"};return a&&(p.disabled="=",p.modelMin="=",p.modelMax="="),{restrict:"A",replace:!0,template:['<div class="ngrs-range-slider">','<div class="ngrs-runner">','<div class="ngrs-handle ngrs-handle-min"><i></i></div>','<div class="ngrs-handle ngrs-handle-max"><i></i></div>','<div class="ngrs-join"></div>',"</div>",'<div class="ngrs-value-runner">','<div class="ngrs-value ngrs-value-min" ng-show="showValues"><div>{{filteredModelMin}}</div></div>','<div class="ngrs-value ngrs-value-max" ng-show="showValues"><div>{{filteredModelMax}}</div></div>',"</div>","</div>"].join(""),scope:p,link:function(a,g,p){function q(a){"min"===a?(angular.element(y[0]).css("display","none"),angular.element(y[1]).css("display","block")):"max"===a?(angular.element(y[0]).css("display","block"),angular.element(y[1]).css("display","none")):(angular.element(y[0]).css("display","block"),angular.element(y[1]).css("display","block"))}function r(a){a?x.addClass("ngrs-disabled"):x.removeClass("ngrs-disabled")}function s(){a.min>a.max&&v("min must be less than or equal to max"),angular.isDefined(a.min)&&angular.isDefined(a.max)&&(o(a.min)||v("min must be a number"),o(a.max)||v("max must be a number"),F=a.max-a.min,E=[a.min,a.max],t())}function t(){if(a.modelMin>a.modelMax&&(w("modelMin must be less than or equal to modelMax"),a.modelMin=a.modelMax),(angular.isDefined(a.modelMin)||"min"===a.pinHandle)&&(angular.isDefined(a.modelMax)||"max"===a.pinHandle)){o(a.modelMin)||("min"!==a.pinHandle&&w("modelMin must be a number"),a.modelMin=a.min),o(a.modelMax)||("max"!==a.pinHandle&&w("modelMax must be a number"),a.modelMax=a.max);var b,d,e=n((a.modelMin-a.min)/F*100),f=n((a.modelMax-a.min)/F*100);a.attachHandleValues&&(b=e,d=f),a.modelMin=Math.max(a.min,a.modelMin),a.modelMax=Math.min(a.max,a.modelMax),a.filter?(a.filteredModelMin=c(a.filter)(a.modelMin,a.filterOptions),a.filteredModelMax=c(a.filter)(a.modelMax,a.filterOptions)):(a.filteredModelMin=a.modelMin,a.filteredModelMax=a.modelMax),a.min===a.max&&a.modelMin==a.modelMax?(angular.element(y[0]).css(B,"0%"),angular.element(y[1]).css(B,"100%"),a.attachHandleValues&&(angular.element(".ngrs-value-runner").addClass("ngrs-attached-handles"),angular.element(z[0]).css(B,"0%"),angular.element(z[1]).css(B,"100%")),angular.element(A).css(B,"0%").css(C,"0%")):(angular.element(y[0]).css(B,e+"%"),angular.element(y[1]).css(B,f+"%"),a.attachHandleValues&&(angular.element(".ngrs-value-runner").addClass("ngrs-attached-handles"),angular.element(z[0]).css(B,b+"%"),angular.element(z[1]).css(B,d+"%"),angular.element(z[1]).css(C,"auto")),angular.element(A).css(B,e+"%").css(C,100-f+"%"),e>95&&angular.element(y[0]).css("z-index",3))}}function u(c){var d=y[c];d.bind(h+"X",function(f){var g=(0===c?"ngrs-handle-min":"ngrs-handle-max")+"-down",h=(0===c?a.modelMin:a.modelMax)-a.min,k=h/F*100,l=m(f),o=l,p=!1;angular.isFunction(a.onHandleDown)&&a.onHandleDown(),angular.element("body").bind("selectstart"+e,function(){return!1}),a.disabled||(G=!0,d.addClass("ngrs-down"),x.addClass("ngrs-focus "+g),angular.element("body").addClass("ngrs-touching"),b.bind(i,function(b){b.preventDefault();var e,f,g=m(b),h=a.step/F*100,i=((0===c?a.modelMax:a.modelMin)-a.min)/F*100;"x"!==g[0]&&(g[0]-=l[0],g[1]-=l[1],e=[o[0]!==g[0],o[1]!==g[1]],f=k+100*g[D]/(D?x.height():x.width()),f=n(f),a.preventEqualMinMax&&(0===h&&(h=1/F*100),0===c?i-=h:1===c&&(i+=h)),0===c?f=f>i?i:f:1===c&&(f=i>f?i:f),a.step>0&&100>f&&f>0&&(f=Math.round(f/h)*h),f>95&&0===c?d.css("z-index",3):d.css("z-index",""),e[D]&&f!=p&&(0===c?a.modelMin=parseFloat(f*F/100+a.min).toFixed(a.decimalPlaces):1===c&&(a.modelMax=parseFloat(f*F/100+a.min).toFixed(a.decimalPlaces)),a.$apply(),p=f),o=g)}).bind(j,function(){angular.isFunction(a.onHandleUp)&&a.onHandleUp(),b.off(i),b.off(j),angular.element("body").removeClass("ngrs-touching"),G=!1,d.removeClass("ngrs-down"),d.removeClass("ngrs-over"),x.removeClass("ngrs-focus "+g)}))}).on(k,function(){d.addClass("ngrs-over")}).on(l,function(){G||d.removeClass("ngrs-over")})}function v(b){throw a.disabled=!0,new Error("RangeSlider: "+b)}function w(a){d.warn(a)}var x=angular.element(g),y=[g.find(".ngrs-handle-min"),g.find(".ngrs-handle-max")],z=[g.find(".ngrs-value-min"),g.find(".ngrs-value-max")],A=g.find(".ngrs-join"),B="left",C="right",D=0,E=[0,0],F=0,G=!1;a.filteredModelMin=a.modelMin,a.filteredModelMax=a.modelMax,p.$observe("disabled",function(b){angular.isDefined(b)||(a.disabled=f.disabled),a.$watch("disabled",r)}),p.$observe("orientation",function(b){angular.isDefined(b)||(a.orientation=f.orientation);for(var c,d=a.orientation.split(" "),e=0,g=d.length;g>e;e++)d[e]="ngrs-"+d[e];c=d.join(" "),x.addClass(c),("vertical"===a.orientation||"vertical left"===a.orientation||"vertical right"===a.orientation)&&(B="top",C="bottom",D=1)}),p.$observe("step",function(b){angular.isDefined(b)||(a.step=f.step)}),p.$observe("decimalPlaces",function(b){angular.isDefined(b)||(a.decimalPlaces=f.decimalPlaces)}),p.$observe("showValues",function(b){a.showValues=angular.isDefined(b)?"false"===b?!1:!0:f.showValues}),p.$observe("pinHandle",function(b){a.pinHandle=angular.isDefined(b)&&("min"===b||"max"===b)?b:null,a.$watch("pinHandle",q)}),p.$observe("preventEqualMinMax",function(b){a.preventEqualMinMax=angular.isDefined(b)?"false"===b?!1:!0:f.preventEqualMinMax}),p.$observe("attachHandleValues",function(b){a.attachHandleValues=angular.isDefined(b)?"false"===b?!1:!0:f.attachHandleValues}),a.$watch("min",s),a.$watch("max",s),a.$watch("modelMin",t),a.$watch("modelMax",t),a.$on("$destroy",function(){x.off(e),angular.element("body").off(e),b.off(e);for(var a=0,c=y.length;c>a;a++)y[a].off(e),y[a].off(e+"X")}),x.bind("selectstart"+e,function(){return!1}).bind("click",function(a){a.stopPropagation()}),u(0),u(1)}}}]),window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}()}();