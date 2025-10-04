import { Leaf, Heart, Recycle, Award, Users, Globe } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: '100% Natural Ingredients',
      description: 'We use only the purest natural ingredients sourced from trusted suppliers around the world.'
    },
    {
      icon: Heart,
      title: 'Cruelty-Free & Vegan',
      description: 'Our products are never tested on animals and contain no animal-derived ingredients.'
    },
    {
      icon: Recycle,
      title: 'Sustainable Packaging',
      description: 'We use eco-friendly, recyclable packaging to minimize our environmental impact.'
    },
    {
      icon: Award,
      title: 'Dermatologically Tested',
      description: 'All our products are tested by dermatologists to ensure they are safe for all skin types.'
    },
    {
      icon: Users,
      title: 'Ethically Sourced',
      description: 'We work directly with local communities to source ingredients fairly and sustainably.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'We are committed to making a positive impact on both people and the planet.'
    }
  ]

  const processSteps = [
    {
      number: 1,
      title: 'Research & Development',
      description: 'Our team of experts researches the latest natural ingredients and formulations to create effective products.'
    },
    {
      number: 2,
      title: 'Sourcing',
      description: 'We carefully select suppliers who share our values and provide the highest quality natural ingredients.'
    },
    {
      number: 3,
      title: 'Formulation',
      description: 'Our chemists work to create the perfect balance of natural ingredients for maximum effectiveness.'
    },
    {
      number: 4,
      title: 'Testing',
      description: 'Every product undergoes rigorous testing to ensure safety, efficacy, and quality standards.'
    },
    {
      number: 5,
      title: 'Packaging',
      description: 'We use sustainable, eco-friendly packaging that protects our products and the environment.'
    },
    {
      number: 6,
      title: 'Delivery',
      description: 'Your products are carefully packaged and delivered to your doorstep with love and care.'
    }
  ]

  const teamMembers = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Founder & CEO',
      description: 'Dermatologist with 15+ years of experience in natural skincare',
      image: '/assets/team/priya.jpg'
    },
    {
      name: 'Anita Patel',
      role: 'Head of Product Development',
      description: 'Cosmetic chemist specializing in natural formulations',
      image: '/assets/team/anita.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Sustainability Director',
      description: 'Environmental scientist focused on sustainable beauty practices',
      image: '/assets/team/rajesh.jpg'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About The Chandra Bella Naturals
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We believe that true beauty comes from within and is enhanced by pure, natural ingredients. 
              Our mission is to provide you with the finest natural beauty products that care for your skin 
              and the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2020 by a team of passionate beauty enthusiasts and natural skincare experts, 
                    The Chandra Bella Naturals was born from a simple belief: beauty should be natural, 
                    sustainable, and accessible to everyone.
                  </p>
                  <p>
                    Our journey began when our founders discovered the incredible benefits of traditional 
                    Indian beauty practices combined with modern skincare science. We started small, 
                    crafting our first products in a small kitchen laboratory, testing formulations 
                    with friends and family.
                  </p>
                  <p>
                    Today, we&apos;re proud to serve thousands of customers worldwide, all while maintaining 
                    our commitment to purity, sustainability, and ethical practices.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/assets/logo.png" 
                  alt="The Chandra Bella Naturals Logo" 
                  className="h-80 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-[var(--color-surface)]">
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
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--brand-secondary)] rounded-full mb-6">
                  <value.icon size={32} className="text-[var(--brand-primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--brand-primary)] mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From concept to your doorstep, here&apos;s how we create our natural beauty products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--brand-primary)] text-white rounded-full text-2xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-[var(--brand-primary)] mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind The Chandra Bella Naturals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-accent)] rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-[var(--brand-primary)] mb-2">
                  {member.name}
                </h3>
                <p className="text-[var(--brand-accent)] font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-6">
              Our Commitment
            </h2>
            <div className="space-y-6 text-gray-600 text-lg">
              <p>
                We are committed to making a positive impact on both your skin and the environment. 
                Our products are designed to work in harmony with your body's natural processes, 
                enhancing your natural beauty without compromising on safety or sustainability.
              </p>
              <p>
                Every product we create is a testament to our belief that beauty should be pure, 
                natural, and accessible to everyone. We continuously strive to improve our 
                formulations, packaging, and processes to better serve our customers and the planet.
              </p>
              <p className="text-xl font-semibold text-[var(--brand-primary)]">
                Join us in our mission to embrace natural beauty and make the world a more 
                beautiful place, one product at a time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About