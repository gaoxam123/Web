import './index.css'

export default function Calculator({data, onChangeData}) {
    
    return <div id='user-input'>
        <div className='input-group'>
            <p>
                <label>Initial Investment</label>
                <input  type="number" value={data.initialInvestment} onChange={(event) => onChangeData('initialInvestment', event.target.value)} required/>
            </p>
            <p>
                <label>Annual Investment</label>
                <input  type="number" value={data.annualInvestment} onChange={(event) => onChangeData('annualInvestment', event.target.value)} required/>
            </p>
        </div>
        <div className="input-group">
            <p>
                <label>Expected Value</label>
                <input type="number" value={data.expectedReturn} onChange={(event) => onChangeData('expectedReturn', event.target.value)} required/>
            </p>
            <p>
                <label>Duration</label>
                <input type="number" value={data.duration} onChange={(event) => onChangeData('duration', event.target.value)} required/>
            </p>
        </div>
    </div>
}