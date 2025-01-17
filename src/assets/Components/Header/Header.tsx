import React, { Component } from 'react';
import './header.css';
import Input from '../Sidebar/Input/Input';

interface HeaderState {
  searchInput: string;
}

interface HeaderProps {
  searchInput: string;
}

export class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      searchInput: ''
    };
  }

  handleSearchChange = (value: string) => {
    this.setState({ searchInput: value });
  }

  render() {
    return (
      <header>
        <div className="search">
          <div className="search-logo"><img src="./img/search.png" alt="" /></div>
          <div className="search-bg">Пошук</div>
          <Input
            type='text'
            placeholder='Пошук'
            value={this.state.searchInput}
            onChange={this.handleSearchChange}
            className='search-holder'
          />
          <div className="search-button" color='#fff'>Hello world</div>
        </div>
        <nav className='navigation'>
          <div className="login"> <div className='bg-nav'>Вхід</div> </div>
          <div className="registration"> <div className="bg-nav">Реєстрація</div> </div>
          <div className="nav-logo"></div>
        </nav>
      </header>
    );
  }
}

export default Header;