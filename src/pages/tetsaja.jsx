import React, { useState } from 'react';
import {PearsonViewPageItemBased, PearsonViewPageUserBased} from "../components/viewMath/PearsonViewPage";


export default function Test(){
    const [dropdown1, setDropdown1] = useState('');
    const [dropdown2, setDropdown2] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = () => {
        if (dropdown1 === 'user-based' && dropdown2 === 'metode A') {
            setResult(<PearsonViewPageUserBased/>);
        } else if (dropdown1 === 'user-based' && dropdown2 === 'metode B') {
            setResult(<PearsonViewPageItemBased/>);
        } else if (dropdown1 === 'item-based' && dropdown2 === 'metode A') {
            setResult('Anda memilih Item-Based dengan Metode A');
        } else if (dropdown1 === 'item-based' && dropdown2 === 'metode B') {
            setResult('Anda memilih Item-Based dengan Metode B');
        } else {
            setResult(null);
        }
    };
    return(
        <div style={{padding: '20px'}}>
            <h1>Pilih Metode</h1>
            <div>
                <label>
                    Pilih Tipe:
                    <select value={dropdown1} onChange={(e) => setDropdown1(e.target.value)}>
                        <option value="">-- Pilih --</option>
                        <option value="user-based">User-Based</option>
                        <option value="item-based">Item-Based</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Pilih Metode:
                    <select value={dropdown2} onChange={(e) => setDropdown2(e.target.value)}>
                        <option value="">-- Pilih --</option>
                        <option value="metode A">Metode A</option>
                        <option value="metode B">Metode B</option>
                    </select>
                </label>
            </div>
            <button onClick={handleSubmit}>Submit</button>

            {result && <h2>{result}</h2>}
        </div>
    )
}