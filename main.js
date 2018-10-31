var inquirer = require('inquirer');
var basicFlashCard = require('./basicFlash.js');
var clozeFlashCard = require('./clozeFlash.js');
// Basic Flash Card Questions and Answers

var bQuestion1 = new basicFlashCard('Who is the first president of the United States?', 'George Washington');
var bQuestion2 = new basicFlashCard('What State was George Washington Born?', 'Virgina');

var bQ = [bQuestion1.front, bQuestion2.front];
var bA = [bQuestion1.back, bQuestion2.back];



// Cloze Flash Card Questions and Answers

var cQuestion1 = new clozeFlashCard('........... was the second President of the United States', 'John Adams');
var cQuestion2 = new clozeFlashCard('John Adams was born in the State of ......................', 'Massachusetts');

var cQ = [cQuestion1.text, cQuestion2.text];
var cA = [cQuestion1.cloze, cQuestion2.cloze];

//What type of flash card function
inquirer.prompt([{
    type: 'list',
    name: 'selection',
    message: 'Which kind of flash card would you like?',
    choices: ['basic', 'cloze']

}])
.then(function(answer){
    if(answer.selection === 'basic'){
        basic();
    }
    else if(answer.selection === 'cloze'){
        cloze();
    }
})
// recursion 
// basic questions function
//Count and answer right variables
var count = 0;
var countRight = 0;
function basic(){
    if(count < bQ.length){
        inquirer.prompt([{
            type: 'input',
            name: 'input',
            message: bQ[count]

        }])
        .then(function(answer){
            if(answer.input.toLowerCase() === bA[count].toLowerCase()){
                countRight++;
            }
            count++;
            basic();
        })
    }
    else{
		console.log('You got ' + countRight + ' Right');
		for(var i = 0; i < bA.length; i++){
			console.log('The answers are ' +  bA[i]);
		}
	}
}

// cloze flash card function
function cloze(){

	if(count < cQ.length) {
		inquirer.prompt([
				{
					type:'input',
					name: 'input',
					message: cQ[count]
				}
		])
		.then(function(answer){
			if(answer.input.toLowerCase() === cA[count].toLowerCase()) {
				correctCount++;
			}
				count++
				cloze();
		});

	}

	else {
		console.log('You got ' + countRight + ' Right');
		for(var i = 0; i < cA.length; i++){
			console.log('The answers are ' +  cA[i]);
		}
	}
}
