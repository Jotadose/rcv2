import HeroSectionLauncher from "@/components/home/HeroSectionLauncher";
import HomeOverlays from "@/components/home/HomeOverlays";
import { HomePageProvider } from "@/components/home/HomePageProvider";
import SiteHeader from "@/components/home/SiteHeader";
import SiteFooter from "@/components/home/SiteFooter";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ContactSection from "@/components/home/ContactSection";
import InstagramEmbedGrid from "@/components/InstagramEmbedGrid";
import ServicesSection from "@/components/ServicesSection";

export default function HomePage() {
  return (
    <HomePageProvider>
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <HeroSectionLauncher />
        <ServicesSection />
        <WhyChooseSection />
        <InstagramEmbedGrid limit={4} />
        <ContactSection />
        <SiteFooter />
        <WhatsAppFloat />
        <HomeOverlays />
      </div>
    </HomePageProvider>
  );
}
