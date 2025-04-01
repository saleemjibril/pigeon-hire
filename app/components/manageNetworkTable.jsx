"use client";
import Image from "next/image";
import { useState } from "react";
export default function ManageNetworkTable() {
  const [userType, setUserType] = useState("basic");

  return (
    <div className="manage-network-table">
      <div className="manage-network-table__header">
        <div>
          <button
            className={userType === "communities" && "active"}
            onClick={() => setUserType("communities")}
          >
            Communities
          </button>
          {!userType && <div></div>}
          <button
            className={userType === "connector" && "active"}
            onClick={() => setUserType("connector")}
          >
            Connector
          </button>
        </div>
        <div></div>
      </div>

      <table className="manage-network-table__label">
        <thead className="bg-[#F5F5F5]">
          <tr className="">
            <th>Date</th>
            <th>Community name</th>
            <th>Category</th>
            <th>Total profile view</th>
            <th>Contact clicks</th>
            <th>
              <Image
                src={"/assets/icons/more.svg"}
                width={16}
                height={16}
                alt=""
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12/03/2025</td>
            <td>Startup entrepreneurship hub</td>
            <td>Business</td>
            <td>100</td>
            <td>56</td>
            <td>
            <Image
                src={"/assets/icons/more.svg"}
                width={16}
                height={16}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>12/03/2025</td>
            <td>Startup entrepreneurship hub</td>
            <td>Business</td>
            <td>100</td>
            <td>56</td>
            <td>
            <Image
                src={"/assets/icons/more.svg"}
                width={16}
                height={16}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>12/03/2025</td>
            <td>Startup entrepreneurship hub</td>
            <td>Business</td>
            <td>100</td>
            <td>56</td>
            <td>
            <Image
                src={"/assets/icons/more.svg"}
                width={16}
                height={16}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>12/03/2025</td>
            <td>Startup entrepreneurship hub</td>
            <td>Business</td>
            <td>100</td>
            <td>56</td>
            <td>
            <Image
                src={"/assets/icons/more.svg"}
                width={16}
                height={16}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>12/03/2025</td>
            <td>Startup entrepreneurship hub</td>
            <td>Business</td>
            <td>100</td>
            <td>56</td>
            <td>
            <Image
                src={"/assets/icons/more.svg"}
                width={16}
                height={16}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>12/03/2025</td>
            <td>Startup entrepreneurship hub</td>
            <td>Business</td>
            <td>100</td>
            <td>56</td>
            <td>
            <Image
                src={"/assets/icons/more.svg"}
                width={16}
                height={16}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>12/03/2025</td>
            <td>Startup entrepreneurship hub</td>
            <td>Business</td>
            <td>100</td>
            <td>56</td>
            <td>
            <Image
                src={"/assets/icons/more.svg"}
                width={16}
                height={16}
                alt=""
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div className="manage-network-table__label">
          <div>Date</div>
          <div>Community name</div>
          <div>Category</div>
          <div>Total profile view</div>
          <div>Contact clicks</div>
          <div></div>
        </div>

        
            <div
              className="manage-network-table__item"
            //   onClick={() => navigate(`/admin/users/${user?.id}`)}
            >
              <div>12/03/2025</div>
              <div>Startup entrepreneurship hub</div>
              <div>
              Business
              </div>
              <div>100</div>
              <div>56</div>
              <div></div>
            </div> */}
    </div>
  );
}
