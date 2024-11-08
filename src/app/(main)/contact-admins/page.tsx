import { ContactForm } from "@/features/contact-admins/components/contact-form";

const ContactAdminsPage = () => {
  return (
    <main className="w-[88vw] max-w-[1392px] mx-auto min-h-[calc(100vh-160px)]">
      <section className="my-[60px] block">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_max-content] grid-cols-1 gap-12">
            <div className="lg:max-w-[413px] max-w-[600px] text-start flex flex-col mx-auto space-y-3">
              <h1 className="text-5xl font-semibold tracking-tight text-balance lg:text-start text-center text-[#1a1a1a]">
                Contact our admins team
              </h1>
              <h2 className="text-base lg:text-start text-center text-[#1a1a1a]">
                Get help with pricing and plans, schedule a demo, 
                explore use-cases for your team, and more.
              </h2>
            </div>
            <div className="lg:max-w-[500px] max-w-[1080px] w-full mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactAdminsPage;