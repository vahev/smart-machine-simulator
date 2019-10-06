import React from 'react';
import ReactDOM from 'react-dom';
import * as constants from './constants';
import './index.css'

class SmartMachine extends React.Component {
    constructor() {
        super()
        this.state = {
            isRequestComplete: true,
            img: "/placeholder-img.jpg"
        }
    }
    onSubmit(e) {
        console.log("sending request...")
        e.preventDefault()
        let formData = new FormData();
        let location = document.getElementById("location")

        formData.append('attachedImage', document.getElementById('snapshot').files[0])
        formData.append('weight', document.getElementById('weight').value)
        formData.append('warehouseLocation', location.options[location.selectedIndex].value)
        
        let content = {
            method: 'POST',
            body: formData
        }

        fetch(`${constants.CLASSIFICATION_HOST}/api/classify`, content)
        .then(response => { response.text().then(text => alert(text)) })
        .catch(error => { console.log(error)})

    }

    render() {
        const warehouses = []
        for (const [index, value] of constants.WAREHOUSES.entries()) {
            warehouses.push(<option key={index} value={value.value} >{value.label}</option>)
        }
        return (
            <div className="container">
                <h1>Warehouse Input Simulator</h1>
                <div className="form-container">
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <div className="fileContainer">
                            <input name="snapshot" id="snapshot" type="file" required/>
                            <img src={this.state.img} alt="package"/>
                        </div>
                        <select id="location">
                            {warehouses}
                        </select>
                        <input name="weight" id="weight" type="number" required/>
                        <input id="submit" type="submit" name="submit" value="Send"/>
                    </form>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <SmartMachine />,
    document.getElementById('root')
);