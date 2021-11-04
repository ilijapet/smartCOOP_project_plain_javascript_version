#!/usr/bin/python3

import brownie
import pytest
from web3 import Web3

initial_supplay = 10000_000_000_000_000_000_000

@pytest.fixture(scope="function", autouse=True)
def isolate(fn_isolation):
    # perform a chain rewind after completing each test, to ensure proper isolation
    # https://eth-brownie.readthedocs.io/en/v1.10.3/tests-pytest-intro.html#isolation-fixtures
    pass

@pytest.fixture(scope="module")
def alice(accounts):
    return accounts[0]

@pytest.fixture(scope="module")
def bob(accounts):
    return accounts[1]    
    

@pytest.fixture(scope="module")
def web3():
    w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))
    return w3

@pytest.fixture(scope="module")
def coopToken_deploy_alice(COOPToken, alice):
    return COOPToken.deploy(initial_supplay, {"from": alice})

@pytest.fixture(scope="module")
def coop_deploy_alice(Coop, coopToken_deploy_alice, alice):
    coop_sm = Coop.deploy(coopToken_deploy_alice, {"from": alice})
    return coop_sm

@pytest.fixture(scope="module")
def coop_instatiation (coop_deploy_alice, web3):     
    contract_sc = web3.eth.contract(address=coop_deploy_alice.address, abi=coop_deploy_alice.abi)    
    return contract_sc
    
@pytest.fixture(scope="module")
def become_coop_member_alice(coop_deploy_alice, web3, alice): 
    tx = coop_deploy_alice    
    contract_sc = web3.eth.contract(address=tx.address, abi=tx.abi)    
    contract_sc.functions.becomeCoopMember().transact({'from':str(alice), 'value': '1000'})     
    return tx
