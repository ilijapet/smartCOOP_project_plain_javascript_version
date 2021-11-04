
// Template part
const template = document.getElementById("template-balance")

// Network name
const networkName= document.getElementById("network-name")  

const cooperantProfile = document.getElementById("cooperantProfile")
const accountContainer = document.getElementById("accounts")
const furitsInWarhouse = document.getElementById("furitsInWarhouse")

// Input
const depositKg = document.getElementById("deposit_kg")

// Buttons
const prepare = document.getElementById("prepare")
const connected = document.getElementById("connected")
const btnConnect= document.getElementById("btn-connect")
const btnDisconnect = document.getElementById("btn-disconnect")
const becomeMember= document.querySelector(".button")
const depositRaspberry = document.querySelector(".deposit")
const buttonTextMember = document.querySelector(".button__text")
const buttonProgressMember = document.querySelector(".button__progress")
const buttonTextDeposit = document.querySelector(".button__text_deposit")
const buttonProgressDeposit = document.querySelector(".button__progress_deposit")
const addToken = document.getElementById("addToken")

// Helper const
const expectedBlockTime = 1000; 
const tokenAddress = '0xAa2d30AD4F51a29DFa674DaBdE60bd31cD4D8f1B';
const tokenSymbol = 'COOP';
const tokenDecimals = 18;
const tokenImage = 'https://ilijapet.github.io/photos/noun_raspberry_4132882_mala.svg';


// Helper 1

async function nameOfNetwork () {
    let id = ethereum.networkVersion; 
    let netName = NetworkID[id];
    return netName;
  }
   
  
// Helper 2

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
  


// Helper function 3

function MakeQuerablePromise(promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isFulfilled) return promise;

  // Set initial state
  var isPending = true;
  var isRejected = false;
  var isFulfilled = false;

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
      function(v) {
          isFulfilled = true;
          isPending = false;
          return v; 
      }, 
      function(e) {
          isRejected = true;
          isPending = false;
          throw e; 
      }
  )

  result.isFulfilled = function() { return isFulfilled; };
  result.isPending = function() { return isPending; };
  result.isRejected = function() { return isRejected; };
  return result;
}


// Helper 4

async function setButtonProgress(button, buttonText, buttonProgress, tx) {
  buttonText.textContent = button.dataset.progressText; 
  let x = 30;
  var myTrans = MakeQuerablePromise(tx)  
  while ( x <= 130 && myTrans.isFulfilled() === false ) {
      myTrans = MakeQuerablePromise(tx)
      buttonProgress.style.width = `${x}%`;
      await sleep(expectedBlockTime)
      x += 4;      
    };
  buttonProgress.style.width = `${100}%`;
  buttonText.textContent = button.dataset.completeText;  
}

 
export {
  template,
  expectedBlockTime, 
  networkName,
  cooperantProfile,
  accountContainer,
  furitsInWarhouse,
  depositKg,
  connected,
  btnConnect,
  btnDisconnect,
  becomeMember,
  depositRaspberry,
  buttonTextMember,
  buttonProgressMember,
  buttonTextDeposit,
  buttonProgressDeposit,
  prepare,
  addToken,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
  nameOfNetwork, 
  setButtonProgress,
  sleep 
}