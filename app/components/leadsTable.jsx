"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import DeleteModal from "./deleteModal";
import { getUserAnalytics } from "../apis/analyticsService"; // Adjust path as needed

export default function LeadsTable() {
  const [userType, setUserType] = useState("communities");
  const [anchorElFour, setAnchorElFour] = useState(null);
  const [open, setOpen] = useState(null);
  const [communityLeads, setCommunityLeads] = useState([]);
  const [connectorLeads, setConnectorLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const openerFour = Boolean(anchorElFour);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Fetch analytics data on component mount
  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        setLoading(true);
        const response = await getUserAnalytics();
        
        if (response.success) {
          const { detailedData } = response.data;
          
          // Filter leads by type
          const communityLeadsData = detailedData.leads.data.filter(
            lead => lead.leadType === 'community' && lead.community
          );
          
          const connectorLeadsData = detailedData.leads.data.filter(
            lead => lead.leadType === 'connector' && lead.connector
          );
          
          setCommunityLeads(communityLeadsData);
          setConnectorLeads(connectorLeadsData);
        }
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadsData();
  }, []);

  const handleCloseFour = () => {
    setAnchorElFour(null);
  };

  const handleClickFour = (event) => {
    setAnchorElFour(event.currentTarget);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const getCommunityCategory = (communityType) => {
    const categoryMap = {
      'Cultural and Identity-Based Communities': 'Cultural',
      'Professional': 'Business',
      'Educational': 'Education',
      'Hobby and Interest-Based': 'Hobby',
    };
    return categoryMap[communityType] || 'Business';
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
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : communityLeads.length > 0 ? (
              communityLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{formatDate(lead.createdAt)}</td>
                  <td>{lead.community?.name || 'N/A'}</td>
                  <td>{lead.community?.email || 'N/A'}</td>
                  <td>{getCommunityCategory(lead.community?.communityType)}</td>
                  <td>{lead.status === 'contacted' ? '✓' : ''}</td>
                  <td onClick={handleClickFour}>
                    <Image
                      src={"/assets/icons/more.svg"}
                      width={16}
                      height={16}
                      alt=""
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>
                  No community leads data found
                </td>
              </tr>
            )}

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
              <th>Connector name</th>
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
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : connectorLeads.length > 0 ? (
              connectorLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{formatDate(lead.createdAt)}</td>
                  <td>{`${lead.connector?.firstName || ''} ${lead.connector?.lastName || ''}`.trim() || 'N/A'}</td>
                  <td>{lead.connector?.role || 'N/A'}</td>
                  <td>{lead.connector?.email || 'N/A'}</td>
                  <td>Business</td>
                  <td>{lead.status === 'contacted' ? '✓' : ''}</td>
                  <td onClick={handleClickFour}>
                    <Image
                      src={"/assets/icons/more.svg"}
                      width={16}
                      height={16}
                      alt=""
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>
                  No connector leads data found
                </td>
              </tr>
            )}

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

      <DeleteModal open={open} setOpen={setOpen} />
    </div>
  );
}