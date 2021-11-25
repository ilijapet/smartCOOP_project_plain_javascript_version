#!usr/bin/python3
import time
from brownie import SmartCOOP, COOPToken

from scripts.helpful_scripts import get_account, get_contract

initial_supplay = 10000_000_000_000_000_000_000

# add after deploy "publish_source=True" if you would like to publish re-deployed contracts on Etherscan


def deploy_smartCOOP():
    account = get_account()
    eth_usd_price_feed = get_contract("eth_usd_price_feed").address
    coopTokenDeployed = COOPToken.deploy({"from": account[0]})
    coop = SmartCOOP.deploy(coopTokenDeployed, eth_usd_price_feed, {"from": account[0]})
    coopTokenDeployed.mint(coop.address, initial_supplay, {"from": str(account[0])})
    time.sleep(1)


def main():
    deploy_smartCOOP()
