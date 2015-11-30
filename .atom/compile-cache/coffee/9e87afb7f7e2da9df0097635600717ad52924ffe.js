(function() {
  var linkPaths, regex, template;

  regex = /(\/?(?:[-\w.]+\/)*[-\w.]+):(\d+):(\d+)/g;

  template = '<a class="-linked-path" data-path="$1" data-line="$2" data-column="$3">$&</a>';

  module.exports = linkPaths = function(lines) {
    return lines.replace(regex, template);
  };

  linkPaths.listen = function(parentView) {
    return parentView.on('click', '.-linked-path', function(event) {
      var column, el, line, path, _ref;
      el = this;
      _ref = el.dataset, path = _ref.path, line = _ref.line, column = _ref.column;
      line = Number(line) - 1;
      column = Number(column) - 1;
      return atom.workspace.open(path, {
        initialLine: line,
        initialColumn: column
      });
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9saW5rLXBhdGhzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwQkFBQTs7QUFBQSxFQUFBLEtBQUEsR0FBUSx5Q0FBUixDQUFBOztBQUFBLEVBQ0EsUUFBQSxHQUFXLCtFQURYLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7V0FDM0IsS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFkLEVBQXFCLFFBQXJCLEVBRDJCO0VBQUEsQ0FIN0IsQ0FBQTs7QUFBQSxFQU1BLFNBQVMsQ0FBQyxNQUFWLEdBQW1CLFNBQUMsVUFBRCxHQUFBO1dBQ2pCLFVBQVUsQ0FBQyxFQUFYLENBQWMsT0FBZCxFQUF1QixlQUF2QixFQUF3QyxTQUFDLEtBQUQsR0FBQTtBQUN0QyxVQUFBLDRCQUFBO0FBQUEsTUFBQSxFQUFBLEdBQUssSUFBTCxDQUFBO0FBQUEsTUFDQSxPQUF1QixFQUFFLENBQUMsT0FBMUIsRUFBQyxZQUFBLElBQUQsRUFBTyxZQUFBLElBQVAsRUFBYSxjQUFBLE1BRGIsQ0FBQTtBQUFBLE1BRUEsSUFBQSxHQUFPLE1BQUEsQ0FBTyxJQUFQLENBQUEsR0FBZSxDQUZ0QixDQUFBO0FBQUEsTUFHQSxNQUFBLEdBQVMsTUFBQSxDQUFPLE1BQVAsQ0FBQSxHQUFpQixDQUgxQixDQUFBO2FBS0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLElBQXBCLEVBQTBCO0FBQUEsUUFDeEIsV0FBQSxFQUFhLElBRFc7QUFBQSxRQUV4QixhQUFBLEVBQWUsTUFGUztPQUExQixFQU5zQztJQUFBLENBQXhDLEVBRGlCO0VBQUEsQ0FObkIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/xy/.atom/packages/script/lib/link-paths.coffee
