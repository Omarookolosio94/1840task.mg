import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function Navbar() {
  return (
    <>
      <header className="">
        <nav className="container">
          <Link to={'/'}>
            <img src={logo} alt="1840 task manager" className="logo" />
          </Link>
        </nav>
      </header>
    </>
  );
}
