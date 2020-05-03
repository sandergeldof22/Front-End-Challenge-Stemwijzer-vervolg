	var	statement = document.querySelector("#statement");
	var	title = document.querySelector("#title");
	var	button_agree = document.querySelector("#button-eens");
	var	button_disagree = document.querySelector("#button-oneens");
	var	button_unknown = document.querySelector("#button-geen");
	var button_back = document.querySelector(".goback");
	var button_overslaan = document.querySelector("#overslaan");
	var statement_next = document.querySelector('#statement-next');
	var button_thema = document.querySelector('#thema-button');
	var select_sitting = document.querySelector('#select-sitting');
	var select_all = document.querySelector('#select-all');
	var select_secular = document.querySelector('#select-secular');
	var select_remove = document.querySelector('#select-remove');
	var all_buttons = document.querySelector(".vragenbuttons");
	var button_question_back = document.querySelector("#backtoquestion");
	var button_parties_back = document.querySelector("#backtoparties");
	var end_button = document.querySelector('#end-button');
	var button_back_preferences = document.querySelector('#back-to-preferences');
	var result = [];
	var endscore = [];

	button_back.onclick = function(){
		goBack();
	}
	button_agree.onclick = function(){
		next("pro");
	}
	button_disagree.onclick = function(){
		next("contra");
	}
	button_unknown.onclick = function(){
		next("none");
	}
	button_overslaan.onclick = function(){
		next(null);
	}
	statement_next.onclick = function(){
		uncheckAll();
	}
	button_thema.onclick = function(){
		extraValue();
		toParties();
	}
	select_all.onclick = function(){
		selectAll();
	}
	select_sitting.onclick = function(){
		selectMain();
	}
	select_remove.onclick = function(){
		unSelectAll();
	}
	select_secular.onclick = function(){
		selectSecular();
	}
	button_question_back.onclick = function(){
		backToQuestions();
	}
	button_parties_back.onclick = function(){
		backToSubjects();
	}
	end_button.onclick = function(){
		Match();
	}
	button_back_preferences.onclick = function(){
		backToPreferences();
	}


	var score;
	var subjectsNR = 0;
	var partiesNR = 0;
	var vraag = 0;

		//start de functie start wanneer de window geladen wordt, practisch zorgt dit ervoor dat de challenge start
window.onload = start();	

		//functie die de applicatie start door middel van 2 display functies
function start(){	
	displayQuestion(subjectsNR);
	displayParties(vraag);	
}

		//functie die er voor zorgt dat je tijdens het beantwoorden van de stellingen je terug kan gaan naar de vorige vraag
function goBack(){
	result.pop(); 	//verwijdert het laatst ingevulde antwoord
	vraag--; 	
	displayQuestion(vraag);
	displayParties(vraag);
}

		//deze functie zorgt ervoor dat je naar de volgende vraag gaat, en je antwoord opgeslagen wordt in een array.
function next(event){
		var totallength = subjects.length;	
	if (vraag == subjects.length - 1){
		result.push(data = {
		Vraag: vraag,
		antwoord: event,
		multiplier: 1,
	});		

		/*
		Hier wordt er gekeken of de huide vraag ook gelijk staat aan die in de subjects lijst, als dit het geval is dan pakt hij de
		array result en pusht daar de huidige vraag in, net als het antwoord wat gegeven wordt via de buttons. Dit is de event. en een multiplier
		die later gebruikt wordt. de -1 is omdat de subjects op 0 begint maar vraag bij 1. Als dat gedaan is dan voert hij de 2 functies hieronder
		uit
		*/

		importantSubjects();
		generateStatements();

		/*
		De bovenste 2 functies verwijderen de statements, partijen en buttons om statements te beantwoorden en laden alle statements opnieuw
		in voor de extra gewicht
		*/

	} else {
		result.push(data = {
		Vraag: vraag,
		antwoord: event,
		multiplier: 1,
	});

		/*
		Hier wordt er gekeken of de huide vraag ook gelijk staat aan die in de subjects lijst, als dit het geval is dan pakt hij de
		array result en pusht daar de huidige vraag in, net als het antwoord wat gegeven wordt via de buttons. Dit is de event. en een multiplier
		die later gebruikt wordt. de -1 is omdat de subjects op 0 begint maar vraag bij 1
		*/

	vraag++;
	displayQuestion(vraag);	
	removeParties();	
	displayParties(vraag);

		/*
		de bovenstaande functies laden als allereerst de nieuwe statement in, Daarna verwijdert hij de onderstaande partijen, die nog van de vorige 
		vraag zijn, en daarna vervangt hij deze door de nieuwe parties die bij de huidige vraag horen en increment de vraag.
		*/
}
}
		/*
		onderstaande functie laad de statement en title in gebasseerd op welke vraag hij zit
		*/
