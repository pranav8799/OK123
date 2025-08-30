import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Send, 
  Settings, 
  Clock, 
  XCircle, 
  Download, 
  Plus, 
  Eye, 
  Edit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { reportsStatusData, reportsTrendData } from '@/lib/mockData';

interface Application {
  id: string;
  applicantName: string;
  shopName: string;
  status: 'submitted' | 'in-process' | 'rejected' | 'not-submitted';
  submittedDate: string;
}

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock applications data
  const applications: Application[] = [
    { id: 'APP-001', applicantName: 'John Doe', shopName: 'ABC Electronics', status: 'submitted', submittedDate: '2024-01-15' },
    { id: 'APP-002', applicantName: 'Jane Smith', shopName: 'XYZ Traders', status: 'in-process', submittedDate: '2024-01-14' },
    { id: 'APP-003', applicantName: 'Robert Johnson', shopName: 'Tech Solutions', status: 'rejected', submittedDate: '2024-01-13' },
    { id: 'APP-004', applicantName: 'Emily Davis', shopName: 'Fashion Hub', status: 'submitted', submittedDate: '2024-01-12' },
    { id: 'APP-005', applicantName: 'Michael Brown', shopName: 'Auto Parts', status: 'not-submitted', submittedDate: '2024-01-11' },
    { id: 'APP-006', applicantName: 'Sarah Wilson', shopName: 'Beauty Store', status: 'in-process', submittedDate: '2024-01-10' },
    { id: 'APP-007', applicantName: 'David Miller', shopName: 'Sports Gear', status: 'submitted', submittedDate: '2024-01-09' },
    { id: 'APP-008', applicantName: 'Lisa Anderson', shopName: 'Book Shop', status: 'rejected', submittedDate: '2024-01-08' },
    { id: 'APP-009', applicantName: 'James Taylor', shopName: 'Grocery Store', status: 'submitted', submittedDate: '2024-01-07' },
    { id: 'APP-010', applicantName: 'Maria Garcia', shopName: 'Flower Shop', status: 'in-process', submittedDate: '2024-01-06' },
  ];

  const summaryCards = [
    {
      title: 'Submitted to LOS',
      value: 625,
      icon: Send,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      testId: 'submitted-to-los'
    },
    {
      title: 'In Process',
      value: 267,
      icon: Settings,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      testId: 'in-process-reports'
    },
    {
      title: 'Rejected',
      value: 189,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      testId: 'rejected-reports'
    },
    {
      title: 'Not Submitted',
      value: 166,
      icon: Clock,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100 dark:bg-gray-900/20',
      testId: 'not-submitted'
    },
  ];

  const pieData = reportsStatusData.labels.map((label, index) => ({
    name: label,
    value: reportsStatusData.datasets[0].data[index],
    color: Array.isArray(reportsStatusData.datasets[0].backgroundColor) 
      ? reportsStatusData.datasets[0].backgroundColor[index] 
      : reportsStatusData.datasets[0].backgroundColor
  }));

  const lineData = reportsTrendData.labels.map((label, index) => ({
    name: label,
    submitted: reportsTrendData.datasets[0].data[index],
    approved: reportsTrendData.datasets[1].data[index]
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Submitted to LOS</Badge>;
      case 'in-process':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">In Process</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Rejected</Badge>;
      case 'not-submitted':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Not Submitted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  const handleExport = () => {
    console.log('Exporting reports data...');
  };

  const handleNewApplication = () => {
    console.log('Creating new application...');
  };

  const handleViewApplication = (id: string) => {
    console.log('Viewing application:', id);
  };

  const handleEditApplication = (id: string) => {
    console.log('Editing application:', id);
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2" data-testid="reports-title">
          Reports
        </h1>
        <p className="text-muted-foreground" data-testid="reports-subtitle">
          Application status tracking and analytics
        </p>
      </div>

      {/* Filter Controls */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40" data-testid="select-date-range">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="last-6-months">Last 6 months</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="select-status-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted to LOS</SelectItem>
                  <SelectItem value="in-process">In Process</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="not-submitted">Not Submitted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button data-testid="apply-filters">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card) => (
          <Card
            key={card.title}
            className="hover:shadow-lg transition-shadow duration-200"
            data-testid={card.testId}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-1">
                    {card.value.toLocaleString()}
                  </p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <card.icon className={`${card.color} text-xl h-6 w-6`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card data-testid="reports-status-distribution">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Application Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value.toLocaleString(), 'Applications']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="reports-trend-chart">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Monthly Application Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'currentColor' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'currentColor' }}
                  />
                  <Tooltip 
                    labelStyle={{ color: 'var(--foreground)' }}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="submitted" 
                    stroke="hsl(210, 100%, 60%)" 
                    strokeWidth={2}
                    name="Submitted"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="approved" 
                    stroke="hsl(163, 91%, 27%)" 
                    strokeWidth={2}
                    name="Approved"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Recent Applications</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport} data-testid="export-button">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button onClick={handleNewApplication} data-testid="new-application-button">
                <Plus className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Shop Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentApplications.map((application) => (
                  <TableRow key={application.id} data-testid={`application-row-${application.id}`}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.applicantName}</TableCell>
                    <TableCell>{application.shopName}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(application.submittedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewApplication(application.id)}
                          data-testid={`view-application-${application.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditApplication(application.id)}
                          data-testid={`edit-application-${application.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground" data-testid="pagination-info">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredApplications.length)} of {filteredApplications.length} results
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                data-testid="previous-page"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  data-testid={`page-${page}`}
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                data-testid="next-page"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
