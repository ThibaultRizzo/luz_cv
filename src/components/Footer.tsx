export default function Footer() {
  return (
    <footer className="bg-brand-deep text-brand-cream py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Nadia Luna. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-brand-gold">LinkedIn</a>
          <a href="#" className="hover:text-brand-gold">Email</a>
          <a href="#" className="hover:text-brand-gold">Phone</a>
        </div>
      </div>
    </footer>
  );
}
