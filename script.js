var CacUngVien = {
    Anh : "candidate-1",
    Bac : "candidate-2",
    Canh: "candidate-3",
    Dung: "candidate-4"
};
var DanhSachUngVien = Object.keys(CacUngVien);
// ID To name
function IDtoName(ID){
  return DanhSachUngVien[ID-1];
}
window.onload = function(){
  // tao server
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var contractInstance;
  console.log(contractInstance);
  $.getJSON("contract.json", function(contract){
    var abi = contract.abi;
    console.log(abi);
    var abiJSON = JSON.parse(abi);
    console.log(abiJSON);
    var BauCuContract = web3.eth.contract(abiJSON);
    contractInstance = BauCuContract.at(contract.address);

    //console.log(contractInstance);
    window.BoPhieu = function(){
      var ID = $("#nhap-ung-vien").val();
      var name = IDtoName(parseInt(ID));
      alert(name);
      contractInstance.BoPhieu(name,
      {from: web3.eth.accounts[0]});
      let val = contractInstance.SoPhieu.call(name);
      alert(val);
      $("#"+CacUngVien[name]).html(val.toString());
      }

  // hiện số phiếu
  for (var i = 0; i < DanhSachUngVien.length; i++){
    var name = DanhSachUngVien[i];
    let val = contractInstance.SoPhieu.call(name);
    $("#" + CacUngVien[name]).html(val.toString());
  }
});

};
$(document).ready(function(event) {
// reset count
  for (var i = 0; i < DanhSachUngVien.length; i++) {
    // body...
    let name = DanhSachUngVien[i];
    $("#"+CacUngVien[name]).html(0);
  }
});
