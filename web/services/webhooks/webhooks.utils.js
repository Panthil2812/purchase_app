import { WEBHOOK_TOPICS, WEBHOOK_PATH } from "../../constants/index.js";
import { appUninstallWebhookHandler } from "./handlers/shop.webhook.js";

const WEBHOOKS = [
  {
    path: WEBHOOK_PATH,
    topic: WEBHOOK_TOPICS.APP_UNINSTALLED,
    webhookHandler: appUninstallWebhookHandler,
  },
  {
    path: WEBHOOK_PATH,
    topic: WEBHOOK_TOPICS.SHOP_UPDATE,
    webhookHandler: (topic, shop, body) => {
      console.log("00000000000000000000000000000000000000");
    },
  },
];

export default WEBHOOKS;
