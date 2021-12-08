import easyDB from "easydb-io";

const db = easyDB({
  database: "2648cddb-5633-4d8c-ad71-2bb8e13a66be",
  token: "60581ef8-ff21-4b2f-9fe1-cd14d9936f41",
});
let deviceID = null;
// Use a callback
// db.put("myKey", { some: "data" }, (err) => console.log(err));
// db.get("myKey", (err, value) => console.log(value, err));
// db.delete("myKey", (err) => console.log(err));
// db.list((err, value) => console.log(value, err))(
// Or, async/await

const startingBank = 500;

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export function checkBank() {
  let bank = getCookie("bank");
  if (bank !== "") {
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
  //   value = await db.get("myKey");
  //   value = await db.delete("myKey");
  values = await db.list();
  console.log(values);
};
