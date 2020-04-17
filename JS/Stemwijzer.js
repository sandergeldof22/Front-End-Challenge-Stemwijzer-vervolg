	var	statement = document.querySelector("#statement");
	var	title = document.querySelector("#title");
	var	button_agree = document.querySelector("#button-eens");
	var	button_disagree = document.querySelector("#button-oneens");
	var	button_unknown = document.querySelector("#button-geen");
	var button_back = document.querySelector(".goback");
	var button_overslaan = document.querySelector("#overslaan");
	var statement_next = document.querySelector('#statement-next');
	var all_buttons = document.querySelector(".vragenbuttons");
	var result = [];

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

	var score;
	var subjectsNR = 0;
	var partiesNR = 0;
	var vraag = 0;

window.onload = start();	

function start(){	
	displayQuestion(subjectsNR);
	displayParties(vraag);	
}


function goBack(){
	result.pop();
	vraag--;
	displayQuestion(vraag);
	displayParties(vraag);
}
//moet nog bedenken hoe je van vraag 10 naar bijv vraag 3 terug kan gaan om te veranderen

function next(event){
	if (vraag == subjects.length - 1){
		importantSubjects();
		generateStatements();
	} else {
		var totallength = subjects.length;

		result.push(data = {
		Vraag: vraag,
		antwoord: event
	});
	console.log(result);

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
	console.log(statement);

	for (var i = 0; i < statement.length; i++){

		var title = subjects[i].title
		console.log(title);

		var id = "id" + [i + 1];

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

function uncheckAll(){
  var inputs = document.querySelectorAll('.input-statement'); 
        for (var i = 0; i < inputs.length; i++) { 
            inputs[i].checked = false; 
        } 
}

