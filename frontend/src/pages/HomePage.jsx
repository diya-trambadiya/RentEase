import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowRight, Star, Check } from "lucide-react"
import { Button } from "../components/ui/button"
import { featuredProducts, categories } from "../data/products"

export default function HomePage() {
  // Filter out any undefined products to prevent errors
  const validFeaturedProducts = featuredProducts.filter((product) => product !== undefined)

  return (
    <>
      <Helmet>
        <title>RentEase - Furniture & Appliance Rentals for PG & Rented Homes</title>
        <meta
          name="description"
          content="Rent high-quality furniture and appliances for your PG accommodation or rented home. No long-term commitments, just affordable solutions."
        />
      </Helmet>

      <div>
        {/* Hero Section */}
        <section className="relative h-[655px] flex items-center   -mt-16">

          <img
            src="\images\hero-image.jpg"
            alt="Modern living space with rental furniture"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Furnish Your Space Without Commitment</h1>
              <p className="text-xl mb-8">
                Perfect for PG accommodations and rented homes. Rent high-quality furniture and appliances without the
                hassle of ownership.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/products">Browse Products</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                  <Link to="/products?category=electronics">Electronics</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="group relative h-64 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={category.image || "/placeholder.svg?height=400&width=600"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                      <div className="flex items-center text-white/90 text-sm">
                        <span>Explore</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Popular for PG & Rentals</h2>
              <Button asChild variant="outline">
                <Link to="/products">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {validFeaturedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64">
                    <img
                      src={product.image || "/placeholder.svg?height=400&width=600"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Most Popular
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                      {product.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700">₹{product.priceDaily}/day</p>
                        <p className="text-xs text-gray-500">₹{product.priceMonthly}/month</p>
                      </div>
                      <Button asChild size="sm">
                        <Link to={`/products/${product.id}`}>Rent Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose RentEase</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">No Large Investments</h3>
                <p className="text-gray-600">
                  Save your money for other priorities. No need to invest large amounts in furniture and appliances.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Rental Periods</h3>
                <p className="text-gray-600">
                  Rent for as long as you need - daily, weekly, or monthly plans available.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Free Delivery & Setup</h3>
                <p className="text-gray-600">We deliver, assemble, and set up your rented items at no extra cost.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
                <p className="text-gray-600">Moving out? We'll pick up the items when your rental period ends.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PG & Rental Packages */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Room Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img src="/images/package-bedroom.jpg" alt="Bedroom Package" className="w-full h-full object-cover" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Bedroom Package</h3>
                    <p className="text-sm opacity-90">Everything you need for a comfortable sleep</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Bed with comfortable mattress</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Bedside table with lamp</p>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Wardrobe for storage</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">From ₹1,499/month</p>
                    <Button asChild size="sm">
                      <Link to="/products?package=bedroom">View Package</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src="/images/package-livingroom.avif"
                    alt="Living Room Package"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Living Room Package</h3>
                    <p className="text-sm opacity-90">Create a cozy living space</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Comfortable sofa set</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Coffee table and TV stand</p>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Floor lamp and decor items</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">From ₹1,999/month</p>
                    <Button asChild size="sm">
                      <Link to="/products?package=living">View Package</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src="/images/package-electronics.webp"
                    alt="Electronics Package"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Electronics Package</h3>
                    <p className="text-sm opacity-90">Essential gadgets for modern living</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">32-inch Smart TV</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Refrigerator and microwave</p>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Washing machine</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">From ₹2,499/month</p>
                    <Button asChild size="sm">
                      <Link to="/products?package=electronics">View Package</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How RentEase Works</h2>
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Browse & Select</h3>
                  <p className="text-gray-600 text-sm">
                    Choose from our wide range of furniture, appliances, and electronics.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Select Rental Period</h3>
                  <p className="text-gray-600 text-sm">
                    Choose how long you need the items - daily, weekly, or monthly options available.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Free Delivery & Setup</h3>
                  <p className="text-gray-600 text-sm">
                    We deliver and set up your items at your preferred location and time.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Return or Extend</h3>
                  <p className="text-gray-600 text-sm">
                    Return the items when your rental period ends or extend if you need them longer.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/products">Start Browsing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden relative mr-4">
                    <img src="/images/testimonial-1.jpg" alt="Customer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold">Rahul Sharma</h4>
                    <p className="text-gray-600 text-sm">IT Professional, Bangalore</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "As someone who relocates every few years for work, RentEase has been a lifesaver. I don't have to
                  worry about selling furniture or paying for transportation when I move."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden relative mr-4">
                    <img src="/images/testimonial-2.jpg" alt="Customer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold">Priya Patel</h4>
                    <p className="text-gray-600 text-sm">Student, Mumbai</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "Perfect for my PG accommodation! I rented a study table, chair, and a mini-fridge. The prices are
                  student-friendly and the quality is excellent."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden relative mr-4">
                    <img src="/images/testimonial-3.jpg" alt="Customer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold">Amit Verma</h4>
                    <p className="text-gray-600 text-sm">Startup Founder, Delhi</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "We furnished our entire startup office with RentEase. It helped us manage our cash flow better in the
                  early stages. Highly recommended for new businesses!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Cities We Serve</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Bangalore",
                "Mumbai",
                "Delhi",
                "Hyderabad",
                "Chennai",
                "Pune",
                "Kolkata",
                "Ahmedabad",
                "Jaipur",
                "Surat",
              ].map((city) => (
                <div
                  key={city}
                  className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <p className="font-medium">{city}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 text-gray-600">
              <p>
                Don't see your city?{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  Contact us
                </Link>{" "}
                to check availability.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made their living spaces comfortable without the commitment
              of buying.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/products">Browse Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
