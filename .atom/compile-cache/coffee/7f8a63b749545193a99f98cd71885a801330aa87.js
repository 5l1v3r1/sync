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
          _this._handleGrammarChangeEvent(editor, editor.getGrammar());
          return editor.displayBuffer.onDidChangeGrammar(function(grammar) {
            return _this._handleGrammarChangeEvent(editor, grammar);
          });
        };
      })(this));
    },
    _handleGrammarChangeEvent: function(editor, grammar) {
      var disposable, eventId, eventName;
      eventName = 'keyup';
      eventId = "" + editor.displayBuffer.id + "." + eventName;
      if (grammar.scopeName === 'source.python') {
        disposable = this._addEventListener(editor, eventName, (function(_this) {
          return function(event) {
            if (event.keyIdentifier === 'U+0028') {
              return _this._completeArguments(editor, editor.getCursorBufferPosition());
            }
          };
        })(this));
        this.disposables.add(disposable);
        this.subscriptions[eventId] = disposable;
        return this._log('Subscribed on event', eventId);
      } else {
        if (eventId in this.subscriptions) {
          this.subscriptions[eventId].dispose();
          return this._log('Unsubscribed from event', eventId);
        }
      }
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
