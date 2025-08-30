import React from 'react';
import DashboardCards from '@/components/Dashboard/DashboardCards';
import DashboardCharts from '@/components/Dashboard/DashboardCharts';
import { dashboardStats, statusDistributionData, monthlyTrendsData } from '@/lib/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2" data-testid="dashboard-title">
          Dashboard
        </h1>
        <p className="text-muted-foreground" data-testid="dashboard-subtitle">
          Overview of KYC applications and statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <DashboardCards stats={dashboardStats} />
      </div>

      {/* Charts Section */}
      <DashboardCharts 
        statusData={statusDistributionData} 
        trendsData={monthlyTrendsData} 
      />
    </div>
  );
};

export default Dashboard;
