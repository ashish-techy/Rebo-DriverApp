import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import MapView from "react-native-maps";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function DriverHomeScreen({ navigation }) {
  const [isOnline, setIsOnline] = useState(false);

  const stats = useMemo(
    () => [
      { label: "Earnings", value: "₹1500" },
      { label: "Online", value: "3hr30min" },
      { label: "Trip", value: "05" },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* MAP */}
      <View style={styles.mapWrap}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 18.5204,
            longitude: 73.8567,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        />

        {/* Heat / orange glow */}
        <View style={styles.glowCenter}>
          <View style={styles.glowOuter} />
          <View style={styles.glowInner} />
          <View style={styles.glowDot} />
        </View>

        {/* Top icons */}
        <View style={styles.mapTopRow}>
          <TouchableOpacity style={styles.circleIcon}>
            <Text style={styles.iconText}>◎</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIcon}>
            <Text style={styles.iconText}>⚠</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIcon} onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.iconText}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Online toggle button */}
        <View style={styles.goButtonWrap}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsOnline((p) => !p)}
            style={[
              styles.goButton,
              isOnline ? styles.goButtonGreen : styles.goButtonRed,
            ]}
          >
            <Text style={styles.goButtonText}>
              {isOnline ? "Go Offline" : "Go Online"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom tab on map */}
        <View style={styles.mapBottomBar}>
          <TabItem label="Drive" active />
          <TabItem label="Earnings 7"  onPress={() => navigation.navigate("Earnings")}/>
        </View>

        {/* Searching loader */}
        {isOnline && (
          <View style={styles.findingWrap}>
            <Text style={styles.findingText}>Finding ride request</Text>
          </View>
        )}
      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats */}
        <View style={styles.statsCard}>
          {stats.map((s, idx) => (
            <View
              key={s.label}
              style={[
                styles.statBox,
                idx !== stats.length - 1 && styles.statDivider,
              ]}
            >
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
            </View>
          ))}
        </View>

        {/* Weekly Challenges */}
        <Text style={styles.sectionTitle}>Weekly Challenges</Text>

        <View style={styles.challengeCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.challengeHint}>Ends on Monday</Text>
            <Text style={styles.challengeTitle}>
              Complete 20 trips and{"\n"}get ₹2000 extra
            </Text>
            <Text style={styles.challengeSub}>
              2 trips done out of 20
            </Text>
          </View>

          <ProgressRing percent={20} />
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionText}>📌 Book your gigs</Text>
          <Text style={styles.chev}>›</Text>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionText}>🚗 Driving Preferences</Text>
          <Text style={styles.chev}>›</Text>
        </View>

        {/* Benefits */}
        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
          Benefits for you
        </Text>

        <View style={styles.benefitCard}>
          <View style={styles.bullet} />
          <View style={{ flex: 1 }}>
            <Text style={styles.benefitTitle}>
              Earn upto ₹10000 by inviting
            </Text>
            <Text style={styles.benefitSub}>
              Invite someone you know to drive for ride and get upto ₹10000
            </Text>
          </View>
          <Text style={styles.chev}>›</Text>
        </View>

        {/* Learning Hub */}
        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
          Learning Hub
        </Text>

        <View style={styles.videoCard}>
          <View style={styles.videoThumb}>
            <View style={styles.playCircle}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </View>
          <Text style={styles.videoTitle}>
            Tips to get 5-star ratings from{"\n"}your customers
          </Text>
        </View>

        {/* Help & Support */}
        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
          Help and support
        </Text>

        <View style={styles.helpCard}>
          <View style={styles.helpRow}>
            <Text style={styles.helpTitle}>Get your queries resolved</Text>
            <Text style={styles.chev}>›</Text>
          </View>
          <Text style={styles.helpSub}>
            Call or chat with an anytime to get your issues solved instantly
          </Text>
        </View>

        <View style={styles.helpCard}>
          <View style={styles.helpRow}>
            <Text style={styles.helpTitle}>Setup an emergency contact</Text>
            <Text style={styles.chev}>›</Text>
          </View>
          <Text style={styles.helpSub}>
            We will call them if an issue is reported and you don’t respond.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Small Components ---------------- */

