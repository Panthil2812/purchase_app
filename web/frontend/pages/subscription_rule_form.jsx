import {
  AppProvider,
  Page,
  Modal,
  Card,
  Select,
  Checkbox,
  FormLayout,
  Thumbnail,
  InlineError,
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
import { pro_img, product_img } from "../assets/index";
import "react-toggle/style.css";
import {
  DropdownMinor,
  EditMajor,
  DeleteMajor,
  SearchMinor,
  MobilePlusMajor,
} from "@shopify/polaris-icons";
import { isEmpty, equals } from "validator";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./pages.css";
const SubscriptionRuleForm = () => {
  const [loadingFlag, setloadingFlag] = useState(false);
  const [productShow, setProductShow] = useState(false);
  const [productModelFlag, setProductModelFlag] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [planCount, setPlanCount] = useState(0);
  const [planGroup, setPlanGroup] = useState([]);
  const [
    productWithSpecificVariantsSelected,
    setproductWithSpecificVariantsSelected,
  ] = useState([]);
  const [error_in_group_name, setError_In_Group_Name] = useState("");
  const [error_pu_group_name, setError_Pu_Group_Name] = useState("");
  const [error_selected_products, setError_Selected_Products] = useState("");
  const [error_plans_length, setError_plans_length] = useState("");
  const [errorMessagePlans, setErrorMessagePlans] = useState("");
  const [pu_group_name, setPu_Group_Name] = useState("");
  const [in_group_name, setIn_Group_Name] = useState("");
  const CustomLinkComponent = ({ children, url, ...rest }) => {
    return (
      <Link to={url} {...rest}>
        {children}
      </Link>
    );
  };
  const Form_validation = async (e) => {
    if (
      isEmpty(e.in_group_name, {
        ignore_whitespace: false,
      })
    ) {
      setError_In_Group_Name("Internal group name is required");
    } else {
      setError_In_Group_Name(null);
    }
    if (
      isEmpty(e.pu_group_name, {
        ignore_whitespace: false,
      })
    ) {
      setError_Pu_Group_Name("Public group name is required");
    } else {
      setError_Pu_Group_Name(null);
    }
    if (e.selectedProducts.length <= 0) {
      setError_Selected_Products("Please select a products");
    } else {
      setError_Selected_Products(null);
    }
    if (e.plans_length <= 0) {
      setError_plans_length("Please create one Subscription plans");
    } else {
      setError_plans_length(null);
      await onErrorHandlePlansGroup(e.plans);
      console.log("errorMessagePlans", errorMessagePlans);
    }
  };
  const onErrorHandlePlansGroup = async (data) => {
    try {
      data.map(async (data, index) => {
        let newArr = [...errorMessagePlans];
        let error = 0;
        console.log("dd : ", data);
        if (
          isEmpty(data.name, {
            ignore_whitespace: false,
          })
        ) {
          newArr[index].name = "Please enter plans name";
        } else {
          newArr[index].name = "";
        }
        if (data.discount_flag) {
          if (data.discount_amount <= 0) {
            newArr[index].discount_amount =
              "Please enter vaild discount amount";
          } else {
            newArr[index].discount_amount = "";
          }
        }
        if (equals(data.bill_time[1], "Week(s)")) {
          if (data.bill_time[0] > 0 && data.bill_time[0] <= 7) {
            newArr[index].bill_time = "";
          } else {
            newArr[index].bill_time = "Please enter vaild bill week days";
          }
        } else if (equals(data.bill_time[1], "Day(s)")) {
          if (data.bill_time[0] > 0 && data.bill_time[0] <= 365) {
            newArr[index].bill_time = "";
          } else {
            newArr[index].bill_time = "Please enter vaild bill days";
          }
        } else if (equals(data.bill_time[1], "Month(s)")) {
          if (data.bill_time[0] > 0 && data.bill_time[0] <= 12) {
            newArr[index].bill_time = "";
          } else {
            newArr[index].bill_time = "Please enter vaild bill month";
          }
        } else if (equals(data.bill_time[1], "Year(s)")) {
          if (data.bill_time[0] > 0 && data.bill_time[0] <= 2) {
            newArr[index].bill_time = "";
          } else {
            newArr[index].bill_time = "Please enter vaild year number";
          }
        }
        console.log(`string : ${
          newArr[index].name
        }, \nisEmpty(newArr[index].name, {
          ignore_whitespace: false,
        }) : ${isEmpty(newArr[index].name, {
          ignore_whitespace: false,
        })}`);
        console.log(`string : ${
          newArr[index].discount_amount
        }, \nisEmpty(newArr[index].discount_amount, {
          ignore_whitespace: false,
        }) : ${isEmpty(newArr[index].discount_amount, {
          ignore_whitespace: false,
        })}`);
        console.log(`string : ${
          newArr[index].bill_time
        }, \nisEmpty(newArr[index].bill_time, {
          ignore_whitespace: false,
        }) : ${isEmpty(newArr[index].bill_time, {
          ignore_whitespace: false,
        })}`);
        if (
          isEmpty(newArr[index].name, {
            ignore_whitespace: false,
          }) &&
          isEmpty(newArr[index].discount_amount, {
            ignore_whitespace: false,
          }) &&
          isEmpty(newArr[index].bill_time, {
            ignore_whitespace: false,
          })
        ) {
          console.log("no error in plans :", index);
        } else {
          console.log("error in plan : ", index);
        }
        await setErrorMessagePlans(newArr);
      });
    } catch (e) {
      console.log("error onErrorHandlePlansGroup  :  ", e.message);
    }
  };
  const onActionFormMethod = async () => {
    // console.log(productWithSpecificVariantsSelected);
    const data = {
      in_group_name: in_group_name,
      pu_group_name: pu_group_name,
      selectedProducts: productWithSpecificVariantsSelected,
      plans_length: planGroup.length,
      plans: planGroup,
    };
    console.log("data : ", data);
    const validation_result = await Form_validation(data);

    // setloadingFlag(true);
    // setInterval(() => {
    // [
    //   {
    //     name: "",
    //     everybill: [],
    //     discount: false,
    //     discount_type: "",
    //     discount_amount: "",
    //   },
    // ]
    //   setloadingFlag(false);
    // }, 2000);

    console.log("sumbit");
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
            onAction: onActionFormMethod,
          }}
        >
          {/* <Page fullWidth> */}
          <Layout>
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
                    value={in_group_name}
                    onChange={(e) => {
                      setIn_Group_Name(e);
                    }}
                    error={error_in_group_name}
                    placeholder="Subscription group for vitamins"
                    autoComplete="off"
                  />
                  <TextField
                    label="Public group name"
                    value={pu_group_name}
                    error={error_pu_group_name}
                    onChange={(e) => {
                      setPu_Group_Name(e);
                    }}
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
                  initialSelectionIds={productWithSpecificVariantsSelected}
                  onSelection={(data) => {
                    // console.log("selected", data.selection);
                    if (data.selection.length > 0) {
                      let selected_id = [];
                      for (const obj of data.selection) {
                        const variants_id = obj.variants.map((d) => {
                          return { id: d.id };
                        });
                        selected_id.push({
                          id: obj.id,
                          variants: variants_id,
                        });
                      }
                      console.log(selected_id);
                      setproductWithSpecificVariantsSelected(selected_id);
                    }
                    setSelectedProduct(data.selection);
                    setProductModelFlag(!productModelFlag);
                    selectedProduct.length === 0
                      ? setProductShow(!productShow)
                      : "";
                  }}
                  onCancel={() => {
                    console.log("cancelled");
                    setProductModelFlag(!productModelFlag);
                  }}
                />
                <InlineError message={error_selected_products} />
                <Collapsible
                  open={productShow ? productShow : false}
                  id="productShow-collapsible"
                  transition={{
                    duration: "200ms",
                    timingFunction: "ease-in-out",
                  }}
                  expandOnPrint
                >
                  <h3>{selectedProduct.length} Products Selected</h3>
                  <ResourceList
                    resourceName={{
                      singular: "customer",
                      plural: "customers",
                    }}
                    items={selectedProduct}
                    renderItem={(item) => {
                      return (
                        <ResourceItem
                          id={item.id}
                          media={
                            <Avatar
                              size="medium"
                              name={item.title}
                              source={
                                item.images.length > 0
                                  ? item.images[0].originalSrc
                                  : product_img
                              }
                            />
                          }
                          accessibilityLabel={`View details for ${item.title}`}
                          name={item.title}
                        >
                          <div className="selected_products">
                            <div>
                              <h3>
                                <TextStyle variation="strong">
                                  {item.title}
                                </TextStyle>
                              </h3>
                              <div>
                                {item.variants.length} Variants Selected
                              </div>
                            </div>
                            <div
                              className="del_div"
                              onClick={() => {
                                console.log("click event");
                                console.log("item : ", item.id);
                                console.log(
                                  "productWithSpecificVariantsSelected : ",
                                  productWithSpecificVariantsSelected
                                );
                                const index = selectedProduct.findIndex(
                                  (element) => element.id === item.id
                                );
                                // console.log("click", index);
                                let newArr = [...selectedProduct];
                                newArr.splice(index, 1);
                                setSelectedProduct(newArr);
                                newArr.length === 0
                                  ? setProductShow(!productShow)
                                  : "";
                                //productWithSpecificVariantsSelected delete  id
                                const index_svs =
                                  productWithSpecificVariantsSelected.findIndex(
                                    (element) => element.id === item.id
                                  );
                                console.log("click", index_svs);
                                let newSvs = [
                                  ...productWithSpecificVariantsSelected,
                                ];
                                newSvs.splice(index, 1);
                                setproductWithSpecificVariantsSelected(newSvs);
                                newSvs.length === 0
                                  ? setProductShow(!productShow)
                                  : "";
                                console.log(
                                  "productWithSpecificVariantsSelected after: ",
                                  productWithSpecificVariantsSelected
                                );
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
                                  let newArr1 = [...errorMessagePlans];
                                  newArr1.splice(index, 1);
                                  setErrorMessagePlans(newArr1);
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
                            error={errorMessagePlans[index].name}
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
                                error={errorMessagePlans[index].bill_time}
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
                              error={
                                errorMessagePlans[index].bill_time
                                  ? true
                                  : false
                              }
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
                                newArr[index].discount_flag = e.target.checked;
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
                                  error={errorMessagePlans[index].discount_type}
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
                                  error={
                                    errorMessagePlans[index].discount_amount
                                  }
                                  value={data.discount_amount}
                                  onChange={(newValue) => {
                                    let newArr = [...planGroup];
                                    newArr[index].discount_amount = newValue;
                                    setPlanGroup(newArr);
                                  }}
                                  prefix={
                                    data.discount_type != "Percentage"
                                      ? "₹"
                                      : ""
                                  }
                                  suffix={
                                    data.discount_type != "Percentage"
                                      ? ""
                                      : "%"
                                  }
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
                    disabled={planGroup.length < 5 ? false : true}
                    onClick={() => {
                      const u_id = (Math.random() + 1)
                        .toString(36)
                        .substring(7);
                      setPlanGroup((oldArray) => [
                        ...oldArray,
                        {
                          id: u_id,
                          open: true,
                          name: "",
                          bill_time: [0, "Week(s)"],
                          discount_flag: false,
                          discount_type: "Percentage",
                          discount_amount: 0,
                        },
                      ]);
                      setErrorMessagePlans((oldArray) => [
                        ...oldArray,
                        {
                          id: u_id,
                          name: "",
                          bill_time: "",
                          discount_type: "",
                          discount_amount: "",
                        },
                      ]);
                    }}
                  >
                    Add Plan
                  </Button>
                </div>
                <InlineError message={error_plans_length} />
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection>
              <div style={{ float: "right" }}>
                <Button primary onClick={onActionFormMethod}>
                  Save
                </Button>
              </div>
            </Layout.AnnotatedSection>
          </Layout>
          {/* </Page> */}
        </Page>
      </AppProvider>
    </>
  );
};

export default SubscriptionRuleForm;
