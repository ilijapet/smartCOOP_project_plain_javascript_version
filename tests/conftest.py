#!/usr/bin/python3

import pytest

from scripts.helpful_scripts import get_contract, get_account

initial_supplay = 10000_000_000_000_000_000_000

"""
Defining a Shared Initial State for this test. A common pattern in testing is to include one or more module-scoped setup fixtures that define the 
initial test conditions, and then use fn_isolation (next setp) to revert to this base state at the start of each test. 
"""


@pytest.fixture(scope="module", autouse=True)
def smartContract_deploy_with_mint(COOPToken, SmartCOOP):
    account = get_account()
    eth_usd_price_feed = get_contract("eth_usd_price_feed").address
    coop_token = COOPToken.deploy({"from": account[0]})
    coop = SmartCOOP.deploy(coop_token, eth_usd_price_feed, {"from": account[0]})
    coop_token.mint(coop.address, initial_supplay, {"from": str(account[0])})
    return coop_token, coop


"""
In many cases we want to isolate our tests from one another by resetting the local environment. Without isolation, it is possible that the outcome of 
a test will be dependent on actions performed in a previous test. This is done by following function. 
"""


@pytest.fixture(scope="function", autouse=True)
def isolate(fn_isolation):
    # perform a chain rewind after completing each test, to ensure proper isolation
    # https://eth-brownie.readthedocs.io/en/v1.10.3/tests-pytest-intro.html #isolation-fixtures
    pass


@pytest.fixture(scope="module")
def test_accounts():
    return get_account()
