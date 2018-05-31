window.onload = function(){
  // tao server
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var BoPhieuBau;

  // Lay du lieu contract
  $.getJSON("./contract.json", function(contract){
    var abi = contract.abi;
    var abiJSON = JSON.parse(abi);
    console.log(abiJSON);
    var BauCuContract = web3.eth.contract(abiJSON);
    BoPhieuBau = BauCuContract.at(contract.address);

    //console.log(BoPhieuBau);
    window.BoPhieu = function(){
      var ID = $("#nhap-ung-vien").val();
      var name = IDtoName(parseInt(ID));
      BoPhieuBau.BoPhieu(name,
      {from: web3.eth.accounts[0]},

      function(){
        let val = BoPhieuBau.SoPhieu.call(name);
        $("#"+CacUngVien[name]).html(val.toString());
        }
    );
};
  // hiện số phiếu
  for (var i = 0; i < DanhSachUngVien.length; i++){
    var name = DanhSachUngVien[i];
    let val = BoPhieuBau.SoPhieu.call(name);
    $("#" + CacUngVien[name]).html(val.toString());
  }
});

  // truyen vao danh sach ung vien
  var CacUngVien = {
      Anh : "candidate-1",
      Bac : "candidate-2",
      Canh: "candidate-3",
      Dung: "candidate-4"
  };

  // Lay cac key tao danh sach ten cac ung vien
  var DanhSachUngVien = Object.keys(CacUngVien);

  // ID To name
  function IDtoName(ID){
    return DanhSachUngVien[ID-1];
  }
  $(document).ready(function(event) {

  // reset count
    for (var i = 0; i < DanhSachUngVien.length; i++) {
      // body...
      let name = DanhSachUngVien[i];
      $("#"+CacUngVien[name]).html(0);
    }
  });
};
