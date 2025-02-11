const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" mt-20">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-purple-300 text-sm">
            ©  <a href="http://ytchap.com" className="hover:underline">YTChap.com</a> {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
