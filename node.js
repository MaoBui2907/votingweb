var solc = require('solc');
var Web3 = require('web3');
var fs = require('fs');
var util = require('util');

// var fspromise = fs.promises;
var express = require('express');
//var fs_writeFile = util.promisify(fs.writeFile);
var app = express();
app.locals.data_ungvien = require('./data.json');

// tao server
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log("\n\tinit server completed\n");

// compile solidity:
var source = fs.readFileSync("voting.sol").toString();
var compiled = solc.compile(source);
console.log("\n\tcompiled\n");
console.log(compiled);
console.log("\n\tend compiled file\n");

// lay bycode tu file solidity
var byteCode = compiled.contracts[":BauCu"].bytecode;
console.log("\n\tbytecode loaded\n");
console.log(byteCode);
console.log("\n\tend bytecode\n");

// lay abi tu file solidity
var abi = compiled.contracts[":BauCu"].interface;
console.log("\n\tABI\n");
console.log(abi);
var abiJSON = JSON.parse(abi);

// Dua len may ao eth
// tao object
var VotingContract = new web3.eth.Contract(abiJSON);

var contractInstance;

var deployedContract = VotingContract.deploy(
  ["Anh", "Binh","Chau", "Duong"],
  {
    data: byteCode,
    from: web3.eth.accounts[0],
    gas: 4700000
  },
  function(error, contract){
    if(!error){
      if(!contract.address){
        console.log("Contract transactionHash send " + contract.transactionHash + "waiting for miner")
      } else {
        console.log(contract.address + "mined");
      }

      // // instance
      //
      // console.log(contract);
      // contractInstance = VotingContract.at(contract.address);
      // console.log(
      //           "\n------------ LOGGING Executing contract calls -------------\n"
      //         );
      // console.log("Votes for Anh before: ");
      // //totalVotesFor() is a function in our contract
      // console.log(contractInstance.SoPhieu.call("Anh").valueOf());
      //
      // //execute a transaction. The transaction id (output) is the proof that this transaction occurred and you can refer back to this at any time in the future. This transaction is immutable.
      // console.log(
      //   contractInstance.voteForCandidate("Anh", {
      //     from: web3.eth.accounts[0]
      //   })
      // );
      //
      // //votes for Anh should go up by 1
      // console.log("Votes for Anh after: ");
      // console.log(contractInstance.SoPhieu.call("Anh").valueOf());
      //
      // // end instance

      // promise writeFile
          fs.writeFileSync("./contract.json",
          JSON.stringify(
            {
              address: contract.address,
              abi : JSON.stringify(abiJSON, null, 2)
            },
            null,
            2),
            "utf-8",
            function(error){
              if (error) {
                console.log(error);
              }else {
                console.log("file contract.json saved");
              }
            }
          );
      } else {
      console.log(error);
      }
    }
);
