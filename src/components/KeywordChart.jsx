import React from 'react';
import HeaderChart from './HeaderChart';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryStack, VictoryTooltip, VictoryAxis, VictoryLabel } from 'victory';
import localforage from 'localforage';


class Chart extends React.PureComponent {
    state = {
        data: []
    };

    componentDidMount() {
        this.getData();
    }

    componentDidCatch(e) {
        console.error(e);
    }

    getData = async () => {
        const data = [];
        try {
            const keys = await localforage.keys();
            for (let date of keys) {
                const month = await localforage.getItem(date);
                for (let i = 0; i < 10; i++) {
                    const keyword = month.allKeywords[i];
                    const { kw, count } = keyword;
                    data.push([{ x: date, y: count, label: kw }]);
                }
            }
            this.setState({ data });
        }
        catch(error) {
            console.error(error);
        }
    };

    render() {
        const { data } = this.state;
        const styles = {
            axis: {
                axis: { stroke: '#756f6a' },
                axisLabel: { fontFamily: 'inherit', fontSize: 5, padding: 25, fontWeight: 'bold', fill: '#7c7c7c' },
                grid: { stroke: ({ tick }) => tick > 0.5 ? 'red' : 'grey' },
                ticks: { stroke: 'grey', size: 5 }
            }
        };
        return (
            <>
                <HeaderChart/>
                <main className="main">
                    {
                        data.length > 0 &&
                        <VictoryChart
                            theme={VictoryTheme.material}
                            height={220}
                        >
                            <VictoryLabel x={25} y={24}
                                text="Keywords per Month"
                                style={{
                                    fontFamily: 'inherit',
                                    fontSize: 8,
                                    fontWeight: 'bold',
                                    fill: '#7c7c7c'
                                }}
                            />
                            <VictoryAxis
                                style={{ ...styles.axis, ...{ tickLabels: { fontFamily: 'inherit', fontSize: 4, padding: 5, angle: 315, fontWeight: 'bold' } } }}
                                label='Month'
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{ ...styles.axis, ...{ tickLabels: { fontFamily: 'inherit', fontSize: 4, padding: 4 } } }}
                                label='Count'
                            />
                            <VictoryStack>
                                {
                                    data.map((item, index) =>
                                        <VictoryBar
                                            key={item.label}
                                            data={data[index]}
                                            barWidth={10}
                                            labelComponent={
                                                <VictoryTooltip
                                                    constrainToVisibleArea
                                                    centerOffset={{ x: 5 }}
                                                    dy={2}
                                                    cornerRadius={0}
                                                    flyoutStyle={{ strokeWidth: 0.5 }}
                                                    pointerLength={8}
                                                    style={
                                                        {
                                                            fontSize: 4,
                                                            fontFamily: 'inherit'
                                                        }
                                                    }
                                                />
                                            }
                                        />
                                    )
                                }
                            </VictoryStack>
                        </VictoryChart>
                    }
                </main>
            </>
        );
    }
}

export default Chart;
