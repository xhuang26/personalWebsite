const arrow_index_height = 164;

$(window).load(function(){
  changeIntroElemSize();
  const _articles = $(".project_image article");
  
  windowResize();
  setBackground(_articles);
  setInterval(rotateImages, 4000);
  hoveringArrow();
  scrollEvent();
  clickArrow();
  fishVideoReplay();
  
  hoverLink();
  hoverVideos(".clock .pic", ".clock .text", true);
  hoverVideos(".plant", ".plant .text", false);
  clickNav(".workNav", ".projects");
  clickNav(".aboutmeNav", ".aboutme");
});
const projects = ['./img/mp1_1.png', './img/mp1_2.png', './img/mp1_3.png', "./img/mp2_1.png", "./img/mp2_2.png", "./img/mp2_3.png", "./img/mp2_4.png", "./img/mp4_1.png", "./img/mp4_3.png", "./img/mp4_4.png", "./img/mp4_5.png"];
const months = ["February", "March", "May"];
const proj_names = ["Movie Gallery", "Personal Website", "Team Task Manager"];
var cur_i = 0;

const setBackground = function(_articles){
    
    if(_articles.length < projects.length){
     
      while($(".project_image article").length != projects.length){
        $(".project_image").append("<article></article>");
      }
    } else if(_aricles.length > projects.length){
      console.warn('invalid size of projects!');
    }
    $(".project_image article").each(function(index){
      var url = "url("+projects[index]+")";
      $(this).css("background-image", url);
      var name = projects[index].split('_')[0].slice(-3);
      $(this).attr('proj', name);
    });
   
    
  }


function hoverLink(){
  $(".linkLi").mouseenter(function(){
    var elem = $(this).children("i");
   elem.addClass("fa-spin");
  });
  $(".linkLi").mouseleave(function(){
    var elem = $(this).children("i");
   elem.removeClass("fa-spin");
  })
}

function hoverVideos(className, textName, isVideo){
  const video = $(className);
  const text = $(textName);
  if(isVideo){
    video.mouseenter(function(){
      text.animate({"opacity": 1}, {duration:300,easing:"swing"});
      video.get(0).play();
    });
    video.mouseleave(function(){
      text.animate({"opacity": 0}, {duration:300,easing:"swing"});
      video.get(0).pause();
    });
  } else {
    video.mouseenter(function(){
      text.animate({"opacity": 1}, {duration:300,easing:"swing"});

    });
    video.mouseleave(function(){
      text.animate({"opacity": 0}, {duration:300,easing:"swing"});
      //text.css("opacity", 0);
    });
  }
  
}

function clickNav(className, desClassName){
  const nav= $(className);
  const des = $(desClassName).position().top;
  nav.click(function(){
    $("html,body")
      .stop()
      .animate({"scrollTop": des + "px"}, {duration:1000,easing:"swing"});
  });
}
function hoveringArrow(){
  const arrow_section = $(".arrow");
  const arrow = $(".hoveringArrow");
  arrow_section.mouseenter(function(){
    arrow.css("content", "url('./img/hoveringArrowBlue.png')");
  }).mouseleave(function(){
    arrow.css("content", "url('./img/hoveringArrow.png')");
  });
}
function clickArrow(){
  const arrow_section = $(".arrow_index");
  const $scrollingDiv = $(".arrow_index");
  const arrow_index_height = 164;
  const marginTop = 30;
  arrow_section.click(function(){
    var threshold = getThreshould(marginTop, ".aboutme");
   $('html,body').animate({scrollTop: $(".projects").position().top}, 'slow', function(){
     $scrollingDiv
		.stop()
		.animate({"marginTop": threshold + "px"}, {duration:1600,easing:"swing"});
   });
    
  });
}

