var Contact,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Contact = (function() {
  Contact.prototype._$base = null;

  Contact.prototype._$main = null;

  Contact.prototype._$btClose = null;

  Contact.prototype._$form = null;

  Contact.prototype._opened = false;

  function Contact() {
    this._onHideComplete = __bind(this._onHideComplete, this);
    this._closeClickHandler = __bind(this._closeClickHandler, this);
    this._onSuccess = __bind(this._onSuccess, this);
    this._onSubmit = __bind(this._onSubmit, this);
    this._$base = $("#contact");
    this._$main = $("#main");
    this._$btClose = $("#bt_close_contact");
    this._$form = $("#contact_form");
    this._$success = $("#contact_form_success");
    this._$form.submit(this._onSubmit);
    TweenLite.set(this._$base, {
      autoAlpha: 0,
      y: 70
    });
  }

  Contact.prototype._onSubmit = function(e) {
    var $email;
    e.preventDefault();
    $email = this._$form.find("input[type='email']");
    $.ajax({
      type: "POST",
      url: "./save.php",
      data: {
        mail: $email.val()
      },
      dataType: "json",
      success: this._onSuccess
    });
  };

  Contact.prototype._onSuccess = function() {
    this._$form.hide();
    this._$success.show();
  };

  Contact.prototype.show = function() {
    if (this._opened) {
      return;
    }
    this._opened = true;
    this._$base.css("display", "block");
    TweenLite.set(this._$base, {
      autoAlpha: .8
    });
    TweenLite.to(this._$base, .8, {
      css: {
        autoAlpha: 1,
        y: 0
      },
      ease: Cubic.easeOut
    });
    TweenLite.to(this._$main, .7, {
      css: {
        bottom: "105px"
      },
      delay: .05,
      ease: Cubic.easeOut
    });
    this._$btClose.click(this._closeClickHandler);
  };

  Contact.prototype._closeClickHandler = function(e) {
    e.preventDefault();
    this.hide();
  };

  Contact.prototype.hide = function() {
    if (!this._opened) {
      return;
    }
    this._opened = false;
    this._$btClose.unbind();
    TweenLite.to(this._$base, .3, {
      css: {
        autoAlpha: 0,
        y: 100
      },
      delay: .025,
      ease: Cubic.easeOut,
      onComplete: this._onHideComplete
    });
    TweenLite.to(this._$main, .4, {
      css: {
        bottom: "0"
      },
      ease: Cubic.easeOut
    });
  };

  Contact.prototype._onHideComplete = function() {
    TweenLite.set(this._$base, {
      autoAlpha: 0
    });
    this._$base.css("display", "none");
  };

  return Contact;

})();

