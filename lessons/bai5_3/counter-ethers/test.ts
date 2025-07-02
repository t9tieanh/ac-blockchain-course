import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  // 2. Địa chỉ contract và ABI
  const contractAddress = "0xcf960816734ec0d472e2dff77e89569559998b08";
  const abi = [
    "function getCount() public view returns (uint)",
    "function increment() public"
  ];

  // 3. Khởi tạo contract instance
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // 4. Gọi hàm getCount
  const count = await contract.getCount();
  console.log("Current count:", count.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
