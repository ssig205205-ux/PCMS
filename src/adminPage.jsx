import AdminHeader from "./assets/component/adminHeader.jsx";
import TMLIst from "./assets/component/TMLIst.jsx";
import Navbar from "./assets/component/navbar.jsx";

export default function AdminPage() {
    return (
        <div>
            <Navbar activeStatus={"about"}/>
            <AdminHeader />
            <TMLIst />
        </div>
    )
}