var Gallery,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Gallery = (function() {
  Gallery.prototype._$base = null;

  Gallery.prototype._$layer = null;

  Gallery.prototype._$btClose = null;

  Gallery.prototype._$diaporamaHolder = null;

  Gallery.prototype._$diaporamaCnt = null;

  Gallery.prototype._$diaporama = null;

  Gallery.prototype._$diaporamaImgs = null;

  Gallery.prototype._$galleryController = null;

  Gallery.prototype._$btTop = null;

  Gallery.prototype._$pagination = null;

  Gallery.prototype._$paginationMax = null;

  Gallery.prototype._$btBot = null;

  Gallery.prototype._opened = false;

  Gallery.prototype._idx = 0;

  Gallery.prototype._idxMax = 0;

  function Gallery() {
    this._onHideComplete = __bind(this._onHideComplete, this);
    this._closeClickHandler = __bind(this._closeClickHandler, this);
    this._botClickHandler = __bind(this._botClickHandler, this);
    this._topClickHandler = __bind(this._topClickHandler, this);
    this._$base = $("#gallery");
    this._$layer = $("#layer");
    this._$btClose = $("#bt_close_gallery");
    this._$diaporamaHolder = $("#gallery_diaporama_holder");
    this._$diaporamaCnt = $("#gallery_diaporama_cnt");
    this._$diaporama = $("#gallery_diaporama");
    this._$diaporamaImgs = this._$diaporama.find("li");
    this._$galleryController = $("#gallery_controller");
    this._$btTop = $("#gallery_bt_top");
    this._$pagination = $("#gallery_pagination");
    this._$paginationMax = $("#gallery_pagination_max");
    this._$btBot = $("#gallery_bt_bot");
    this._idxMax = this._$diaporamaImgs.length;
    this._$paginationMax.html("0" + this._idxMax);
    this._$btTop.click(this._topClickHandler);
    this._$btBot.click(this._botClickHandler);
  }

  Gallery.prototype._topClickHandler = function() {
    this._idx--;
    if (this._idx < 0) {
      this._idx = 0;
    }
    this._update();
  };

  Gallery.prototype._botClickHandler = function() {
    this._idx++;
    if (this._idx >= this._idxMax - 1) {
      this._idx = this._idxMax - 1;
    }
    this._update();
  };

  Gallery.prototype._update = function() {
    this._$pagination.html("0" + (this._idx + 1));
    TweenLite.to(this._$diaporama, .5, {
      y: -this._idx * 478
    });
  };

  Gallery.prototype.show = function() {
    if (this._opened) {
      return;
    }
    this._opened = true;
    this._$base.show();
    this._$layer.show();
    TweenLite.set(this._$layer, {
      css: {
        autoAlpha: 0
      }
    });
    TweenLite.set(this._$btClose, {
      css: {
        autoAlpha: 0,
        y: -20
      }
    });
    TweenLite.set(this._$diaporamaCnt, {
      css: {
        autoAlpha: 0,
        y: 100
      }
    });
    TweenLite.set(this._$galleryController, {
      css: {
        autoAlpha: 0,
        y: 100
      }
    });
    TweenLite.to(this._$layer, .4, {
      css: {
        autoAlpha: 1
      }
    });
    TweenLite.to(this._$btClose, .17, {
      delay: .05,
      css: {
        autoAlpha: 1,
        y: -8
      },
      ease: Sine.easeIn
    });
    TweenLite.to(this._$btClose, .53, {
      delay: .17 + .05,
      css: {
        y: 0
      },
      ease: Back.easeOut,
      easeParams: [1.2]
    });
    TweenLite.to(this._$diaporamaCnt, .17, {
      css: {
        autoAlpha: 1,
        y: 60
      },
      ease: Sine.easeIn
    });
    TweenLite.to(this._$diaporamaCnt, .53, {
      delay: .17,
      css: {
        y: 0
      },
      ease: Back.easeOut,
      easeParams: [1.2]
    });
    TweenLite.to(this._$galleryController, .17, {
      delay: .15,
      css: {
        autoAlpha: 1,
        y: 60
      },
      ease: Sine.easeIn
    });
    TweenLite.to(this._$galleryController, .53, {
      delay: .15 + .17,
      css: {
        y: 0
      },
      ease: Back.easeOut,
      easeParams: [1.2]
    });
    this._$btClose.click(this._closeClickHandler);
  };

  Gallery.prototype._closeClickHandler = function(e) {
    e.preventDefault();
    this.hide();
  };

  Gallery.prototype.hide = function() {
    if (!this._opened) {
      return;
    }
    TweenLite.to(this._$btClose, .3, {
      css: {
        autoAlpha: 0,
        y: -20
      },
      ease: Quad.easeOut
    });
    TweenLite.to(this._$diaporamaCnt, .3, {
      css: {
        autoAlpha: 0,
        y: 60
      },
      ease: Cubic.easeOut
    });
    TweenLite.to(this._$galleryController, .3, {
      css: {
        autoAlpha: 0,
        y: 60
      },
      ease: Cubic.easeOut
    });
    TweenLite.to(this._$layer, .3, {
      delay: .1,
      css: {
        autoAlpha: 0
      },
      ease: Quad.easeOut,
      onComplete: this._onHideComplete
    });
    this._opened = false;
  };

  Gallery.prototype._onHideComplete = function() {
    this._$base.hide();
    this._$layer.hide();
  };

  return Gallery;

})();

var Background;

