// ==UserScript==
// @name        /OurGirl/
// @namespace   https://github.com/ti2782/OurGirl
// @description 4chan OpenAI Utility. Ripple Edition.
// @include     *.4chan.org/*/thread/*
// @include     *.4channel.org/*/thread/*
// @include     *talktotransformer.com*
// @version     1
// ==/UserScript==

var url = 'https://talktotransformer.com';

// OP
var op = document.getElementsByClassName('post op').item(0);
addOurGirl(op.id);

//Loop through posts
var posts = document.getElementsByClassName('post reply');
for(var i = 0;i < posts.length; i++) {
    addOurGirl(posts[i].id);
}

// On New Post
document.addEventListener('ThreadUpdate', function(e) {
    for(var i = 0;i < e.detail.newPosts.length; i++) {
	var id = e.detail.newPosts[i].replace(/\D+/g, 'p');
	addOurGirl(id);
    }
});

function addOurGirl(post) {
    // Add button
    var input = document.createElement("input");
    input.type="button";
    input.value="Ask /OurGirl/";    
    input.className = 'ourgirl-button';
    input.addEventListener('click', function() {
	ask(post);
    });
    var element = document.getElementById(post);
    element.appendChild(input);
}

function ask(id) {
    // Get Post
    fnSelect(id);
    document.execCommand('copy');
    fnDeSelect();
    
    // Open New Tab
    window.open(url);
    
    // :TODO Paste & Generate
}

function fnSelect(id) {
    fnDeSelect();
    if (document.selection) {
	var range = document.body.createTextRange();
 	range.moveToElementText(document.getElementById(id));
	range.select();
    }
    else if (window.getSelection) {
	var range = document.createRange();
	range.selectNode(document.getElementById(id));
	window.getSelection().addRange(range);
    }
}

function fnDeSelect() {
    if (document.selection) document.selection.empty();
    else if (window.getSelection)
        window.getSelection().removeAllRanges();
}
