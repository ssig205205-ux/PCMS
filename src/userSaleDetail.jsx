import SalesDetailsH from "./assets/component/salesDetailsH.jsx";
import { useState } from "react";
import SalesPage from "./assets/component/salePage.jsx";
import LeadsTable from "./assets/component/leadsPage.jsx";
import {UserIdContext} from "./assets/context/userDetail.jsx"
import { useContext } from "react";

export default function UserSaleDetail() {
    const [activePage, setActivePage] = useState("sales");

       const { userId,userName } = useContext(UserIdContext);
    

  return (
    <>
      <SalesDetailsH activePage={activePage} userName={userName} setActivePage={setActivePage} />
      {activePage === "sales" ? <SalesPage  userId={userId} /> : <LeadsTable  userId={userId} />}
    </>
  );
}