import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function AccordionProgress() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className='text-sm font-medium text-accordion'>Memorandum of Agreement Status Progress</AccordionTrigger>
          <AccordionContent className='py-9 px-4 bg-tag rounded-b-md border border-accent border-t-0 border-b-0'>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  