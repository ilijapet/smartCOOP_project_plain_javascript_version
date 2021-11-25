
Avoiding common attacks:

1) Against overflow and underflow we use Solidity 0.8.0 because from that version safeMath is integral part.

2) In our smart contarct we use pausable a common emergency response mechanism that can pause functionality while developrs try to figure out solution for a problem. 

3) We use modifier owner to restrict access to widthdrow function. For this we use OpenZeppelin Ownable implementation. 

4) We use specific compiler pragma 0.8.0 in both of our contracts as a way to avoid possbile bug associated to older solidity versions.