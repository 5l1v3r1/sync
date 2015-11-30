(function() {
  var linkPaths;

  linkPaths = require('../lib/link-paths');

  describe('linkPaths', function() {
    it('detects file paths with line numbers', function() {
      var result;
      result = linkPaths('foo() b/c.js:44:55');
      expect(result).toContain('foo() <a');
      expect(result).toContain('class="-linked-path"');
      expect(result).toContain('data-path="b/c.js"');
      expect(result).toContain('data-line="44"');
      expect(result).toContain('data-column="55"');
      return expect(result).toContain('b/c.js:44:55');
    });
    return it('links multiple paths', function() {
      var multilineResult;
      multilineResult = linkPaths("foo() b/c.js:44:55\nbar() b/c.js:45:56");
      expect(multilineResult).toContain('foo() <a');
      return expect(multilineResult).toContain('bar() <a');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L3NwZWMvbGluay1wYXRocy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxTQUFBOztBQUFBLEVBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxtQkFBUixDQUFaLENBQUE7O0FBQUEsRUFFQSxRQUFBLENBQVMsV0FBVCxFQUFzQixTQUFBLEdBQUE7QUFDcEIsSUFBQSxFQUFBLENBQUcsc0NBQUgsRUFBMkMsU0FBQSxHQUFBO0FBQ3pDLFVBQUEsTUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLFNBQUEsQ0FBVSxvQkFBVixDQUFULENBQUE7QUFBQSxNQUNBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxTQUFmLENBQXlCLFVBQXpCLENBREEsQ0FBQTtBQUFBLE1BRUEsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLFNBQWYsQ0FBeUIsc0JBQXpCLENBRkEsQ0FBQTtBQUFBLE1BR0EsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLFNBQWYsQ0FBeUIsb0JBQXpCLENBSEEsQ0FBQTtBQUFBLE1BSUEsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLFNBQWYsQ0FBeUIsZ0JBQXpCLENBSkEsQ0FBQTtBQUFBLE1BS0EsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLFNBQWYsQ0FBeUIsa0JBQXpCLENBTEEsQ0FBQTthQU1BLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxTQUFmLENBQXlCLGNBQXpCLEVBUHlDO0lBQUEsQ0FBM0MsQ0FBQSxDQUFBO1dBU0EsRUFBQSxDQUFHLHNCQUFILEVBQTJCLFNBQUEsR0FBQTtBQUN6QixVQUFBLGVBQUE7QUFBQSxNQUFBLGVBQUEsR0FBa0IsU0FBQSxDQUFVLHdDQUFWLENBQWxCLENBQUE7QUFBQSxNQUlBLE1BQUEsQ0FBTyxlQUFQLENBQXVCLENBQUMsU0FBeEIsQ0FBa0MsVUFBbEMsQ0FKQSxDQUFBO2FBS0EsTUFBQSxDQUFPLGVBQVAsQ0FBdUIsQ0FBQyxTQUF4QixDQUFrQyxVQUFsQyxFQU55QjtJQUFBLENBQTNCLEVBVm9CO0VBQUEsQ0FBdEIsQ0FGQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/script/spec/link-paths-spec.coffee
