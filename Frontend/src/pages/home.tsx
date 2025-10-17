import { Button } from "@/components/ui/button";
import { Calendar, Heart, Shield, Users, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: <Calendar className="w-12 h-12 text-blue-600" />,
      title: "Easy Scheduling",
      description:
        "Book appointments with top doctors in seconds, anytime, anywhere.",
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "Real-Time Availability",
      description:
        "View real-time doctor schedules and choose slots that work for you.",
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Secure & Private",
      description:
        "Your health data is protected with enterprise-grade security.",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Expert Healthcare",
      description:
        "Access to verified healthcare professionals across urban hospitals.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Patients Served" },
    { number: "500+", label: "Healthcare Providers" },
    { number: "50+", label: "Partner Hospitals" },
    { number: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="w-full">

      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Award className="w-5 h-5 text-yellow-300" />
            <span className="text-white text-sm font-medium">
              Award-Winning Healthcare Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Health,
            <br />
            <span className="text-blue-300">Our Priority</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Experience seamless healthcare management with our smart booking
            system. Connect with top doctors across urban hospitals instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking/create">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full shadow-xl"
              >
                Book Appointment Now
                <Calendar className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 rounded-full"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing healthcare access in urban areas with
              cutting-edge technology and compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Create Account
              </h3>
              <p className="text-gray-600">
                Sign up in seconds with your basic information and get instant
                access to our platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Choose Doctor
              </h3>
              <p className="text-gray-600">
                Browse available doctors, view their schedules, and select the
                perfect time slot.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Get Treated
              </h3>
              <p className="text-gray-600">
                Receive your QR code confirmation and arrive for your
                appointment with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/85"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium text-white mb-6">
            "This platform has transformed how I manage my healthcare. Booking
            appointments is now effortless, and I love the instant confirmation
            with QR codes!"
          </blockquote>
          <div className="text-blue-200">
            <p className="font-semibold text-lg">Sarah Johnson</p>
            <p>Regular Patient</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of satisfied patients who trust our platform for
            their healthcare needs.
          </p>
          <Link to="/auth/signup">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-12 py-6 rounded-full shadow-xl"
            >
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart Healthcare</h3>
              <p className="text-gray-400">
                Revolutionizing urban healthcare with smart technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/booking/create" className="hover:text-white">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link to="/auth/signin" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/auth/signup" className="hover:text-white">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Smart Healthcare System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
