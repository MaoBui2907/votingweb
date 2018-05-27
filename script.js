window.onload = function(){
  // tao server
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var contractInstance;

  $.getJSON("./contract.json", function(contract){
    contractInstance = web3.eth.contract(JSON.parse(contract.abi)).at(contract.address);

    window.BoPhieu = function(){
      ID = $("#nhap-ung-vien").val();
      name = IDtoName(parseInt(ID));
      contractInstance.BoPhieu(name,
      {from: web3.eth.accounts[0]},
      function(){
        var div_id = candidates[candidateName];
        $("#"+div_id).html(contractInstance.SoPhieu.call(candidateName).toString());
      }
    );
  };

  // hiện số phiếu
  for (var i = 0; i < candidateNames.length; i++){
    var name = candidateNames[i];
    var val = contractInstance.SoPhieu.call(name).toString();
    $("#" + candidates[name]).html(val);
  }
});
var candidates = {
  Anh : "candidate-1",
  Bac : "candidate-2",
  Canh: "candidate-3",
  Dung: "candidate-4"
};

var candidateNames = Object.keys(candidates);
// ID To name
function IDtoName(ID){
  return candidateNames[ID];
}

// reset count
$(document).ready(function(event) {
  for (var i = 0; i < candidateNames.length; i++) {
    // body...
    let name = candidateNames[i];
    $("#"+candidates[name]).html(0);
  }
});
};
