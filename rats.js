//IMPORTANT: https certificate invalidated again womp womp we are switching to another replit again...
//it takes 6 commands to 100% the game as of 5/29/24
var default_rat = "..()()_____...........<br>./.0.......\______..__<br>.\_________/......\/..<br>...||...||............"
var fry = "_______......................_.<br>.......\-|--|--|--|--|--|--|/..<br>........\|--|--|--|--|--|--/...<br>.........\________________/...."
var patchNotes = {
  "0.0": "Ver. 0.0:<br>+ added and optimized rat juices",
  "0.1": "Ver. 0.1:<br>+ added patch notes,<br>- removed a bug: quests having too many event listeners, which broke hiding and showing their contents,<br>+ added patchnotes command,<br>/ made the help command slightly more user friendly,<br>+ added a loading sequence,<br>- removed Maurice",
  "0.2": "Ver. 0.2<br>- removed spellcheck on the console input,<br>/ made the help command not include 'false' arguments,<br>/ improved & tweaked loading sequence,<br>- removed Maurice",
  "0.3": "Ver. 0.3<br>- removed autocomplete on the console input,<br>+ made the 'latest' argument for the patchnotes command work,<br>+ added the 'latestversion' argument to the patchnotes command,<br>+ added new tips,<br>added lore,<br>improved tip functionality,<br>- removed Maurice",
  "0.4": "Ver. 0.4:<br>/reorganized code,<br>+ updated the patchnotes command to inlcude a note on versions with asterisks,<br>/ thought about reorganizing some variables but decided against it,<br>+ started adding stew,<br>- broke everything,<br>- removed Maurice",
  "0.5": "Ver. 0.5:<br>+ fixed everything,<br>+ started adding achievements,<br>+ added a new rat,<br>+ added a new rat,<br>+ added a new rat,<br>- removed Maurice",
  "0.6": "Ver. 0.6:<br>+ continued adding achievements,<br>+ began to change the way achievements are stored",
  "0.7": "Ver. 0.7:<br>+ made achievements actually work yayyyy*,<br>+ added working achievements,<br>- removed Maurice<br><br>*lie",
  "0.8": "Ver. 0.8:<br>+ made achievements REALLY work, not lying this time,<br>/ burnt in the pits of hell",
  "0.9": "Ver. 0.9:<br>+ added a warning and fixed quests,<br>/ changed how the page loads (hopefully its better)",
  "latest": null,
  "latestversion": "0.9"
}
patchNotes.latest = patchNotes[patchNotes.latestversion]
const progBar = function(length, progress) {
  this.bar = ""
  this.length = length
  this.progress = progress
  this.complete = this.length <= this.progress
  this.locked = false
  this.update = function(progress) {
    if (!this.locked) {
      this.progress = progress
    }
    if (this.progress > this.length) {
      this.progress = this.length
    }
    this.bar = "["
    for (let i = 0; i < this.progress && i < this.length; i++) {
      this.bar += "&block;"
    }
    for (let i = 0; i < this.length - this.progress; i++) {
      this.bar += "&nbsp;"
    }
    this.bar += "]"
    this.complete = this.length <= this.progress
    if (this.complete) {
      this.locked = true
    }
    if (this.locked) {
      this.bar = "[Complete]"
    }
  }
  this.increment = function(amount) {
    this.update(this.progress + amount)
  }
  this.update(progress)
}
const ach = function(name, hidden, text, line, progress) {
  this.name = name
  this.hidden = hidden
  this.text = text
  this.line = line
  this.progress = progress;
};
achievements = {
  "Beginnings": new ach("Beginnings", false, "Own one rat", "lust", new progBar(1, 0)),
  "Another!": new ach("Another!", false, "Own two rats", "lust", new progBar(2, 0)),
  "Yum Yum...": new ach("Yum Yum...", false, "Make a stew", "glutton", new progBar(1, 0)),
  "Questing": new ach("Questing", false, "Complete a quest", "pride", new progBar(1, 0)),
  "Try, try again": new ach("Try, try again", false, "Input 5 wrong commands", "sloth", new progBar(5, 0))
}
var loadingText = "Loading..."
async function exist() {
  //core functionality function woah
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay)) //ooo promises spooOOOky
  for (let z = 0; z < loadingText.length; z++) {
    document.getElementById("veil-text").innerHTML += loadingText[z]
    await sleep(100)
  }
  //glariables
  var ratColors = ["brown", "black", "gray"]
  var ratSizes = ["small", "medium"]
  var ratNames = ["Greg", "Jim", "Jake", "Dave", "Terry", "Berry", "Ratticus", "Patej Mometlo", "Mila", "Peelah", "Vera"]
  var ratTypes = ["alive", "dead", "cooked"]
  var flavors = [1, 2, 3, 4]
  var satieties = [2, 3]
  var fleshes = [0]
  var ratIdCount = 0
  var ratsList = []
  var cageList = []
  var cageIdCount = 0
  var output
  var selected = 0
  var cageSelected = 0
  var commands = []
  let tipInterval = 10000
  var commandNames = []
  var tips = [
    "[command] [argument 1] [argument 2]",
    "Try the command 'credits'!",
    "Now try our stews!", "Fall.",
    "No tip for today... boowomp",
    "Nuh uh!",
    "Yeah too!",
    "they are born of falsehood and sin",
    "stoo",
    "Now with all-natural, organic, locally sourced, non-GMO, non-artificial, dairy free, sustainable, renewable rat juices!",
    "You can't eat that!",
    "Put that down!",
    "Be wary, interloper. You have been warned.",
    "Weaponized cheese",
  ]
  function rat(type, name, color, size) {
    if (!size) {
      this.size = ratSizes[Math.floor(Math.random() * ratSizes.length)]
    } else { this.size = size }
    if (!color) {
      this.color = ratColors[Math.floor(Math.random() * ratColors.length)]
    } else { this.color = color }
    if (!name) {
      this.name = ratNames[Math.floor(Math.random() * ratNames.length)]
    } else { this.name = name }
    if (!type) {
      this.status = ratTypes[0]
    } else {
      this.status = ratTypes[parseInt(type)]
    }
    this.id = ratIdCount;
    ratIdCount++
    document.getElementById("middle").innerHTML = document.getElementById("middle").innerHTML + "<span class='rat underlineme' id='rat" + this.id + "'>" + this.name + "</span> "
    ratsList[this.id] = this
    updateRats()
    this.flavor = flavors[Math.floor(Math.random() * flavors.length)]
    this.satiety = satieties[Math.floor(Math.random() * satieties.length)]
    this.flesh = fleshes[Math.floor(Math.random() * fleshes.length)]
  }
  function cage(srats, security) {
    rats = srats
    //rats = array of rat objects
    this.rats = rats
    this.names = []
    this.sizes = []
    this.colors = []
    this.statuses = []
    this.id
    this.security = parseFloat(security)
    this.update = function() {
      this.names = []
      for (n = 0; n < rats.length; n++) {
        if (rats[n]) {
          this.names.push(rats[n].name)
        }
      }
      this.sizes = []
      for (n = 0; n < rats.length; n++) {
        if (rats[n]) {
          this.sizes = this.sizes.concat([rats[n].size])
        }
      }
      this.colors = []
      for (n = 0; n < rats.length; n++) {
        if (rats[n]) {
          this.colors = this.colors.concat([rats[n].color])
        }
      }
      this.statuses = []
      for (n = 0; n < rats.length; n++) {
        if (rats[n]) {
          this.statuses = this.statuses.concat([rats[n].status])
        }
      }
    }
    this.add = function(grat) {
      document.getElementById("cage" + this.id).getElementsByClassName("cage-content")[0].getElementsByTagName("ul")[0].innerHTML += "<li></li>"
      for (i of document.getElementById("cage" + this.id).getElementsByTagName("li")) {
        if (i.innerHTML == "") {
          i.appendChild(document.getElementById("rat" + grat.id))
        }
      }
      this.rats.push(grat)
      this.update()
      updateRats()
    }
    this.delete = function(num) {
      this.rats = this.rats.splice(num, 1)
    }
    this.id = cageIdCount;
    cageIdCount++
    cageList[this.id] = this
    document.getElementById("middle").innerHTML += "<span class='cage' id=cage" + this.id + ">Cage " + this.id + ": <br><span class='cage-content'><ul></ul></span></span>"
    this.update()
    document.getElementById("cage" + this.id).getElementsByClassName("cage-content").innerHTML += "<br>"
    updateRats()
  }
  var store = {
    cages: [],
    numRats: 0,
    money: 5.0,
    ratCost: 1.0,
    update: function() {
      this.numRats = 0
      for (n = 0; n < this.cages.length; n++) {
        this.numRats = (this.numRats + this.cages[n].rats.length)
      }
      this.numRats = this.numRats - 1
    }
  }
  function display(text) {
    document.getElementById("bonsole").innerHTML = document.getElementById("bonsole").innerHTML + "<br>" + text
  }
  for (i = 0; i < document.getElementsByClassName("buton").length; i++) {
    document.getElementsByClassName("buton")[i].innerHTML = "<br>|" + document.getElementsByClassName("buton")[i].innerHTML
    for (let j = 0, l = document.getElementsByClassName("buton")[i].innerHTML.length - 3; j < l; j++) {
      document.getElementsByClassName("buton")[i].innerHTML = "_" + document.getElementsByClassName("buton")[i].innerHTML
    }
    document.getElementsByClassName("buton")[i].innerHTML = document.getElementsByClassName("buton")[i].innerHTML + "|<br>"
    for (let j = 0, l = (document.getElementsByClassName("buton")[i].innerHTML.length / 2) - 4; j < l; j++) {
      document.getElementsByClassName("buton")[i].innerHTML = document.getElementsByClassName("buton")[i].innerHTML + "&#8254;"
    }
  }
  function addInputThings() {
    window.addEventListener("keydown", function(event) {
      if (event.key == "Enter") {
        consoleCommand(document.getElementById("consoleInput").value)
      }
      document.getElementById("consoleInput").focus()
    })
    window.addEventListener("click", function(event) {
      document.getElementById("consoleInput").focus()
    })
  }
  function updateRats() {
    let onRatClick = function() {
      for (j of document.getElementsByClassName("rat")) {
        j.style.border = "0px"
      }
      this.style.border = "4px solid green"
      selected = parseInt(this.id.slice(3))
    }
    let onCageClick = function() {
      for (j of document.getElementsByClassName("cage")) {
        if (ratsList[selected]) {
          if (!document.getElementById("rat" + ratsList[selected].id).parentElement.parentElement == j) {
            j.style.border = "0px"
            j.style.height = "16px"
            j.style.overflow = "hidden"
          } else {
            j.style.border = "0px"
            j.style.height = "auto"
            j.style.overflow = "auto"
          }
        } else {
          j.style.border = "0px"
          j.style.height = "auto"
          j.style.overflow = "auto"
        }
      }
      this.style.border = "4px solid green"
      this.style.height = "auto"
      this.style.overflow = "auto"
    }
    let onQuestClick = function() {
      if (this.style.height == "auto") {
        this.style.height = "16px"
      } else {
        this.style.height = "auto"
      }
    }
    for (i of document.getElementsByClassName("rat")) {
      i.addEventListener("click", onRatClick)
      if (ratsList[parseInt(i.id.slice(3, 4))].status == "dead") {
        i.style.color = "red"
      }
      if (ratsList[parseInt(i.id.slice(3, 4))].status == "alive") {
        i.style.color = "green"
      }
    }
    for (let i = 0; i < document.getElementsByClassName("cage").length; i++) {
      document.getElementsByClassName("cage")[i].addEventListener("click", onCageClick)
      cageSelected = parseInt(document.getElementsByClassName("cage")[i].id[4])
    }
    for (i of document.getElementsByClassName("quest-holder")) {
      if (!i.innerHTML.includes("<!--thisOneHasAnEventListener-->")) {
        i.addEventListener("click", onQuestClick)
        i.innerHTML += "<!--thisOneHasAnEventListener-->"
      }
    }
    g = Array.prototype.slice.call(document.getElementsByClassName("cage"));
    for (let i = 0, j = 0; i < g.length; i++) {
      let k = 0
      for (j of g.slice(0, i)) {
        k += j.getBoundingClientRect().width
      }
      document.getElementsByClassName('cage')[i].style.left = k + "px"
      if (parseInt(g[i].style.left) >= window.innerWidth / 3) {
        g[i].style.top = window.innerHeight / 3 * Math.floor(parseInt(g[i].style.left) / (window.innerWidth / 3)) + "px"
        g[i].style.left = parseInt(g[i].style.left) % (window.innerWidth / 3) + "px"
      }
    }
    for (i of document.getElementsByTagName("li")) {
      if (i.innerHTML == "" || i.innerHTML == undefined) {
        i.remove()
      }
    }
    if (document.getElementById("cookingIngredients").textContent) {
      document.getElementById("noIngredients").style.visibility = "hidden"
    }
    else {
      document.getElementById("noIngredients").style.visibility = "visible"
    }
  }
  function defineCommand(name, description, firstArgs, secondArgs, func) {
    //known bug: after completing a quest you can't expand/collapse the quest anymore
    this.name = name
    this.description = description
    this.args1 = firstArgs
    this.args2 = secondArgs
    this.run = function(args) {
      let gex = Array()
      if (gex.concat(this.args1).indexOf(args[0]) > -1 || !this.args1 || (this.args1.includes("any number") && !isNaN(parseInt(args[0])) && args[0] != undefined && args[0] != "any") || gex.concat(this.args1).indexOf(false) > -1 || (this.args1.includes("any text") && args[0] != undefined && args[0] != " ")) {
        if (gex.concat(this.args2).indexOf(args[1]) > -1 || !this.args2 || (this.args2.includes("any number") && !isNaN(parseInt(args[1])) && args[1] != undefined && args[1] != "any") || gex.concat(this.args2).indexOf(false) > -1 || (this.args2.includes("any text") && args[1] != undefined && args[1] != " ")) {
          output = ""
          func(args[0], args[1])
        } else {
          output = "Invalid second argument. Try 'help " + this.name + "' for more information."
          achievements["Try, try again"].progress.increment(1)
        }
      } else {
        output = "Invalid first argument. Try 'help " + this.name + "' for more information."
        achievements["Try, try again"].progress.increment(1)
      }
    }
    commands.push(this)
  }
  function defineQuest(name, objectives, reward, id) {
    this.name = name
    this.objectives = objectives
    this.reward = reward
    this.id = id
    this.complete = false
    document.getElementById("thing").innerHTML = "<div class='quest-holder' id='quest-" + this.id + "'><span class='underlineme'>" + this.name + "</span><br><div class='quest-content'>OBJECTIVES:<ul></ul></div></div>" + document.getElementById("thing").innerHTML
    for (let i = 0; i < this.objectives.length; i++) {
      document.getElementById("quest-" + this.id).children[2].children[0].innerHTML = document.getElementById("quest-" + this.id).children[2].children[0].innerHTML + "<li class='quest-objective'>" + this.objectives[i] + "</li>"
    }
    this.completeObjective = function(objective) {
      document.getElementById("quest-" + this.id).getElementsByClassName("quest-objective")[objective].style.textDecoration = "line-through"
      let c = 0
      for (i of document.getElementById("quest-" + this.id).getElementsByClassName("quest-objective")) {
        if (i.style.textDecoration == "line-through") {
          c++
        }
      }
      if (c == this.objectives.length) {
        this.complete = true
        document.getElementById("quest-" + this.id).style.textDecoration = "line-through"
        achievements["Questing"].progress.increment(1)
      }
    }
    this.uncompleteObjective = function(objective) {
      document.getElementById("quest-" + this.id).getElementsByClassName("quest-objective")[objective].style.textDecoration = "none"
    }
  }
  function updateCommands() {
    commandNames = []
    for (i = 0; i < commands.length; i++) {
      commandNames.push(commands[i].name)
    }
  }
  async function newTip() {
    let tip = tips[Math.floor(Math.random() * tips.length)]
    document.getElementById("Tip").innerHTML = tip
    await sleep(tipInterval / 2)
    for (let g = 100; g >= 0; g -= 10) {
      document.getElementById("Tip").style.opacity = g + "%"
      await sleep((tipInterval / 2) / 10)
    }
    document.getElementById("Tip").style.opacity = "100%"
  }
  function consoleCommand(input) {
    document.getElementById("consoleInput").value = ""
    output = "error: unknown command"
    var args = []
    for (let i = 0, j = 0; i < input.length + 1; i++) {
      if (input[i] == " " || input[i] == null) {
        args.push(input.slice(j, i))
        j = i + 1
      }
    }
    let g = true
    for (let i = 0; i < commands.length; i++) {
      if (args[0] == commands[i].name) {
        commands[i].run(args.slice(1))
        g = false
      }
    }
    display(input + " -> " + output)
    if (g) {
      achievements["Try, try again"].progress.increment(1)
    }
  }
  var testQuest = new defineQuest("Test Quest", ["Buy 1 rat", "Look at your stats"], "gruh", 0)
  var cookingQuest = new defineQuest("Cooking Quest", ["Cook a rat", "Look at a rat's stats"], "gruh", 1)
  const help = new defineCommand("help", "The help command. You shouldn't need a description for this one...", [undefined], false, function(arg1, arg2) {
    if (!arg1 && !arg2) {
      output = "<br>Commands:"
      for (i = 0; i < commands.length; i++) {
        output = output + "<br>" + commands[i].name
      }
      output = output + "<br>Type 'help [command]' for more information. Commands are structured as '[command] [first argument] [second argument]'. For example, the buy command takes what you want to buy and how much as its arguments. "
    } else {
      //display all arguments of command asked for by arg1
      for (i = 0; i < commands.length; i++) {
        if (commands[i].name == arg1) {
          if (!commands[i].args1) {
            output = "<br>No first arguments."
          } else {
            output = "<br>First Arguments:"
            for (j = 0; j < commands[i].args1.length; j++) {
              if (commands[i].args1[j] == undefined || !commands[i].args1[j]) {
              } else {
                output = output + "<br>" + commands[i].args1[j]
              }
            }
            output = output + "<br>Second Arguments:"
            for (j = 0; j < commands[i].args2.length; j++) {
              if (commands[i].args2[j] == undefined || !commands[i].args2[j]) {
              } else {
                output = output + "<br>" + commands[i].args2[j]
              }
            }
          }
          if (!commands[i].args2) {
            output = output + "<br>No second arguments."
          }
          if (!!commands[i].description) {
            output = output + "<br>Description: " + commands[i].description
          } else {
            output = output + "<br>No description."
          }
        }
      }
    }
  })
  const buy = new defineCommand("buy", "Buy something.", ["rat", "cage", "security"], ["any number"], function(arg1, arg2) {
    if (arg1 == "rat") {
      let g = true
      for (let i = 0; i < arg2 && store.money > store.ratCost; i++) {
        g=false
        output = "success."
        store.money -= store.ratCost
        store.cages[0].add(new rat)
        store.ratCost = Math.ceil(store.ratCost * 1.5)
        store.update()
        document.getElementById("rat" + selected).style.border = "4px solid green"
        achievements["Beginnings"].progress.increment(1)
        achievements["Another!"].progress.increment(1)
        testQuest.completeObjective(0)
        if (store.money < store.ratCost) { output += " No more money :( You need " + (store.ratCost - store.money) + " more money." }
      }
      if(g){output = " No more money :( You need " + (store.ratCost - store.money) + " more money."}
    } else if (arg1 == "cage") {
      output = "success"
      store.cages.push(new cage([], 0.0))
      store.update()
    } else {
      output = "i dint add that yet"
    }
  })
  const stats = new defineCommand("stats", "Find details about something!", ["store", "selected"], false, function(arg1) {
    if (arg1 == "store") {
      updateRats()
      output = "<br>Store Stats:<br>Number of rats: " + store.numRats + "<br>Number of cages: " + store.cages.length + "<br>Cost to buy new rat: " + store.ratCost + "<br>Money: " + store.money
      testQuest.completeObjective(1)
    } else if (arg1 == "selected") {
      if (ratsList[selected]) {
        output = "<br>Selected Stats:<br>Name: " + ratsList[selected].name + "<br>Color: " + ratsList[selected].color + "<br>Size: " + ratsList[selected].size + "<br>Status: " + ratsList[selected].status
        cookingQuest.completeObjective(1)
      } else {
        output = "Nothing selected!"
      }
    }
  })
  const credits = new defineCommand("credits", "Learn about the game!", false, false, function() {
    output = "<br>Created by Oliver. Art by Abrahim<br>Sponsored by mind goblins and brainrot. The game was made in the vanilla HTML5 suite with lots of pain."
  })
  const cook = new defineCommand("cook", "Cooking utility command. Also used to kill rats.", ["add", "kill"], ["selected", "random"], function(arg1, arg2) {
    let Selected
    if (arg2 == "selected") {
      Selected = selected
    } else if (arg2 == "random") { Selected = Math.floor(Math.random() * ratsList.length) } else {
      output = "Improper selection."
    }
    if (ratsList[Selected]) {
      if (arg1 == "add") {
        if (ratsList[Selected].status == "dead") {
          document.getElementById("cookingIngredients").appendChild(document.getElementById("rat" + ratsList[Selected].id))
          output = "Rat added to pot."
          cookingQuest.completeObjective(0)
        } else {
          output = "You may only add dead rats to the pot."
        }
      } else if (arg1 == "kill") {
        if (ratsList[Selected].status == "alive") {
          ratsList[Selected].status = "dead"
          output = "Rat killed."
        } else {
          output = "You cannot kill this rat right now."
        }
      }
    } else {
      output = "Improper selection."
    }
    updateRats()
  })
  const patchNotesCMD = new defineCommand("patchnotes", "Display patch notes", ["versions", "version"], ["any number", "latest", "latestversion", false], function(arg1, arg2) {
    if (arg1 == "versions") {
      for (i in patchNotes) {
        output += ("Note: versions with an asterisk(*) are unfinished and likely still in progress. <br>" + i)
      }
    } else if (arg1 == "version") {
      if (arg2) {
        if (patchNotes[arg2]) {
          output = patchNotes[arg2]
        } else {
          output = "Version '" + arg2 + "' not found."
        }
      } else {
        output = "Invalid second argument. Try 'help patchnotes' for more information."
      }
    }
  })
  const stewCMD = new defineCommand("stew", "Assemble a stew. The first argument is the name of the stew", ["any text"], false, function(arg1, arg2) {
    let ingredients = []
    for (i of document.getElementById("cookingIngredients").children) {
      ingredients.push(ratsList[parseInt(i.id.slice(3, 4))])
      i.remove()
    }
    achievements["Yum Yum..."].progress.increment(1)
    store.money += 3000000000
  })
  const achCMD = new defineCommand("achievements", "in testing phase", false, false, function() {
    output = "Achievements page opened."
    open("./achievements", "_blank")
    console.log("gruh")
  })
  store.cages.push(new cage(ratsList, 0.0))
  setInterval(newTip, tipInterval)
  updateCommands()
  help.args1 = help.args1.concat(commandNames)
  addInputThings()
  display("Type help and press enter if you are stuck.")
  document.getElementById("cooking").getElementsByTagName("p")[0].innerHTML = "<br>" + fry
  //fake loading sequence
  await sleep(500)
  document.getElementById("veil-text").innerHTML = "<span id='loading-bar' style='width:100%;text-align:center;'></span>"
  for (let i = 0; i < 25; i++) {
    document.getElementById("loading-bar").innerHTML = "["
    for (let j = 0; j < i; j++) {
      document.getElementById("loading-bar").innerHTML += "&block;"
    }
    for (let j = i; j < 25; j++) {
      document.getElementById("loading-bar").innerHTML += "&nbsp;"
    }
    document.getElementById("loading-bar").innerHTML += "]<br>"
    await sleep(Math.floor(Math.random() * 250))
  }
  document.getElementById("loading-bar").innerHTML = "Complete!"
  await sleep(500)
  document.getElementById("veil").remove()
  document.getElementById("consoleInput").focus()
}
async function load() {
  document.getElementById("veil").innerHTML += "<div id='warningText'><h1>WARNING:</h1><p>To play this game, you require certain skills. Proceed with caution if you do not have them. These skills are: <ul><li>The ability to read</li><li>Pattern recognition capability</li><li>Reading comprehension</li></ul>If you do not have these skills, you will not be able to play this game. To proceed, click the button below. <br><small>NOTE: this is not a personal insult. I have had many people play this game who are not successful and frustrate both me and themselves by not demonstrating these skills.</small></p><button id='proceedButton'>Proceed</button></div>"
  let accepted = new Promise((resolve) => document.getElementById("proceedButton").addEventListener("click", resolve))//ooh look at me i know how to use promises ooh look look im so cool - olibo b
  await accepted
  document.getElementById("warningText").remove()
  exist()
}