import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default () => (<Menu>
    <a className="menu-item" href="/">
        Dashboard
    </a>

    <a className="menu-item" href="/current-repos">
        Current Repositories
    </a>
</Menu>);