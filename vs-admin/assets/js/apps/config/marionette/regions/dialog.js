define(["app"], 
function(App) {

  Marionette.Region.Dialog = Marionette.Region.extend({

    constructor: function () {
      Marionette.Region.prototype.constructor.apply(this, arguments);
      this.ensureEl();
      this.$el.on('hidden.bs.modal', {region: this}, function (e) {
        e.data.region.close();
      });
    },

    onShow: function() {
      this.$el.modal('show');
    },

    onClose: function() {
      this.$el.modal('hide');
    }

  });

});

