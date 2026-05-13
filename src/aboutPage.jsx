
import { FaUsers, FaWifi, FaRocket } from "react-icons/fa";
import Navbar from "./assets/component/navbar";

export default function About() {
  return (<>
    <Navbar activeStatus="about"></Navbar>
    <div className="about">
      {/* HEADER */}
      <div className="about-header">
        <h1>About CMS</h1>
        <p>Customer Management System Dashboard</p>
      </div>

      {/* HERO */}
      <div className="hero-section">
        <div className="hero-card">
          <h2>Smart Customer Management</h2>

          <p>
            CMS helps businesses manage customers, monitor subscriptions,
            organize plans, and control customer data in one clean dashboard.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="feature-container">
        {/* CARD */}
        <div className="feature-card">
          <div className="icon blue">
            <FaUsers />
          </div>

          <h3>Customer Control</h3>

          <p>
            Manage customer information, addresses, contact numbers, and plans
            easily.
          </p>
        </div>

        {/* CARD */}
        <div className="feature-card">
          <div className="icon green">
            <FaWifi />
          </div>

          <h3>Internet Plans</h3>

          <p>
            Track active customers, pending subscriptions, and cancelled plans.
          </p>
        </div>

        {/* CARD */}
        <div className="feature-card">
          <div className="icon purple">
            <FaRocket />
          </div>

          <h3>Fast Workflow</h3>

          <p>
            Improve workflow speed with organized dashboards and searchable
            tables.
          </p>
        </div>
      </div>

      {/* INFO */}
      <div className="info-section">
        <div className="info-card">
          <h2>Why Use CMS?</h2>

          <p>
            This dashboard is designed with a modern clean UI focused on
            simplicity, speed, and easy customer management.
          </p>

          <div className="stats-container">
            <div className="stat-box">
              <h3>1K+</h3>
              <p>Customers</p>
            </div>

            <div className="stat-box">
              <h3>99%</h3>
              <p>Uptime</p>
            </div>

            <div className="stat-box">
              <h3>24/7</h3>
              <p>Support</p>
            </div>

            <div className="stat-box">
              <h3>Fast</h3>
              <p>Performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>  </>
  );
}