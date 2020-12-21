
var metas = document.getElementsByTagName('meta');
var keywords = metas.keywords.content.split(",");
console.log(keywords);
keywords.forEach(function(el){
		var hitWord = el.includes("trans");
		//console.log(el);
		console.log(hitWord)
	});
