(function() {
  var CompositeDisposable, Observer;

  CompositeDisposable = require('event-kit').CompositeDisposable;

  module.exports = Observer = (function() {
    function Observer() {
      this.subscriptions = new CompositeDisposable();
    }

    Observer.prototype.addSubscription = function(disposableSubscription) {
      return this.subscriptions.add(disposableSubscription);
    };

    Observer.prototype.dispose = function() {
      return this.subscriptions.dispose();
    };

    return Observer;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvanNmb3JtYXQvbGliL29ic2VydmVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSw2QkFBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsV0FBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNRLElBQUEsa0JBQUEsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBcUIsSUFBQSxtQkFBQSxDQUFBLENBQXJCLENBRFc7SUFBQSxDQUFiOztBQUFBLHVCQUdBLGVBQUEsR0FBaUIsU0FBQyxzQkFBRCxHQUFBO2FBQ2YsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLHNCQUFuQixFQURlO0lBQUEsQ0FIakIsQ0FBQTs7QUFBQSx1QkFNQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLGFBQWEsQ0FBQyxPQUFmLENBQUEsRUFETztJQUFBLENBTlQsQ0FBQTs7b0JBQUE7O01BSkQsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/xy/.atom/packages/jsformat/lib/observer.coffee
