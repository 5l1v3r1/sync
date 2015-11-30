(function() {
  var GrammarUtils;

  GrammarUtils = require('../../lib/grammar-utils');

  describe('GrammarUtils', function() {
    return describe('Lisp', function() {
      var toStatements;
      toStatements = GrammarUtils.Lisp.splitStatements;
      it('returns empty array for empty code', function() {
        var code;
        code = '';
        return expect(toStatements(code)).toEqual([]);
      });
      it('does not split single statement', function() {
        var code;
        code = '(print "dummy")';
        return expect(toStatements(code)).toEqual([code]);
      });
      it('splits two simple statements', function() {
        var code;
        code = '(print "dummy")(print "statement")';
        return expect(toStatements(code)).toEqual(['(print "dummy")', '(print "statement")']);
      });
      it('splits two simple statements in many lines', function() {
        var code;
        code = '(print "dummy")  \n\n  (print "statement")';
        return expect(toStatements(code)).toEqual(['(print "dummy")', '(print "statement")']);
      });
      it('does not split single line complex statement', function() {
        var code;
        code = '(when t(setq a 2)(+ i 1))';
        return expect(toStatements(code)).toEqual(['(when t(setq a 2)(+ i 1))']);
      });
      it('does not split multi line complex statement', function() {
        var code;
        code = '(when t(setq a 2)  \n \t (+ i 1))';
        return expect(toStatements(code)).toEqual(['(when t(setq a 2)  \n \t (+ i 1))']);
      });
      it('splits single line complex statements', function() {
        var code;
        code = '(when t(setq a 2)(+ i 1))(when t(setq a 5)(+ i 3))';
        return expect(toStatements(code)).toEqual(['(when t(setq a 2)(+ i 1))', '(when t(setq a 5)(+ i 3))']);
      });
      return it('splits multi line complex statements', function() {
        var code;
        code = '(when t(\nsetq a 2)(+ i 1))   \n\t (when t(\n\t  setq a 5)(+ i 3))';
        return expect(toStatements(code)).toEqual(['(when t(\nsetq a 2)(+ i 1))', '(when t(\n\t  setq a 5)(+ i 3))']);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L3NwZWMvZ3JhbW1hci11dGlscy9saXNwLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFlBQUE7O0FBQUEsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLHlCQUFSLENBQWYsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUEsR0FBQTtXQUN2QixRQUFBLENBQVMsTUFBVCxFQUFpQixTQUFBLEdBQUE7QUFDZixVQUFBLFlBQUE7QUFBQSxNQUFBLFlBQUEsR0FBZSxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWpDLENBQUE7QUFBQSxNQUVBLEVBQUEsQ0FBRyxvQ0FBSCxFQUF5QyxTQUFBLEdBQUE7QUFDdkMsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sRUFBUCxDQUFBO2VBQ0EsTUFBQSxDQUFPLFlBQUEsQ0FBYSxJQUFiLENBQVAsQ0FBMEIsQ0FBQyxPQUEzQixDQUFtQyxFQUFuQyxFQUZ1QztNQUFBLENBQXpDLENBRkEsQ0FBQTtBQUFBLE1BTUEsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUEsR0FBQTtBQUNwQyxZQUFBLElBQUE7QUFBQSxRQUFBLElBQUEsR0FBTyxpQkFBUCxDQUFBO2VBQ0EsTUFBQSxDQUFPLFlBQUEsQ0FBYSxJQUFiLENBQVAsQ0FBMEIsQ0FBQyxPQUEzQixDQUFtQyxDQUFDLElBQUQsQ0FBbkMsRUFGb0M7TUFBQSxDQUF0QyxDQU5BLENBQUE7QUFBQSxNQVVBLEVBQUEsQ0FBRyw4QkFBSCxFQUFtQyxTQUFBLEdBQUE7QUFDakMsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sb0NBQVAsQ0FBQTtlQUNBLE1BQUEsQ0FBTyxZQUFBLENBQWEsSUFBYixDQUFQLENBQTBCLENBQUMsT0FBM0IsQ0FBbUMsQ0FBQyxpQkFBRCxFQUFvQixxQkFBcEIsQ0FBbkMsRUFGaUM7TUFBQSxDQUFuQyxDQVZBLENBQUE7QUFBQSxNQWNBLEVBQUEsQ0FBRyw0Q0FBSCxFQUFpRCxTQUFBLEdBQUE7QUFDL0MsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sNENBQVAsQ0FBQTtlQUNBLE1BQUEsQ0FBTyxZQUFBLENBQWEsSUFBYixDQUFQLENBQTBCLENBQUMsT0FBM0IsQ0FBbUMsQ0FBQyxpQkFBRCxFQUFvQixxQkFBcEIsQ0FBbkMsRUFGK0M7TUFBQSxDQUFqRCxDQWRBLENBQUE7QUFBQSxNQWtCQSxFQUFBLENBQUcsOENBQUgsRUFBbUQsU0FBQSxHQUFBO0FBQ2pELFlBQUEsSUFBQTtBQUFBLFFBQUEsSUFBQSxHQUFPLDJCQUFQLENBQUE7ZUFDQSxNQUFBLENBQU8sWUFBQSxDQUFhLElBQWIsQ0FBUCxDQUEwQixDQUFDLE9BQTNCLENBQW1DLENBQUMsMkJBQUQsQ0FBbkMsRUFGaUQ7TUFBQSxDQUFuRCxDQWxCQSxDQUFBO0FBQUEsTUFzQkEsRUFBQSxDQUFHLDZDQUFILEVBQWtELFNBQUEsR0FBQTtBQUNoRCxZQUFBLElBQUE7QUFBQSxRQUFBLElBQUEsR0FBTyxtQ0FBUCxDQUFBO2VBQ0EsTUFBQSxDQUFPLFlBQUEsQ0FBYSxJQUFiLENBQVAsQ0FBMEIsQ0FBQyxPQUEzQixDQUFtQyxDQUFDLG1DQUFELENBQW5DLEVBRmdEO01BQUEsQ0FBbEQsQ0F0QkEsQ0FBQTtBQUFBLE1BMEJBLEVBQUEsQ0FBRyx1Q0FBSCxFQUE0QyxTQUFBLEdBQUE7QUFDMUMsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sb0RBQVAsQ0FBQTtlQUNBLE1BQUEsQ0FBTyxZQUFBLENBQWEsSUFBYixDQUFQLENBQTBCLENBQUMsT0FBM0IsQ0FBbUMsQ0FBQywyQkFBRCxFQUE4QiwyQkFBOUIsQ0FBbkMsRUFGMEM7TUFBQSxDQUE1QyxDQTFCQSxDQUFBO2FBOEJBLEVBQUEsQ0FBRyxzQ0FBSCxFQUEyQyxTQUFBLEdBQUE7QUFDekMsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sb0VBQVAsQ0FBQTtlQUNBLE1BQUEsQ0FBTyxZQUFBLENBQWEsSUFBYixDQUFQLENBQTBCLENBQUMsT0FBM0IsQ0FBbUMsQ0FBQyw2QkFBRCxFQUFnQyxpQ0FBaEMsQ0FBbkMsRUFGeUM7TUFBQSxDQUEzQyxFQS9CZTtJQUFBLENBQWpCLEVBRHVCO0VBQUEsQ0FBekIsQ0FGQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/script/spec/grammar-utils/lisp-spec.coffee
