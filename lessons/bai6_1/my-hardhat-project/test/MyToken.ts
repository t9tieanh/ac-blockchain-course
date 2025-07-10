import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyToken Contract", function () {
  let MyToken: any;
  let token: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  const INITIAL_SUPPLY = ethers.parseUnits("1000000", 18); // 1,000,000 MTK

  beforeEach(async function () {
    // Get accounts
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy();
    await token.waitForDeployment();
  });

  it("Should have correct name and symbol", async function () {
    expect(await token.name()).to.equal("My Token");
    expect(await token.symbol()).to.equal("MTK");
  });

  it("Should assign initial supply to the owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(INITIAL_SUPPLY);
  });

  it("Should transfer tokens between accounts", async function () {
    // Transfer 100 tokens from owner to addr1
    await token.transfer(addr1.address, ethers.parseUnits("100", 18));
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.parseUnits("100", 18));

    // Transfer 50 tokens from addr1 to addr2
    await token.connect(addr1).transfer(addr2.address, ethers.parseUnits("50", 18));
    const addr2Balance = await token.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(ethers.parseUnits("50", 18));
  });

  it("Should fail when sender doesn't have enough tokens", async function () {
    const initialOwnerBalance = await token.balanceOf(owner.address);

    // Thực hiện transfer lỗi (vượt quá balance)
    await expect(
        token.connect(addr1).transfer(owner.address, ethers.parseUnits("1", 18))
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");

    // Owner balance không đổi
    expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
});
