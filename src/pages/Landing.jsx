import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Sparkles,
  TrendingUp,
  Code,
  Palette,
  Music,
  Languages,
  Camera,
  Dumbbell,
} from "lucide-react";
// import Navbar from "@/components/Navbar";
import heroImage from "../assets/hero-image.jpg";
import BeforeLoginNavbar from "../components/Navbar/BeforeLoginNavbar";

/* -----------------------------------
   Reusable local UI components 
   (instead of external imports)
----------------------------------- */

// A small Tailwind-based Button replacement
const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
    outline:
      "border border-border text-foreground hover:bg-muted hover:text-foreground",
    hero: "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-8 py-6 text-lg",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Simple Card wrapper for layout & styling consistency
const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-2xl shadow-md bg-card text-card-foreground p-6 glass ${className}`}
    {...props}
  >
    {children}
  </div>
);

/* -----------------------------------
   Landing Page Component
----------------------------------- */

const Landing = () => {
  const howItWorks = [
    {
      icon: Users,
      title: "Create Your Profile",
      description:
        "Sign up and list the skills you want to offer and learn",
    },
    {
      icon: Sparkles,
      title: "Find Matches",
      description:
        "Our smart algorithm connects you with perfect skill exchange partners",
    },
    {
      icon: TrendingUp,
      title: "Start Swapping",
      description:
        "Exchange skills, grow together, and build lasting connections",
    },
  ];

  const topSkills = [
    { icon: Code, name: "Web Development", color: "from-primary to-primary/80" },
    { icon: Palette, name: "Graphic Design", color: "from-secondary to-secondary/80" },
    { icon: Music, name: "Music Lessons", color: "from-accent to-accent/80" },
    { icon: Languages, name: "Language Exchange", color: "from-primary to-secondary" },
    { icon: Camera, name: "Photography", color: "from-secondary to-accent" },
    { icon: Dumbbell, name: "Fitness Training", color: "from-accent to-primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <BeforeLoginNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-hero">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Trade Your Skills,{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Not Money
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect with people who want to learn what you know, and teach you what they know. 
                Build skills, save money, and grow your network.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button variant="hero" size="lg">
                    Get Started <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/match">
                  <Button variant="outline" size="lg">
                    Explore Skills
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-float">
              <img
                src={heroImage}
                alt="People collaborating and sharing skills"
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to start exchanging skills
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className="p-8 hover-lift border-2">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Skills */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Skills to Exchange</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands learning and teaching these skills
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {topSkills.map((skill, index) => (
              <Card key={index} className="p-6 hover-lift cursor-pointer group border-2">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-sm">{skill.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="gradient-primary p-12 text-center text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community and discover the power of skill exchange
            </p>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Create Free Account <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>
            &copy; 2025 SkillSwap. Built with ❤️ for learners and teachers
            everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;