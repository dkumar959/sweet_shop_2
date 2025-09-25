import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Candy, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Candy className="h-12 w-12 text-pink-600" />,
      title: 'Premium Sweets',
      description: 'Discover our carefully curated selection of the finest candies and treats from around the world.',
    },
    {
      icon: <ShoppingBag className="h-12 w-12 text-purple-600" />,
      title: 'Easy Shopping',
      description: 'Browse, filter, and purchase your favorite sweets with our user-friendly interface.',
    },
    {
      icon: <Star className="h-12 w-12 text-orange-600" />,
      title: 'Quality Assured',
      description: 'Every sweet in our shop is tested for quality and freshness to ensure the best experience.',
    },
  ];

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-6"
            >
              Sweet Shop 🍭
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Your one-stop destination for the most delicious and delightful sweets. 
              From classic candies to modern treats, we've got something sweet for everyone!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full">
                <Link to="/dashboard">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
                <Link to="/register">Join Sweet Shop</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 left-10 text-6xl opacity-20"
          >
            🍬
          </motion.div>
          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-40 right-20 text-5xl opacity-20"
          >
            🍭
          </motion.div>
          <motion.div
            animate={{ y: [-5, 15, -5], rotate: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-40 left-20 text-4xl opacity-20"
          >
            🧁
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Why Choose Sweet Shop?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're passionate about bringing you the best sweet experience with quality products and exceptional service.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-0 text-center hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 flex justify-center"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Something Sweet? 🍯
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of happy customers who trust Sweet Shop for their candy needs. 
              Start your sweet journey today!
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-6 rounded-full text-purple-600 hover:text-purple-700"
            >
              <Link to="/dashboard">
                Explore Our Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;