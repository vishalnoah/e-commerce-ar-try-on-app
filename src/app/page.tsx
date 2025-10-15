"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "@/lib/auth-client";
import { ShoppingBag, Sparkles, Camera, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Animated Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Fashion Meets{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  AR Technology
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Experience the future of online shopping with our revolutionary AR try-on feature. See how clothes look on you before you buy!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {session?.user ? (
                  <Link href="/products">
                    <Button size="lg" className="text-lg px-8 py-6">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Shop Now
                    </Button>
                  </Link>
                ) : (
                  <Link href="/sign-up">
                    <Button size="lg" className="text-lg px-8 py-6">
                      Get Started Free
                    </Button>
                  </Link>
                )}
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Camera className="mr-2 h-5 w-5" />
                  Try AR Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                  alt="Fashion Shopping"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-xl"
              >
                <Sparkles className="h-8 w-8 text-yellow-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose FashionAR?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Shop smarter with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl"
            >
              <Camera className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                AR Try-On
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use your webcam to see how clothes look on you in real-time with advanced pose detection technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl"
            >
              <ShoppingBag className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Vast Collection
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse thousands of clothing items from top brands for both men and women across all sizes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl"
            >
              <Shield className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Secure Shopping
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Shop with confidence knowing your data is protected with enterprise-grade security.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Shopping?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who are shopping smarter with AR technology
            </p>
            {!session?.user && (
              <Link href="/sign-up">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Create Your Free Account
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}