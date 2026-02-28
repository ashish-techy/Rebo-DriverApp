import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const screenWidth = Dimensions.get("window").width - 32;

function EarningsSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={12}>
      {/* Chart Card */}
      <SkeletonPlaceholder.Item
        marginHorizontal={16}
        marginTop={14}
        height={220}
      />

      {/* Spacing */}
      <SkeletonPlaceholder.Item height={14} />

      {/* Info Cards */}
      {[1, 2, 3].map((_, i) => (
        <SkeletonPlaceholder.Item
          key={i}
          marginHorizontal={16}
          marginBottom={12}
          height={54}
        />
      ))}
    </SkeletonPlaceholder>
  );
}


/* ---------- MOCK DATA (replace with API later) ---------- */
const DATA = {
  Day: {
    labels: ["9", "12", "3", "6", "9"],
    values: [120, 250, 180, 320, 200],
  },
  Week: {
    labels: ["24", "25", "26", "27", "28", "29", "30"],
    values: [300, 450, 600, 800, 500, 900, 750],
  },
  Month: {
    labels: ["W1", "W2", "W3", "W4"],
    values: [4200, 5100, 4800, 6000],
  },
};

const RANGES = ["24 Nov - 30 Nov", "17 Nov - 23 Nov", "10 Nov - 16 Nov"];

export default function EarningsDetailsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Week");
  const [rangeIndex, setRangeIndex] = useState(0);

  const chartData = DATA[activeTab];

  const totalEarning = useMemo(
    () => chartData.values.reduce((a, b) => a + b, 0),
    [activeTab]
  );


//   After API Intigration uncomment this
//   if (loading) {
//   return <EarningsSkeleton />;
// }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
        <View style={{ width: 22 }} />
      </View>


      {/* <View style={styles.tabsWrapper}>
        {["Day", "Week", "Month"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.amountCard}>
        <View style={styles.rangeRow}>
          <TouchableOpacity
            onPress={() =>
              setRangeIndex((prev) =>
                prev === 0 ? RANGES.length - 1 : prev - 1
              )
            }
          >
            <Ionicons name="chevron-back" size={18} />
          </TouchableOpacity>

          <Text style={styles.rangeText}>{RANGES[rangeIndex]}</Text>

          <TouchableOpacity
            onPress={() =>
              setRangeIndex((prev) => (prev + 1) % RANGES.length)
            }
          >
            <Ionicons name="chevron-forward" size={18} />
          </TouchableOpacity>
        </View>

        <Text style={styles.amount}>₹{totalEarning}</Text>
      </View> */}

      {/* ORANGE SECTION */}
<View style={styles.orangeSection}>
  {/* TABS */}
  <View style={styles.tabsWrapper}>
    {["Day", "Week", "Month"].map((tab) => (
      <TouchableOpacity
        key={tab}
        style={[
          styles.tab,
          activeTab === tab && styles.activeTab,
        ]}
        onPress={() => setActiveTab(tab)}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText,
          ]}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* AMOUNT CARD */}
  <View style={styles.amountCard}>
    <View style={styles.rangeRow}>
      <TouchableOpacity
        onPress={() =>
          setRangeIndex((prev) =>
            prev === 0 ? RANGES.length - 1 : prev - 1
          )
        }
      >
        <Ionicons name="chevron-back" size={18} />
      </TouchableOpacity>

      <Text style={styles.rangeText}>{RANGES[rangeIndex]}</Text>

      <TouchableOpacity
        onPress={() =>
          setRangeIndex((prev) => (prev + 1) % RANGES.length)
        }
      >
        <Ionicons name="chevron-forward" size={18} />
      </TouchableOpacity>
    </View>

    <Text style={styles.amount}>₹{totalEarning}</Text>
  </View>
</View>


      {/* CONTENT */}
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* <View style={styles.card}>
          <Text style={styles.dateLabel}>
            {RANGES[rangeIndex]} 2025
          </Text>


          <BarChart
            data={{
              labels: chartData.labels,
              datasets: [{ data: chartData.values }],
            }}
            width={screenWidth}
            height={180}
            yAxisLabel="₹"
            fromZero
            showValuesOnTopOfBars={false}
            chartConfig={{
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: () => "#000",
  labelColor: () => "#777",
  barPercentage: 0.38,   // 👈 thinner bars (matches image)
}}

            style={{ borderRadius: 12, marginVertical: 8 }}
          />

          
          <StatRow label="Trips" value="08" />
          <StatRow label="Time On Trips" value="03:09 Hrs" />
          <StatRow label="Trips Earning" value={`₹${totalEarning}`} />
          <StatRow label="Incentive" value="₹0" />
          <StatRow label="Other Earnings" value="₹0" />
        </View> */}

        {/* CHART CARD */}
<View style={styles.chartCard}>
  <Text style={styles.dateLabel}>
    {RANGES[rangeIndex]} 2025
  </Text>

