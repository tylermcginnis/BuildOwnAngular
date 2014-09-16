/* jshint globalstrict: true */
/* global Scope: false */
'use strict';

describe("Scope", function(){
  it("can be constructed and used as an object", function(){
    var scope = new Scope();
    scope.aProperty = 1;

    expect(scope.aProperty).toBe(1);
  });

  describe("digest", function(){
    var scope;

    beforeEach(function(){
      scope = new Scope();
    });

    it("calls the listener fn of a watch on first $digest", function(){
      var watchFn = function(){return 'wat';};
      var listenerFn = jasmine.createSpy();
      scope.$watch(watchFn, listenerFn);
      scope.$digest();
      expect(listenerFn).toHaveBeenCalled();
    });

    it("calls the watch function with the scope as the arguments", function(){
      var watchFn = jasmine.createSpy();
      var listenerFn = function(){};
      scope.$watch(watchFn, listenerFn);
      scope.$digest();
      expect(watchFn).toHaveBeenCalledWith(scope);
    });

    it("calls the listener fn when the watched value changes", function(){
      scope.someValue = 'a';
      scope.counter = 0;

      //up until now all scope.$watch does it put an object of two methods into the $$watchers array
      scope.$watch(
        function(scope){return scope.someValue;},
        function(newValue, oldValue, scope){scope.counter++;}
      );

      expect(scope.counter).toBe(0);

      scope.$digest();
      expect(scope.counter).toBe(1);

      scope.$digest();
      expect(scope.counter).toBe(1);

      scope.someValue = 'b';
      expect(scope.counter).toBe(1);

      scope.$digest();
      expect(scope.counter).toBe(2);
    });

    it("calls the listener when watch value is undefined", function(){
      scope.counter = 0;
      scope.$watch(
        function(scope){return scope.someValue;},
        function(newValue, oldValue, scope){scope.counter++;}
      );
      scope.$digest();
      expect(scope.counter).toBe(1);
    });

    it("calls listener with new value as old value the first time", function() {
      scope.someValue = 123;
      var oldValueGiven;
      scope.$watch(
        function(scope) { return scope.someValue; },
        function(newValue, oldValue, scope) { oldValueGiven = oldValue; }
      );
      scope.$digest();
      expect(oldValueGiven).toBe(123);
    });
  });
});