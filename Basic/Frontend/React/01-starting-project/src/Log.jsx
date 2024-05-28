import './util/investment'
import { calculateInvestmentResults } from './util/investment'
import { useState } from 'react'
export default function Log({data}) {
    let year_interest = calculateInvestmentResults(data.initialInvestment, data.annualInvestment, data.expectedReturn, data.duration)
    let total_interest = 0
    return <div>
        <table id='result'>
            <thead id='thead'>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest(Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody id='tbody'>
                    {/* <td>1</td>
                    <td>{data["INITIAL INVESTMENT"]}</td>
                    <td>{year_interest[0]}</td>
                    <td>{year_interest[0]}</td>
                    <td>{data["INVESTED VALUE"] - year_interest[0]}</td> */}
                    {year_interest.map(obj => {
                        <tr>
                            <td>{obj.year}</td>
                            <td>{obj.valueEndOfYear}</td>
                            <td>{obj.interest}</td>
                            <td>{total_interest += obj.interest}</td>
                            <td>{obj.valueEndOfYear - total_interest}</td>
                        </tr>
                    })}
            </tbody>
        </table>
    </div>
}