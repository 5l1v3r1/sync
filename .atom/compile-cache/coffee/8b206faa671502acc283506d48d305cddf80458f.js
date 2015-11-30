(function() {
  var CompositeDisposable, ScriptOptionsView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  View = require('atom-space-pen-views').View;

  module.exports = ScriptOptionsView = (function(_super) {
    __extends(ScriptOptionsView, _super);

    function ScriptOptionsView() {
      return ScriptOptionsView.__super__.constructor.apply(this, arguments);
    }

    ScriptOptionsView.content = function() {
      return this.div((function(_this) {
        return function() {
          return _this.div({
            "class": 'overlay from-top panel',
            outlet: 'scriptOptionsView'
          }, function() {
            _this.div({
              "class": 'panel-heading'
            }, 'Configure Run Options');
            return _this.div({
              "class": 'panel-body padded'
            }, function() {
              _this.div({
                "class": 'block'
              }, function() {
                _this.label('Current Working Directory:');
                return _this.input({
                  type: 'text',
                  "class": 'editor mini native-key-bindings',
                  outlet: 'inputCwd'
                });
              });
              _this.div({
                "class": 'block'
              }, function() {
                _this.label('Command');
                return _this.input({
                  type: 'text',
                  "class": 'editor mini native-key-bindings',
                  outlet: 'inputCommand'
                });
              });
              _this.div({
                "class": 'block'
              }, function() {
                _this.label('Command Arguments:');
                return _this.input({
                  type: 'text',
                  "class": 'editor mini native-key-bindings',
                  outlet: 'inputCommandArgs'
                });
              });
              _this.div({
                "class": 'block'
              }, function() {
                _this.label('Program Arguments:');
                return _this.input({
                  type: 'text',
                  "class": 'editor mini native-key-bindings',
                  outlet: 'inputScriptArgs'
                });
              });
              _this.div({
                "class": 'block'
              }, function() {
                _this.label('Environment Variables:');
                return _this.input({
                  type: 'text',
                  "class": 'editor mini native-key-bindings',
                  outlet: 'inputEnv'
                });
              });
              return _this.div({
                "class": 'block'
              }, function() {
                var css;
                css = 'btn inline-block-tight';
                _this.button({
                  "class": "btn " + css,
                  click: 'close'
                }, 'Close');
                return _this.button({
                  "class": "btn " + css,
                  click: 'run'
                }, 'Run');
              });
            });
          });
        };
      })(this));
    };

    ScriptOptionsView.prototype.initialize = function(runOptions) {
      this.runOptions = runOptions;
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'core:cancel': (function(_this) {
          return function() {
            return _this.toggleScriptOptions('hide');
          };
        })(this),
        'core:close': (function(_this) {
          return function() {
            return _this.toggleScriptOptions('hide');
          };
        })(this),
        'script:close-options': (function(_this) {
          return function() {
            return _this.toggleScriptOptions('hide');
          };
        })(this),
        'script:run-options': (function(_this) {
          return function() {
            return _this.toggleScriptOptions();
          };
        })(this),
        'script:save-options': (function(_this) {
          return function() {
            return _this.saveOptions();
          };
        })(this)
      }));
      atom.workspace.addTopPanel({
        item: this
      });
      return this.toggleScriptOptions('hide');
    };

    ScriptOptionsView.prototype.toggleScriptOptions = function(command) {
      switch (command) {
        case 'show':
          return this.scriptOptionsView.show();
        case 'hide':
          return this.scriptOptionsView.hide();
        default:
          return this.scriptOptionsView.toggle();
      }
    };

    ScriptOptionsView.prototype.saveOptions = function() {
      var splitArgs;
      splitArgs = function(element) {
        var item, _i, _len, _ref, _results;
        _ref = element.val().split(' ');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item !== '') {
            _results.push(item);
          }
        }
        return _results;
      };
      this.runOptions.workingDirectory = this.inputCwd.val();
      this.runOptions.cmd = this.inputCommand.val();
      this.runOptions.cmdArgs = splitArgs(this.inputCommandArgs);
      this.runOptions.env = this.inputEnv.val();
      return this.runOptions.scriptArgs = splitArgs(this.inputScriptArgs);
    };

    ScriptOptionsView.prototype.close = function() {
      return this.toggleScriptOptions('hide');
    };

    ScriptOptionsView.prototype.destroy = function() {
      var _ref;
      return (_ref = this.subscriptions) != null ? _ref.dispose() : void 0;
    };

    ScriptOptionsView.prototype.run = function() {
      this.saveOptions();
      this.toggleScriptOptions('hide');
      return atom.commands.dispatch(this.workspaceView(), 'script:run');
    };

    ScriptOptionsView.prototype.workspaceView = function() {
      return atom.views.getView(atom.workspace);
    };

    return ScriptOptionsView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtb3B0aW9ucy12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw0Q0FBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQyxPQUFRLE9BQUEsQ0FBUSxzQkFBUixFQUFSLElBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSix3Q0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxpQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ0gsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLHdCQUFQO0FBQUEsWUFBaUMsTUFBQSxFQUFRLG1CQUF6QztXQUFMLEVBQW1FLFNBQUEsR0FBQTtBQUNqRSxZQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxlQUFQO2FBQUwsRUFBNkIsdUJBQTdCLENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8sbUJBQVA7YUFBTCxFQUFpQyxTQUFBLEdBQUE7QUFDL0IsY0FBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsZ0JBQUEsT0FBQSxFQUFPLE9BQVA7ZUFBTCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsZ0JBQUEsS0FBQyxDQUFBLEtBQUQsQ0FBTyw0QkFBUCxDQUFBLENBQUE7dUJBQ0EsS0FBQyxDQUFBLEtBQUQsQ0FDRTtBQUFBLGtCQUFBLElBQUEsRUFBTSxNQUFOO0FBQUEsa0JB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

//# sourceURL=/home/xy/.atom/packages/script/lib/script-options-view.coffee
