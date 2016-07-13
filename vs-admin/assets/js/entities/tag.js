define(["app", "apps/config/storage/localstorage", "backbone.paginator"], function(App){
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
    Entities.Tag = Backbone.Model.extend({
      defaults:{
        id: "",
        content: "",
        tag_type: "",
        created_at: "",
        updated_at: "",
        metadata: "",
        description: "",
        num_films: 0
      }
    });

    Entities.TagCollection = Backbone.Paginator.requestPager.extend({
      model: Entities.Tag,
      paginator_core: {
        type: 'GET',
        dataType: 'json',
        url: App.apiURL + "admin/tags"
      },
      paginator_ui: {
        firstPage: 0,
        currentPage: 0,
        totalPages: 0,
        perPage: 20,
        pagesInRange: 2
      },
      server_api: {
        'per_page': function () {return this.perPage;},
        'current_page': function () {return this.currentPage;},
        'tag_type': function () {return this.tag_type;}
      },
      parse: function (res){
        this.perPage = res.per_page;
        this.currentPage = res.current_page;
        this.totalPages = res.total_pages;

        this.reset(res.tags);
        return res.tags;
      }
    });

    var tags;

    var API = {
      getTagEntity: function(id){
        var tag = new Entities.Tag({id: id});
        tag.fetch();
        return tag;
      },

      getTagEntities: function(tag_type){
        tags = new Entities.TagCollection();
        tags.tag_type = tag_type;
        tags.fetch({
          data: {
            tag_type: tag_type
          }
        });
        return tags;
      }

    };

    App.reqres.setHandler("tag:entities", function(tag_type){
      if(localStorage.getItem('access_token')){
        // Logged in
        headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
          headers: headers
        });
      }
      return API.getTagEntities(tag_type);
    });

    App.reqres.setHandler("tag:entity", function(id){
      if(localStorage.getItem('access_token')){
        // Logged in
        headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
          headers: headers
        });
      }
      return API.getTagEntity(id);
    });

  });
});

