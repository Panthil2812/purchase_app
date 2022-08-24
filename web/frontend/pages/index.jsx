import { Navigation } from "../components";
import { useState } from "react";
import Dashboard from "./dashboard.jsx";
import Subscription_rules from "./subscription_rules.jsx";
import Subscriptions from "./subscriptions.jsx";
import Customization from "./customization.jsx";
function HomePage(props) {
  const [tab_selected, setTab_Selected] = useState(props.tab ? props.tab : 3);
  return (
    <>
      <Navigation
        // className="navigation"
        selected={tab_selected}
        setTab_Selected={(e) => {
          setTab_Selected(e);
        }}
      />
      <div className="main-body">
        {tab_selected == 0 && <Dashboard />}
        {tab_selected == 1 && <Subscription_rules />}
        {tab_selected == 2 && <Subscriptions />}
        {tab_selected == 3 && <Customization />}
      </div>
    </>
  );
}

export default HomePage;