function displayQuestion(subjectsNR){
	var statement = subjects[vraag].statement;	
	var title = subjects[vraag].title;
	document.getElementById("title").innerHTML = title;
	document.getElementById("statement").innerHTML = statement;
}

		/*
		onderstaande functie displayt de meningen van partijen met betrekking tot de vraag. voor elke partij wordt een element aangemaakt
		waar we de mening aan een text tag vastmaken en appenden in dit element. Daarna wordt er gekeken welke mening deze partij had, en gebasseerd
		daarop wordt het complete element geappend aan een van de div's die gelijk staat aan de partij hun mening (pro, contra, none etc)
		*/
function displayParties(vraag){
	var allparties = subjects[vraag].parties;

	var totallength = subjects[vraag].parties.length;

	for (let partiesNR = 0; partiesNR < totallength; partiesNR++){	

		var parties = subjects[vraag].parties[partiesNR];

		var position = parties.position;
		var name = parties.name;
		var opinion = parties.opinion;

		var party = document.createElement("DETAILS");
		party.className = "partijstatement";
		var partysummary = document.createElement("SUMMARY");
		var partysummarytext = document.createTextNode(name);
		partysummary.appendChild(partysummarytext);
		var partylong = document.createElement("P");
		var partylongtext = document.createTextNode(opinion);
		partylong.appendChild(partylongtext);
		party.appendChild(partysummary);
		party.appendChild(partylong);


		if (position == 'pro') {
			document.getElementById('meningeens').appendChild(party);
		} else if (position == 'contra') {
			document.getElementById('meningoneens').appendChild(party);
		} else {
			document.getElementById('meninggeen').appendChild(party);
		}
	}
}
/*
onderstaande functie verwijdert alle partijen en bijbehorende meningen door over alle parties heen te loopen.
*/
function removeParties(){
	var getParties = document.getElementsByClassName('partijstatement');	
	while (getParties.length) {
		getParties[0].parentNode.removeChild(getParties[0]);
   } 
}

/*
onderstaande functie zet alle styling die bij de statements en vragen hoorde 'uit' en zorgt ervoor dat ze niet zichtbaar zijn. en daarna zorgt hij
ervoor dat de div met alles voor de extra weging pagina zichtbaar wordt. 
*/
function importantSubjects(){
	document.getElementById('backbutton').style.display = "none";
	document.getElementById('stemwijzer').style.display = "none";
	document.getElementById('buttons').style.display = "none";
	document.getElementById('meningen').style.display = "none";
	document.getElementById('thema-statements').style.display = "initial";
}

/*
onderstaande functie genereert de statements voor het volgende onderdeel. hij checkt of er evenveel statements zijn als vragen. Daarna loopt hij
over alle statements heen. die statements worden dan geappend aan een list element met daarin een checkbox. de bedoeling is dat deze checkboxes
dienen als een aangeefpunt voor welke vraag zwaarder moet meetellen.
*/
function generateStatements(){
	var themaList = document.getElementById('thema-list');
	var statement = subjects;
	var statementcheck = document.getElementsByClassName('statementChoice');

if (statementcheck.length !== 30){

	for (var i = 0; i < statement.length; i++){

		var title = subjects[i].title

		var id = "id" + [i];

		var statementList = document.createElement("LI");
		statementList.className = 'statementChoice';

		var statementChoice = document.createElement("INPUT");
		statementChoice.className = 'input-statement';
		statementChoice.type = "checkbox";
		statementChoice.name = "name";
		statementChoice.value = "value";

		statementChoice.id = id	

		statementList.appendChild(statementChoice);


		var label = document.createElement('label');
		label.htmlFor = id;

		label.appendChild(document.createTextNode(title));

		statementList.appendChild(label);

		themaList.append(statementList);
	}
}
}

