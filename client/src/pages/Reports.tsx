import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Download, 
  Plus, 
  Eye, 
  Edit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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


      {/* Applications Table */}
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
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border p-2 text-left text-gray-700 dark:text-gray-200">Application ID</th>
            <th className="border p-2 text-left text-gray-700 dark:text-gray-200">Applicant Name</th>
            <th className="border p-2 text-left text-gray-700 dark:text-gray-200">Shop Name</th>
            <th className="border p-2 text-left text-gray-700 dark:text-gray-200">Status</th>
            <th className="border p-2 text-left text-gray-700 dark:text-gray-200">Submitted Date</th>
            <th className="border p-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((application, idx) => (
            <tr
              key={application.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              data-testid={`application-row-${application.id}`}
            >
              <td className="border p-2 font-medium">{application.id}</td>
              <td className="border p-2">{application.applicantName}</td>
              <td className="border p-2">{application.shopName}</td>
              <td className="border p-2">{getStatusBadge(application.status)}</td>
              <td className="border p-2 text-muted-foreground">
                {new Date(application.submittedDate).toLocaleDateString()}
              </td>
              <td className="border p-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
