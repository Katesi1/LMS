(function (e, d) {
  "function" === typeof define && define.amd
    ? define("pnotify.animate", ["jquery", "pnotify"], d)
    : "object" === typeof exports && "undefined" !== typeof module
    ? (module.exports = d(require("jquery"), require("./pnotify")))
    : d(e.jQuery, e.PNotify);
})(this, function (e, d) {
  d.prototype.options.animate = { animate: !1, in_class: "", out_class: "" };
  d.prototype.modules.animate = {
    init: function (a, b) {
      this.setUpAnimations(a, b);
      a.attention = function (c, b) {
        a.elem
          .one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function () {
              a.elem.removeClass(c);
              b && b.call(a);
            }
          )
          .addClass("animated " + c);
      };
    },
    update: function (a, b, c) {
      b.animate != c.animate && this.setUpAnimations(a, b);
    },
    setUpAnimations: function (a, b) {
      if (b.animate) {
        a.options.animation = "none";
        a.elem.removeClass(
          "ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast"
        );
        a._animateIn || (a._animateIn = a.animateIn);
        a._animateOut || (a._animateOut = a.animateOut);
        a.animateIn = this.animateIn.bind(this);
        a.animateOut = this.animateOut.bind(this);
        var c = 400;
        "slow" === a.options.animate_speed
          ? (c = 600)
          : "fast" === a.options.animate_speed
          ? (c = 200)
          : 0 < a.options.animate_speed && (c = a.options.animate_speed);
        c /= 1e3;
        a.elem
          .addClass("animated")
          .css({
            "-webkit-animation-duration": c + "s",
            "-moz-animation-duration": c + "s",
            "animation-duration": c + "s",
          });
      } else
        a._animateIn &&
          a._animateOut &&
          ((a.animateIn = a._animateIn),
          delete a._animateIn,
          (a.animateOut = a._animateOut),
          delete a._animateOut,
          a.elem.addClass("animated"));
    },
    animateIn: function (a) {
      this.notice.animating = "in";
      var b = this;
      a = function () {
        this && this.call();
        b.notice.animating = !1;
      }.bind(a);
      this.notice.elem
        .show()
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          a
        )
        .removeClass(this.options.out_class)
        .addClass("ui-pnotify-in")
        .addClass(this.options.in_class);
    },
    animateOut: function (a) {
      this.notice.animating = "out";
      var b = this;
      a = function () {
        b.notice.elem.removeClass("ui-pnotify-in");
        this && this.call();
        b.notice.animating = !1;
      }.bind(a);
      this.notice.elem
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          a
        )
        .removeClass(this.options.in_class)
        .addClass(this.options.out_class);
    },
  };
});
