## Installing dependencies  -->
<hr>
<br>

## NPM
<hr>
Check if you already have NPM instaled 
   
    $npm -v

If no:

    $npm install

or

    curl -qL https://www.npmjs.com/install.sh | sh

## NVM
<hr>

Check first if you already have NVM installed:
    
    $nvm -v

To install or update nvm you should run the install script. To do that, you may either download and run the script manually or use the following cURL or Wget command:

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

## Node >=6.11.5
<hr>
Cech if you already have Node installed
    
    node -v

If no, use NVM to install Node. NVM allows us to quickly install and use different versions of node via the command line.

Example:

    $ nvm install 12
    Now using node v12.22.6 (npm v6.14.5)
    $ node -v
    v12.22.6

    $ nvm use 16
    Now using node v16.9.1 (npm v7.21.1)

    $ node -v
    v16.9.1 

## Ganche-cli
<hr>

Using npm:

    npm install -g ganache-cli

or, if you are using Yarn:

    yarn global add ganache-cli

Check for a version

    ganache-cli --version

## Python >= 3.6.0 
<hr>
Firs check if you have Pyhton already instaled on your machine:

    $python --version

If no, download and install for you machine adequat python version from https://www.python.org/ and follow the instruction. Ones you install check again from command line for python version


## Brownie
<hr>
Recommanded way to install Brownie is by using pipx

    $python3 -m pip install --user pipx
    $python3 -m pipx ensurepath

You may need to restart your terminal after installing pipx.

Install Brownie with pipx (recommended way)

    $pipx install eth-brownie

Once installation is completed type Brownie to verify that is working:

    $brownie

And you should get something like: 

    Brownie v1.16.3 - Python development framework for Ethereum

    Usage:  brownie <command> [<args>...] [options <args>]

    ...

Or simply:

    $pip install brownie


## OpenZeppelin
<hr>
Please from project root directory use following command:

    $brownie pm install OpenZeppelin/openzeppelin-contracts@4.0.0

<br>

## Chainlink
<hr>
Please from project root directory use following command:

    $brownie pm install smartcontractkit/chainlink-brownie-contracts@0.2.2

## https-localhost over HTTPS (recommended)
<hr>
For running https connection localy

MacOS

    $brew install nss

Linux

    $sudo apt install libnss3-tools
-or-

    $sudo yum install nss-tools

-or-

    $sudo pacman -S nss

Linux
Recommendet: Install and use standalone

    $npm i -g --only=prod https-localhost

From front-end directory inside project root directory run:

    $sudo su
    $ serve .

And then from browser:

    https://localhost

Or over HTTP connection
<hr>

    $python3 -m http.server

And then from browser:

    http://localhost:8000

### Address for accessing front-end for SmartCOOP -->
<hr>

https://ilijapet.github.io/coop_predpremijera/client/
<br>
MetaMask
<hr>
For dapp fron-end to work properly you should have MetaMask installed 
<br>
<br>
<br>
Step by step guide ofr dapp usage
<hr>