Background = (function() {
  Background.prototype._$background = null;

  Background.prototype._$background_sky = null;

  Background.prototype._$background_ground = null;

  Background.prototype._$lines = null;

  Background.prototype._heights = null;

  Background.prototype._speeds = null;

  Background.prototype._delays = null;

  function Background() {
    var $line, line, _i, _len, _ref;
    this._$background = $("#background");
    this._$background_sky = $("#background_sky");
    this._$background_ground = $("#background_ground");
    this._$lines = this._$background_sky.find(".background__line");
    this._heights = [];
    _ref = this._$lines;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      $line = $(line);
      this._heights.push($line.height());
      $line.height(0);
    }
    this._$background_ground.css("bottom", "-130px");
    this._$background_sky.css("bottom", "-300px");
  }

  Background.prototype.show = function(delay) {
    this._showLines(delay);
  };

  Background.prototype._showLines = function(delay) {
    var idx, line, ratio, speed, _i, _len, _ref;
    this._speeds = [6, 4, 3, 2.8, 2.7, 2.5, 2.3];
    this._delays = [0, 2, 3, 3.5, 4, 4.15, 4.35];
    ratio = .25;
    idx = 0;
    speed = 1;
    _ref = this._$lines;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      TweenLite.to(line, this._speeds[idx] * ratio, {
        height: this._heights[idx] + "px",
        delay: this._delays[idx] * ratio + delay,
        ease: Quad.easeOut
      });
      idx++;
    }
    TweenLite.to(this._$background_sky, 5.5 * ratio, {
      bottom: 0,
      delay: delay
    });
    TweenLite.to(this._$background_ground, 4 * ratio, {
      bottom: 0,
      delay: 3 * ratio + delay,
      ease: Quad.easeOut
    });
  };

  return Background;

})();

var Content, PreviewWorld,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Content = (function() {
  Content.prototype._$logoTitle = null;

  Content.prototype._$logoIcon = null;

  Content.prototype._$separatorDots = null;

  Content.prototype._$title = null;

  Content.prototype._$subtitle = null;

  Content.prototype._$credits = null;

  Content.prototype._$separatorHorizontal = null;

  Content.prototype._previewWorld = null;

  function Content() {
    this._$logoTitle = $("#logo_title");
    this._$logoIcon = $("#logo_icon");
    this._$separatorDots = $("#content_separator_dots");
    this._$title = $("#content_description_title");
    this._$subtitle = $("#content_description_subtitle");
    this._$credits = $("#content_description_credits");
    this._$separatorHorizontal = $("#content_separator_horizontal");
    this._previewWorld = new PreviewWorld();
    TweenLite.set(this._$logoTitle, {
      autoAlpha: 0,
      y: -20
    });
    TweenLite.set(this._$logoIcon, {
      autoAlpha: 0,
      y: 20
    });
    this._$logoIcon.css({
      opacity: 0
    });
    this._$separatorDots.css({
      opacity: 0
    });
    this._$title.css({
      opacity: 0
    });
    this._$subtitle.css({
      opacity: 0
    });
    this._$credits.css({
      opacity: 0
    });
    this._$separatorHorizontal.css({
      opacity: 0
    });
  }

  Content.prototype.show = function() {
    TweenLite.to(this._$separatorDots, 3, {
      autoAlpha: 1,
      delay: .2,
      ease: Quad.easeOut
    });
    TweenLite.to(this._$title, 3, {
      autoAlpha: 1,
      delay: .2,
      ease: Quad.easeOut
    });
    TweenLite.to(this._$subtitle, 3, {
      autoAlpha: 1,
      delay: 1.25,
      ease: Quad.easeOut
    });
    TweenLite.to(this._$credits, 3, {
      autoAlpha: 1,
      delay: 2.3,
      ease: Quad.easeOut
    });
    TweenLite.to(this._$separatorHorizontal, .4, {
      autoAlpha: 1,
      delay: 4.4
    });
    TweenLite.to(this._$logoIcon, .8, {
      autoAlpha: 1,
      y: 0,
      delay: 4.05
    });
    TweenLite.to(this._$logoTitle, .8, {
      autoAlpha: 1,
      y: 0,
      delay: 4.15
    });
    this._previewWorld.show(4.5);
  };

  return Content;

})();

