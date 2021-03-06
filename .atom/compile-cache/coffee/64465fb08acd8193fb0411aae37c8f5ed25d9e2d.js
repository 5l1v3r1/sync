(function() {
  var Path, RemoteFile, Serializable;

  Serializable = require('serializable');

  Path = require('path');

  module.exports = RemoteFile = (function() {
    Serializable.includeInto(RemoteFile);

    atom.deserializers.add(RemoteFile);

    function RemoteFile(path, isFile, isDir, isLink, size, permissions, lastModified) {
      this.path = path;
      this.isFile = isFile;
      this.isDir = isDir;
      this.isLink = isLink;
      this.size = size;
      this.permissions = permissions;
      this.lastModified = lastModified;
      this.name = Path.basename(this.path);
      this.dirName = Path.dirname(this.path);
    }

    RemoteFile.prototype.isHidden = function(callback) {
      return callback(!(this.name[0] === "." && this.name.length > 2));
    };

    RemoteFile.prototype.serializeParams = function() {
      return {
        path: this.path,
        isFile: this.isFile,
        isDir: this.isDir,
        isLink: this.isLink,
        size: this.size,
        permissions: this.permissions,
        lastModified: this.lastModified
      };
    };

    return RemoteFile;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvcmVtb3RlLWVkaXQvbGliL21vZGVsL3JlbW90ZS1maWxlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw4QkFBQTs7QUFBQSxFQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsY0FBUixDQUFmLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDUTtBQUNKLElBQUEsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsVUFBekIsQ0FBQSxDQUFBOztBQUFBLElBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFuQixDQUF1QixVQUF2QixDQURBLENBQUE7O0FBR2EsSUFBQSxvQkFBRSxJQUFGLEVBQVMsTUFBVCxFQUFrQixLQUFsQixFQUEwQixNQUExQixFQUFtQyxJQUFuQyxFQUEwQyxXQUExQyxFQUF3RCxZQUF4RCxHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsT0FBQSxJQUNiLENBQUE7QUFBQSxNQURtQixJQUFDLENBQUEsU0FBQSxNQUNwQixDQUFBO0FBQUEsTUFENEIsSUFBQyxDQUFBLFFBQUEsS0FDN0IsQ0FBQTtBQUFBLE1BRG9DLElBQUMsQ0FBQSxTQUFBLE1BQ3JDLENBQUE7QUFBQSxNQUQ2QyxJQUFDLENBQUEsT0FBQSxJQUM5QyxDQUFBO0FBQUEsTUFEb0QsSUFBQyxDQUFBLGNBQUEsV0FDckQsQ0FBQTtBQUFBLE1BRGtFLElBQUMsQ0FBQSxlQUFBLFlBQ25FLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBSSxDQUFDLFFBQUwsQ0FBYyxJQUFDLENBQUEsSUFBZixDQUFSLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBSSxDQUFDLE9BQUwsQ0FBYSxJQUFDLENBQUEsSUFBZCxDQURYLENBRFc7SUFBQSxDQUhiOztBQUFBLHlCQU9BLFFBQUEsR0FBVSxTQUFDLFFBQUQsR0FBQTthQUNSLFFBQUEsQ0FBUyxDQUFBLENBQUUsSUFBQyxDQUFBLElBQUssQ0FBQSxDQUFBLENBQU4sS0FBWSxHQUFaLElBQW1CLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixHQUFlLENBQW5DLENBQVYsRUFEUTtJQUFBLENBUFYsQ0FBQTs7QUFBQSx5QkFVQSxlQUFBLEdBQWlCLFNBQUEsR0FBQTthQUNmO0FBQUEsUUFBRSxNQUFELElBQUMsQ0FBQSxJQUFGO0FBQUEsUUFBUyxRQUFELElBQUMsQ0FBQSxNQUFUO0FBQUEsUUFBa0IsT0FBRCxJQUFDLENBQUEsS0FBbEI7QUFBQSxRQUEwQixRQUFELElBQUMsQ0FBQSxNQUExQjtBQUFBLFFBQW1DLE1BQUQsSUFBQyxDQUFBLElBQW5DO0FBQUEsUUFBMEMsYUFBRCxJQUFDLENBQUEsV0FBMUM7QUFBQSxRQUF3RCxjQUFELElBQUMsQ0FBQSxZQUF4RDtRQURlO0lBQUEsQ0FWakIsQ0FBQTs7c0JBQUE7O01BTkosQ0FBQTtBQUFBIgp9

//# sourceURL=/home/xy/.atom/packages/remote-edit/lib/model/remote-file.coffee
