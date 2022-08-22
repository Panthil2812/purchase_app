import { Shopify } from "@shopify/shopify-api";
import ensureBilling, {
  ShopifyBillingError,
} from "../helpers/ensure-billing.js";

import returnTopLevelRedirection from "../helpers/return-top-level-redirection.js";

const TEST_GRAPHQL_QUERY = `
{
  shop {
    name
  }
}`;

// export default function verifyRequest(
//   app,
//   { billing = { required: false } } = { billing: { required: false } }
// ) {
//   return async (req, res, next) => {
//     const session = await Shopify.Utils.loadCurrentSession(
//       req,
//       res,
//       app.get("use-online-tokens")
//     );

//     let shop = req.query.shop;

//     if (session && shop && session.shop !== shop) {
//       // The current request is for a different shop. Redirect gracefully.
//       return res.redirect(`/api/auth?shop=${shop}`);
//     }

//     if (session?.isActive()) {
//       try {
//         if (billing.required) {
//           // The request to check billing status serves to validate that the access token is still valid.
//           const [hasPayment, confirmationUrl] = await ensureBilling(
//             session,
//             billing
//           );

//           if (!hasPayment) {
//             returnTopLevelRedirection(req, res, confirmationUrl);
//             return;
//           }
//         } else {
//           // Make a request to ensure the access token is still valid. Otherwise, re-authenticate the user.
//           const client = new Shopify.Clients.Graphql(
//             session.shop,
//             session.accessToken
//           );
//           await client.query({ data: TEST_GRAPHQL_QUERY });
//         }
//         return next();
//       } catch (e) {
//         if (
//           e instanceof Shopify.Errors.HttpResponseError &&
//           e.response.code === 401
//         ) {
//           // Re-authenticate if we get a 401 response
//         } else if (e instanceof ShopifyBillingError) {
//           console.error(e.message, e.errorData[0]);
//           res.status(500).end();
//           return;
//         } else {
//           throw e;
//         }
//       }
//     }

//     const bearerPresent = req.headers.authorization?.match(/Bearer (.*)/);
//     if (bearerPresent) {
//       if (!shop) {
//         if (session) {
//           shop = session.shop;
//         } else if (Shopify.Context.IS_EMBEDDED_APP) {
//           if (bearerPresent) {
//             const payload = Shopify.Utils.decodeSessionToken(bearerPresent[1]);
//             shop = payload.dest.replace("https://", "");
//           }
//         }
//       }
//     }

//     returnTopLevelRedirection(req, res, `/api/auth?shop=${shop}`);
//   };
// }
export default function verifyRequest(app, { returnHeader = true } = {}) {
  return async (req, res, next) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);

    console.log(session);
    let shop = req.query.shop;
    if (session && shop && session.shop !== shop) {
      // The current request is for a different shop. Redirect gracefully.
      console.log("first consdition");
      return res.redirect(`/auth?shop=${shop}`);
    }

    if (
      Shopify.Context.SCOPES.equals(session?.scope) &&
      session?.accessToken &&
      (!session?.expires || session?.expires >= new Date())
    ) {
      try {
        // make a request to make sure oauth has succeeded, retry otherwise
        const client = new Shopify.Clients.Graphql(
          session.shop,
          session.accessToken
        );
        await client.query({ data: TEST_GRAPHQL_QUERY });
        return next();
      } catch (e) {
        if (
          e instanceof Shopify.Errors.HttpResponseError &&
          e.response.code === 401
        ) {
          // We only want to catch 401s here, anything else should bubble up
        } else {
          throw e;
        }
      }
    }

    if (returnHeader) {
      if (!shop) {
        if (session) {
          shop = session.shop;
        } else if (Shopify.Context.IS_EMBEDDED_APP) {
          const authHeader = req.headers.authorization;
          const matches = authHeader?.match(/Bearer (.*)/);
          if (matches) {
            const payload = Shopify.Utils.decodeSessionToken(matches[1]);
            shop = payload.dest.replace("https://", "");
          }
        }
      }

      if (!shop || shop === "") {
        return res
          .status(400)
          .send(
            `Could not find a shop to authenticate with. Make sure you are making your XHR request with App Bridge's authenticatedFetch method.`
          );
      }

      res.status(403);
      res.header("X-Shopify-API-Request-Failure-Reauthorize", "1");
      res.header(
        "X-Shopify-API-Request-Failure-Reauthorize-Url",
        `/auth?shop=${shop}`
      );
      res.end();
    } else {
      res.redirect(`/auth?shop=${shop}`);
    }
  };
}

export const verifyWebhook = async (req, res, next) => {
  try {
    console.log("verifyWebhook call ");
    const hmac = req.get("X-Shopify-Hmac-Sha256");
    console.log(" hmac : ", hmac);

    const body = await getRawBody(req);
    // req.body = { ...JSON.parse(body) };
    // console.log("body : ", JSON.parse(body));
    const digest = crypto
      .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
      .update(body, "utf8", "hex")
      .digest("base64");
    console.log("digest: ", digest);
    if (digest !== hmac) {
      console.log("webhook verification failed");
      return res.status(401).send("hmac validation failed");
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("hmac validation failed");
  }
};
