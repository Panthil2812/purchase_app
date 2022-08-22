import { Shopify } from "@shopify/shopify-api";
import WEBHOOKS from "./webhooks.utils.js";

export const addWebhookHandlers = () => {
  WEBHOOKS.map(({ path, topic, webhookHandler }) => {
    // console.log("topic", topic);
    Shopify.Webhooks.Registry.addHandler(topic, {
      path,
      webhookHandler,
    });
  });
};

export const registerWebhooks = async (shop, accessToken) => {
  const registerAllResponse = await Shopify.Webhooks.Registry.registerAll({
    shop,
    accessToken,
  });

  Object.keys(registerAllResponse).forEach((key) => {
    if (!registerAllResponse[key].success) {
      console.log(
        `Failed to register ${key} webhook: ${JSON.stringify(
          registerAllResponse[key].result,
          null,
          2
        )}`
      );
    } else {
      console.log("webhook register success ", key);
    }
  });
};
