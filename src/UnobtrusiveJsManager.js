(function() {
  define(["AppContext"], function(AppContext) {
    var UJM;

    UJM = (function() {
      var collection, prefixes;

      collection = {};

      prefixes = null;

      function UJM(defaultPrefixes) {
        if (defaultPrefixes == null) {
          defaultPrefixes = ["data"];
        }
        prefixes = defaultPrefixes;
      }

      UJM.prototype.register = function(attributeKey, attributeValue, event, handlerFunction) {
        this.ensureExits(attributeKey, attributeValue, event);
        collection[attributeKey][attributeValue][event].push(handlerFunction);
        return this;
      };

      UJM.prototype.ensureExits = function(attributeKey, attributeValue, event) {
        if (collection[attributeKey] == null) {
          collection[attributeKey] = {};
          collection[attributeKey][attributeValue] = {};
          return collection[attributeKey][attributeValue][event] = [];
        } else if (collection[attributeKey][attributeValue] == null) {
          collection[attributeKey][attributeValue] = {};
          return collection[attributeKey][attributeValue][event] = [];
        } else if (collection[attributeKey][attributeValue][event] == null) {
          return collection[attributeKey][attributeValue][event] = [];
        }
      };

      UJM.prototype.execute = function() {
        var attrVal, attribute, event, eventName, handler, key, name, prefix, _i, _j, _len, _len1;

        for (name in collection) {
          attribute = collection[name];
          for (key in attribute) {
            attrVal = attribute[key];
            for (eventName in attrVal) {
              event = attrVal[eventName];
              for (_i = 0, _len = event.length; _i < _len; _i++) {
                handler = event[_i];
                for (_j = 0, _len1 = prefixes.length; _j < _len1; _j++) {
                  prefix = prefixes[_j];
                  $("[" + prefix + "-" + name + "=\"" + key + "\"]").on(eventName, handler);
                }
              }
            }
          }
        }
      };

      return UJM;

    })();
    return AppContext.UJM || new UJM();
  });

}).call(this);
