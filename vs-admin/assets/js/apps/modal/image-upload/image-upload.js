define(["app",
    "tpl!apps/modal/image-upload/tpl/imageupload-itemview.tpl",
    "dropzone"],
function(App, imageUploadItemViewTpl, Dropzone) {

  App.module('Modal.ImageUpload', function (ImageUpload, App, Backbone, Marionette, $, _) {
    ImageUpload.View = Marionette.ItemView.extend({
      template: imageUploadItemViewTpl,
      tagName: 'div',
      className: 'image-upload-modal',

      // Events
      events:{
      },

      onShow: function () {
        var config = this.config;

        var coverPhotoDropzone = new Dropzone("#cover-photo-dropzone", {
          url: config.url,
          method: "POST",
          maxFiles: 1,
          headers: config.headers,
          paramName: "file",
          init: function () {
            this.on("success", config.success);
            this.on("uploadprogress", config.progress);
          }
        });
      }
    });

    ImageUpload.Controller = {
      showModal: function(config){
          var modalView = new ImageUpload.View();
          modalView.config = config;
          App.modalRegion.show(modalView);
          $('.js-modal-image').modal('show');
      }
    };

    App.on("imageupload:show", function(config){
        ImageUpload.Controller.showModal(config);
    });
    

  });

  return ;

});
