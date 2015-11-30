(function() {
  var $$, AnsiFilter, HeaderView, ScriptOptionsView, ScriptView, View, linkPaths, stripAnsi, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  HeaderView = require('./header-view');

  ScriptOptionsView = require('./script-options-view');

  _ref = require('atom-space-pen-views'), View = _ref.View, $$ = _ref.$$;

  AnsiFilter = require('ansi-to-html');

  stripAnsi = require('strip-ansi');

  linkPaths = require('./link-paths');

  _ = require('underscore');

  module.exports = ScriptView = (function(_super) {
    __extends(ScriptView, _super);

    function ScriptView() {
      this.setHeaderAndShowExecutionTime = __bind(this.setHeaderAndShowExecutionTime, this);
      return ScriptView.__super__.constructor.apply(this, arguments);
    }

    ScriptView.results = "";

    ScriptView.content = function() {
      return this.div((function(_this) {
        return function() {
          var css;
          _this.subview('headerView', new HeaderView());
          css = 'tool-panel panel panel-bottom padding script-view native-key-bindings';
          return _this.div({
            "class": css,
            outlet: 'script',
            tabindex: -1
          }, function() {
            return _this.div({
              "class": 'panel-body padded output',
              outlet: 'output'
            });
          });
        };
      })(this));
    };

    ScriptView.prototype.initialize = function(serializeState) {
      this.ansiFilter = new AnsiFilter;
      return linkPaths.listen(this);
    };

    ScriptView.prototype.serialize = function() {};

    ScriptView.prototype.setHeaderAndShowExecutionTime = function(returnCode, executionTime) {
      this.display('stdout', '[Finished in ' + executionTime.toString() + 's]');
      if (returnCode === 0) {
        return this.setHeaderStatus('stop');
      } else {
        return this.setHeaderStatus('err');
      }
    };

    ScriptView.prototype.resetView = function(title) {
      if (title == null) {
        title = 'Loading...';
      }
      if (!this.hasParent()) {
        atom.workspace.addBottomPanel({
          item: this
        });
      }
      this.stop();
      this.headerView.title.text(title);
      this.headerView.setStatus('start');
      this.output.empty();
      return this.results = "";
    };

    ScriptView.prototype.close = function() {
      var grandParent;
      this.stop();
      if (this.hasParent()) {
        grandParent = this.script.parent().parent();
        this.detach();
        return grandParent.remove();
      }
    };

    ScriptView.prototype.stop = function() {
      this.display('stdout', '^C');
      return this.headerView.setStatus('kill');
    };

    ScriptView.prototype.createGitHubIssueLink = function(argType, lang) {
      var body, encodedURI, err, title;
      title = "Add " + argType + " support for " + lang;
      body = "##### Platform: `" + process.platform + "`\n---";
      encodedURI = encodeURI("https://github.com/rgbkrk/atom-script/issues/new?title=" + title + "&body=" + body);
      encodedURI = encodedURI.replace(/#/g, '%23');
      err = $$(function() {
        this.p({
          "class": 'block'
        }, "" + argType + " runner not available for " + lang + ".");
        return this.p({
          "class": 'block'
        }, (function(_this) {
          return function() {
            _this.text('If it should exist, add an ');
            _this.a({
              href: encodedURI
            }, 'issue on GitHub');
            return _this.text(', or send your own pull request.');
          };
        })(this));
      });
      return this.handleError(err);
    };

    ScriptView.prototype.showUnableToRunError = function(command) {
      return this.output.append($$(function() {
        this.h1('Unable to run');
        this.pre(_.escape(command));
        this.h2('Did you start Atom from the command line?');
        this.pre('  atom .');
        this.h2('Is it in your PATH?');
        return this.pre("PATH: " + (_.escape(process.env.PATH)));
      }));
    };

    ScriptView.prototype.showNoLanguageSpecified = function() {
      var err;
      err = $$(function() {
        return this.p('You must select a language in the lower right, or save the file with an appropriate extension.');
      });
      return this.handleError(err);
    };

    ScriptView.prototype.showLanguageNotSupported = function(lang) {
      var err;
      err = $$(function() {
        this.p({
          "class": 'block'
        }, "Command not configured for " + lang + "!");
        return this.p({
          "class": 'block'
        }, (function(_this) {
          return function() {
            _this.text('Add an ');
            _this.a({
              href: "https://github.com/rgbkrk/atom-script/issues/new?title=Add%20support%20for%20" + lang
            }, 'issue on GitHub');
            return _this.text(' or send your own Pull Request.');
          };
        })(this));
      });
      return this.handleError(err);
    };

    ScriptView.prototype.handleError = function(err) {
      this.headerView.title.text('Error');
      this.headerView.setStatus('err');
      this.output.append(err);
      return this.stop();
    };

    ScriptView.prototype.setHeaderStatus = function(status) {
      return this.headerView.setStatus(status);
    };

    ScriptView.prototype.setHeaderTitle = function(title) {
      return this.headerView.title.text(title);
    };

    ScriptView.prototype.display = function(css, line) {
      var lessThanFull, padding, scrolledToEnd;
      this.results += line;
      if (atom.config.get('script.escapeConsoleOutput')) {
        line = _.escape(line);
      }
      line = this.ansiFilter.toHtml(line);
      line = linkPaths(line);
      padding = parseInt(this.output.css('padding-bottom'));
      scrolledToEnd = this.script.scrollBottom() === (padding + this.output.trueHeight());
      lessThanFull = this.output.trueHeight() <= this.script.trueHeight();
      this.output.append($$(function() {
        return this.pre({
          "class": "line " + css
        }, (function(_this) {
          return function() {
            return _this.raw(line);
          };
        })(this));
      }));
      if (atom.config.get('script.scrollWithOutput')) {
        if (lessThanFull || scrolledToEnd) {
          return this.checkScrollAgain(5)();
        }
      }
    };

    ScriptView.prototype.scrollTimeout = null;

    ScriptView.prototype.checkScrollAgain = function(times) {
      return (function(_this) {
        return function() {
          _this.script.scrollToBottom();
          clearTimeout(_this.scrollTimeout);
          if (times > 1) {
            return _this.scrollTimeout = setTimeout(_this.checkScrollAgain(times - 1), 50);
          }
        };
      })(this);
    };

    ScriptView.prototype.copyResults = function() {
      if (this.results) {
        return atom.clipboard.write(stripAnsi(this.results));
      }
    };

    return ScriptView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9zY3JpcHQtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsOEZBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVIsQ0FBYixDQUFBOztBQUFBLEVBQ0EsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLHVCQUFSLENBRHBCLENBQUE7O0FBQUEsRUFHQSxPQUFhLE9BQUEsQ0FBUSxzQkFBUixDQUFiLEVBQUMsWUFBQSxJQUFELEVBQU8sVUFBQSxFQUhQLENBQUE7O0FBQUEsRUFLQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGNBQVIsQ0FMYixDQUFBOztBQUFBLEVBTUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxZQUFSLENBTlosQ0FBQTs7QUFBQSxFQU9BLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQVBaLENBQUE7O0FBQUEsRUFRQSxDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVIsQ0FSSixDQUFBOztBQUFBLEVBV0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLGlDQUFBLENBQUE7Ozs7O0tBQUE7O0FBQUEsSUFBQSxVQUFDLENBQUEsT0FBRCxHQUFVLEVBQVYsQ0FBQTs7QUFBQSxJQUVBLFVBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ0gsY0FBQSxHQUFBO0FBQUEsVUFBQSxLQUFDLENBQUEsT0FBRCxDQUFTLFlBQVQsRUFBMkIsSUFBQSxVQUFBLENBQUEsQ0FBM0IsQ0FBQSxDQUFBO0FBQUEsVUFHQSxHQUFBLEdBQU0sdUVBSE4sQ0FBQTtpQkFLQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxP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

//# sourceURL=/home/xy/.atom/packages/script/lib/script-view.coffee
