angular.module("proton.Models", [
  "ngResource",
  "proton.Auth"
])

.factory("Contact", function($resource, authentication) {
  return $resource(authentication.baseURL + "/contacts/:ContactID", authentication.params(), {
    query: {
      method: "get",
      isArray: true,
      transformResponse: function (data) {
        return JSON.parse(data).data;
      }
    },
    delete: {
      method: "delete",
      isArray: false
    },
    get: {
      method: "get",
      isArray: false,
      transformResponse: function (data) {
        return JSON.parse(data).data;
      }
    },
    patch: {
      method: "patch",
      isArray: false
    }
  });
})

.factory("Message", function($resource, authentication) {
  var Message = $resource(authentication.baseURL + "/messages/:MessageID", authentication.params(), {
    query: {
      method: "get",
      isArray: true,
      transformResponse: function (data) {
        return JSON.parse(data).data;
      }
    },
    delete: {
      method: "delete",
      isArray: false
    },
    get: {
      method: "get",
      isArray: false,
      transformResponse: function (data) {
        return JSON.parse(data).data;
      }
    },
    patch: {
      method: "patch",
      isArray: false
    },
    count: {
      method: "get",
      url: authentication.baseURL + "/messages/count",
      isArray: false,
      transformResponse: function (data) {
        return JSON.parse(data).data;
      }
    }
  });

  _.extend(Message.prototype, {
    readableTime: function() {
      return moment.unix(this.Time).format('LL');
    },
    toggleStar: function() {
      this.Tag = this.Tag === "starred" ? "" : "starred";
      return Message.patch({MessageID: this.MessageID}, {Tag: this.Tag});
    },
    moveTo: function(location) {
      this.Location = location;
      return Message.patch({MessageID: this.MessageID}, {Location: this.Location});
    },
    setReadStatus: function (status) {
      this.IsRead = status;
      return Message.patch({MessageID: this.MessageID}, {IsRead: status});
    },
    delete: function() {
      return this.$delete({MessageID: this.MessageID});
    },
    numberOfAttachments: function () {
      return this.AttachmentIDList.split(",").length;
    }
  });

  return Message;
})

.factory("User", function($resource, $injector) {
  var authentication = $injector.get("authentication");
  return $resource(authentication.baseURL + "/user", authentication.params(), {
    get: {
      method: 'get',
      isArray: false,
      transformResponse: function (data) {
        return JSON.parse(data).data;
      }
    }
  });
});
