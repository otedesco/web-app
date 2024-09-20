"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";

export default function MinimalFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      // Calculate if the user is at the bottom of the page
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we've scrolled to the bottom
      setIsVisible(scrollTop + windowHeight >= documentHeight - 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`bg-backgound/80 fixed bottom-0 left-0 right-0 border-t border-border backdrop-blur-md transition-transform duration-300 dark:border-border/80 dark:bg-background ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="mb-4 text-sm sm:mb-0">
            <p>
              © {currentYear} PropFinder, Inc. Todos los derechos reservados
            </p>
            <div className="mt-2 space-x-4">
              <Link href="/cookie-preferences" className="hover:underline">
                Preferencias de cookies
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacidad
              </Link>
              <Link href="/terms" className="hover:underline">
                Términos
              </Link>
              <Link href="/sitemap" className="hover:underline">
                Mapa del sitio
              </Link>
              <Link href="/company-details" className="hover:underline">
                Detalles de la empresa
              </Link>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link
              href="https://twitter.com/propfinder"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com/propfinder"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://linkedin.com/company/propfinder"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://facebook.com/propfinder"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
