export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-bold tracking-tight">
              DENIM<span className="font-light"> CO.</span>
            </p>
            <p className="text-sm text-neutral-400 mt-1">
              Premium baggy denim jeans.
            </p>
          </div>
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} Denim Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
