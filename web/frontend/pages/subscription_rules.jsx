import {
  Stack,
  Badge,
  Card,
  Page,
  Layout,
  FormLayout,
  EmptyState,
  Button,
} from "@shopify/polaris";
import { emptySubscription } from "../assets/index";
const SubscriptionRules = () => {
  return (
    <>
      <Page
        title="Subscription Rules"
        primaryAction={<Button primary>Add Subscription Rules</Button>}
      >
        <div className="mb16">
          <Card sectioned>
            <EmptyState
              heading="Create the first subscription rule"
              action={{ content: "Create Subscription Rules" }}
              image={emptySubscription}
            >
              <p>Create rules to enable customers subscribe to products.</p>
            </EmptyState>
          </Card>
        </div>
      </Page>
    </>
  );
};

export default SubscriptionRules;
