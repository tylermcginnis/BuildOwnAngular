/* jshint globalstrict: true */
'use strict';

function Scope(){
  this.$$watchers = [];
}

Scope.prototype.$watch = function(thingToWatch, thingToCall){
  var obj = {
    watchFn: thingToWatch,
    listenerFn: thingToCall
  };

  this.$$watchers.push(obj);
};

Scope.prototype.$digest = function(){
  var newValue;
  var oldValue;
  for(var i = 0; i < this.$$watchers.length; i++){
    newValue = this.$$watchers[i].watchFn(this);
    oldValue = this.$$watchers[i].last;
    if(newValue !== oldValue){
      this.$$watchers[i].last = newValue;
      this.$$watchers[i].listenerFn(newValue, oldValue, this);
    }
  }
};