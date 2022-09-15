import {
  AppProvider,
  Page,
  Modal,
  Card,
  Select,
  Checkbox,
  FormLayout,
  Thumbnail,
  TextStyle,
  TextField,
  Heading,
  Avatar,
  Stack,
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
import { ResourcePicker } from "@shopify/app-bridge-react";

import "react-toggle/style.css";
import {
  DropdownMinor,
  EditMajor,
  DeleteMajor,
  SearchMinor,
  MobilePlusMajor,
} from "@shopify/polaris-icons";
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
  const [planCount, setPlanCount] = useState(0);
  const [planGroup, setPlanGroup] = useState([]);
  const CustomLinkComponent = ({ children, url, ...rest }) => {
    return (
      <Link to={url} {...rest}>
        {children}
      </Link>
    );
  };
  const dynamicPlanGroup = () => {
    retrun(
      <>
        <h1>panthil</h1>
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
                <Card sectioned>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
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
                    <Button
                      icon={MobilePlusMajor}
                      onClick={() => {
                        console.log("Clicked add products");
                        setProductModelFlag(true);
                      }}
                    >
                      Add Products
                    </Button>
                  </div>
                  <ResourcePicker
                    resourceType="Product"
                    open={productModelFlag}
                    onSelection={(id) => {
                      console.log("selected", id);
                      setProductModelFlag(!productModelFlag);
                    }}
                    onCancel={() => {
                      console.log("cancelled");
                      setProductModelFlag(!productModelFlag);
                    }}
                  />
                  <Collapsible
                    open={productShow ? productShow : false}
                    id="productShow-collapsible"
                    transition={{
                      duration: "200ms",
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
                {planGroup?.map((data, index) => {
                  console.log(planGroup);
                  return (
                    <>
                      <Card key={data.id}>
                        {data.open ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "20px 20px 10px 20px",
                              }}
                            >
                              <h1
                                onClick={() => {
                                  console.log("click");
                                  let newArr = [...planGroup];
                                  newArr[index].open = !data?.open;
                                  setPlanGroup(newArr);
                                }}
                                style={{
                                  display: "flex",
                                  opacity: 1,
                                  textDecoration: "underline",
                                  fontWeight: "600",
                                  fontSize: "16px",
                                  cursor: "pointer",
                                }}
                              >
                                Plan - {index + 1}
                                <Icon source={DropdownMinor} />
                              </h1>
                              <h1
                                onClick={() => {
                                  console.log("click", index);
                                  let newArr = [...planGroup];
                                  newArr.splice(index, 1);
                                  setPlanGroup(newArr);
                                }}
                                style={{
                                  display: "flex",
                                  opacity: 1,
                                  textDecoration: "underline",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                  color: "#d72c0d",
                                }}
                              >
                                Delete Plan
                                <div className="plan_del_div">
                                  <Icon source={DeleteMajor} color="critical" />
                                </div>
                              </h1>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "20px",
                              }}
                            >
                              <Heading>Plan - {index + 1}</Heading>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <div
                                  className="plan_false_div"
                                  onClick={() => {
                                    console.log("click");
                                    let newArr = [...planGroup];
                                    newArr[index].open = !data?.open;
                                    setPlanGroup(newArr);
                                  }}
                                  style={{
                                    marginLeft: "0px !important",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Icon source={EditMajor} color="highlight" />
                                </div>

                                <div
                                  className="plan_false_div"
                                  onClick={() => {
                                    console.log("click", index);
                                    let newArr = [...planGroup];
                                    newArr.splice(index, 1);
                                    setPlanGroup(newArr);
                                  }}
                                  style={{
                                    marginLeft: "0px !important",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Icon source={DeleteMajor} color="critical" />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        <Collapsible
                          open={data?.open ? data?.open : false}
                          id="open-collapsible"
                          transition={{
                            duration: "200ms",
                            timingFunction: "ease-in-out",
                          }}
                          expandOnPrint
                        >
                          <Card.Section>
                            <TextField
                              label="Name"
                              value={data.name}
                              onChange={(newValue) => {
                                let newArr = [...planGroup];
                                newArr[index].name = newValue;
                                setPlanGroup(newArr);
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
                              <div
                                style={{ width: "100%", paddingRight: "10px" }}
                              >
                                <TextField
                                  type="number"
                                  value={data.bill_time[0]}
                                  onChange={(newValue) => {
                                    let newArr = [...planGroup];
                                    newArr[index].bill_time[0] = newValue;
                                    setPlanGroup(newArr);
                                  }}
                                  autoComplete="off"
                                />
                              </div>

                              <Select
                                id="select_bill"
                                options={[
                                  "Day(s)",
                                  "Week(s)",
                                  "Month(s)",
                                  "Year(s)",
                                ]}
                                value={data.bill_time[1]}
                                onChange={(newValue) => {
                                  let newArr = [...planGroup];
                                  newArr[index].bill_time[1] = newValue;
                                  setPlanGroup(newArr);
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
                                  console.log(
                                    "click switch : ",
                                    e.target.checked
                                  );
                                  let newArr = [...planGroup];
                                  newArr[index].discount_flag =
                                    e.target.checked;
                                  setPlanGroup(newArr);
                                }}
                                icons={false}
                              />
                              <div style={{ paddingLeft: "10px" }}>
                                <TextStyle>Offer discounts?</TextStyle>
                              </div>
                            </div>

                            <div
                              style={{
                                margin: "2px",
                                marginBottom: "7px",
                              }}
                            >
                              <Layout>
                                <Layout.Section oneThird>
                                  <Select
                                    id="discount_type"
                                    label="Discount Type"
                                    options={[
                                      "Fixed Amount",
                                      "Percentage",
                                      "Set Price",
                                    ]}
                                    disabled={
                                      data?.discount_flag
                                        ? !data?.discount_flag
                                        : true
                                    }
                                    value={data.discount_type}
                                    onChange={(newValue) => {
                                      let newArr = [...planGroup];
                                      newArr[index].discount_type = newValue;
                                      setPlanGroup(newArr);
                                    }}
                                  />
                                </Layout.Section>
                                <Layout.Section oneThird>
                                  <TextField
                                    type="number"
                                    label="Discount amount"
                                    disabled={
                                      data?.discount_flag
                                        ? !data?.discount_flag
                                        : true
                                    }
                                    value={data.discount_amount}
                                    onChange={(newValue) => {
                                      let newArr = [...planGroup];
                                      newArr[index].discount_amount = newValue;
                                      setPlanGroup(newArr);
                                    }}
                                    // prefix={
                                    //   data.discount_amount != "Percentage"
                                    //     ? "₹"
                                    //     : ""
                                    // }
                                    autoComplete="off"
                                  />
                                </Layout.Section>
                              </Layout>
                            </div>
                          </Card.Section>
                        </Collapsible>
                      </Card>
                    </>
                  );
                })}
                <Card sectioned>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Heading>Add another plan</Heading>
                    <Button
                      icon={MobilePlusMajor}
                      onClick={() => {
                        setPlanGroup((oldArray) => [
                          ...oldArray,
                          {
                            id: (Math.random() + 1).toString(36).substring(7),
                            open: true,
                            name: "",
                            bill_time: [0, "Week(s)"],
                            discount_flag: false,
                            discount_type: "Percentage",
                            discount_amount: 0,
                          },
                        ]);
                      }}
                    >
                      Add Plan
                    </Button>
                  </div>
                </Card>
              </Layout.AnnotatedSection>
              <Layout.AnnotatedSection>
                <div style={{ float: "right" }}>
                  <Button primary>Save</Button>
                </div>
              </Layout.AnnotatedSection>
            </Layout>
          </Page>
        </Page>
      </AppProvider>
    </>
  );
};

export default SubscriptionRuleForm;
