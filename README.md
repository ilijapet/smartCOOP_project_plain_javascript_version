
<p align="center">
<img src =".\pictures\red-2650342_1920.jpg" width="300")
</p> 


## <p align="center"> Smart Contract based agricultural cooperative </p>


With this project we would like to assess possibilities coming out from blockchain world to address some of the most pressing challenges small agricultural producers confront. The project will offer simplified version of market reality which is much more complex and nuanced then presented here. But still we believe this exercise and presented model have all necessary elements which can allow us to demonstrate some of potentials blockchain technology has to offer to the world of agriculture.


## 1) Problem statement

Small agricultural producers don't have enough capacity to be effectively present on market as individual producer. That is why they have two options on their disposal:

First: to organize themselves in traditional cooperatives in order to improve their negotiation position with bigger corporate buyers. Through this self-organization they can strenghten their and their product position at the market. Second: sell as individual producers to big corporations under conditions often not so favorable to them. 

Both solutions have some drawbacks. Big corporation tend to offer price to indidvual producers which is basically less then average season price for small fruits and they pay them on the end of season. This means that small producers with their products credit big corporations and for doing that they get the lowest market price for their row fruits. Additionally, there is a counterparty risk involved. Corporations can delay or entirely avoid their obligation to pay small producers which sometimes leads towards legal suits. However, big cooperations are also in much better position to fight legal battles than small, individual producers whose postition is weakend by their lack of legal knowledge and financial means. 
 
On the other hand if they organize themselves in form of more traditional cooperatives there is counterparty risk of mismanagement of cooperative funds or collected goods, high managing cost for running traditional cooperative and low overall management efficiency often associated with this type of organizational structure.  

## 2) Some of potential benefits of introducing blockchain technology (answering to some challenges and problems)

- Get real time market price on the day of selling and not lowest average season price
- Cut different contraparty risks (corporative and cooperative one)
- Cost effective way to manage cooperative
- Increased number of possible buyers. In the blockchain world you don't need to know or trust buyers or to have already developed relations with them to be able to effectively do business with them. This drastically increases the number of potential business partners and lowers legal and logistical cost of doing business.



## 3) Project assumption:
The project assumes that Agricultural Cooperative has:
- Fully operational refrigerator storage for small fruits and warehouse
- Person responsible for quality check  
- Beam scale
- For purpose and simplicity of the project we will also assume that cooperative is dealing only with one type of small fruits lets say raspberries

## 4) Graphical representation of user workflow (cooperant/small producer and buyer)

<p align="center">
<img src =".\pictures\Logic@2x.png" width="1000" height="600")
</p> 

## 4.1) Textual explanation of step by step workflow from cooperant and buyer perspective

Beafore producer/buyer start to use dapp he/she will log to fron-end via MetaMask \
<br/>
Step 1: Becoming cooperant by transferring certain amount of ETH to Cooperative found \
<br/>
Step 2: Transferring fruits to cooperative refrigerator <br/> 
2.1: Receiving equal amount of cooperative tokens to personal account (100 kg of fruits = 100 cooperative tokens) \
<br/>
Step 3: Buyer declare intention that he want to buy 100kg \
3.1: Oracle feed help us calculate price he need to pay for that amount of fruits based on current market prices \
<br/>
3.2: Offer is sent to cooperant first in the refrigerator stack. If cooperant accept price we move to step 3.4 else we move to 3.3 \
<br/>
3.3: Offers goes to next cooperant in stack and then we repeat step 3.2  
<br/>
3.4: Buyer pay over cooperative smart contract and in this way 3% of total trade goes to Cooperative found and rest of 97% to producer \
<br/>
3.5: Producer send back cooperative tokens in equal amount to amount of good he sold in that trade 


## 5) Connecting elements from smart contracts to each step in producer/buyer workflow

Step 1: Function for making deposit to cooperative ETH account (becoming member) \
<br/>
Step 2: Function with parameter about number of kilograms producer put in cooperative refrigerator. This function also should automatically send back cooperative tokens from cooperativ token pool to account of small producer taking into account parameter about amount of fruits he put in refrigerator (ratio 1kg = 1 cooperative token) \
<br/>
Step 3: Buyer function where he can declara his intetion to buy and parameter for defining amount of fruits he would like to buy   
<br/>
3.1 Price function calculate total to pay based on Oracle price feed and amount buyer wants to buy \
<br/>
3.2/3 Offer is send to first producer from the refrigerator stack (who bring fruits first he have rights to receive offer first - First in First Out). If producer accept bid we move to step number 3.4. If he reject we send bid to next cooperate in stack till very end of stack. If nobody accept price smart contract will retunr to buyer message that price was to low and process will be terminated \
<br/>
3.4: If bid was sucesful buyer transfer total amount to cooperative smart contract from where 3% goes to cooperative found and rest 97% to producer\
<br/>
3.5: In the same time producer who receive payment from buyer automatically send back cooperative tokens to cooperative token pool 


## 6) Proposed tech stack for smart contract implementation and front-end
- Solidity
- Brownie
- web3.py (if needed)
- Ganache
- Create eth app (HTML/CSS/JavaScript/React)
- MetaMask

Notice: This is just draft version of proposal. During project implementation we will most probably scale down project in scope. Here is presented most ambitious version of proposal. 

