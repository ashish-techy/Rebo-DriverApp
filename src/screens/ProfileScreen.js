import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ProfileScreen({ navigation }) {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* TOP PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Prasad sunilrao</Text>
            <Text style={styles.name}>paralkar</Text>

            <Text style={styles.idText}>FGJNQ286221</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#ff7a18" />
              <Text style={styles.ratingText}>5.0</Text>
            </View>
          </View>

          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=12",
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="camera-outline" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.quickRow}>
          <QuickCard title="Gigs history" onPress={() => navigation?.navigate?.("GigHistory")} />
          <QuickCard title="Trip history" onPress={() => navigation?.navigate?.("TripHistory")} />
          <QuickCard title="Your Offers" onPress={() => navigation?.navigate?.("YourOffers")} />
        </View>

        {/* REFERRAL CARD */}
        <View style={styles.refCard}>
          <View>
            <Text style={styles.refTitle}>₹10000 Referral Bonus</Text>
            <Text style={styles.refSub}>Refer your friend and earn</Text>
          </View>

          <View style={styles.coinWrap}>
             <Image
                      source={require("../../assets/images/coins.png")}
                      style={styles.image}
                      resizeMode="contain"
                    />
            {/* <Text style={styles.coin}>₹</Text> */}
          </View>
        </View>

        {/* SUPPORT */}
        <View style={styles.menuWraper}>
        <Text style={styles.sectionTitle}>Support</Text>
        <MenuItem
          icon={<MaterialIcons name="support-agent" size={24} color="black" />}
          title="Help center"
          onPress={() => navigation?.navigate?.("Help")}
        />
        <MenuItem
       
          icon={ <Ionicons name="ticket-outline" size={18} color="#000" />}
          title="Support tickets"
          onPress={() => {}}
        />
        <MenuItem icon={ <Ionicons name="document-text-outline" size={18} color="#000" />} title="FAQ" onPress={() => {}} />
</View>
        {/* DRIVING PREF */}
        <View style={styles.menuWraper}>
        <Text style={styles.sectionTitle}>Driving Preferences</Text>
        <MenuItem icon="location-outline" title="Work area" onPress={() => {}} />
        </View>

        {/* KNOWLEDGE */}
        <View style={styles.menuWraper}>
        <Text style={styles.sectionTitle}>Knowledge resources</Text>
        <MenuItem icon="play-circle-outline" title="Videos for you" onPress={() => {}} />
        </View>

        {/* APP SETTINGS */}
        <View style={styles.menuWraper}>
        <Text style={styles.sectionTitle}>App setting</Text>

        <View style={styles.switchRow}>
          <View style={styles.switchLeft}>
            <Ionicons name="moon-outline" size={18} color="#000" />
            <Text style={styles.switchTitle}>Dark theme</Text>
          </View>

          <Switch
            value={darkTheme}
            onValueChange={setDarkTheme}
            trackColor={{ false: "#e5e5e5", true: "#ffd1b3" }}
            thumbColor={darkTheme ? "#ff7a18" : "#fff"}
          />
        </View>

        <MenuItem icon="language-outline" title="App language" onPress={() => {}} />
        <MenuItem icon="notifications-outline" title="Trip alert sound" onPress={() => {}} />
</View>
        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.brand}>REBO{"\n"}PARTNER</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */

function QuickCard({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.quickCard} onPress={onPress}>
      <Text style={styles.quickText}>{title}</Text>
    </TouchableOpacity>
  );
}

function MenuItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.menuLeft}>
        {icon}
        {/* <Ionicons name={icon} size={18} color="#000" /> */}
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#000" />
    </TouchableOpacity>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },

  header: {
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 14, fontWeight: "600", color: "#000" },

  content: {
    paddingHorizontal: 14,
    paddingBottom: 26,
  },

  profileCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    marginTop: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  name: { fontSize: 13, fontWeight: "600", color: "#ff7a18", lineHeight: 18 },
  idText: { marginTop: 6, fontSize: 11, color: "#999" },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  ratingText: { fontSize: 11, color: "#000", fontWeight: "600", marginLeft: 4 },

  avatarWrap: { alignItems: "center", justifyContent: "center" },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  editIcon: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  quickCard: {
    width: "31.5%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  quickText: { fontSize: 11, color: "#000", fontWeight: "500" },

  refCard: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 34,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 12
  },
  refTitle: { fontSize: 14, fontWeight: "700", color: "#000" },
  refSub: { fontSize: 10.5, color: "#999", marginTop: 2 },

  coinWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ffe9d6",
    alignItems: "center",
    justifyContent: "center",
  },
  coin: { fontWeight: "700", color: "#ff7a18" },

  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },

  menuItem: {
    // backgroundColor: "#fff",
    // borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  menuWraper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  menuTitle: { fontSize: 12, color: "#000", fontWeight: "500", marginLeft: 8 },

  switchRow: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  switchLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  switchTitle: { fontSize: 12, color: "#000", fontWeight: "500", marginLeft: 8 },

  logoutBtn: {
    marginTop: 10,
    backgroundColor: "#ff7a18",
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 12, marginLeft: 6 },

  brand: {
    textAlign: "center",
    color: "#cfcfcf",
    fontWeight: "700",
    fontSize: 18,
    marginTop: 16,
    lineHeight: 20,
  },
    image: {
    width: 80,
    height: 80,
  },

});
