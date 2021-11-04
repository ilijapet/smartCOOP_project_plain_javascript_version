import {
  template,
  networkName,
  nameOfNetwork,
  cooperantProfile,
  accountContainer,
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
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
  addToken,
  setButtonProgress,
  sleep
}
  from "./helpers.js";



// Init function is runned when page is loaded.
function init() {
  console.log("Ethereum provider is is", window.ethereum);

  // // Check that the web page is run in a secure context, as otherwise MetaMask can be unavailable
  // if (location.protocol !== 'https:') {
  //   // https://ethereum.stackexchange.com/a/62217/620
  //   alert("You dont use HTTPS. Please change your protocl otherwhise you may have problem with some wallets");
  //   btnConnect.setAttribute("disabled", "disabled");
  //   return;
  // };

  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }

  cooperantProfile.style.visibility = "hidden";
}


// Fetech cooperant account data
async function fetchAccountData() {

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
    fetchAccountData();
  })

}


// Connect wallet button 
btnConnect.onclick = async () => {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (err) {
    console.log("Could not get a wallet connection", err);
  }

  // In corner case when we exit dapp and then chnage account this will prevent from html element 'proba' showing up. In the same time it will set up
  // stage for dapp usage if account is avalible. 
  if (ethereum.selectedAddress !== null) {
    fetchAccountData();
    cooperantProfile.style.visibility = "visible";
  }
}


// Disconnect wallet button 
btnDisconnect.onclick = () => {
  window.location.reload();

  // Set the UI back to the initial state
  prepare.style.display = "block";
  connected.style.display = "none";
  cooperantProfile.style.visibility = "hidden";
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
  console.log(cooperants[0], 2)
  if (cooperants[0] !== '0') {
    furitsInWarhouse.innerText = "";
    let amount = depositKg.value;
    var done = coopContract.methods.depositFruitsToCOOP(amount).send({ from: account }, async function (error, transactionHash) {
      if (error) {
        console.log(error);
      } else {
        await setButtonProgress(depositRaspberry, buttonTextDeposit, buttonProgressDeposit, done)
      }
      fetchAccountData();
      furitsInWarhouse.innerText = "Your frutits is in COOP warhouse";
      addToken.style.visibility = "visible"; 

      depositKg.value = "";
    });
  } else {
    depositRaspberry.innerText = 'Please become COOP member';
  }
}

addToken.onclick = async () => {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, 
          symbol: tokenSymbol, 
          decimals: tokenDecimals, 
          image: tokenImage, 
        },      
      },
    });
    console.log(tokenDecimals)
    if (wasAdded) {
      console.log('Thanks for your interest!');
    } else {
      console.log('Your loss!');
    }
  } catch (error) {
    console.log(error);
  }
};


// Main entry point
window.addEventListener("load", async () => {
  init();
})