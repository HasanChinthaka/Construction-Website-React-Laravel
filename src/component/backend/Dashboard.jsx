import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SideBar from "../common/SideBar";

const Dashboard = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              {/* sidebar */}
              <SideBar/>
            </div> 
            <div className="col-md-9 dashboard">
              {/* dashboard */}
              <div className="card shadow boarder-0">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <h4>Dashboard</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
