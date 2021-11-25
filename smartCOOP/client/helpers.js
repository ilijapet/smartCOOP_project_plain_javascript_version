
// Template part
const template = document.getElementById("template-balance")
const templateBidder = document.getElementById("template-balance-bidder")

// Network name
const networkName = document.getElementById("network-name")
const networkNameBidder = document.getElementById("network-name-bidder")

// Account & bidder
const cooperantProfile = document.getElementById("cooperantProfile")
const bidderProfile = document.getElementById("bidderProfile")
const accountContainer = document.getElementById("accounts")
const accountContainerBidder = document.getElementById("accounts_bider")
const furitsInWarhouse = document.getElementById("furitsInWarhouse")
const boughtFruitsFromWarhouse = document.getElementById("boughtFruitsFromWarhouse")

// Input
const depositKg = document.getElementById("deposit_kg")
const bought_kilograms = document.getElementById("bought_kilograms")

// Buttons
const prepare = document.getElementById("prepare")
const connected = document.getElementById("connected")
const btnConnect = document.getElementById("btn-connect")
const btnDisconnect = document.getElementById("btn-disconnect")
const buyRaspberry = document.querySelector(".bidder_buy")
const becomeMember = document.querySelector(".button")
const depositRaspberry = document.querySelector(".deposit")
const buttonTextMember = document.querySelector(".button__text")
const buttonProgressMember = document.querySelector(".button__progress")
const buttonTextDeposit = document.querySelector(".button__text_deposit")
const buttonTextDepositBidder = document.querySelector(".button__text_deposit_bidder")
const buttonProgressDeposit = document.querySelector(".button__progress_deposit")
const buttonProgressDepositBidder = document.querySelector(".button__progress_deposit_bidder")
const addToken = document.getElementById("addToken")

// Helper const
const expectedBlockTime = 1000;
const raspberryPrice = 9;
const tokenAddress = '0xc6Fef8321b54610Afc1828FCF43DB607874962B3';
const tokenSymbol = 'COOP';
const tokenDecimals = 18;
const tokenImage = 'https://ilijapet.github.io/photos/noun_raspberry_4132882_mala.svg';


// Helper networks
async function nameOfNetwork() {
  let id = ethereum.networkVersion;
  let netName = NetworkID[id];
  return networkName.textContent = netName;
}

async function nameOfNetworkBidder() {
  let id = ethereum.networkVersion;
  let netName = NetworkID[id];
  return networkNameBidder.textContent = netName;
}


// Helper sleep
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// Helper promise

function MakeQuerablePromise(promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isFulfilled) return promise;

  // Set initial state
  var isPending = true;
  var isRejected = false;
  var isFulfilled = false;

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
    function (v) {
      isFulfilled = true;
      isPending = false;
      return v;
    },
    function (e) {
      isRejected = true;
      isPending = false;
      throw e;
    }
  )

  result.isFulfilled = function () { return isFulfilled; };
  result.isPending = function () { return isPending; };
  result.isRejected = function () { return isRejected; };
  return result;
}


// Helper progress button
async function setButtonProgress(button, buttonText, buttonProgress, tx) {
  buttonText.textContent = button.dataset.progressText;
  let x = 30;
  var myTrans = MakeQuerablePromise(tx)
  while (x <= 130 && myTrans.isFulfilled() === false) {
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
  templateBidder,
  expectedBlockTime,
  networkName,
  networkNameBidder,
  cooperantProfile,
  bidderProfile,
  accountContainer,
  accountContainerBidder,
  furitsInWarhouse,
  boughtFruitsFromWarhouse,
  depositKg,
  bought_kilograms,
  connected,
  btnConnect,
  btnDisconnect,
  becomeMember,
  depositRaspberry,
  buyRaspberry,
  buttonTextMember,
  buttonProgressMember,
  buttonTextDeposit,
  buttonTextDepositBidder,
  buttonProgressDeposit,
  buttonProgressDepositBidder,
  prepare,
  addToken,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
  nameOfNetwork,
  nameOfNetworkBidder,
  setButtonProgress,
  sleep,
  raspberryPrice
}