var ratStore = {
  aliveRats: 10,
  deadRats: 0,
  cookedRats: 0,
  isOpen: true,
  money: 0.0,
  ratcoin: 0,
  iskill: false,
  ratcoinPrice: 0.0,
  moneymax: 0.0,
  g: false,
  buysrat: function(number) {
    if (this.money >= (number / 2) && this.isOpen) {
      this.aliveRats += number;
      this.money -= number / 2;
    }
    updatenumbers()
  },
  killsRats: function(number) {
    if (this.aliveRats >= number && this.isOpen) {
      this.aliveRats -= number;
      this.deadRats += number;
    }
    updatenumbers()
  },
  cooksrats: function(number) {
    if (this.deadRats >= number && this.isOpen) {
      this.deadRats -= 1;
      this.cookedRats += number;
    }
    updatenumbers()
  },
  sellsRats: function(number) {
    if (this.cookedRats >= number && this.isOpen) {
      this.cookedRats -= number;
      this.money += (number / 4) * 3;
      this.moneymax += (number / 4) * 3;
    }
    updatenumbers()
  },
  buysRatCoin: function(number) {
    if (this.money >= number && this.isOpen && this.moneymax >= 40) {
      this.money -= number;
      this.ratcoin += 1
    }
    else if (this.money >= number && this.isOpen && this.moneymax < 40) {
      alert("Rat coin is currently unavalible, try to make some more money")
    }
    updatenumbers()
  },
  sellsRatCoin: function(number) {
    if (this.ratcoin >= 1 && this.isOpen && this.moneymax >= 40) {
      this.money += number
      this.moneymax += number
      this.ratcoin -= 1
    }
    else if (this.ratcoin >= 1 && this.isOpen && this.moneymax < 40) {
      alert("Rat coin is currently unavalible, try to make some more money")
    }
    updatenumbers()
  },
  kiling: function() {
    this.iskill = !this.iskill
  },
  close: function() { this.isOpen = false; open.textContent = ratStore.isOpen; },
  open: function() { this.isOpen = true; open.textContent = ratStore.isOpen; },
}
setInterval(function() {
  if (ratStore.ratcoinPrice <= (ratStore.moneymax) / 1.5) {
    ratStore.ratcoinPrice += Math.round(((ratStore.moneymax) / 2) * ((Math.random() * 3) - 1) * 10) / 10
  }
  updatenumbers();
}, 2500);
setInterval(function() {
  updatenumbers();
}, 500);
setInterval(function() {
  if (ratStore.iskill == true && ratStore.isOpen && ratStore.aliveRats >= 1) {
    ratStore.aliveRats -= 1
    ratStore.deadRats += 1
    updatenumbers();
  }
  document.getElementById("killing").innerHTML = (ratStore.iskill == true && ratStore.isOpen && ratStore.aliveRats >= 1)
}, 250);
var alive = document.getElementById("alive");
var dead = document.getElementById("dead");
var cooked = document.getElementById("cooked");
var open = document.getElementById("open");
var killing = document.getElementById("killing");
var money = document.getElementById("money");
var moneymax = document.getElementById("moneymax");
var dingus = document.getElementById("dingus");
var ratcoin = document.getElementById("ratcoin");
var image = document.getElementById("img");
function updatenumbers() {
  alive.textContent = ratStore.aliveRats;
  dingus.textContent = "$" + ratStore.ratcoinPrice.toFixed(1);
  ratcoin.textContent = ratStore.ratcoin;
  dead.textContent = ratStore.deadRats;
  cooked.textContent = ratStore.cookedRats;
  open.textContent = ratStore.isOpen;
  killing.textContent = ratStore.iskill;
  money.textContent = "$" + ratStore.money;
  moneymax.textContent = "$" + ratStore.moneymax;
}
document.getElementById("opening").addEventListener("click", function() { ratStore.open() })
document.getElementById("deaded").addEventListener("click", function() { ratStore.kiling() })
document.getElementById("closing").addEventListener("click", function() { ratStore.close() })
document.getElementById("sellingRat").addEventListener("click", function() { ratStore.sellsRats(1) })
document.getElementById("killingRat").addEventListener("click", function() { ratStore.killsRats(1) })
document.getElementById("cookingRat").addEventListener("click", function() { ratStore.cooksrats(1) })
document.getElementById("buyingRat").addEventListener("click", function() { ratStore.buysrat(1) })
document.getElementById("buyingRatCoin").addEventListener("click", function() { ratStore.buysRatCoin(ratStore.ratcoinPrice) })
document.getElementById("sellingRatCoin").addEventListener("click", function() { ratStore.sellsRatCoin(ratStore.ratcoinPrice) })