define(["app", "moment", "apps/config/storage/localstorage", "backbone.paginator"], function(App, moment){
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
        var NO_VIDEO_NAME = '-'
        var nextPageArray = []

        function addNextPage(pageId, nextPage) {
            var nextPageUrl = null
            if (nextPage) {
                nextPageUrl = nextPage.next
            }
            var isPageInArray = false
            for (var i=0; i<nextPageArray.length; ++i) {
                if (nextPageArray[i].id === pageId) {
                    isPageInArray = true
                    nextPageArray[i].nextPage = nextPageUrl
                    break
                }
            }
            if (!isPageInArray) {
                nextPageArray.push({id: pageId, nextPage: nextPageUrl})
            }
        }

        Entities.Facebook = Backbone.Model.extend({
            defaults:{
                id: "",
                updated_time: "",
                message: "",
                description: "",
                full_picture: "",
                name: "",
                link: ""
            }
        });

        function getVideoNameFromLink(link) {
            var regex = /\/video\/([^/]+)/.exec(link)
            if (regex) {
                return regex[1]
            }
            return NO_VIDEO_NAME
        }

        function filterByStatus(status, array) {
            return array.filter(function(post) {
                if (status === 'published') return post.attributes.is_published
                if (status === 'scheduled') return post.attributes.scheduled_publish_time
                return true
            })
        }

        function filterByPage(page, array) {
            return array.filter(function(post) {
                return page === 'all' || post.attributes.page === page
            })
        }

        Entities.FacebookCollection = Backbone.Collection.extend({
            byStatus: function(status) {
                return new Entities.FacebookCollection(filterByStatus(status, this))
            },
            byPage: function(page) {
                return new Entities.FacebookCollection(filterByPage(page, this))
            },
            fetch: function(options) {
                this.noNextPageCount = 0
                this.completeCount = 0
                this.errorCount = 0
                this.tempResults = []
                var self = this

                if (options && options.loadMore) {
                    nextPageArray.forEach(function(obj) {
                        if (obj.nextPage) {
                            $.ajax({
                                url: obj.nextPage,
                                type: "GET",
                                success: function(res) {
                                    addNextPage(obj.id, res.paging)
                                    self.addPartial(options, res.data)
                                },
                                error: function(err) {
                                    self.errorCount++
                                }
                            });
                        } else {
                            self.noNextPageCount++
                            if (self.noNextPageCount >= nextPageArray.length) {
                                $(window).scroll(function() {
                                    var newElement = '<div class="text-center"><small>No more posts to show</small></div>'
                                    $('.js-loading-posts').replaceWith(newElement)
                                    $(window).unbind('scroll');
                                })
                            }
                        }
                    })
                } else {
                    ALL_VIDDSEE_PAGES.forEach(function(id) {
                        var url = "https://graph.facebook.com/v2.5/" + id + "/promotable_posts"  +
                            "?fields=name,description,full_picture,link,message,updated_time,id,is_published,scheduled_publish_time" +
                            "&limit=50" +
                            "&access_token=" + localStorage.getItem('fb_access_token')
                        $.ajax({
                            url: url,
                            type: "GET",
                            success: function(res) {
                                addNextPage(id, res.paging)
                                self.addPartial(options, res.data)
                            },
                            error: function(err) {
                                self.errorCount++
                            }
                        });
                    })
                }
            },
            // add a JSON array that contains a subset of the collection
            addPartial: function(options, data) {
                this.completeCount ++
                var self = this

                // add each item to temp
                data.forEach(function(item) {
                    self.tempResults.push(item)
                })

                // if all have been received, then create the collection
                if (this.completeCount == ALL_VIDDSEE_PAGES.length) {
                    var sorted = self.tempResults.sort(function(a, b) {
                        return new Date(b.updated_time).getTime() - new Date(a.updated_time).getTime()
                    })

                    var attributesAdded = sorted.map(function(post) {
                        post.pageId = getFbPageIdFromPostId(post.id)
                        if (post.pageId === EN_PAGE_ID) {
                            post.pageName = 'Viddsee'
                            post.page = 'en'
                        } else if (post.pageId === ZH_PAGE_ID) {
                            post.pageName = 'Viddsee 亞洲微電影'
                            post.page = 'zh'
                        } else if (post.pageId === ID_PAGE_ID) {
                            post.pageName = 'Viddsee Film Pendek'
                            post.page = 'id'
                        } else if (post.pageId === PH_PAGE_ID) {
                            post.pageName = 'Viddsee Philippines'
                            post.page = 'ph'
                        }

                        if (post.scheduled_publish_time) {
                            post.scheduled_publish_time = moment(post.scheduled_publish_time * 1000).format('llll')
                        } else {
                            post.scheduled_publish_time = false
                        }
                        post.updated_time = moment(post.updated_time).calendar()
                        post.videoName = getVideoNameFromLink(post.link)
                        return post
                    })

                    // only display posts which are pubished or scheduled
                    var filtered = attributesAdded.filter(function(post) {
                        var isScheduled = post.scheduled_publish_time
                        var isPublished = post.is_published
                        return isScheduled || isPublished
                    })
                    if (options) {
                        if (options.loadMore) this.add(filtered)
                    } else {
                        this.reset(filtered)
                    }
                }
            },
            model: Entities.Facebook
        });


        var facebookCollection = new Entities.FacebookCollection();

        var API = {

            getFacebookEntities: function(status, page) {
                facebookCollection.status = status;
                facebookCollection.page = page;
                facebookCollection.fetch();
                return facebookCollection;
            },

            loadMoreFacebookEntities: function(status, page) {
                facebookCollection.status = status;
                facebookCollection.page = page;
                facebookCollection.fetch({loadMore: true, status: status, page: page});
                return facebookCollection;
            }
        };

        App.reqres.setHandler("facebook:entities", function(status, page){
            return API.getFacebookEntities(status, page);
        });

        App.reqres.setHandler("facebook:loadMore", function(status, page){
            return API.loadMoreFacebookEntities(status, page);
        });

        App.reqres.setHandler("facebook:filter", function(status, page){
            var filtered = facebookCollection

            if (page) {
                filtered = filtered.byPage(page)
            }

            if (status) {
                filtered = filtered.byStatus(status)
            }
            return filtered
        });

    });
});