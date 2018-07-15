;(function(){
    window.onload = function(){
        init();
    };
    var Utils = {
        addCls: function(ele, cls){
            cls = cls.replace(/^\s+/, '').replace(/\s+$/, '');
            var className = ele.className,
                regStr = '^'+cls+'\\s*|\\s+'+cls+'\\s+|\\s+'+cls+'$';
            if (!new RegExp(regStr).test(className)){
                className = className.replace(/\s+$/, '') + ' ' + cls;
            }
            ele.className = className;
        },
        removeCls: function(ele, cls){
            cls = cls.replace(/^\s+/, '').replace(/\s+$/, '');
            var className = ele.className,
                regStr = '^' + cls + '\\s*|\\s+' + cls + '\\s+|\\s+' + cls + '$';
            var newClassName = className
                .replace(new RegExp(regStr, 'g'), ' ')
                .replace(/^\s+/, '')
                .replace(/\s+$/, '');
            ele.className = newClassName;
        }
    };
    function init(){
        polyfill();
        var Crsl = new Carousel();
        setTimeout(function(){
            Crsl.step();
            setInterval(function () {
                Crsl.step();
            }, 4000)
        }, 1000);
    }

    function Carousel(option){
        var _defaultOpt = {
            intervalTime: 2000
        };
        this.option = Object.assign(_defaultOpt, option || {});
        this.initCarousel();
    }
    Carousel.prototype = {
        constructor: Carousel,
        initCarousel: function(){
            var doc = document,
                items = [].slice.call(doc.getElementsByClassName('carousel-item')),
                len = items.length,
                curActive = doc.getElementsByClassName('active')[0],
                idx = items.indexOf(curActive),
                prevAfter = items[idx > 1 ? idx - 2 : idx + len - 2],
                prev = items[idx > 0 ? idx - 1 : idx + len - 1],
                active = curActive;
                next = items[idx < len - 1 ? idx + 1 : idx - len + 1];
                nextBefore = items[idx < len - 2 ? idx + 2 : idx - len + 2];
                normal = items[idx < len - 3 ? idx + 3 : idx - len + 3];
            var _addCls = Utils.addCls;
            _addCls(prevAfter, 'prev-after');
            _addCls(prev, 'prev');
            _addCls(next, 'next');
            _addCls(nextBefore, 'next-before');
            _addCls(normal, 'normal');
        },
        setTransitionTime: function(ele, time){
            ele.style.transitionDuration = (time || this.option.intervalTime)+ 'ms';
        },
        toState: function(ele, state, time){
            var states = ['normal', 'next-before', 'next', 'active', 'prev', 'prev-after'],
                stateIndex = states.indexOf(state),
                prevIndex = stateIndex > 0 ? stateIndex - 1 : states.length-1;
            this.setTransitionTime(ele, 0);
            Utils.addCls(ele, states[prevIndex]);
            this.setTransitionTime(ele, time);
            Utils.addCls(ele, state);
            Utils.removeCls(ele, states[prevIndex]);
        },
        step: function(){
            var doc = document,
                items = [].slice.call(doc.getElementsByClassName('carousel-item')),
                len = items.length,
                curActive = doc.getElementsByClassName('active')[0],
                idx = items.indexOf(curActive),
                prevAfter = items[idx>1 ? idx-2 : idx+len-2],
                prev = items[idx>0 ? idx - 1 : idx + len - 1],
                active = curActive;
                next = items[idx<len-1? idx+1 : idx-len+1],
                nextBefore = items[idx<len-2? idx+2 : idx-len+2],
                normal = items[idx<len-3? idx+3 : idx-len+3];

            this.toState(prevAfter, 'normal');
            this.toState(prev, 'prev-after');
            this.toState(active, 'prev');
            this.toState(next, 'active');
            this.toState(normal, 'next-before');
            this.toState(nextBefore, 'next');
        },
        test: function(){
            var active = document.getElementsByClassName('active')[0];
            this.toState(active, 'prev');
        }
    };

    function polyfill(){
        if (typeof Object.assign != 'function') {
            // Must be writable: true, enumerable: false, configurable: true
            Object.defineProperty(Object, "assign", {
                value: function assign(target, varArgs) { // .length of function is 2
                    'use strict';
                    if (target == null) { // TypeError if undefined or null
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    var to = Object(target);

                    for (var index = 1; index < arguments.length; index++) {
                        var nextSource = arguments[index];

                        if (nextSource != null) { // Skip over if undefined or null
                            for (var nextKey in nextSource) {
                                // Avoid bugs when hasOwnProperty is shadowed
                                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                    to[nextKey] = nextSource[nextKey];
                                }
                            }
                        }
                    }
                    return to;
                },
                writable: true,
                configurable: true
            });
        }
    }
})();