function fishVideoReplay(){
  $(".fishVideo").on("ended", function(){
    var marginTop = getMarginTop();
    var videoPlayingThreshould = $(".aboutme").position().top;
    var arrowMovingThreshold = getThreshould(marginTop, ".aboutme");
    if($(window).scrollTop() > videoPlayingThreshould && $(window).scrollTop() < arrowMovingThreshold){
      $(".fishVideo").get(0).play();
    }
  });
}
function changeIntroElemSize() {
  /*$(".my_objects .clock .pic").on("canplay", function(){*/
    var plantHeight = $(".my_objects .plant .pic").height();
    console.log($(".my_objects .plant .pic").css("height"));
    $(".my_objects .clock .pic").css("height", plantHeight);
    var plantMargin = $(".my_objects .plant").css("margin-top").slice(0, -2);

    console.log("plantHeight", plantHeight);
    if(plantHeight !== 0){
      var new_height = plantHeight*2+Math.ceil(plantMargin); 
      console.log("newHeight", new_height);

      $(".microwave img").css("height", new_height);
      $(".intro").css("height", new_height);
      $(".my_objects .col .text").css("height", plantHeight/2);
      $(".my_objects .col .text").css("padding-top", plantHeight/2);
    } else if($(".intro").css("height") !== 300){
      $(".intro").css("height", 300);
      $(".microwave img").css("height", 300);
    }
  //});
}
function windowResize(){

  $(window).resize(function(){
    var clockHeight = $(".my_objects .clock .pic").height();
    $(".my_objects .plant .pic").css("height", clockHeight);
    var plantMargin = $(".my_objects .plant").css("margin-top").slice(0, -2);
    if(clockHeight !== 0){
      var new_height = clockHeight*2+Math.ceil(plantMargin);
      $(".microwave img").css("height", new_height);
      $(".intro").css("height", new_height);
      $(".my_objects .col .text").css("height", clockHeight/2);
      $(".my_objects .col .text").css("padding-top", clockHeight/2);
    }else if($(".intro").css("height") !== 300){
      $(".intro").css("height", 300);
      $(".microwave img").css("height", 300);
    }
    marginTop = getMarginTop();
    arrowMovingThreshold = getThreshould(marginTop, ".aboutme");
    const $scrollingDiv = $(".arrow_index");
    if($(window).scrollTop() > arrowMovingThreshold){
      $scrollingDiv
      .stop()
      .animate({"marginTop": arrowMovingThreshold + "px"}, {duration:1600,easing:"swing"});
    }
  });
}

function getMarginTop(){
  var marginTop = 30;
  if($(window).scrollTop() == 0){
      marginTop = 0;
    } else {
      marginTop = 30;
    }
  return marginTop;
}
function getThreshould(marginTop, className){
  return $(className).position().top+$(className).innerHeight()-arrow_index_height-marginTop-80;
}
function scrollEvent(){
  const $scrollingDiv = $(".arrow_index");
  const $microwave = $(".microwave img");
  const microwaveSrc = $microwave.attr('src');
  var marginTop = getMarginTop();
  var arrowMovingThreshold = getThreshould(marginTop, ".aboutme");
  var introVideoThreshould = getThreshould(70, ".intro");
  if($(window).scrollTop() < arrowMovingThreshold){
      $scrollingDiv
		.stop()
		.animate({"marginTop": ($(window).scrollTop() + marginTop) + "px"}, {duration:1600,easing:"swing"})
  }
  
  var scrollTop = $(window).scrollTop();
    if(scrollTop < arrowMovingThreshold){  
      if($microwave.attr('src') != microwaveSrc && scrollTop >= introVideoThreshould){
        $microwave.attr('src', microwaveSrc); 
      } else if(scrollTop < introVideoThreshould){
        $microwave.attr('src', microwaveSrc); 
        $microwave.attr('src', microwaveSrc.replace('_static.gif', '.gif'));
      }			
    }
  
  $(window).scroll(function(){	
    marginTop = getMarginTop();
    introVideoThreshould = getThreshould(70, ".intro");
    arrowMovingThreshold = getThreshould(marginTop, ".aboutme");
    scrollTop = $(window).scrollTop();
    if(scrollTop < arrowMovingThreshold){  
      if($microwave.attr('src') != microwaveSrc && scrollTop >= introVideoThreshould){
        $microwave.attr('src', microwaveSrc); 
      } else if(scrollTop < introVideoThreshould){
        $microwave.attr('src', microwaveSrc.replace('_static.gif', '.gif'));
      }
      $scrollingDiv
		.stop()
		.animate({"marginTop": ($(window).scrollTop() + marginTop) + "px"}, {duration:1600,easing:"swing"});			
    }
    
    var videoPlayingThreshould = $(".aboutme").position().top;
    if(!$(".fishVideo").get(0).play() && $(window).scrollTop() > videoPlayingThreshould && $(window).scrollTop() < arrowMovingThreshold){
      $(".fishVideo").get(0).play();
    }
  });
}

function rotateImages(){
  var curPhoto = $(".project_image .current");
  var curProj = $(".project_image .current").attr('proj');
  var nxtPhoto = curPhoto.next();
  var nxtProj = curPhoto.next().attr('proj');
  if(nxtPhoto.length == 0){
    nxtPhoto = $(".project_image article:first"); 
  }
  if(curProj != nxtProj){
    changeTime();
  }
  curPhoto.removeClass("current").addClass("previous");
  nxtPhoto.css({opacity: 0.0}).addClass("current").animate({opacity: 1.0}, 1000,
                                                           
  function(){
    curPhoto.removeClass("previous");
  });
}

function changeTime() {
  const _month = $(".display .info .time .month");
  const _name = $(".display .info .project_name");
  cur_i = (cur_i+1)%months.length;
  _month.fadeOut(1000, function(){
    _month.text(months[cur_i]);
    
    _month.fadeIn(1000);
  });
  _name.fadeOut(1000, function(){
    _name.text(proj_names[cur_i]);
    _name.fadeIn(1000);
  })
}