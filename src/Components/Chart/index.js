import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {
    XAxis, 
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    AreaChart,
    LineChart,
    Area,
    Line,
    Tooltip
} from "recharts";

import getPriceData from '../../Data/api';
import calculate from '../../Data/calculate';

export default function MainGraph(props: {}) {
    const [chartData, setChartData] = useState([]);
    const [finalChartData, setFinalChartData] = useState([]);

    const apy = 80900;

    async function constructPriceData(){
        const data = await getPriceData(10);
        const priceData = [];
        let counter = 0;
        data.data.prices.forEach(item => {
            if (counter === 0){
                const obj = {
                    timeStamp: new Date(item[0]).getDate(),
                    price: item[1]
                }
                priceData.push(obj);
            }
            counter = counter === 3 ? 0 : counter + 1;
        })
        setChartData(priceData)
    }

    function constructBreakEvenLine(purchaseDate, purchasePrice, daysOut){
        const lineDataArray = [
            {
                timeStamp: purchaseDate,
                price: purchasePrice
            },
            {
                timeStamp: daysOut,
                price: calculate.evenPriceXDaysOut(
                    daysOut,
                    purchasePrice,
                    apy
                ),
            },
        ];
        const newChartData = [...chartData]
        let keepDrawing = false;
        for (let i = 0; i < lineDataArray.length; i++) {
            for (let j = 0; j < newChartData.length; j++) {
                if (newChartData[j].timeStamp === lineDataArray[i].timeStamp || keepDrawing){
                    newChartData[j].userPriceLine = calculate.evenPriceXDaysOut(
                        newChartData[j].timeStamp,
                        purchasePrice,
                        apy
                    );
                    keepDrawing = newChartData[j].timeStamp <= lineDataArray[1].timeStamp ? true : false;
                }
            }

        }
        setFinalChartData(newChartData);
    }
    

    useEffect(() => {
        constructPriceData();
        constructBreakEvenLine(2, 7800, 9);
    }, [])
    console.log("find", finalChartData)
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart 
                height={500} 
                data={finalChartData} 
            >
                <CartesianGrid opacity={0.75} />
                <XAxis dataKey="timeStamp"/>
                <YAxis dataKey="price"/>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <Line type="monotone" dataKey="userPriceLine" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    )
}