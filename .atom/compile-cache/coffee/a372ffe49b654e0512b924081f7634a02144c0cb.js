(function() {
  var ScriptOptions, _;

  _ = require('underscore');

  module.exports = ScriptOptions = (function() {
    function ScriptOptions() {}

    ScriptOptions.prototype.workingDirectory = null;

    ScriptOptions.prototype.cmd = null;

    ScriptOptions.prototype.cmdArgs = [];

    ScriptOptions.prototype.env = null;

    ScriptOptions.prototype.scriptArgs = [];

    ScriptOptions.prototype.getEnv = function() {
      var key, mapping, pair, value, _i, _len, _ref, _ref1;
      if ((this.env == null) || this.env === '') {
        return {};
      }
      mapping = {};
      _ref = this.env.trim().split(';');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pair = _ref[_i];
        _ref1 = pair.split('=', 2), key = _ref1[0], value = _ref1[1];
        mapping[key] = ("" + value).replace(/"((?:[^"\\]|\\"|\\[^"])+)"/, '$1');
        mapping[key] = mapping[key].replace(/'((?:[^'\\]|\\'|\\[^'])+)'/, '$1');
      }
      return mapping;
    };

    ScriptOptions.prototype.mergedEnv = function(otherEnv) {
      var key, mergedEnv, otherCopy, value;
      otherCopy = _.extend({}, otherEnv);
      mergedEnv = _.extend(otherCopy, this.getEnv());
      for (key in mergedEnv) {
        value = mergedEnv[key];
        mergedEnv[key] = ("" + value).replace(/"((?:[^"\\]|\\"|\\[^"])+)"/, '$1');
        mergedEnv[key] = mergedEnv[key].replace(/'((?:[^'\\]|\\'|\\[^'])+)'/, '$1');
      }
      return mergedEnv;
    };

    return ScriptOptions;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtb3B0aW9ucy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0JBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVIsQ0FBSixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTsrQkFDSjs7QUFBQSw0QkFBQSxnQkFBQSxHQUFrQixJQUFsQixDQUFBOztBQUFBLDRCQUNBLEdBQUEsR0FBSyxJQURMLENBQUE7O0FBQUEsNEJBRUEsT0FBQSxHQUFTLEVBRlQsQ0FBQTs7QUFBQSw0QkFHQSxHQUFBLEdBQUssSUFITCxDQUFBOztBQUFBLDRCQUlBLFVBQUEsR0FBWSxFQUpaLENBQUE7O0FBQUEsNEJBVUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLFVBQUEsZ0RBQUE7QUFBQSxNQUFBLElBQWlCLGtCQUFKLElBQWEsSUFBQyxDQUFBLEdBQUQsS0FBUSxFQUFsQztBQUFBLGVBQU8sRUFBUCxDQUFBO09BQUE7QUFBQSxNQUVBLE9BQUEsR0FBVSxFQUZWLENBQUE7QUFJQTtBQUFBLFdBQUEsMkNBQUE7d0JBQUE7QUFDRSxRQUFBLFFBQWUsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLENBQWYsRUFBQyxjQUFELEVBQU0sZ0JBQU4sQ0FBQTtBQUFBLFFBQ0EsT0FBUSxDQUFBLEdBQUEsQ0FBUixHQUFlLENBQUEsRUFBQSxHQUFHLEtBQUgsQ0FBVSxDQUFDLE9BQVgsQ0FBbUIsNEJBQW5CLEVBQWlELElBQWpELENBRGYsQ0FBQTtBQUFBLFFBRUEsT0FBUSxDQUFBLEdBQUEsQ0FBUixHQUFlLE9BQVEsQ0FBQSxHQUFBLENBQUksQ0FBQyxPQUFiLENBQXFCLDRCQUFyQixFQUFtRCxJQUFuRCxDQUZmLENBREY7QUFBQSxPQUpBO2FBVUEsUUFYTTtJQUFBLENBVlIsQ0FBQTs7QUFBQSw0QkE0QkEsU0FBQSxHQUFXLFNBQUMsUUFBRCxHQUFBO0FBQ1QsVUFBQSxnQ0FBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLENBQUMsQ0FBQyxNQUFGLENBQVMsRUFBVCxFQUFhLFFBQWIsQ0FBWixDQUFBO0FBQUEsTUFDQSxTQUFBLEdBQVksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFULEVBQW9CLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBcEIsQ0FEWixDQUFBO0FBR0EsV0FBQSxnQkFBQTsrQkFBQTtBQUNFLFFBQUEsU0FBVSxDQUFBLEdBQUEsQ0FBVixHQUFpQixDQUFBLEVBQUEsR0FBRyxLQUFILENBQVUsQ0FBQyxPQUFYLENBQW1CLDRCQUFuQixFQUFpRCxJQUFqRCxDQUFqQixDQUFBO0FBQUEsUUFDQSxTQUFVLENBQUEsR0FBQSxDQUFWLEdBQWlCLFNBQVUsQ0FBQSxHQUFBLENBQUksQ0FBQyxPQUFmLENBQXVCLDRCQUF2QixFQUFxRCxJQUFyRCxDQURqQixDQURGO0FBQUEsT0FIQTthQU9BLFVBUlM7SUFBQSxDQTVCWCxDQUFBOzt5QkFBQTs7TUFKRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/script/lib/script-options.coffee
