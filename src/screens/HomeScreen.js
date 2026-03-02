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
          <View style={{ alignItems: "center", backgroundColor: 'white', borderRadius: 30, shadowColor: "#000000", shadowOpacity: 0.5, shadowRadius: 20, elevation: 5 }}>

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
    // height: 280,
      flex: 1,
    backgroundColor: "#eee",
    overflow: "hidden",
  },
mapTopRow: {
  position: "absolute",
  top: 12,
  left: 16,
  right: 16,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: 'white'
},

circleIcon: {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 6,
},
  // mapTopRow: {
  //   position: "absolute",
  //   top: 14,
  //   left: 14,
  //   right: 14,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },

  // circleIcon: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: "#fff",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOpacity: 0.08,
  //   shadowRadius: 10,
  //   elevation: 3,
  // },
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
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: "rgba(255, 90, 0, 0.18)",
},

glowInner: {
  position: "absolute",
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: "rgba(255, 90, 0, 0.35)",
},

glowDot: {
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: "#FF3B30",
  borderWidth: 3,
  borderColor: "#fff",
},
  goButtonWrap: {
  position: "absolute",
  bottom: 40,
  left: 0,
  right: 0,
  left: 0,
  right: 0,
  alignItems: "center",
  zIndex: 20,
},

goButton: {
  width: 160,
  height: 48,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 12,
  elevation: 8,
},

goButtonRed: {
  backgroundColor: "#E60023",
},

goButtonGreen: {
  backgroundColor: "#16A34A",
},

goButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},

  // goButtonWrap: {
  //   position: "absolute",
  //   bottom: 52,
  //   left: 0,
  //   right: 0,
  //   alignItems: "center",
  // },

  // goButton: {
  //   width: 150,
  //   height: 42,
  //   borderRadius: 22,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOpacity: 0.18,
  //   shadowRadius: 10,
  //   elevation: 5,
  // },
  // goButtonRed: { backgroundColor: "#E60023" },
  // goButtonGreen: { backgroundColor: "#21C15E" },
  // goButtonText: {
  //   color: "#fff",
  //   fontSize: 15,
  //   fontWeight: "700",
  // },

  // mapBottomBar: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: 48,
  //   backgroundColor: "#fff",
  //   flexDirection: "row",
  //   paddingHorizontal: 14,
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   borderTopWidth: 1,
  //   borderTopColor: "#F0F0F0",
  // },


  mapBottomBar: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 64,
  backgroundColor: "#fff",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 30,
  borderTopLeftRadius: 22,
  borderTopRightRadius: 22,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 15,
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

