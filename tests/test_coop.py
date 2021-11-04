#!/usr/bin/python3

import brownie
import pytest


def test_initial_supplay_account_alice(coopToken_deploy_alice, alice):
    assert coopToken_deploy_alice.balanceOf(alice) == 10000_000_000_000_000_000_000

@pytest.mark.parametrize('i', range(9))
def test_account_balance(coop_deploy_alice, accounts, i):
    balance = coop_deploy_alice.getUserAccountBalance(accounts[i])
    assert balance[0] == 0 and balance[1] == 0

def test_become_member(coop_deploy_alice, coop_instatiation, web3, bob):       
    tx = coop_instatiation.functions.becomeCoopMember().transact({'from':str(bob), 'value': '7'})
    tx_receipt = web3.eth.get_transaction_receipt(tx)
    assert coop_deploy_alice.address in str(list(tx_receipt.items())[5]) 

def test_withdraw_sucess(coop_deploy_alice, coop_instatiation, bob):        
    coop_instatiation.functions.becomeCoopMember().transact({'from':str(bob), 'value': '7'})
    tx = coop_deploy_alice.withdraw(5)
    assert tx.return_value == True

def test_deposit_fuits_for_member(coop_instatiation, bob, web3):    
    coop_contract = coop_instatiation
    coop_contract.functions.becomeCoopMember().transact({'from':str(bob), 'value': '7'})
    tx = coop_contract.functions.depositFruitsToCOOP(45).transact({'from': str(bob)})
    tx_receipt = web3.eth.get_transaction_receipt(tx)
    assert tx_receipt.status == 1 

