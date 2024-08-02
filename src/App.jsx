import React, { useState } from 'react';
import FileExplorer from './components/FileExplorer';
import './App.css';

function App() {
  const [fileStructure, setFileStructure] = useState([
    {
      id: '1',
      name: 'Root',
      type: 'folder',
      children: []
    }
  ]);

  const addItem = (parentId, name, type) => {
    const newItem = { id: Date.now().toString(), name, type, children: type === 'folder' ? [] : undefined };
    setFileStructure(prevStructure => {
      const updateChildren = (items) => {
        return items.map(item => {
          if (item.id === parentId) {
            return { ...item, children: [...item.children, newItem] };
          } else if (item.children) {
            return { ...item, children: updateChildren(item.children) };
          }
          return item;
        });
      };
      return updateChildren(prevStructure);
    });
  };

  const deleteItem = (id) => {
    setFileStructure(prevStructure => {
      const deleteFromChildren = (items) => {
        return items.filter(item => {
          if (item.id === id) return false;
          if (item.children) {
            item.children = deleteFromChildren(item.children);
          }
          return true;
        });
      };
      return deleteFromChildren(prevStructure);
    });
  };

  const renameItem = (id, newName) => {
    setFileStructure(prevStructure => {
      const renameInChildren = (items) => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, name: newName };
          }
          if (item.children) {
            return { ...item, children: renameInChildren(item.children) };
          }
          return item;
        });
      };
      return renameInChildren(prevStructure);
    });
  };

  return (
    <div className="App">
      <h1>🗄️File Explorer 🗄️</h1>
      <FileExplorer
        items={fileStructure}
        onAddItem={addItem}
        onDeleteItem={deleteItem}
        onRenameItem={renameItem}
      />
    </div>
  );
}

export default App;