function getRandomFromArray(array){ //returns a random entry from an array
	if(array instanceof HTMLCollection || array instanceof Array){
		var n = Math.floor(Math.random()*array.length);
		return array[n];
	}
}
function transformById(elmtId, otherVerb, fadeDuration){ //replaces the innerHTML of the pased element by the passed string 
	if(!fadeDuration){
		fadeDuration = 0;
	}
	document.getElementById(elmtId).style.opacity = '0';
	setTimeout(function(){
		document.getElementById(elmtId).innerHTML = otherVerb;
		document.getElementById(elmtId).style.opacity = '1';
	}, fadeDuration);
}

function startTalkative(){
	var pathToXML = 'talkative.xml';
	var lang = document.getElementsByTagName('html')[0].lang
	lang==''? lang='en' : lang;
	var req = new XMLHttpRequest();
	req.open('GET', pathToXML, true);
	req.send();

	req.onreadystatechange=function(){
		if(req.readyState == 4 && req.status == 200){

			var xml = req.responseXML;
			var xmlLang = xml.getElementsByTagName(lang)[0];
			var configs = xml.getElementsByTagName('cs')[0];
			var verbs = xmlLang.getElementsByTagName('v');
			var interests = xmlLang.getElementsByTagName('i');
			var targets = xmlLang.getElementsByTagName('t');
			var verbTimer = configs.getElementsByTagName('verbTimer')[0].innerHTML;
			var interestTimer = configs.getElementsByTagName('interestTimer')[0].innerHTML;
			var targetTimer = configs.getElementsByTagName('targetTimer')[0].innerHTML;
			var fadeDuration = configs.getElementsByTagName('fadeDuration')[0].innerHTML;
			var startingDelay = configs.getElementsByTagName('startingDelay')[0].innerHTML;
			document.getElementById('verb').style.transition = (fadeDuration/1000)+'s';
			document.getElementById('interest').style.transition = (fadeDuration/1000)+'s';
			document.getElementById('target').style.transition = (fadeDuration/1000)+'s';

			setTimeout(function(){
				var verbInterval = setInterval(function(){
					transformById('verb', getRandomFromArray(verbs).innerHTML, fadeDuration/2);
				}, verbTimer);
				var interestInterval = setInterval(function(){
					transformById('interest', getRandomFromArray(interests).innerHTML, fadeDuration/2);
				}, interestTimer);
				var targetInterval = setInterval(function(){
					transformById('target', getRandomFromArray(targets).innerHTML, fadeDuration/2);
				}, targetTimer);
			}, startingDelay)
		}
	}
}
startTalkative();