import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* o BrowserRouter permite fazer navegação entre uma página e outra */
import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
    return (
        <BrowserRouter>
            {/* permite que a rotas sejam chamadas uma por vez, utilize o exact sempre pois assim irá conseguir andar nas outras páginas, sem a página principal interferir. */}
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/repository/:repository" component={Repository} />
            </Switch>
        </BrowserRouter>
    );
}
