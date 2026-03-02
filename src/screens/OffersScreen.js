import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function YourOffersScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Your offers</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* RED BANNER */}
        <ImageBackground
        source={require("../../assets/images/offer-background.png")}
          // source={{
          //   uri: "https://i.imgur.com/8wKQZ6F.png ", // replace with your banner
          // }}
          style={styles.banner}
          imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <Text style={styles.bannerText}>Your Offers</Text>
        </ImageBackground>

        {/* WHITE CONTENT */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Upcoming Offers</Text>

          {/* OFFER CARD */}
          <View style={styles.offerCard}>
            {/* Orange Top */}
            <View style={styles.offerTop}>
              <View>
                <Text style={styles.offerDay}>Saturday</Text>
                <Text style={styles.offerTitle}>LateNight_Offer</Text>
                <Text style={styles.offerTime}>31 Jan 5pm - 3:58am</Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.price}>₹455</Text>
                <Text style={styles.oldPrice}>₹419</Text>
              </View>
            </View>

            {/* Incentive Box */}
            {/* <View style={styles.incentiveBox}>
              <View style={styles.rowBetween}>
                <Text style={styles.label}>Incentive</Text>
                <Text style={styles.value}>₹455</Text>
                <Text style={styles.value}>₹655</Text>
              </View>

              <Divider />

              <LockedRow label="Gigs" left="5" right="5" />
              <LockedRow label="Trip" left="10" right="15" />
            </View> */}

            <View style={styles.incentiveBox}>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>Incentive</Text>
    <Text style={styles.value}>₹455</Text>
    <Text style={styles.value}>₹655</Text>
  </View>

  {/* Gigs */}
  <ProgressLockRow
    label="Gigs"
    current={3}     // dynamic value
    target={5}
  />

  {/* Trip */}
  <ProgressLockRow
    label="Trip"
    current={10}
    target={15}
  />
</View>
          </View>

          {/* Duplicate card example */}
          <View style={[styles.offerCard, { marginTop: 26 }]}>
            <View style={styles.offerTop}>
              <View>
                <Text style={styles.offerDay}>Saturday</Text>
                <Text style={styles.offerTitle}>LateNight_Offer</Text>
                <Text style={styles.offerTime}>31 Jan 5pm - 3:58am</Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.price}>₹455</Text>
                <Text style={styles.oldPrice}>₹419</Text>
              </View>
            </View>

            <View style={styles.incentiveBox}>
              <View style={styles.rowBetween}>
                <Text style={styles.label}>Incentive</Text>
                <Text style={styles.value}>₹455</Text>
                <Text style={styles.value}>₹655</Text>
              </View>

  <ProgressLockRow
    label="Gigs"
    current={3}     // dynamic value
    target={5}
  />

  {/* Trip */}
  <ProgressLockRow
    label="Trip"
    current={13}
    target={15}
  />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Reusable Locked Row */
// const LockedRow = ({ label, left, right }) => (
//   <View style={styles.lockRow}>
//     <Text style={styles.lockLabel}>{label}</Text>

//     <View style={styles.lockBox}>
//       <Ionicons name="lock-closed" size={14} color="#999" />
//       <Text style={styles.lockValue}>{left}</Text>
//     </View>

//     <View style={styles.lockBox}>
//       <Ionicons name="lock-closed" size={14} color="#999" />
//       <Text style={styles.lockValue}>{right}</Text>
//     </View>
//   </View>
// );

const ProgressLockRow = ({
  label,
  current,
  target,
}) => {
  const progress = Math.min(current / target, 1);
  const isUnlocked = current >= target;

  return (
    <View style={{ marginVertical: 12 }}>
      
      {/* Progress Line */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressBackground} />

        <View
          style={[
            styles.progressFill,
            { width: `${progress * 100}%` },
          ]}
        />

        <View style={styles.lockIconWrapper}>
          <Ionicons
            name={isUnlocked ? "lock-open" : "lock-closed"}
            size={18}
            color={isUnlocked ? "#000" : "#888"}
          />
        </View>
      </View>

      {/* Numbers Row */}
      <View style={styles.lockRow}>
        <Text style={styles.lockLabel}>{label}</Text>

        <Text style={styles.lockValue}>{current}</Text>
        <Text style={styles.lockValue}>{target}</Text>
      </View>
    </View>
  );
};

const Divider = () => <View style={styles.divider} />;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  banner: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  bannerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  contentContainer: {
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  offerCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 2,
    marginTop: 20
  },

  offerTop: {
    backgroundColor: "#FF6B00",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  offerDay: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600
  },

  offerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 8
  },

  offerTime: {
    color: "#fff",
    fontSize: 12,
  },

  price: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  oldPrice: {
    color: "#fff",
    fontSize: 12,
    textDecorationLine: "line-through",
  },

  incentiveBox: {
    backgroundColor: "#DBDBDB",
    padding: 14,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: '#8F8F8F',
    padding: 20,
    borderRadius: 10
  },

  label: {
    fontSize: 12,
    color: "#555",
  },

  value: {
    fontSize: 12,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 12,
  },

  lockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },

  lockLabel: {
    fontSize: 12,
    color: "#555",
  },

  lockBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  lockValue: {
    marginLeft: 4,
    fontSize: 12,
  },
  progressWrapper: {
  height: 20,
  justifyContent: "center",
},

progressBackground: {
  height: 2,
  backgroundColor: "#CFCFCF",
  width: "100%",
  position: "absolute",
},

progressFill: {
  height: 2,
  backgroundColor: "#000",
  position: "absolute",
},

lockIconWrapper: {
  position: "absolute",
  alignSelf: "center",
  backgroundColor: "#DBDBDB",
  paddingHorizontal: 6,
},

lockRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 6,
},

lockLabel: {
  fontSize: 12,
  color: "#555",
},

lockValue: {
  fontSize: 12,
  fontWeight: "600",
},
});