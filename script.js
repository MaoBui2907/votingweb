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
        $("#"+candidates[name]).html(contractInstance.SoPhieu.call(name).toString());
        alert(web3.eth.accounts[0]);
        alert(contractInstance.SoPhieu.call(name).toString());
      }
    );
  };

  // hiện số phiếu
  for (var i = 0; i < candidateNames.length; i++){
    let name = candidateNames[i];
    $("#" + candidates[name]).html(contractInstance.SoPhieu.call(name).toString());
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
  return candidateNames[ID-1];
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

// Thong tin
$("tr a").click(function(event) {
  /* Act on the event */
  var id = $(this).attr('id');
  thongtin(id);
});

var dataDanhSach = JSON.parse("data.json");

// Thong tin
function thongtin(id){
  var HoTen = dataDanhSach.DanhSach[id-1].name;
  var MSSV = dataDanhSach.DanhSach[id-1].mssv;
  var NgaySinh = dataDanhSach.DanhSach[id-1].dbirth;
  var QueQuan = dataDanhSach.DanhSach[id-1].htown;
  var SDT = dataDanhSach.DanhSach[id-1].sdt;
  var ThongTin = dataDanhSach.DanhSach[id-1].detail;
  alert(Hoten + "\n" + MSSV + "\n");

}