/*
onderstaande functie loopt over alle checkboxes heen. en als een checkbox gecheckd is, hij pakt het id van de box en haalt 'id' eraf wat alleen
een nummer overlaat. als dit nummer gelijk staat aan de vraag (wat ook een nummer is) dan moet hij de bijbehorende multiplier verhogen naar 2
*/
function extraValue(){
	var boxes = document.getElementsByClassName('input-statement');

	for(var i = 0; i < boxes.length; i++){
		if (boxes[i].checked){
			var box = boxes[i].id;
 			var idnumber = box.substr(2);
			if (idnumber == result[idnumber].Vraag){
				result[idnumber].multiplier = 2;	
			}
		}
	}
}
/*
onderstaande functie loopt over alle checkboxes heen en unchecked ze.
*/
function uncheckAll(){
  var inputs = document.querySelectorAll('.input-statement'); 
        for (var i = 0; i < inputs.length; i++) { 
            inputs[i].checked = false; 
        } 
}

/*
onderstaande functie zet alle styling van het gedeelte met extra gewicht op de statements uit, en zet die van de keuzes van partijen die u mee wilt
nemen naar het eindresultaat aan. En hij verandert de titels. Eenmaal dit gedaan voert hij de functie generateParties uit.
*/
function toParties(){
	document.getElementById('thema-partijen').style.display = 'none';
	document.getElementById('thema-title').innerHTML = 'Welke partijen wilt u meenemen in het resultaat?';
	document.getElementById('thema-statement').innerHTML = 'U kunt kiezen voor zittende partijen, die nu in de Tweede Kamer vertegenwoordigd zijn. Daarbij nemen we ook de partijen mee die in de peilingen op minimaal een zetel staan. U kunt alle partijen meenemen en u kunt een eigen selectie maken van tenminste drie partijen.';
	document.getElementById('thema-button').style.display = 'none';
	document.getElementById('end-button').style.display = 'initial';
	document.getElementById('partijen-keuzes').style.display = 'initial';
	document.getElementById('backtoquestion').style.display = 'none';
	document.getElementById('backtoparties').style.display = 'initial';
	generateParties();	
}

