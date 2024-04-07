import { observer } from 'mobx-react-lite';
import React, { memo } from 'react';
import Editor from './editor';
import { ActivityIndicator, Button, TextInput, View } from 'react-native';

const EditorView = observer<{ editor: Editor }>(({ editor }) => {
  console.log('rerender', editor._id);

  return (
    <View
      onLayout={(e) => {
        editor.onViewLayout({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        });
      }}
      style={{
        width: '100%',
        minHeight: 100,
        borderRadius: 10,
        borderColor: '#eeeeee99',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        multiline
        value={editor.data.title}
        onChangeText={(value) => {
          editor.updateData('title', value);
        }}
        style={[{ flex: 1, backgroundColor: 'pink' }]}
      />

      {editor.generating ? <ActivityIndicator size="small" /> : null}
      <Button
        title="generate"
        onPress={() => {
          editor.generate();
        }}
      />
    </View>
  );
});

export default memo(EditorView);
