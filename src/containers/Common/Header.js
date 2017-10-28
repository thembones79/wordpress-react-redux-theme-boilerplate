import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Collapse, 
  Navbar, 
  NavbarToggler, 
  NavbarBrand, 
  Nav
} from 'reactstrap';
import { fetchMenu } from '../../actions/menu';
import MenuItem from '../../components/Header/MenuItem';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchMenu('primary'));
  }
  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }
  render() {
    const { menu } = this.props;
    const { isOpen } = this.state;

    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand to="/" tag={Link}>
            {WP_REACT_REDUX.siteName}
          </NavbarBrand>
          <NavbarToggler onClick={::this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {
                menu.data.length
                  ?
                  menu.data.map((menu, i) =>
                    <MenuItem
                      key={i}
                      menu={menu} 
                    />
                  )
                  : ''
              }
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {  
  return {
    menu: state.menu
  }
}

export default connect(
  mapStateToProps
)(Header);