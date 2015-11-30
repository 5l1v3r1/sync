
/*
 Package dependencies
 */

(function() {
  var FileTypeNotSupportedView, Observer, jsbeautify, packgeConfig;

  jsbeautify = (require('js-beautify')).js_beautify;

  packgeConfig = require('./config');

  Observer = require('./observer');

  FileTypeNotSupportedView = require('./not-supported-view');

  module.exports = {
    config: packgeConfig,
    activate: function(state) {
      atom.commands.add('atom-workspace', 'jsformat:format', (function(_this) {
        return function() {
          return _this.format(state);
        };
      })(this));
      this.editorSaveSubscriptions = {};
      this.editorCloseSubscriptions = {};
      return atom.config.observe('jsformat.format_on_save', (function(_this) {
        return function() {
          return _this.subscribeToEvents();
        };
      })(this));
    },
    format: function(state) {
      var currentCursorPosition, currentPosition, editor, grammar, isBeforeWord, mainCursor, newCursorPosition, nonWhitespaceCharacters, nonWhitespaceRegex, text, textBuffer, textuntilCursor, whitespaceCharacters, whitespaceRegex;
      editor = atom.workspace.getActiveTextEditor();
      if (!editor) {
        return;
      }
      grammar = editor.getGrammar().name;
      if (!(grammar === 'JSON' || /JavaScript/.test(grammar))) {
        return this.displayUnsupportedLanguageNotification(grammar);
      } else if (atom.config.get('jsformat.ignore_files').indexOf(editor.getTitle()) !== -1) {

      } else {
        mainCursor = editor.getCursors()[0];
        textBuffer = editor.getBuffer();
        nonWhitespaceRegex = /\S/g;
        whitespaceRegex = /\s/g;
        currentCursorPosition = mainCursor.getBufferPosition();
        mainCursor.setBufferPosition([currentCursorPosition.row, currentCursorPosition.column + 1]);
        isBeforeWord = mainCursor.isInsideWord();
        mainCursor.setBufferPosition(currentCursorPosition);
        if (mainCursor.isInsideWord()) {
          currentPosition = mainCursor.getBeginningOfCurrentWordBufferPosition();
        } else if (isBeforeWord) {
          mainCursor.setBufferPosition(currentCursorPosition);
          currentPosition = currentCursorPosition;
        }
        textuntilCursor = textBuffer.getTextInRange([[0, 0], currentPosition]);
        nonWhitespaceCharacters = textuntilCursor.match(nonWhitespaceRegex);
        whitespaceCharacters = textuntilCursor.match(whitespaceRegex);
        nonWhitespaceCharacters = nonWhitespaceCharacters ? nonWhitespaceCharacters.length : 0;
        whitespaceCharacters = whitespaceCharacters ? whitespaceCharacters.length : 0;
        this.formatJavascript(editor);
        text = editor.getText();
        newCursorPosition = textBuffer.positionForCharacterIndex(nonWhitespaceCharacters + whitespaceCharacters);
        return mainCursor.setBufferPosition(newCursorPosition);
      }
    },
    formatJavascript: function(editor) {
      var beautifiedText, editorSettings, editorText, opts, selection, _i, _len, _ref, _results;
      editorSettings = atom.config.get('editor');
      opts = atom.config.get('jsformat');
      opts.indent_with_tabs = !editor.getSoftTabs();
      opts.indent_size = editorSettings.tabLength;
      opts.wrap_line_length = editorSettings.preferredLineLength;
      editorText = editor.getText();
      beautifiedText = jsbeautify(editorText, opts);
      if (editorText !== beautifiedText) {
        if (this.selectionsAreEmpty(editor)) {
          return editor.setText(beautifiedText);
        } else {
          _ref = editor.getSelections();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            selection = _ref[_i];
            _results.push(selection.insertText(jsbeautify(selection.getText(), opts), {
              select: true
            }));
          }
          return _results;
        }
      }
    },
    selectionsAreEmpty: function(editor) {
      var selection, _i, _len, _ref;
      _ref = editor.getSelections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        selection = _ref[_i];
        if (!selection.isEmpty()) {
          return false;
        }
      }
      return true;
    },
    subscribeToEvents: function(state) {
      var subscription, subscriptionId, _ref, _ref1, _results;
      if (atom.config.get('jsformat.format_on_save')) {
        return this.editorCreationSubscription = atom.workspace.observeTextEditors((function(_this) {
          return function(editor) {
            var buffer, grammar;
            grammar = editor.getGrammar().scopeName;
            if (grammar === 'source.js' || grammar === 'source.json') {
              buffer = editor.getBuffer();
              _this.editorSaveSubscriptions[editor.id] = buffer.onWillSave(function() {
                if (buffer.isModified()) {
                  return buffer.transact(function() {
                    return _this.format(state);
                  });
                }
              });
              return _this.editorCloseSubscriptions[editor.id] = buffer.onDidDestroy(function() {
                var _ref, _ref1;
                if ((_ref = _this.editorSaveSubscriptions[editor.id]) != null) {
                  _ref.dispose();
                }
                if ((_ref1 = _this.editorCloseSubscriptions[editor.id]) != null) {
                  _ref1.dispose();
                }
                delete _this.editorSaveSubscriptions[editor.id];
                return delete _this.editorCloseSubscriptions[editor.id];
              });
            }
          };
        })(this));
      } else {
        if (this.editorCreationSubscription) {
          this.editorCreationSubscription.dispose();
          this.editorCreationSubscription = null;
          _ref = this.editorSaveSubscriptions;
          for (subscriptionId in _ref) {
            subscription = _ref[subscriptionId];
            subscription.dispose();
            delete this.editorSaveSubscriptions[subscriptionId];
          }
          _ref1 = this.editorCloseSubscriptions;
          _results = [];
          for (subscriptionId in _ref1) {
            subscription = _ref1[subscriptionId];
            subscription.dispose();
            _results.push(delete this.editorCloseSubscriptions[subscriptionId]);
          }
          return _results;
        }
      }
    },
    displayUnsupportedLanguageNotification: function(language) {
      var destroyer, notification;
      notification = new FileTypeNotSupportedView(language);
      atom.views.getView(atom.workspace).append(notification);
      destroyer = function() {
        return notification.detach();
      };
      return setTimeout(destroyer, 1500);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvanNmb3JtYXQvbGliL2Zvcm1hdC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBOztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsNERBQUE7O0FBQUEsRUFHQSxVQUFBLEdBQWEsQ0FBQyxPQUFBLENBQVEsYUFBUixDQUFELENBQXVCLENBQUMsV0FIckMsQ0FBQTs7QUFBQSxFQUtBLFlBQUEsR0FBZSxPQUFBLENBQVEsVUFBUixDQUxmLENBQUE7O0FBQUEsRUFNQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVIsQ0FOWCxDQUFBOztBQUFBLEVBT0Esd0JBQUEsR0FBMkIsT0FBQSxDQUFRLHNCQUFSLENBUDNCLENBQUE7O0FBQUEsRUFTQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQVEsWUFBUjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DLGlCQUFwQyxFQUF1RCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxNQUFELENBQVEsS0FBUixFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdkQsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsdUJBQUQsR0FBMkIsRUFGM0IsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLHdCQUFELEdBQTRCLEVBSDVCLENBQUE7YUFRQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IseUJBQXBCLEVBQStDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQzdDLEtBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBRDZDO1FBQUEs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

//# sourceURL=/home/xy/.atom/packages/jsformat/lib/format.coffee
