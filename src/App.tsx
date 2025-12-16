import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

// Eager loaded pages (critical for initial render)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loaded public pages
const DevNest = lazy(() => import("./pages/DevNest"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Technologies = lazy(() => import("./pages/Technologies"));
const Blog = lazy(() => import("./pages/Blog"));
const Services = lazy(() => import("./pages/Services"));

// Lazy loaded admin pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const HeroEditor = lazy(() => import("./pages/admin/HeroEditor"));
const AboutEditor = lazy(() => import("./pages/admin/AboutEditor"));
const ContactEditor = lazy(() => import("./pages/admin/ContactEditor"));
const ProjectsManager = lazy(() => import("./pages/admin/ProjectsManager"));
const TechnologiesManager = lazy(() => import("./pages/admin/TechnologiesManager"));
const BlogManager = lazy(() => import("./pages/admin/BlogManager"));
const TeamManager = lazy(() => import("./pages/admin/TeamManager"));
const MessagesManager = lazy(() => import("./pages/admin/MessagesManager"));
const ChatSettingsManager = lazy(() => import("./pages/admin/ChatSettingsManager"));
const TestimonialsManager = lazy(() => import("./pages/admin/TestimonialsManager"));
const ServicesManager = lazy(() => import("./pages/admin/ServicesManager"));
const NewsletterManager = lazy(() => import("./pages/admin/NewsletterManager"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="text-muted-foreground animate-pulse">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
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
                <Route path="services" element={<Services />} />
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
                <Route path="services" element={<ServicesManager />} />
                <Route path="technologies" element={<TechnologiesManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="blog" element={<BlogManager />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="newsletter" element={<NewsletterManager />} />
                <Route path="messages" element={<MessagesManager />} />
                <Route path="chat-settings" element={<ChatSettingsManager />} />
              </Route>
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
