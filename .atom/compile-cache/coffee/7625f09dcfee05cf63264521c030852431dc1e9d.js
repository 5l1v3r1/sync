(function() {
  var CodeContext;

  module.exports = CodeContext = (function() {
    CodeContext.prototype.filename = null;

    CodeContext.prototype.filepath = null;

    CodeContext.prototype.lineNumber = null;

    CodeContext.prototype.shebang = null;

    CodeContext.prototype.textSource = null;

    function CodeContext(filename, filepath, textSource) {
      this.filename = filename;
      this.filepath = filepath;
      this.textSource = textSource != null ? textSource : null;
    }

    CodeContext.prototype.fileColonLine = function(fullPath) {
      var fileColonLine;
      if (fullPath == null) {
        fullPath = true;
      }
      if (fullPath) {
        fileColonLine = this.filepath;
      } else {
        fileColonLine = this.filename;
      }
      if (!this.lineNumber) {
        return fileColonLine;
      }
      return "" + fileColonLine + ":" + this.lineNumber;
    };

    CodeContext.prototype.getCode = function(prependNewlines) {
      var code, newlineCount, newlines, _ref;
      if (prependNewlines == null) {
        prependNewlines = true;
      }
      code = (_ref = this.textSource) != null ? _ref.getText() : void 0;
      if (!(prependNewlines && this.lineNumber)) {
        return code;
      }
      newlineCount = Number(this.lineNumber);
      newlines = Array(newlineCount).join("\n");
      return "" + newlines + code;
    };

    CodeContext.prototype.shebangCommand = function() {
      var sections;
      sections = this.shebangSections();
      if (!sections) {
        return;
      }
      return sections[0];
    };

    CodeContext.prototype.shebangCommandArgs = function() {
      var sections;
      sections = this.shebangSections();
      if (!sections) {
        return [];
      }
      return sections.slice(1, +(sections.length - 1) + 1 || 9e9);
    };

    CodeContext.prototype.shebangSections = function() {
      var _ref;
      return (_ref = this.shebang) != null ? _ref.split(' ') : void 0;
    };

    return CodeContext;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9jb2RlLWNvbnRleHQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osMEJBQUEsUUFBQSxHQUFVLElBQVYsQ0FBQTs7QUFBQSwwQkFDQSxRQUFBLEdBQVUsSUFEVixDQUFBOztBQUFBLDBCQUVBLFVBQUEsR0FBWSxJQUZaLENBQUE7O0FBQUEsMEJBR0EsT0FBQSxHQUFTLElBSFQsQ0FBQTs7QUFBQSwwQkFJQSxVQUFBLEdBQVksSUFKWixDQUFBOztBQWFhLElBQUEscUJBQUUsUUFBRixFQUFhLFFBQWIsRUFBd0IsVUFBeEIsR0FBQTtBQUE0QyxNQUEzQyxJQUFDLENBQUEsV0FBQSxRQUEwQyxDQUFBO0FBQUEsTUFBaEMsSUFBQyxDQUFBLFdBQUEsUUFBK0IsQ0FBQTtBQUFBLE1BQXJCLElBQUMsQ0FBQSxrQ0FBQSxhQUFhLElBQU8sQ0FBNUM7SUFBQSxDQWJiOztBQUFBLDBCQW9CQSxhQUFBLEdBQWUsU0FBQyxRQUFELEdBQUE7QUFDYixVQUFBLGFBQUE7O1FBRGMsV0FBVztPQUN6QjtBQUFBLE1BQUEsSUFBRyxRQUFIO0FBQ0UsUUFBQSxhQUFBLEdBQWdCLElBQUMsQ0FBQSxRQUFqQixDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsYUFBQSxHQUFnQixJQUFDLENBQUEsUUFBakIsQ0FIRjtPQUFBO0FBS0EsTUFBQSxJQUFBLENBQUEsSUFBNkIsQ0FBQSxVQUE3QjtBQUFBLGVBQU8sYUFBUCxDQUFBO09BTEE7YUFNQSxFQUFBLEdBQUcsYUFBSCxHQUFpQixHQUFqQixHQUFvQixJQUFDLENBQUEsV0FQUjtJQUFBLENBcEJmLENBQUE7O0FBQUEsMEJBa0NBLE9BQUEsR0FBUyxTQUFDLGVBQUQsR0FBQTtBQUNQLFVBQUEsa0NBQUE7O1FBRFEsa0JBQWtCO09BQzFCO0FBQUEsTUFBQSxJQUFBLDBDQUFrQixDQUFFLE9BQWIsQ0FBQSxVQUFQLENBQUE7QUFDQSxNQUFBLElBQUEsQ0FBQSxDQUFtQixlQUFBLElBQW9CLElBQUMsQ0FBQSxVQUF4QyxDQUFBO0FBQUEsZUFBTyxJQUFQLENBQUE7T0FEQTtBQUFBLE1BR0EsWUFBQSxHQUFlLE1BQUEsQ0FBTyxJQUFDLENBQUEsVUFBUixDQUhmLENBQUE7QUFBQSxNQUlBLFFBQUEsR0FBVyxLQUFBLENBQU0sWUFBTixDQUFtQixDQUFDLElBQXBCLENBQXlCLElBQXpCLENBSlgsQ0FBQTthQUtBLEVBQUEsR0FBRyxRQUFILEdBQWMsS0FOUDtJQUFBLENBbENULENBQUE7O0FBQUEsMEJBNkNBLGNBQUEsR0FBZ0IsU0FBQSxHQUFBO0FBQ2QsVUFBQSxRQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsSUFBQyxDQUFBLGVBQUQsQ0FBQSxDQUFYLENBQUE7QUFDQSxNQUFBLElBQUEsQ0FBQSxRQUFBO0FBQUEsY0FBQSxDQUFBO09BREE7YUFHQSxRQUFTLENBQUEsQ0FBQSxFQUpLO0lBQUEsQ0E3Q2hCLENBQUE7O0FBQUEsMEJBdURBLGtCQUFBLEdBQW9CLFNBQUEsR0FBQTtBQUNsQixVQUFBLFFBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxJQUFDLENBQUEsZUFBRCxDQUFBLENBQVgsQ0FBQTtBQUNBLE1BQUEsSUFBQSxDQUFBLFFBQUE7QUFBQSxlQUFPLEVBQVAsQ0FBQTtPQURBO2FBR0EsUUFBUyw2Q0FKUztJQUFBLENBdkRwQixDQUFBOztBQUFBLDBCQWlFQSxlQUFBLEdBQWlCLFNBQUEsR0FBQTtBQUNmLFVBQUEsSUFBQTtpREFBUSxDQUFFLEtBQVYsQ0FBZ0IsR0FBaEIsV0FEZTtJQUFBLENBakVqQixDQUFBOzt1QkFBQTs7TUFGRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/script/lib/code-context.coffee
