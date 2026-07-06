class Bank {
    constructor(name){
        this.name = name
        this.accounts = []
    }

    openAccount(name, bal, accountType){
        let acc = new bankAccount(name, bal, accountType)
        if (acc.accountNumber) { // only store it if it was created successfully
            this.accounts.push(acc)
        }
        return acc
    }

    findAccount(accountNumber){
        return this.accounts.find(acc => acc.accountNumber === accountNumber)
    }

    freezeAccount(accountNumber){
        let acc = this.findAccount(accountNumber)
        if (!acc) {
            console.log("account not found")
            return
        }
        acc.frozen = true
        console.log("account frozen")
    }


    checkStatus(accountNumber){
    let acc = this.findAccount(accountNumber)
    if (!acc) {
        console.log("account not found")
        return
    }
    return acc.checkStatus()
}

   activateAccount(accountNumber){
    let acc = this.findAccount(accountNumber)
    if (!acc) {
        console.log("account not found")
        return
    }
    acc.isActive = true
    acc.frozen = false
    console.log("account activated")
    }

    deactivateAccount(accountNumber){
    let acc = this.findAccount(accountNumber)
    if (!acc) {
        console.log("account not found")
        return
    }
    acc.deactivateAccount()
   }
}


class bankAccount{
    constructor(name, bal, accountType){

        if (accountType !== "savings" && accountType !== "current") {
            console.log("invalid account type")
            return
        }
        this.name = name
        this.bal = bal
        this.accountType = accountType
        this.accountNumber = this.generateAccountNumber()
         this.isActive = true
        this.frozen = false
    
    }



    checkStatus(){
    if (!this.isActive) {
        console.log("not active")
        return "not active"
    }
    if (this.frozen) {
        console.log("not active")
        return "not active"
    }
    console.log("active")
    return "active"
    }



    deactivateAccount(){
    this.isActive = false
    console.log("account deactivated")
    }

    generateAccountNumber(){

        let accountNumber = Math.floor(Math.random()*10000000000 )
        return accountNumber.toString().padStart(10, '0')
        console.log(accountNumber)
    }

    deposit(num){
    if (this.frozen) {
        console.log("cannot deposit: account is frozen")
        return
    }
    if (!this.isActive) {
        console.log("cannot deposit: account is deactivated")
        return
    }
    this.bal += num
    console.log("deposit successful")
    }


   withdraw(num){
    if (this.frozen) {
        console.log("cannot withdraw: account is frozen")
        return
    }
    if (!this.isActive) {
        console.log("cannot withdraw: account is deactivated")
        return
    }
    if (num > this.bal) {
        console.log("insufficient balance")
        return
    }

    this.bal -= num
    console.log("withdrawal successful")
    }





   transfer(bank, toAccountNumber, num){
    if (this.frozen) {
        console.log("cannot transfer: account is frozen")
        return
    }
    if (!this.isActive) {
        console.log("cannot transfer: account is deactivated")
        return
    }

    let toAccount = bank.findAccount(toAccountNumber)
    if (!toAccount) {
        console.log("recipient account does not exist")
        return
    }

    if (num > this.bal) {
        console.log("insufficient balance")
        return
    }

    this.bal -= num
    toAccount.bal += num
    console.log("sufficient balance, withdrawal successful")
    }



    
}




let gtBank = new Bank("GTBank")
 
let user1 = gtBank.openAccount("josh", 1000, "savings")
let user2 = gtBank.openAccount("doris", 500, "current")
let user3 = gtBank.openAccount("chi", 300, "crypto") // should be invalid
 
console.log("--- account numbers ---")
console.log(user1.accountNumber, user1.accountNumber.length)
console.log(user2.accountNumber, user2.accountNumber.length)
 
console.log("--- deposit ---")
user1.deposit(500)
console.log(user1.bal) // 1500
 
console.log("--- withdraw ---")
user1.withdraw(200)
console.log(user1.bal) // 1300
user1.withdraw(999999) // insufficient balance
 
console.log("--- transfer ---")
user1.transfer(gtBank, user2.accountNumber, 300)
console.log(user1.bal, user2.bal) // 1000, 800
user1.transfer(gtBank, "0000000000", 100) // recipient does not exist
 
console.log("--- freeze ---")
gtBank.freezeAccount(user1.accountNumber)
user1.deposit(100) // blocked: frozen
user1.checkStatus() // not active
 
console.log("--- activate ---")
gtBank.activateAccount(user1.accountNumber)
user1.checkStatus() // active
 
console.log("--- deactivate ---")
user2.deactivateAccount() // owner deactivates own account
user2.checkStatus() // not active
 
gtBank.deactivateAccount(user1.accountNumber) // bank deactivates
user1.checkStatus() // not active
 
console.log("--- bank-level status check ---")
gtBank.checkStatus(user1.accountNumber)
 