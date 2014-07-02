// ==UserScript==
// @name        Friends
// @namespace   funslug.org
// @description replaces "friends!" with a list of names in the channel
// @include     https://www.irccloud.com/*
// @version     1.0.0
// @grant       none
// @updateURL   
// @downloadURL 
// ==/UserScript==

(function () {

'use strict';

function listener () {
  var input = $('#bufferInputView' + cb().bid());
  if (input.data('friends') !== true) {
    input.on('keydown', function (e) {
      if (e.keyCode === 13) {
        var val = input.val();
          if ((/!friends/).test(val)) {
            var nick = $('td.nickcell a').attr('data-name');
            var friends = [];
            var friendlist = $('table.channel:visible li.user[data-name!="' + nick + '"]').each(function(index, element){
              friends.push($(element).attr('data-name'));
            });
            val = val.replace(/!friends/, friends.join(' '));
            input.val(val);
          }
      }
    });
    input.data('friends', true);
  }
}

(function checkSession () {
  if (window.hasOwnProperty('SESSION')) {
    window.SESSION.bind('init', function () {
      listener();
    });
  } else {
    setTimeout(checkSession, 100);
  }
})();

window.onhashchange = function () { listener(); };

})();
