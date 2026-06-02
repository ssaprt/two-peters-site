import { useState, useCallback, useRef } from "react";

interface UseImagePreviewProps {
  onImageSelect?: (file: File | null) => void;
}

export const useImagePreview = ({ onImageSelect }: UseImagePreviewProps = {}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  

  const objectUrlRef = useRef<string | null>(null);

  const clear = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setPreview(null);
    setFile(null);
    onImageSelect?.(null);
  }, [onImageSelect]);

  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | File | null) => {
      let selectedFile: File | null = null;

      if (e instanceof File) {
        selectedFile = e;
      } else if (e === null) {
        clear();
        return;
      } else {
        selectedFile = e.target.files?.[0] || null;
      }

      if (!selectedFile) return;

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      objectUrlRef.current = objectUrl;

      setPreview(objectUrl);
      setFile(selectedFile);
      onImageSelect?.(selectedFile);
    },
    [onImageSelect, clear],
  );

  return {
    preview,
    file,
    change,
    clear,
  };
};
