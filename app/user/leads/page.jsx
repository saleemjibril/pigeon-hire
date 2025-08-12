
"use client";

import { useState, useEffect } from "react";
import LeadsTable from "@/app/components/leadsTable";
import Image from "next/image";
import { getUserAnalytics } from "@/app/apis/analyticsService";

export default function Leads() {
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
    <div className="leads">
      <div className="leads__cards">
        <div className="leads__cards__card">
          <Image
            src={"/assets/icons/communities.svg"}
            width={36}
            height={36}
            alt=""
          />
          <div className="leads__cards__card__group">
            <div>Saved Communities</div>
            <div className="leads__cards__card__number">
              {getCardValue(analyticsData?.analytics?.networks, 4)}
            </div>
          </div>
        </div>
        <div className="leads__cards__card">
            <Image
              src={"/assets/icons/savedConnectors.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="leads__cards__card__group">
            <div>Saved Connectors</div>
          <div className="leads__cards__card__number-mini">
            {getCardValue(analyticsData?.recentActivity?.networks, 1200)}
          </div>
          </div>
        </div>
        <div className="leads__cards__card">
            <Image
              src={"/assets/icons/totalContacted.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="leads__cards__card__group">
            <div>Total contacted</div>
          <div className="leads__cards__card__number-mini">
            {getCardValue(analyticsData?.analytics?.totalContacted, 500)}
          </div>
          </div>
        </div>
        <div className="leads__cards__card">
            <Image
              src={"/assets/icons/profilesViewed.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="leads__cards__card__group">
            <div>Total profile viewed</div>
          <div className="leads__cards__card__number-mini">
            {getCardValue(analyticsData?.analytics?.profilesViewed, 500)}
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

      <div className="leads__title">My Leads</div>
      <LeadsTable />
    </div>
  );
}
