
<p align="center">
<img src =".\pictures\red-2650342_1920.jpg" width="300")
</p> 


## <p align="center"> Smart Contract based agricultural cooperative </p>


With this project we would like to asses possibilities coming out from blockchain world to address some of the most pressing challenges small agricultural producers confront. In this project we will offer simplified version of market reality which is much more complex and nuanced then presented here. But still we believe this exercise and model presented here have all necessary elements which can allow us to demonstrate some of potentials blockchain technology have for field of agriculture.


## 1) Problem statement

Small producers don't have enough capacity to be effectively present on market as individual producers. That is why they have two option on their disposal:

First: organize themselves in traditional cooperatives, improve negation position through this self-organization and then enter negotiation  process with big corporate buyers or act as independent market actor with own products. Second: sell as individual producer to big corporations under condition often not so favorable to them. 

Both solutions have some drawbacks associated with them. Big corporation tend to offer price which is basically less then average session price for small fruits and they pay producers on the end of session. What means that small producers with their goods credit big corporations and for doing that they get lowest market price for their row fruit. Then there is also counterparty risk involved. Corporations can delay or entirely avoid their obligation to pay small producers. Having in mind fact that often corporations have in-house legal departments and their financial capacity and then on other side lack of specific legal knowledge and financial means of small producer to fight legal case against big corporations, their position is not so good also in this regard. 

On the other hand if they organize themselves in form of more traditional cooperatives there is counterparty risk of mismanagement of cooperative funds or collected goods, high managing cost for running traditional cooperative and low overall management efficiency often associated with this type of organizational structure.  

## 2) Some of potential benefits of introducing blockchain technology (answers to some challenges and problems)

- Get real time market price on the day of selling and not lowest average session price
- Cut different contra party risk (corporative and cooperative one)
- Cost effective way to manage cooperative
- Increased number of possible buyers. In blockchain world you don't need to know or trust buyer or to have already developed relation with them to be able to effectively do business with them. This drastically increase number of potential business partners and connections will lowering legal and logistical cost of doing business.
- Cooperative guaranty found provide full assurance to cooperative members that in case they reject all offers during the session they will receive full price on the day they decide to sell 


## 3) Project assumption:
The project assume that:
- Agricultural cooperative have fully operational refrigerator storage for small fruits and warehouse
- Person responsible for quality check  
- Beam scale
- For purpose and simplicity of project we will also assume that cooperative is dealing only with one type of small fruits lets say raspberries

## 4) Graphical representation of user workflow (cooperant/small producer and buyer)

<p align="center">
<img src =".\pictures\Logic@2x.png" width="1000" height="600")
</p> 

## 4.1) Textual explanation of step by step workflow from cooperant and buyer perspective
Step 1: Becoming cooperant by transferring certain amount of ETH to Cooperative found \
<br/>
Step 2: Transferring your fruits to cooperative refrigerator <br/> 
2.1: Receiving equal amount of cooperative tokens to personal account (100 kg of fruits = 100 cooperative tokens) \
<br/>
Step 3: Buyer declare intention that he want to buy 100kg \
3.1: Oracle feed help us calculate price he need to pay for that amount of fruits based on current market prices \
<br/>
3.2: Offer is sent to cooperant first in the stack. If cooperant accept price we move to step 3.4 else we move to 3.3 \
<br/>
3.3: Offers goes to next cooperant in stack and then we repeat step 3.2  
<br/>
3.4: Buyer pay over cooperative smart contract and in this way 3% of total trade goes to Cooperative found and rest of 97% to producer \
<br/>
3.5: Producer send back cooperative tokens in equal value to amount of good he sold 


## 5) Connecting elements from smart contracts to each step in producer/buyer workflow

Step 1: Function for making deposit to cooperative ETH account (becoming member) \
<br/>
Step 2: Function with parameter about number of kilograms we put in cooperative refrigerator. This function also should automatically send back cooperative tokens to account of cooperate taking into account parameter about amount of fruits he put in refrigerator (ratio 1kg = 1 cooperative token) \
<br/>
Step 3: Buyer make a bid for 100 kg to cooperant  
<br/>
3.1 price function calculate based on Oracle price feed and amount buyer wants to buy \
<br/>
3.2/3 Offer is send to first cooperant in the refrigerator stack (who bring fruits first he have rights to receive offer first FIFO). If cooperant accept bid we move to function number 3.4. If he reject we send bid to next cooperate in stack till very end. If nobody accept price buyer get a message that bid was to low and process is terminated \
<br/>
3.4: Buyer transfer amount to cooperative smart contarct from where 3% of total amount goes to cooperative found and rest 97% to producer\
<br/>
3.5: In the same time cooperant who receive payment from buyer will automatically send back cooperative tokens to cooperative token pool 


## 6) Proposed tech stack for smart contract implementation and front end
- Solidity
- Brownie
- Ganache
- MetaMask
- HTML/CSS/JavaScript


