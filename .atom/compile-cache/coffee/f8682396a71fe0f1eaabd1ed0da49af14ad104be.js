(function() {
  var CodeContext, CodeContextBuilder, Emitter, grammarMap;

  CodeContext = require('./code-context');

  grammarMap = require('./grammars');

  Emitter = require('atom').Emitter;

  module.exports = CodeContextBuilder = (function() {
    function CodeContextBuilder(emitter) {
      this.emitter = emitter != null ? emitter : new Emitter;
    }

    CodeContextBuilder.prototype.destroy = function() {
      return this.emitter.dispose();
    };

    CodeContextBuilder.prototype.buildCodeContext = function(editor, argType) {
      var codeContext, cursor;
      if (argType == null) {
        argType = 'Selection Based';
      }
      if (editor == null) {
        return;
      }
      codeContext = this.initCodeContext(editor);
      codeContext.argType = argType;
      if (argType === 'Line Number Based') {
        editor.save();
      } else if (codeContext.selection.isEmpty() && (codeContext.filepath != null)) {
        codeContext.argType = 'File Based';
        editor.save();
      }
      if (argType !== 'File Based') {
        cursor = editor.getLastCursor();
        codeContext.lineNumber = cursor.getScreenRow() + 1;
      }
      return codeContext;
    };

    CodeContextBuilder.prototype.initCodeContext = function(editor) {
      var codeContext, filename, filepath, lang, selection, textSource;
      filename = editor.getTitle();
      filepath = editor.getPath();
      selection = editor.getLastSelection();
      if (selection.isEmpty()) {
        textSource = editor;
      } else {
        textSource = selection;
      }
      codeContext = new CodeContext(filename, filepath, textSource);
      codeContext.selection = selection;
      codeContext.shebang = this.getShebang(editor);
      lang = this.getLang(editor);
      if (this.validateLang(lang)) {
        codeContext.lang = lang;
      }
      return codeContext;
    };

    CodeContextBuilder.prototype.getShebang = function(editor) {
      var firstLine, lines, text;
      text = editor.getText();
      lines = text.split("\n");
      firstLine = lines[0];
      if (!firstLine.match(/^#!/)) {
        return;
      }
      return firstLine.replace(/^#!\s*/, '');
    };

    CodeContextBuilder.prototype.getLang = function(editor) {
      return editor.getGrammar().name;
    };

    CodeContextBuilder.prototype.validateLang = function(lang) {
      var valid;
      valid = true;
      if (lang === 'Null Grammar' || lang === 'Plain Text') {
        this.emitter.emit('did-not-specify-language');
        valid = false;
      } else if (!(lang in grammarMap)) {
        this.emitter.emit('did-not-support-language', {
          lang: lang
        });
        valid = false;
      }
      return valid;
    };

    CodeContextBuilder.prototype.onDidNotSpecifyLanguage = function(callback) {
      return this.emitter.on('did-not-specify-language', callback);
    };

    CodeContextBuilder.prototype.onDidNotSupportLanguage = function(callback) {
      return this.emitter.on('did-not-support-language', callback);
    };

    return CodeContextBuilder;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9jb2RlLWNvbnRleHQtYnVpbGRlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0RBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsWUFBUixDQURiLENBQUE7O0FBQUEsRUFHQyxVQUFXLE9BQUEsQ0FBUSxNQUFSLEVBQVgsT0FIRCxDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNTLElBQUEsNEJBQUUsT0FBRixHQUFBO0FBQTBCLE1BQXpCLElBQUMsQ0FBQSw0QkFBQSxVQUFVLEdBQUEsQ0FBQSxPQUFjLENBQTFCO0lBQUEsQ0FBYjs7QUFBQSxpQ0FFQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULENBQUEsRUFETztJQUFBLENBRlQsQ0FBQTs7QUFBQSxpQ0FlQSxnQkFBQSxHQUFrQixTQUFDLE1BQUQsRUFBUyxPQUFULEdBQUE7QUFDaEIsVUFBQSxtQkFBQTs7UUFEeUIsVUFBUTtPQUNqQztBQUFBLE1BQUEsSUFBYyxjQUFkO0FBQUEsY0FBQSxDQUFBO09BQUE7QUFBQSxNQUVBLFdBQUEsR0FBYyxJQUFDLENBQUEsZUFBRCxDQUFpQixNQUFqQixDQUZkLENBQUE7QUFBQSxNQUlBLFdBQVcsQ0FBQyxPQUFaLEdBQXNCLE9BSnRCLENBQUE7QUFNQSxNQUFBLElBQUcsT0FBQSxLQUFXLG1CQUFkO0FBQ0UsUUFBQSxNQUFNLENBQUMsSUFBUCxDQUFBLENBQUEsQ0FERjtPQUFBLE1BRUssSUFBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQXRCLENBQUEsQ0FBQSxJQUFvQyw4QkFBdkM7QUFD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

//# sourceURL=/home/xy/.atom/packages/script/lib/code-context-builder.coffee
