(function() {
  var __slice = [].slice;

  module.exports = {
    setConfig: function(keyPath, value) {
      var _base;
      if (this.originalConfigs == null) {
        this.originalConfigs = {};
      }
      if ((_base = this.originalConfigs)[keyPath] == null) {
        _base[keyPath] = atom.config.isDefault(keyPath) ? null : atom.config.get(keyPath);
      }
      return atom.config.set(keyPath, value);
    },
    restoreConfigs: function() {
      var keyPath, value, _ref, _results;
      if (this.originalConfigs) {
        _ref = this.originalConfigs;
        _results = [];
        for (keyPath in _ref) {
          value = _ref[keyPath];
          _results.push(atom.config.set(keyPath, value));
        }
        return _results;
      }
    },
    callAsync: function(timeout, async, next) {
      var done, nextArgs, _ref;
      if (typeof timeout === 'function') {
        _ref = [timeout, async], async = _ref[0], next = _ref[1];
        timeout = 5000;
      }
      done = false;
      nextArgs = null;
      runs(function() {
        return async(function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          done = true;
          return nextArgs = args;
        });
      });
      waitsFor(function() {
        return done;
      }, null, timeout);
      if (next != null) {
        return runs(function() {
          return next.apply(this, nextArgs);
        });
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc3luYy1zZXR0aW5ncy9zcGVjL3NwZWMtaGVscGVycy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0JBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxTQUFBLEVBQVcsU0FBQyxPQUFELEVBQVUsS0FBVixHQUFBO0FBQ1QsVUFBQSxLQUFBOztRQUFBLElBQUMsQ0FBQSxrQkFBbUI7T0FBcEI7O2FBQ2lCLENBQUEsT0FBQSxJQUFlLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBWixDQUFzQixPQUF0QixDQUFILEdBQXNDLElBQXRDLEdBQWdELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixPQUFoQjtPQUQ3RTthQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixPQUFoQixFQUF5QixLQUF6QixFQUhTO0lBQUEsQ0FBWDtBQUFBLElBS0EsY0FBQSxFQUFnQixTQUFBLEdBQUE7QUFDZCxVQUFBLDhCQUFBO0FBQUEsTUFBQSxJQUFHLElBQUMsQ0FBQSxlQUFKO0FBQ0U7QUFBQTthQUFBLGVBQUE7Z0NBQUE7QUFDRSx3QkFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsT0FBaEIsRUFBeUIsS0FBekIsRUFBQSxDQURGO0FBQUE7d0JBREY7T0FEYztJQUFBLENBTGhCO0FBQUEsSUFVQSxTQUFBLEVBQVcsU0FBQyxPQUFELEVBQVUsS0FBVixFQUFpQixJQUFqQixHQUFBO0FBQ1QsVUFBQSxvQkFBQTtBQUFBLE1BQUEsSUFBRyxNQUFBLENBQUEsT0FBQSxLQUFrQixVQUFyQjtBQUNFLFFBQUEsT0FBZ0IsQ0FBQyxPQUFELEVBQVUsS0FBVixDQUFoQixFQUFDLGVBQUQsRUFBUSxjQUFSLENBQUE7QUFBQSxRQUNBLE9BQUEsR0FBVSxJQURWLENBREY7T0FBQTtBQUFBLE1BR0EsSUFBQSxHQUFPLEtBSFAsQ0FBQTtBQUFBLE1BSUEsUUFBQSxHQUFXLElBSlgsQ0FBQTtBQUFBLE1BTUEsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILEtBQUEsQ0FBTSxTQUFBLEdBQUE7QUFDSixjQUFBLElBQUE7QUFBQSxVQURLLDhEQUNMLENBQUE7QUFBQSxVQUFBLElBQUEsR0FBTyxJQUFQLENBQUE7aUJBQ0EsUUFBQSxHQUFXLEtBRlA7UUFBQSxDQUFOLEVBREc7TUFBQSxDQUFMLENBTkEsQ0FBQTtBQUFBLE1BWUEsUUFBQSxDQUFTLFNBQUEsR0FBQTtlQUNQLEtBRE87TUFBQSxDQUFULEVBRUUsSUFGRixFQUVRLE9BRlIsQ0FaQSxDQUFBO0FBZ0JBLE1BQUEsSUFBRyxZQUFIO2VBQ0UsSUFBQSxDQUFLLFNBQUEsR0FBQTtpQkFDSCxJQUFJLENBQUMsS0FBTCxDQUFXLElBQVgsRUFBaUIsUUFBakIsRUFERztRQUFBLENBQUwsRUFERjtPQWpCUztJQUFBLENBVlg7R0FERixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/sync-settings/spec/spec-helpers.coffee
