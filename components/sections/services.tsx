import { ColoredHeader } from "@/components/colored-header"
import {
  GraduationCap,
  ScrollText,
  FileEdit,
  BarChart2,
  FileSearch,
  BookOpen,
  Languages,
  FlaskConical,
} from "lucide-react"

interface ServicesProps {
  content: {
    title: string
    services: {
      title: string
      icon?: string
      description: string
    }[]
  }
}

export function Services({ content }: ServicesProps) {
  // Map of icon names to their components
  const iconMap = {
    GraduationCap: <GraduationCap className="h-10 w-10 mb-4" />,
    ScrollText: <ScrollText className="h-10 w-10 mb-4" />,
    FileEdit: <FileEdit className="h-10 w-10 mb-4" />,
    BarChart2: <BarChart2 className="h-10 w-10 mb-4" />,
    FileSearch: <FileSearch className="h-10 w-10 mb-4" />,
    BookOpen: <BookOpen className="h-10 w-10 mb-4" />,
    Languages: <Languages className="h-10 w-10 mb-4" />,
    FlaskConical: <FlaskConical className="h-10 w-10 mb-4" />,
  }

  return (
    <section id="services" className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4">
        <ColoredHeader h={2} className="text-3xl font-bold text-center mb-12">
          {content.title}
        </ColoredHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {service.icon && iconMap[service.icon as keyof typeof iconMap]}
              <ColoredHeader h={3} className="text-xl font-semibold mb-3">
                {service.title}
              </ColoredHeader>
              <p className="text-gray-600 pt-2 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
