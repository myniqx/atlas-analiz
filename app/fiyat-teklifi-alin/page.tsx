
import { BackgroundImage } from "@/components/background-image";
import { ColoredHeader } from "@/components/colored-header";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { contactInfo, footer, images } from "@/data/site-content";
import { RequestForm } from "@/components/sections/request-form";

export const dynamic = 'force-static'

export default function PricePage() {


  return (
      <div className="container mx-auto px-4 py-32 md:py-40">
        <div className="max-w-3xl mx-auto bg-white/30 backdrop-blur-sm p-8 rounded-lg shadow-sm">
          <ColoredHeader h={1} className="text-3xl font-bold mb-8 text-center">
            Hizmet Başvuru Formu
          </ColoredHeader>

          <p className="text-gray-600 mb-8 text-center">
            Akademik çalışmanız için destek almak üzere aşağıdaki formu
            doldurarak başvurunuzu yapabilirsiniz.
            <br />
            <span className="text-sm">* işaretli alanlar zorunludur.</span>
          </p>

        <RequestForm />
      </div>
    </div>
  );
}
