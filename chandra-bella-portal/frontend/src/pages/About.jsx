import { Leaf, Heart, Recycle, Award, Globe, Shield } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: '100% Natural Ingredients',
      description: 'We use only the purest botanical extracts and natural ingredients sourced from certified organic farms'
    },
    {
      icon: Heart,
      title: 'Cruelty-Free & Vegan',
      description: 'Never tested on animals, always kind to all living beings. All our products are 100% vegan'
    },
    {
      icon: Recycle,
      title: 'Sustainable Packaging',
      description: 'Eco-friendly packaging that cares for our planet. We use recyclable and biodegradable materials'
    },
    {
      icon: Award,
      title: 'Dermatologically Tested',
      description: 'All products are tested by dermatologists and safe for all skin types'
    },
    {
      icon: Globe,
      title: 'Ethically Sourced',
      description: 'We work directly with local farmers and suppliers to ensure fair trade practices'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every product undergoes rigorous quality testing to ensure the highest standards'
    }
  ]

  const processSteps = [
    {
      number: 1,
      title: 'Research & Development',
      description: 'Our team of experts researches traditional beauty practices and modern skincare science to create effective formulations.'
    },
    {
      number: 2,
      title: 'Ingredient Sourcing',
      description: 'We source the finest natural ingredients from certified organic farms and ethical suppliers worldwide.'
    },
    {
      number: 3,
      title: 'Formulation',
      description: 'Our skilled formulators create products using traditional methods combined with modern technology.'
    },
    {
      number: 4,
      title: 'Testing & Quality Control',
      description: 'Every product undergoes extensive testing to ensure safety, efficacy, and quality before reaching you.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Founded with a passion for natural beauty, The Chandra Bella Naturals believes that true beauty comes from within and is enhanced by pure, natural ingredients.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              To provide pure, natural beauty products that enhance your inherent radiance while caring for your skin and the environment. We are committed to creating products that are not only effective but also sustainable and ethically sourced.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-6 text-center">
              Our Journey
            </h2>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                Founded in 2020 by a team of passionate beauty enthusiasts and natural skincare experts, The Chandra Bella Naturals was born from a simple belief: beauty should be natural, sustainable, and accessible to everyone. Our journey began when our founders discovered the incredible benefits of traditional Indian beauty practices combined with modern skincare science.
              </p>
              <p className="text-lg leading-relaxed">
                We started small, crafting our first products in a small kitchen laboratory, testing formulations with friends and family. Today, we're proud to serve thousands of customers worldwide, all while maintaining our commitment to purity, sustainability, and ethical practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do, from product development to customer service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--brand-secondary)] rounded-full mb-4 group-hover:bg-[var(--brand-primary)] transition-colors">
                  <value.icon size={32} className="text-[var(--brand-primary)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--brand-primary)] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From concept to your doorstep, here's how we create our natural beauty products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] transform translate-x-8" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-[var(--brand-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-6">
              Our Commitment
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                We are committed to making a positive impact on both your skin and the environment. Our products are designed to work in harmony with your body's natural processes, enhancing your natural beauty without compromising on safety or sustainability.
              </p>
              <p>
                Join us in our mission to embrace natural beauty and make the world a more beautiful place, one product at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Embrace Your Natural Beauty?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover our carefully curated collection of natural beauty products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="btn btn--lg bg-white text-[var(--brand-primary)] hover:bg-gray-100">
              Shop Now
            </a>
            <a href="/contact" className="btn btn--lg btn--outline border-white text-white hover:bg-white hover:text-[var(--brand-primary)]">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
