
#!usr/bin/python3

from brownie import Coop, COOPToken, accounts, config 

initial_supplay = 10000_000_000_000_000_000_000


def deploy_coop ():
    account = accounts.add(config["wallets"]["from_key"])
    # account = accounts[0]
    coopTokenDeployed = COOPToken.deploy(initial_supplay, {"from": account})
    Coop.deploy(coopTokenDeployed, {"from": account})
    
    

def main():
    deploy_coop()