'use strict';

var gImgs = [{ id: 1, url: "assets/meme/batman.png", keywords: ['batman', 'robin', 'bitchslap'] },
{ id: 2, url: "assets/meme/cat.png", keywords: ['cat', 'face', 'animal'] },
{ id: 3, url: "assets/meme/di-caprio.png", keywords: ['di-caprio', 'cheers'] },
{ id: 4, url: "assets/meme/dog.png", keywords: ['dog', 'face', 'animal'] },
{ id: 5, url: "assets/meme/facepalm.png", keywords: ['startrek', 'facepalm'] },
{ id: 6, url: "assets/meme/history.png", keywords: ['history', 'teach'] },
{ id: 7, url: "assets/meme/lord-of-the-rings.png", keywords: ['lotr', 'lordoftherings', 'boromir'] },
{ id: 8, url: "assets/meme/nerd.png", keywords: ['nerd', 'face'] },
{ id: 9, url: "assets/meme/skeleton.png", keywords: ['skeleton', 'dead'] },
{ id: 10, url: "assets/meme/morpheus.jpg", keywords: ['morpheus', 'thematrix', 'sunglasses', 'swag'] },
{ id: 11, url: "assets/meme/picard-wtf.jpg", keywords: ['startrek', 'picard', 'whatthefuckareyoudoing'] },
{ id: 12, url: "assets/meme/finding-neverland.jpg", keywords: ['johnnydepp', 'kid', 'sad', 'hug'] },
{ id: 13, url: "assets/meme/kid-winning.jpg", keywords: ['kid', 'baby', 'winning', 'toddler', 'victory'] },
{ id: 14, url: "assets/meme/shut-up-and-take-my-money.png", keywords: ['money', 'futurama', 'shutup'] },
{ id: 15, url: "assets/meme/most-interesting-man-in-the-world.jpg", keywords: ['interesting', 'man', 'mostinterestingman'] },
{ id: 16, url: "assets/meme/frog-crying.jpg", keywords: ['frog', 'crying', 'tears', 'bigeyes'] },
{ id: 17, url: "assets/meme/what-the-hell.jpg", keywords: ['PaulyD', 'DJ'] },
{ id: 18, url: "assets/meme/black-girl-wat.jpg", keywords: ['black', 'girl', 'what', 'wat', 'handwave'] },
{ id: 19, url: "assets/meme/consuela-phone.jpg", keywords: ['consuela', 'phone', 'hello', 'familyguy'] },
{ id: 20, url: "assets/meme/joker.png", keywords: ['joker', 'batman', 'smile', 'heathledger'] },
{ id: 21, url: "assets/meme/yo-dawg.jpg", keywords: ['yodawg', 'yodog', 'exhibit', 'rap', 'rapper'] },
{ id: 22, url: "assets/meme/load-pistol.jpg", keywords: ['load', 'gun', 'pistol', 'fuckyou', 'dead'] },
{ id: 23, url: "assets/meme/trump-funny.jpg", keywords: ['trump', 'donaldtrump', 'funny', 'laugh'] },
{ id: 24, url: "assets/meme/dwight-schrute.jpg", keywords: ['dwightschrute', 'theoffice', 'huh', 'whatareyousaying', 'staring'] },
{ id: 25, url: "assets/meme/computer-guy.jpg", keywords: ['computerguy', 'computer', 'frustrated'] },
{ id: 26, url: "assets/meme/wonka.jpg", keywords: ['willywonka', 'chocolatefactory', 'genewilder'] },
{ id: 27, url: "assets/meme/kevin-hart.jpg", keywords: ['kevinhart', 'staring', 'shocked'] },
{ id: 28, url: "assets/meme/kevin-hart2.jpg", keywords: ['kevinhart', 'dirty', 'cursing', 'swearing'] },
{ id: 29, url: "assets/meme/evil-toddler.jpg", keywords: ['eviltoddler', 'kid', 'evillaugh'] },
{ id: 30, url: "assets/meme/disaster-girl.jpg", keywords: ['disaster', 'girl', 'fire', 'houseburning'] },
{ id: 31, url: "assets/meme/skeptical-kid.jpg", keywords: ['thirdworld', 'skeptical', 'kid', 'boy'] },
{ id: 32, url: "assets/meme/dr-evil-laser.jpg", keywords: ['drevil', 'laser', 'austinpowers', '"laser"', 'minime'] },
{ id: 33, url: "assets/meme/toy-story.png", keywords: ['toystory', 'woody', 'buzzlightyears'] }];
var gSearch = { isHexDisplay: true, pageNum: 1, searchImgs: null, isLoadingPage: false };
var gHome = { timer: null };
var gCurrCardStr = 'home';

//onload function
function initApp() {
    checkContactMsg();
    animateHome();
}