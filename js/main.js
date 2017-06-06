'use strict';

var gImgs = [{ id: 1, url: "assets/meme/batman.png" ,txts:['batman','robin','bitchslap'] },
{ id: 2, url: "assets/meme/cat.png",txts:['cat','face'] },
{ id: 3, url: "assets/meme/di-caprio.png",txts:['di-caprio','cheers'] },
{ id: 4, url: "assets/meme/dog.png",txts:['dog','face'] },
{ id: 5, url: "assets/meme/facepalm.png",txts:['starwars','facepalm'] },
{ id: 6, url: "assets/meme/history.png",txts:['history','teach'] },
{ id: 7, url: "assets/meme/lord-of-the-rings.png",txts:['lotr','lordoftherings','boromir'] },
{ id: 8, url: "assets/meme/nerd.png",txts:['nerd'] },
{ id: 9, url: "assets/meme/skeleton.png",txts:['skeleton','dead'] },
{ id: 10, url: "assets/meme/toy-story.png",txts:['toystory','woody','buzzlightyears','show'] }];

//onload function
function initApp() {
    displayImgs(gImgs,110);
    addEventListener('resize',function(){
        console.log('RESIZE');
        displayImgs(gImgs,110);
        });
}