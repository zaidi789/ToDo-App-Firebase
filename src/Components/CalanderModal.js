import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarModal = ({visible, onClose, onSelectDate}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: 'white', padding: 20}}>
          <Calendar onDayPress={onSelectDate} />
          <TouchableOpacity onPress={onClose} style={{marginTop: 20}}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