/*
De onderstaande functe genereert de partijen op het uitkiezen van de partijen die u meeneemt naar het resultaat gedeelte van deze stemwijzer.
Als de er in totaal nog geen 24 partijen checkboxes zijn gegenereert gaat hij deze maken.
voor elke partij maakt hij een list element met daarin een input element die verschillende
properties krijgt, de value van deze input elements is de titel van de partij, Deze wordt later gebruikt voor de einduitslag te berekenen
*/
function generateParties(){
	var allPartiesList = document.getElementById('partijen-list');
	var allParties = parties;
	var partiesChoice = document.getElementsByClassName('partiesChoice');


	if (partiesChoice.length !== 24) {

	for (var i = 0; i < allParties.length; i++){	

		var title = allParties[i].name;

		var id = "id" + [i + 1];
		
		var partiesList = document.createElement("LI");
		partiesList.className = 'partiesChoice';

		var partiesChoice = document.createElement("INPUT"); 
		partiesChoice.className = 'input-partie';
		partiesChoice.type = "checkbox";
		partiesChoice.name = 'parties-names';
		partiesChoice.value = title;
		//Hier hebben alle checkboxes de value van de bijbehorende partij gekregen

		partiesChoice.id = id;	

		partiesList.appendChild(partiesChoice);	

		var label = document.createElement('label');
		label.htmlFor = id;

		label.appendChild(document.createTextNode(title));

		partiesList.appendChild(label);

		allPartiesList.append(partiesList);
	}
	}	
}
/*
loopt over alle checkboxes heen en unselected ze
*/
function unSelectAll(){
	var checks = document.getElementsByClassName('input-partie');
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = false;
	}
}
/*
loopt over alle checkboxes heen en selected ze
*/
function selectAll(){
	var checks = document.getElementsByClassName('input-partie');
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = true;
	}
}
/*
loopt over alle checkboxes heen en unselected ze, daarna selecteert hij de eerste 12, wat de zittende partijen zijn
*/
function selectMain(){
	var checks = document.getElementsByClassName('input-partie');
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = false;
	}
	for (var i = 0; i < 12; i++){
		checks[i].checked = true;
	}
}
/*
loopt over alle checkboxes heen en unselected ze, daarna selecteert hij de eerste 12, wat de niet zittende partijen zijn
*/
function selectSecular(){
	var checks = document.getElementsByClassName('input-partie');
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = false;
	}
	for (var i = 12; i < checks.length; i++){
		checks[i].checked = true;
	}
}
/*
Wanneer je van de extra gewicht pagina terug zou willen naar de laatste vraag is er deze functie, Deze functie zet alle style elementen
van de extra gewicht pagina uit en die van de vragen weer uit. hij roept de displayquestion en displayparties op die de vraag opnieuw renderen
en de result.pop verwijdert het laatste antwoord, Sinds je die opnieuw gaat invullen
*/
function backToQuestions(){
	var titel = document.getElementById('thema-statements');

	if (titel.style.display === 'initial'){

		document.getElementById('backbutton').style.display = "initial";
		document.getElementById('stemwijzer').style.display = "initial";
		document.getElementById('buttons').style.display = "initial";
		document.getElementById('meningen').style.display = "initial";
		document.getElementById('thema-statements').style.display = "none";

		displayQuestion(vraag);
		displayParties(vraag);
		result.pop();	
	}
}
/*
Onderstaande functie zet de styling van de extra gewicht pagina terug 'aan' en zet die van het uitkiezen van de partijen die u meeneemt
naar het eindresultaat 'uit'. Hierdoor kom je terug op het extra gewicht gedeelte indien de gebruiker terug wilt.
*/
function backToSubjects(){
	document.getElementById('backtoparties').style.display = 'none';
	document.getElementById('backtoquestion').style.display = 'initial';
	document.getElementById('thema-partijen').style.display = 'initial';
	document.getElementById('thema-title').innerHTML = 'Zijn er onderwerpen die u extra belangrijk vindt?';
	document.getElementById('thema-statement').innerHTML = 'Aangevinkte stellingen tellen extra mee bij het berekenen van het resultaat.';
	document.getElementById('partijen-keuzes').style.display = 'none';
	document.getElementById('end-button').style.display = 'none';
	document.getElementById('thema-button').style.display = 'initial';
}
/*
Onderstaande functie matched een score aan de partijen en in vang dat de gebruiker heeft gekozen voor extra gewicht bij een bepaalde statement,
dan wordt dit meegenomen in de score.
*/
function Match(){
	console.log(parties);
	for(let partiesNR = 0; partiesNR < parties.length; partiesNR++){
				parties.forEach(function (element) {
					element.score = 0
				}); //loopt over alle partijen heen en geeft ze in de parties array een object 'Score'. Waarin de score per partij wordt bijgehouden		
	};
		for(let answerNR in result){ //voor elke vraag loopt hij over de results heen
			console.log('Dit is het resultaat van vraag: ' + answerNR);
			console.log(result[answerNR]);
				for (var partiesNR = 0; partiesNR < parties.length - 1; partiesNR++){ //loop een antwoord over alle partijen heen 
					console.log(subjects[answerNR].parties[partiesNR]); 
					if (result[answerNR].antwoord === subjects[answerNR].parties[partiesNR].position){// in geval dat dit het antwoord gelijk is aan dat van jou
							if (result[answerNR].multiplier == 1){ // als de multiplier op 1 staat add hij 1 punt bij de partij
								parties[partiesNR].score++;
								console.log(parties[partiesNR].score);								
							} else { // mocht de multiplier niet op 1 staan dan is er extra gewicht op deze vraag en krijgt 2 punten
								parties[partiesNR].score+=2;
								console.log(parties[partiesNR].score);
							}
					} else {
						console.log(parties[partiesNR].score);
					}
				}
		}
		toFinalResult(); //als dit berekend is, Voer dan de toFinalResult functie uit
}
/*
Onderstaande functie zet de styling van het uitkiezen van de partij 'uit' en zet die van de end-result pagina 'aan'. Wanneer dit gebeurt is voert
hij de functie uit om het eindresultaat te calculeren
*/
function toFinalResult(){
	document.getElementById('thema-title').innerHTML = 'De eindresultaten als volgt';
	document.getElementById('thema-statement').innerHTML = 'Uw mening komt het meest overeen met';
	document.getElementById('end-screen').style.display = "block";
	document.getElementById('backtoparties').style.display = "none";
	document.getElementById('end-button').style.display = "none";
	document.getElementById('partijen-keuzes').style.display = "none";
	document.getElementById('back-to-preferences').style.display = "initial";	
	calculateResult();
}
/*
Onderstaande functie calculeert het eindresultaat. De top 3 partijen met de hoogste score worden dan getoond
*/
function calculateResult(){	

	var checks = document.getElementsByClassName('input-partie');
	var allParties = parties;
	for (var i = 0; i < allParties.length; i++){ //loopt over alle partijen heen
		if(checks[i].checked){ //als een partij gechecked is om mee te nemen doe dan het volgende
			console.log(checks[i].value);
			for (let partiesNR = 0; partiesNR < parties.length; partiesNR++){//loop opnieuw over alle partijen heen
				if (checks[i].value === parties[partiesNR].name){//als de naam van de partij die u gekozen heeft in de checkbox (de partijnaam is het value)
					var resultparty = parties[partiesNR].name; 
					var resultscore = parties[partiesNR].score;
					endscore.push(data = { //push dan de naam van de partij en de bijbehorende partij naar de endscore array
						Partij: resultparty,
						Score: resultscore,
					});
				}
			}
		} else {
			console.log(checks[i].value);
		}
	}
	console.log(endscore);
	//voeg de top 3 partijen op volgorde van punten toe aan de eindpagina en laat ze de resultaten zien van de stemwijzer.
	document.getElementById('1st score').innerHTML = endscore[0].Partij;
	document.getElementById('2nd score').innerHTML = endscore[1].Partij;
	document.getElementById('3th score').innerHTML = endscore[2].Partij;
}

/*
Onderstaande functie zorgt ervoor dat de styling van de resultaat pagina 'uit' gaat en die van het uitkiezen van partijen 'aan'. Hierdoor lijkt het
alsof we een onderdeel terug gaan. Ook leegt hij de complete 'endscore array' zodat deze bij het uitkiezen van de partijen weer gevuld kan worden
*/
function backToPreferences(){

	document.getElementById('thema-title').innerHTML = 'Welke partijen wilt u meenemen in het resultaat?';
	document.getElementById('thema-statement').innerHTML = 'U kunt kiezen voor zittende partijen, die nu in de Tweede Kamer vertegenwoordigd zijn. Daarbij nemen we ook de partijen mee die in de peilingen op minimaal een zetel staan. U kunt alle partijen meenemen en u kunt een eigen selectie maken van tenminste drie partijen.';
	document.getElementById('end-screen').style.display = "none";
	document.getElementById('backtoparties').style.display = "initial";
	document.getElementById('end-button').style.display = "initial";
	document.getElementById('partijen-keuzes').style.display = "initial";
	document.getElementById('back-to-preferences').style.display = "none";
	endscore = [];
}