PreviewWorld = (function() {
  PreviewWorld.prototype._$banner = null;

  PreviewWorld.prototype._$bannerTitle = null;

  PreviewWorld.prototype._$diaporama = null;

  PreviewWorld.prototype._$diaporamaImgs = null;

  PreviewWorld.prototype._countImg = 0;

  PreviewWorld.prototype._$bt = null;

  PreviewWorld.prototype._$previewWorldLayer = null;

  PreviewWorld.prototype._idxImg = -1;

  PreviewWorld.prototype._currentImg = null;

  function PreviewWorld() {
    this._next = __bind(this._next, this);
    this._previewOutHandler = __bind(this._previewOutHandler, this);
    this._previewOverHandler = __bind(this._previewOverHandler, this);
    var img, px, _i, _len, _ref;
    this._$banner = $("#preview_world_banner");
    this._$bannerTitle = this._$banner.find("span");
    this._$diaporama = $("#world_diaporama");
    this._$diaporamaImgs = this._$diaporama.find("img");
    this._countImg = this._$diaporamaImgs.length;
    this._$bt = $("#preview_world_bt");
    this._$previewWorldLayer = $("#preview_world_layer");
    TweenLite.set(this._$banner, {
      autoAlpha: 0,
      scaleX: .8
    });
    TweenLite.set(this._$bannerTitle, {
      autoAlpha: 0
    });
    TweenLite.set(this._$bt, {
      autoAlpha: 0,
      y: -10
    });
    px = 0;
    _ref = this._$diaporamaImgs;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      img = _ref[_i];
      $(img).css("left", px + "px");
      px += 155;
    }
    TweenLite.set(this._$previewWorldLayer, {
      autoAlpha: 0
    });
    this._$bt.hover(this._previewOverHandler, this._previewOutHandler);
    this._next();
  }

  PreviewWorld.prototype._previewOverHandler = function(e) {
    TweenLite.to(this._$previewWorldLayer, .4, {
      autoAlpha: 1,
      ease: Cubic.easeOut
    });
  };

  PreviewWorld.prototype._previewOutHandler = function(e) {
    TweenLite.to(this._$previewWorldLayer, .2, {
      autoAlpha: 0,
      ease: Cubic.easeIn
    });
  };

  PreviewWorld.prototype._next = function() {
    var newImg;
    this._idxImg++;
    if (this._idxImg > this._countImg - 1) {
      this._idxImg = 0;
    }
    newImg = this._$diaporamaImgs[this._idxImg];
    TweenLite.to(this._$diaporamaImgs, .4, {
      css: {
        x: -this._idxImg * 155
      },
      ease: Sine.easeOut
    });
    this._currentImg = newImg;
    setTimeout(this._next, 4000);
  };

  PreviewWorld.prototype._hideImg = function(img) {
    TweenLite.set(img, {
      autoAlpha: 0
    });
  };

  PreviewWorld.prototype.show = function(delay) {
    TweenLite.to(this._$banner, .4, {
      autoAlpha: 1,
      scaleX: 1,
      delay: delay,
      ease: Back.easeOut
    });
    TweenLite.to(this._$bannerTitle, .25, {
      autoAlpha: 1,
      delay: delay + .3
    });
    TweenLite.to(this._$bt, .4, {
      autoAlpha: 1,
      y: 0,
      delay: delay + .2
    });
  };

  return PreviewWorld;

})();

var Cloud, Clouds, Landscape,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Landscape = (function() {
  Landscape.prototype._clouds = null;

  Landscape.prototype._$human = null;

  Landscape.prototype._$selector = null;

  Landscape.prototype._$dog = null;

  Landscape.prototype._$tree = null;

  Landscape.prototype._$fenceLeft = null;

  Landscape.prototype._$fenceRight = null;

  Landscape.prototype._$eyesHuman = null;

  Landscape.prototype._$eyesDog = null;

  function Landscape() {
    this._blinkDog = __bind(this._blinkDog, this);
    this._showEyes = __bind(this._showEyes, this);
    this._blinkHuman = __bind(this._blinkHuman, this);
    this._startBlinking = __bind(this._startBlinking, this);
    this._clouds = new Clouds();
    this._$human = $("#character_human");
    this._$selector = $("#selector_human");
    this._$dog = $("#character_dog");
    this._$tree = $("#tree");
    this._$fenceLeft = $("#fence_left");
    this._$fenceRight = $("#fence_right");
    this._$eyesHuman = this._$human.find(".eyes");
    this._$eyesDog = this._$dog.find(".eyes");
    TweenLite.set(this._$human, {
      autoAlpha: 0,
      y: 25
    });
    TweenLite.set(this._$selector, {
      autoAlpha: 0,
      y: -10
    });
    TweenLite.set(this._$dog, {
      autoAlpha: 0,
      y: 25
    });
    TweenLite.set(this._$tree, {
      autoAlpha: 0,
      y: 25
    });
    TweenLite.set(this._$fenceLeft, {
      autoAlpha: 0,
      y: 15
    });
    TweenLite.set(this._$fenceRight, {
      autoAlpha: 0,
      y: 15
    });
  }

  Landscape.prototype.show = function(delay) {
    this._clouds.show(delay);
    TweenLite.to(this._$human, .5, {
      css: {
        autoAlpha: 1,
        y: 0
      },
      delay: delay + .145,
      ease: Cubic.easeOut
    });
    TweenLite.to(this._$selector, .5, {
      css: {
        autoAlpha: 1,
        y: 0
      },
      delay: delay + .345,
      ease: Back.easeOut
    });
    TweenLite.to(this._$dog, .5, {
      css: {
        autoAlpha: 1,
        y: 0
      },
      delay: delay + .13,
      ease: Cubic.easeOut,
      onComplete: this._startBlinking
    });
    TweenLite.to(this._$tree, .5, {
      css: {
        autoAlpha: 1,
        y: 0
      },
      delay: delay + .15,
      ease: Cubic.easeOut
    });
    TweenLite.to(this._$fenceLeft, .5, {
      css: {
        autoAlpha: 1,
        y: 0
      },
      delay: delay + .145,
      ease: Cubic.easeOut
    });
    TweenLite.to(this._$fenceRight, .5, {
      css: {
        autoAlpha: 1,
        y: 0
      },
      delay: delay + .145,
      ease: Cubic.easeOut
    });
    delay += .1;
  };

  Landscape.prototype._startBlinking = function() {
    this._blinkHuman();
    TweenLite.delayedCall(.5, this._blinkDog);
  };

  Landscape.prototype._blinkHuman = function() {
    this._$eyesHuman.hide();
    TweenLite.delayedCall(.25, this._showEyes, [this._$eyesHuman]);
    TweenLite.delayedCall(.5, this._hideEyes, [this._$eyesHuman]);
    TweenLite.delayedCall(.75, this._showEyes, [this._$eyesHuman]);
    setTimeout(this._blinkHuman, Math.random() * 6000 + 4000);
  };

  Landscape.prototype._showEyes = function(eyes) {
    eyes.show();
  };

  Landscape.prototype._hideEyes = function(eyes) {
    eyes.hide();
  };

  Landscape.prototype._blinkDog = function() {
    this._$eyesDog.hide();
    TweenLite.delayedCall(.25, this._showEyes, [this._$eyesDog]);
    TweenLite.delayedCall(.5, this._hideEyes, [this._$eyesDog]);
    TweenLite.delayedCall(.75, this._showEyes, [this._$eyesDog]);
    setTimeout(this._blinkDog, Math.random() * 4000 + 2000);
  };

  return Landscape;

})();

