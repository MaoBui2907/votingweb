// Khai bao version
pragma solidity ^0.4.11;
// Tao contract voting
contract BauCu {
  // chuyen bytes32 sang uint8
  mapping (bytes32 => uint8) public PhieuBau;
  bytes32[] public DanhSach;
  // Constructor
  function BauCu(bytes32[] CacUngVien) {
    DanhSach = CacUngVien;
  }
  // Tra ve so phieu cho ung vien
  function SoPhieu(bytes32 UngVien) returns (uint8) {
    assert(KiemTraUngVien(UngVien) == true );
    return PhieuBau[UngVien];
  }
  // Tang so phieu khi duoc bau
  function BoPhieu(bytes32 UngVien){
    assert (KiemTraUngVien(UngVien) == true );
    PhieuBau[UngVien] += 1;
  }
  // Kiem tra ten ung vien co trong danh sach
  function KiemTraUngVien(bytes32 UngVien) returns (bool) {
    for (uint i = 0; i < DanhSach.length; i ++){
      if (DanhSach[i] == UngVien){
        return true;
      }
    }
    return false;
  }
}
