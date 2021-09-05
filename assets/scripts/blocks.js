$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

// create bot block
Blockly.Blocks['bot'] = {
  init: function() {
      this.appendDummyInput()
        .appendField("bot");
      this.appendStatementInput("bot")
        .setCheck(null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

// Create ask_me_a_question block 
Blockly.Blocks['ask_me_a_question'] = {
init: function() {
    this.appendDummyInput()
    .appendField("Ask me a question")
      .appendField(new Blockly.FieldDropdown([
          ["What is the date today?","Q1"], 
          ["What is the time now?","Q2"], 
          ["How are you?","Q3"], 
          ["What is JavaScript?","Q4"], 
          ["What is your name?","Q5"]
      ]), "ask");
      this.setPreviousStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

// JS code for ask_me_a_question block 
Blockly.JavaScript['ask_me_a_question'] = function(block) {
  return block.getFieldValue('ask');
};

// JS code for bot block
Blockly.JavaScript['bot'] = function(block) {
  var statements_bot = Blockly.JavaScript.statementToCode(block, 'bot').trim();
  var code = `
      var inputTextValue = "${statements_bot}";
  `;
  return code;
};

// Injected blockly blocks 
var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

// InputText Answer shows from here 
function redrawUi() {
  let text;
  if (typeof inputTextValue !== "undefined") {

    switch (inputTextValue) {
      case "Q1":
        var today = new Date();
        text = "The Date is " + today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        break;
      case "Q2":
        var today = new Date();
        text = "The Time is " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " IST";
        break;
      case "Q3":
        text = "I am Fine";
        break;
      case "Q4":
        text = "JavaScript is the world's most popular language";
        break;
      case "Q5":
        text = "My name is Dip Dhameliya";
        break;
      default:
        text = "You have not asked anything!!";
    }
    console.log(text);
    $("#inputBox").text(text);
    
  } else {
    $("#inputBox").text("");
  }
}

// run button
function runcode() {
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

// reset button 
function reset() {
  delete inputTextValue;
  location.reload();
  redrawUi();
}
