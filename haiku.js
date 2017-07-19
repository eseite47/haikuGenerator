var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');
var directory = {};

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function countSyllables(word){
  var count = 0;
  for (var i = 0; i < word.length; i++){
    var numbers = '1234567890';
    if (numbers.includes(word.substring(i, i + 1))){
      count++;
    }
  }
  return count;
}

function addToDirectory(word, count){
  if (directory[count] === undefined){
    directory[count] = [word];
  }
  else {
    directory[count].push(word)
  }
}

function formatData(data){
   var lines = data.toString().trim().split('\n'),
       lineSplit
   lines.forEach(function(line){
    lineSplit = line.split('  ');
    //console.log(typeof lineSplit[0] === 'string')
    if (lineSplit[0] !== null){
      var syllabCount = countSyllables(lineSplit[1]);
      //console.log(lineSplit[0], syllabCount);
      addToDirectory(lineSplit[0], syllabCount);
      //console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]);
    }
  });
   return directory;
}

function getLine(arr){
  var poemLine = '';
  arr.forEach(function(value, index){
    var randomize = Math.floor(Math.random() * (directory[value].length));
    if (index === arr.length - 1){
      poemLine += directory[value][randomize];
    }
    else {
      poemLine += directory[value][randomize] + " "
    }
  })
  //console.log(directory[value])
  return poemLine

}

function haiku(arr){
  var poem = '';
  arr.forEach(function(value, index){
    if (index === arr.length - 1){
      poem += getLine(value)
    }
    else {
      poem += getLine(value) + '\n';
    }
  });
  return poem;
}

formatData(cmudictFile);
var poem = haiku([[2, 3], [1, 3, 3], [1, 4]]);
console.log(poem);
