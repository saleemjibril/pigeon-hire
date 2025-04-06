"use client";
import Image from "next/image";
import { useState } from "react";
import { Menu, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import DeleteModal from "./deleteModal";

export default function LeadsTable() {
  const [userType, setUserType] = useState("communities");
  const [anchorElFour, setAnchorElFour] = useState(null);
  const [open, setOpen] = useState(null);

  const openerFour = Boolean(anchorElFour);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCloseFour = () => {
    setAnchorElFour(null);
  };
  const handleClickFour = (event) => {
    setAnchorElFour(event.currentTarget);
  };

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

      {userType === "communities" && (
        <table className="manage-network-table__label">
          <thead className="bg-[#F5F5F5]">
            <tr className="">
              <th>Date</th>
              <th>Community name</th>
              <th>Contact</th>
              <th>Category</th>
              <th>Contacted</th>
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
              <td>ololadegrace.ot@gmail.com</td>
              <td>Business</td>
              <td></td>
              <td onClick={handleClickFour}>
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
              <td>ololadegrace.ot@gmail.com</td>
              <td>Business</td>
              <td></td>
              <td onClick={handleClickFour}>
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
              <td>ololadegrace.ot@gmail.com</td>
              <td>Business</td>
              <td></td>
              <td onClick={handleClickFour}>
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
              <td>ololadegrace.ot@gmail.com</td>
              <td>Business</td>
              <td></td>
              <td onClick={handleClickFour}>
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
              <td>ololadegrace.ot@gmail.com</td>
              <td>Business</td>
              <td></td>
              <td onClick={handleClickFour}>
                <Image
                  src={"/assets/icons/more.svg"}
                  width={16}
                  height={16}
                  alt=""
                />
              </td>
            </tr>

          
          

            <Menu
              id="basic-menu"
              anchorEl={anchorElFour}
              open={openerFour}
              onClose={handleCloseFour}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link href={"/user/manage-network/community/edit/1"}>
                <MenuItem
                  sx={{
                    width: "18.4rem",
                    fontSize: "1.4rem",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    backgroundColor: "#fff !important",

                    "&:hover": {
                      color: "#063",
                      backgroundColor: "#fff",
                    },
                  }}
                  className="subMenu"
                >
                  Edit
                </MenuItem>
              </Link>
              <Link href={"/user/manage-network/community/1"}>
                <MenuItem
                  sx={{
                    width: "18.4rem",
                    fontSize: "1.4rem",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    backgroundColor: "#fff !important",

                    "&:hover": {
                      color: "#063",
                      backgroundColor: "#fff",
                    },
                  }}
                  className="subMenu"
                >
                  View
                </MenuItem>
              </Link>
              <MenuItem
                sx={{
                  width: "18.4rem",
                  fontSize: "1.4rem",
                  fontFamily: "Inter",
                  fontWeight: "500",
                  backgroundColor: "#fff !important",

                  "&:hover": {
                    color: "#063",
                    backgroundColor: "#fff",
                  },
                }}
                className="subMenu"
                onClick={() => {
                  handleCloseFour();
                  setOpen(true);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </tbody>
        </table>
      )}
      {userType === "connector" && (
        <table className="manage-network-table__label">
          <thead className="bg-[#F5F5F5]">
            <tr className="">
              <th>Date</th>
              <th>Connector name
              </th>
              <th>Role</th>
              <th>Contact</th>
              <th>Category</th>
              <th>Contacted</th>
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
              <td>Fola Agoro</td>
              <td>Senior buyer at coca-cola</td>
              <td>Ololadegrace.ot@gmail.com</td>
              <td>Business</td>
              <td></td>
              <td onClick={handleClickFour}>
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
              <td>Fola Agoro</td>
              <td>Senior buyer at coca-cola</td>
              <td>Ololadegrace.ot@gmail.com</td>
              <td>Business</td>
              <td></td>
              <td onClick={handleClickFour}>
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
              <td>Fola Agoro</td>
              <td>Senior buyer at coca-cola</td>
              <td>Ololadegrace.ot@gmail.com</td>
              <td>Business</td>
              <td></td>
              <td onClick={handleClickFour}>
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
              <td>Fola Agoro</td>
              <td>Senior buyer at coca-cola</td>
              <td>Ololadegrace.ot@gmail.com</td>
              <td>Business</td>
              <td></td>
              <td onClick={handleClickFour}>
                <Image
                  src={"/assets/icons/more.svg"}
                  width={16}
                  height={16}
                  alt=""
                />
              </td>
            </tr>

      
        
            <Menu
              id="basic-menu"
              anchorEl={anchorElFour}
              open={openerFour}
              onClose={handleCloseFour}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link href={"/user/manage-network/connector/edit/1"}>
                <MenuItem
                  sx={{
                    width: "18.4rem",
                    fontSize: "1.4rem",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    backgroundColor: "#fff !important",

                    "&:hover": {
                      color: "#063",
                      backgroundColor: "#fff",
                    },
                  }}
                  className="subMenu"
                >
                  Edit
                </MenuItem>
              </Link>
              <Link href={"/user/manage-network/connector/1"}>
                <MenuItem
                  sx={{
                    width: "18.4rem",
                    fontSize: "1.4rem",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    backgroundColor: "#fff !important",

                    "&:hover": {
                      color: "#063",
                      backgroundColor: "#fff",
                    },
                  }}
                  className="subMenu"
                >
                  View
                </MenuItem>
              </Link>
              <MenuItem
                sx={{
                  width: "18.4rem",
                  fontSize: "1.4rem",
                  fontFamily: "Inter",
                  fontWeight: "500",
                  backgroundColor: "#fff !important",

                  "&:hover": {
                    color: "#063",
                    backgroundColor: "#fff",
                  },
                }}
                className="subMenu"
                onClick={() => {
                  handleCloseFour();
                  setOpen(true);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </tbody>
        </table>
      )}

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
      <DeleteModal open={open} setOpen={setOpen} />
    </div>
  );
}
