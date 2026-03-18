import Link from "next/link"
import { Compass, MapPin, Phone, Mail, Clock } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Heritage Map" },
  { href: "/events", label: "Cultural Events" },
  { href: "/virtual-tour", label: "Virtual Tours" },
  { href: "/crowd-prediction", label: "Crowd Prediction" },
]

const resources = [
  { label: "Travel Guidelines" },
  { label: "Accessibility Info" },
  { label: "Photography Rules" },
  { label: "Group Bookings" },
  { label: "FAQs" },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Heritage Explorer
              </span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Discover the rich cultural heritage and historical monuments. Plan your visit with real-time crowd predictions and explore virtually from anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm cursor-pointer">
                    {resource.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-heritage-clay" />
                <span className="text-primary-foreground/80">
                  Tourism Office, Heritage District<br />
                  Cultural City, 100001
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-heritage-clay" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-heritage-clay" />
                <span className="text-primary-foreground/80">info@heritageexplorer.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-heritage-clay" />
                <span className="text-primary-foreground/80">Mon - Sat: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Heritage Explorer. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-primary-foreground/60 text-sm cursor-pointer hover:text-primary-foreground transition-colors">
                Privacy Policy
              </span>
              <span className="text-primary-foreground/60 text-sm cursor-pointer hover:text-primary-foreground transition-colors">
                Terms of Service
              </span>
              <span className="text-primary-foreground/60 text-sm cursor-pointer hover:text-primary-foreground transition-colors">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
