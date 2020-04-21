import React, {Component} from 'react';

class Footer extends Component {
  getYear() {
    return new Date().getFullYear();
  }
  render() {
    return (
      <footer className="footer text-center py-4">
        <div className="custom-container">
          <p className="copyright mb-0">Copyright&copy; {this.getYear()} Apollo. Rights Reserved </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
