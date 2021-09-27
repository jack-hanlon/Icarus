import React from "react";
import { ProgressViewIOSComponent, View } from "react-native"
import { LineChart } from "react-native-chart-kit";
import { styles, chartConfig} from "../../themes/styleSheet"
import Metrics from "../../themes/metrics";

const Plot = (prop) => {
    return (
        <View style={styles.chartRow}>
            <LineChart 
                data={prop.dataProp}
                width={Metrics.screenWidth}
                height={220}
                withDots={false}
                withHorizontalLabels={false}
                withVerticalLines={false}
                yAxisInterval={1200}
                chartConfig={chartConfig}
            />
        </View>
    )
};


export { Plot }