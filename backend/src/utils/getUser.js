const jwt = require("jsonwebtoken");

function getUser(guestID, jwtToken, create = true) {
  let cartFilter;

  if (jwtToken) {
    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
      if (decoded) {
        cartFilter = { user: decoded.id };
      }
    } catch (e) {
      //pass
    }
  } else if (guestID) {
    cartFilter = { guestID };
  } else if (create) {
    const newGuestID = "guest_" + Date.now();
    cartFilter = { guestID: newGuestID };
  }
  return cartFilter;
}

module.exports = getUser;
