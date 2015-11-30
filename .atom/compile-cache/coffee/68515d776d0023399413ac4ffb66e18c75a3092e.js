(function() {
  var BibtexProvider, fs;

  fs = require("fs");

  BibtexProvider = require("./provider");

  module.exports = {
    config: {
      bibtex: {
        type: 'array',
        "default": [],
        items: {
          type: 'string'
        }
      },
      scope: {
        type: 'string',
        "default": '.source.gfm'
      },
      resultTemplate: {
        type: 'string',
        "default": '@[key]'
      }
    },
    activate: function(state) {
      var bibtexFiles, file, reload, stats, _i, _len;
      reload = false;
      if (state) {
        bibtexFiles = atom.config.get("autocomplete-bibtex.bibtex");
        if (!Array.isArray(bibtexFiles)) {
          bibtexFiles = [bibtexFiles];
        }
        for (_i = 0, _len = bibtexFiles.length; _i < _len; _i++) {
          file = bibtexFiles[_i];
          stats = fs.statSync(file);
          if (stats.isFile()) {
            if (state.saveTime < stats.mtime.getTime()) {
              reload = true;
            }
          }
        }
      }
      if (state && reload === false) {
        this.bibtexProvider = atom.deserializers.deserialize(state.provider);
        if (!this.bibtexProvider) {
          this.bibtexProvider = new BibtexProvider();
        }
      } else {
        this.bibtexProvider = new BibtexProvider();
      }
      return this.provider = this.bibtexProvider.provider;
    },
    deactivate: function() {
      return this.provider.registration.dispose();
    },
    serialize: function() {
      var state;
      state = {
        provider: this.bibtexProvider.serialize(),
        saveTime: new Date().getTime()
      };
      return state;
    },
    provide: function() {
      return {
        providers: [this.provider]
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLWJpYnRleC9saWIvbWFpbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0JBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBRUEsY0FBQSxHQUFpQixPQUFBLENBQVEsWUFBUixDQUZqQixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxNQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxPQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsRUFEVDtBQUFBLFFBRUEsS0FBQSxFQUNFO0FBQUEsVUFBQSxJQUFBLEVBQU0sUUFBTjtTQUhGO09BREY7QUFBQSxNQUtBLEtBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxhQURUO09BTkY7QUFBQSxNQVFBLGNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxRQURUO09BVEY7S0FERjtBQUFBLElBYUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsVUFBQSwwQ0FBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLEtBQVQsQ0FBQTtBQUNBLE1BQUEsSUFBRyxLQUFIO0FBQ0UsUUFBQSxXQUFBLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDRCQUFoQixDQUFkLENBQUE7QUFDQSxRQUFBLElBQUcsQ0FBQSxLQUFTLENBQUMsT0FBTixDQUFjLFdBQWQsQ0FBUDtBQUNFLFVBQUEsV0FBQSxHQUFjLENBQUMsV0FBRCxDQUFkLENBREY7U0FEQTtBQUlBLGFBQUEsa0RBQUE7aUNBQUE7QUFDRSxVQUFBLEtBQUEsR0FBUSxFQUFFLENBQUMsUUFBSCxDQUFZLElBQVosQ0FBUixDQUFBO0FBQ0EsVUFBQSxJQUFHLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FBSDtBQUNFLFlBQUEsSUFBRyxLQUFLLENBQUMsUUFBTixHQUFpQixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQVosQ0FBQSxDQUFwQjtBQUNFLGNBQUEsTUFBQSxHQUFTLElBQVQsQ0FERjthQURGO1dBRkY7QUFBQSxTQUxGO09BREE7QUFjQSxNQUFBLElBQUcsS0FBQSxJQUFVLE1BQUEsS0FBVSxLQUF2QjtBQUNFLFFBQUEsSUFBQyxDQUFBLGNBQUQsR0FBa0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFuQixDQUErQixLQUFLLENBQUMsUUFBckMsQ0FBbEIsQ0FBQTtBQUVBLFFBQUEsSUFBRyxDQUFBLElBQUssQ0FBQSxjQUFSO0FBQ0UsVUFBQSxJQUFDLENBQUEsY0FBRCxHQUFzQixJQUFBLGNBQUEsQ0FBQSxDQUF0QixDQURGO1NBSEY7T0FBQSxNQUFBO0FBTUUsUUFBQSxJQUFDLENBQUEsY0FBRCxHQUFzQixJQUFBLGNBQUEsQ0FBQSxDQUF0QixDQU5GO09BZEE7YUFzQkEsSUFBQyxDQUFBLFFBQUQsR0FBWSxJQUFDLENBQUEsY0FBYyxDQUFDLFNBdkJwQjtJQUFBLENBYlY7QUFBQSxJQXNDQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBdkIsQ0FBQSxFQURVO0lBQUEsQ0F0Q1o7QUFBQSxJQXlDQSxTQUFBLEVBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSxLQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVE7QUFBQSxRQUNOLFFBQUEsRUFBVSxJQUFDLENBQUEsY0FBYyxDQUFDLFNBQWhCLENBQUEsQ0FESjtBQUFBLFFBRU4sUUFBQSxFQUFjLElBQUEsSUFBQSxDQUFBLENBQU0sQ0FBQyxPQUFQLENBQUEsQ0FGUjtPQUFSLENBQUE7QUFJQSxhQUFPLEtBQVAsQ0FMUztJQUFBLENBekNYO0FBQUEsSUFpREEsT0FBQSxFQUFTLFNBQUEsR0FBQTtBQUNQLGFBQU87QUFBQSxRQUFFLFNBQUEsRUFBVyxDQUFDLElBQUMsQ0FBQSxRQUFGLENBQWI7T0FBUCxDQURPO0lBQUEsQ0FqRFQ7R0FMRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/autocomplete-bibtex/lib/main.coffee
