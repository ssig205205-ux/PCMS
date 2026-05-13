import Tabel from "./table";
import FilterBox from "./filterBox";
import { useState } from "react";
export default function FilterSystem({customersData}) {
  const [searchCus, setSearchCus] = useState("");
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <FilterBox
        setSearchCus={setSearchCus}
        customersData={customersData}
        searchCus={searchCus}
        setStatus={setStatus}
        setPlan={setPlan}
        setDate={setDate}
      ></FilterBox>
      <Tabel
        searchCus={searchCus}
        status={status}
        plan={plan}
        date={date}
        customersData={customersData}
      ></Tabel>
    </>
  );
}
