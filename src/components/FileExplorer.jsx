import React, { useState } from 'react';
import './FileExplorer.css';

function FileExplorer({ items, onAddItem, onDeleteItem, onRenameItem }) {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const toggleFolder = (itemId) => {
    setExpandedFolders(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleAddItem = (parentId, itemType) => {
    const name = prompt(`Enter name for new ${itemType}:`);
    if (name) onAddItem(parentId, name, itemType);
  };

  const handleRenameStart = (item) => {
    setEditingId(item.id);
    setEditingName(item.name);
  };

  const handleRenameEnd = () => {
    if (editingId && editingName.trim()) {
      onRenameItem(editingId, editingName.trim());
    }
    setEditingId(null);
    setEditingName('');
  };

  const renderItem = (item) => {
    const isExpanded = expandedFolders[item.id];

    return (
      <div key={item.id} className="item">
        <div className="item-header">
          {item.type === 'folder' && (
            <span className="toggle" onClick={() => toggleFolder(item.id)}>
              {isExpanded ? '▼' : '►'}
            </span>
          )}
          <span className={`icon ${item.type}`}></span>
          {editingId === item.id ? (
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onBlur={handleRenameEnd}
              onKeyPress={(e) => e.key === 'Enter' && handleRenameEnd()}
              autoFocus
            />
          ) : (
            <span className="name" onClick={() => handleRenameStart(item)}>{item.name}</span>
          )}
          <button onClick={() => onDeleteItem(item.id)}>Delete</button>
          {item.type === 'folder' && (
            <>
              <button onClick={() => handleAddItem(item.id, 'file')}>Add File</button>
              <button onClick={() => handleAddItem(item.id, 'folder')}>Add Folder</button>
            </>
          )}
        </div>
        {item.type === 'folder' && isExpanded && (
          <div className="children">
            {item.children.map(child => renderItem(child))}
          </div>
        )}
      </div>
    );
  };

  return <div className="file-explorer">{items.map(item => renderItem(item))}</div>;
}

export default FileExplorer;