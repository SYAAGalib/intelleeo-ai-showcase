import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { FloatingChat } from './FloatingChat';
import { SocialMediaFloat } from './SocialMediaFloat';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingChat />
      <SocialMediaFloat />
    </div>
  );
};