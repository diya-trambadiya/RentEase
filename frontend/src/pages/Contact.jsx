const Contact = () => {
    return (
      <main className="min-h-screen px-6 py-12 bg-background text-foreground">
        <section className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-balance">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
          </p>
  
          <form className="space-y-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your Name"
                required
              />
            </div>
  
            <div className="flex flex-col">
              <label className="mb-1 font-medium" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com"
                required
              />
            </div>
  
            <div className="flex flex-col">
              <label className="mb-1 font-medium" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                className="px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>
  
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    );
  };
  
  export default Contact;
  