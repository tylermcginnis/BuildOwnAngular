/* jshint globalstrict: true */
'use strict';
function initWatchVal(){}

function Scope() {
  this.$$watchers = [];
}

Scope.prototype.$watch = function(watcherFn, listenerFn){
  var watcher = {
    watcherFn: watcherFn,
    listenerFn: listenerFn,
    last: initWatchVal
  };

  this.$$watchers.push(watcher);
};

Scope.prototype.$digest = function(){
  var self = this;
  var newValue;
  var oldValue;
  _.forEach(this.$$watchers, function(watcher){
    newValue = watcher.watcherFn(self);
    oldValue = watcher.last;
    if(newValue !== oldValue){
      watcher.last = newValue;
      watcher.listenerFn(newValue, (oldValue === initWatchVal ? newValue : oldValue),self);
    }
  });
};