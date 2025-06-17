# Bài 3.1 – Kiểu dữ liệu và biến Solidity

## ✅ Solution

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Profile {
    string public name;
    uint public age;

    function setProfile(string calldata _name, uint _age) public {
        name = _name;
        age = _age;
    }
}
```

## 🖼 Minh chứng triển khai trên Remix

![triển khai trên Remix](./screenshot/contract%20profile.png)

---

> Đã triển khai, gọi `setProfile("Alice", 21)`, sau đó kiểm tra `name()` và `age()` thành công.

