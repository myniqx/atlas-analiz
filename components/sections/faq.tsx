"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ColoredHeader } from "@/components/colored-header"

interface FaqProps {
  content: {
    title: string
    questions: {
      question: string
      answer: string
    }[]
  }
}

export function Faq({ content }: FaqProps) {
  return (
    <section id="faq" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <ColoredHeader h={2} className="text-3xl font-bold text-center mb-12">
          {content.title}
        </ColoredHeader>

        <Accordion type="single" collapsible className="w-full">
          {content.questions.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
