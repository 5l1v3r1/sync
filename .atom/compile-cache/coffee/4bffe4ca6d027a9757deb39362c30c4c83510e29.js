(function() {
  var Analytics, Tracker, allowUnsafeEval, analyticsWriteKey, pkg, _;

  analyticsWriteKey = 'pDV1EgxAbco4gjPXpJzuOeDyYgtkrmmG';

  _ = require('underscore-plus');

  allowUnsafeEval = require('loophole').allowUnsafeEval;

  Analytics = null;

  allowUnsafeEval(function() {
    return Analytics = require('analytics-node');
  });

  pkg = require("../package.json");

  Tracker = (function() {
    function Tracker(analyticsUserIdConfigKey, analyticsEnabledConfigKey) {
      var uuid;
      this.analyticsUserIdConfigKey = analyticsUserIdConfigKey;
      this.analyticsEnabledConfigKey = analyticsEnabledConfigKey;
      this.analytics = new Analytics(analyticsWriteKey);
      if (!atom.config.get(this.analyticsUserIdConfigKey)) {
        uuid = require('node-uuid');
        atom.config.set(this.analyticsUserIdConfigKey, uuid.v4());
      }
      this.defaultEvent = {
        userId: atom.config.get(this.analyticsUserIdConfigKey),
        properties: {
          value: 1,
          version: atom.getVersion(),
          platform: navigator.platform,
          category: "Atom-" + (atom.getVersion()) + "/" + pkg.name + "-" + pkg.version
        },
        context: {
          app: {
            name: pkg.name,
            version: pkg.version
          },
          userAgent: navigator.userAgent
        }
      };
      atom.config.observe(this.analyticsUserIdConfigKey, (function(_this) {
        return function(userId) {
          _this.analytics.identify({
            userId: userId
          });
          return _this.defaultEvent.userId = userId;
        };
      })(this));
      this.enabled = atom.config.get(this.analyticsEnabledConfigKey);
      atom.config.onDidChange(this.analyticsEnabledConfigKey, (function(_this) {
        return function(_arg) {
          var newValue;
          newValue = _arg.newValue;
          return _this.enabled = newValue;
        };
      })(this));
    }

    Tracker.prototype.track = function(message) {
      if (!this.enabled) {
        return;
      }
      if (_.isString(message)) {
        message = {
          event: message
        };
      }
      console.debug("tracking " + message.event);
      return this.analytics.track(_.deepExtend(this.defaultEvent, message));
    };

    Tracker.prototype.trackActivate = function() {
      return this.track({
        event: 'Activate',
        properties: {
          label: pkg.version
        }
      });
    };

    Tracker.prototype.trackDeactivate = function() {
      return this.track({
        event: 'Deactivate',
        properties: {
          label: pkg.version
        }
      });
    };

    Tracker.prototype.error = function(e) {
      return this.track({
        event: 'Error',
        properties: {
          error: e
        }
      });
    };

    return Tracker;

  })();

  module.exports = Tracker;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc3luYy1zZXR0aW5ncy9saWIvdHJhY2tlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFDQTtBQUFBLE1BQUEsOERBQUE7O0FBQUEsRUFBQSxpQkFBQSxHQUFvQixrQ0FBcEIsQ0FBQTs7QUFBQSxFQUdBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FISixDQUFBOztBQUFBLEVBSUMsa0JBQW1CLE9BQUEsQ0FBUSxVQUFSLEVBQW5CLGVBSkQsQ0FBQTs7QUFBQSxFQU9BLFNBQUEsR0FBWSxJQVBaLENBQUE7O0FBQUEsRUFRQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtXQUFHLFNBQUEsR0FBWSxPQUFBLENBQVEsZ0JBQVIsRUFBZjtFQUFBLENBQWhCLENBUkEsQ0FBQTs7QUFBQSxFQVdBLEdBQUEsR0FBTSxPQUFBLENBQVEsaUJBQVIsQ0FYTixDQUFBOztBQUFBLEVBYU07QUFFUyxJQUFBLGlCQUFFLHdCQUFGLEVBQTZCLHlCQUE3QixHQUFBO0FBRVgsVUFBQSxJQUFBO0FBQUEsTUFGWSxJQUFDLENBQUEsMkJBQUEsd0JBRWIsQ0FBQTtBQUFBLE1BRnVDLElBQUMsQ0FBQSw0QkFBQSx5QkFFeEMsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFNBQUQsR0FBaUIsSUFBQSxTQUFBLENBQVUsaUJBQVYsQ0FBakIsQ0FBQTtBQUdBLE1BQUEsSUFBRyxDQUFBLElBQVEsQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixJQUFDLENBQUEsd0JBQWpCLENBQVA7QUFDRSxRQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsV0FBUixDQUFQLENBQUE7QUFBQSxRQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixJQUFDLENBQUEsd0JBQWpCLEVBQTJDLElBQUksQ0FBQyxFQUFMLENBQUEsQ0FBM0MsQ0FE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

//# sourceURL=/home/xy/.atom/packages/sync-settings/lib/tracker.coffee
