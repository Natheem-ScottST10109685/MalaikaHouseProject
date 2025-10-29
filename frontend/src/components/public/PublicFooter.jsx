export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-4 mb-2 text-sm text-slate-300">
          <a href="#privacy" className="underline">Privacy Policy</a>
          <a href="#terms" className="underline">Terms of Service</a>
          <a href="#accessibility" className="underline">Accessibility</a>
          <a href="#support" className="underline">Support</a>
        </div>
        <p className="text-slate-400">
          &copy; {new Date().getFullYear()} Malaika House. All rights reserved.
        </p>
      </div>
    </footer>
  );
}