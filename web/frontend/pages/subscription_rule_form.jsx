import {
  AppProvider,
  Page,
  Card,
  hsbToHex,
  Select,
  FormLayout,
  TextField,
  InlineError,
  Popover,
  Button,
  rgbToHsb,
  ColorPicker,
} from "@shopify/polaris";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
const SubscriptionRuleForm = () => {
  const CustomLinkComponent = ({ children, url, ...rest }) => {
    return (
      <Link to={url} {...rest}>
        {children}
      </Link>
    );
  };
  const [loadingFlag, setloadingFlag] = useState(false);
  return (
    <>
      <AppProvider
        linkComponent={CustomLinkComponent}
        i18n={{
          Polaris: {
            Page: {
              Header: {
                rollupButton: "Actions",
              },
            },
          },
        }}
      >
        <Page
          breadcrumbs={[{ content: "Products", url: "/" }]}
          title="Create Subscription Rule"
          primaryAction={{
            content: "Save",
            loading: loadingFlag,
            onAction: () => {
              setloadingFlag(true);
              setInterval(() => {
                setloadingFlag(false);
              }, 2000);
              console.log("sumbit");
            },
          }}
        >
          {/* <PageActions
          primaryAction={{
            content: "Save",
            loading: loadingFlag,
            onAction: saveContent,
          }}
        /> */}
        </Page>
      </AppProvider>
    </>
  );
};

export default SubscriptionRuleForm;