Clouds = (function() {
  Clouds.prototype._$clouds = null;

  Clouds.prototype._cloudLeft0 = null;

  Clouds.prototype._cloudLeft1 = null;

  Clouds.prototype._cloudRight0 = null;

  Clouds.prototype._cloudRight1 = null;

  Clouds.prototype._cloudRight2 = null;

  function Clouds() {
    this._$clouds = $("#clouds");
    this._cloudLeft0 = new Cloud(this._$clouds.find(".landscape__cloud--cloud3"), 20);
    this._cloudLeft1 = new Cloud(this._$clouds.find(".landscape__cloud--cloud2"), 20);
    this._cloudRight0 = new Cloud(this._$clouds.find(".landscape__cloud--cloud0"), -20);
    this._cloudRight1 = new Cloud(this._$clouds.find(".landscape__cloud--cloud4"), -20);
    this._cloudRight2 = new Cloud(this._$clouds.find(".landscape__cloud--cloud1"), -20);
    return;
  }

  Clouds.prototype.show = function(delay) {
    this._cloudLeft0.show(delay);
    this._cloudLeft1.show(delay + .1);
    this._cloudRight0.show(delay + .05);
    this._cloudRight1.show(delay + .15);
    this._cloudRight2.show(delay + .075);
  };

  return Clouds;

})();

Cloud = (function() {
  Cloud.CLOUDS = [];

  Cloud.prototype.$base = null;

  Cloud.prototype._vy = 0;

  Cloud.prototype._py = 0;

  Cloud.prototype._ty = 0;

  function Cloud($base, px) {
    this.$base = $base;
    this.px = px;
    this._move = __bind(this._move, this);
    this._vy = Math.random() * .05 - .025;
    if (this._vy < 0) {
      this._vy = Math.min(this._vy, -.015);
    }
    if (this._vy > 0) {
      this._vy = Math.max(this._vy, .015);
    }
    this._py = this._vy;
    TweenLite.set(this.$base, {
      css: {
        x: this.px,
        autoAlpha: 0
      }
    });
    Cloud.CLOUDS.push(this);
    return;
  }

  Cloud.prototype.show = function(delay) {
    TweenLite.to(this.$base, .5, {
      css: {
        x: 0,
        autoAlpha: 1
      },
      delay: delay
    });
    setTimeout(this._move, Math.random() * 1000);
  };

  Cloud.prototype._move = function() {
    this._py += this._vy;
    this._ty = (Math.sin(this._py) * 10 - this._ty) * .9;
    TweenLite.set(this.$base, {
      css: {
        y: this._ty
      }
    });
    requestAnimationFrame(this._move);
  };

  return Cloud;

})();

