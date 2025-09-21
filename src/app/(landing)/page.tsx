import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Calendar, Clock, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduOrganize</span>
            </div>
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Complete
            <span className="text-primary-600"> Academic Hub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your college experience with integrated timetables, assignments, materials, and collaborative
            learning - all in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Academic Success</h2>
            <p className="text-lg text-gray-600">
              Powerful features designed for students, teachers, and administrators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary-600 mb-2" />
                <CardTitle>Smart Timetables</CardTitle>
                <CardDescription>Personalized schedules with real-time updates and notifications</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>Access all your study materials, notes, and resources in one place</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Assignment Tracking</CardTitle>
                <CardDescription>Never miss a deadline with smart assignment management</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle>Q&A Forums</CardTitle>
                <CardDescription>Collaborative learning through doubt resolution and discussions</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-red-600 mb-2" />
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>Tailored experiences for students, teachers, and administrators</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-indigo-600 mb-2" />
                <CardTitle>Offline Sync</CardTitle>
                <CardDescription>Work offline and sync when connected - never lose your progress</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Academic Experience?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students and educators already using EduOrganize
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-primary-400" />
            <span className="ml-2 text-lg font-semibold">EduOrganize</span>
          </div>
          <p className="text-center text-gray-400 mt-4">
            © {new Date().getFullYear()} EduOrganize. Empowering education through technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
