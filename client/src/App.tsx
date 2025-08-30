import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import KYCApplication from "@/pages/KYCApplication";
import Reports from "@/pages/Reports";
import NotFound from "@/pages/not-found";
import ApplicationsPage from "@/pages/ApplicationsPage";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/kyc" component={KYCApplication} />
        <Route path="/reports" component={Reports} />
        <Route path="/applications/:status" component={ApplicationsPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
