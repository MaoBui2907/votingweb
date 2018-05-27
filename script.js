window.onload = function(){
  // tao server
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var contractInstance;

  $.getJSON("./contract.json", function(contract){
    contractInstance = web3.eth.contract(JSON.parse(contract.abi)).at(contract.address);

    window.voteForCandidate = function(){
      candidateName = $("#candidate").val();
      contractInstance.BoPhieu(candidateName,
      {from: web3.eth.accounts[0]},
      function(){
        var div_id = candidates[candidateName];
        $("#"+div_id).html(contractInstance.SoPhieu.call(candidateName).toString());
      }
    );
  };
  for (var i = 0; i < candidateNames.length; i++){
    var name = candidateNames[i];
    var val = contractInstance.SoPhieu.call(name).toString();
    $("#" + candidates[name]).html(val);
  }
});
var candidates = {
  Anh : "candidate-1",
  Binh : "candidate-2",
  Chau: "candidate-3",
  Duong: "candidate-4"
};

var candidateNames = Object.keys(candidates);

$(document).ready(function(event) {
  for (var i = 0; i < candidateNames.length; i++) {
    // body...
    let name = candidateNames[i];
    $("#"+candidates[name]).html(0);
  }
});
};