function TabItem({ label, active, onPress }) {
  return (
    <Pressable style={styles.tabItem} onPress={onPress}>
      <View style={[styles.tabDot, active && styles.tabDotActive]} />
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ProgressRing({ percent = 0 }) {
  const size = 52;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;

  return (
    <View style={styles.ringWrap}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E9E9E9"
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FF7A00"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <Text style={styles.ringText}>{percent}%</Text>
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* MAP AREA */
  mapWrap: {
    height: 280,
    backgroundColor: "#eee",
    overflow: "hidden",
  },

  mapTopRow: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  iconText: { fontSize: 16 },

  glowCenter: {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  glowOuter: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 122, 0, 0.20)",
  },
  glowInner: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 122, 0, 0.30)",
  },
  glowDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF7A00",
  },

  goButtonWrap: {
    position: "absolute",
    bottom: 52,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  goButton: {
    width: 150,
    height: 42,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  goButtonRed: { backgroundColor: "#E60023" },
  goButtonGreen: { backgroundColor: "#21C15E" },
  goButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  mapBottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#F3F3F3",
  },
  tabDotActive: {
    backgroundColor: "#000",
  },
  tabLabel: {
    fontSize: 13,
    color: "#777",
    fontWeight: "600",
  },
  tabLabelActive: {
    color: "#000",
  },

  findingWrap: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 36,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  findingText: {
    fontSize: 13,
    color: "#444",
    fontWeight: "600",
  },

  /* CONTENT */
  content: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  statsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    overflow: "hidden",
  },
  statBox: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: "#ECECEC",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
    fontWeight: "600",
  },
  statValue: {
    marginTop: 4,
    fontSize: 16,
    color: "#000",
    fontWeight: "800",
  },

  sectionTitle: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "800",
    color: "#111",
  },

  challengeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    padding: 14,
    gap: 10,
  },
  challengeHint: {
    fontSize: 11,
    color: "#888",
    fontWeight: "600",
    marginBottom: 4,
  },
  challengeTitle: {
    fontSize: 14,
    color: "#111",
    fontWeight: "800",
    lineHeight: 18,
  },
  challengeSub: {
    marginTop: 6,
    fontSize: 12,
    color: "#FF7A00",
    fontWeight: "700",
  },

  ringWrap: {
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  ringText: {
    position: "absolute",
    fontSize: 12,
    fontWeight: "800",
    color: "#333",
  },

  actionCard: {
    marginTop: 10,
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  chev: {
    fontSize: 22,
    color: "#B0B0B0",
    marginTop: Platform.OS === "ios" ? 0 : -1,
  },

  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    padding: 14,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF7A00",
  },
  benefitTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111",
  },
  benefitSub: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "600",
    color: "#777",
    lineHeight: 16,
  },

  videoCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    overflow: "hidden",
  },
  videoThumb: {
    height: 140,
    width: "100%",
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 2,
    fontWeight: "800",
  },
  videoTitle: {
    padding: 12,
    fontSize: 13,
    fontWeight: "800",
    color: "#111",
    lineHeight: 17,
  },

  helpCard: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    padding: 14,
  },
  helpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helpTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111",
  },
  helpSub: {
    marginTop: 6,
    fontSize: 12,
    color: "#777",
    fontWeight: "600",
    lineHeight: 16,
  },
});

















// import React, { useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
// } from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { Feather } from "@expo/vector-icons";

// export default function DriverHomeScreen() {
//   const mapRef = useRef(null);

//   const initialRegion = {
//     latitude: 18.5204, // Pune example
//     longitude: 73.8567,
//     latitudeDelta: 0.02,
//     longitudeDelta: 0.02,
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* MAP AREA */}
//       <View style={styles.mapWrapper}>
//         <MapView
//           ref={mapRef}
//           provider={PROVIDER_GOOGLE}
//           style={StyleSheet.absoluteFillObject}
//           initialRegion={initialRegion}
//           showsUserLocation={false}
//           showsMyLocationButton={false}
//           toolbarEnabled={false}
//         />

//         {/* Top Row Icons */}
//         <View style={styles.topRow}>
//           <TouchableOpacity style={styles.circleIcon}>
//             <Text style={styles.iconText}>⚙️</Text>
//           </TouchableOpacity>

//           <View style={styles.topRightIcons}>
//             <TouchableOpacity style={styles.circleIcon}>
//               <Text style={styles.iconText}>🚨</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.circleIcon}>
//               <Text style={styles.iconText}>❓</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.profileCircle}>
//               <Text style={styles.profileText}>👤</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Center Marker Glow */}
//         <View pointerEvents="none" style={styles.markerGlow} />
//         <View pointerEvents="none" style={styles.markerDot} />
//       </View>

//       {/* BOTTOM PANEL */}
//       <View style={styles.bottomPanel}>
//         {/* Bottom Tabs */}
//         <View style={styles.tabsRow}>
//           <View style={styles.tabItem}>
//             <Text style={styles.tabIcon}>🚗</Text>
//             <Text style={styles.tabLabel}>Drive</Text>
//           </View>

