import { Shopify } from "@shopify/shopify-api";

export const AppInstallations = {
  includes: async function (shopDomain) {
    const arr = [];
    const shopSessions =
      await Shopify.Context.SESSION_STORAGE.findSessionsByShop(shopDomain);
    if (shopSessions) {
      arr.push(shopSessions);
    }
    console.log("shopSessions array", arr.length);

    if (arr.length > 0) {
      for (const session of arr) {
        if (session.accessToken) return true;
      }
    }

    return false;
  },

  delete: async function (shopDomain) {
    console.log("delete sesion ", shopDomain);
    const arr = [];
    const shopSessions =
      await Shopify.Context.SESSION_STORAGE.findSessionsByShop(shopDomain);
    if (shopSessions) {
      arr.push(shopSessions);
    }
    console.log("delete session array ;", arr, arr.length);

    if (arr.length > 0) {
      const id_arr = shopSessions.map((session) => session.id);
      consolelog("delete session ID : ", id_arr);
      if (id_arr[0]) {
        await Shopify.Context.SESSION_STORAGE.deleteSessions(id_arr[0]);
      }
    }
  },
};
