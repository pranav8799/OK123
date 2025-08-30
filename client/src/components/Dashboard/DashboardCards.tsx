import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  HourglassIcon 
} from 'lucide-react';
import { DashboardStats } from '@/types/kyc';

interface DashboardCardsProps {
  stats: DashboardStats;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications.toLocaleString(),
      icon: FileText,
      change: '+12.5%',
      changeLabel: 'from last month',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      testId: 'total-applications'
    },
    {
      title: 'Approved',
      value: stats.approved.toLocaleString(),
      icon: CheckCircle,
      change: `${stats.approvalRate}%`,
      changeLabel: 'approval rate',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      testId: 'approved-applications'
    },
    {
      title: 'Rejected',
      value: stats.rejected.toLocaleString(),
      icon: XCircle,
      change: `${stats.rejectionRate}%`,
      changeLabel: 'rejection rate',
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      testId: 'rejected-applications'
    },
    {
      title: 'In Process',
      value: stats.inProcess.toLocaleString(),
      icon: Clock,
      change: `${stats.processingRate}%`,
      changeLabel: 'processing',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      testId: 'in-process-applications'
    },
    {
      title: 'Pending',
      value: stats.pending.toLocaleString(),
      icon: HourglassIcon,
      change: `${stats.pendingRate}%`,
      changeLabel: 'pending',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      testId: 'pending-applications'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card) => (
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
                  {card.value}
                </p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className={`${card.color} text-xl h-6 w-6`} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`${card.color} text-sm font-medium`}>
                {card.change}
              </span>
              <span className="text-muted-foreground text-sm ml-1">
                {card.changeLabel}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
