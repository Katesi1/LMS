(function (g, c) {
  "function" === typeof define && define.amd
    ? define("pnotify.mobile", ["jquery", "pnotify"], c)
    : "object" === typeof exports && "undefined" !== typeof module
    ? (module.exports = c(require("jquery"), require("./pnotify")))
    : c(g.jQuery, g.PNotify);
})(this, function (g, c) {
  c.prototype.options.mobile = { swipe_dismiss: !0, styling: !0 };
  c.prototype.modules.mobile = {
    swipe_dismiss: !0,
    init: function (a, b) {
      var c = this,
        d = null,
        e = null,
        f = null;
      this.swipe_dismiss = b.swipe_dismiss;
      this.doMobileStyling(a, b);
      a.elem.on({
        touchstart: function (b) {
          c.swipe_dismiss &&
            ((d = b.originalEvent.touches[0].screenX),
            (f = a.elem.width()),
            a.container.css("left", "0"));
        },
        touchmove: function (b) {
          d &&
            c.swipe_dismiss &&
            ((e = b.originalEvent.touches[0].screenX - d),
            (b = (1 - Math.abs(e) / f) * a.options.opacity),
            a.elem.css("opacity", b),
            a.container.css("left", e));
        },
        touchend: function () {
          if (d && c.swipe_dismiss) {
            if (40 < Math.abs(e)) {
              var b = 0 > e ? -2 * f : 2 * f;
              a.elem.animate({ opacity: 0 }, 100);
              a.container.animate({ left: b }, 100);
              a.remove();
            } else
              a.elem.animate({ opacity: a.options.opacity }, 100),
                a.container.animate({ left: 0 }, 100);
            f = e = d = null;
          }
        },
        touchcancel: function () {
          d &&
            c.swipe_dismiss &&
            (a.elem.animate({ opacity: a.options.opacity }, 100),
            a.container.animate({ left: 0 }, 100),
            (f = e = d = null));
        },
      });
    },
    update: function (a, b) {
      this.swipe_dismiss = b.swipe_dismiss;
      this.doMobileStyling(a, b);
    },
    doMobileStyling: function (a, b) {
      if (b.styling)
        if (
          (a.elem.addClass("ui-pnotify-mobile-able"), 480 >= g(window).width())
        )
          a.options.stack.mobileOrigSpacing1 ||
            ((a.options.stack.mobileOrigSpacing1 = a.options.stack.spacing1),
            (a.options.stack.mobileOrigSpacing2 = a.options.stack.spacing2)),
            (a.options.stack.spacing1 = 0),
            (a.options.stack.spacing2 = 0);
        else {
          if (
            a.options.stack.mobileOrigSpacing1 ||
            a.options.stack.mobileOrigSpacing2
          )
            (a.options.stack.spacing1 = a.options.stack.mobileOrigSpacing1),
              delete a.options.stack.mobileOrigSpacing1,
              (a.options.stack.spacing2 = a.options.stack.mobileOrigSpacing2),
              delete a.options.stack.mobileOrigSpacing2;
        }
      else
        a.elem.removeClass("ui-pnotify-mobile-able"),
          a.options.stack.mobileOrigSpacing1 &&
            ((a.options.stack.spacing1 = a.options.stack.mobileOrigSpacing1),
            delete a.options.stack.mobileOrigSpacing1),
          a.options.stack.mobileOrigSpacing2 &&
            ((a.options.stack.spacing2 = a.options.stack.mobileOrigSpacing2),
            delete a.options.stack.mobileOrigSpacing2);
    },
  };
});
