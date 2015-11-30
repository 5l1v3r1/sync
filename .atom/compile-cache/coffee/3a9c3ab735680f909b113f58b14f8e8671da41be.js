(function() {
  var Selector, provider, selectorsMatchScopeChain;

  provider = require('./provider');

  selectorsMatchScopeChain = require('./scope-helpers').selectorsMatchScopeChain;

  Selector = require('selector-kit').Selector;

  module.exports = {
    priority: 1,
    providerName: 'autocomplete-python',
    disableForSelector: "" + provider.disableForSelector + ", .source.python .numeric, .source.python .integer, .source.python .decimal, .source.python .punctuation, .source.python .keyword, .source.python .storage, .source.python .variable.parameter, .source.python .entity.name",
    _getScopes: function(editor, range) {
      return editor.scopeDescriptorForBufferPosition(range).scopes;
    },
    getSuggestionForWord: function(editor, text, range) {
      var bufferPosition, callback, disableForSelector, scopeChain, scopeDescriptor;
      if (text === '.' || text === ':') {
        return;
      }
      if (editor.getGrammar().scopeName === 'source.python') {
        bufferPosition = range.start;
        scopeDescriptor = editor.scopeDescriptorForBufferPosition(bufferPosition);
        scopeChain = scopeDescriptor.getScopeChain();
        disableForSelector = Selector.create(this.disableForSelector);
        if (selectorsMatchScopeChain(disableForSelector, scopeChain)) {
          return;
        }
        if (atom.config.get('autocomplete-python.outputDebug')) {
          provider._log(range.start, this._getScopes(editor, range.start));
          provider._log(range.end, this._getScopes(editor, range.end));
        }
        callback = function() {
          return provider.goToDefinition(editor, bufferPosition);
        };
        return {
          range: range,
          callback: callback
        };
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLXB5dGhvbi9saWIvaHlwZXJjbGlja1Byb3ZpZGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw0Q0FBQTs7QUFBQSxFQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsWUFBUixDQUFYLENBQUE7O0FBQUEsRUFDQywyQkFBNEIsT0FBQSxDQUFRLGlCQUFSLEVBQTVCLHdCQURELENBQUE7O0FBQUEsRUFFQyxXQUFZLE9BQUEsQ0FBUSxjQUFSLEVBQVosUUFGRCxDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLENBQVY7QUFBQSxJQUVBLFlBQUEsRUFBYyxxQkFGZDtBQUFBLElBSUEsa0JBQUEsRUFBb0IsRUFBQSxHQUFHLFFBQVEsQ0FBQyxrQkFBWixHQUErQiw2TkFKbkQ7QUFBQSxJQU1BLFVBQUEsRUFBWSxTQUFDLE1BQUQsRUFBUyxLQUFULEdBQUE7QUFDVixhQUFPLE1BQU0sQ0FBQyxnQ0FBUCxDQUF3QyxLQUF4QyxDQUE4QyxDQUFDLE1BQXRELENBRFU7SUFBQSxDQU5aO0FBQUEsSUFTQSxvQkFBQSxFQUFzQixTQUFDLE1BQUQsRUFBUyxJQUFULEVBQWUsS0FBZixHQUFBO0FBQ3BCLFVBQUEseUVBQUE7QUFBQSxNQUFBLElBQUcsSUFBQSxLQUFTLEdBQVQsSUFBQSxJQUFBLEtBQWMsR0FBakI7QUFDRSxjQUFBLENBREY7T0FBQTtBQUVBLE1BQUEsSUFBRyxNQUFNLENBQUMsVUFBUCxDQUFBLENBQW1CLENBQUMsU0FBcEIsS0FBaUMsZUFBcEM7QUFDRSxRQUFBLGNBQUEsR0FBaUIsS0FBSyxDQUFDLEtBQXZCLENBQUE7QUFBQSxRQUNBLGVBQUEsR0FBa0IsTUFBTSxDQUFDLGdDQUFQLENBQ2hCLGNBRGdCLENBRGxCLENBQUE7QUFBQSxRQUdBLFVBQUEsR0FBYSxlQUFlLENBQUMsYUFBaEIsQ0FBQSxDQUhiLENBQUE7QUFBQSxRQUlBLGtCQUFBLEdBQXFCLFFBQVEsQ0FBQyxNQUFULENBQWdCLElBQUMsQ0FBQSxrQkFBakIsQ0FKckIsQ0FBQTtBQUtBLFFBQUEsSUFBRyx3QkFBQSxDQUF5QixrQkFBekIsRUFBNkMsVUFBN0MsQ0FBSDtBQUNFLGdCQUFBLENBREY7U0FMQTtBQVFBLFFBQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsaUNBQWhCLENBQUg7QUFDRSxVQUFBLFFBQVEsQ0FBQyxJQUFULENBQWMsS0FBSyxDQUFDLEtBQXBCLEVBQTJCLElBQUMsQ0FBQSxVQUFELENBQVksTUFBWixFQUFvQixLQUFLLENBQUMsS0FBMUIsQ0FBM0IsQ0FBQSxDQUFBO0FBQUEsVUFDQSxRQUFRLENBQUMsSUFBVCxDQUFjLEtBQUssQ0FBQyxHQUFwQixFQUF5QixJQUFDLENBQUEsVUFBRCxDQUFZLE1BQVosRUFBb0IsS0FBSyxDQUFDLEdBQTFCLENBQXpCLENBREEsQ0FERjtTQVJBO0FBQUEsUUFXQSxRQUFBLEdBQVcsU0FBQSxHQUFBO2lCQUNULFFBQVEsQ0FBQyxjQUFULENBQXdCLE1BQXhCLEVBQWdDLGNBQWhDLEVBRFM7UUFBQSxDQVhYLENBQUE7QUFhQSxlQUFPO0FBQUEsVUFBQyxPQUFBLEtBQUQ7QUFBQSxVQUFRLFVBQUEsUUFBUjtTQUFQLENBZEY7T0FIb0I7SUFBQSxDQVR0QjtHQUxGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/xy/.atom/packages/autocomplete-python/lib/hyperclickProvider.coffee
