import React, { Component } from 'react'
import Tabs from  "../Tabs/Tabs"; 

export default class Portfolio extends Component {
    render() {
        return (
            <div>
                <Tabs>
                    <div label="overall">
                        <h1>Protfolio total value</h1>
                        <p>
                        show the Protfolio current total value and broken down
                        by coin.</p>
                        <p>
                        coming to a screen near you</p>
                    </div>
                    <div label="By Wallet">
                        <h1>By wallet value break down</h1>
                        <p>
                        show the Protfolio current total value and broken down
                        by wallet and then by coin.</p>
                        <p>
                        coming to a screen near you</p>
                    </div>
                </Tabs> 
            </div>
        )
    }
}
