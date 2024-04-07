import { observer } from 'mobx-react-lite';
import React, { memo } from 'react';
import Editor from './editor';
import { StyleSheet, TextInput, View } from 'react-native';

const EditorView = observer<{ editor: Editor }>(({ editor }) => {
  console.log('rerender', editor._id);

  return (
    <View
      style={{
        width: '100%',
        minHeight: 100,
        borderRadius: 10,
        borderColor: '#eeeeee99',
        borderWidth: 1,
      }}>
      <TextInput
        value={editor.data.title}
        onChangeText={(value) => {
          editor.updateData('title', value);
        }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
});

export default memo(EditorView);
