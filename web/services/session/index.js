import {
  createOrUpdateSession,
  getSession,
  removeSession,
  findSessionsByShop,
} from "../db/session/session.services.js";

class CustomSessionStorage {
  storeCallback = async (session) => {
    try {
      console.log("storeCallback");
      if (await createOrUpdateSession(session)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  deleteSessionsCallback = async (id) => {
    try {
      console.log("deleteSessionsCallback", id, !!(await removeSession(id)));
      return true;
    } catch (err) {
      throw new Error(err);
    }
  };
  findSessionsByShopCallback = async (shop) => {
    try {
      console.log("findSessionsByShopCallback");
      // console.log("calling .............", await findSessionsByShop(shop));
      return await findSessionsByShop(shop);
    } catch (err) {
      throw new Error(err);
    }
  };
  loadCallback = async (id) => {
    try {
      console.log("loadCallback");
      const data = await getSession(id);

      if (data) {
        return JSON.parse(data.sessionData);
      } else {
        return undefined;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  deleteCallback = async (id) => {
    try {
      console.log("deleteCallback");
      if (await removeSession(id)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
}

export default CustomSessionStorage;
