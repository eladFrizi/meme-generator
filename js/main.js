'use strict';

var gImgs = [{ id: 1, url: "assets/meme/batman.png" ,keywords:['batman','robin','bitchslap'] },
{ id: 2, url: "assets/meme/cat.png",keywords:['cat','face','animal'] },
{ id: 3, url: "assets/meme/di-caprio.png",keywords:['di-caprio','cheers'] },
{ id: 4, url: "assets/meme/dog.png",keywords:['dog','face','animal'] },
{ id: 5, url: "assets/meme/facepalm.png",keywords:['startrek','facepalm'] },
{ id: 6, url: "assets/meme/history.png",keywords:['history','teach'] },
{ id: 7, url: "assets/meme/lord-of-the-rings.png",keywords:['lotr','lordoftherings','boromir'] },
{ id: 8, url: "assets/meme/nerd.png",keywords:['nerd','face'] },
{ id: 9, url: "assets/meme/skeleton.png",keywords:['skeleton','dead'] },
{ id: 10, url: "assets/meme/toy-story.png",keywords:['toystory','woody','buzzlightyears'] }];
var gState = {isHexDisplay:true};
//onload function
function initApp() {
    imgsInitDisplay();
}