{/* <BarChart
  data={{
    labels: chartData.labels,
    datasets: [{ data: chartData.values }],
  }}
  width={Dimensions.get("window").width - 64}
  height={170}
  fromZero
  withHorizontalLabels={false}   // 👈 hides 0–6000 labels
  withVerticalLabels={true}
  yAxisLabel=""
  yAxisSuffix=""
  chartConfig={{
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: () => "#000",
    labelColor: () => "#777",
    barPercentage: 0.38,
    propsForBackgroundLines: {
      strokeWidth: 0, // no grid
    },
  }}
  style={{ marginVertical: 8 }}
/>

<View style={styles.barValueRow}>
  {chartData.values.map((value, index) => (
    <View key={index} style={styles.barValueWrapper}>
      <Text style={styles.barValueText}>₹{value}</Text>
    </View>
  ))}
</View> */}

<View style={styles.chartWrapper}>
  <BarChart
    data={{
      labels: chartData.labels,
      datasets: [{ data: chartData.values }],
    }}
    width={Dimensions.get("window").width - 64}
    height={140}
    fromZero
    withHorizontalLabels={false}   // ❌ remove 0–6000
    withVerticalLabels={true}
    yAxisLabel=""
    yAxisSuffix=""
    chartConfig={{
      backgroundGradientFrom: "#fff",
      backgroundGradientTo: "#fff",
      decimalPlaces: 0,
      color: () => "#000",
      labelColor: () => "#000",
      barPercentage: 0.28,          // thinner bars (matches image)
      propsForBackgroundLines: {
        stroke: "#DADADA",
        strokeDasharray: "4 4",     // single dotted baseline
      },
    }}
    style={{ paddingRight: 12 }}
  />

  {/* ₹ VALUE ON TOP OF BARS */}
  <View style={styles.barValueRow}>
    {chartData.values.map((value, index) =>
      value > 0 ? (
        <View key={index} style={styles.barValueWrapper}>
          <Text style={styles.barValueText}>₹{value}</Text>
        </View>
      ) : (
        <View key={index} style={styles.barValueWrapper} />
      )
    )}
  </View>
</View>



  <StatRow label="Trips" value="08" />
  <StatRow label="Time On Trips" value="03:09 Hrs" />
</View>

{/* SPACING */}
<View style={{ height: 14 }} />

{/* TRIPS EARNING */}
<View style={styles.infoCard}>
  <StatRow
    label="Trips Earning"
    value={`₹${totalEarning}`}
    showArrow
  />
</View>

{/* INCENTIVE */}
<View style={styles.infoCard}>
  <StatRow label="Incentive" value="₹0" />
</View>

{/* OTHER EARNINGS */}
<View style={styles.infoCard}>
  <StatRow label="Other Earnings" value="₹0" />
</View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- REUSABLE ROW ---------- */
function StatRow({ label, value, showArrow }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Text style={styles.rowValue}>{value}</Text>
        {showArrow && (
          <Ionicons name="chevron-down" size={14} color="#000" />
        )}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },

  header: {
    backgroundColor: "#FF6B00",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  orangeSection: {
  backgroundColor: "#FF6B00",
  paddingBottom: 22,
  marginBottom: 20,
},
tabsWrapper: {
  flexDirection: "row",
  paddingHorizontal: 16,
  paddingTop: 8,
  gap: 10,
},
  tab: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 18,
    paddingVertical: 6,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    color: "#fff",
    fontSize: 13,
  },
  activeTabText: {
    color: "#FF6B00",
    fontWeight: "600",
  },
chartCard: {
  backgroundColor: "#fff",
  marginHorizontal: 16,
  marginTop: 14,
  borderRadius: 14,
  paddingHorizontal: 16,
  paddingVertical: 14,
  overflow: "hidden", // 👈 IMPORTANT
},


infoCard: {
  backgroundColor: "#fff",
  marginHorizontal: 16,
  marginBottom: 12,
  borderRadius: 12,
  paddingHorizontal: 16,
},



amountCard: {
  backgroundColor: "#fff",
  marginHorizontal: 16,
  marginTop: 12,
  borderRadius: 14,
  paddingVertical: 14,
  paddingHorizontal: 16,
  alignItems: "center",
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},

  rangeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
rangeText: {
  fontSize: 12,
  color: "#666",
  fontWeight: "500",
},
  amount: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
  dateLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 8,
  },

row: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 14,
},
  rowLabel: {
    fontSize: 14,
    color: "#333",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "600",
  },
barValueRow: {
  position: "absolute",
  top: 6,
  left: 0,
  right: 0,
  flexDirection: "row",
  justifyContent: "space-around",
  paddingHorizontal: 8,
},

barValueWrapper: {
  width: 30,
  alignItems: "center",
},

barValueText: {
  fontSize: 11,
  fontWeight: "600",
  color: "#000",
},

chartWrapper: {
  position: "relative",
  height: 150,
  marginTop: 6,
},

});
