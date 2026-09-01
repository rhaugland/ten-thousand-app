import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../constants/theme';

function QRPlaceholder() {
  return (
    <View style={styles.qrContainer}>
      {/* Grid of squares to mimic a QR code */}
      {Array.from({ length: 7 }).map((_, row) => (
        <View key={row} style={styles.qrRow}>
          {Array.from({ length: 7 }).map((_, col) => (
            <View
              key={col}
              style={[
                styles.qrBlock,
                {
                  opacity:
                    (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3)
                      ? 0.25
                      : Math.random() > 0.4 ? 0.18 : 0.08,
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function PurchaseModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handlePurchase = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1500);
  };

  const handleClose = () => {
    setDone(false);
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setName('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {done ? (
            <View style={styles.successContainer}>
              <Text style={styles.successCheck}>✓</Text>
              <Text style={styles.successTitle}>You're In</Text>
              <Text style={styles.successSub}>Your ticket is ready. See you there.</Text>
              <TouchableOpacity style={styles.purchaseBtn} onPress={handleClose}>
                <Text style={styles.purchaseBtnText}>View Ticket</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Purchase Entrance</Text>
                <TouchableOpacity onPress={handleClose}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>General Admission</Text>
                <Text style={styles.priceAmount}>$75</Text>
              </View>
              <Text style={styles.priceNote}>Good for all days</Text>

              <View style={styles.divider} />

              <Text style={styles.fieldLabel}>Name on Card</Text>
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor="rgba(184,216,240,0.3)"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <Text style={styles.fieldLabel}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="4242 4242 4242 4242"
                placeholderTextColor="rgba(184,216,240,0.3)"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="number-pad"
                maxLength={19}
              />

              <View style={styles.row}>
                <View style={styles.halfField}>
                  <Text style={styles.fieldLabel}>Expiry</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM / YY"
                    placeholderTextColor="rgba(184,216,240,0.3)"
                    value={expiry}
                    onChangeText={setExpiry}
                    keyboardType="number-pad"
                    maxLength={7}
                  />
                </View>
                <View style={styles.halfField}>
                  <Text style={styles.fieldLabel}>CVC</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor="rgba(184,216,240,0.3)"
                    value={cvc}
                    onChangeText={setCvc}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.purchaseBtn, processing && styles.purchaseBtnDisabled]}
                onPress={handlePurchase}
                disabled={processing}
              >
                <Text style={styles.purchaseBtnText}>
                  {processing ? 'Processing...' : 'Pay $75'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default function TicketScreen() {
  const [showPurchase, setShowPurchase] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.intro}>Bringing people together around</Text>
          <Text style={styles.pillars}>
            Food{'  '}
            <Text style={styles.dot}>·</Text>
            {'  '}Fashion{'  '}
            <Text style={styles.dot}>·</Text>
            {'  '}Music
          </Text>
        </View>

        <View style={styles.ticketCard}>
          <Text style={styles.ticketLabel}>Your Ticket</Text>

          <TouchableOpacity style={styles.qrTouchable} onPress={() => setShowPurchase(true)} activeOpacity={0.7}>
            <QRPlaceholder />
            <View style={styles.qrOverlay}>
              <Text style={styles.qrOverlayText}>Purchase Entrance</Text>
              <Text style={styles.qrOverlaySub}>Good for all days</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.ideaSection}>
          <Text style={styles.statement}>
            A festival for the things that{' '}
            <Text style={{ color: Colors.blue }}>connect</Text> all of us.
          </Text>
          <Text style={styles.sub}>
            The world is already here. Every culture in our state has a dish, a sound, and a style. Ten Thousand puts them all in one place.
          </Text>
        </View>
      </ScrollView>

      <PurchaseModal visible={showPurchase} onClose={() => setShowPurchase(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy,
  },
  scroll: {
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 260,
    height: 160,
    marginBottom: 20,
  },
  intro: {
    fontFamily: Fonts.bodyLight,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.lightBlue,
    marginBottom: 6,
  },
  pillars: {
    fontFamily: Fonts.heading,
    fontSize: 22,
    letterSpacing: 6,
    color: Colors.lightBlue,
  },
  dot: {
    color: Colors.blue,
  },

  // Ticket card
  ticketCard: {
    marginHorizontal: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.12)',
    alignItems: 'center',
  },
  ticketLabel: {
    fontFamily: Fonts.heading,
    fontSize: 13,
    letterSpacing: 4,
    color: Colors.blue,
    marginBottom: 24,
  },
  qrTouchable: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrContainer: {
    width: 200,
    height: 200,
    padding: 16,
    gap: 4,
  },
  qrRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 4,
  },
  qrBlock: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
    borderRadius: 2,
  },
  qrOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 22, 40, 0.85)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  qrOverlayText: {
    fontFamily: Fonts.heading,
    fontSize: 18,
    letterSpacing: 2,
    color: Colors.white,
  },
  qrOverlaySub: {
    fontFamily: Fonts.bodyLight,
    fontSize: 12,
    color: Colors.lightBlue,
    marginTop: 4,
  },

  // Idea section
  ideaSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  statement: {
    fontFamily: Fonts.heading,
    fontSize: 32,
    lineHeight: 36,
    color: Colors.white,
    marginBottom: 16,
  },
  sub: {
    fontFamily: Fonts.bodyLight,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.lightBlue,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: Colors.deepBlue,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.15)',
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    letterSpacing: 2,
    color: Colors.white,
  },
  modalClose: {
    fontSize: 20,
    color: Colors.muted,
    padding: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 16,
    color: Colors.white,
  },
  priceAmount: {
    fontFamily: Fonts.heading,
    fontSize: 28,
    color: Colors.blue,
  },
  priceNote: {
    fontFamily: Fonts.bodyLight,
    fontSize: 13,
    color: Colors.muted,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    marginVertical: 20,
  },
  fieldLabel: {
    fontFamily: Fonts.heading,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.muted,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 14,
    color: Colors.white,
    fontFamily: Fonts.body,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  purchaseBtn: {
    backgroundColor: Colors.blue,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  purchaseBtnDisabled: {
    opacity: 0.6,
  },
  purchaseBtnText: {
    fontFamily: Fonts.heading,
    fontSize: 18,
    letterSpacing: 2,
    color: Colors.white,
  },

  // Success
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successCheck: {
    fontSize: 48,
    color: '#059669',
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: Fonts.heading,
    fontSize: 32,
    letterSpacing: 2,
    color: Colors.white,
    marginBottom: 8,
  },
  successSub: {
    fontFamily: Fonts.bodyLight,
    fontSize: 15,
    color: Colors.lightBlue,
    marginBottom: 8,
  },
});
