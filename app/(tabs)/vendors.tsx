import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../constants/theme';
import { VENDORS, EventCategory } from '../../constants/data';

type Filter = 'all' | EventCategory;

function categoryColor(cat: string) {
  switch (cat) {
    case 'food': return '#F59E0B';
    case 'fashion': return '#EC4899';
    case 'music': return Colors.blue;
    default: return Colors.blue;
  }
}

export default function VendorsScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const filtered = filter === 'all' ? VENDORS : VENDORS.filter(v => v.category === filter);
  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'food', label: 'Food' },
    { key: 'fashion', label: 'Fashion' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Vendors</Text>

      <View style={styles.filters}>
        {filters.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterBtn, filter === f.key && styles.filterActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.vendorName}>{item.name}</Text>
              <View style={[styles.originBadge, { borderColor: categoryColor(item.category) }]}>
                <Text style={[styles.originText, { color: categoryColor(item.category) }]}>
                  {item.origin}
                </Text>
              </View>
            </View>
            <Text style={styles.vendorDesc}>{item.description}</Text>
            <Text style={styles.vendorLocation}>{item.location}</Text>
          </View>
        )}
      />
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
    paddingBottom: 8,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  filterActive: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  filterText: {
    fontFamily: Fonts.heading,
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.muted,
  },
  filterTextActive: {
    color: Colors.white,
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.08)',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vendorName: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 17,
    color: Colors.white,
    flex: 1,
    marginRight: 12,
  },
  originBadge: {
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  originText: {
    fontFamily: Fonts.heading,
    fontSize: 10,
    letterSpacing: 2,
  },
  vendorDesc: {
    fontFamily: Fonts.bodyLight,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.lightBlue,
    marginBottom: 8,
  },
  vendorLocation: {
    fontFamily: Fonts.bodyLight,
    fontSize: 12,
    color: Colors.muted,
  },
});
