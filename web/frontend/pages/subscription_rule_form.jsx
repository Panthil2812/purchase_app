import {
  AppProvider,
  Page,
  Modal,
  Card,
  Select,
  FormLayout,
  TextStyle,
  TextField,
  Heading,
  Avatar,
  Collapsible,
  Layout,
  TextContainer,
  Icon,
  Banner,
  ResourceItem,
  Button,
  ResourceList,
  PageActions,
} from "@shopify/polaris";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { MobilePlusMajor } from "@shopify/polaris-icons";
import { DeleteMajor } from "@shopify/polaris-icons";
import { DropdownMinor } from "@shopify/polaris-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./pages.css";
const SubscriptionRuleForm = () => {
  const [loadingFlag, setloadingFlag] = useState(false);
  const [productShow, setProductShow] = useState(true);
  const [productModelFlag, setProductModelFlag] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([
    {
      id: 145,
      avatarSource:
        "https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746",
      name: "Yi So-Yeon",
      location: "Gwangju, South Korea",
    },
    {
      id: 146,
      avatarSource:
        "https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746",
      name: "Products",
      location: "Gwangju, South Korea",
    },
  ]);

  const CustomLinkComponent = ({ children, url, ...rest }) => {
    return (
      <Link to={url} {...rest}>
        {children}
      </Link>
    );
  };
  const Product_Model = () => {
    retrun(
      <>
        <Modal
          open={productModelFlag}
          onClose={() => {
            setProductModelFlag(!productModelFlag);
          }}
          title="Reach more shoppers with Instagram product tags"
          primaryAction={{
            content: "Add Instagram",
            onAction: () => {
              setProductModelFlag(!productModelFlag);
            },
          }}
          secondaryActions={[
            {
              content: "Learn more",
              onAction: () => {
                setProductModelFlag(!productModelFlag);
              },
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving Use
                Instagram posts to share your products with millions of people.
                Let shoppers buy from your store without leaving Use Instagram
                posts to share your products with millions of people. Let
                shoppers buy from your store without leaving Use Instagram posts
                to share your products with millions of people. Let shoppers buy
                from your store without leaving Use Instagram posts to share
                your products with millions of people. Let shoppers buy from
                your store without leaving Use Instagram posts to share your
                products with millions of people. Let shoppers buy from your
                store without leaving Use Instagram posts to share your products
                with millions of people. Let shoppers buy from your store
                without leaving Use Instagram posts to share your products with
                millions of people. Let shoppers buy from your store without
                leaving Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </>
    );
  };
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
          <Page fullWidth>
            <Layout>
              <Layout.Section>
                <Banner title="Order archived" onDismiss={() => {}}>
                  <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
                </Banner>
              </Layout.Section>
              {/* enter selling name and description */}
              <Layout.AnnotatedSection
                id="groupDetails"
                title="Group names"
                description="Specify the names for your subscription plan group."
              >
                <Card sectioned title="Subscription group">
                  <FormLayout>
                    <TextField
                      label="Internal group name"
                      onChange={() => {}}
                      placeholder="Subscription group for vitamins"
                      autoComplete="off"
                    />
                    <TextField
                      label="Public group name"
                      onChange={() => {}}
                      placeholder="Subscribe & Save"
                      autoComplete="off"
                    />
                  </FormLayout>
                </Card>
              </Layout.AnnotatedSection>
              {/* select products for selling group */}
              <Layout.AnnotatedSection
                id="select_products"
                title="Subscription products"
                description="Choose the products and variants you'd like to sell via subscription."
              >
                <Card
                  sectioned
                  title={
                    <div style={{ display: "flex" }}>
                      <h1
                        onClick={() => {
                          console.log("click");
                          setProductShow(!productShow);
                        }}
                        style={{
                          display: "flex",
                          opacity: 1,
                          textDecoration: "underline",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Selected products and variants
                        <Icon
                          source={DropdownMinor}
                          style={{ marginLeft: "0px !important" }}
                        />
                      </h1>
                    </div>
                  }
                  actions={[
                    {
                      content: (
                        <Button
                          icon={MobilePlusMajor}
                          onClick={() => {
                            console.log("Clicked add products");
                            setProductModelFlag(true);
                          }}
                        >
                          Add Products
                        </Button>
                      ),
                    },
                  ]}
                >
                  <Collapsible
                    open={productShow}
                    id="basic-collapsible"
                    transition={{
                      duration: "500ms",
                      timingFunction: "ease-in-out",
                    }}
                    expandOnPrint
                  >
                    <h3>2 Products Selected</h3>
                    <ResourceList
                      resourceName={{
                        singular: "customer",
                        plural: "customers",
                      }}
                      items={selectedProduct}
                      renderItem={(item) => {
                        const { id, avatarSource, name, location } = item;

                        return (
                          <ResourceItem
                            id={id}
                            media={
                              <Avatar
                                size="medium"
                                name={name}
                                source={avatarSource}
                              />
                            }
                            accessibilityLabel={`View details for ${name}`}
                            name={name}
                          >
                            <div className="selected_products">
                              <div>
                                <h3>
                                  <TextStyle variation="strong">
                                    {name}
                                  </TextStyle>
                                </h3>
                                <div>{location}</div>
                              </div>
                              <div
                                className="del_div"
                                onClick={() => {
                                  console.log("click event");
                                  console.log("id : ", id);
                                }}
                              >
                                <Icon source={DeleteMajor} color="critical" />
                              </div>
                            </div>
                          </ResourceItem>
                        );
                      }}
                    />
                  </Collapsible>
                </Card>
              </Layout.AnnotatedSection>
              {/* create a new plan */}
              <Layout.AnnotatedSection
                id="plansDetails"
                title="Subscription plans"
                description="Specify the plans belonging to this group."
              >
                <Card title="Add another plan">
                  <Card.Section>
                    <TextField
                      label="Name"
                      onChange={(e) => {
                        console.log("Subscribe & Save Monthly : ", e);
                      }}
                      placeholder="Subscribe & Save Monthly"
                      autoComplete="off"
                    />
                  </Card.Section>
                  <Card.Section title="BILLING RULES">
                    <div style={{ paddingBottom: "8px" }}>
                      <TextStyle>Customers are billed every</TextStyle>
                    </div>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div style={{ width: "100%", paddingRight: "10px" }}>
                        <TextField
                          type="number"
                          onChange={(e) => {
                            console.log("numbe of day : ", e);
                          }}
                          autoComplete="off"
                        />
                      </div>

                      <Select
                        id="ccc"
                        placeholder="Select"
                        options={["Day(s)", "Week(s)", "Month(s)", "Year(s)"]}
                        onChange={(e) => {
                          console.log("click plans select time proide", e);
                        }}
                      />
                    </div>
                  </Card.Section>
                  <Card.Section title="DISCOUNTS">
                    <div
                      style={{
                        display: "flex",
                        marginTop: "5px",
                        marginBottom: "20px",
                      }}
                    >
                      <Toggle
                        onChange={(e) => {
                          console.log("click switch : ", e.target.checked);
                        }}
                        icons={false}
                      />
                      <div style={{ paddingLeft: "10px" }}>
                        <TextStyle>Offer discounts?</TextStyle>
                      </div>
                    </div>
                    <Layout>
                      <Layout.Section oneThird>
                        <Select
                          id="ccc"
                          label="Discount Type"
                          placeholder="Select"
                          options={["Day(s)", "Week(s)", "Month(s)", "Year(s)"]}
                          onChange={(e) => {
                            console.log("click plans select time proide", e);
                          }}
                        />
                      </Layout.Section>
                      <Layout.Section oneThird>
                        <TextField
                          type="number"
                          label="Discount amount"
                          onChange={(e) => {
                            console.log("numbe of day : ", e);
                          }}
                          suffix="%"
                          autoComplete="off"
                        />
                      </Layout.Section>
                    </Layout>
                  </Card.Section>
                </Card>
                <Card
                  sectioned
                  title="Add another plan"
                  actions={[
                    {
                      content: (
                        <Button
                          icon={MobilePlusMajor}
                          onClick={() => {
                            console.log("click add plan");
                          }}
                        >
                          Add Plan
                        </Button>
                      ),
                    },
                  ]}
                ></Card>
              </Layout.AnnotatedSection>
              <Layout.AnnotatedSection>
                <div style={{ float: "right" }}>
                  <Button primary>Save</Button>
                </div>
              </Layout.AnnotatedSection>
            </Layout>
            <Modal
              open={productModelFlag}
              onClose={() => {
                setProductModelFlag(!productModelFlag);
              }}
              title="Add products"
              primaryAction={{
                content: "Add Products",
                onAction: () => {
                  setProductModelFlag(!productModelFlag);
                },
              }}
              secondaryActions={[
                {
                  content: "Cancel",
                  onAction: () => {
                    setProductModelFlag(!productModelFlag);
                  },
                },
              ]}
            >
              <Modal.Section>
                <TextContainer>
                  <p>
                    Use Instagram posts to share your products with millions of
                    peproducts with millions of people. Let shoppers buy from
                    your store without leaving Instagram.
                  </p>
                </TextContainer>
              </Modal.Section>
            </Modal>
          </Page>
        </Page>
      </AppProvider>
    </>
  );
};

export default SubscriptionRuleForm;
