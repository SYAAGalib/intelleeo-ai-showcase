import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import DevNest from "./pages/DevNest";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import ProjectDetail from "./pages/ProjectDetail";
import Technologies from "./pages/Technologies";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import HeroEditor from "./pages/admin/HeroEditor";
import AboutEditor from "./pages/admin/AboutEditor";
import ContactEditor from "./pages/admin/ContactEditor";
import ProjectsManager from "./pages/admin/ProjectsManager";
import TechnologiesManager from "./pages/admin/TechnologiesManager";
import BlogManager from "./pages/admin/BlogManager";
import TeamManager from "./pages/admin/TeamManager";
import MessagesManager from "./pages/admin/MessagesManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="devnest" element={<DevNest />} />
            <Route path="technologies" element={<Technologies />} />
            <Route path="about" element={<About />} />
            <Route path="team" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<Blog />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="hero" element={<HeroEditor />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="contact" element={<ContactEditor />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="technologies" element={<TechnologiesManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="messages" element={<MessagesManager />} />
          </Route>
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
