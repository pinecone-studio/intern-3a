import { Card } from 'libs/shared/shadcn/src';
import { Building2, Calendar, TrendingUp, Users } from 'lucide-react';
import { AppLayout } from './_components/AppLayout';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Employees',
      value: '1,234',
      change: '+12%',
      icon: Users,
    },
    {
      title: 'Departments',
      value: '24',
      change: '+2',
      icon: Building2,
    },
    {
      title: 'Present Today',
      value: '1,180',
      change: '95.6%',
      icon: Calendar,
    },
    {
      title: 'Monthly Growth',
      value: '8.2%',
      change: '+1.2%',
      icon: TrendingUp,
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your workforce.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground">Your employee management content will appear here...</p>
        </Card>
      </div>
    </AppLayout>
  );
}
