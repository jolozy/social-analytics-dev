define(["app", "apps/config/storage/localstorage", "backbone.paginator"], function(App){
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
    Entities.Buzz = Backbone.Model.extend({
      url: App.apiURL + "admin/buzz/queued_email",
      defaults:{
        id: "",
        set_id: "",
        status: "",
        category: "",
        language: "",
        list_shortcut: "",
        email_subject: "",
        created_at: "",
        updated_at: "",
        content: "",
      }
    });

    Entities.BuzzCollection = Backbone.Paginator.requestPager.extend({
      model: Entities.Buzz,
      paginator_core: {
        type: 'GET',
        dataType: 'json',
        url: App.apiURL + "admin/buzz/queued_emails"
      },
      paginator_ui: {
        firstPage: 0,
        currentPage: 0,
        totalPages: 0,
        perPage: 10,
        pagesInRange: 2
      },
      server_api: {
        'per_page': function () {return this.perPage;},
        'current_page': function () {return this.currentPage;},
        'search_string' : function () {return this.search_string;},
        'filter': function () {return this.filterBy;}
      },
      parse: function (res){
        this.perPage = res.per_page;
        this.currentPage = res.current_page;
        this.totalPages = res.total_pages;

        this.reset(res.sets);

        return res.sets;
      }
    });

    var buzz;

    var API = {

      getBuzzEntities: function(status, category, language) {
        buzz = new Entities.BuzzCollection();
        buzz.status = status;
        buzz.category = category;
        buzz.language = language;
        buzz.fetch({
          data: {
            status: status,
            category: category,
            language: language
          }
        });

        return buzz;
      },

      getBuzzEntity: function(set_id) {
        buzz = new Entities.Buzz();
        buzz.url = App.apiURL + 'admin/buzz/queued_email/' + set_id;
        buzz.fetch();
        return buzz;
      }

    };

    App.reqres.setHandler("buzz:entities", function(status, category, language){
      if(localStorage.getItem('access_token')){
        // Logged in
        headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
          headers: headers
        });
      }
      return API.getBuzzEntities(status, category, language);
    });

    App.reqres.setHandler("buzz:entity", function(set_id){
      if(localStorage.getItem('access_token')){
        // Logged in
        headers = {
          'Authorization': 'Token token="'+ localStorage.getItem('access_token')+'"'
        };
        $.ajaxSetup({
          headers: headers
        });
      }
      return API.getBuzzEntity(set_id);
    });

  });
});
