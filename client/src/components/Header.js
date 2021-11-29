import Logo from '../assets/images/logo.png'
import Thbs from '../assets/images/thbs.png'

const Header = () => {
    return (
      <div className="row">
        <div className="col-4 py-2">
            <img src={Logo} className="logo" alt="Biorev" />
        </div>
        <div className="col-4 text-center p-2">
            <h1>
                NEXT STEPS
            </h1>
        </div>
        <div className="col-4 text-end py-2">
            <img src={Thbs} className="logo" alt="Biorev" />
        </div>
      </div>
    );
  }
  
  export default Header;
  