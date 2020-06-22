import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom'
import {mainRouter} from "./routerConfig.js"
export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    {
                      mainRouter.map(item => {
                        return <Route key={item.path} component={item.component} path={item.path} exact={item.exact}></Route>
                      })
                    }
                </Switch>
            </BrowserRouter>
        </div>
    )
}