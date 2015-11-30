(function() {
  var BufferedProcess, CompositeDisposable, DefinitionsView, Disposable, Selector, filter, path, selectorsMatchScopeChain, _ref,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = require('atom'), Disposable = _ref.Disposable, CompositeDisposable = _ref.CompositeDisposable, BufferedProcess = _ref.BufferedProcess;

  selectorsMatchScopeChain = require('./scope-helpers').selectorsMatchScopeChain;

  Selector = require('selector-kit').Selector;

  path = require('path');

  DefinitionsView = require('./definitions-view');

  filter = void 0;

  module.exports = {
    selector: '.source.python',
    disableForSelector: '.source.python .comment, .source.python .string',
    inclusionPriority: 1,
    suggestionPriority: 2,
    excludeLowerPriority: true,
    _log: function() {
      var msg;
      msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (atom.config.get('autocomplete-python.outputDebug')) {
        return console.debug.apply(console, msg);
      }
    },
    _addEventListener: function(editor, eventName, handler) {
      var disposable, editorView;
      editorView = atom.views.getView(editor);
      editorView.addEventListener(eventName, handler);
      disposable = new Disposable((function(_this) {
        return function() {
          _this._log('Unsubscribing from event listener ', eventName, handler);
          return editorView.removeEventListener(eventName, handler);
        };
      })(this));
      return disposable;
    },
    _possiblePythonPaths: function() {
      if (/^win/.test(process.platform)) {
        return ['C:\\Python2.7', 'C:\\Python3.4', 'C:\\Python3.5', 'C:\\Program Files (x86)\\Python 2.7', 'C:\\Program Files (x86)\\Python 3.4', 'C:\\Program Files (x86)\\Python 3.5', 'C:\\Program Files (x64)\\Python 2.7', 'C:\\Program Files (x64)\\Python 3.4', 'C:\\Program Files (x64)\\Python 3.5', 'C:\\Program Files\\Python 2.7', 'C:\\Program Files\\Python 3.4', 'C:\\Program Files\\Python 3.5'];
      } else {
        return ['/usr/local/bin', '/usr/bin', '/bin', '/usr/sbin', '/sbin'];
      }
    },
    constructor: function() {
      var env, p, path_env, pythonPath, selector, _i, _len, _ref1;
      this.requests = {};
      this.disposables = new CompositeDisposable;
      this.subscriptions = {};
      this.definitionsView = null;
      this.snippetsManager = null;
      pythonPath = atom.config.get('autocomplete-python.pythonPath');
      env = process.env;
      path_env = (env.PATH || '').split(path.delimiter);
      if (pythonPath && __indexOf.call(path_env, pythonPath) < 0) {
        path_env.unshift(pythonPath);
      }
      _ref1 = this._possiblePythonPaths();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        p = _ref1[_i];
        if (__indexOf.call(path_env, p) < 0) {
          path_env.push(p);
        }
      }
      env.PATH = path_env.join(path.delimiter);
      this.provider = new BufferedProcess({
        command: atom.config.get('autocomplete-python.pythonExecutable'),
        args: [__dirname + '/completion.py'],
        options: {
          env: env
        },
        stdout: (function(_this) {
          return function(data) {
            return _this._deserialize(data);
          };
        })(this),
        stderr: (function(_this) {
          return function(data) {
            _this._log("autocomplete-python traceback output: " + data);
            if (atom.config.get('autocomplete-python.outputProviderErrors')) {
              return atom.notifications.addError('autocomplete-python traceback output:', {
                detail: "" + data,
                dismissable: true
              });
            }
          };
        })(this),
        exit: (function(_this) {
          return function(code) {
            return console.warn('autocomplete-python:exit', code, _this.provider);
          };
        })(this)
      });
      this.provider.onWillThrowError((function(_this) {
        return function(_arg) {
          var error, handle;
          error = _arg.error, handle = _arg.handle;
          if (error.code === 'ENOENT' && error.syscall.indexOf('spawn') === 0) {
            atom.notifications.addWarning(["autocomplete-python unable to find python executable. Please set", "the path to python directory manually in the package settings and", "restart your editor"].join(' '), {
              detail: [error, "Current path config: " + env.PATH].join('\n'),
              dismissable: true
            });
            _this.dispose();
            return handle();
          } else {
            throw error;
          }
        };
      })(this));
      setTimeout((function(_this) {
        return function() {
          _this._log('Killing python process after timeout...');
          if (_this.provider && _this.provider.process) {
            return _this.provider.process.kill();
          }
        };
      })(this), 60 * 30 * 1000);
      selector = 'atom-text-editor[data-grammar~=python]';
      atom.commands.add(selector, 'autocomplete-python:go-to-definition', (function(_this) {
        return function() {
          return _this.goToDefinition();
        };
      })(this));
      atom.commands.add(selector, 'autocomplete-python:complete-arguments', (function(_this) {
        return function() {
          var editor;
          editor = atom.workspace.getActiveTextEditor();
          return _this._completeArguments(editor, editor.getCursorBufferPosition(), true);
        };
      })(this));
      return atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          return editor.displayBuffer.onDidChangeGrammar(function(grammar) {
            var disposable, eventId, eventName;
            eventName = 'keyup';
            eventId = "" + editor.displayBuffer.id + "." + eventName;
            if (grammar.scopeName === 'source.python') {
              disposable = _this._addEventListener(editor, eventName, function(event) {
                if (event.keyIdentifier === 'U+0028') {
                  return _this._completeArguments(editor, editor.getCursorBufferPosition());
                }
              });
              _this.disposables.add(disposable);
              _this.subscriptions[eventId] = disposable;
              return _this._log('Subscribed on event', eventId);
            } else {
              if (eventId in _this.subscriptions) {
                _this.subscriptions[eventId].dispose();
                return _this._log('Unsubscribed from event', eventId);
              }
            }
          });
        };
      })(this));
    },
    _serialize: function(request) {
      this._log('Serializing request to be sent to Jedi', request);
      return JSON.stringify(request);
    },
    _sendRequest: function(data, respawned) {
      var process;
      if (this.provider && this.provider.process) {
        process = this.provider.process;
        if (process.exitCode === null && process.signalCode === null) {
          return this.provider.process.stdin.write(data + '\n');
        } else if (respawned) {
          atom.notifications.addWarning(["Failed to spawn daemon for autocomplete-python.", "Completions will not work anymore", "unless you restart your editor."].join(' '), {
            detail: ["exitCode: " + process.exitCode, "signalCode: " + process.signalCode].join('\n'),
            dismissable: true
          });
          return this.dispose();
        } else {
          this.constructor();
          this._sendRequest(data, {
            respawned: true
          });
          return console.debug('Re-spawning python process...');
        }
      } else {
        return console.debug('Attempt to communicate with terminated process', this.provider);
      }
    },
    _deserialize: function(response) {
      var bufferPosition, editor, resolve, _i, _len, _ref1, _ref2, _results;
      this._log('Deserealizing response from Jedi', response);
      this._log("Got " + (response.trim().split('\n').length) + " lines");
      this._log('Pending requests:', this.requests);
      _ref1 = response.trim().split('\n');
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        response = _ref1[_i];
        response = JSON.parse(response);
        if (response['arguments']) {
          editor = this.requests[response['id']];
          if (typeof editor === 'object') {
            bufferPosition = editor.getCursorBufferPosition();
            if (response['id'] === this._generateRequestId(editor, bufferPosition)) {
              if ((_ref2 = this.snippetsManager) != null) {
                _ref2.insertSnippet(response['arguments'], editor);
              }
            }
          }
        } else {
          resolve = this.requests[response['id']];
          if (typeof resolve === 'function') {
            resolve(response['results']);
          }
        }
        _results.push(delete this.requests[response['id']]);
      }
      return _results;
    },
    _generateRequestId: function(editor, bufferPosition) {
      return require('crypto').createHash('md5').update([editor.getPath(), editor.getText(), bufferPosition.row, bufferPosition.column].join()).digest('hex');
    },
    _generateRequestConfig: function() {
      var args, extraPaths, modified, p, project, _i, _j, _len, _len1, _ref1, _ref2;
      extraPaths = [];
      _ref1 = atom.config.get('autocomplete-python.extraPaths').split(';');
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        p = _ref1[_i];
        _ref2 = atom.project.getPaths();
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          project = _ref2[_j];
          modified = p.replace('$PROJECT', project);
          if (__indexOf.call(extraPaths, modified) < 0) {
            extraPaths.push(modified);
          }
        }
      }
      args = {
        'extraPaths': extraPaths,
        'useSnippets': atom.config.get('autocomplete-python.useSnippets'),
        'caseInsensitiveCompletion': atom.config.get('autocomplete-python.caseInsensitiveCompletion'),
        'showDescriptions': atom.config.get('autocomplete-python.showDescriptions'),
        'fuzzyMatcher': atom.config.get('autocomplete-python.fuzzyMatcher')
      };
      return args;
    },
    setSnippetsManager: function(snippetsManager) {
      this.snippetsManager = snippetsManager;
    },
    _completeArguments: function(editor, bufferPosition, force) {
      var disableForSelector, payload, scopeChain, scopeDescriptor, useSnippets;
      useSnippets = atom.config.get('autocomplete-python.useSnippets');
      if (!force && useSnippets === 'none') {
        return;
      }
      this._log('Trying to complete arguments after left parenthesis...');
      scopeDescriptor = editor.scopeDescriptorForBufferPosition(bufferPosition);
      scopeChain = scopeDescriptor.getScopeChain();
      disableForSelector = Selector.create(this.disableForSelector);
      if (selectorsMatchScopeChain(disableForSelector, scopeChain)) {
        this._log('Ignoring argument completion inside of', scopeChain);
        return;
      }
      payload = {
        id: this._generateRequestId(editor, bufferPosition),
        lookup: 'arguments',
        path: editor.getPath(),
        source: editor.getText(),
        line: bufferPosition.row,
        column: bufferPosition.column,
        config: this._generateRequestConfig()
      };
      this._sendRequest(this._serialize(payload));
      return new Promise((function(_this) {
        return function() {
          return _this.requests[payload.id] = editor;
        };
      })(this));
    },
    getSuggestions: function(_arg) {
      var bufferPosition, column, editor, lastIdentifier, line, payload, prefix, scopeDescriptor;
      editor = _arg.editor, bufferPosition = _arg.bufferPosition, scopeDescriptor = _arg.scopeDescriptor, prefix = _arg.prefix;
      if ((prefix !== '.' && prefix !== ' ') && (prefix.length < 1 || /\W/.test(prefix))) {
        return [];
      }
      if (atom.config.get('autocomplete-python.fuzzyMatcher')) {
        line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
        lastIdentifier = /[a-zA-Z_][a-zA-Z0-9_]*$/.exec(line);
        if (lastIdentifier) {
          column = lastIdentifier.index;
        } else {
          column = bufferPosition.column;
        }
      } else {
        column = bufferPosition.column;
      }
      payload = {
        id: this._generateRequestId(editor, bufferPosition),
        prefix: prefix,
        lookup: 'completions',
        path: editor.getPath(),
        source: editor.getText(),
        line: bufferPosition.row,
        column: column,
        config: this._generateRequestConfig()
      };
      this._sendRequest(this._serialize(payload));
      return new Promise((function(_this) {
        return function(resolve) {
          if (atom.config.get('autocomplete-python.fuzzyMatcher')) {
            return _this.requests[payload.id] = function(matches) {
              if (matches.length !== 0 && prefix !== '.') {
                if (filter == null) {
                  filter = require('fuzzaldrin').filter;
                }
                matches = filter(matches, prefix, {
                  key: 'snippet'
                });
              }
              return resolve(matches);
            };
          } else {
            return _this.requests[payload.id] = resolve;
          }
        };
      })(this));
    },
    getDefinitions: function(editor, bufferPosition) {
      var payload;
      payload = {
        id: this._generateRequestId(editor, bufferPosition),
        lookup: 'definitions',
        path: editor.getPath(),
        source: editor.getText(),
        line: bufferPosition.row,
        column: bufferPosition.column,
        config: this._generateRequestConfig()
      };
      this._sendRequest(this._serialize(payload));
      return new Promise((function(_this) {
        return function(resolve) {
          return _this.requests[payload.id] = resolve;
        };
      })(this));
    },
    goToDefinition: function(editor, bufferPosition) {
      if (!editor) {
        editor = atom.workspace.getActiveTextEditor();
      }
      if (!bufferPosition) {
        bufferPosition = editor.getCursorBufferPosition();
      }
      if (this.definitionsView) {
        this.definitionsView.destroy();
      }
      this.definitionsView = new DefinitionsView();
      return this.getDefinitions(editor, bufferPosition).then((function(_this) {
        return function(results) {
          _this.definitionsView.setItems(results);
          if (results.length === 1) {
            return _this.definitionsView.confirmed(results[0]);
          }
        };
      })(this));
    },
    dispose: function() {
      this.disposables.dispose();
      return this.provider.kill();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLXB5dGhvbi9saWIvcHJvdmlkZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlIQUFBO0lBQUE7eUpBQUE7O0FBQUEsRUFBQSxPQUFxRCxPQUFBLENBQVEsTUFBUixDQUFyRCxFQUFDLGtCQUFBLFVBQUQsRUFBYSwyQkFBQSxtQkFBYixFQUFrQyx1QkFBQSxlQUFsQyxDQUFBOztBQUFBLEVBQ0MsMkJBQTRCLE9BQUEsQ0FBUSxpQkFBUixFQUE1Qix3QkFERCxDQUFBOztBQUFBLEVBRUMsV0FBWSxPQUFBLENBQVEsY0FBUixFQUFaLFFBRkQsQ0FBQTs7QUFBQSxFQUdBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUhQLENBQUE7O0FBQUEsRUFJQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxvQkFBUixDQUpsQixDQUFBOztBQUFBLEVBS0EsTUFBQSxHQUFTLE1BTFQsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxnQkFBVjtBQUFBLElBQ0Esa0JBQUEsRUFBb0IsaURBRHBCO0FBQUEsSUFFQSxpQkFBQSxFQUFtQixDQUZuQjtBQUFBLElBR0Esa0JBQUEsRUFBb0IsQ0FIcEI7QUFBQSxJQUlBLG9CQUFBLEVBQXNCLElBSnRCO0FBQUEsSUFNQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSxHQUFBO0FBQUEsTUFESyw2REFDTCxDQUFBO0FBQUEsTUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixpQ0FBaEIsQ0FBSDtBQUNFLGVBQU8sT0FBTyxDQUFDLEtBQVIsZ0JBQWMsR0FBZCxDQUFQLENBREY7T0FESTtJQUFBLENBTk47QUFBQSxJQVVBLGlCQUFBLEVBQW1CLFNB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

//# sourceURL=/home/xy/.atom/packages/autocomplete-python/lib/provider.coffee
