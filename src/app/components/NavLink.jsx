import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block py-2 text-[#ADB7BE] text-base md:text-lg hover:text-white"
    >
      {title}
    </Link>
  );
};

export default NavLink;
