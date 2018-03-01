import * as React from 'react';
import * as classnames from 'classnames';
import NavBar from './../NavBar/NavBar';

// tslint:disable

export default class Header extends React.Component<undefined, undefined> {
  public render() {
    return (
      <div className="row header pt4">
        <img
          className="logo relative pl3 pr3 center db"
          src="http://res.cloudinary.com/global-images/image/upload/s--6N7XKUdg--/v1519877359/gabriel-eletro/gabriel_eletro.png"
        />
        <NavBar />

        <style>
          {`
            .logo {
              margin-bottom: -35px;
            }
          `};
        </style>
      </div>
    );
  }
}
