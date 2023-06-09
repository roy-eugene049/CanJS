// Extend the base Bookmark model
var ValidatingBookmark = Bookmark.extend({
  init: function() {
    var urlPattern = new RegExp(
      "(http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?" +
      "(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?");
    // Add validations
    this.validatePresenceOf(["url", "title"]);
    this.validateFormatOf("url", urlPattern);
  }
}, {
});
// Extend the base bookmark form control
var ValidatingBookmarkFormControl = BookmarkFormControl.extend({
  // Add properties here.
  BookmarkModel: ValidatingBookmark,

  // Override the bookmark binding to listen for changes
  editBookmark: function(bookmark) {
    this._super(bookmark);
    var self = this;
    bookmark.bind("change", function() {
      var errorMessage = bookmark.errors() ?
        can.map(bookmark.errors(), function(message, attrName) {
          return attrName + " " + message + ". ";
        }).join("")
        : "";
      self.element.find(".text-error").html(errorMessage);
    });
  },

  saveBookmark: function(bookmark) {
    if (!bookmark.errors()) {
      this._super(bookmark);
    }
  }
});
var App_validation = can.Construct.extend({
  init: function() {
    ValidatingBookmark.findAll({}, function(bookmarks) {
      var eventHub = new can.Observe({});
      var options = {eventHub:eventHub, bookmarks:bookmarks};

      new BookmarkListControl("#bookmark_list_container", options);
      new ValidatingBookmarkFormControl("#bookmark_form_container", options);
    });
  }
});
