(function() {
  var _;

  _ = require('underscore');

  module.exports = {
    splitStatements: function(code) {
      var iterator, statements;
      iterator = function(statements, currentCharacter, _memo, _context) {
        if (this.parenDepth == null) {
          this.parenDepth = 0;
        }
        if (currentCharacter === '(') {
          this.parenDepth += 1;
          this.inStatement = true;
        } else if (currentCharacter === ')') {
          this.parenDepth -= 1;
        }
        if (this.statement == null) {
          this.statement = '';
        }
        this.statement += currentCharacter;
        if (this.parenDepth === 0 && this.inStatement) {
          this.inStatement = false;
          statements.push(this.statement.trim());
          this.statement = '';
        }
        return statements;
      };
      statements = _.reduce(code.trim(), iterator, [], {});
      return statements;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL2xpc3AuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLENBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVIsQ0FBSixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FJRTtBQUFBLElBQUEsZUFBQSxFQUFpQixTQUFDLElBQUQsR0FBQTtBQUNmLFVBQUEsb0JBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxTQUFDLFVBQUQsRUFBYSxnQkFBYixFQUErQixLQUEvQixFQUFzQyxRQUF0QyxHQUFBOztVQUNULElBQUMsQ0FBQSxhQUFjO1NBQWY7QUFDQSxRQUFBLElBQUcsZ0JBQUEsS0FBb0IsR0FBdkI7QUFDRSxVQUFBLElBQUMsQ0FBQSxVQUFELElBQWUsQ0FBZixDQUFBO0FBQUEsVUFDQSxJQUFDLENBQUEsV0FBRCxHQUFlLElBRGYsQ0FERjtTQUFBLE1BR0ssSUFBRyxnQkFBQSxLQUFvQixHQUF2QjtBQUNILFVBQUEsSUFBQyxDQUFBLFVBQUQsSUFBZSxDQUFmLENBREc7U0FKTDs7VUFPQSxJQUFDLENBQUEsWUFBYTtTQVBkO0FBQUEsUUFRQSxJQUFDLENBQUEsU0FBRCxJQUFjLGdCQVJkLENBQUE7QUFVQSxRQUFBLElBQUcsSUFBQyxDQUFBLFVBQUQsS0FBZSxDQUFmLElBQXFCLElBQUMsQ0FBQSxXQUF6QjtBQUNFLFVBQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxLQUFmLENBQUE7QUFBQSxVQUNBLFVBQVUsQ0FBQyxJQUFYLENBQWdCLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFBLENBQWhCLENBREEsQ0FBQTtBQUFBLFVBRUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxFQUZiLENBREY7U0FWQTtBQWVBLGVBQU8sVUFBUCxDQWhCUztNQUFBLENBQVgsQ0FBQTtBQUFBLE1Ba0JBLFVBQUEsR0FBYSxDQUFDLENBQUMsTUFBRixDQUFTLElBQUksQ0FBQyxJQUFMLENBQUEsQ0FBVCxFQUFzQixRQUF0QixFQUFnQyxFQUFoQyxFQUFvQyxFQUFwQyxDQWxCYixDQUFBO0FBb0JBLGFBQU8sVUFBUCxDQXJCZTtJQUFBLENBQWpCO0dBUkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/xy/.atom/packages/script/lib/grammar-utils/lisp.coffee
