import easyDB from "easydb-io";
import { useState, useEffect, React } from "react";
import { setCookie, getCookie } from "../utils/storage";
const db = easyDB({
  database: "2472f89a-b73c-4dfc-847e-10a8f4a18ee6",
  token: "cde7f55a-ff77-472b-ae68-d57367355963",
});
let deviceID = null;
// Use a callback
// db.put("myKey", { some: "data" }, (err) => console.log(err));
// db.get("myKey", (err, value) => console.log(value, err));
// db.delete("myKey", (err) => console.log(err));
// db.list((err, value) => console.log(value, err))(
// Or, async/await

const startingBank = 500;

export function checkBank() {
  let bank = getCookie("bank");
  if (bank !== "" && bank !== null) {
    return bank;
  } else {
    bank = startingBank;
    deviceID = generateID();
    if (bank !== "" && bank != null) {
      setCookie("bank", bank, 365);
      setCookie("deviceID", deviceID, 365);
    }
  }
  return bank;
}
export function setBank(bank) {
  if (bank !== "" && bank != null) {
    setCookie("bank", bank, 365);
    let deviceID = getCookie("deviceID");
    if (deviceID == null) {
      deviceID = generateID();
      setCookie("deviceID", deviceID, 365);
    }
    updateHighscore(bank, deviceID);
  }
  return bank;
}

const generateID = () => {
  let uniqueId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  return uniqueId;
};

const updateHighscore = async (bankValue, deviceID) => {
  let value, values;
  value = await db.put(deviceID, { bank: bankValue });
  values = await db.list();
  return values;
  // console.log(values);
};
