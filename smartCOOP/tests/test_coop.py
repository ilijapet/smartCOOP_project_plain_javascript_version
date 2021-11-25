#!/usr/bin/python3

import pytest
import brownie

from scripts.helpful_scripts import get_account


# With this test we are cheking if COOPTOken ERC20 smart contract is deploying well and if we can sucesfully call mint function after contract has been
# deployed and if we can asigne all intial supplay of COOP tokens to SmartCOOP account
def test_initial_supplay_account_alice(smartContract_deploy_with_mint):
    coop_token, coop = smartContract_deploy_with_mint
    assert coop_token.balanceOf(coop.address) == 10000_000_000_000_000_000_000


# With this parametrized test we are cheking if two accounts involved are empty by all producer profile dimensions from getUserAcountBalance.
@pytest.mark.parametrize("i", range(0, 1))
def test_account_balance(
    smartContract_deploy_with_mint,
    i,
):
    account = get_account()
    balance = smartContract_deploy_with_mint[1].getUserAccountBalance(account[i])
    assert balance[0] == 0 and balance[1] == 0 and balance[2] == 0


# With this test we are cheking if account under index zero can become Coop member and if fee payed goes to SmartCOOP account
def test_become_member(smartContract_deploy_with_mint, web3):
    account = get_account()
    tx = smartContract_deploy_with_mint[1].becomeCoopMember(
        {"from": account[0], "value": 1000}
    )
    assert tx.status == 1


# With this test we are checking if Bob can make deposit to Coop warhouse after he first become Coop member
def test_deposit_fruits_for_member(smartContract_deploy_with_mint, web3):
    account = get_account()
    coop_return = smartContract_deploy_with_mint
    coop_return[1].becomeCoopMember({"from": account[0], "value": 1000})
    tx = coop_return[1].depositFruitsToCOOP(45, {"from": account[0]})
    assert tx.status == 1


# With this test we are cheking if our bid funcitn work properly. IN first step account[0] is becoming Coop member. Step two is to deposit some fruits.
# And then in step free account[1] come into play as bider and try to buy 10kg of that fruits.
def test_bid(smartContract_deploy_with_mint):
    account = get_account()
    coop_return = smartContract_deploy_with_mint
    coop_return[1].becomeCoopMember({"from": account[0], "value": 1000})
    coop_return[1].depositFruitsToCOOP(45, {"from": account[0]})
    tx = coop_return[1].bid(10, {"from": account[1], "value": 2500051902404600})
    balance = coop_return[1].getBidderAccountBalance(account[1])
    assert tx.status == 1 and balance[0] == 90 and balance[1] == 10


# Testing widrowing function for owner of the contract (the one who deploy both contracts)
def test_withdraw_sucess(smartContract_deploy_with_mint):
    account = get_account()
    tx = smartContract_deploy_with_mint[1].withdraw({"from": account[0]})
    assert tx.return_value == True


# Testing pause functionality. It shoudl revret last function call
def test_pause(smartContract_deploy_with_mint):
    account = get_account()
    coop_return = smartContract_deploy_with_mint
    coop_return[1].pause({"from": account[0]})
    with brownie.reverts():
        coop_return[1].becomeCoopMember({"from": account[1], "value": 1000})


# Testing pause functionality
def test_unpause(smartContract_deploy_with_mint):
    account = get_account()
    coop_return = smartContract_deploy_with_mint
    coop_return[1].pause({"from": account[0]})
    coop_return[1].unpause({"from": account[0]})
    tx = coop_return[1].becomeCoopMember({"from": account[1], "value": 1000})
    assert tx.status == 1


# Testing get_latest_price.
def test_get_latest_price(smartContract_deploy_with_mint):
    account = get_account()
    coop_return = smartContract_deploy_with_mint
    price = coop_return[1].getLatestPrice()
    assert price != 0
