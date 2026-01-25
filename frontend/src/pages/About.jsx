const About = () => {
    return (
      <main className="min-h-screen px-6 py-12 bg-background text-foreground">
        <section className="max-w-5xl mx-auto space-y-10">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-balance">About Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Delivering comfort, style, and affordability — one furniture rental at a time.
            </p>
          </div>
  
          {/* Highlight Section */}
          <div className="bg-secondary text-secondary-foreground rounded-2xl shadow-sm p-6 md:p-10 space-y-6">
            <h2 className="text-3xl font-semibold">Who We Are</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              We’re a team of design lovers, logistics experts, and problem solvers on a mission to revolutionize how people furnish their spaces. Whether you're settling into a new home, outfitting your office, or staging a property — our flexible furniture rental plans are designed to meet your needs.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Our collection features modern, well-crafted furniture pieces that bring function and beauty into your space — without the commitment of buying.
            </p>
          </div>
  
          {/* Values Section */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Flexibility',
                description: 'Rent by month, upgrade anytime, or cancel when your needs change.',
              },
              {
                title: 'Quality',
                description: 'Curated collections from trusted brands — clean, modern, and durable.',
              },
              {
                title: 'Service',
                description: 'We handle delivery, setup, and pickup — all you have to do is enjoy.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  };
  
  export default About;
  