var Main,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$(function() {
  var main;
  main = new Main();
  return main.show();
});

Main = (function() {
  Main.prototype._background = null;

  Main.prototype._landscape = null;

  Main.prototype._content = null;

  Main.prototype._menu = null;

  Main.prototype._$share = null;

  Main.prototype._gallery = null;

  Main.prototype._contact = null;

  Main.prototype._currentModule = null;

  function Main() {
    this._onTwitterClick = __bind(this._onTwitterClick, this);
    this._onFacebookClick = __bind(this._onFacebookClick, this);
    this._onContact = __bind(this._onContact, this);
    this._onGallery = __bind(this._onGallery, this);
    $("#btMenuGallery").click(this._onGallery);
    $("#btMenuContact").click(this._onContact);
    $("#preview_world_bt").click(this._onGallery);
    $("#bt_share--facebook").click(this._onFacebookClick);
    $("#bt_share--twitter").click(this._onTwitterClick);
    this._background = new Background();
    this._landscape = new Landscape();
    this._content = new Content();
    this._menu = new Menu();
    this._$share = $("#share");
    TweenLite.set(this._$share, {
      css: {
        autoAlpha: 0,
        y: -50
      }
    });
    this._gallery = new Gallery();
    this._contact = new Contact();
  }

  Main.prototype.show = function() {
    this._content.show();
    this._background.show(3);
    this._landscape.show(4.25);
    this._menu.show(4.3);
    TweenLite.to(this._$share, .2, {
      delay: 4.4,
      css: {
        autoAlpha: .8,
        y: -20
      },
      ease: Sine.easeIn
    });
    TweenLite.to(this._$share, .4, {
      delay: 4.6,
      css: {
        autoAlpha: 1,
        y: 0
      },
      ease: Cubic.easeOut
    });
  };

  Main.prototype._onGallery = function(e) {
    if (this._currentModule === this._gallery && this._currentModule._opened) {
      return;
    }
    e.preventDefault();
    this._hideCurrentModule();
    this._gallery.show();
    this._currentModule = this._gallery;
  };

  Main.prototype._onContact = function(e) {
    if (this._currentModule === this._contact && this._currentModule._opened) {
      return;
    }
    e.preventDefault();
    this._hideCurrentModule();
    this._contact.show();
    this._currentModule = this._contact;
  };

  Main.prototype._onFacebookClick = function(e) {
    window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(location.href) + "&t=" + encodeURIComponent(document.title), "Share us on facebook", "toolbar=0,status=0,width=548,height=325");
    return false;
  };

  Main.prototype._onTwitterClick = function(e) {
    var description;
    description = "Discover ModernHero, an amazing iOS mobile game!";
    window.open("https://twitter.com/home?status=" + encodeURIComponent(description) + " - " + encodeURIComponent(location.href) + " - " + encodeURIComponent("@modernhero_game"), "Share us on twitter", "toolbar=0,status=0,width=548,height=325");
    return false;
  };

  Main.prototype._hideCurrentModule = function() {
    if (!this._currentModule) {
      return;
    }
    this._currentModule.hide();
  };

  return Main;

})();

var Menu;

Menu = (function() {
  Menu.prototype._$menu = null;

  Menu.prototype._$links = null;

  function Menu() {
    var link, _i, _len, _ref;
    this._$menu = $("#menu");
    this._$links = this._$menu.find("a");
    TweenLite.set(this._$menu, {
      css: {
        autoAlpha: 0,
        y: 30
      }
    });
    _ref = this._$links;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      link = _ref[_i];
      TweenLite.set(link, {
        css: {
          autoAlpha: 0,
          y: 20
        }
      });
    }
  }

  Menu.prototype.show = function(delay) {
    var d, link, _i, _len, _ref;
    TweenLite.to(this._$menu, .6, {
      css: {
        autoAlpha: 1,
        y: 0
      },
      delay: delay,
      ease: Cubic.easeOut
    });
    d = 0;
    _ref = this._$links;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      link = _ref[_i];
      TweenLite.to(link, .6, {
        css: {
          autoAlpha: 1,
          y: 0
        },
        delay: delay + .1 + d,
        ease: Quad.easeOut
      });
      d += .075;
    }
  };

  return Menu;

})();
