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
	result.pop(); //verwijdert het laatst ingevulde antwoord
	vraag--; //verlaagt de counter met -1
	displayQuestion(vraag);
	displayParties(vraag);
}

//deze functie zorgt ervoor dat je naar de volgende vraag gaat, en je antwoord opgeslagen wordt in een array.
function next(event){
		var totallength = subjects.length;	
	if (vraag == subjects.length){
		result.push(data = {
		Vraag: vraag,
		antwoord: event,
		multiplier: 1,
	});		
		/*
		Hier wordt er gekeken of de huide vraag ook gelijk staat aan die in de subjects lijst, als dit het geval is dan pakt hij de
		array result en pusht daar de huidige vraag in, net als het antwoord wat gegeven wordt via de buttons. Dit is de event. en een multiplier
		die later gebruikt wordt. 
		*/
		importantSubjects();
		generateStatements();
	} else {
		result.push(data = {
		Vraag: vraag,
		antwoord: event,
		multiplier: 1,
	});

	vraag++;
	displayQuestion(vraag);	
	removeParties();	
	displayParties(vraag);

}
}

function displayQuestion(subjectsNR){
	var statement = subjects[vraag].statement;	
	var title = subjects[vraag].title;
	document.getElementById("title").innerHTML = title;
	document.getElementById("statement").innerHTML = statement;
}

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

function removeParties(){
	var getParties = document.getElementsByClassName('partijstatement');	
	while (getParties.length) {
	getParties[0].parentNode.removeChild(getParties[0]);
   } 
}

function importantSubjects(){
	document.getElementById('backbutton').style.display = "none";
	document.getElementById('stemwijzer').style.display = "none";
	document.getElementById('buttons').style.display = "none";
	document.getElementById('meningen').style.display = "none";
	document.getElementById('thema-statements').style.display = "initial";
}

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

function uncheckAll(){
  var inputs = document.querySelectorAll('.input-statement'); 
        for (var i = 0; i < inputs.length; i++) { 
            inputs[i].checked = false; 
        } 
}

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

function unSelectAll(){
	var checks = document.getElementsByClassName('input-partie');
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = false;
	}
}

function selectAll(){
	var checks = document.getElementsByClassName('input-partie');
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = true;
	}
}

function selectMain(){
	var checks = document.getElementsByClassName('input-partie');
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = false;
	}
	for (var i = 0; i < 12; i++){
		checks[i].checked = true;
	}
}

function selectSecular(){
	var checks = document.getElementsByClassName('input-partie');
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = false;
	}
	for (var i = 12; i < checks.length; i++){
		checks[i].checked = true;
	}
}



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

function Match(){
	console.log(parties);
	for(let partiesNR = 0; partiesNR < parties.length; partiesNR++){
				parties.forEach(function (element) {
					element.score = 0
				});		
	};
		for(let answerNR in result){
			console.log('Dit is het resultaat van vraag: ' + answerNR);
			console.log(result[answerNR]);
				for (var partiesNR = 0; partiesNR < parties.length - 1; partiesNR++){
					console.log(subjects[answerNR].parties[partiesNR]); 
					if (result[answerNR].antwoord === subjects[answerNR].parties[partiesNR].position){
						var partyname = subjects[answerNR].parties[partiesNR].name;
						if (partyname === subjects[answerNR].parties[partiesNR].name){
							if (result[answerNR].multiplier == 1){
								parties[partiesNR].score++;
								console.log(parties[partiesNR].score);								
							} else {
								parties[partiesNR].score+=2;
								console.log(parties[partiesNR].score);
							}
						}
					} else {
						console.log(parties[partiesNR].score);
					}
				}
		}
		toFinalResult();
}

function toFinalResult(){

	document.getElementById('thema-title').innerHTML = 'De eindresultaten als volgt';
	document.getElementById('thema-statement').innerHTML = 'Uw mening komt het meest overeen met';
	document.getElementById('end-screen').style.display = "block";
	document.getElementById('backtoparties').style.display = "none";
	document.getElementById('end-button').style.display = "none";
	document.getElementById('partijen-keuzes').style.display = "none";
	document.getElementById('back-to-preferences').style.display = "initial";		

	var checks = document.getElementsByClassName('input-partie');
	var allParties = parties;
	for (var i = 0; i < allParties.length; i++){
		if(checks[i].checked){
			console.log(checks[i].value);
			for (let partiesNR = 0; partiesNR < parties.length; partiesNR++){
				if (checks[i].value === parties[partiesNR].name){
					var resultparty = parties[partiesNR].name;
					var resultscore = parties[partiesNR].score;
					endscore.push(data = {
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
	document.getElementById('1st score').innerHTML = endscore[0].Partij;
	document.getElementById('2nd score').innerHTML = endscore[1].Partij;
	document.getElementById('3th score').innerHTML = endscore[2].Partij;
}

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






