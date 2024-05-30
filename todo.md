## TO DO LIST (press 'preview' in the top right)

### high priority
- [ ] do cooking system things
  - [x] pot and adding rats to it
  - [ ] the actual stew???
    - what do i even do with this
    - idk
- [ ] make event listeners only add themselves once
  - see the stuff i did for quest-holder, its important

### low priority
- [ ] add command history with smth like this
  - ```js
    history = {
      stuff:Array(),
      add:function(thing){
        if(typeof thing == "string"){
          this.stuff.push(things)
        }
      },
      retrieve:function(line){
        if(typeof line == "number"){
          return(this.stuff[line])
        }
      },
    }
    history.add("[whatever command n args n whatnot]")
    //add a history command so the user can interface
    //2 commands: 1 shows history and 2 executes a command from history
  - strugging here all on my own
  - mid priodity
- [ ] add stock market
- [ ] implement a use for security (rats escape?)
  - [ ] killing rats = some way to track rat discontent, if rats are discontent then will try to escape. escape attempt successes determined by security

### completed
- [x] make to do list
- [x] fix bugs
  - [x] no quests expand/collapse after test quest is completed
      - the issue was that event listeners were being applied a weird number of times i think 
- [x] if cage not selected then rats in it hidden
  - changed my mind about this one, dont add it(?)
- [x] have ideas

### impossible
- [ ] make the cages and rats look good
  - how???
- [ ] add a way to make money
- [ ] make game fun
###### lady grinning soul david bowie