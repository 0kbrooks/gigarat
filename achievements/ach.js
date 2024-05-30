function doAchievements() {
  var achlines = []
  for(let i of document.getElementsByClassName('achline')){
    achlines.push(i)
  }
  for(let i of achlines) {
    var achs = []
    for(let g of i.children) {
      achs.push(g)
    }
    for(let g of achs.slice(2)) {
      g.remove()
    }
  }
  var achievements
  if (window.opener) {
    achievements = window.opener.achievements
  }/* else {
  const progBar = function(length, progress) {
    this.bar = ""
    this.length = length
    this.progress = progress
    this.complete = this.length <= this.progress
    this.locked = false
    this.update = function(progress) {
      if (!this.locked) {
        this.bar = "["
        for (let i = 0; i < progress; i++) {
          this.bar += "&block;"
        }
        for (let i = 0; i < this.length - progress; i++) {
          this.bar += "&nbsp;"
        }
        this.bar += "]"
      }
      this.complete = this.length <= this.progress
      if (this.complete) {
        this.locked = true
      }
      if (this.locked) {
        this.bar = "[Complete]"
      }
    }
    this.update(progress)
  }
  const ach = function(name, hidden, text, line, progress) {
    this.name = name
    this.hidden = hidden
    this.text = text
    this.line = line
    this.progress = progress;
    increaseProgress = function(count) {
      this.progress.update(this.progress.progress+count)
    }
  };
  achievements = {
    "Beginnings": new ach("Beginnings", false, "Own three rats", "lust", new progBar(1, 0)),
    "gruh": new ach("gruh", false, "gruh...", "lust", new progBar(0, 0))
  }
}*/
  for (let i in achievements) {
    var newAchElement = document.createElement("div");
    var newAchTitle = document.createElement("div");
    newAchTitle.innerHTML = "&#9744; " + achievements[i].name;
    newAchElement.appendChild(newAchTitle)
    var newAchContent = document.createElement("div");
    var newAchText = document.createElement("span");
    newAchText.innerHTML = achievements[i].text;
    newAchContent.appendChild(newAchText);
    var newAchProgressBar = document.createElement("span")
    newAchProgressBar.innerHTML = "<br>" + achievements[i].progress.bar;
    newAchContent.appendChild(newAchProgressBar)
    newAchElement.appendChild(newAchContent)
    newAchElement.classList.add("ach")
    document.getElementById("achline-" + achievements[i].line).appendChild(newAchElement)
  }
  function updateAchs() {
    for (let i of document.getElementsByClassName("ach")) {
      if (i.children[1].children[1].innerHTML.includes("Complete")) {
        i.children[0].innerHTML = "&#9746;" + i.children[0].innerHTML.slice(1)
      }
    }
  }
  updateAchs()
}
doAchievements()
setInterval(function(){doAchievements()},1000)