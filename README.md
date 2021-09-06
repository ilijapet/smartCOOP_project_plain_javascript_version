
<p align="center">
<img src =".\pictures\red-2650342_1920.jpg" width="300")
</p> 


## <p align="center"> Smart Contract based agricultural cooperative </p>


With this project we would like to asses possbilities coming out from blockchain world to address some of the most pressing chalengies small agircultural producers confront. In this project we will offere simplified verison of market reality which is much more complex and nunced then presented here. But still we belive that this exrcesis and model presented have all neccesery elements which can allow us to demonstrate some of potentials blockchain tehcnology have for field of agriculture.


## 1) Problem statment

Small producers don't have enough capacity to be effectivly present on market as indivudal producers. That is why they have two option.

First: organzie themself in tradional cooperatives, improve negotion postion through this self-organizaiton and then enter negotiation  process with big coorporate buyers or act as independet market actor with own products. Second: sell as indidivual producer to big corporations under condition often not so favorable to them. 

Both solutions have some drawbacks associted with them. Big coorporation tend to offer price which is basicaly less then avarage session price for small fruits and they pay producers on the end of session. What means that small producers with their goods credit big coorporations and for doing that they get lowest market price for their row fruit. Then there is also counterparty risk inovolved. Coorporations can delay or entierly avoid their obligaiton to pay small producers. Having in mind fact that often corporations have in-house legal depratmens and theri fincial capacity and then on other side lack of specific legal knowlegde and finacial means of small producer to fight legal case agains big corporations, their position is not so good also in this regard. 

On the other hand if they organize themself in form of more tradional cooperatives there is contuterparty risk of missmenagment of cooperative funds or collected goods, high managing cost for runnig traditional coopertive and low overall managment efficency often associated with this type of organizational structure.  

## 2) Some of potenitla benefits of introducing blockchain technology (answers to some chalengies and problems)

- Get real time market price on the day of selling not lowest average session price
- Cut diffrent contra party risk (corporative and cooperativ one)
- Cost effectiv way to manage cooperative
- Increased number of possbile buyers (In blockcahine you don't need to know or trust buyer or to have already developed relation with them to be abel to effectivly do bussinis with them. This drasticly increas number of potential bussines partners will lovering legal and logistical cost of doing bussines)
- Cooperative guaranty found provide full assurance to cooperative members that in case they reject all offers during the session they will recive full price on the day they decide to sell 


## 3) Project assumption:
This project assume that:
- Agricultural cooperative have fully operational refrigereator (storage for small fruits) and warehous
- Person responsible for qulity check  
- Beam scale
- For purpose and simplicity of this project we will also assume that cooperative is dealing only with one type of small fruits lets say raspberries

## 4) Graphical represenation of user workflow (cooperant/small producer and buyer)

<p align="center">
<img src =".\pictures\Logic@2x.png" width="1000" height="600")
</p> 

## 4.1) Textual explanation of step by setp workflow from cooperant and buyer perspective
Step 1: Becoming cooperant by transfering certain amount of ETH to Cooperative found \
<br/>
Step 2: Transfering your fruits to coopertive refigerator <br/> 
2.1: Receiving equal amount of cooperative tokens to personal account (100 kg of fruits = 100 cooperative tokens) \
<br/>
Step 3: Buyer declare intention that he want to buy 100kg \
3.1: Oracle feed help us calcuclate price he need to pay for that ammount based on curent market prices \
<br/>
3.2: Offer sent to cooperant first in the stack. If cooperant accept price we move to step 3.4 else we move to 3.3 \
<br/>
3.3: Offers goes to next cooperant in stack and then we repeat step 3.2  
<br/>
3.4: Buyer pay directly to cooperant and on the way 3% of total trade goes to Cooperativ found \
<br/>
3.5: Cooperant send back cooperative tokens in equal value to amount of good he sold 


## 5) Connecting elements from smart contracts to each step in producer/buyer workflow

Step 1: Function for making deposit to cooperativ ETH account \
<br/>
Step 2: Function with parametar about number of kilograms we put in cooperative refrigerator. This function also should automaticly send back cooperative tokens to account of cooperat taking into acount parametar about amount of fruits he put in refigerator (ratio 1kg = 1 cooperativ token) \
<br/>
Step 3: Buyer make a bid for 100 kg to cooperant \ 
<br/>
3.1 price function calculate based on Oracle price feed and ammount buyer wants to buy \
<br/>
3.2/3 Offer is send to first cooperant in the refigerator stack (who bring fruits first he have rights to recive offer first FIFO). If cooperant accept bid we move to funciton number 3.4. If he reject we send bid to next cooperat in stack till very the end. If nobody accept price then buyer get a message that bid was to low and process is teminated \
<br/>
3.4: Buyer transfer ammount to cooperant and 3% from total ammount goes to cooperative found \
<br/>
3.5: In the same time cooperant who receive payment from buyer will automaticaly send back cooperativ tokens to cooeprativ token pool \      



## 6) Proposed tech stack for implementaiton of smart conatrct and front end
- Solidity
- Brownie
- HTML/CSS/JavaScript
- Ganache
- MetaMask


