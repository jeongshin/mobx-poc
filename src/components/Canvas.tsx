import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, View } from 'react-native';
import Editor from '../editor/editor';
import EditorView from '../editor/editor.ui';

const Canvas = () => {
  const [editors, setEditors] = useState<Editor[]>([]);

  return (
    <SafeAreaView style={{ flex: 1, width: '100%' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 12,
        }}>
        {editors.map((editor) => (
          <EditorView editor={editor} key={editor._id} />
        ))}
      </ScrollView>
      <Button
        title="add editor"
        onPress={() => {
          setEditors([...editors, new Editor()]);
        }}
      />
    </SafeAreaView>
  );
};

export default Canvas;
