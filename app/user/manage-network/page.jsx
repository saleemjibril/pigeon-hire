
"use client";

import { useState, useEffect } from "react";
import ManageNetworkTable from "@/app/components/manageNetworkTable";
import Image from "next/image";
import { getUserAnalytics } from "@/app/apis/analyticsService";

export default function ManageNetwork() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getUserAnalytics();
      
      if (result.success) {
        setAnalyticsData(result.data);
        setError(null);
      } else {
        setError(result.error);
        console.error('Failed to fetch analytics:', result.error);
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  // Default values while loading or if data is unavailable
  const getCardValue = (value, defaultValue = 0) => {
    return loading ? "..." : value ?? defaultValue;
  };

  return (
    <div className="manage-network">
      <div className="manage-network__cards">
        <div className="manage-network__cards__card">
          <Image
            src={"/assets/icons/communities.svg"}
            width={36}
            height={36}
            alt=""
          />
          <div className="manage-network__cards__card__group">
            <div>Total Communities</div>
            <div className="manage-network__cards__card__number">4</div>
          </div>
        </div>
        <div className="manage-network__cards__card">
            <Image
              src={"/assets/icons/profileView.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="manage-network__cards__card__group">
            <div>Total Profile view</div>
          <div className="manage-network__cards__card__number-mini">
            {getCardValue(analyticsData?.analytics?.profilesViewed, 1200)}
          </div>
          </div>
        </div>
        <div className="manage-network__cards__card">
            <Image
              src={"/assets/icons/profileView.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="manage-network__cards__card__group">
            <div>Total Contact click</div>
          <div className="manage-network__cards__card__number-mini">
            {/* 500 */}
            {getCardValue(analyticsData?.recentActivity?.contacts, 500)}
          </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message" style={{ 
          color: 'red', 
          margin: '10px 0', 
          padding: '10px', 
          backgroundColor: '#ffe6e6', 
          borderRadius: '4px' 
        }}>
          Error loading analytics: {error}
        </div>
      )}

      <div className="manage-network__title">My Networks</div>
      <ManageNetworkTable />
    </div>
  );
}
