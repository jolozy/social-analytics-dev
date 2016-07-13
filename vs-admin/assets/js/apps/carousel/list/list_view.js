define(["app",
        "tpl!apps/carousel/list/tpl/carousel-itemview.tpl",
        "tpl!apps/carousel/list/tpl/carousel-listview.tpl",
        "sortable"],
    function (App, carouselItemViewTpl, carouselListViewTpl) {

        App.module('Carousel.List', function (List, App, Backbone, Marionette, $, _) {

            List.CarouselItemView = Marionette.ItemView.extend({
                template: carouselItemViewTpl,
                tagName: "tr",
                attributes: function () {
                    return {
                        'data-index': this.model.get('carousel_order'),
                        'data-id': this.model.get('id')
                    };
                },

                initialize: function () {
                    this.model.bind("change", this.render, this);
                    this.listenTo(this.model, 'change', this.render);
                },  //  /initialize

                events: {
                    'click .js-btn-edit': 'editCarouselImage',
                    'click .js-btn-delete': 'deleteBtnClicked'
                },

                editCarouselImage: function () {
                    var carousel_type = this.model.get("carousel_type");
                    var carousel_id = this.model.get("id");
                    App.trigger("carousel:edit", carousel_type, carousel_id);
                },

                deleteBtnClicked: function () {
                    if (confirm('Are you sure you want to delete this?')) {
                        this.deleteCarouselImage();
                    }
                },

                deleteCarouselImage: function () {
                    var carousel_image = this.model;

                    carousel_image.deleteCarouselImage({
                        success: function () {
                            jQuery.gritter.add({
                                title: 'Carousel Image Removed',
                                text: 'Carousel Image has been successfully removed',
                                class_name: 'growl-warning',
                            });
                        },
                        error: function () {
                            jQuery.gritter.add({
                                title: 'Error: Remove Carousel Image',
                                text: 'An error has occured while removing the Carousel Image',
                                class_name: 'growl-danger',
                            });
                        }
                    });
                }

            }); //List.CarouselItemView

            List.CarouselListView = Marionette.CompositeView.extend({
                template: carouselListViewTpl,

                itemView: List.CarouselItemView,
                itemViewContainer: '.js-carousel-images-container',

                initialize: function () {
                    this.collection.bind("reset", _.bind(this.render, this));
                },

                onShow: function () {
                    var self = this;
                    var table = $('.js-carousel-images-container').sortable({
                        containerSelector: 'tbody',
                        itemPath: '',
                        itemSelector: 'tr',
                        placeholder: '<tr class="placeholder"/>',
                        handle: "i.fa-arrows",
                        onDrop: function ($item, container, _super, event) {
                            $item.removeClass("dragged").removeAttr("style");
                            $("body").removeClass("dragging");
                            var data = table.sortable("serialize").get();
                            self.reorderCollection(data[0]);
                        }
                    });
                },

                reorderCollection: function (data) {
                    this.carousel_order = [];
                    for (var i = 0; i < data.length; i++) {
                        this.carousel_order.push(data[i].id);
                    }
                },

                events: {
                    'click .js-save': 'saveCarouselOrder',
                    'click .js-new': 'newCarousel'
                },

                saveCarouselOrder: function () {
                    jQuery.gritter.add({
                        title: 'Saving...',
                        class_name: 'growl-success',
                    });
                    // TBD
                    if (this.carousel_order) {
                        var data = {
                            type: this.carousel_type,
                            ids: this.carousel_order.join(",")
                        };
                        $.ajax({
                            method: 'POST',
                            url: App.apiURL + "admin/carousels/order",
                            data: data
                        }).done(function (res) {
                            jQuery.gritter.add({
                                title: 'Carousel Order Saved',
                                text: 'Carousel Order has been updated',
                                class_name: 'growl-success',
                            });
                        });
                    } else {
                        jQuery.gritter.add({
                            title: 'Carousel Order Unchanged',
                            text: 'There was no change to save',
                            class_name: 'growl-warning',
                        });
                    }

                },

                newCarousel: function () {
                    App.trigger("carousel:new", this.carousel_type);
                }
            });

        });   // /App.module

        return;

    });
