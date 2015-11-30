(function() {
  var fs, os, path, uuid;

  os = require('os');

  fs = require('fs');

  path = require('path');

  uuid = require('node-uuid');

  module.exports = {
    tempFilesDir: path.join(os.tmpdir(), 'atom_script_tempfiles'),
    createTempFileWithCode: function(code, extension) {
      var error, file, tempFilePath;
      if (extension == null) {
        extension = "";
      }
      try {
        if (!fs.existsSync(this.tempFilesDir)) {
          fs.mkdirSync(this.tempFilesDir);
        }
        tempFilePath = this.tempFilesDir + path.sep + uuid.v1() + extension;
        file = fs.openSync(tempFilePath, 'w');
        fs.writeSync(file, code);
        fs.closeSync(file);
        return tempFilePath;
      } catch (_error) {
        error = _error;
        throw "Error while creating temporary file (" + error + ")";
      }
    },
    deleteTempFiles: function() {
      var error, files;
      try {
        if (fs.existsSync(this.tempFilesDir)) {
          files = fs.readdirSync(this.tempFilesDir);
          if (files.length) {
            files.forEach((function(_this) {
              return function(file, index) {
                return fs.unlinkSync(_this.tempFilesDir + path.sep + file);
              };
            })(this));
          }
          return fs.rmdirSync(this.tempFilesDir);
        }
      } catch (_error) {
        error = _error;
        throw "Error while deleting temporary files (" + error + ")";
      }
    },
    Lisp: require('./grammar-utils/lisp'),
    OperatingSystem: require('./grammar-utils/operating-system'),
    PHP: require('./grammar-utils/php'),
    Nim: require('./grammar-utils/nim')
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSxrQkFBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUFMLENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUdBLElBQUEsR0FBTyxPQUFBLENBQVEsV0FBUixDQUhQLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxZQUFBLEVBQWMsSUFBSSxDQUFDLElBQUwsQ0FBVSxFQUFFLENBQUMsTUFBSCxDQUFBLENBQVYsRUFBdUIsdUJBQXZCLENBQWQ7QUFBQSxJQU9BLHNCQUFBLEVBQXdCLFNBQUMsSUFBRCxFQUFPLFNBQVAsR0FBQTtBQUN0QixVQUFBLHlCQUFBOztRQUQ2QixZQUFZO09BQ3pDO0FBQUE7QUFDRSxRQUFBLElBQUEsQ0FBQSxFQUFxQyxDQUFDLFVBQUgsQ0FBYyxJQUFDLENBQUEsWUFBZixDQUFuQztBQUFBLFVBQUEsRUFBRSxDQUFDLFNBQUgsQ0FBYSxJQUFDLENBQUEsWUFBZCxDQUFBLENBQUE7U0FBQTtBQUFBLFFBRUEsWUFBQSxHQUFlLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUksQ0FBQyxHQUFyQixHQUEyQixJQUFJLENBQUMsRUFBTCxDQUFBLENBQTNCLEdBQXVDLFNBRnRELENBQUE7QUFBQSxRQUlBLElBQUEsR0FBTyxFQUFFLENBQUMsUUFBSCxDQUFZLFlBQVosRUFBMEIsR0FBMUIsQ0FKUCxDQUFBO0FBQUEsUUFLQSxFQUFFLENBQUMsU0FBSCxDQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FMQSxDQUFBO0FBQUEsUUFNQSxFQUFFLENBQUMsU0FBSCxDQUFhLElBQWIsQ0FOQSxDQUFBO2VBUUEsYUFURjtPQUFBLGNBQUE7QUFXRSxRQURJLGNBQ0osQ0FBQTtBQUFBLGNBQU8sdUNBQUEsR0FBdUMsS0FBdkMsR0FBNkMsR0FBcEQsQ0FYRjtPQURzQjtJQUFBLENBUHhCO0FBQUEsSUFzQkEsZUFBQSxFQUFpQixTQUFBLEdBQUE7QUFDZixVQUFBLFlBQUE7QUFBQTtBQUNFLFFBQUEsSUFBSSxFQUFFLENBQUMsVUFBSCxDQUFjLElBQUMsQ0FBQSxZQUFmLENBQUo7QUFDRSxVQUFBLEtBQUEsR0FBUSxFQUFFLENBQUMsV0FBSCxDQUFlLElBQUMsQ0FBQSxZQUFoQixDQUFSLENBQUE7QUFDQSxVQUFBLElBQUksS0FBSyxDQUFDLE1BQVY7QUFDRSxZQUFBLEtBQUssQ0FBQyxPQUFOLENBQWMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtxQkFBQSxTQUFDLElBQUQsRUFBTyxLQUFQLEdBQUE7dUJBQWlCLEVBQUUsQ0FBQyxVQUFILENBQWMsS0FBQyxDQUFBLFlBQUQsR0FBZ0IsSUFBSSxDQUFDLEdBQXJCLEdBQTJCLElBQXpDLEVBQWpCO2NBQUEsRUFBQTtZQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZCxDQUFBLENBREY7V0FEQTtpQkFHQSxFQUFFLENBQUMsU0FBSCxDQUFhLElBQUMsQ0FBQSxZQUFkLEVBSkY7U0FERjtPQUFBLGNBQUE7QUFPRSxRQURJLGNBQ0osQ0FBQTtBQUFBLGNBQU8sd0NBQUEsR0FBd0MsS0FBeEMsR0FBOEMsR0FBckQsQ0FQRjtPQURlO0lBQUEsQ0F0QmpCO0FBQUEsSUFtQ0EsSUFBQSxFQUFNLE9BQUEsQ0FBUSxzQkFBUixDQW5DTjtBQUFBLElBd0NBLGVBQUEsRUFBaUIsT0FBQSxDQUFRLGtDQUFSLENBeENqQjtBQUFBLElBNkNBLEdBQUEsRUFBSyxPQUFBLENBQVEscUJBQVIsQ0E3Q0w7QUFBQSxJQWtEQSxHQUFBLEVBQUssT0FBQSxDQUFRLHFCQUFSLENBbERMO0dBUEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/xy/.atom/packages/script/lib/grammar-utils.coffee
