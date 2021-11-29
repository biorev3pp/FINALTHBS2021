import Logo from '../../assets/images/logo2.png'

const Header = () => {
    return (
      <div className="row boxshadow">
        <div className="col-4 py-2">
            <img src={Logo} className="adminlogo" alt="Biorev" />
        </div>
        <div className="col-4 text-center p-2">
           
        </div>
        <div className="col-4 text-end py-2">
          <h6 className="mt-2"> Welcome Admin,</h6>
        </div>
      </div>
    );
  }
  
  export default Header;