//           <TouchableOpacity style={styles.goOfflineBtn}>
//             <Text style={styles.goOfflineText}>Go Offline</Text>
//           </TouchableOpacity>

//           <View style={styles.tabItem}>
//             <Text style={styles.tabIcon}>💰</Text>
//             <Text style={styles.tabLabel}>Earnings</Text>
//           </View>
//         </View>

//         {/* Pending Documents Card */}
//         <View style={styles.pendingCard}>
//           <View style={styles.pendingDot} />

//           <View style={{ flex: 1 }}>
//             <Text style={styles.pendingTitle}>Documents submission pending</Text>
//             <Text style={styles.pendingDesc}>
//               Please complete all below process to setup {"\n"}
//               your account and start earning
//             </Text>
//           </View>

//           <Text style={styles.chevron}>{">"}</Text>
//         </View>

//         {/* Stats Cards */}
//         <View style={styles.statsRow}>
//           <View style={styles.statCard}>
//             <Text style={styles.statLabel}>Earnings</Text>
//             <Text style={styles.statValue}>₹1500</Text>
//           </View>

//           <View style={styles.statCard}>
//             <Text style={styles.statLabel}>Online</Text>
//             <Text style={styles.statValue}>3hr30min</Text>
//           </View>

//           <View style={styles.statCard}>
//             <Text style={styles.statLabel}>Trip</Text>
//             <Text style={styles.statValue}>05</Text>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   /* MAP AREA */
//   mapWrapper: {
//     flex: 1,
//     backgroundColor: "#f2f2f2",
//   },

//   /* Top Icon Row */
//   topRow: {
//     position: "absolute",
//     top: 10,
//     left: 12,
//     right: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   topRightIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   circleIcon: {
//     width: 38,
//     height: 38,
//     borderRadius: 999,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 4,
//   },
//   iconText: {
//     fontSize: 16,
//   },

//   profileCircle: {
//     width: 38,
//     height: 38,
//     borderRadius: 999,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   profileText: {
//     fontSize: 16,
//   },

//   /* Marker (center) */
//   markerGlow: {
//     position: "absolute",
//     alignSelf: "center",
//     top: "45%",
//     width: 60,
//     height: 60,
//     borderRadius: 999,
//     backgroundColor: "rgba(255, 120, 120, 0.25)",
//   },
//   markerDot: {
//     position: "absolute",
//     alignSelf: "center",
//     top: "50%",
//     width: 14,
//     height: 14,
//     borderRadius: 999,
//     backgroundColor: "#ff2d2d",
//     borderWidth: 2,
//     borderColor: "#fff",
//     marginTop: -7,
//   },

//   /* BOTTOM PANEL */
//   bottomPanel: {
//     backgroundColor: "#fff",
//     paddingTop: 10,
//     paddingBottom: 14,
//     paddingHorizontal: 14,
//     borderTopLeftRadius: 18,
//     borderTopRightRadius: 18,
//     shadowColor: "#000",
//     shadowOpacity: 0.12,
//     shadowRadius: 10,
//     elevation: 12,
//   },

//   /* Tabs + Button Row */
//   tabsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   tabItem: {
//     width: 70,
//     alignItems: "center",
//   },
//   tabIcon: {
//     fontSize: 18,
//     marginBottom: 2,
//   },
//   tabLabel: {
//     fontSize: 12,
//     color: "#111",
//   },

//   goOfflineBtn: {
//     flex: 1,
//     marginHorizontal: 12,
//     height: 42,
//     backgroundColor: "#16a34a",
//     borderRadius: 22,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   goOfflineText: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "700",
//   },

//   /* Pending Card */
//   pendingCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: "#efefef",
//     marginBottom: 10,
//   },
//   pendingDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: "#ff3b30",
//     marginRight: 10,
//     marginTop: -14,
//   },
//   pendingTitle: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#111",
//   },
//   pendingDesc: {
//     fontSize: 11,
//     marginTop: 2,
//     color: "#6b7280",
//     lineHeight: 15,
//   },
//   chevron: {
//     fontSize: 18,
//     color: "#9ca3af",
//     marginLeft: 8,
//   },

//   /* Stats Row */
//   statsRow: {
//     flexDirection: "row",
//     gap: 10,
//   },
//   statCard: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: "#efefef",
//   },
//   statLabel: {
//     fontSize: 11,
//     color: "#6b7280",
//     marginBottom: 6,
//   },
//   statValue: {
//     fontSize: 15,
//     fontWeight: "800",
//     color: "#111",
//   },
// });
