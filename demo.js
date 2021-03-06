var readline = require('readline');
var DiceExpression = require('./src/index');

prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
prompt.setPrompt('roll: ');
prompt.prompt();

prompt.on('line', (line) => {
  try{
    var roll = new DiceExpression(line);
    console.log(roll.toString());
  } catch(ex){
    console.log('There was something wrong with that...', ex);
  }
  prompt.prompt();
}).on('close', () => {
  process.exit();
});