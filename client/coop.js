import {
  template,
  templateBidder,
  networkName,
  nameOfNetwork,
  networkNameBidder,
  nameOfNetworkBidder,
  cooperantProfile,
  bidderProfile,
  accountContainer,
  accountContainerBidder,
  depositKg,
  bought_kilograms,
  connected,
  btnConnect,
  btnDisconnect,
  becomeMember,
  depositRaspberry,
  buyRaspberry,
  furitsInWarhouse,
  boughtFruitsFromWarhouse,
  buttonTextMember,
  buttonProgressMember,
  buttonTextDeposit,
  buttonTextDepositBidder,
  buttonProgressDeposit,
  buttonProgressDepositBidder,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
  addToken,
  setButtonProgress,
  sleep,
  raspberryPrice
}
  from "./helpers.js";



// Init function is runned when page is loaded.
function init() {
  console.log("Ethereum provider is", window.ethereum);
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
  cooperantProfile.style.visibility = "hidden";
  bidderProfile.style.visibility = "hidden";
}


// Fetech cooperant account data
async function fetchAccountDataCooperant() {
  networkName.textContent = await nameOfNetwork();
  const cooperantAccount = await ethereum.selectedAddress;
  const cooperantsAccountsBalance = await coopContract.methods.getUserAccountBalance(cooperantAccount).call();
  const clone = template.content.cloneNode(true);
  clone.querySelector(".address").textContent = cooperantAccount;
  clone.querySelector(".balance").textContent = cooperantsAccountsBalance[2];
  clone.querySelector(".kg").textContent = cooperantsAccountsBalance[1];
  accountContainer.innerHTML = '';
  accountContainer.appendChild(clone);
  prepare.style.display = "none";
  connected.style.display = "block";
  ethereum.on('accountsChanged', (accounts) => {
    fetchAccountDataCooperant();
  })
}

async function fetchAccountDataBidder() {
  becomeMember.style.visibility = "hidden";
  networkNameBidder.textContent = await nameOfNetworkBidder();
  const bidderAccount = await ethereum.selectedAddress;
  const bidderAccountBalance = await coopContract.methods.getBidderAccountBalance(bidderAccount).call();
  const clone = templateBidder.content.cloneNode(true);
  clone.querySelector(".addressBidder").textContent = bidderAccount;
  clone.querySelector(".balanceBidder").textContent = bidderAccountBalance[0];
  clone.querySelector(".kgBidder").textContent = bidderAccountBalance[1];
  accountContainerBidder.innerHTML = '';
  accountContainerBidder.appendChild(clone);
  prepare.style.display = "none";
  connected.style.display = "block";
  ethereum.on('accountsChanged', (accounts) => {
    fetchAccountDataBidder();
  })
}

// Connect wallet button 
btnConnect.onclick = async () => {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (err) {
    console.log("Could not get a wallet connection", err);
  }
  var connectedAccount = ethereum.selectedAddress;
  const cooperantAccount = await coopContract.methods.getUserAccountBalance(connectedAccount).call();
  if (ethereum.selectedAddress !== null && cooperantAccount[0] !== '0') {
    cooperantProfile.style.visibility = "visible";
    fetchAccountDataCooperant();
  } else {
    bidderProfile.style.visibility = "visible";
    fetchAccountDataBidder();
  }
}


// Disconnect wallet button 
btnDisconnect.onclick = () => {
  window.location.reload();
}


// Become a COOP member
becomeMember.onclick = async () => {
  var account = ethereum.selectedAddress;
  if (account !== undefined && account !== null) {
    let cooperants = await coopContract.methods.getUserAccountBalance(account).call();
    if (cooperants[0] === '0') {
      var trans = coopContract.methods.becomeCoopMember().send({ from: account, value: '10000 ' }, async function (error, transactionHash) {
        if (error) {
          console.log(error);
        } else {
          await setButtonProgress(becomeMember, buttonTextMember, buttonProgressMember, trans)
        }
      });
    } else {
      buttonTextMember.innerText = 'You are already member';
    };
  } else {
    buttonTextMember.innerText = 'Please connect your wallet';
    await sleep(5000)
    buttonTextMember.innerText = 'Become a SmartCOOP member';
  };
}


// Deposit your raspberry
depositRaspberry.onclick = async () => {
  var account = ethereum.selectedAddress;
  let cooperants = await coopContract.methods.getUserAccountBalance(account).call();
  if (cooperants[0] !== '0') {
    furitsInWarhouse.innerText = "";
    let amount = depositKg.value;
    var done = coopContract.methods.depositFruitsToCOOP(amount).send({ from: account }, async function (error, transactionHash) {
      if (error) {
        console.log(error);
      } else {
        await setButtonProgress(depositRaspberry, buttonTextDeposit, buttonProgressDeposit, done)
      }
      fetchAccountDataCooperant();
      furitsInWarhouse.innerText = "Your frutits is in COOP warhouse";
      addToken.style.visibility = "visible";

      depositKg.value = "";
    });
  } else {
    depositRaspberry.innerText = 'Please become COOP member';
  }
}


// Buy your raspberry
buyRaspberry.onclick = async () => {
  var account = ethereum.selectedAddress;
  boughtFruitsFromWarhouse.innerText = "";
  let amount = parseInt(bought_kilograms.value);
  let inUSD = amount * raspberryPrice;
  var inWei = await coopContract.methods.ethUSD(inUSD).call();
  var inWeiString = String(inWei)
  var done = coopContract.methods.bid(amount).send({ from: account, value: inWeiString, gas: 5000000 }, async function (error, transactionHash) {
    if (error) {
      console.log(error);
    } else {
      await setButtonProgress(buyRaspberry, buttonTextDepositBidder, buttonProgressDepositBidder, done)
    }
    fetchAccountDataBidder();
    boughtFruitsFromWarhouse.innerText = "You bought raspberries from SmartCOOP";
    bought_kilograms.value = "";
  });
}

addToken.onclick = async () => {
  try {
    const wasAdded = await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });
    if (wasAdded) {
      console.log('Thanks for your interest!');
    } else {
      console.log('Your loss!');
    }
  } catch (error) {
    console.log(error);
  }
};

try {
  ethereum.on('networkChanged', nameOfNetwork)
  ethereum.on('networkChanged', nameOfNetworkBidder);
} catch (err) {
  console.error('Please install MetaMask', err)
}

window.addEventListener("load", async () => {
  init();
});