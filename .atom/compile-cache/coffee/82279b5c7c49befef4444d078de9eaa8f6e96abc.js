(function() {
  module.exports = {
    projectDir: function(editorfile) {
      var path;
      path = require('path');
      return path.dirname(editorfile);
    },
    findNimProjectFile: function(editorfile) {
      var error, file, filepath, files, fs, name, path, stats, tfile, _i, _len;
      path = require('path');
      fs = require('fs');
      if (path.extname(editorfile) === '.nims') {
        try {
          tfile = editorfile.slice(0, -1);
          stats = fs.statSync(tfile);
          return path.basename(tfile);
        } catch (_error) {
          error = _error;
          return path.basename(editorfile);
        }
      }
      try {
        stats = fs.statSync(editorfile + "s");
        return path.basename(editorfile);
      } catch (_error) {}
      try {
        stats = fs.statSync(editorfile + ".cfg");
        return path.basename(editorfile);
      } catch (_error) {}
      try {
        stats = fs.statSync(editorfile + "cfg");
        return path.basename(editorfile);
      } catch (_error) {}
      filepath = path.dirname(editorfile);
      files = fs.readdirSync(filepath);
      files.sort();
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        name = filepath + '/' + file;
        if (fs.statSync(name).isFile()) {
          if (path.extname(name) === '.nims' || path.extname(name) === '.nimcgf' || path.extname(name) === '.cfg') {
            try {
              tfile = name.slice(0, -1);
              stats = fs.statSync(tfile);
              return path.basename(tfile);
            } catch (_error) {
              error = _error;
              console.log("File does not exist.");
            }
          }
        }
      }
      return path.basename(editorfile);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL25pbS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFDQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FPRTtBQUFBLElBQUEsVUFBQSxFQUFZLFNBQUMsVUFBRCxHQUFBO0FBQ1YsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBO0FBQ0EsYUFBTyxJQUFJLENBQUMsT0FBTCxDQUFhLFVBQWIsQ0FBUCxDQUZVO0lBQUEsQ0FBWjtBQUFBLElBSUEsa0JBQUEsRUFBb0IsU0FBQyxVQUFELEdBQUE7QUFDbEIsVUFBQSxvRUFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTtBQUFBLE1BQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTtBQUdBLE1BQUEsSUFBRyxJQUFJLENBQUMsT0FBTCxDQUFhLFVBQWIsQ0FBQSxLQUEwQixPQUE3QjtBQUVFO0FBQ0UsVUFBQSxLQUFBLEdBQVEsVUFBVSxDQUFDLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBQSxDQUFwQixDQUFSLENBQUE7QUFBQSxVQUNBLEtBQUEsR0FBUSxFQUFFLENBQUMsUUFBSCxDQUFZLEtBQVosQ0FEUixDQUFBO0FBSUEsaUJBQU8sSUFBSSxDQUFDLFFBQUwsQ0FBYyxLQUFkLENBQVAsQ0FMRjtTQUFBLGNBQUE7QUFRRSxVQUZJLGNBRUosQ0FBQTtBQUFBLGlCQUFPLElBQUksQ0FBQyxRQUFMLENBQWMsVUFBZCxDQUFQLENBUkY7U0FGRjtPQUhBO0FBZ0JBO0FBQ0UsUUFBQSxLQUFBLEdBQVEsRUFBRSxDQUFDLFFBQUgsQ0FBWSxVQUFBLEdBQWEsR0FBekIsQ0FBUixDQUFBO0FBQ0EsZUFBTyxJQUFJLENBQUMsUUFBTCxDQUFjLFVBQWQsQ0FBUCxDQUZGO09BQUEsa0JBaEJBO0FBb0JBO0FBQ0UsUUFBQSxLQUFBLEdBQVEsRUFBRSxDQUFDLFFBQUgsQ0FBWSxVQUFBLEdBQWEsTUFBekIsQ0FBUixDQUFBO0FBQ0EsZUFBTyxJQUFJLENBQUMsUUFBTCxDQUFjLFVBQWQsQ0FBUCxDQUZGO09BQUEsa0JBcEJBO0FBd0JBO0FBQ0UsUUFBQSxLQUFBLEdBQVEsRUFBRSxDQUFDLFFBQUgsQ0FBWSxVQUFBLEdBQWEsS0FBekIsQ0FBUixDQUFBO0FBQ0EsZUFBTyxJQUFJLENBQUMsUUFBTCxDQUFjLFVBQWQsQ0FBUCxDQUZGO09BQUEsa0JBeEJBO0FBQUEsTUFpQ0EsUUFBQSxHQUFXLElBQUksQ0FBQyxPQUFMLENBQWEsVUFBYixDQWpDWCxDQUFBO0FBQUEsTUFrQ0EsS0FBQSxHQUFRLEVBQUUsQ0FBQyxXQUFILENBQWUsUUFBZixDQWxDUixDQUFBO0FBQUEsTUFtQ0EsS0FBSyxDQUFDLElBQU4sQ0FBQSxDQW5DQSxDQUFBO0FBb0NBLFdBQUEsNENBQUE7eUJBQUE7QUFDRSxRQUFBLElBQUEsR0FBTyxRQUFBLEdBQVcsR0FBWCxHQUFpQixJQUF4QixDQUFBO0FBQ0EsUUFBQSxJQUFJLEVBQUUsQ0FBQyxRQUFILENBQVksSUFBWixDQUFpQixDQUFDLE1BQWxCLENBQUEsQ0FBSjtBQUNJLFVBQUEsSUFBRyxJQUFJLENBQUMsT0FBTCxDQUFhLElBQWIsQ0FBQSxLQUFvQixPQUFwQixJQUNELElBQUksQ0FBQyxPQUFMLENBQWEsSUFBYixDQUFBLEtBQW9CLFNBRG5CLElBRUQsSUFBSSxDQUFDLE9BQUwsQ0FBYSxJQUFiLENBQUEsS0FBb0IsTUFGdEI7QUFHSTtBQUNFLGNBQUEsS0FBQSxHQUFRLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQUEsQ0FBZCxDQUFSLENBQUE7QUFBQSxjQUNBLEtBQUEsR0FBUSxFQUFFLENBQUMsUUFBSCxDQUFZLEtBQVosQ0FEUixDQUFBO0FBRUEscUJBQU8sSUFBSSxDQUFDLFFBQUwsQ0FBYyxLQUFkLENBQVAsQ0FIRjthQUFBLGNBQUE7QUFLRSxjQURJLGNBQ0osQ0FBQTtBQUFBLGNBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxzQkFBWixDQUFBLENBTEY7YUFISjtXQURKO1NBRkY7QUFBQSxPQXBDQTtBQWtEQSxhQUFPLElBQUksQ0FBQyxRQUFMLENBQWMsVUFBZCxDQUFQLENBbkRrQjtJQUFBLENBSnBCO0dBUEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/xy/.atom/packages/script/lib/grammar-utils/nim.coffee
