import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../constants/theme';
import { SCHEDULE, EventCategory } from '../../constants/data';

type Filter = 'all' | EventCategory;

function categoryColor(cat: string) {
  switch (cat) {
    case 'food': return '#F59E0B';
    case 'fashion': return '#EC4899';
    case 'music': return Colors.blue;
    default: return Colors.blue;
  }
}

export default function ScheduleScreen() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all' ? SCHEDULE : SCHEDULE.filter(e => e.category === filter);
  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'food', label: 'Food' },
    { key: 'fashion', label: 'Fashion' },
    { key: 'music', label: 'Music' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Schedule</Text>

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
              <Text style={styles.time}>{item.time}</Text>
              <View style={[styles.badge, { backgroundColor: categoryColor(item.category) }]}>
                <Text style={styles.badgeText}>{item.category.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDesc}>{item.description}</Text>
            <Text style={styles.eventMeta}>{item.origin} · {item.location}</Text>
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
  time: {
    fontFamily: Fonts.heading,
    fontSize: 15,
    letterSpacing: 1.5,
    color: Colors.blue,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  badgeText: {
    fontFamily: Fonts.heading,
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.white,
  },
  eventTitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 17,
    color: Colors.white,
    marginBottom: 6,
  },
  eventDesc: {
    fontFamily: Fonts.bodyLight,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.lightBlue,
    marginBottom: 8,
  },
  eventMeta: {
    fontFamily: Fonts.bodyLight,
    fontSize: 12,
    color: Colors.muted,
  },
});
