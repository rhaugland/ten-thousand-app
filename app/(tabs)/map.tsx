import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../constants/theme';
import { MAP_ZONES } from '../../constants/data';

function categoryColor(cat: string) {
  switch (cat) {
    case 'food': return '#F59E0B';
    case 'fashion': return '#EC4899';
    case 'music': return Colors.blue;
    default: return Colors.blue;
  }
}

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Map</Text>

      {/* Placeholder map area */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>Festival Map</Text>
        <Text style={styles.mapPlaceholderSub}>Interactive map coming soon</Text>
      </View>

      {/* Zone legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Zones</Text>
        {MAP_ZONES.map(zone => (
          <View key={zone.id} style={styles.zoneRow}>
            <View style={[styles.zoneDot, { backgroundColor: categoryColor(zone.category) }]} />
            <Text style={styles.zoneName}>{zone.name}</Text>
            <Text style={styles.zoneCategory}>{zone.category}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy,
  },
  title: {
    fontFamily: Fonts.heading,
    fontSize: 36,
    letterSpacing: 2,
    color: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  mapPlaceholder: {
    marginHorizontal: 20,
    height: 250,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.03)',
  },
  mapPlaceholderText: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    letterSpacing: 3,
    color: Colors.muted,
  },
  mapPlaceholderSub: {
    fontFamily: Fonts.bodyLight,
    fontSize: 13,
    color: Colors.muted,
    marginTop: 8,
  },
  legend: {
    padding: 20,
    marginTop: 10,
  },
  legendTitle: {
    fontFamily: Fonts.heading,
    fontSize: 13,
    letterSpacing: 4,
    color: Colors.blue,
    marginBottom: 16,
  },
  zoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59, 130, 246, 0.06)',
  },
  zoneDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 14,
  },
  zoneName: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 15,
    color: Colors.white,
    flex: 1,
  },
  zoneCategory: {
    fontFamily: Fonts.heading,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.muted,
    textTransform: 'uppercase',
  },
});
