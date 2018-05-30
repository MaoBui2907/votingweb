var solc = require('solc');
var Web3 = require('web3');
var fs = require('fs');

// tao server
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log("\n\tinit server completed\n");
console.log("\n\tDanh sach acount:\n");
console.log(web3.eth.accounts);

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
var BauCuContract = web3.eth.contract(abiJSON);

var contractInstance;

var deployedContract = BauCuContract.new(
  ["Anh", "Bac","Canh", "Dung"],
  {
    data: byteCode,
    from: web3.eth.accounts[0],
    gas: 4700000
  },
  function(er, contract){
    if(!er){
      if(!contract.address){
        console.log(contract.transactionHash + " dang doi xu ly");
      } else {
        console.log("contract da duoc xu ly. Adress: "+ contract.address);
      }

      // test
      // console.log(contract);
      // contractInstance = BauCuContract.at(contract.address);
      // console.log(
      //           "\n------------ LOGGING Executing contract calls -------------\n"
      //         );
      // console.log("So phieu cua Anh: ");
      // // Kiem tra so phieu hien tai cua Anh
      // //console.log(web3.eth.accounts[0].balance);
      // console.log(contractInstance.SoPhieu.call("Anh").valueOf());
      //
      // // Bau cho Anh
      // console.log(
      //   contractInstance.BoPhieu("Anh",
      //   {from: web3.eth.accounts[0]}
      //   )
      // );
      //
      // // Kiem tra so phieu sau khi bau
      // console.log("So phieu cua Anh: ");
      // console.log(contractInstance.SoPhieu.call("Anh").valueOf());
      //
      // // end instance
      //
      // promise writeFile
        fs.writeFile("./contract.json",
        JSON.stringify(
          {
            address: contract.address,
            abi : JSON.stringify(abiJSON, null, 2)
          },
          null,
          2),
          "utf-8",
          function(err){
            if (err) {
              console.log(err);
            }else {
              console.log("file contract.json saved");
            }
          }
        );
      } else {
      console.log(er);
      }
    }
);
