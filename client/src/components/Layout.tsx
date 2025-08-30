import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  UserCheck, 
  TrendingUp, 
  Moon, 
  Sun, 
  Menu, 
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'KYC Application', href: '/kyc', icon: UserCheck },
    { name: 'Reports', href: '/reports', icon: TrendingUp },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="h-full bg-background text-foreground">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border shadow-lg transform transition-transform duration-200 ease-in-out z-30",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-primary" data-testid="app-title">
            KYC CRM
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
            data-testid="close-sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6">
          <div className="px-6 mb-6">
            <Button
              onClick={toggleTheme}
              variant="outline"
              className="w-full justify-start"
              data-testid="theme-toggle"
            >
              {theme === 'dark' ? (
                <Sun className="mr-3 h-4 w-4" />
              ) : (
                <Moon className="mr-3 h-4 w-4" />
              )}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
          
          <div className="space-y-1 px-4">
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      "nav-link flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                      isActive 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-card shadow-md"
          data-testid="open-sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {children}
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
          data-testid="sidebar-overlay"
        />
      )}
    </div>
  );
};

export default Layout;
