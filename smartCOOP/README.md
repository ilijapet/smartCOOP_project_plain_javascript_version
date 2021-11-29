
<p align="center">
<img src =".\pictures\red-2650342_1920.jpg" width="300")
</p> 


## Directory structure
<hr>

- build: result of compiling process (contracts ABI`s)

- client: front-end files 

- contracts: smart contracts

- scripts: deploy script and supporting functions 

- tests: fixtures and test file

<br>

## Address for accessing SmartCOOP front-end 
Please click on link below

https://ilijapet.github.io/smartCOOP/client/

<br>

## Screencast for SmartCOOP project
<hr>

https://www.youtube.com/watch?v=Y9qr7ybG-lA

<br>

## My public ETH address for NFT certification 
<hr>
0xBba4256C9dba48281B71610F30E18c4DeD73B2F3

<br>

<hr>

## <p align="center"> About SmartCOOP </p>
## <p align="center"> Smart contract based agricultural cooperative </p>


With this project we try to assess possibilities coming out from blockchain world to address some of the most pressing challenges small agricultural producers confront. The project will offer simplified version of market reality which is much more complex and nuanced then presented here. But still we believe this project and presented model have all necessary elements which can demonstrate some of potentials blockchain technology has to offer to the world of agriculture.


### 1) Problem statement

Small agricultural producers don't have enough capacity to be effectively present on market as individual producer. That is why they have two basic options. First: to organize themselves in traditional cooperatives in order to improve their negotiation position with bigger corporate buyers. Second: sell as individual producers to big corporations under conditions often not so favorable to them. Both solutions have some drawbacks. Big corporation tend to offer price to indidvual producers which is basically less then average season price for raw small fruits and they pay them at the end of season. Additionally, there is a counterparty risk involved. Corporations can delay or entirely avoid their obligation to pay producers. On the other hand if they organize themselves in form of more traditional cooperatives there is counterparty risk of mismanagement of cooperative funds or collected goods, high managing cost for running traditional cooperative and low overall management efficiency often associated with this type of organizational structure.  

### 2) Some of potential benefits from introducing blockchain technology to the field o agircultural cooperatives 

<br>

- Get real time market price on the day of selling and not lowest average season price
- Cut different contraparty risks (corporative and cooperative one)
- Cost effective way to manage cooperative
- Increased number of possible buyers. In the blockchain world you don't need to know or trust buyers or to have already developed relations with them to be able to effectively do business with them. This can drastically increases the number of potential business partners and lowers legal and logistical cost of doing business.


### 3) Project assumption:
The project assumes that Agricultural Cooperative has:
- Fully operational refrigerator storage for small fruits and warehouse
- Person responsible for quality check  
- Beam scale
- For purpose and simplicity of the project we will also assume that cooperative is dealing only with one type of small fruits lets say raspberries

### 4) Graphical representation of user workflow (cooperant/small producer and buyer) and program logic

<p align="center">
<img src =".\pictures\Logic@2x.png" width="1000" height="600")
</p> 


<br>
<hr>

## Dependencies prerequst  -->
<hr>
<br>

NVM, NPM, Yarn 

From root directory install node 12

    $nvm install 12

Python >= 3.6.0 

<hr>

## Ganche-cli 
<hr>

From project root directory please type (beafore this you need to install node 12)

      $ npm install -g ganache-cli


## Brownie
<hr>
You can install Brownie by using pipx or simple pip
installing. Recommanded way is pipx.

    $python3 -m pip install --user pipx
    $python3 -m pipx ensurepath

You may need to restart your terminal after installing pipx.

Install Brownie with pipx 

    $pipx install eth-brownie

Once installation is completed type Brownie to verify that is working:

    $brownie

And you should get something like: 

    Brownie v1.16.3 - Python development framework for Ethereum

    Usage:  brownie <command> [<args>...] [options <args>]

    ...

Or simply:

    $pip install eth-brownie


## OpenZeppelin
<hr>
Please from project root directory use following command:

    $ brownie pm install OpenZeppelin/openzeppelin-contracts@4.0.0

<br>

## Chainlink
<hr>
Please from project root directory use following command:

    $ brownie pm install smartcontractkit/chainlink-brownie-contracts@0.2.2
    

## Environment variables 
<hr>

VERY IMPORTANT:
Before you start testing and compiling in project smartCOOP root directory you should add .env file and inside that file add your private keys and following infura endpoint: 

        # Here we have private key export         
        PRIVATE_KEY=xxxxxx
        
        # Then we should ad infura entry point though which we will approach to ethereum
        export WEB3_INFURA_PROJECT_ID=d95759f532d54ae58967e92d9ccccf95

## Compile and test
<hr>
To compile and test project locally just type in project root directory:

    $ brownie compile
    $ brownie test

And you should see that 9 test are passed (with this test we did basica coverage of expected return values for all functions in main SmartCOOP contract)


<br>

## dapp usage over http localhost:  
<hr>

Step 1: Open your browser

Step 2: From client folder
    
    $npm install http-server
    $http-server

You should get something like:

    Available on:
    http://127.0.0.1:8080
    http://192.168.152.174:8080
    Hit CTRL-C to stop the server

Step 3: copy&past to your browser address bar:

    http://192.168.152.174:8080
    
    
SmartCOOP front-end should be visible in your browser ready for interaction.
    
 
Or Python version

Step 1: Open your browser

Step 2: From clinet folder

        $pyhton3 -m http.server
        
You should get something like:

        Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
        
Step 3: Go back to your browser and type in address bar:

        http://localhost:8000

       
    
SmartCOOP front-end should be visible in your browser ready for interaction.

Important notice: Dapp is tested on local server and over https://ilijapet.github.io/smartCOOP/client/ according to the instructions we provide above and with following browsers: Brave, Chrome, Firefox and Edge as well as in the context of a clean Virtual machine (Linux Debina, Brave browser over Oracle VM VirtualBox). SmartCOOP dapp was functioning smoothly in all this browser when we run over local server and over github page except in one specific situation.

Bugs noticed in interaction with Brave browser to be aware: in specific corner case when you are already logged in your MetaMask wallet and you land at the front-end and try to click 'Connect wallet' ethereum.selectedAddress return 'undefined'. In all other browsers where we test our dapp and in the same situation we get in return expected value what is ethereum address string data type and dapp is fully functional in all possbile scenarios. Even case when we simple refresh the page Brave return expected value and work properly. Unfortunately till the end of this process we did`t figure out the root cause of this Brave behaviour.            

## Step by step guide for dapp usage

<hr>
IMPORTANT: Please note that in attempt to test and use dapp you will need two have at least two EOA accounts with Kovan test eth. One to become a cooperant and second for a bidder.

1) Open your browser

1) From client folder in your editor or IDE run 

        $http-server

2) Open browser and type in address bar

         http://192.168.152.174:8080

3) Log-in your MetaMask
4) Click **Become SmartCOOP Member** button and confirm transaction
5) Click button **Connect wallet**
6) Enter amout of kilograms you would like to deposit to SmartCOOP and confirm transaction
7) Exit by clicking **Dissconnect wallet**
8) Change address in your MetaMask
9) Click again on **Connect wallet** button (now you are in bidders profile)
11) Type that you want to buy 10 kg in squere after "I want to buy"  
12) Click on button **Buy raspbeery** and wait process to finish

## Tech stack used for project

Solidity

Python

JavaScript

HTML/CSS

Brownie

Web3py

Web3js

MetaMask



