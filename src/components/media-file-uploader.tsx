import { useState } from 'react';

export default function TextAndFileUploader() {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      setFiles(uploadedFiles);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h3>Введите текст и загрузите файлы</h3>
      
      {/* Текстовое поле */}
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Введите текст..."
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '8px',
          fontSize: '16px',
          boxSizing: 'border-box',
          marginBottom: '10px',
        }}
      />

      {/* Поле для загрузки файлов */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: '20px' }}
      />

      {/* Отображение изображений */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {files.map((file, index) => {
          const url = URL.createObjectURL(file);
          return (
            <div key={index} style={{ width: '100px', height: '100px', overflow: 'hidden' }}>
              <img
                src={url}
                alt={`upload-${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onLoad={() => URL.revokeObjectURL(url)} // освобождение памяти
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}