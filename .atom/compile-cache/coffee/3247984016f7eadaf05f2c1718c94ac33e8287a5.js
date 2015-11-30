(function() {
  var crypto, fs, shasum;

  crypto = require('crypto');

  fs = require('fs');

  console.log("Let's hash these bugs out");

  shasum = crypto.createHash('sha1');

  shasum.update('I like it when you sum.');

  console.log(shasum.digest('hex'));

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2V4YW1wbGVzL2hhc2hpZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0JBQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FBVCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUdBLE9BQU8sQ0FBQyxHQUFSLENBQVksMkJBQVosQ0FIQSxDQUFBOztBQUFBLEVBS0EsTUFBQSxHQUFTLE1BQU0sQ0FBQyxVQUFQLENBQWtCLE1BQWxCLENBTFQsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxNQUFQLENBQWMseUJBQWQsQ0FOQSxDQUFBOztBQUFBLEVBT0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFNLENBQUMsTUFBUCxDQUFjLEtBQWQsQ0FBWixDQVBBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/xy/.atom/packages/script/examples/hashie.coffee
